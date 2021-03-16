import React, { useCallback, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
import Toolbar from "../../components/Toolbar/Toolbar";
import { scorers } from "../../types";
import styled from "styled-components";

import "./Scorers.css";

const Filter = styled.input`
  font-size: 13px;
  padding: 0 5px;
  max-width: 120px;
`;
const NoResultsText = styled.span`
  font-style: italic;
`;
interface ScorersProps {
  pageContext: {
    scorers: scorers;
  };
}

const Scorers: React.FC<ScorersProps> = ({ pageContext }) => {
  const [filter, setFilter] = useState<string>("");
  const filterInputRef = useRef<HTMLInputElement>(null);

  const getScorers = () => {
    return filter
      ? pageContext.scorers.filter(
          scorer =>
            scorer.player.name.toLowerCase().indexOf(filter) > -1 ||
            scorer.team.shortName.toLowerCase().indexOf(filter) > -1
        )
      : pageContext.scorers;
  };

  const changeFilterInputHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toLowerCase());
  }, []);

  const keyDownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        filterInputRef.current?.blur();
      }
    },
    [filterInputRef]
  );

  return (
    <Layout defaultCompetition="SA" leagueNameVisible>
      <SEO
        title="Classifica marcatori Serie A"
        description="Scopri chi è il capocannoniere della Serie A: guarda la classifica marcatori del campionato di calcio."
      />
      <div className="scorersContainer">
        <Toolbar leagueName="Marcatori">
          <Filter
            ref={filterInputRef}
            type="text"
            value={filter}
            placeholder="Filtra"
            onChange={changeFilterInputHandler}
            onKeyDown={keyDownHandler}
          />
        </Toolbar>
        {getScorers().length ? (
          getScorers().map((entry, index) => {
            const scorerClasses = ["scorer"];
            if (index === 0) {
              scorerClasses.push("firstScorer");
            }
            return (
              <div className={scorerClasses.join(" ")} key={entry.id}>
                <span className="number">{index + 1}</span>
                <span className="playerName" style={{ flex: 1 }}>
                  <strong>{entry.player.name}</strong>{" "}
                  <span>({entry.team.shortName})</span>
                </span>
                <span className="number">
                  <strong>{entry.numberOfGoals}</strong>
                </span>
              </div>
            );
          })
        ) : (
          <NoResultsText>
            Nessun risultato, prova a cercare altro ...
          </NoResultsText>
        )}
      </div>
    </Layout>
  );
};

export default Scorers;
