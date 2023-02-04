import React, { FC } from "react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import { useApi } from "../../hooks";
import { AuthLayout } from "../../layouts";
import { Button, TextField } from "@mui/material";

interface IProps {}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  password: Yup.string().required("Password is required!"),
});

export const SignIn: FC<IProps> = (props: IProps): JSX.Element => {
  const api = useApi();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: (values) => api.authorization.signIn({ ...values }).then(() => console.log("log in")),
  });

  const { values, handleChange, handleSubmit, isValid, errors } = formik;

  return (
    <AuthLayout>
      <FormikProvider value={formik}>
        <form noValidate onSubmit={handleSubmit}>
          <div>
            <TextField
              error={!!errors.username}
              name="username"
              id="username"
              required
              label="Username"
              value={values.username}
              onChange={handleChange}
              helperText={errors.username}
            />
          </div>
          <div>
            <TextField
              error={!!errors.password}
              name="password"
              id="password"
              required
              label="Password"
              value={values.password}
              onChange={handleChange}
              helperText={errors.password}
            />
          </div>
          <Button variant="outlined" type="submit" disabled={!isValid}>
            log in
          </Button>
        </form>
      </FormikProvider>
    </AuthLayout>
  );
};
