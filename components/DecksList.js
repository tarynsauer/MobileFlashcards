import React from 'react'
import { AppLoading} from 'expo'
import { Text, View } from 'react-native'
import { fetchDeckResults } from '../utils/api'
import DeckDetails from './DeckDetails'

export default class DecksList extends React.Component {
  state = {
    data: {},
    ready: false,
  }

  componentDidMount () {
    fetchDeckResults().then(data =>
      this.setState(
        {
          data: data,
          ready: true,
        })
    )
  }

  render() {
    const { data, ready } = this.state

    if (ready === false) {
      return <AppLoading />
    } else {
      return (
        <View>
          {Object.keys(data).map((key, index) => {
            let { title, questions } = data[key]
            return <DeckDetails key={title} title={title} questions={questions} />
          })}
        </View>
      )
    }
  }
}
