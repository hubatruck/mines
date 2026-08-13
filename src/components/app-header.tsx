import { pageTitle } from '../util';

type Props = {
  subTitle?: string;
};

export const AppHeader = ({ subTitle = undefined }: Props) => <h1>{pageTitle(subTitle)}</h1>;
