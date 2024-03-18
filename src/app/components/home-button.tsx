import { FC } from 'react';
import { Link } from 'react-router-dom';

export const HomeButton: FC = () => (
  <div>
    <Link to="/">
      <button type="button">Home</button>
    </Link>
  </div>
);
