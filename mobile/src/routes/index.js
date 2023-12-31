import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useAuthContext } from '../contexts/AuthContext';

export function Routes() {
  const { user } = useAuthContext();

  return (
    <NavigationContainer>
      {user?.email ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
