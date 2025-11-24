import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import { AuthContext } from '../../contexts/AuthContext';
import { theme } from '../../theme';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <Container>
      <Header title="Meu perfil" />

      <Greeting>Bem vindo de volta, {user?.name}</Greeting>

      <NewLink onPress={() => navigation.navigate('Registrar' as any)}>
        <NewText>Registrar gastos</NewText>
      </NewLink>

      <LogoutButton onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </LogoutButton>

    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  align-items: center;
`;

const Greeting = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${theme.colors.text};
`;

const NewLink = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  width: 90%;
  height: 45px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const NewText = styled.Text`
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
`;

const LogoutButton = styled.TouchableOpacity`
  width: 90%;
  height: 45px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${theme.colors.danger};
  align-items: center;
  justify-content: center;
`;

const LogoutText = styled.Text`
  color: ${theme.colors.danger};
  font-size: 18px;
  font-weight: bold;
`;