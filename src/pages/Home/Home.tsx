import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { Feed } from '@components/Feed/Feed';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import { allPostsQuery } from '@utils/querys';

import './styles.scss';

export const Home = () => {
  return (
    <section className="home">
      <div className="home-header">
        <h3>Home</h3>
        <ThemeToggle />
      </div>
      <AddPostPanel />
      <Feed query={allPostsQuery} />
    </section>
  );
};
