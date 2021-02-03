import { Link } from "gatsby";
import React, { useState } from "react";
import Title from "../Typography/Title/Title";
import "./Header.css";
import { colors } from "../../constants/colors";
import CompetitionsSelector from "../CompetitionsSelector/CompetitionsButton";
import CompetitionsList from "../CompetitionsSelector/CompetitionsSelector";

interface HeaderProps {
  siteTitle: string;
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  const [listOpened, setListOpened] = useState<boolean>(false);

  return (
    <>
      <header className="Header" style={{ color: colors.accent }}>
        <Title>
          <h1>{siteTitle}</h1>
        </Title>
        <CompetitionsSelector onOpenSelectorMenu={() => setListOpened(oldState => !oldState)} opened={listOpened} />
      </header>
      <CompetitionsList show={listOpened} />
    </>
  );
};

export default Header;
