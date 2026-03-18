import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Header({ titulo, navigation, mostrarMais }) {
  return (
    <View style={styles.header}>

      {navigation.canGoBack() ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 30 }} />
      )}

      <Text style={styles.headerTitle}>{titulo}</Text>

      {mostrarMais ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('CadastrarContato')}
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 30 }} />
      )}
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [email, botarEmail] = React.useState('');
  const [senha, botarSenha] = React.useState('');

  return (
    <View style={styles.homeContainer}>
      <Image
        style={styles.img}
        source={{
          uri: 'https://simplescontrole.com.br/wp-content/uploads/2024/05/usuario.png',
        }}
      />

      <Text style={styles.label}>  Nome</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={botarEmail}
      />

      <Text style={styles.label}>  Senha</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={botarSenha}
      />

      <Button
        color="#0a62e7"
        title="                       Logar                      "
        onPress={() => navigation.navigate("Listar")}
      />

      <Text> </Text>

      <Button
        color="#e7360a"
        title="                Cadastrar-se               "
        onPress={() => navigation.navigate("CadastrarUsuario")}
      />

      <StatusBar style="auto" />
    </View>
  );
}

function ListaScreen({ navigation }) {
  const [contatos] = React.useState([
    { id: "1", nome: "Marcos Andrade", telefone: "81 988553424" },
    { id: "2", nome: "Patrícia Tavares", telefone: "81 998765332" },
    { id: "3", nome: "Rodrigo Antunes", telefone: "81 987765525" }
  ]);

  return (
    <View style={styles.screen}>

      <Header
        titulo="LISTA DE CONTATOS"
        navigation={navigation}
        mostrarMais={true}
      />

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contatoCard}
            onPress={() =>
              navigation.navigate('Editar', { contato: item })
            }
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.telefone}>{item.telefone}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}


function CadastroUseScreen({ navigation }) {
  const [nome, botarNome] = React.useState('');
  const [cpf, botarCpf] = React.useState('');
  const [email, botarEmail] = React.useState('');
  const [senha, botarSenha] = React.useState('');

  return (
    <View style={styles.screen}>
      <Header
        titulo="USUÁRIO"
        navigation={navigation}
      />
      <Text style={styles.label}>  Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={botarNome} />
      <Text style={styles.label}>  Cpf</Text>
      <TextInput style={styles.input} value={cpf} onChangeText={botarCpf} />
      <Text style={styles.label}>  Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={botarEmail} />
      <Text style={styles.label}>  Senha</Text>
      <TextInput style={styles.input} value={senha} onChangeText={botarSenha} secureTextEntry />

      <Button
        title="Salvar"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

function CadastrarContScreen({ navigation }) {
  const [nome, botarNome] = React.useState('');
  const [email, botarEmail] = React.useState('');
  const [telefone, botarTelefone] = React.useState('');

  return (
    <View style={styles.screen}>
      <Header
        titulo="CONTATO"
        navigation={navigation}
      />
      <Text style={styles.label}>  Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={botarNome} />
      <Text style={styles.label}>  Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={botarEmail} />
      <Text style={styles.label}>  Telefone</Text>
      <TextInput style={styles.input} value={telefone} onChangeText={botarTelefone} />

      <Button
        title="Salvar"
        onPress={() => navigation.navigate("Listar")}
      />
    </View>
  );
}

function EditarScreen({ route, navigation }) {
  const { contato } = route.params;

  const [nome, botarNome] = React.useState(contato.nome);
  const [telefone, botarTelefone] = React.useState(contato.telefone);

  return (
    <View style={styles.screen}>
      <Header
        titulo="CONTATO"
        navigation={navigation}
      />
      <Text style={styles.label}>  Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={botarNome} />
      <Text style={styles.label}>  Telefone</Text>
      <TextInput style={styles.input} value={telefone} onChangeText={botarTelefone} />

      <Button
        title="Alterar"
        onPress={() => navigation.navigate("Listar")}
      />

      <Button
        title="Excluir"
        color="red"
        onPress={() => navigation.navigate("Listar")}
      />
      
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CadastrarUsuario" component={CadastroUseScreen} />
        <Stack.Screen name="Listar" component={ListaScreen} />
        <Stack.Screen name="CadastrarContato" component={CadastrarContScreen} />
        <Stack.Screen name="Editar" component={EditarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  screen: {
  flex: 1,
  backgroundColor: '#ffffff',
  alignItems: 'center'
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#fcf5f8ec',
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    width: 200,
    height: 200
  },

  header: {
    width: '100%',
    height: 90,
    backgroundColor: '#0a62e7',
    paddingTop: 40,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  headerTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },

  voltar: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold'
  },

  plus: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold'
  },

  contatoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15
  },

  nome: {
    fontSize: 16,
  },

  telefone: {
    fontSize: 14,
    color: '#555'
  },

  input: {
    height: 35,
    width: 240,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  Text: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

  },
  label: {
  width: 250,
  textAlign: 'left',
  marginTop: 15
},

});
