import type { ReactNode } from 'react';
import { Link } from 'react-router';

type Props = {
  path: string;
  children: ReactNode;
};

export const LinkButton = ({ path, children }: Props) => (
  <Link to={path}>
    <button type="button">{children}</button>
  </Link>
);
