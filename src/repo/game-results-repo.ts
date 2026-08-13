import type { Result } from '../types';

const KEY = 'mines.result';

export class GameResultsRepo {
  public static loadAll(): Result[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? '[]') as Result[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public static add(result: Result): void {
    const data: Result[] = this.loadAll();

    data.unshift(result);
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  public static clear(): void {
    localStorage.removeItem(KEY);
  }
}
