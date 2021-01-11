import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
import Toolbar from "../../components/Toolbar/Toolbar";
import { scorers } from "../../types";

import './Scorers.css';


interface ScorersProps {
  pageContext: {
    scorers: scorers
  }
};

const Scorers: React.FC<ScorersProps> = ({ pageContext }) => {
  return (
    <Layout>
      <SEO title="Classifica marcatori Serie A" description="Scopri chi è il capocannoniere della Serie A: guarda la classifica marcatori del campionato di calcio." />
      <div className="scorersContainer">
        <Toolbar />
        {pageContext.scorers.map((entry, index) => {
          const scorerClasses = ["scorer"];
          if (index === 0) {
            scorerClasses.push("firstScorer");
          }
          return (
            <div className={scorerClasses.join(" ")} key={entry.id}>
              <span className="number">{index + 1}</span>
              <span className="playerName" style={{ flex: 1 }}>
                <strong>{entry.player.name}</strong> <span>({entry.team.shortName})</span>
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
