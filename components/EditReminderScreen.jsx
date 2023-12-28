import React, { useState, useEffect } from 'react'; 
import { useAtom } from 'jotai';
import { reminderAtoms } from './atoms';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

function EditReminderScreen ({ route, navigation }) {
    const { id } = route.params;
    const [reminders, setReminders] = useAtom(reminderAtoms);
    const foundReminder = reminders.find(reminder => reminder.id === id);
    console.log(foundReminder, 'reminder object')

    const [form, setForm] = useState({
        name: foundReminder.name,
        notes: foundReminder.notes,
        date: foundReminder.date,
        time: foundReminder.time
    })

    const [date, setDate] = useState(foundReminder.date);
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

    useEffect(() => {
        return () => {
          setReminders(prevReminders => {
            return prevReminders.filter(reminder => reminder.id !== foundReminder.id);
          });
        };
      }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        
        const updatedReminder = {
          id: foundReminder.id,
          name: form.name,
          notes: form.notes,
          date: form.date,
          time: form.time
        };
  
        setReminders(prevReminders => {
            return prevReminders.map(reminder => {
                if(reminder.id === updatedReminder.id) {
                    return updatedReminder; 
                }
            return reminder;
            })
  });

    }

    const handleDelete = () => {
        navigation.goBack(); 
      };

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
          title="Date"
          style={styles.button}><Text>Date</Text>
          </Pressable>
          <Pressable
          onPress={showTimepicker}
          style={styles.button} 
          title="Time"><Text>Time</Text>
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
            <TouchableOpacity onPress={handleDelete}><Text>Delete Reminder</Text></TouchableOpacity>
          <TouchableOpacity onPress={handleUpdate}><Text>Update Reminder</Text></TouchableOpacity>
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

export default EditReminderScreen;