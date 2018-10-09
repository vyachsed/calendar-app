import React, { Component } from "react"
import PropTypes from "prop-types"

import './styles.css'

export class User extends Component {
  logoutHandler = async () => {
    const response = await fetch("/api/users/logout", {
      method: "POST"
    })
    const json = await response.json()
    console.log(json)
  }
  deleteAllCookies = () => {
    var cookies = document.cookie.split("")
    console.log(cookies)
    for (var i = 0 i < cookies.length i++) {
      var cookie = cookies[i]
      var eqPos = cookie.indexOf("=")
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
    localStorage.removeItem("username")
    console.log("delete cookies")
    this.logoutHandler()
    window.location = "/"
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log(e.target.elements)
    const login = e.target.elements["login"].value
    const password = e.target.elements["password"].value
    this.props.handleLogin({ login: login, password: password })
  }
  renderTemplate = () => {
    const { name, error, isFetching } = this.props

    if (error) {
      return (
        <p>
          Auth error. Please try again.
        </p>
      )
    }

    if (isFetching) {
      return <p>Loading...</p>
    }

    if (name) {
      return (
        <header>
          <div className="user">Hi, {name}!</div>
          <button onClick={this.deleteAllCookies}>Exit</button>
        </header>
      )
    } else {
      return (
        <div className="login-page">
          <div className="form">
            <form className="login-form" onSubmit={this.handleSubmit}>
              <input type="text" name="login" placeholder="login" />
              <input type="password" name="password" placeholder="password" />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )
    }
  }
  render() {
    return this.renderTemplate() //<div className="ib user"></div>
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired
}
