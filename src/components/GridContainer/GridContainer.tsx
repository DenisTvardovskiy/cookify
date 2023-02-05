import React, { FC } from 'react';
import useStyles from './styles';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const GridContainer: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  return <div className={classes.gridContainer}>{props.children}</div>;
};
