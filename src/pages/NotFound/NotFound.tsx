import React, { FC } from 'react'
import { ServerResponseLayout } from '../../layouts'

interface IProps {}

export const NotFound: FC<IProps> = (props: IProps): JSX.Element => {
  return (
    <ServerResponseLayout>
      <h2>404 NotFound Page</h2>
      <a href='#'>Son, come back home</a>
    </ServerResponseLayout>
  )
}
