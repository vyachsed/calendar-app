import React, { Component } from 'react'
import UserContainer from '../../containers/UserContainer'
import MyCalendarContainer from '../../containers/MyCalendarContainer'

class App extends Component {
  state = { status: false }
  checkAuth = async () => {
    const response = await fetch('/api/users/me', { method: 'GET' })
    const json = await response.json()
    console.log(json.status)
    if (json.status === 'ok') {
      return true
    }
    return false
  }
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
