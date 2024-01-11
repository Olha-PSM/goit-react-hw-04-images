import { useState } from 'react';
import { Search, SearchBtn, SearchInput, SearchForm } from './Searchbar.styled';
import { BiSearch } from 'react-icons/bi';

import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      toast.warn('Please, fill input search field');
      return;
    }
    onSubmit(query);

    setQuery('');
  };

  return (
    <Search>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <BiSearch size={'2em'} />
        </SearchBtn>

        <SearchInput
          type="text"
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </SearchForm>
    </Search>
  );
};
