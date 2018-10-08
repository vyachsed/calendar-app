import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MyCalendar } from '../components/MyCalendar'
import { setView, setDate, getEvents } from '../actions/MyCalendarActions'

class MyCalendarContainer extends Component {
  render() {
    const {
      calendar,
      setViewAction,
      setDateAction,
      getEventsAction,
    } = this.props
    return (
      <MyCalendar
        view={calendar.view}
        date={calendar.date}
        events={calendar.events}
        isFetching={calendar.isFetching}
        customCSSclasses={calendar.customCSSclasses}
        isAuth={calendar.isAuth}
        setView={setViewAction}
        setDate={setDateAction}
        getEvents={getEventsAction}
      />
    )
  }
}

const mapStateToProps = store => {
  return {
    calendar: store.calendar,
  }
}

const mapDispatchToProps = dispatch => ({
  setViewAction: view => dispatch(setView(view)),
  setDateAction: date => dispatch(setDate(date)),
  getEventsAction: () => dispatch(getEvents()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyCalendarContainer)
