import './styles.scss';
export const ErrorBlock = ({ message }: { message: string }) => {
  return <div className="error-block">{message}</div>;
};
