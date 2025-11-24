import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import styled from 'styled-components/native';
import { AuthContext } from '../contexts/AuthContext';
import { theme } from '../theme';

export default function CustomDrawer(props: any) {
  const { user } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
        
        {/* MUDANÇA AQUI: Usando logo.png */}
        <Image 
          source={require('../../assets/logo.png')} 
          style={{ width: 90, height: 90 }}
          resizeMode="contain"
        />

        <Text style={{ fontSize: 18, marginTop: 14, color: theme.colors.text, fontWeight: 'bold' }}>
          Bem-vindo
        </Text>
        
        <Text style={{ fontSize: 16, marginBottom: 25, color: theme.colors.textLight, fontWeight: 'bold', paddingHorizontal: 10, textAlign: 'center' }} numberOfLines={1}>
          {user && user.name ? user.name : ''}
        </Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}