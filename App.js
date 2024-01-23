import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [guessText, setGuessText] = useState('');
  const [answerText, setAnswerText] = useState('Guess a number between 1-100');
  const [correctNumber, setCorrectNumber] = useState(null);
  const [count, setCount] = useState(1);

  const generateNumber = () => {
    return Math.floor(Math.random() * 100) + 1
  }

  useEffect(() => {
    setCorrectNumber(generateNumber());
  }, []);

  const checkNumber = (guessText) => {
    const guessedNumber = parseInt(guessText)

    if (correctNumber > guessedNumber) {
      setCount(count + 1)
      setAnswerText("Your guess " + guessedNumber + " is too low")
    } else if (correctNumber < guessedNumber) {
      setCount(count + 1)
      setAnswerText("Your guess " + guessedNumber + " is too high")
    } else if (correctNumber === guessedNumber) {
      Alert.alert("You guessed the number in " + count + " guesses")
      setCorrectNumber(generateNumber());
      setCount(1);
      setAnswerText('Guess a number between 1-100');
    }
  }

  return (
    <View style={styles.container}>
      <Text>{answerText}</Text>
      <TextInput
        keyboardType='numeric'
        style={{ width: 200, borderColor: 'pink', borderWidth: 2 }}
        onChangeText={text => setGuessText(text)}
      />
      <Button title="Submit" onPress={() => checkNumber(guessText)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
