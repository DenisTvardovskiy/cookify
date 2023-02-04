import React, { FC } from 'react'

import useStyles from './style'
import { Container } from '../Container'

interface IProps {}

export const Navigation: FC = (props: IProps): JSX.Element => {
  const classes = useStyles()

  return (
    <Container whiteStyle>
      <nav className={classes.navigation}>
        <div>
          <div className={classes.openMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <a href='#'>
            <div className={classes.logo}>
              <img src='images/logo-soup.png' alt='Cookify' />
              <h5>Cookify</h5>
            </div>
          </a>
        </div>

        <div>
          <input className={classes.searchBar} placeholder='Search for recipe...' type='text' />
          <input type='text' placeholder='Ingredients' />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </nav>
    </Container>
  )
}
