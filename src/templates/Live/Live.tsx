import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";

interface LiveProps {
  pageContext: {
    todayMatches: any;
  };
}

const Live: React.FC<LiveProps> = ({ pageContext }) => {
  console.log(pageContext);
  return (
    <Layout>
      <SEO
        title={"Calendario e risultati delle partite"}
        description="Serie A: Il calendario delle partite di calcio del campionato italiano. Guarda i risultati della tua squadra e controlla quando giocherà la prossima partita!"
      ></SEO>
      <div className="matchesOfTheDay"></div>
    </Layout>
  );
};

export default Live;
