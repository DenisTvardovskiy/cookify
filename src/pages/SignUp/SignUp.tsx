import React, { FC } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import * as Yup from 'yup';

import { ImageContainer, Logo, AuthorizedMessage } from '../../components';
import { useApi, useAuthorization } from '../../hooks';
import { AuthLayout, ServerResponseLayout } from '../../layouts';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

interface IProps {}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required!'),
  email: Yup.string().required('Email is required!'),
  passwordConfirmation: Yup.string().required('Passwords are not the same!'),
  password: Yup.string().required('Passwords are not the same!'),
});

export const SignUp: FC<IProps> = (props: IProps): JSX.Element => {
  const api = useApi();
  const navigate = useNavigate();
  const { isAuthorized } = useAuthorization();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { username: '', email: '', password: '', passwordConfirmation: '' },
    validationSchema,
    onSubmit: (values) => api.authorization.signUp({ ...values }).then(() => navigate('/sign-in')),
  });

  const { values, handleChange, handleSubmit, isValid, errors } = formik;

  return !isAuthorized ? (
    <AuthLayout>
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
                error={!!errors.email}
                name='email'
                id='email'
                required
                placeholder='Email'
                value={values.email}
                onChange={handleChange}
                helperText={errors.email}
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
              <TextField
                error={!!errors.passwordConfirmation}
                name='passwordConfirmation'
                id='passwordConfirmation'
                required
                placeholder='Retype password'
                value={values.passwordConfirmation}
                onChange={handleChange}
                helperText={errors.passwordConfirmation}
              />
              <Button variant='outlined' type='submit' disabled={!isValid}>
                Sign up
              </Button>
            </form>
          </FormikProvider>
        </div>
      </div>
      <div className={classes.authWrap}>
        <ImageContainer>
          <img src='images/auth2.jpg' alt='Cookify' />
        </ImageContainer>
      </div>
    </AuthLayout>
  ) : (
    <ServerResponseLayout>
      <AuthorizedMessage />
    </ServerResponseLayout>
  );
};
