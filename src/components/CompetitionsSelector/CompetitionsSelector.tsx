import React from "react";
import styled, { css } from "styled-components";
import "./CompetitionsSelector.css";

const ListItem = styled.li`
  padding: 10px 0;
`;

interface CompetitionsListProps {
  show: boolean;
}

const CompetitionsList: React.FC<CompetitionsListProps> = ({ show }) => {
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

  // if (!show) {
  //   return null;
  // }
  return (
    // <ListContainer>
    //   <ListItem>Serie A</ListItem>
    //   <ListItem>Champions League</ListItem>
    // </ListContainer>
    <div
      className={["CompetitionsSelector"]
        .concat(show ? "CompetitionsSelector--opened" : '')
        .join(" ")}
    >
      <div className="Label">
        Seleziona la competizione:
      </div>
      <a className="CompetitionLink">Serie A</a>
      <a className="CompetitionLink">Champions League</a>
      {/* <ul className="ListContainer">
        <li className="ListItem">
          <a className="CompetitionLink">Serie A</a>
        </li>
        <li className="ListItem">
          <a className="CompetitionLink">Champions League</a>
        </li>
      </ul> */}
    </div>
  );
};

export default CompetitionsList;
