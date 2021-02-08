import React from "react";
import styled, { css } from "styled-components";
import { competitionsName } from "../../constants/LeaguesName";
import { Competition } from "../../types";
import "./CompetitionsSelector.css";

const ListItem = styled.li`
  padding: 10px 0;
`;

interface CompetitionsListProps {
  show: boolean;
  onSelectCompetition: (newCompetition: Competition) => void;
}

const CompetitionsList: React.FC<CompetitionsListProps> = ({
  show,
  onSelectCompetition,
}) => {
  const ListContainer = styled.ul`
    list-style: none;
    padding: 0px 10px;
    margin: 0;
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    position: absolute;
    list-style: none;
    top: 125px;
    padding: 20px 20px 20px 6rem;
    background-color: rgb(17, 135, 212);
    ${show =>
      show &&
      css`
        transition: top 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94);
      `};
  `;

  return (
    <div
      className={["CompetitionsSelector"]
        .concat(show ? "CompetitionsSelector--opened" : "")
        .join(" ")}
    >
      <div className="Label">Seleziona la competizione:</div>
      {Object.keys(competitionsName).map((league) => {
        const competition: Competition = league as Competition;
        return (
          <a
            key={league}
            className="CompetitionLink"
            onClick={() => onSelectCompetition(competition)}
          >
            {competitionsName[competition].displayName}
          </a>
        );
      })}
    </div>
  );
};

export default CompetitionsList;
