import { combineReducers } from 'redux'
import { myCalendarReducer } from './myCalendar'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  calendar: myCalendarReducer,
  user: userReducer,
})
