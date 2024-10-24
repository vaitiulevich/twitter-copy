import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { EntryFooter } from '@components/EntryFooter/EntryFooter';
import { GoogleSignButton } from '@components/GoogleSignButton/GoogleSignButton';
import { images } from '@constants/images';
import { selectUserId } from '@store/selectors';

import './styles.scss';

export const Entry = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUserId);
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user]);
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
              <GoogleSignButton text="Sign up with Google" type="signup" />
              <Link to={'/sign-up'} className="entry-btn">
                Sign up with email
              </Link>
            </div>
            <div className="entry-terms">
              <p>
                By singing up you agree to the{' '}
                <Link to={'terms'}>Terms of Service</Link> and{' '}
                <Link to={'/policy'}>Privacy Policy</Link>, including{' '}
                <Link to={'/cookie'}>Cookie Use</Link>.
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
