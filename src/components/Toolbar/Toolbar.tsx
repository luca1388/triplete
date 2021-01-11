import React, { useCallback } from "react";
// import ReactDOM from 'react-dom';
import styled from "styled-components";
import { GiShare } from "react-icons/gi";
import { colors } from "../../constants/colors";

import "./Toolbar.css";
import { graphql, useStaticQuery } from "gatsby";
import { SiteData } from "../../types";
import { useGoogleAnalytics } from '../../hooks/useGoogleAnalytics';

interface ToolbarProps {
  site: SiteData;
  shareUrl?: string;
  shareTitle?: string;
}

const Toolbar: React.FC = () => {
  const { fireEvent } = useGoogleAnalytics();
  const ActionsBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 0 1rem 0;
    font-size: 22px;
  `;
  const LeagueTitle = styled.h3`
    margin: 0;
  `;

  const data: {
    site: SiteData;
  } = useStaticQuery(graphql`
    query SiteMetadataQuery {
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

  const shareHandler = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: data.site.siteMetadata.title,
          url: location.href,
        });
        fireEvent("Share", {
          event_category: "Sharing",
          event_label: "Share site URL",
          siteURL: location.href
        });
      } catch (e) {
        console.log(e);
        // ReactDOM.createPortal(<Modal />, document.getElementById('modal-portal') as Element);
      }
    }
  }, []);

  return (
    <ActionsBar>
      <LeagueTitle>Serie A</LeagueTitle>
      {
        typeof navigator !== "undefined" && navigator.share && <GiShare
          className="shareIcon"
          color={colors.primary}
          size={32}
          onClick={shareHandler}
        />
      }
    </ActionsBar>
  );
};

export default Toolbar;
