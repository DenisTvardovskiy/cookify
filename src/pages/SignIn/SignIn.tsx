import React, { FC } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import * as Yup from 'yup';

import { AuthorizedMessage, ImageContainer, Logo } from '../../components';
import { useApi, useAuthorization } from '../../hooks';
import { AuthLayout, ServerResponseLayout } from '../../layouts';
import useStyles from './styles';

interface IProps {}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required!'),
  password: Yup.string().required('Password is required!'),
});

export const SignIn: FC<IProps> = (props: IProps): JSX.Element => {
  const api = useApi();
  const { isAuthorized, setAuthorization } = useAuthorization();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: (values) =>
      api.authorization
        .signIn({ ...values })
        .then(({ refreshToken, jsonWebToken }) => setAuthorization(jsonWebToken, refreshToken)),
  });

  const { values, handleChange, handleSubmit, isValid, errors } = formik;

  return !isAuthorized ? (
    <AuthLayout>
      <div className={classes.authWrap}>
        <ImageContainer>
          <img src='./assets/auth1.jpg' alt='Cookify' />
        </ImageContainer>
      </div>
      <div className={classes.authWrap}>
        <Logo vertical />
        <div className={classes.formWrapper}>
          <FormikProvider value={formik}>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                error={!!errors.username}
                name='username'
                id='username'
                required
                placeholder='Username'
                value={values.username}
                onChange={handleChange}
                helperText={errors.username}
              />
              <TextField
                error={!!errors.password}
                name='password'
                id='password'
                required
                placeholder='Password'
                value={values.password}
                onChange={handleChange}
                helperText={errors.password}
              />
              <Button variant='outlined' type='submit' disabled={!isValid}>
                log in
              </Button>
            </form>
          </FormikProvider>
        </div>
      </div>
    </AuthLayout>
  ) : (
    <ServerResponseLayout>
      <AuthorizedMessage />
    </ServerResponseLayout>
  );
};
