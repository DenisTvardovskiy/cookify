import React, { FC } from 'react';
import { Avatar, Button } from '@mui/material';

import { Container } from '../../shared/Container';
import useStyles from './style';
import { Logo } from '../../shared/Logo';
import { useAuthorization } from '../../../hooks';
import { Link } from 'react-router-dom';

interface IProps {}

export const Navigation: FC = (props: IProps): JSX.Element => {
  const { isAuthorized, resetAuthorization } = useAuthorization();
  const classes = useStyles();

  return (
    <Container whiteStyle>
      <nav className={classes.navigation}>
        <div className={classes.navWrapper}>
          <Link to='/'>
            <Logo />
          </Link>
          <Link to='/'>Рецепти</Link>
          <Link to='/ingredients'>Інгредієнти</Link>
        </div>

        {!isAuthorized ? (
          <div className={classes.navWrapper}>
            <Button variant='outlined'>
              <Link to='/sign-in'>Увійти</Link>
            </Button>
          </div>
        ) : (
          <div className={classes.accountWrap}>
            <Button variant='outlined' onClick={resetAuthorization}>
              Вийти
            </Button>
            <Link to='/profile'>
              <Avatar className={classes.avatar} />
            </Link>
          </div>
        )}
      </nav>
    </Container>
  );
};
