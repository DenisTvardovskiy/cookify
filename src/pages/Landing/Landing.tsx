import React, { FC } from 'react'
import { Container, Navigation } from '../../components'
import { useLoader } from '../../hooks'
import { RootLayout } from '../../layouts'

interface IProps {}

export const Landing: FC<IProps> = (props: IProps): JSX.Element => {
  return (
    <RootLayout>
      <Navigation />
      <Container>
        <div>
          <h1>Hello</h1>
        </div>
      </Container>
    </RootLayout>
  )
}
