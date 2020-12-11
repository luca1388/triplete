import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
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
      <SEO title="Classifica marcatori Serie A" />
      <div className="scorersContainer">
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
