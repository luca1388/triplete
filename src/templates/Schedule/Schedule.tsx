import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
import { calendar } from "../../types";
import { getMatchDateFromUtcDate, getTimeFromUtcDateTime } from "../../utils/date";

import "./Schedule.css";

interface ScheduleProps {
  pageContext: {
    calendar: calendar;
  };
}

const Schedule: React.FC<ScheduleProps> = ({ pageContext }) => {
  console.log(pageContext);

  const days = Object.keys(pageContext.calendar);
  return (
    <Layout>
      <SEO title={"Calendario Serie A"}></SEO>
      <div className="scheduleContainer">
        {days.map(day => {
          let matches = pageContext.calendar[day];
          let matchesOfTheDay = matches.map(match => {
            let message = null;
            const startTime = getTimeFromUtcDateTime(match.utcDate);
            if (match.status === "SCHEDULED") {
              message = startTime ? (
                <span style={{ fontStyle: "italic" }}>{startTime}</span>
              ) : null;
            }
            if (match.status === "IN_PLAY") {
              message = (
                <span style={{ color: "#009688", fontWeight: "bold" }}>
                  Iniziata!
                </span>
              );
            }
            if (match.status === "PAUSED") {
              message = (
                <span style={{ color: "#FF9800", fontWeight: "bold" }}>
                  Intervallo
                </span>
              );
            }
            if (match.status === "FINISHED") {
              message = (
                <span style={{ color: "#2196f3", fontWeight: "bold" }}>
                  Finita
                </span>
              );
            }
            if (match.status === "AWARDED") {
              message = (
                <span style={{ color: "#2196f3", fontWeight: "bold" }}>
                  Vinta a tavolino
                </span>
              );
            }
            if (match.status === "POSTPONED") {
              message = (
                <span style={{ color: "#FF9800", fontWeight: "bold" }}>
                  Rinviata
                </span>
              );
            }
            return (
              <div className="match" key={match.id}>
                <div className="matchResultContainer">
                  <div className="matchResult">
                    <span className="teamNameBlock">
                      <span className="longName">
                        {match.homeTeam.shortName.split(" ")[0]}
                      </span>
                      <span className="veryShortName">
                        {match.homeTeam.tla}
                      </span>
                      <img
                        src={match.homeTeam.crestUrl}
                        title={match.homeTeam.shortName}
                        alt={match.homeTeam.shortName}
                        height={30}
                        width={30}
                      />
                    </span>

                    <span className="scoreSquare">
                      <span>
                        {match.score.fullTime.homeTeam}
                      </span>
                      <span> : </span>
                      <span>
                        {match.score.fullTime.awayTeam}
                      </span>
                    </span>

                    <span className="teamNameBlock">
                      <img
                        src={match.awayTeam.crestUrl}
                        title={match.awayTeam.shortName}
                        alt={match.awayTeam.shortName}
                        height={30}
                        width={30}
                      />
                      <span className="longName">
                        {match.awayTeam.shortName.split(" ")[0]}
                      </span>
                      <span className="veryShortName">
                        {match.awayTeam.tla}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="matchDayCard">
                  <span>Giornata {match.matchday}</span>
                  <span>{message}</span>
                </div>
              </div>
            );
          });
          return (
            <div className="matchDay" key={day}>
              <div className="matchesGroup">
                {getMatchDateFromUtcDate(day)}{" "}
              </div>
              <div className="matchesOfTheDay">{matchesOfTheDay}</div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Schedule;
