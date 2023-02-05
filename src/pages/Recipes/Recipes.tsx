import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Container, Footer, GridContainer, Navigation, Recipe } from "../../components";
import useStyles from "./styles";
import { Sort } from "@mui/icons-material";
import { Button, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
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
  const [ category, setCategory ] = useState<string>("");
  const [ categories, setCategories ] = useState<{ id: string, name: string, ukrainianName: string, imageLink: string }[]>(
    []);
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
          CategoryIdEquals: category,
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
              ...prevState.Pagination,
              Offset: offset,
              Page: page,
            },
          };
        });
        setTotal(totalCount);
        setItems(items);
      });
  }, [ params.Pagination.Page, search, +query.get("page"), category ]);

  useEffect(() => {
    api.recipes
      .paginatedList({ params: { ...params, CategoryIdEquals: category, TitleContains: criteria } })
      .then(({ items, count, totalCount, offset, page }) => {
        setOptions(
          items.map((item) => {
            return { label: item.title, value: item.title, category: item.category.name };
          }),
        );
      });
  }, [ criteria ]);

  useEffect(() => {
    api.recipe.categories.list({ loader: "Loading categories..." }).then((data) => {
      setCategories(data);
    });
  }, []);

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

  const handleSelectCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
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
          <Select
            value={category}
            label="Category"
            onChange={handleSelectCategory}
          >
            <MenuItem value="">Жодна</MenuItem>
            {categories.map((cat) => <MenuItem value={cat.id}>{cat.ukrainianName}</MenuItem>)}
          </Select>
          <Button variant="outlined">
            <Sort /> Ingredients
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
