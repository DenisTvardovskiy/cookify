import React, { FC } from 'react';

import useStyles from './style';

interface IProps {}

export const EmptyListMessage: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.emptyListMessage}>
      <div className={classes.message}>
        <img src='images/not-found.png' alt='Not found' />
        <h4>Нічого не знайдено</h4>
      </div>
    </div>
  );
};
