import AppRouter from './components/AppRouter';
import { isSignedIn } from './app/auth';
import { Navigate } from 'react-router-dom';

export default function App() {
  return (
    isSignedIn()
      ? <AppRouter />
      : <Navigate to="/" />
  );
}
