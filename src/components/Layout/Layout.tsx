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

import { SiteData } from "../../types";
import Navigation from "../Navigation/Navigation";
import CookiesBanner from "../CookieBanner/CookiesBanner";
// import loadable from "@loadable/component";
import { readCookie, setCookie } from "../../utils/cookiesHandler";
import { useServiceWorkerUpdater } from "../../hooks/useServiceWorkerUpdater";

const Layout: React.FC = ({ children }) => {
  // const CookiesHandler = loadable.lib(() => import("../../utils/cookiesHandler"));
  const { updateFound } = useServiceWorkerUpdater();
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(true);

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

  useEffect(() => {
    if (updateFound) {
      alert("updateFound");
    }
  }, [updateFound]);

  return (
    <div className="app">
      <Header
        siteTitle={data.site.siteMetadata?.displayTitle || `Triplete.net`}
      />
      <div className="header-container">
        <Navigation
          siteTitle={data.site.siteMetadata?.displayTitle || `Triplete.net`}
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
