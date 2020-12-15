import React, { useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { team } from "../../types";

import './TeamFilter.css';

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
  `).allTeam.edges.map(edge => ({ ...edge.node })).sort( (a, b) => a.shortName > b.shortName ? 1 : -1);

  const onChangeInputHandler = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onType(+event.target.value);
    },
    []
  );

  return (
    <div
      className="floatingTeamFilter"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <label className="select-label">Scegli squadra</label> */}
      <select className="select-team" style={{ margin: "0 0 0 10px" }} onChange={onChangeInputHandler}>
        <option value={-1} className="default-option">Tutte le squadre</option>
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
