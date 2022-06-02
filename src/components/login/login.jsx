import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useUser } from '../../utils/context';

function Login() {
  const { setUser } = useUser();

  return (
    <div className="login">
      <h1>ברוכים הבאים</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const userObj = jwt_decode(credentialResponse.credential);

          setUser({
            name: userObj.given_name,
            email: userObj.email,
            picture: userObj.picture,
          });
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
}

export default Login;
