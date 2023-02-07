import React, { FC, useEffect, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import * as Yup from "yup";

import { AuthorizedMessage, ImageContainer, IngredientSelect, Logo } from "../../components";
import { useApi, useAuthorization } from "../../hooks";
import { AuthLayout, ServerResponseLayout } from "../../layouts";

import useStyles from "./styles";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { IIngredient } from "../../models";

interface IProps {}

const validationSchema = Yup.object().shape({
  UkrainianTitle: Yup.string().required("Username is required!"),
  UkrainianInstruction: Yup.string().required("Password is required!"),
  CategoryId: Yup.string().required("Password is required!"),
  IsPublic: Yup.boolean().required(),
});

export const CreateRecipe: FC<IProps> = (props: IProps): JSX.Element => {
  const api = useApi();
  const [image, setImage] = useState<File>();
  const [ categories, setCategories ] = useState<{ id: string; name: string; ukrainianName: string; imageLink: string }[]>(
    []);
  const classes = useStyles();

  const navigate = useNavigate();

  useEffect(() => {
    api.recipe.categories.list({ loader: "Завантаження категорій..." }).then((data) => {
      setCategories(data);
    });
  }, []);

  const formik = useFormik({
    initialValues: { UkrainianTitle: "", UkrainianInstruction: "", CategoryId: "", IsPublic: true },
    validationSchema,
    onSubmit: (values) =>
      api.recipes
        .create({ ...values, image })
        .then((id) => {
          navigate(`/recipe/${id}`);
        }),
  });

  const { values, handleChange, handleSubmit, isValid, errors } = formik;

  return (
    <AuthLayout>
      <div className={classes.authWrap}>
        <ImageContainer>
          <img src="images/auth1.jpg" alt="Cookify" />
        </ImageContainer>
      </div>
      <div className={classNames(classes.authWrap, classes.withForm)}>
        <div className={classes.navWrap}>
          <Link to="/">Назад</Link>
        </div>
        <div className={classes.formWrapper}>
          <div>
            <FormikProvider value={formik}>
              <form noValidate onSubmit={handleSubmit}>
                <Logo vertical />
                <input type='file' onChange={(event) => setImage(event.target.files[0])} />
                <TextField
                  error={!!errors.UkrainianTitle}
                  name="UkrainianTitle"
                  id="UkrainianTitle"
                  required
                  placeholder="Назва"
                  value={values.UkrainianTitle}
                  onChange={handleChange}
                  helperText={errors.UkrainianTitle}
                />
                <TextField
                  error={!!errors.UkrainianInstruction}
                  name="UkrainianInstruction"
                  id="UkrainianInstruction"
                  required
                  placeholder="Спосіб приготування"
                  value={values.UkrainianInstruction}
                  onChange={handleChange}
                  helperText={errors.UkrainianInstruction}
                />
                <Select
                  value={values.CategoryId}
                  label="Категорія"
                  name="CategoryId"
                  onChange={handleChange}
                >
                  <MenuItem value="Жодна">Жодна</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.ukrainianName}
                    </MenuItem>
                  ))}
                </Select>
                <Button variant="outlined" type="submit" disabled={!isValid}>
                  створити
                </Button>
              </form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
