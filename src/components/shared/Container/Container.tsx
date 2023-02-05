import React, { FC } from 'react';
import classNames from 'classnames';

import useStyles from './styles';

interface IProps {
  whiteStyle?: Boolean;
  children: React.ReactNode | React.ReactNode[];
}

export const Container: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={classNames({
        [classes.container]: true,
        [classes.whiteStyle]: props.whiteStyle,
      })}
    >
      {props.children}
    </div>
  );
};
