import React, { FC } from 'react'
import classNames from 'classnames'

import useStyles from './styles'

interface IProps {
  children: React.ReactNode | React.ReactNode[]
  hoverAnimation?: Boolean
}

export const ImageContainer: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles()
  return (
    <div
      className={classNames({
        [classes.imageContainer]: true,
        [classes.hoverAnimation]: props.hoverAnimation,
      })}
    >
      {props.children}
    </div>
  )
}
