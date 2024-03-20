import { FC } from 'react';

type Props = {
  subTitle?: string;
};
export const AppHeader: FC<Props> = ({ subTitle } = { subTitle: undefined }) => (
  <h1>Mines💣 {subTitle && ` | ${subTitle}`}</h1>
);
