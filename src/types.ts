import { string } from "prop-types";

export interface SiteData {
  siteMetadata: {
    title: string;
    description?: string;
    author?: string;
    image?: string;
    url?: string;
  };
}

export type standingPosition = {
  position: number;
  id: string;
  team: {
    name: string;
    crestUrl: string;
    tla: string;
    shortName: string;
  };
  points: number;
  playedGames: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  won: number;
};

export type scorers = [{
    id: string;
    player: {
      id: number;
      name: string;
      nationality: string;
    }
    team: {
      id: number;
      shortName: string;
    }
    numberOfGoals: number;
}];

export interface TableProps {
  standings: [
    {
      position: number;
      id: string;
      team: {
        name: string;
        crestUrl: string;
        tla: string;
        shortName: string;
      };
      points: number;
      playedGames: number;
      draw: number;
      lost: number;
      goalsFor: number;
      goalsAgainst: number;
      won: number;
    }
  ];
}
