import { Result } from '../types/result-types';

const KEY = 'mines.result';
export const useGameResults = () => {
  const loadAll = (): Result[] => {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? '[]');
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const add = (result: Result): void => {
    const data: Result[] = loadAll();

    data.unshift(result);
    localStorage.setItem(KEY, JSON.stringify(data));
  };

  const clear = (): void => {
    localStorage.removeItem(KEY);
  };

  return {
    loadAll,
    add,
    clear,
  };
};
