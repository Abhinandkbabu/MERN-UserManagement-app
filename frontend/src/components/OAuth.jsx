import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../util/firebase.js';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom'
axios.defaults.withCredentials = true;

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const formData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      const res = await axios.post('http://localhost:3000/api/auth/google', formData);

      if (res.data) {
        dispatch(signInSuccess(res.data));
        navigate('/')
      }
    } catch (err) {
      console.error('Error during Google sign-in:', err);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      className='mt-3 w-full bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
