import React, { FC } from 'react'

import useStyles from './styles'

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}

export const RootLayout: FC<IProps> = ({ children }): JSX.Element => {
  const classes = useStyles()

  return <div className={classes.rootLayout}>{children}</div>
}
