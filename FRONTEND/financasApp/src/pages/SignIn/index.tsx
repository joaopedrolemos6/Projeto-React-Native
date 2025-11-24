import React, { useState, useContext } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/AuthContext';
import { theme } from '../../theme';

export default function SignIn() {
  const navigation = useNavigation<any>();
  const { signIn, loading } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false);

  async function handleLogin() {
    if (email === '' || password === '') {
      return;
    }

    try {
      setLoadingAuth(true);
      await signIn({ email, password });
    } catch (error) {
      console.log("Erro ao logar", error);
      setLoadingAuth(false);
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
      {/* MUDANÇA AQUI: Usando logo.png */}
      <Logo source={require('../../../assets/logo.png')} resizeMode="contain"/> 

      <AreaInput>
        <Input
          placeholder="Email"
          placeholderTextColor={theme.colors.textLight}
          value={email}
          onChangeText={setEmail}
        />
      </AreaInput>

      <AreaInput>
        <Input
          placeholder="Senha"
          placeholderTextColor={theme.colors.textLight}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </AreaInput>

      <Button onPress={handleLogin}>
        {loadingAuth ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <ButtonText>Acessar</ButtonText>
        )}
      </Button>

      <Link onPress={() => navigation.navigate('SignUp')}>
        <LinkText>Criar uma conta gratuita</LinkText>
      </Link>

    </Container>
  );
}

// -- ESTILOS --
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background};
`;

const Logo = styled.Image`
  margin-bottom: 25px;
  width: 120px; /* Aumentei um pouco para essa imagem */
  height: 120px;
`;

const AreaInput = styled.View`
  flex-direction: row;
`;

const Input = styled.TextInput`
  background-color: ${theme.colors.inputBackground};
  width: 90%;
  font-size: 17px;
  padding: 10px;
  border-radius: 8px;
  color: ${theme.colors.text};
  margin-bottom: 15px;
`;

const Button = styled.TouchableOpacity`
  width: 90%;
  height: 45px;
  border-radius: 8px;
  background-color: ${theme.colors.primary};
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: ${theme.colors.white};
  font-weight: bold;
`;

const Link = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const LinkText = styled.Text`
  color: ${theme.colors.text};
`;