# 💰 Finanças App

![Badge License](https://img.shields.io/badge/license-MIT-green)
![Badge React Native](https://img.shields.io/badge/React_Native-Expo-blue)
![Badge Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Badge Prisma](https://img.shields.io/badge/Prisma-ORM-blueviolet)
![Badge TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue)

> Um sistema Full Stack completo para controle de finanças pessoais, permitindo o gerenciamento de receitas e despesas com atualização de saldo em tempo real.

---

## 📱 Sobre o Projeto

O **Finanças App** é uma aplicação móvel desenvolvida com **React Native (Expo)** integrada a um backend **Node.js**. O objetivo é oferecer uma interface limpa e intuitiva para o usuário registrar suas movimentações financeiras, visualizar o saldo diário e filtrar históricos por data.

O projeto conta com autenticação segura via JWT, persistência de dados com SQLite (via Prisma) e uma interface focada na usabilidade (UX).

---

## ✨ Funcionalidades Principais

### 1. Autenticação e Segurança 🔐
* **Cadastro de Usuários:** Criação de conta com criptografia de senha.
* **Login Seguro:** Autenticação via Token JWT.
* **Persistência de Sessão:** O App utiliza `AsyncStorage` para manter o usuário logado mesmo após fechar o aplicativo.

### 2. Dashboard (Home) 📊
* **Visão Geral:** Exibição de cartões (Slides) no topo com:
    * Saldo Atual (Azul)
    * Entradas do Dia (Verde)
    * Saídas do Dia (Vermelho)
* **Lista de Movimentações:** Histórico detalhado abaixo dos cartões, com visualização otimizada (Fundo `#F0F4FF`).
* **Consumo de API:** A tela consome as rotas `/balance` e `/receives` simultaneamente.

### 3. Filtros e Navegação 📅
* **Calendário Interativo:** Modal estilo "Pop-up" para filtrar movimentações por datas específicas.
* **Menu Lateral (Drawer):** Navegação fluida acessível por gesto (arrastar) ou pelo ícone de menu, exibindo a foto e o nome do usuário logado.

### 4. Gerenciamento de Registros 📝
* **Adicionar Movimentação:** Formulário simples para incluir Receitas ou Despesas.
* **Exclusão Inteligente:** Ícone de lixeira em cada item da lista. Ao deletar:
    * Solicita confirmação via Alerta.
    * Remove o item do banco de dados.
    * **Recalcula automaticamente** o saldo total do usuário.

---

## 💡 Como Usar o App

* **Primeiro Acesso:** Para entrar, clique em **"Criar uma conta gratuita"** para registrar seu usuário. Depois, faça o **login** com as credenciais criadas.
* **Navegação:** Para acessar a aba de registros e outras opções do menu, basta **arrastar a tela para o lado** ou clicar no ícone das **3 faixas** no canto superior esquerdo.
* **Gerenciamento:**
    * **Deletar:** Para excluir um item, basta **clicar na lixeira** ao lado da movimentação.
    * **Filtrar:** Para ver as movimentações de uma data específica, **clique no calendário** e selecione o dia desejado.

---

## 🛠️ Tecnologias Utilizadas

### Mobile (Frontend)
* **React Native** (Expo SDK 54)
* **TypeScript**
* **Styled Components** (Estilização)
* **React Navigation** (Stack & Drawer)
* **Axios** (Consumo de API)
* **Date-fns** (Manipulação de datas)

### API (Backend)
* **Node.js** & **Express**
* **Prisma ORM**
* **SQLite** (Banco de Dados)
* **JWT** (Json Web Token)
* **BcryptJS** (Criptografia)

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Node.js instalado.
* Celular com o App **Expo Go** ou Emulador (Android Studio/Xcode).

### 1. Configurando o Backend

```bash
# Entre na pasta do backend
cd BACKEND

# Instale as dependências
npm install

# Gere as migrações do banco de dados (cria o arquivo dev.db)
npx prisma migrate dev

# Inicie o servidor
npm run dev
