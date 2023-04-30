import { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export function Home() {
  const [ participants, setParticipants ] = useState<string[]>([]);
  const [ participantName, setParticipantName ] = useState('');

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Ops!",
        "Já existe um participante na lista com esse nome."
      );
    }

    setParticipants(prevState => [ ...prevState, participantName ]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => prevState.filter(prev => prev !== name))
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          value={participantName}
          onChangeText={setParticipantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants}
        keyExtractor={(item, index) => item + index.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<TextEmptyList />}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <Participant
            handleParticipantRemove={() => handleParticipantRemove(item)}
            name={item}
          />
        )}
      />
    </View>
  );
}

function TextEmptyList() {
  return (
    <Text style={styles.listEmptyText}>
      Ninguém chegou no evento ainda? Adicione participantes a sua lista de
      presença.
    </Text>
  );
}
