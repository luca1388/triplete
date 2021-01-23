import React from "react";
import styled, { keyframes } from 'styled-components';

const CloseButton = styled.span`
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
    &:hover, &::focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`;
const Header = styled.div`
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;`
;
const Body = styled.div`
    padding: 2px 16px;
`;
const Container = styled.div`
    position: fixed;
    z-index: 5;
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;
const animatetop = keyframes`
    from {top:-300px; opacity:0} 
    to {top:0; opacity:1}
`;

const ModalContent = styled.div`
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: ${animatetop};
    -webkit-animation-duration: 0.4s;
    animation-name: ${animatetop};
    animation-duration: 0.4s;
`;

interface ModalProps {
  title: string;
  buttonConfirm?: React.FC,
  buttonCancel?: React.FC
  // body: string;
  // buttons?: any[]
}

const Modal: React.FC<ModalProps> = ({ title, children, buttonCancel, buttonConfirm}) => {
  return (
    <Container>
      <ModalContent>
        <Header>
          <CloseButton>&times;</CloseButton>
          <h2>{ title }</h2>
        </Header>
        <Body>
          <p>{ children }</p>
          { buttonConfirm && buttonConfirm }
          { buttonCancel && buttonCancel }
        </Body>
      </ModalContent>
    </Container>
  );
};

export default Modal;