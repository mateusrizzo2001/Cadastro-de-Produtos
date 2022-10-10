import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const produtos = [
    {
      codigo: 1000,
      descricao: 'Teclado Gamer RGB',
      preco:  758.99,
      quantidade: 237,
    },
    {
      codigo: 1001,
      descricao: 'Memória RAM 16Gb',
      preco: 459.99,
      quantidade: 436,
    },
    {
      codigo: 1002,
      descricao: 'Ryzen 9 5900x',
      preco: 3249.99,
      quantidade: 244,
    },
    { codigo: 1003, descricao: 'RTX 3090Ti', preco: 12990.0, quantidade: 196 },
  ];

  const [codigo, setCodigo] = useState();
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState();
  const [quantidade, setQuantidade] = useState();
  const [lista, setLista] = useState(produtos);

  const index = lista.findIndex((item) => item.codigo == Number(codigo));
  const codigos = lista.map((l) => l.codigo);

  const adicionar = () => {
    if (
      codigo == '' ||
      codigo < 1 ||
      codigos.includes(Number(codigo)) ||
      descricao == '' ||
      preco == '' ||
      preco < 1 ||
      quantidade == '' ||
      quantidade < 1
    ) {
      alert('Preencher os dados corretamente, por favor.');
      return;
    }

    setLista((lista) => [
      ...lista,
      {
        codigo: codigo,
        descricao: descricao,
        preco: preco,
        quantidade: quantidade,
      },
    ]);
    limparInputs();
  };

  const apagar = () => {
    if (!Number(codigo)) {
      return;
    }
    setLista([
      ...produtos.slice(0, index),
      ...produtos.slice(index + 1, produtos.length),
    ]);
    limparInputs();
  };

  const editar = () => {
    if (codigo == '' || descricao == '' || preco == '' || quantidade == '') {
      return;
    }
    setLista(
      lista.map((produto) =>
        produto.codigo == codigo
          ? {
              ...produto,
              descricao: descricao,
              preco: preco,
              quantidade: quantidade,
            }
          : { ...produto }
      )
    );
    limparInputs();
  };

  function limparInputs() {
    setCodigo('');
    setDescricao('');
    setPreco('');
    setQuantidade('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewInputs}>
        <TextInput
          style={styles.camposInput}
          placeholder="Código"
          value={codigo}
          keyboardType="numeric"
          onChangeText={(valor) => {
            setCodigo(valor);
          }}
        />

        <TextInput
          style={styles.camposInput}
          placeholder="Descrição"
          value={descricao}
          onChangeText={(valor) => {
            setDescricao(valor);
          }}
        />

        <TextInput
          style={styles.camposInput}
          placeholder="Preço"
          value={preco}
          keyboardType="numeric"
          onChangeText={(valor) => {
            setPreco(valor);
          }}
        />

        <TextInput
          style={styles.camposInput}
          placeholder="Quantidade"
          value={quantidade}
          keyboardType="numeric"
          onChangeText={(valor) => {
            setQuantidade(valor);
          }}
        />
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={adicionar}>
          <Text style={styles.textoBotao}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={apagar}>
          <Text style={styles.textoBotao}>Apagar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={editar}>
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lista}
        renderItem={({ item }) => (
          <Text style={styles.itemLista}>
            {'[' +
              item.codigo +
              ']' +
              ' ' +
              item.descricao +
              '\n' +
              'Preço: ' +
              item.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }) +
              '\n' +
              'Quantidade: ' +
              item.quantidade}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  viewInputs: {
    marginTop: 10,
    padding: 8,
  },
  camposInput: {
    borderWidth: 2,
    marginBottom: 5,
    color: '#dc143c',
    fontSize: 15,
    textAlign: 'center',
  },
  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    textTransform: 'uppercase',
  },
  botao: {
    borderRadius: 20,
    backgroundColor: '#daa520',
    padding: 8,
    marginLeft: 5,
  },
  itemLista: {
    borderBottomWidth: 2,
    padding: 8,
  }
});