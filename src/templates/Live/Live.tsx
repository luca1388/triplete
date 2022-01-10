import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
import "./Live.css";
import emptyImg from '../../../content/images/fans.svg';
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
        title="Oggi in campo"
        description="Serie A: Le partite di calcio della giornata. La tua squadra gioca oggi?"
      ></SEO>
      <div className="Live">
        {pageContext.todayMatches.length === 0 ? (
          <>
            <img
              src={emptyImg}
              style={{ width: "65%", maxHeight: "550px", maxWidth: "500px" }}
              />
              <div>Sembra che oggi non giochi nessuno :(</div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </Layout>
  );
};

export default Live;
