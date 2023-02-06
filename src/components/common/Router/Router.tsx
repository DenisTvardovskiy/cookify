import React, { FC } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { withCheckAuthorization } from '../../../hocs';
import * as Page from '../../../pages';

interface IProps {}

const PageProfileWithCheckAuthorization = withCheckAuthorization(Page.Profile);

export const Router: FC<IProps> = (props: IProps): JSX.Element => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Page.Recipes />} />
        <Route path='/recipe/:id' element={<Page.Recipe />} />
        <Route path='/ingredients' element={<Page.Ingredients />} />
        <Route path='/ingredient/:id' element={<Page.Ingredient />} />
        <Route path='/sign-in' element={<Page.SignIn />} />
        <Route path='/sign-up' element={<Page.SignUp />} />
        <Route path='/profile' element={<PageProfileWithCheckAuthorization />} />
        <Route path='*' element={<Page.NotFound />} />
      </Routes>
    </HashRouter>
  );
};
