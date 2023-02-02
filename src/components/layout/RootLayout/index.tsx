import React from 'react'

import useStyles from './styles'

export const RootLayout = (children: React.ReactNode[]) => {
  const classes = useStyles()

  return <div className={classes.rootLayout}>{children}</div>
}
