import React, { FC } from 'react'

import useStyles from './styles'

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}

export const AuthLayout: FC = (props: IProps) => {
  const classes = useStyles()

  return <div className={classes.authLayout}>{props.children}</div>
}
