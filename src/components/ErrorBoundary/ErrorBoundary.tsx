import { Component, ErrorInfo, ReactNode } from 'react';
import { images } from '@constants/images';
import { ERR_BOUNDARY_MESS } from '@constants/messages';

import './styled.scss';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary">
          <img src={images.logo} alt="logo" />
          <p>Something went wrong</p>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
