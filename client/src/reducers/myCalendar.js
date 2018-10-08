import {
  SET_VIEW,
  SET_DATE,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_AUTH,
} from '../actions/MyCalendarActions'

const name = localStorage.getItem('username')

const initialState = {
  date: new Date(),
  view: 'month',
  events: [],
  isFetching: false,
  customCSSclasses: {},
  isAuth: name ? true : false,
}

export function myCalendarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VIEW:
      return { ...state, view: action.payload }

    case SET_DATE:
      return { ...state, date: action.payload }

    case GET_EVENTS_REQUEST:
      return { ...state, events: action.payload, isFetching: true }

    case GET_EVENTS_SUCCESS:
      return { ...state, events: action.payload, isFetching: false }
    case GET_AUTH:
      return { ...state, isAuth: action.payload }

    default:
      return state
  }
}
