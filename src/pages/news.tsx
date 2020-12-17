import { graphql, PageProps } from "gatsby";
import React from "react";

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
  console.log(data.allFeedNewsRss);
  return <></>;
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
