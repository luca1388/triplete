import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import CardNews from "../components/CardNews/CardNews";
import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/seo";

interface NewsProps {
  allFeedNewsRss: {
    edges: [
      {
        node: {
          title: string;
          content: string;
          pubDate: string;
          enclosure: {
            url: string;
          };
          link: string;
          isoDate: string;
          fields: {
            slug: string;
          }
        };
      }
    ];
  };
  allFeedNewsRssMeta: {
    edges: [
      {
        node: {
          copyright: string;
        };
      }
    ];
  };
}

const News: React.FC<PageProps<NewsProps>> = ({ data }) => {
  return (
    <Layout>
      <SEO title="Serie A news" description="Serie A: le ultime notizie" />
      <div className="cardsGrid">
        {data.allFeedNewsRss.edges.map(edge => (
          <CardNews
            key={edge.node.fields.slug}
            title={edge.node.title}
            description={edge.node.content}
            imageURL={edge.node.enclosure.url}
            link={edge.node.link}
            date={edge.node.pubDate}
            source={data.allFeedNewsRssMeta.edges[0].node.copyright}
            slug={edge.node.fields.slug}
          />
        ))}
      </div>
    </Layout>
  );
};

export default News;

export const query = graphql`
  {
    allFeedNewsRss {
      edges {
        node {
          title
          content
          pubDate
          enclosure {
            url
          }
          link
          isoDate
          fields {
            slug
          }
        }
      }
    }
    allFeedNewsRssMeta {
      edges {
        node {
          copyright
        }
      }
    }
  }
`;
