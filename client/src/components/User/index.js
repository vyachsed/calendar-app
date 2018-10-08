import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class User extends Component {
  logoutHandler = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
    })
    const json = await response.json()
    console.log(json)
  }
  deleteAllCookies = () => {
    var cookies = document.cookie.split('')
    console.log(cookies)
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i]
      var eqPos = cookie.indexOf('=')
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
    localStorage.removeItem('username')
    console.log('delete cookies')
    this.logoutHandler()
    window.location = '/'
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log(e.target.elements)
    const login = e.target.elements['login'].value
    const password = e.target.elements['password'].value
    this.props.handleLogin({ login: login, password: password })
  }
  renderTemplate = () => {
    const { name, error, isFetching } = this.props

    if (error) {
      return <p>Во время запроса произошла ошибка, обновите страницу</p>
    }

    if (isFetching) {
      return <p>Загружаю...</p>
    }

    if (name) {
      return (
        <div>
          <p>Привет, {name}!</p>
          <button className="btn" onClick={this.deleteAllCookies}>
            Выйти
          </button>
        </div>
      )
    } else {
      return (
        <form className="col-md-4" onSubmit={this.handleSubmit}>
          <input type="text" name="login" placeholder="login" />
          <input type="password" name="password" placeholder="password" />
          <button type="submit" className="btn">
            Войти
          </button>
        </form>
      )
    }
  }
  render() {
    return <div className="ib user">{this.renderTemplate()}</div>
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
}
