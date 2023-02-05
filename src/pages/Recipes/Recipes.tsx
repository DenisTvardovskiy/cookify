import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Container, Footer, GridContainer, Navigation, Recipe } from "../../components";
import useStyles from "./styles";
import { Sort } from "@mui/icons-material";
import { Button, Pagination } from "@mui/material";
import { useApi } from "../../hooks";
import { IRecipe } from "../../models";
import { debounce } from "lodash";
import { IOption, SearchBar } from "./SearchBar";

interface IProps {}

export const Recipes: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  const api = useApi();
  const [ items, setItems ] = useState<IRecipe[]>([]);
  const [ total, setTotal ] = useState<number | null>(null);
  const [ criteria, setCriteria ] = useState<string>("");
  const [ search, setSearch ] = useState<string | null>(null);
  const [ options, setOptions ] = useState<IOption[]>([]);
  const [ params, setParams ] = useState({
    TitleContains: null,
    TitleEquals: null,
    UkrainianTitleContains: null,
    UkrainianTitleEquals: null,
    Pagination: {
      CurrentPage: 1,
      PageSize: 10,
      Offset: 0,
    },
  });

  useEffect(() => {
    api.recipes.paginatedList({ params: { ...params, TitleContains: search } })
      .then(({ items, count, totalCount, offset, page }) => {
        setParams((prevState) => {
          return {
            ...prevState, Pagination: {
              Offset: offset,
              CurrentPage: page,
              PageSize: count,
            },
          };
        });
        setTotal(totalCount);
        setItems(items);
      });
  }, [ params.Pagination.CurrentPage, search ]);

  useEffect(() => {
    api.recipes.paginatedList({ params: { ...params, TitleContains: criteria } })
      .then(({ items, count, totalCount, offset, page }) => {
        setOptions(items.map((item) => {
          return { label: item.title, value: item.title, category: item.category.name };
        }));
      });
  }, [ criteria ]);

  const handleChangeCriteria = (
    event: SyntheticEvent<Element, Event>,
    newValue: IOption | null,
  ) => {
    if (newValue === null) {
      setParams((prevState) => {
        return {
          ...prevState, Pagination: {
            Offset: 0,
            CurrentPage: 1,
            PageSize: 10,
          },
        };
      });
      setSearch("");
    } else {
      setSearch(newValue.label);
    }
  };

  const debouncedSearch = useRef(
    debounce(async (text: string) => {
      setSearch(text);
      setCriteria(text);
      setParams((prevState) => {
        return {
          ...prevState, Pagination: {
            Offset: 0,
            CurrentPage: 1,
            PageSize: 10,
          },
        };
      });
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
          <h2>Recipes</h2>
          <div>
            <SearchBar
              criteria={criteria}
              options={options}
              value={search}
              onChangeCriteria={handleChangeCriteria}
              onChangeInput={handleInputChange}
            />
            <span>Total search results: {total}</span>
          </div>
          <Button variant="outlined">
            <Sort /> Filter
          </Button>
        </div>
      </Container>
      <Container>
        <GridContainer>
          {items.map((item) => (
            <Recipe key={item.id} item={item} />
          ))}
        </GridContainer>
      </Container>
      <Pagination
        count={Math.ceil(total / params.Pagination.PageSize)}
        page={params.Pagination.CurrentPage}
        onChange={(e, page) => {
          setParams((prevState) => {
            return {
              ...prevState, Pagination: {
                ...prevState.Pagination,
                CurrentPage: page,
              },
            };
          });
        }}
        variant="outlined"
      />
      <Footer />
    </>
  );
};
