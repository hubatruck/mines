import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Canvas } from './canvas';
import { Difficulty } from '../../types';
import { GameBoard, HandlerArgs } from './game-board/board-types';
import { boardGenerator } from './game-board/board-generator';
import { flagField, visitField } from './game-board/board-visitor';
import { useAudioPlayer } from './audio-player';

export const GameScreen: FC = () => {
  const { difficulty } = useParams();
  const audioPlayer = useAudioPlayer();
  const navigate = useNavigate();

  const [size, setSize] = useState(-1);
  const gameBoard = useRef<GameBoard | undefined>(undefined);
  const [gameOver, setGameOver] = useState(false);

  useEffect((): void => {
    if (difficulty === undefined) return;
    if (!Object.keys(Difficulty).includes(difficulty ?? '')) {
      setSize(10);
      return;
    }

    const newSize = (Number(difficulty) + 1) * 10;
    setSize(newSize);
    gameBoard.current = boardGenerator(newSize, Number(difficulty));
  }, [difficulty]);

  const onClick = useCallback(
    ({ pos, isLeftClick }: HandlerArgs): void => {
      if (gameBoard.current && gameBoard.current.size() > 0 && !gameOver) {
        if (isLeftClick) {
          visitField(pos, gameBoard);
          audioPlayer.click?.play();
        } else {
          flagField(pos, gameBoard);
          audioPlayer.flag?.play();
        }

        if (gameBoard.current.at(pos).isBomb && isLeftClick) {
          setGameOver(true);
          audioPlayer.bomb?.play();
          alert('game over :c');
          navigate('/over');
          return;
        }

        if (gameBoard.current.won()) {
          setGameOver(true);
          audioPlayer.won?.play();
          alert('done');
          navigate('/won');
        }
      }
    },
    [gameOver, audioPlayer],
  );

  return size > 0 ? <Canvas ref={gameBoard} onClick={onClick} /> : <div>Loading...</div>;
};
