export type URL = string;

export interface Video {
  id: string | undefined;
  title: string;
  smallImg: URL;
  largeImg: URL;
}

export type Videos = Array<Video>;

export type Statistics = {
  [abbreviation: string]: { full: string; value: string; best: boolean };
};

export interface Table {
  category: string;
  stats: Statistics;
}
