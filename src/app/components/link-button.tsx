import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  path: string;
  children: ReactNode;
};
export const LinkButton: FC<Props> = ({ path, children }) => {
  return (
    <Link to={path}>
      <button type="button">{children}</button>
    </Link>
  );
};
