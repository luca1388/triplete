import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
import { tableConfigUCL } from "../../constants/football";
import Table from "../Table/Table";

interface GroupsProps {
  pageContext: {
    groups: [
      {
        id: string;
        group: string;
        table: [
          {
            position: number;
            playedGames: number;
            won: number;
            draw: number;
            lost: number;
            points: number;
            goalsFor: number;
            goalsAgainst: number;
            goalDifference: number;
            team: {
              id: number;
              name: string;
              shortName: string;
              crestUrl: string;
            };
          }
        ];
      }
    ];
  };
}

const Groups: React.FC<GroupsProps> = ({ pageContext }) => {
  console.log(pageContext.groups);
  return (
    <Layout defaultCompetition="UCL">
      <SEO
        title="Champions League - Fase a gironi"
        description="Uefa Champions League: i gironi della masssima competizione europea."
      />
      <div
        style={{
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {pageContext.groups.map(group => {
          const standings = group.table;
          return (
            <Table
              label={`Gruppo ${group.group[group.group.length - 1]}`}
              standings={standings}
              tableConfig={tableConfigUCL}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Groups;
