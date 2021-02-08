import React from "react";
import { PageProps, graphql, useStaticQuery } from "gatsby";

import Table from "../templates/Table/Table";
import Layout from '../components/Layout/Layout';
import SEO from '../components/SEO/seo';
import { standingPosition, TableProps } from "../types";

import { SiteData } from '../types';

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
            teamId: number;
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
  },
  site: SiteData;
};


const IndexPage: React.FC<PageProps<IndexPageProps>> = ({ data }) => {
  const standings: standingPosition[] = data.allPosition.edges.map(entry => ({...entry.node}));

    // const description = standings
  //   .map(
  //     entry =>
  //       entry.position + " " + entry.team.shortName + "(" + entry.points + ")"
  //   )
  //   .join("\n");

  return (
    <Layout defaultCompetition="SA">
      <SEO image={data.site.siteMetadata.image} title={data.site.siteMetadata.title} description={data.site.siteMetadata.description}></SEO>
      <div
        className=""
        style={{
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          width: '100%',
        }}
      >
        <Table standings={standings} />
      </div>
    </Layout>
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
    site {
      siteMetadata {
        title
        description
        author
        image
      }
    }
  }
`;
