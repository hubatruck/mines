import zeroTime1 from '../../../../assets/gifs/zeroTime1.gif';
import zeroTime2 from '../../../../assets/gifs/zeroTime2.gif';
import zeroTime3 from '../../../../assets/gifs/zeroTime3.gif';
import zeroTime4 from '../../../../assets/gifs/zeroTime4.gif';
import zeroTime5 from '../../../../assets/gifs/zeroTime5.gif';
import lost1 from '../../../../assets/gifs/lost1.gif';
import lost2 from '../../../../assets/gifs/lost2.gif';
import lost3 from '../../../../assets/gifs/lost3.gif';
import lost4 from '../../../../assets/gifs/lost4.gif';
import lost5 from '../../../../assets/gifs/lost5.gif';
import won1 from '../../../../assets/gifs/won1.gif';
import won2 from '../../../../assets/gifs/won2.gif';
import won3 from '../../../../assets/gifs/won3.gif';
import won4 from '../../../../assets/gifs/won4.gif';
import won5 from '../../../../assets/gifs/won5.gif';
import impossible1 from '../../../../assets/gifs/impossible1.gif';

export type GifEntry = {
  gif: string;
  source: string;
};

type GifRepo = {
  zeroTime: GifEntry[];
  lost: GifEntry[];
  won: GifEntry[];
  impossible: GifEntry[];
};

export const GIFS: GifRepo = {
  zeroTime: [
    {
      gif: zeroTime1,
      source: 'https://tenor.com/view/byuntear-sad-sad-cat-cat-meme-gif-12058012318069999477',
    },
    {
      gif: zeroTime2,
      source: 'https://tenor.com/view/bruh-meme-gif-26978290',
    },
    {
      gif: zeroTime3,
      source: 'https://tenor.com/view/agnes-gru-despicable-me-sad-emotional-frown-gif-15913209',
    },
    {
      gif: zeroTime4,
      source: 'https://tenor.com/view/agnes-gru-despicable-me-sad-emotional-frown-gif-15913209',
    },
    {
      gif: zeroTime5,
      source: 'https://tenor.com/view/di-gif-4367188',
    },
  ],
  lost: [
    {
      gif: lost1,
      source: 'https://tenor.com/view/you-suck-suck-sucks-spongbob-gif-13704895',
    },
    {
      gif: lost2,
      source: 'https://tenor.com/view/thanks-giving-eve-funny-turkey-gif-12931101',
    },
    {
      gif: lost3,
      source: 'https://tenor.com/view/taylor-swift-pathetic-you-suck-gif-5545875',
    },
    {
      gif: lost4,
      source: 'https://tenor.com/view/simpsons-you-suck-hey-gif-20160235',
    },
    {
      gif: lost5,
      source: 'https://tenor.com/view/cat-stare-looking-side-eye-side-eye-meme-gif-9333588005695144100',
    },
  ],
  won: [
    {
      gif: won1,
      source: 'https://media1.tenor.com/m/JkMGlrjiG_cAAAAC/awesome-youre-awesome.gif',
    },
    {
      gif: won2,
      source: 'https://tenor.com/view/catjam-cat-dancing-cat-music-music-cat-cute-cat-gif-23392229',
    },
    {
      gif: won3,
      source: 'https://tenor.com/view/minion-woohoo-yeah-excited-cheer-gif-5002827',
    },
    {
      gif: won4,
      source: 'https://tenor.com/view/for-the-win-fist-pump-yes-yass-yess-gif-15473072',
    },
    {
      gif: won5,
      source: 'https://tenor.com/view/baby-dance-mood-congrats-congratulations-gif-17089924410732058934',
    },
  ],
  impossible: [
    {
      gif: impossible1,
      source: 'https://tenor.com/view/wut-shocked-eye-pop-big-eyes-gif-15244901',
    },
  ],
};

export const randomGif = (fromWhere: keyof GifRepo): GifEntry => {
  const size = GIFS[fromWhere].length;
  const index = Math.floor(Math.random() * size);
  return GIFS[fromWhere][index];
};
