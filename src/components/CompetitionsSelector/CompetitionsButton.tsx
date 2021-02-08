import React from 'react';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io';
import styled from 'styled-components';
import { competitionsName } from '../../constants/LeaguesName';
import { Competition } from '../../types';

const Container = styled.div`
    border-radius: 24px;
    box-shadow: 0px 5px 20px #81a4f1;
    border: 1px solid #0c50a7;
    background: white;
    height: 50px;
    padding: 0px 20px;
    color: #444;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    @media (max-width: 960px) {
        height: 35px;
        padding: 0px 12px;
        font-size: 13px;
    }
`;

const Label = styled.div`
    margin: 0 5px 0 0;
`;

interface CompetitionsSelectorProps {
    onOpenSelectorMenu: () => void;
    opened: boolean;
    selectedCompetition: Competition
}

const CompetitionsSelector: React.FC<CompetitionsSelectorProps> = ({ onOpenSelectorMenu, opened, selectedCompetition }) => {
    return (
        <Container onClick={onOpenSelectorMenu}>
            <Label>{competitionsName[selectedCompetition].displayName}</Label> { opened ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle /> }
        </Container>
    );
};

export default CompetitionsSelector;