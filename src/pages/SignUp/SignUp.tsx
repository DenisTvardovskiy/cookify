import React, { FC } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import * as Yup from 'yup';

import { ImageContainer, Logo, AuthorizedMessage } from '../../components';
import { useApi, useAuthorization } from '../../hooks';
import { AuthLayout, ServerResponseLayout } from '../../layouts';
import useStyles from './styles';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

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
      <div className={classNames(classes.authWrap, classes.withForm)}>
        <div className={classes.navWrap}>
          <Link to='/'>Назад</Link>
        </div>
        <div className={classes.formWrapper}>
          <FormikProvider value={formik}>
            <form noValidate onSubmit={handleSubmit}>
              <Logo vertical />
              <TextField
                error={!!errors.username}
                name='username'
                id='username'
                required
                placeholder="Ім'я користувача"
                value={values.username}
                onChange={handleChange}
                helperText={errors.username}
              />
              <TextField
                error={!!errors.email}
                name='email'
                id='email'
                required
                placeholder='Електронна пошта'
                value={values.email}
                onChange={handleChange}
                helperText={errors.email}
              />
              <TextField
                type='password'
                error={!!errors.password}
                name='password'
                id='password'
                required
                placeholder='Пароль'
                value={values.password}
                onChange={handleChange}
                helperText={errors.password}
              />
              <TextField
                type='password'
                error={!!errors.passwordConfirmation}
                name='passwordConfirmation'
                id='passwordConfirmation'
                required
                placeholder='Повторити пароль'
                value={values.passwordConfirmation}
                onChange={handleChange}
                helperText={errors.passwordConfirmation}
              />
              <Button variant='outlined' type='submit' disabled={!isValid}>
                Створити акаунт
              </Button>
              <p className={classes.accountHint}>
                Маєте акаунт? <Link to={'/sign-in'}>Увійти</Link>
              </p>
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
