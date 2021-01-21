/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useCallback, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "../Header/header";
import BottomNavigation from '../Navigation/BottomNavigation/BottomNavigation';
import "./Layout.css";

import { SiteData } from "../../types";
import Navigation from "../Navigation/Navigation";
import CookiesBanner from "../CookieBanner/CookiesBanner";
// import loadable from "@loadable/component";
import { readCookie, setCookie } from '../../utils/cookiesHandler';

const Layout: React.FC = ({ children }) => {
  // const CookiesHandler = loadable.lib(() => import("../../utils/cookiesHandler"));

  const [cookiesAccepted, setCookiesAccepted] = useState(
     readCookie("ac") || true
  );

  const acceptCookiesHandler = useCallback(() => {
    setCookie("ac", "true");
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

  return (
    <div className="app">
      <Header siteTitle={data.site.siteMetadata?.displayTitle || `Triplete.net`} />
      <div className="header-container">
        <Navigation siteTitle={data.site.siteMetadata?.displayTitle || `Triplete.net`} />
        <main className="main-container">
          {children}
          <BottomNavigation />
        </main>
        { !cookiesAccepted && <CookiesBanner onAcceptCookies={acceptCookiesHandler} /> }
      </div>
    </div>
  );
};

export default Layout;
