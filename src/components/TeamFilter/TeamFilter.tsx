import React, { useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { team } from "../../types";

interface TeamFilterProps {
  onType: (team: number) => void;
}

const TeamFilter: React.FC<TeamFilterProps> = ({ onType }) => {
  let teams: team[] = useStaticQuery(graphql`
    query TeamsQuery {
      allTeam {
        edges {
          node {
            teamId
            shortName
          }
        }
      }
    }
  `).allTeam.edges.map(edge => ({ ...edge.node }));

  const onChangeInputHandler = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      // setTeam(event.target.value);
      onType(+event.target.value);
    },
    []
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>Scegli la tua squadra: </span>
      <select style={{ margin: "0 0 0 10px" }} onChange={onChangeInputHandler}>
        <option value={-1}>Tutte</option>
        {teams.map(team => (
          <option key={team.teamId} value={team.teamId}>
            {team.shortName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamFilter;
