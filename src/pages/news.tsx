import { graphql, Link, PageProps } from "gatsby";
import React, { useEffect } from "react";
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
          enclosure?: {
            url: string;
          };
          link: string;
          isoDate: string;
          fields: {
            slug: string;
          };
        };
      }
    ];
  };
}

const News: React.FC<PageProps<NewsProps>> = ({ data }) => {
  useEffect(() => {
    fetch("https://www.corrieredellosport.it/rss/calcio/serie-a")
      .then(response => response.text())
      .then(data => new DOMParser().parseFromString(data, "text/xml")).then(xml => {
        const items = Array.from(xml.querySelectorAll("item"));
        console.log(items);
      });
  }, []);
  return (
    <Layout>
      <SEO
        title="Serie A news"
        description="Serie A: le ultime notizie del campionato di calcio italiano. Leggi le motizie della tua squadra del cuore."
      />
      <div className="cardsGrid">
        {data.allFeedNewsRss.edges.map(edge => (
          <CardNews
            key={edge.node.fields.slug}
            title={edge.node.title}
            description={edge.node.content}
            imageURL={edge.node.enclosure?.url}
            link={edge.node.link}
            date={edge.node.pubDate}
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
  }
`;
