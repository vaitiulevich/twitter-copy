import { ChangeEvent, useState } from 'react';
import { images } from '@constants/images';

import './styles.scss';

export const SearchSidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const changeSerachText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <aside className="search-sidebar">
      <img src={images.logo} alt="logo" className="mobile-header-logo" />
      <div className="search-inp-block">
        <button className="search-inp-btn">
          <img src={images.search} alt="search" />
        </button>
        <input
          placeholder="Search Twitter"
          value={searchTerm}
          onChange={changeSerachText}
          className="search-inp"
        />
      </div>
    </aside>
  );
};
