import React from "react";

import "./Table.css";
import { standingPosition } from '../../types'
import { tableConfig } from '../../constants/football';

export interface TableProps {
    standings: standingPosition[];
  }
  

const Table: React.FC<TableProps> = ({ standings }) => {
  // const description = standings
  //   .map(
  //     entry =>
  //       entry.position + " " + entry.team.shortName + "(" + entry.points + ")"
  //   )
  //   .join("\n");

  return (      
      <div className="standingsContainer">
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
            if (index <= tableConfig.championsLeagueTeamsCount) {
              teamNameClasses.push("championsLeague");
            }
            if (index > tableConfig.championsLeagueTeamsCount && index <= tableConfig.championsLeagueTeamsCount + tableConfig.europaLeagueTeamsCount) {
              teamNameClasses.push("europaLeague");
            }
            if (index > standings.length - tableConfig.serieBTeamsCount - 1) {
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
