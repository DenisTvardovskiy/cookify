import React, { FC, HTMLAttributes, SyntheticEvent } from 'react';
import { Autocomplete, AutocompleteRenderInputParams, TextField } from '@mui/material';

import SearchOption from './searchOption';

interface IProps {
  criteria: string;
  onChangeCriteria: (event: SyntheticEvent<Element, Event>, newValue: IOption | null) => void;
  onChangeInput: (event: SyntheticEvent, newInputValue: string) => void;
  options: IOption[];
  value: string;
  placeholder: string;
}

export interface IOption {
  label: string;
  value: string;
  category: string;
}

export const SearchBar: FC<IProps> = ({
  criteria,
  onChangeCriteria,
  onChangeInput,
  options,
  value,
  placeholder,
}: IProps): JSX.Element => {
  const searchInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} data-testid={'searchInput'} placeholder={placeholder} fullWidth />
  );

  const renderOption = (props: HTMLAttributes<HTMLElement>, option: any) => (
    <li {...props} data-testid={'search-option'}>
      <SearchOption option={option} criteria={criteria} />
    </li>
  );

  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      data-testid={'search-bar'}
      options={options ?? []}
      value={value}
      onChange={onChangeCriteria}
      onInputChange={onChangeInput}
      renderInput={searchInput}
      sx={{ width: 300 }}
      filterOptions={(x) => x}
      renderOption={renderOption}
    />
  );
};
