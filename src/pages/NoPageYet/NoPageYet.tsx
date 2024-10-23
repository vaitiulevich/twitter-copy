import { Link } from 'react-router-dom';
import { images } from '@constants/images';

import './styled.scss';
export const NoPageYet = () => {
  return (
    <section className="no-page-yet">
      <img src={images.logo} alt="logo" />
      <p>There is no page yet</p>
      <Link className="to-entry-link" to={'/'}>
        to entry
      </Link>
    </section>
  );
};
