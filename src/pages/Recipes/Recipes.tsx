import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Container, Footer, GridContainer, Navigation, Recipe } from "../../components";
import useStyles from "./styles";
import { Sort } from "@mui/icons-material";
import { Button, Pagination } from "@mui/material";
import { useApi } from "../../hooks";
import { IRecipe } from "../../models";
import { debounce } from "lodash";
import { IOption, SearchBar } from "./SearchBar";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [ search ]);
}

export const Recipes: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  const api = useApi();
  const navigate = useNavigate();
  const query = useQuery();
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
      Page: 1,
      PageSize: 10,
      Offset: 0,
    },
  });

  useEffect(() => {
    api.recipes
      .paginatedList({
        params: {
          ...params, TitleContains: search,
          Pagination: {
            ...params.Pagination,
            Page: +query.get("page") || 1,
          },
        },
      })
      .then(({ items, count, totalCount, offset, page }) => {
        setParams((prevState) => {
          return {
            ...prevState,
            Pagination: {
              Offset: offset,
              Page: page,
              PageSize: count,
            },
          };
        });
        setTotal(totalCount);
        setItems(items);
      });
  }, [ params.Pagination.Page, search, +query.get("page") ]);

  useEffect(() => {
    api.recipes
      .paginatedList({ params: { ...params, TitleContains: criteria } })
      .then(({ items, count, totalCount, offset, page }) => {
        setOptions(
          items.map((item) => {
            return { label: item.title, value: item.title, category: item.category.name };
          }),
        );
      });
  }, [ criteria ]);

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
            PageSize: 10,
          },
        };
      });
      setSearch("");
    } else {
      setSearch(newValue.label);
    }
    navigate("/");
  };

  const debouncedSearch = useRef(
    debounce(async (text: string) => {
      setSearch(text);
      setCriteria(text);
      navigate("/");
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
      <Container>
        <Pagination
          count={Math.ceil(total / params.Pagination.PageSize)}
          page={params.Pagination.Page}
          onChange={(e, page) => navigate("?page=" + page)}
          variant="outlined"
        />
      </Container>
      <Footer />
    </>
  );
};
