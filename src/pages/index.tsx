import React from "react";
import { PageProps, graphql } from "gatsby";

import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/seo";

type IndexPageProps = {
  allTeam: {
    nodes: [
      {
        shortName: string;
        crestUrl: string;
        tla: string;
        teamId: number;
      }
    ];
  };
};

const IndexPage: React.FC<PageProps<IndexPageProps>> = ({ data }) => {
  const teams = data.allTeam.nodes;

  return (
    <Layout>
      <SEO title="Serie A Team viewer" />
      <div
        className="teams-container"
        style={{
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query TeamNamesQuery {
    allTeam {
      nodes {
        id
        shortName
        crestUrl
        tla
        teamId
      }
    }
  }
`;
