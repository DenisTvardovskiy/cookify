import React, { FC } from 'react';
import { Container, Footer, Navigation } from '../../components';

interface IProps {}

export const Profile: FC<IProps> = (props: IProps): JSX.Element => {
  return (
    <>
      <Navigation />
      <Container>123</Container>
      <Footer />
    </>
  );
};
