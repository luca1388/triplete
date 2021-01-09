import React, { useCallback } from "react";
import styled from "styled-components";
import { GiShare } from "react-icons/gi";
import { colors } from "../../constants/colors";

import "./Toolbar.css";
import { graphql, useStaticQuery } from "gatsby";
import { SiteData } from "../../types";

interface ToolbarProps {
site: SiteData;
  shareUrl?: string;
  shareTitle?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ site }) => {
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
    console.log(data.site);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: data.site.siteMetadata.title,
          url: location.href,
        });
      } catch (e) {
        console.log("error");
      }
    } else {
      console.log("error");
    }
  }, []);

  return (
    <ActionsBar>
      <LeagueTitle>Serie A</LeagueTitle>
      <GiShare
        className="shareIcon"
        color={colors.primary}
        size={32}
        onClick={shareHandler}
      ></GiShare>
    </ActionsBar>
  );
};

export default Toolbar;