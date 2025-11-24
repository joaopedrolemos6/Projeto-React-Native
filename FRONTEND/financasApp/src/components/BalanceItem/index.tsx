import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { theme } from '../../theme';

type Props = {
  data: {
    tag: string;
    saldo: number;
  };
};

export default function BalanceItem({ data }: Props) {
  const labelName = useMemo(() => {
    if (data.tag === 'saldo') {
      return { label: 'Saldo atual', color: theme.colors.primary }; // Azul
    } else if (data.tag === 'receita') {
      return { label: 'Entradas de hoje', color: theme.colors.success }; // Verde
    } else {
      return { label: 'Saídas de hoje', color: theme.colors.danger }; // Vermelho
    }
  }, [data]);

  return (
    <Container bg={labelName.color}>
      <Label>{labelName.label}</Label>
      <Balance>R$ {data.saldo.toFixed(2)}</Balance>
    </Container>
  );
}

const Container = styled.View<{ bg: string }>`
  background-color: ${props => props.bg};
  margin-left: 14px;
  margin-right: 14px;
  border-radius: 8px;
  justify-content: center;
  align-items: flex-start;
  width: 300px;
  height: 150px; /* Altura fixa baseada no design */
  padding-left: 20px;
`;

const Label = styled.Text`
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: bold;
`;

const Balance = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  color: ${theme.colors.white};
`;