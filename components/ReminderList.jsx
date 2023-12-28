import React from 'react';
import { useAtom } from 'jotai';
import { reminderAtoms, reminderAtoms } from './atoms';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ReminderList() {
  const [reminders] = useAtom(reminderAtoms);
  const navigation = useNavigation();

  function handleAddReminder() {
    navigation.navigate('AddReminder');
  }

    return (
      <View style={styles.footer}>
        <Pressable onPress={handleAddReminder}>
          <Text>Add Reminder</Text>
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, 
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold', 
    color: '#0B295A', 
  },
  header: {
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
  },
  emptyListCard: {
    backgroundColor: '#B8B8B8',
    padding: 20,
    borderRadius: 8,
  },
  item: {
    backgroundColor: '#275EF6',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  }
});