import * as React from 'react';
import { Button, View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewReminderForm from './components/NewReminderForm.jsx';
import EditReminderScreen from './components/EditReminderScreen.jsx';
import { useAtom } from 'jotai';
import { reminderAtoms } from './components/atoms';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

function ReminderList({ navigation }) {
  const [reminders] = useAtom(reminderAtoms);

  function emptyList() {
    return (
      <View style={styles.itemView}>
        <View style={styles.item}>
        <Image 
            source={require('./assets/noRemindersIcon.png')}
            style={styles.noRemindersIcon}
            />
        <Text style={styles.item}>You currently have no reminders. {'\n\n'}Add a reminder by pressing the "Add reminder" button below</Text>
        </View>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Reminders</Text>
      </View>
    );
  }

  function footer() {
    return (
      <View style={styles.footer}>
        <Button 
        title="Add Reminder"
        onPress={() => navigation.navigate('AddReminder')}/>
      </View>
    );
  }
  return (
    <View style={styles.container}>

      <FlatList
        data={reminders}
        ListEmptyComponent={emptyList}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        renderItem={({ item }) => (
          <View style ={styles.itemView}>
             <View style={styles.itemContent}>
              <Image 
            source={require('./assets/bellIcon.png')}
            style={styles.bellIcon}
            />
                <Text style={styles.itemHeading}>
            {item.name} 
            </Text>
            
              <Text style={styles.item}>
              This reminder is set for: {item.time}
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('EditReminderScreen', {id: item.id})}>  
              <Image 
              source={require('./assets/penIcon.png')}
              style={styles.penIcon}
              />
              </TouchableOpacity>
              </View>
              <BouncyCheckbox/>
          </View>
        )}
      />
    </View>
  );
}

function AddReminder({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <NewReminderForm />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ReminderList} />
      <Stack.Screen name="AddReminder" component={AddReminder} />
      <Stack.Screen name="EditReminderScreen" component={EditReminderScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
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
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colours.header
  },
  itemView: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  itemHeading:{
    color: colours.header,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  itemContent: {  
    padding: 10,
    marginVertical: 8,
  },
  item: {
    color: colours.text,
    margin: 12,
    marginBottom: 18,
  },
  emptyListCard: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8
  },
  header: {
    marginBottom: 20
  },
  footer: {
    marginTop: 20
  },
  bellIcon: {
    width: 18,
    height: 18
  },
  penIcon: {
    width: 18,
    height: 18
  },
  noRemindersIcon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    margin: 5
  }
});