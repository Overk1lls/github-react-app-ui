import { isSignedIn } from './app/auth';
import { Navigate } from 'react-router-dom';

export default function App() {
  return (
    isSignedIn()
      ? <h2>Home Page</h2>
      : <Navigate to="/" />
  );
}
