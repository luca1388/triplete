import React from "react";
import { PageProps, graphql } from "gatsby";

import Table from "../templates/Table/Table";
import { standingPosition, TableProps } from "../types";

type IndexPageProps = {
  allPosition: {
    edges: [
      {
        node: {
          position: number;
          id: string;
          team: {
            crestUrl: string;
            tla: string;
            shortName: string;
            name: string;
          };
          points: number;
          playedGames: number;
          draw: number;
          lost: number;
          goalsFor: number;
          goalsAgainst: number;
          won: number;
        };
      }
    ];
  };
};

const IndexPage: React.FC<PageProps<IndexPageProps>> = ({ data }) => {
  const standings: standingPosition[] = data.allPosition.edges.map(entry => ({...entry.node}));

  return (
    <div
      className=""
      style={{
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Table standings={standings} />
    </div>
  );
};

export default IndexPage;

export const query = graphql`
  query TeamNamesQuery {
    allPosition {
      edges {
        node {
          id
          position
          team {
            id
            shortName
            tla
            crestUrl
          }
          playedGames
          won
          draw
          lost
          points
          goalsFor
          goalsAgainst
        }
      }
    }
  }
`;
