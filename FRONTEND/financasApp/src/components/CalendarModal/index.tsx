import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { format } from 'date-fns';
import { theme } from '../../theme';

// Configuração para Português (PT-BR)
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

type Props = {
  setVisible: () => void;
  handleFilter: (date: Date) => void;
};

export default function CalendarModal({ setVisible, handleFilter }: Props) {
  const [dateNow, setDateNow] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});

  function handleOnDayPress(date: any) {
    // Atualiza a data selecionada no estado
    setDateNow(new Date(date.dateString));

    let markedDay: any = {};
    markedDay[date.dateString] = {
      selected: true,
      selectedColor: theme.colors.primary,
      textColor: '#FFF'
    };

    setMarkedDates(markedDay);
  }

  function handleFilterDate() {
    // Envia a data escolhida para a Home e fecha o modal
    handleFilter(dateNow);
    setVisible();
  }

  return (
    <Container>
      {/* Clica fora para fechar */}
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>

      <ModalContent>
        <Calendar
          onDayPress={handleOnDayPress}
          markedDates={markedDates}
          enableSwipeMonths={true}
          theme={{
            todayTextColor: '#FF0000',
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: '#FFF',
            arrowColor: theme.colors.primary,
          }}
        />
        
        <ButtonFilter onPress={handleFilterDate}>
          <ButtonFilterText>Filtrar</ButtonFilterText>
        </ButtonFilter>
      </ModalContent>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: rgba(34,34,34, 0.4);
`;

const ModalContent = styled.View`
  flex: 2;
  justify-content: center;
  background-color: #FFF;
  padding: 14px;
`;

const ButtonFilter = styled.TouchableOpacity`
  border-radius: 4px;
  background-color: ${theme.colors.primary};
  height: 45px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const ButtonFilterText = styled.Text`
  color: #FFF;
  font-size: 19px;
  font-weight: bold;
`;