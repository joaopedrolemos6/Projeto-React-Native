import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons'; // Ícones do Expo
import { useNavigation, DrawerActions } from '@react-navigation/native'; // Importe o DrawerActions

import { theme } from '../../theme';

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  const navigation = useNavigation();

  return (
    <Container>
      {/* Adicionamos o onPress aqui para abrir o menu lateral */}
      <MenuButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Feather name="menu" size={35} color={theme.colors.text} />
      </MenuButton>
      
      <Title>{title}</Title>
    </Container>
  );
}

// -- ESTILOS --
const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  padding-left: 15px;
`;

const Title = styled.Text`
  font-size: 22px;
  margin-left: 15px;
  color: ${theme.colors.text};
  font-weight: bold;
`;

const MenuButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;