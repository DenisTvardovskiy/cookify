import React, { FC } from 'react'

import useStyles from './styles'

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}

export const Container: FC<IProps> = ({ children }): JSX.Element => {
  const classes = useStyles()

  return <div className={classes.container}>{children}</div>
}
