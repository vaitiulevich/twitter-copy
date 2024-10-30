import './styles.scss';

export const SkeletonPost = () => {
  return (
    <div className="post-sceleton">
      <div className="post-avatar-sceleton"></div>
      <div className="post-content-sceleton">
        <div className="post-name-sceleton"></div>
        <div className="post-text-sceleton"></div>
      </div>
    </div>
  );
};
