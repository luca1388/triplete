import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
import styled from "styled-components";

interface TeamProps {
  pageContext: {
    squad: any[];
  };
}

const Player = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid #e6e6e6;
`;
const ShirtNumber = styled.div`
  width: 10%;
  text-align: center;
`;
const PlayerData = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;
const Position = styled.div`
  width: 30%;
  text-align: right;
`;
const Nationality = styled.div`
  font-size: 12px;
  font-style: italic;
`;
const PlayerName = styled.div`
  font-weight: bold;
`;

const Team: React.FC<TeamProps> = ({ pageContext }) => {
  const team = pageContext.squad;

  const goalKeepers = team.squad.filter(
    player => player.position === "Goalkeeper"
  );
  const defenders = team.squad.filter(player => player.position === "Defender");
  const midfielders = team.squad.filter(
    player => player.position === "Midfielder"
  );
  const attackers = team.squad.filter(player => player.position === "Attacker");
  return (
    <Layout>
      <SEO
        title={`${team.shortName}`}
        description="La lista di tutti i giocatori della rosa della squadra."
      />
      <div style={{ width: "80%" }}>
      <h3>{team.shortName}</h3>
        {goalKeepers.map(player => (
          <Player key={player.id}>
            {/* <ShirtNumber>{player.shirtNumber || "-"}</ShirtNumber> */}
            <PlayerData>
              <PlayerName>{player.name}</PlayerName>
              <Nationality>{`${player.nationality} (${new Date(
                player.dateOfBirth
              ).toLocaleString("it-IT", {
                dateStyle: "short",
              })})`}</Nationality>
            </PlayerData>
            <Position>Por</Position>
          </Player>
        ))}
        {defenders.map(player => (
          <Player key={player.id}>
            {/* <ShirtNumber>{player.shirtNumber || "-"}</ShirtNumber> */}
            <PlayerData>
              <PlayerName>{player.name}</PlayerName>
              <Nationality>{`${player.nationality} (${new Date(
                player.dateOfBirth
              ).toLocaleString("it-IT", {
                dateStyle: "short",
              })})`}</Nationality>
            </PlayerData>
            <Position>Dif</Position>
          </Player>
        ))}
        {midfielders.map(player => (
          <Player key={player.id}>
            {/* <ShirtNumber>{player.shirtNumber || "-"}</ShirtNumber> */}
            <PlayerData>
              <PlayerName>{player.name}</PlayerName>
              <Nationality>{`${player.nationality} (${new Date(
                player.dateOfBirth
              ).toLocaleString("it-IT", {
                dateStyle: "short",
              })})`}</Nationality>
            </PlayerData>
            <Position>Cen</Position>
          </Player>
        ))}
        {attackers.map(player => (
          <Player key={player.id}>
            {/* <ShirtNumber>{player.shirtNumber || "-"}</ShirtNumber> */}
            <PlayerData>
              <PlayerName>{player.name}</PlayerName>
              <Nationality>{`${player.nationality} (${new Date(
                player.dateOfBirth
              ).toLocaleString("it-IT", {
                dateStyle: "short",
              })})`}</Nationality>
            </PlayerData>
            <Position>Att</Position>
          </Player>
        ))}
      </div>
    </Layout>
  );
};

export default Team;
