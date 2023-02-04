import React, { FC } from 'react';
import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material';
import { AccountCircle, Sort } from '@mui/icons-material';

import { Container } from '../Container';
import { useGlobalElements } from '../../theme/globalElements';
import useStyles from './style';
import { Logo } from '../Logo';
import { useAuthorization } from '../../hooks';
import { Link } from 'react-router-dom';

interface IProps {}

export const Navigation: FC = (props: IProps): JSX.Element => {
  const { isAuthorized, resetAuthorization } = useAuthorization();
  const classes = useStyles();
  const globalElements = useGlobalElements();

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
  ];

  return (
    <Container whiteStyle>
      <nav className={classes.navigation}>
        <div className={classes.navWrapper}>
          <div className={classes.openMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <a href='#'>
            <Logo />
          </a>
        </div>

        <div className={classes.navWrapper}>
          <Autocomplete
            className={classes.searchBar}
            disablePortal
            options={top100Films}
            renderInput={(params) => (
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                {...params}
                placeholder='Search for recipe...'
              />
            )}
          />
          <Button variant='outlined'>
            <Sort /> Ingredients
          </Button>
        </div>

        {!isAuthorized ? (
          <div>
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
