import moment from 'moment'

export const SET_VIEW = 'SET_VIEW'
export const SET_DATE = 'SET_DATE'
export const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST'
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS'
export const GET_AUTH = 'GET_AUTH'

export function setView(view) {
  return {
    type: SET_VIEW,
    payload: view,
  }
}

export function setDate(date) {
  return {
    type: SET_DATE,
    payload: date,
  }
}

export function getEvents() {
  return dispatch => {
    dispatch({
      type: GET_EVENTS_REQUEST,
      payload: [],
    })
    const request = async () => {
      const response = await fetch('/api/events/', { method: 'GET' })
      const json = await response.json()
      let events = await json.events
      if (events !== undefined) {
        const _response = await fetch('/api/users/me/', { method: 'GET' })
        const json = await _response.json()
        const notes = json.me.notes
        events.map(event => {
          event.start = moment(event.start).toDate()
          event.end = moment(event.end).toDate()
          for (let note of notes) {
            if (note.event === event._id) event.note = note.note
          }
          return event
        })
      } else events = []
      dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: events,
      })
    }
    request()
  }
}

export function getAuth() {
  return dispatch => {
    const request = async () => {
      const response = await fetch('/api/users/me', { method: 'GET' })
      const json = await response.json()
      if (json.status === 'ok') {
        return true
      }
      return false
    }
    dispatch({
      type: GET_AUTH,
      payload: request(),
    })
  }
}
