import { useAtom } from 'jotai';
import NewReminderForm from './NewReminderForm';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import colours from '../assets/colours';

export default function AddReminder() {
    return (
        <View style={styles.container}>
          <NewReminderForm />
          <Button 
            title="Go back" 
            onPress={() => navigation.goBack()}
            color={colors.greyButtonText}
            backgroundColor={colors.greyButtonBackground}
          />
        </View>
      )
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: colours.blue
    }
  });