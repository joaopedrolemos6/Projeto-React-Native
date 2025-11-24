import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import Header from '../../components/Header';
import { theme } from '../../theme';
import api from '../../services/api';

export default function Register() {
  const navigation = useNavigation();
  
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('receita'); // 'receita' ou 'despesa'
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    Keyboard.dismiss();

    if (description === '' || value === '') {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/receive', {
        description: description,
        value: Number(value),
        type: type,
        date: format(new Date(), 'dd/MM/yyyy') // Data de hoje
      });

      setDescription('');
      setValue('');
      setLoading(false);
      
      Alert.alert('Sucesso', 'Registro salvo!', [
        { text: 'OK', onPress: () => navigation.navigate('Home' as any) }
      ]);

    } catch (err) {
      console.log(err);
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível registrar.');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Header title="Registrando" />

        <SafeArea>
          <Title>Registrar</Title>
          
          <Input
            placeholder="Descrição (Ex: Aluguel)"
            placeholderTextColor="#8A8A8A"
            value={description}
            onChangeText={setDescription}
          />

          <Input
            placeholder="Valor desejado"
            placeholderTextColor="#8A8A8A"
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />

          <ButtonsContainer>
            <TypeButton 
              checked={type === 'receita'} 
              onPress={() => setType('receita')}
            >
              <ButtonLabel>↑ Receita</ButtonLabel>
            </TypeButton>

            <TypeButton 
              checked={type === 'despesa'} 
              onPress={() => setType('despesa')}
            >
              <ButtonLabel>↓ Despesa</ButtonLabel>
            </TypeButton>
          </ButtonsContainer>

          <SubmitButton onPress={handleRegister}>
            {loading ? (
              <ActivityIndicator color="#FFF" size={20} />
            ) : (
               <SubmitText>Registrar</SubmitText>
            )}
          </SubmitButton>

        </SafeArea>
      </Container>
    </TouchableWithoutFeedback>
  );
}

// -- ESTILOS --
const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const SafeArea = styled.View`
  padding: 14px;
  align-items: center; 
`;

const Title = styled.Text`
  font-size: 20px;
  color: ${theme.colors.text};
  font-weight: bold;
  margin-bottom: 14px;
  align-self: flex-start;
`;

const Input = styled.TextInput`
  background-color: ${theme.colors.white};
  width: 100%;
  font-size: 17px;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 14px;
  color: ${theme.colors.text};
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const TypeButton = styled.TouchableOpacity<{ checked: boolean }>`
  background-color: ${props => props.checked ? theme.colors.white : '#E7E7E7'};
  border-width: ${props => props.checked ? '1px' : '0px'};
  border-color: ${theme.colors.primary};
  width: 48%;
  justify-content: center;
  align-items: center;
  height: 45px;
  border-radius: 8px;
`;

const ButtonLabel = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: ${theme.colors.success};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const SubmitText = styled.Text`
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
`;