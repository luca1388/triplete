import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
import "./Live.css";
import emptyImg from "../../../content/images/fans.svg";
import { useInterval } from "../../hooks/useInterval";
interface LiveProps {
  pageContext: {
    teams: any;
  };
}

const Live: React.FC<LiveProps> = ({ pageContext }) => {
  console.log(pageContext);

  useInterval(() => {
    fetch("/.netlify/functions/live")
      .then(response => response.json())
      .then((liveMatches: any) => {
        console.log(liveMatches);
      })
      .catch(err => console.log(err));
  }, 30000);
  
  return (
    <Layout>
      <SEO
        title="Oggi in campo"
        description="Serie A: Le partite di calcio della giornata. La tua squadra gioca oggi?"
      ></SEO>
      <div className="Live">
        <>
          <img
            src={emptyImg}
            style={{ width: "65%", maxHeight: "550px", maxWidth: "500px" }}
          />
          <div>Sembra che oggi non giochi nessuno :(</div>
        </>
      </div>
    </Layout>
  );
};

export default Live;
