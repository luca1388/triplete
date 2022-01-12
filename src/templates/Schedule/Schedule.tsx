import React, { useCallback, useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
import TeamFilter from "../../components/TeamFilter/TeamFilter";
import { calendar, team } from "../../types";
import { getMatchDateFromUtcDate, getTimeFromUtcDateTime } from "../../utils/date";

import "./Schedule.css";

interface ScheduleProps {
  pageContext: {
    calendar: calendar;
    teams: team[]
  };
}

const Schedule: React.FC<ScheduleProps> = ({ pageContext }) => {
  const [ filteredTeam, setFilteredTeam ] = useState<number>(-1);
  const [ scrollCompleted, setScrollCompleted ] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<calendar>({});
  const todayRef = useRef<HTMLDivElement>(null);
  const matchdayRef = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split('T')[0];

  const onFilterTeams = useCallback((team:number) => {
    setFilteredTeam(team);
  }, []);

  useEffect(() => {
    setSchedule(pageContext.calendar);
  }, [pageContext.calendar]);

  const fetchSchedule = useCallback(() => {
    fetch("/.netlify/functions/matches")
    .then(response => response.json())
    .then((updatedMatches: { matches: any}) => {
      const { matches } = updatedMatches;

      const matchesWithTeams = matches.map(m => {
        const awayTeam = pageContext.teams.find(team => team.teamId === m.awayTeam.id);
        const homeTeam = pageContext.teams.find(team => team.teamId === m.homeTeam.id);

        return {
          ...m,
          awayTeam: {...awayTeam},
          homeTeam: {...homeTeam}
        };
      });

      const newCalendar = matchesWithTeams.reduce((acc, current) => {
        acc[current.utcDate.split("T")[0]] = [
          ...(acc[current.utcDate.split("T")[0]] || []),
          current,
        ];
        return acc;
      }, {});
      console.log(newCalendar);

      setSchedule(newCalendar);
    })
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  useEffect(() => {
    if (todayRef.current) {

      window.scroll({ top: (todayRef.current.offsetTop - 140), left: 0 });
      setScrollCompleted(true);
    }
    else {
      if (matchdayRef.current) {
        window.scroll({ top: (matchdayRef.current.offsetTop - 140), left: 0 });
        setScrollCompleted(true);
      }
    }
  }, []);

  const days = Object.keys(schedule);

  const currentMatchday = schedule[days[0]][0]?.season.currentMatchday;
  const firstDayOfCurrentMatchday = days.find( day => {
    const matches = schedule[day];
    return matches.find(match => match?.matchday === currentMatchday);
  });
  
  const scheduleContainerClasses: string[] = ['scheduleContainer'].concat(!scrollCompleted ? 'hidden' : '' );

  return (
    <Layout>
      <SEO title={"Calendario e risultati delle partite"} description="Serie A: Il calendario delle partite di calcio del campionato italiano. Guarda i risultati della tua squadra e controlla quando giocherà la prossima partita!"></SEO>
      <TeamFilter onType={onFilterTeams} />
      <div className={scheduleContainerClasses.join(' ')}>
        {days.map(day => {
          let matches = schedule[day];
          let matchesOfTheDay = matches.map(match => {
            let message = null;
            const startTime = getTimeFromUtcDateTime(match?.utcDate);
            if (match?.status === "SCHEDULED") {
              message = startTime ? (
                <span style={{ fontStyle: "italic" }}>{startTime}</span>
              ) : null;
            }
            if (match?.status === "IN_PLAY") {
              message = (
                <span style={{ color: "#009688", fontWeight: "bold" }}>
                  Iniziata!
                </span>
              );
            }
            if (match?.status === "PAUSED") {
              message = (
                <span style={{ color: "#FF9800", fontWeight: "bold" }}>
                  Intervallo
                </span>
              );
            }
            if (match?.status === "FINISHED") {
              message = (
                <span style={{ color: "#2196f3", fontWeight: "bold" }}>
                  Finita
                </span>
              );
            }
            if (match?.status === "AWARDED") {
              message = (
                <span style={{ color: "#2196f3", fontWeight: "bold" }}>
                  Vinta a tavolino
                </span>
              );
            }
            if (match?.status === "POSTPONED") {
              message = (
                <span style={{ color: "#FF9800", fontWeight: "bold" }}>
                  Rinviata
                </span>
              );
            }

            let filteringClasses;
            if (filteredTeam < 0) {
              filteringClasses = ["match"];
            } else {
              filteringClasses = +(match?.homeTeam.teamId as number) !== filteredTeam && filteredTeam !== +(match?.awayTeam.teamId as number) ?
              ["match", "filteredOutMatch"] : ["match", "filteredInMatch"];
            }

            return (
              <div className={filteringClasses.join(' ')} key={match?.id}>
                <div className="matchResultContainer">
                  <div className="matchResult">
                    <span className="teamNameBlock">
                      <span className="longName">
                        {match?.homeTeam.shortName.split(" ")[0]}
                      </span>
                      <span className="veryShortName">
                        {match?.homeTeam.tla}
                      </span>
                      <img
                        src={match?.homeTeam.crestUrl}
                        title={match?.homeTeam.shortName}
                        alt={match?.homeTeam.shortName}
                        height={30}
                        width={30}
                      />
                    </span>

                    <span className="scoreSquare">
                      <span>
                        {match?.score.fullTime.homeTeam}
                      </span>
                      <span> : </span>
                      <span>
                        {match?.score.fullTime.awayTeam}
                      </span>
                    </span>

                    <span className="teamNameBlock">
                      <img
                        src={match?.awayTeam.crestUrl}
                        title={match?.awayTeam.shortName}
                        alt={match?.awayTeam.shortName}
                        height={30}
                        width={30}
                      />
                      <span className="longName">
                        {match?.awayTeam.shortName.split(" ")[0]}
                      </span>
                      <span className="veryShortName">
                        {match?.awayTeam.tla}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="matchDayCard">
                  <span>Giornata {match?.matchday}</span>
                  <span>{message}</span>
                </div>
              </div>
            );
          });
          return (
            <div className="matchDay" key={day}>
              {day === today && <div ref={todayRef} id="today-anchor" style={{ visibility: "hidden"}}></div>}
              { day === firstDayOfCurrentMatchday && <div ref={matchdayRef} id="matchday-anchor" style={{ visibility: "hidden"}}></div>}
              <div className="matchesGroup">
                {getMatchDateFromUtcDate(day)}
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
