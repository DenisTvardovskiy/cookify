import React, { FC } from 'react'
import { Sort } from '@mui/icons-material'
import { Button } from '@mui/material'

import { Container, Footer, RecipesList, Navigation } from '../../components'
import useStyles from './styles'

interface IProps {}

export const Landing: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles()

  return (
    <>
      <Navigation />
      <Container>
        <div className={classes.filterWrap}>
          <h2>Last recipes</h2>
          <Button variant='outlined'>
            <Sort /> Filter
          </Button>
        </div>
      </Container>
      <RecipesList />
      <Footer />
    </>
  )
}
