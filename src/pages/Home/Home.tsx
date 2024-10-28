import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { Feed } from '@components/Feed/Feed';
import { allCursorPostsQuery, allPostsQuery } from '@utils/querys';

import './styles.scss';

export const Home = () => {
  return (
    <section className="home">
      <AddPostPanel />
      <Feed
        isNavigateFeed={true}
        query={allPostsQuery}
        firstQuery={() => allCursorPostsQuery}
      />
    </section>
  );
};
