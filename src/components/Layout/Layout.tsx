/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "../Header/header";
import BottomNavigation from '../Navigation/BottomNavigation/BottomNavigation';
import "./Layout.css";

import { SiteData } from "../../types";
import Navigation from "../Navigation/Navigation";

const Layout: React.FC = ({ children }) => {
  const data: {
    site: SiteData;
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
          image
          url
        }
      }
    }
  `);

  return (
    <div className="app">
      <Navigation siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="header-container">
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main className="main-container">
          {children}
          <BottomNavigation />
        </main>
      </div>
    </div>
  );
};

export default Layout;
