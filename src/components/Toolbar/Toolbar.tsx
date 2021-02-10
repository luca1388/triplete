import React from "react";
import styled from "styled-components";

import "./Toolbar.css";
import { graphql, useStaticQuery } from "gatsby";
import { SiteData } from "../../types";
import ShareIcon from "../ShareIcon/ShareIcon";

interface ToolbarProps {
  site: SiteData;
  shareUrl?: string;
  shareTitle?: string;
  leagueName: string;
}

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

const Toolbar: React.FC<ToolbarProps> = ({ leagueName = 'Serie A', children }) => {
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

  return (
    <ActionsBar>
      <LeagueTitle>{leagueName}</LeagueTitle>
      { children }
      {typeof navigator !== "undefined" && navigator.share && (
        <ShareIcon title={data.site.siteMetadata.title} />
      )}
    </ActionsBar>
  );
};

export default Toolbar;
