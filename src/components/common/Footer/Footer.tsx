import React, { FC } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Container } from '../Container';
import useStyles from './styles';

interface IProps {}

export const Footer: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Container whiteStyle>
      <div className={classes.footer}>
        With <FavoriteIcon /> by JWP
      </div>
    </Container>
  );
};
