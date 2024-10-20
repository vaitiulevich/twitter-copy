import { images } from '@constants/images';

import './styles.scss';
export const SearchSidebar = () => {
  return (
    <aside className="search-sidebar">
      <div className="search-inp-block">
        <button className="search-inp-btn">
          <img src={images.search} alt="search" />
        </button>
        <input placeholder="Search Twitter" className="search-inp" />
      </div>
    </aside>
  );
};
