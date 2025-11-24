import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Modal } from 'react-native'; // <--- Importe o Modal e TouchableOpacity
import styled from 'styled-components/native';
import { format } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';

import api from '../../services/api';
import { theme } from '../../theme';
import Header from '../../components/Header';
import BalanceItem from '../../components/BalanceItem';
import HistoricoList, { HistoricoProps } from '../../components/HistoricoList';
import CalendarModal from '../../components/CalendarModal'; // <--- Importe o Modal Novo

export default function Home() {
  const isFocused = useIsFocused();
  
  const [listBalance, setListBalance] = useState([]);
  const [movements, setMovements] = useState<HistoricoProps[]>([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false); // <--- Estado do Modal

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      // Formata a data para dia/mês/ano para enviar ao backend
      const dateFormated = format(dateMovements, 'dd/MM/yyyy');

      try {
        const [balanceResponse, receivesResponse] = await Promise.all([
          api.get('/balance', { params: { date: dateFormated } }),
          api.get('/receives', { params: { date: dateFormated } })
        ]);

        if (isActive) {
          setListBalance(balanceResponse.data);
          setMovements(receivesResponse.data);
        }
      } catch (err) {
        console.log("Erro ao buscar dados", err);
      }
    }

    if(isFocused){
       getMovements();
    }

    return () => {
      isActive = false;
    }
  }, [isFocused, dateMovements]);

  async function handleDelete(id: string){
    try{
      await api.delete('/receives/delete', {
        params: {
          item_id: id
        }
      })
      setDateMovements(new Date()); 
    }catch(err){
      console.log(err);
    }
  }

  // Função chamada quando clica em "Filtrar" no calendário
  function filterDateMovements(dateSelected: Date){
    setDateMovements(dateSelected);
  }

  return (
    <Container>
      <Header title="Minhas movimentações" />

      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => item.tag}
        renderItem={({ item }: any) => (<BalanceItem data={item} />)}
      />

      <Area>
        {/* Ícone do Calendário Clicável */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon source={require('../../../assets/calendar.png')} />
        </TouchableOpacity>
        
        <Title>Ultimas movimentações</Title>
      </Area>

      <List 
        data={movements}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <HistoricoList data={item} deleteItem={handleDelete} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Componente Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <CalendarModal 
          setVisible={() => setModalVisible(false)} 
          handleFilter={filterDateMovements}
        />
      </Modal>

    </Container>
  );
}

// -- ESTILOS --
const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const ListBalance = styled.FlatList`
  max-height: 190px;
  padding-top: 10px;
`;

const Area = styled.View`
  background-color: ${theme.colors.white};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  flex-direction: row;
  padding-left: 14px;
  padding-right: 14px;
  align-items: center; /* Centraliza ícone e texto */
  margin-top: 20px;
  padding-top: 14px;
`;

const Icon = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 10px; /* Espaço entre ícone e texto */
`;

const Title = styled.Text`
  color: ${theme.colors.text};
  font-size: 16px;
  font-weight: bold;
`;

const List = styled.FlatList`
  flex: 1;
  background-color: ${theme.colors.white};
  padding: 14px;
`;