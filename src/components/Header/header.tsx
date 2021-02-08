import { navigate } from "gatsby";
import React, { useCallback, useState } from "react";
import Title from "../Typography/Title/Title";
import "./Header.css";
import { colors } from "../../constants/colors";
import CompetitionsSelector from "../CompetitionsSelector/CompetitionsButton";
import CompetitionsList from "../CompetitionsSelector/CompetitionsSelector";
import { Competition } from "../../types";
import { competitionsName } from "../../constants/LeaguesName";

interface HeaderProps {
  siteTitle: string;
  competition: Competition;
  onChangeCompetition: (newCompetition: Competition) => void
}

const Header: React.FC<HeaderProps> = ({ siteTitle, competition, onChangeCompetition }) => {
  const [listOpened, setListOpened] = useState<boolean>(false);

  const selectCompetitionHandler = useCallback((competition: Competition) => {
    setListOpened(false);
    onChangeCompetition(competition);
    navigate(competitionsName[competition].defaultPath);
  }, []);

  return (
    <>
      <header className="Header" style={{ color: colors.accent }}>
        <Title>
          <h1>{siteTitle}</h1>
        </Title>
        <CompetitionsSelector
          selectedCompetition={competition}
          onOpenSelectorMenu={() => setListOpened(oldState => !oldState)}
          opened={listOpened}
        />
      </header>
      <CompetitionsList show={listOpened} onSelectCompetition={selectCompetitionHandler} />
    </>
  );
};

export default Header;
