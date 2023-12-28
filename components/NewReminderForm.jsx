import React, { useState } from 'react'; 
import { useAtom } from 'jotai';
import { reminderAtoms } from './atoms';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

function NewReminderForm() {

  const [reminders, setReminders] = useAtom(reminderAtoms);

  const [form, setForm] = useState({
    name: '',
    notes: '',
    date: '',
    time: '' 
  });

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const onDateChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    let tempDate = currentDate.toISOString().split('T')[0];
    let tempTime = currentDate.toTimeString().slice(0,5);

    setForm({
      ...form,
      date: tempDate,
      time: tempTime
    })
}
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newReminder = {
      id: uuidv4(),
      name: form.name,
      notes: form.notes,
      date: form.date,
      time: form.time
    };

    setReminders(prevReminders => {
      const updatedReminders = [...prevReminders, newReminder];
      
      return updatedReminders;
    
    })

    setForm({
      name: '',
      notes: '',
      date: '',
      time: ''
    });

  }

  return (
    <>
      <TextInput 
        style={styles.input}
        placeholder="name"
        placeholderTextColor={'#999999'}
        value={form.name}
        onChangeText={text => setForm({...form, name: text})}
      />

      <TextInput
        style={styles.input}
        placeholder="notes"
        placeholderTextColor={'#999999'}
        value={form.notes}
        onChangeText={text => setForm({...form, notes: text})}
      />

      <Pressable 
      onPress={showDatepicker}
      title={form.date}
      style={styles.input}><Text>Date</Text>
      </Pressable>
      <Pressable
      onPress={showTimepicker}
      style={styles.input} 
      title={form.time}><Text>Time</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity 
      onPress={handleSubmit}
      disabled={ !form.name || !form.notes || !form.date || !form.time }>
        <Text>Add Reminder</Text>
      </TouchableOpacity>
      </>
  );
}

const colours = {
  blue: '#275EF6',
  header: '#0B295A',
  text: '#000000',
  inputBackground: '#F5F5F5',
  inputPlaceholder:'#999999',
  inputText: '#000000',
  greyButtonBackground: '#B8B8B8',
  greyButtonText: '#4D4D4D',
  red: '#FF0000'
};

const styles = StyleSheet.create({
  input: {
    height: 40, 
    width: '80%',
    margin: 7,
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: colours.inputBackground,
    color: colours.inputText
  },
  button: {
    backgroundColor: colours.greyButtonBackground,
    colour: colours.greyButtonText
  }
}); 

export default NewReminderForm;