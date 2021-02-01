import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io'

const SelectLink = styled.a`
    background: transparent;
    text-decoration: underline;
    &:hover {
        cursor: pointer;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const SelectorLabel = styled.span`
    margin: 0 10px 0 0;
`;
const Selector = styled.div`
    background-color: white;
    position: absolute;
    border-radius: 0 0 10px 10px;
    padding: 10px 0;
    margin: 10px 0;
    border: 1px solid #888;
`;
const ListContainer = styled.ul`
    list-style: none;
    padding: 0px 10px;
    margin: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;
const ListItem = styled.li`
    padding: 10px 0;
`;

const LeagueSelector = () => {
    const [listOpened, setListOpened] = useState<boolean>(false);
    
    const openSelectorHandler = () => {
        setListOpened( oldState => !oldState);
    };

    return (
        <div>
            <SelectLink onClick={openSelectorHandler}>
                <SelectorLabel>
                    Serie A
                </SelectorLabel>
                { listOpened ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle /> }
            </SelectLink>
            {
                listOpened && <Selector>
                    <ListContainer>
                        <ListItem>Serie A</ListItem>
                        <ListItem>Champions League</ListItem>
                    </ListContainer>
                </Selector>
            }
        </div>
    );
};

export default LeagueSelector;