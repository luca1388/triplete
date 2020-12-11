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

export type team = {
  crestUrl: string;
  tla: string;
  shortName: string;
};

export type calendar = {
  [key in string]: [{
    id: string;
    status: "SCHEDULED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "SUSPENDED" | "CANCELED" | "AWARDED";
    matchday: number;
    utcDate: string;
    score: {
      fullTime: {
        awayTeam: number;
        homeTeam: number;
      }
    }
    awayTeam: team;
    homeTeam: team;
  }]
};

export type standingPosition = {
  position: number;
  id: string;
  team: team;
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
    team: team;
    numberOfGoals: number;
}];

export interface TableProps {
  standings: [
    {
      position: number;
      id: string;
      team: team;
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
