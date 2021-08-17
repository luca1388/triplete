import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
import Toolbar from "../../components/Toolbar/Toolbar";
import { scorers } from "../../types";
import styled from "styled-components";

import "./Scorers.css";
import EmptyScorers from "./EmptyScorers";

const Filter = styled.input`
  font-size: 13px;
  padding: 0 5px;
  max-width: 120px
`;
interface ScorersProps {
  pageContext: {
    scorers: scorers;
  };
}

const Scorers: React.FC<ScorersProps> = ({ pageContext }) => {
  const [filter, setFilter] = useState<string>("");

  const getScorers = () => {
    return filter ? pageContext.scorers.filter(
      scorer =>
        scorer.player.name.toLowerCase().indexOf(filter) > -1 ||
        scorer.team.shortName.toLowerCase().indexOf(filter) > -1
    ) : pageContext.scorers;
  };

  if (!pageContext.scorers.length) {
    return <Layout>
      <EmptyScorers />
    </Layout>;
  }

  return (
    <Layout>
      <SEO
        title="Classifica marcatori Serie A"
        description="Scopri chi è il capocannoniere della Serie A: guarda la classifica marcatori del campionato di calcio."
      />
      <div className="scorersContainer">
        <Toolbar>
          <Filter
            type="text"
            value={filter}
            placeholder="Cerca"
            onChange={event => setFilter(event.target.value.toLowerCase())}
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
          <span>
            Nessun risultato, prova a cercare altro ...
          </span>
        )}
      </div>
    </Layout>
  );
};

export default Scorers;
