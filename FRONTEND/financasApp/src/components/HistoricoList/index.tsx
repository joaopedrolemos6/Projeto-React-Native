import React from 'react';
import { Alert, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../theme';

export type HistoricoProps = {
  id: string;
  description: string;
  value: number;
  type: string;
  date: string;
};

type Props = {
  data: HistoricoProps;
  deleteItem: (id: string) => void;
};

export default function HistoricoList({ data, deleteItem }: Props) {
  
  function handleDelete(){
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja deletar esse registro?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Continuar", onPress: () => deleteItem(data.id) }
      ]
    )
  }

  return (
    <Container>
      {/* Lado Esquerdo: Badge e Valor */}
      <ContainerEsquerdo>
        <TipoBadge type={data.type}>
          <IconView>
            <Feather 
              name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'} 
              size={20} 
              color="#FFF" 
            />
            <TipoText>{data.type}</TipoText>
          </IconView>
        </TipoBadge>

        <ValorText>
          R$ {data.value.toFixed(2)}
        </ValorText>
      </ContainerEsquerdo>

      {/* Lado Direito: Botão Lixeira */}
      <ButtonDelete onPress={handleDelete}>
        <IconDelete 
          source={require('../../../assets/trash.png')}
          resizeMode="contain"
        />
      </ButtonDelete>

    </Container>
  );
}

// -- ESTILOS --

const Container = styled.View`
  /* Nova cor de fundo solicitada */
  background-color: #F0F4FF; 
  border-radius: 8px;
  margin-bottom: 14px;
  padding: 14px;
  
  /* Layout Horizontal para separar Texto da Lixeira */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContainerEsquerdo = styled.View`
  /* Agrupa o Badge e o Valor para ficarem à esquerda */
  align-items: flex-start;
`;

const TipoBadge = styled.View<{ type: string }>`
  flex-direction: row;
  background-color: ${props => props.type === 'despesa' ? theme.colors.danger : theme.colors.success};
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const IconView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TipoText = styled.Text`
  color: #FFF;
  font-size: 14px;
  margin-left: 4px;
  font-style: italic;
`;

const ValorText = styled.Text`
  color: ${theme.colors.text};
  font-size: 22px;
  font-weight: bold;
`;

const ButtonDelete = styled.TouchableOpacity`
  padding: 10px; /* Aumenta a área de toque */
`;

const IconDelete = styled.Image`
  width: 25px;
  height: 25px;
`;