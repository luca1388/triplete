import React from "react";

import "./Table.css";
import { standingPosition, TableConfig } from '../../types'
import { tableConfigDefault } from '../../constants/football';
import Toolbar from "../../components/Toolbar/Toolbar";

export interface TableProps {
    standings: standingPosition[];
    label: string;
    tableConfig?: TableConfig;
  }
  

const Table: React.FC<TableProps> = ({ standings, label, tableConfig = tableConfigDefault }) => {
  return (      
      <div className="standingsContainer">
        <Toolbar leagueName={label} />
        <div className="standingsHeader">
          <span className="rank"></span>
          <span className="imageWrapper"></span>
          <span className="match">G</span>
          <span className="match">V</span>
          <span className="match">P</span>
          <span className="match">N</span>
          <span className="goals">GF</span>
          <span className="goals">GS</span>
          <span className="points">
            <strong>Pt</strong>
          </span>
        </div>
        <div className="standingsTeamsContainer">
          {standings.map((entry, index) => {
            let teamNameClasses = ["teamName"];
            if (index < tableConfig.mainCompetitionTeamsCount) {
              teamNameClasses.push("championsLeague");
            }
            if (index >= tableConfig.mainCompetitionTeamsCount && index < tableConfig.mainCompetitionTeamsCount + tableConfig.secondaryCompetitionTeamsCount) {
              teamNameClasses.push("europaLeague");
            }
            if (index > standings.length - tableConfig.worstCompetitionTeamsCount - 1) {
              teamNameClasses.push("serieB");
            }

            return (
              <div className="standingsTeam" key={entry.id}>
                <span className="rank">{index + 1}</span>
                <span className="imageWrapper">
                  <img
                    src={entry.team.crestUrl}
                    title={entry.team.shortName}
                    alt={entry.team.shortName}
                    height={30}
                    width={30}
                  />
                  <span className={teamNameClasses.join(" ")}>
                    {entry.team.shortName.split(' ')[0]}
                  </span>
                </span>
                <span className="match">{entry.playedGames}</span>
                <span className="match">{entry.won}</span>
                <span className="match">{entry.lost}</span>
                <span className="match">{entry.draw}</span>
                <span className="goals">{entry.goalsFor}</span>
                <span className="goals">{entry.goalsAgainst}</span>
                <span className="points">
                  <strong>{entry.points}</strong>
                </span>
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default Table;
