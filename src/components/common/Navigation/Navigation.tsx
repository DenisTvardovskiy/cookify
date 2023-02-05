import React, { FC } from 'react';
import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material';
import { AccountCircle, Sort } from '@mui/icons-material';

import { Container } from '../Container';
import useStyles from './style';
import { Logo } from '../../shared/Logo';
import { useApi, useAuthorization } from '../../../hooks';
import { Link } from 'react-router-dom';

interface IProps {}

export const Navigation: FC = (props: IProps): JSX.Element => {
  const { isAuthorized, resetAuthorization } = useAuthorization();
  const classes = useStyles();
  const api = useApi();

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
  ];

  return (
    <Container whiteStyle>
      <nav className={classes.navigation}>
        <div className={classes.navWrapper}>
          <Link to='/'>
            <Logo />
          </Link>
        </div>

        {/*<Button variant='outlined'>*/}
        {/*  <Sort /> Ingredients*/}
        {/*</Button>*/}
        {!isAuthorized ? (
          <div className={classes.navWrapper}>
            <Button variant='outlined'>
              <Link to='/sign-in'>Sign in</Link>
            </Button>
            <Button variant='outlined'>
              <Link to='/sign-up'>Sign up</Link>
            </Button>
          </div>
        ) : (
          <Button variant='outlined' onClick={resetAuthorization}>
            Log Out
          </Button>
        )}
      </nav>
    </Container>
  );
};
