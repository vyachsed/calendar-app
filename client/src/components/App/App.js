import React, { Component } from 'react'
import UserContainer from '../../containers/UserContainer'
import MyCalendarContainer from '../../containers/MyCalendarContainer'

class App extends Component {
  render() {
    return (
      <div className="app">
        <UserContainer />
        <MyCalendarContainer />
      </div>
    )
  }
}

export default App
