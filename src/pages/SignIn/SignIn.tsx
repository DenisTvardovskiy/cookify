import React, { FC } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import * as Yup from 'yup';

import { AuthorizedMessage, ImageContainer, Logo } from '../../components';
import { useApi, useAuthorization } from '../../hooks';
import { AuthLayout, ServerResponseLayout } from '../../layouts';

import useStyles from './styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

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
          <img src='images/auth1.jpg' alt='Cookify' />
        </ImageContainer>
      </div>
      <div className={classNames(classes.authWrap, classes.withForm)}>
        <div className={classes.navWrap}>
          <Link to='/'>Назад</Link>
        </div>
        <div className={classes.formWrapper}>
          <div>
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
                  error={!!errors.password}
                  name='password'
                  id='password'
                  required
                  placeholder='Пароль'
                  value={values.password}
                  onChange={handleChange}
                  helperText={errors.password}
                />
                <Button variant='outlined' type='submit' disabled={!isValid}>
                  Увійти
                </Button>
              </form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </AuthLayout>
  ) : (
    <ServerResponseLayout>
      <AuthorizedMessage />
    </ServerResponseLayout>
  );
};
