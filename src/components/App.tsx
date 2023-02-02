import React from 'react'

import { RootLayout } from './layout/RootLayout'
import { Container } from './layout/Container'

export const App = () => {
  return (
    <RootLayout>
      <Container>
        <div>Hello world</div>
      </Container>
    </RootLayout>
  )
}
