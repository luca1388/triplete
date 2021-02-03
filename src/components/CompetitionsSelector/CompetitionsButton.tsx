import React from 'react';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io';
import styled from 'styled-components';

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
    min-width: 130px;
    cursor: pointer;
`;

interface CompetitionsSelectorProps {
    onOpenSelectorMenu: () => void;
    opened: boolean;
}

const CompetitionsSelector: React.FC<CompetitionsSelectorProps> = ({ onOpenSelectorMenu, opened }) => {
    return (
        <Container onClick={onOpenSelectorMenu}>
            <div>Serie A</div> { opened ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle /> }
        </Container>
    );
};

export default CompetitionsSelector;