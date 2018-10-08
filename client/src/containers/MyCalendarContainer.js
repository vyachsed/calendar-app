import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MyCalendar } from '../components/MyCalendar'
import { setView, setDate, getEvents } from '../actions/MyCalendarActions'

class MyCalendarContainer extends Component {
  render() {
    const {
      calendar,
      setView,
      setDate,
      getEvents,
    } = this.props
    return (
      <MyCalendar
        view={calendar.view}
        date={calendar.date}
        events={calendar.events}
        isFetching={calendar.isFetching}
        customCSSclasses={calendar.customCSSclasses}
        isAuth={calendar.isAuth}
        setView={setView}
        setDate={setDate}
        getEvents={getEvents}
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
  setView: view => dispatch(setView(view)),
  setDate: date => dispatch(setDate(date)),
  getEvents: () => dispatch(getEvents()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyCalendarContainer)
