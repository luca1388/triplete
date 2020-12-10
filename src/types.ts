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
