import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SignIn" 
        component={SignIn} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{ 
          headerStyle: {
            backgroundColor: '#3B3DBF', // Roxo do Header
          },
          headerTintColor: '#FFF', // Cor do texto/seta de voltar
          headerTitle: 'Voltar', // Texto do botão voltar (conforme print)
          headerBackTitleVisible: false, // Esconde o texto duplicado no iOS
        }} 
      />
    </Stack.Navigator>
  );
}

export default AuthRoutes;