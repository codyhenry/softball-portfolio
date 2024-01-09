export type Statistics = {
  [abbreviation: string]: { full: string; value: string; best: boolean };
};

export type Videos = Array<string>;

export interface Table {
  category: string;
  stats: Statistics;
}
