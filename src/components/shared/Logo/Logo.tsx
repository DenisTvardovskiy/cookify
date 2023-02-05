import React, { FC } from 'react';
import classNames from 'classnames';

import useStyles from './style';

interface IProps {
  vertical?: Boolean;
}

export const Logo: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classNames({ [classes.logo]: true, [classes.vertical]: props.vertical })}>
      <img src='./images/logo-soup.png' alt='Cookify' />
      <h5>Cookify</h5>
    </div>
  );
};
