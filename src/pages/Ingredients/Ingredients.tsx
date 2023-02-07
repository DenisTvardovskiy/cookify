import React, { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Container, Footer, RecipesGrid, Ingredient, Navigation } from '../../components';
import useStyles from './styles';
import { Sort } from '@mui/icons-material';
import { Button, Pagination } from '@mui/material';
import { useApi } from '../../hooks';
import { IIngredient } from '../../models';
import { IOption, SearchBar } from '../Recipes/SearchBar';
import { debounce } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const Ingredients: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  const api = useApi();
  const navigate = useNavigate();
  const query = useQuery();
  const [items, setItems] = useState<IIngredient[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [criteria, setCriteria] = useState<string>('');
  const [search, setSearch] = useState<string | null>(null);
  const [options, setOptions] = useState<IOption[]>([]);
  const [params, setParams] = useState({
    NameContains: null,
    NameEquals: null,
    UkrainianNameContains: null,
    UkrainianNameEquals: null,
    Pagination: {
      Page: 1,
      PageSize: 12,
      Offset: 0,
    },
  });

  useEffect(() => {
    api.ingredients
      .paginatedList({
        params: {
          ...params,
          NameContains: search,
          Pagination: {
            ...params.Pagination,
            Page: +query.get('page') || 1,
          },
        },
      })
      .then(({ items, count, totalCount, offset, page }) => {
        setParams((prevState) => {
          return {
            ...prevState,
            Pagination: {
              ...prevState.Pagination,
              Offset: offset,
              Page: page,
            },
          };
        });
        setTotal(totalCount);
        setItems(items);
      });
  }, [params.Pagination.Page, search, +query.get('page')]);

  useEffect(() => {
    api.ingredients
      .paginatedList({ params: { ...params, NameContains: criteria } })
      .then(({ items, count, totalCount, offset, page }) => {
        setOptions(
          items.map((item) => {
            return { label: item.name, value: item.name, category: '' };
          }),
        );
      });
  }, [criteria]);

  const handleChangeCriteria = (
    event: SyntheticEvent<Element, Event>,
    newValue: IOption | null,
  ) => {
    if (newValue === null) {
      setParams((prevState) => {
        return {
          ...prevState,
          Pagination: {
            Offset: 0,
            Page: 1,
            PageSize: 12,
          },
        };
      });
      setSearch('');
    } else {
      setSearch(newValue.label);
    }
    navigate('/');
  };

  const debouncedSearch = useRef(
    debounce(async (text: string) => {
      setSearch(text);
      setCriteria(text);
      navigate('/');
    }, 300),
  ).current;

  const handleInputChange = (event: SyntheticEvent, newInputValue: string) => {
    debouncedSearch(newInputValue);
  };

  return (
    <>
      <Navigation />
      <Container>
        <div className={classes.filterWrap}>
          <h2>Ingredients</h2>
          <div>
            <SearchBar
              criteria={criteria}
              options={options}
              value={search}
              onChangeCriteria={handleChangeCriteria}
              onChangeInput={handleInputChange}
            />
            {total && <span>Total search results: {total}</span>}
          </div>
        </div>
      </Container>
      {/*<Container>*/}
      {/*  {items.length ? (*/}
      {/*    <RecipesGrid>*/}
      {/*      {items.map((item, index) => (*/}
      {/*        <Ingredient key={index} item={item} />*/}
      {/*      ))}*/}
      {/*    </RecipesGrid>*/}
      {/*  ) : (*/}
      {/*    'NOTHING TO SHOW'*/}
      {/*  )}*/}
      {/*</Container>*/}

      <Container>
        <Pagination
          count={Math.ceil(total / params.Pagination.PageSize)}
          page={params.Pagination.Page}
          onChange={(e, page) => navigate('?page=' + page)}
          variant='outlined'
        />
      </Container>
      <Footer />
    </>
  );
};
