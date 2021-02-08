/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useCallback, useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "../Header/header";
import BottomNavigation from "../Navigation/BottomNavigation/BottomNavigation";
import "./Layout.css";

import { Competition, SiteData } from "../../types";
import Navigation from "../Navigation/Navigation";
import CookiesBanner from "../CookieBanner/CookiesBanner";
// import loadable from "@loadable/component";
import { readCookie, setCookie } from "../../utils/cookiesHandler";

interface LayoutProps {
  defaultCompetition?: Competition;
};

const Layout: React.FC<LayoutProps> = ({ children, defaultCompetition }) => {
  // const CookiesHandler = loadable.lib(() => import("../../utils/cookiesHandler"));
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(true);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition>(defaultCompetition || 'SA');

  useEffect(() => {
    if (!readCookie("ac")) {
      setCookiesAccepted(false);
    }
  }, []);

  const acceptCookiesHandler = useCallback(() => {
    setCookie("ac", new Date().toDateString());
    setCookiesAccepted(true);
  }, []);

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
          displayTitle
        }
      }
    }
  `);

  const changeCompetitionsHandler = useCallback((newCompetition: Competition) => {
    setSelectedCompetition(newCompetition);
  }, []);

  return (
    <div className="app">
      <Header
        siteTitle={data.site.siteMetadata?.displayTitle || `Triplete.net`}
        competition={selectedCompetition}
        onChangeCompetition={changeCompetitionsHandler}
      />
      <div className="header-container">
        <Navigation
          siteTitle={data.site.siteMetadata?.displayTitle || `Triplete.net`}
          competition={selectedCompetition}
        />
        <main className="main-container">
          {children}
          <BottomNavigation />
        </main>
        {!cookiesAccepted && (
          <CookiesBanner onAcceptCookies={acceptCookiesHandler} />
        )}
      </div>
    </div>
  );
};

export default Layout;
