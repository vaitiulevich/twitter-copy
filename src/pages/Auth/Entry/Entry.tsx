import { Link } from 'react-router-dom';
import { EntryFooter } from '@components/EntryFooter/EntryFooter';
import { GoogleSignUpButton } from '@components/GoogleSignUpButton/GoogleSignUpButton';
import { images } from '@constants/images';

import './styles.scss';

export const Entry = () => {
  return (
    <div className="entry-container">
      <section className="entry-content">
        <div>
          <img src={images.banner} alt="banner" />
        </div>
        <div className="entry-contant-panel">
          <div>
            <div>
              <img src={images.logo} alt="logo" />
            </div>
            <h1 className="entry-title">Happening now</h1>
            <h2 className="entry-subtitle">Join Twitter today</h2>
            <div className="entry-btns-panel">
              <GoogleSignUpButton />
              <Link to={'/sign-up'} className="entry-btn">
                Sign up with email
              </Link>
            </div>
            <div className="entry-terms">
              <p>
                By singing up you agree to the <a href="">Terms of Service</a>{' '}
                and <a href="">Privacy Policy</a>, including{' '}
                <a href="">Cookie Use</a>.
              </p>
              <div>
                <span>Already have an account? </span>
                <Link to={'/sign-in'}>Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EntryFooter />
    </div>
  );
};
