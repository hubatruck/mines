import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Canvas } from './canvas';
import { BOARD_SIZE } from '../../types';
import { GameBoard, HandlerArgs } from './game-types';
import { fieldGenerator } from './field-generator';
import { flagField, visitField } from './field-visitor';
import { useAudioPlayer } from './audio-player';

export const GameScreen: FC = () => {
  const { difficulty } = useParams();
  const audioPlayer = useAudioPlayer();
  const navigate = useNavigate();

  const [size, setSize] = useState(-1);
  const gameBoard = useRef<GameBoard>([[]]);
  const [gameOver, setGameOver] = useState(false);

  useEffect((): void => {
    if (difficulty === undefined) return;
    if (!Object.keys(BOARD_SIZE).includes(difficulty ?? '')) {
      setSize(10);
      return;
    }

    const newSize = (Number(difficulty) + 1) * 10;
    setSize(newSize);
    gameBoard.current = fieldGenerator(newSize, Number(difficulty));
  }, [difficulty]);

  const onClick = useCallback(
    ({ pos, isLeftClick }: HandlerArgs): void => {
      if (gameBoard.current.size() > 0 && !gameOver) {
        if (isLeftClick) {
          visitField(pos, gameBoard);
          audioPlayer.click?.play();
        } else {
          flagField(pos, gameBoard);
          audioPlayer.flag?.play();
        }

        // console.log(
        //   'end',
        //   gameOver,
        //   'left click:',
        //   isLeftClick,
        //   'bomb',
        //   gameBoard.current[pos.col][pos.row].isBomb,
        //   pos,
        //   gameBoard,
        // );

        if (gameBoard.current.won()) {
          setGameOver(true);
          audioPlayer.won?.play();
          alert('done');
          navigate('/won');
        }

        if (gameBoard.current.at(pos).isBomb && isLeftClick) {
          setGameOver(true);
          audioPlayer.bomb?.play();
          alert('game over :c');
          navigate('/over');
        }
        // gameBoard.current = updatedBoard;
      }
    },
    [gameOver, audioPlayer],
  );

  return size > 0 ? <Canvas ref={gameBoard} onClick={onClick} /> : <div>Loading...</div>;
};
