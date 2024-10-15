import { Link } from 'react-router-dom';
import { EntryFooter } from '@components/EntryFooter/EntryFooter';
import { images } from '@constants/images';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import './styles.scss';
import { auth } from '../../../firebase';

export const Entry = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };
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
              <button onClick={handleGoogleSignIn} className="enty-btn">
                <img src={images.googleIcon} alt="google" />
                <span>Sign up with Google</span>
              </button>
              <Link to={'/sign-up'} className="enty-btn">
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
