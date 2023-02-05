import React, { FC } from 'react'
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'

import { useApi } from '../../hooks'
import { AuthLayout } from '../../layouts'

interface IProps {}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required!'),
  password: Yup.string().required('Password is required!'),
})

export const SignIn: FC<IProps> = (props: IProps): JSX.Element => {
  const api = useApi()

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: (values) => api.authorization.signIn({ ...values }).then(() => console.log('log in')),
  })

  const { values, handleChange, handleSubmit, isValid, errors } = formik

  return (
    <AuthLayout>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <div>
            <input type='text' name='username' value={values.username} onChange={handleChange} />
            {!!errors.username && <span>{errors.username}</span>}
          </div>
          <div>
            <input type='text' name='password' value={values.password} onChange={handleChange} />
            {!!errors.password && <span>{errors.password}</span>}
          </div>
          <button type='submit' disabled={!isValid}>
            log in
          </button>
        </form>
      </FormikProvider>
    </AuthLayout>
  )
}
