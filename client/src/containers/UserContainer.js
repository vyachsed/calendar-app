import React, { Component } from 'react'
import { connect } from 'react-redux'
import { User } from '../components/User'
import { handleLogin } from '../actions/UserActions'
import { getAuth, getEvents } from '../actions/MyCalendarActions'

class UserContainer extends Component {
  handleLogin = user => {
    const { handleLogin, getAuth, getEvents } = this.props
    const successCallback = () => {
      getAuth()
      getEvents()
    }
    handleLogin(successCallback, user)
  }
  render() {
    const { user } = this.props
    return (
      <User
        name={user.name}
        isFetching={user.isFetching}
        error={user.error}
        handleLogin={this.handleLogin}
      />
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

const mapDispatchToProps = dispatch => ({
  handleLogin: (successCallback, user) =>
    dispatch(handleLogin(successCallback, user)),
  getAuth: () => dispatch(getAuth()),
  getEvents: () => dispatch(getEvents()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer)
