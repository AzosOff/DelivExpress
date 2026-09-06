import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { produtos } from '../data/produtos';
import { cores } from '../constants/cores';

export default function CardapioScreen() {
  const [carrinho, setCarrinho] = useState([]);

  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

  function adicionarAoCarrinho(produto) {
    setCarrinho((atual) => {
      const existente = atual.find((item) => item.id === produto.id);
      if (existente) {
        return atual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...atual, { ...produto, quantidade: 1 }];
    });
  }

  function formatarPreco(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tituloHeader}>DelivExpress</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>{totalItens}</Text>
        </View>
      </View>

      <ScrollView style={styles.lista}>
        {produtos.map((produto) => (
          <View key={produto.id} style={styles.card}>
            <Image
              source={{ uri: produto.imagem }}
              style={styles.imagem}
              width={64}
              height={64}
            />
            <View style={styles.infoProduto}>
              <Text style={styles.nomeProduto}>{produto.nome}</Text>
              <Text style={styles.descricaoProduto}>{produto.descricao}</Text>
              <Text style={styles.precoProduto}>{formatarPreco(produto.preco)}</Text>
            </View>
            <TouchableOpacity
              style={styles.botaoAdicionar}
              onPress={() => adicionarAoCarrinho(produto)}
              activeOpacity={0.7}
            >
              <Text style={styles.textoBotao}>+ Add</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundoClaro,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: cores.primaria,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  tituloHeader: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeTexto: {
    color: cores.primaria,
    fontWeight: 'bold',
    fontSize: 14,
  },
  lista: {
    flex: 1,
    padding: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  imagem: {
    borderRadius: 8,
    marginRight: 12,
  },
  infoProduto: {
    flex: 1,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.textoEscuro,
  },
  descricaoProduto: {
    fontSize: 14,
    color: cores.secundaria,
    marginVertical: 2,
  },
  precoProduto: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.textoEscuro,
  },
  botaoAdicionar: {
    backgroundColor: cores.sucesso,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});