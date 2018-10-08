export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export function handleLogin(callback, user) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    })
    const request = async () => {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: `login=${user.login}&password=${user.password}`,
      })
      const json = await response.json()
      if (json.status === 'ok') {
        return true
      }
      return false
    }

    if (request()) {
      let username = user.login
      localStorage.setItem('username', username)

      dispatch({
        type: LOGIN_SUCCESS,
        payload: username,
      })

      callback()
    } else {
      dispatch({
        type: LOGIN_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации'),
      })
    }
  }
}
