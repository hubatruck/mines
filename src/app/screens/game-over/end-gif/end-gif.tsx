import { FC } from 'react';
import { GifEntry, randomGif } from './gif-repo.ts';

import './end-gif.css';

type Props = {
  won: boolean;
  time: number;
};

export const EndGif: FC<Props> = ({ won, time }) => {
  let gif: GifEntry;
  if (!won) {
    gif = time === 0 ? randomGif('zeroTime') : randomGif('lost');
  } else {
    gif = randomGif('won');
  }

  return (
    gif && (
      <div className="gif-holder">
        <img src={gif.gif} alt="end gif" />
        <span className="source">{gif.source}</span>
      </div>
    )
  );
};
