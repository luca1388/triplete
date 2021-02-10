import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
import Toolbar from "../../components/Toolbar/Toolbar";
import { scorers } from "../../types";
import styled from "styled-components";

import "./Scorers.css";

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

  return (
    <Layout defaultCompetition="SA">
      <SEO
        title="Classifica marcatori Serie A"
        description="Scopri chi è il capocannoniere della Serie A: guarda la classifica marcatori del campionato di calcio."
      />
      <div className="scorersContainer">
        <Toolbar leagueName="Serie A">
          <Filter
            type="text"
            value={filter}
            placeholder="Filtra per squadra"
            onChange={event => setFilter(event.target.value.toLowerCase())}
          />
        </Toolbar>
        {getScorers().map((entry, index) => {
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
        })}
      </div>
    </Layout>
  );
};

export default Scorers;
