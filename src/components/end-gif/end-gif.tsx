import { type GifEntry, randomGif } from '../../repo';

import './end-gif.css';

type Props = {
  won: boolean;
  time: number;
};

export const EndGif = ({ won, time }: Props) => {
  let gif: GifEntry;
  if (!won) {
    gif = time === 0 ? randomGif('zeroTime') : randomGif('lost');
  } else {
    gif = randomGif('won');
  }

  return (
    gif && (
      <div className="gif-holder">
        <img src={gif.gif} alt="wait for gif(t)." />
        <span className="source">{gif.source}</span>
      </div>
    )
  );
};
