import { Difficulty } from './board-types';

export type Result = {
  time: number;
  size: Difficulty;
  won: boolean;
  date: Date;
};
