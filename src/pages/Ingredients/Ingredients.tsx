import React, { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Container, Footer, Navigation, SearchBar, IOption } from '../../components';
import useStyles from './styles';
import { Pagination } from '@mui/material';
import { useApi } from '../../hooks';
import { IIngredient } from '../../models';
import { debounce } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { IngredientsGrid } from '../../components/common/IngredientsGrid';

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
          UkrainianNameContains: search,
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
            return { label: item.ukrainianName, value: item.ukrainianName, category: '' };
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
    navigate('/ingredients');
  };

  const debouncedSearch = useRef(
    debounce(async (text: string) => {
      setSearch(text);
      setCriteria(text);
      navigate('/ingredients');
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
          <h2>Інгредієнти</h2>
          <div>
            <SearchBar
              criteria={criteria}
              options={options}
              value={search}
              onChangeCriteria={handleChangeCriteria}
              onChangeInput={handleInputChange}
              placeholder='Знайти інгредієнти'
            />
            {total && <span>Total search results: {total}</span>}
          </div>
        </div>
      </Container>
      <Container>
        <IngredientsGrid items={items} withAdd />
      </Container>

      {Boolean(items.length) && (
        <Container>
          <Pagination
            count={Math.ceil(total / params.Pagination.PageSize)}
            page={params.Pagination.Page}
            onChange={(e, page) => navigate('/ingredients?page=' + page)}
            variant='outlined'
          />
        </Container>
      )}
      <Footer />
    </>
  );
};
