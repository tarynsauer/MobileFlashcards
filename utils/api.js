import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'FlashCards::decks'

function setDummyData() {
  const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

function formatDeckResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

export function fetchDeckResults () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function createDeck (key) {
  const deck = {[key]:{ title: key, questions: []}}
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(deck))
    .then(()=>{ return deck })
}

export function addCard (key, question, answer) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const newCard = {question: question, answer: answer}

      data[key]['questions'].push(newCard)
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))

      return {[key]: data[key]}
    })
}
