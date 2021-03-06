import React, { useState } from 'react';
import SearchbarInput from './SearchbarInput';
import SearchbarContent from './SearchbarContent';

const Searchbar = () => {
  const [ isSearching, setIsSearching ] = useState(false);
  const [ input, setInput ] = useState('');

  return (
    <div className="searchbar-container">
      <SearchbarInput isSearching={isSearching} setIsSearching={setIsSearching} input={input} setInput={setInput}/>
      <SearchbarContent isSearching={isSearching} input={input}/>
    </div>
  );
};

export default Searchbar;

