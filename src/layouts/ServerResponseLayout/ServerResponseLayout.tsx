import React, { FC } from 'react'

import useStyles from './styles'

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}

export const ServerResponseLayout: FC<IProps> = ({ children }): JSX.Element => {
  const classes = useStyles()

  return <div className={classes.serverResponseLayout}>{children}</div>
}
