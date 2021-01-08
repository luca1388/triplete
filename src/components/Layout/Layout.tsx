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
import { useCookies } from "../../hooks/useCookies";
import CookiesBanner from "../CookieBanner/CookiesBanner";

const Layout: React.FC = ({ children }) => {
  const { readCookie, setCookie } = useCookies();

  const [cookiesAccepted, setCookiesAccepted] = useState(
    readCookie("acceptedCookies") || false
  );

  const acceptCookiesHandler = useCallback(() => {
    setCookie("acceptedCookies", "true");
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
        }
      }
    }
  `);

  return (
    <div className="app">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="header-container">
        <Navigation siteTitle={data.site.siteMetadata?.title || `Title`} />
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
