import React, { useState, useContext } from 'react';
import { Platform, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';
import { theme } from '../../theme';

export default function SignUp() {
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (nome === '' || email === '' || password === '') {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      // Rota de cadastro do seu Backend
      await api.post('/users', {
        name: nome,
        email: email,
        password: password
      });

      Alert.alert('Sucesso', 'Conta cadastrada com sucesso!');
      
      // Opcional: Já logar o usuário direto ou mandar ele voltar pro login
      setLoading(false);
      navigation.goBack(); 

    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar, verifique os dados.');
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
      
      <AreaInput>
        <Input
          placeholder="Seu nome"
          placeholderTextColor={theme.colors.textLight}
          value={nome}
          onChangeText={setNome}
        />
      </AreaInput>

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

      <Button onPress={handleSignUp}>
        {loading ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>

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