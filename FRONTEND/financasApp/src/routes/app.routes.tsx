import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import CustomDrawer from './CustomDrawer';

import { theme } from '../theme';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
  return(
    <AppDrawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />} // Usa nosso menu personalizado
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.white,
          paddingTop: 20,
        },
        drawerActiveBackgroundColor: theme.colors.primary,
        drawerActiveTintColor: '#FFF',
        drawerInactiveBackgroundColor: '#F0F2FF',
        drawerInactiveTintColor: '#121212'
      }}
    >
      <AppDrawer.Screen name="Home" component={Home} />
      <AppDrawer.Screen name="Registrar" component={Register} />
      <AppDrawer.Screen name="Meu perfil" component={Profile} />
    </AppDrawer.Navigator>
  )
}

export default AppRoutes;