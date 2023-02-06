import React, { FC } from 'react';
import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material';
import { AccountCircle, Sort } from '@mui/icons-material';

import { Container } from '../../shared/Container';
import useStyles from './style';
import { Logo } from '../../shared/Logo';
import { useApi, useAuthorization } from '../../../hooks';
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
        </div>

        {!isAuthorized ? (
          <div className={classes.navWrapper}>
            <Button variant='outlined'>
              <Link to='/sign-in'>Увійти</Link>
            </Button>
          </div>
        ) : (
          <Button variant='outlined' onClick={resetAuthorization}>
            Вийти
          </Button>
        )}
      </nav>
    </Container>
  );
};
