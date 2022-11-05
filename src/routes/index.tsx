import { Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/useAuth';

import { AppRoutes } from './app.routes';
import { SignIn } from '../screens/SignIn';

export function Routes() {
  const { user } = useAuth();

  return (
    <Box flex={1} bg="gray.900">  {/* caso demore pra rotar responder o box em volta está na cor da aplicação fazendo com que não apareça um glitch branco na tela */}
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  );
}