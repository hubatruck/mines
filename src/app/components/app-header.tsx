import { FC } from 'react';

type Props = {
  subTitle?: string;
};
export const AppHeader: FC<Props> = ({ subTitle }) => <h1>Mines💣 {subTitle && ` | ${subTitle}`}</h1>;
