import React, { useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { team } from "../../types";

import './TeamFilter.css';
import { useGoogleAnalytics } from "../../hooks/useGoogleAnalytics";

interface TeamFilterProps {
  onType: (team: number) => void;
}

const TeamFilter: React.FC<TeamFilterProps> = ({ onType }) => {
  const { fireEvent } = useGoogleAnalytics();
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
      fireEvent("TeamSelected", {
        "event_category": "TeamFilter",
        "event_label": "Team filtered"
      });
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
      <select className="select-team" onChange={onChangeInputHandler}>
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
