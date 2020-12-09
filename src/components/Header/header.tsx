import { Link } from "gatsby";
import React from "react";
import Title from "../Typography/Title/Title";
import "./Header.css";
import { colors } from "../../constants/colors";

interface HeaderProps {
  siteTitle: string;
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <header className="Header" style={{ color: colors.accent }}>
    <Title><h1>{siteTitle}</h1></Title>
  </header>
);

export default Header;
