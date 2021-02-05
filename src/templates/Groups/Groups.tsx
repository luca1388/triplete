import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";

const Groups = ({ pageContext }) => {
  console.log(pageContext.groups);
  return (
    <Layout>
      <SEO
        title="Classifica marcatori Serie A"
        description="Scopri chi è il capocannoniere della Serie A: guarda la classifica marcatori del campionato di calcio."
      />
      <div style={{
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          width: '100%',
        }}>
        {pageContext.groups.map(group => (
          <div className="standingsContainer" key={group.group}>
              <h3>Gruppo {group.group[group.group.length - 1]}</h3>
              <div className="standingsHeader">
                <span className="rank"></span>
                <span className="imageWrapper"></span>
                <span className="match">G</span>
                <span className="match">V</span>
                <span className="match">P</span>
                <span className="match">N</span>
                <span className="goals">GF</span>
                <span className="goals">GS</span>
                <span className="points">
                    <strong>Pt</strong>
                </span>
            </div>
            
            <div className="standingsTeamsContainer">
              {group.table.map(position => (
                  <div className="standingsTeam" key={position.team.id}>
                  <span className="rank">{position.position}</span>
                  <span className="imageWrapper">
                    <img
                      src={position.team.crestUrl}
                      title={position.team.name}
                      alt={position.team.name}
                      height={30}
                      width={30}
                    />
                    <span>
                      {position.team.name}
                    </span>
                  </span>
                  <span className="match">{position.playedGames}</span>
                  <span className="match">{position.won}</span>
                  <span className="match">{position.lost}</span>
                  <span className="match">{position.draw}</span>
                  <span className="goals">{position.goalsFor}</span>
                  <span className="goals">{position.goalsAgainst}</span>
                  <span className="points">
                    <strong>{position.points}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Groups;
