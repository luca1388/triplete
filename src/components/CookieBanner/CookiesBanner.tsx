import React from "react";
import { Link } from 'gatsby';

import "./CookiesBanner.css";
import { useGoogleAnalytics } from "../../hooks/useGoogleAnalytics";

interface CookiesBannerProps {
  onAcceptCookies: () => void
};

const CookiesBanner: React.FC<CookiesBannerProps> = ({ onAcceptCookies }) => {
  const { fireEvent } = useGoogleAnalytics();
  const accpetCookiesHandler = () => {
    fireEvent('AcceptCookies', {
      'event_category': 'CookieBanner',
      'event_label': 'Dismiss cookie banner',
    });
    onAcceptCookies();
  };
  
  return (
    <div className="bannerContainer">
      <p>
        Su questo sito utilizziamo cookies e tecniche di tracciamento anonime per
        migliorare la tua esperienza di navigazione (<Link to={"/about#cookies"} className="cookiesLink">scopri di più</Link>).
        Chiudendo questo banner o proseguendo nella navigazione acconsenti
        all'uso dei cookies.
      </p>
      <button 
        className="button"
        onClick={accpetCookiesHandler}
      >Accetta</button>
    </div>
  );
};

export default CookiesBanner;