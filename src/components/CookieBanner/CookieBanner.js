import React from "react";
import { Link } from "react-router-dom";

import css from "./CookiesBanner.css";


const CookiesBanner = (props) => {
  const accpetCookiesHandler = () => {
    gtag('event', 'Accept', {
      'event_category': 'CookieBanner',
      'event_label': 'Dismiss cookie banner',
    });
    props.onAcceptCookies();
  };
  
  return (
    <div className={css.bannerContainer}>
      <p>
        Su questo sito utilizziamo cookies e tecniche di tracciamento anonime per
        migliorare la tua esperienza di navigazione (<Link className={css.Link} to={"/about#cookies"}>scopri di più</Link>).
        Chiudendo questo banner o proseguendo nella navigazione acconsenti
        all'uso dei cookies.
      </p>
      <button 
        className={css.button}
        onClick={accpetCookiesHandler}
      >Accetta</button>
    </div>
  );
};

export default CookiesBanner;
