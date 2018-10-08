import React, { Component } from "react"
import BigCalendar from "react-big-calendar"
import { Calendar } from "react-yearly-calendar"
import moment from "moment"
import PropTypes from "prop-types"
import Modal from "react-modal"
import { getCustomClasses } from "../../util/date"
import "./styles.css"

import "./react-big-calendar.css"

Modal.setAppElement("#root")

const customStyles = {
  overlay: {
    zIndex: 100,
    background: "rgba(0,0,0,0.55)"
  },
  content: {
    zIndex: 1000,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
}
/*
const customCSSclasses = {
  holidays: [
    '2018-04-25',
    '2018-05-01',
    '2018-10-02',
    '2018-10-03',
    '2018-11-01',
  ],
  autumn: {
    start: '2018-03-21',
    end: '2018-6-20',
  },
  summer: {
    start: '2018-06-21',
    end: '2018-09-22',
  },
  autumn: {
    start: '2018-09-23',
    end: '2018-12-21',
  },
  weekend: 'Sat,Sun',
  winter: day =>
    day.isBefore(moment([2018, 2, 21])) || day.isAfter(moment([2018, 11, 21])),
}
*/
const localizer = BigCalendar.momentLocalizer(moment)

export class MyCalendar extends Component {
  state = {
    year: moment().year(),
    modalIsOpen: false,
    event: {},
    showInfoClicked: false,
    noteClicked: false,
    subscribeClicked: false,
    modalButtonClicked: false,
    value: ""
  }
  openModal = () => {
    this.setState({ modalIsOpen: true })
  }
  closeModal = () => {
    this.setState({ modalIsOpen: false })
    this.setState({
      modalButtonClicked: false,
      showInfoClicked: false,
      noteClicked: false
    })
  }
  showInfo = () => {
    console.log("info:")
    console.log(this.state.event)
    this.setState({ modalButtonClicked: true, showInfoClicked: true })
  }
  subscribe = () => {
    const event = this.state.event
    event.isSubscribed = true
    this.setState({ event: event })
    console.log("You are subscribed!")
    console.log(this.state.event.isSubscribed)
    const request = async () => {
      const response = await fetch(
        `/api/events/subscribe/${this.state.event._id}`,
        { method: "POST" }
      )
      const json = await response.json()
      if (json.status === "ok") {
        return true
      }
      return false
    }
    request()
    alert("You are subscribed!")
  }
  changeNote = () => {
    /*const result = prompt("Note", this.state.note)
    if (result) {
      const event = this.state.event
      event.note = result
      this.setState({ event: event })
    }
    console.log("note")
    console.log(this.state.event.note)*/
    this.setState({
      modalButtonClicked: true,
      noteClicked: true,
      value: this.state.event.note
    })
  }
  handleChange = event => {
    this.setState({ value: event.target.value })
  }
  handleButtonClick = e => {
    let view = "" + e.currentTarget.innerText
    this.props.setView(view.toLowerCase())
  }
  handleEventClick = e => {
    this.setState({ event: e })
    this.openModal()
  }
  handleNavClick = e => {
    let nav = "" + e.currentTarget.innerText
    nav = nav.toLowerCase()
    let date = moment(this.props.date)
    switch (nav) {
      case "today":
        this.props.setDate(new Date(moment().toDate()))
        this.setState({ year: moment().year() })
        break

      case "prev":
        switch (this.props.view) {
          case "year":
            date.subtract(1, "years").calendar()
            this.props.setDate(date.toDate())
            this.setState({ year: moment(date).year() })
            break

          case "month":
            date.subtract(1, "months").calendar()
            this.props.setDate(date.toDate())
            break

          case "week":
            date.subtract(1, "weeks").calendar()
            this.props.setDate(date.toDate())
            break

          case "day":
            date.subtract(1, "days").calendar()
            this.props.setDate(date.toDate())
            break

          default:
            break
        }
        break

      case "next":
        switch (this.props.view) {
          case "year":
            date.add(1, "years").calendar()
            this.props.setDate(date.toDate())
            this.setState({ year: moment(date).year() })
            break

          case "month":
            date.add(1, "months").calendar()
            this.props.setDate(date.toDate())
            break

          case "week":
            date.add(1, "weeks").calendar()
            this.props.setDate(date.toDate())
            break

          case "day":
            date.add(1, "days").calendar()
            this.props.setDate(date.toDate())
            break

          default:
            break
        }
        break

      default:
        break
    }
  }
  handleDateClick = date => {
    console.log(date)
    date = date._isAMomentObject === true ? new Date(date.toDate()) : date
    this.props.setDate(date)
    this.props.setView("day")
  }

  handleNoteSubmit = e => {
    e.preventDefault()
    console.log(e.target.elements)
    const note = e.target.elements["note"].value
    const request = async () => {
      const response = await fetch(`/api/users/note/${this.state.event._id}`, {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: `note=${note}`
      })
      const json = await response.json()
      if (json.status === "ok") {
        return true
      }
      return false
    }
    request()
    alert("Note saved!")
    //this.props.handleLogin(note)
  }

  componentDidMount() {
    if (this.props.isAuth) this.props.getEvents()
  }
  render() {
    const { isAuth, date, view, events, isFetching } = this.props
    return isAuth ? (
      <div>
        <div className="toolbar">
          <button className="btn" onClick={this.handleButtonClick}>
            Year
          </button>
          <button className="btn" onClick={this.handleButtonClick}>
            Month
          </button>
          <button className="btn" onClick={this.handleButtonClick}>
            Week
          </button>
          <button className="btn" onClick={this.handleButtonClick}>
            Day
          </button>
        </div>
        <div className="toolbar">
          <button className="btn" onClick={this.handleNavClick}>
            Prev
          </button>
          <button className="btn" onClick={this.handleNavClick}>
            Today
          </button>
          <button className="btn" onClick={this.handleNavClick}>
            Next
          </button>
        </div>
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="event-modal">
              <h2 ref={subtitle => (this.subtitle = subtitle)}>
                {this.state.event.title}
              </h2>
              <button
                className="event-modal__close modal-close"
                onClick={this.closeModal}
              >
                X
              </button>
              <div />
              {!this.state.modalButtonClicked ? (
                <div className="modal-buttons">
                  <div>
                    <button className="btn" onClick={this.showInfo}>
                      Show info
                    </button>
                  </div>
                  {!this.state.event.isSubscribed ? (
                    <div>
                      <button className="btn" onClick={this.subscribe}>
                        Subscribe
                      </button>
                    </div>
                  ) : null}
                  <div>
                    <button className="btn" onClick={this.changeNote}>
                      Note
                    </button>
                  </div>
                </div>
              ) : this.state.showInfoClicked ? (
                <div>
                  <p>
                    Start:{" "}
                    {moment(this.state.event.start).format(
                      "DD-MM-YYYY, hh:mm a"
                    )}
                  </p>
                  <p>
                    End:{" "}
                    {moment(this.state.event.end).format("DD-MM-YYYY, hh:mm a")}
                  </p>
                  <p>Subject: {this.state.event.subject}</p>
                  <p>Product: {this.state.event.product}</p>
                  <p>Place: {this.state.event.place}</p>
                </div>
              ) : (
                <form className="col-md-4" onSubmit={this.handleNoteSubmit}>
                  <input
                    type="text"
                    name="note"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  <button type="submit" className="btn">
                    Save note
                  </button>
                </form>
              )}
            </div>
          </Modal>
        </div>
        {isFetching ? (
          <p>Uploading...</p>
        ) : (
          <p>
            View: {view}, Date: {moment(date).format("DD-MM-YYYY")}
          </p>
        )}
        {view === "year" ? (
          <Calendar
            year={this.state.year}
            onPickDate={this.handleDateClick}
            customClasses={getCustomClasses(events)}
            showWeekSeparators={false}
            showDaysOfWeek={false}
          />
        ) : (
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            toolbar={false}
            onDrillDown={this.handleDateClick}
            onSelectEvent={this.handleEventClick}
            date={date}
            eventPropGetter={(event, start, end, isSelected) => {
              let newStyle = {
                backgroundColor: "lightblue",
                color: "black",
                borderRadius: "0px",
                border: "none"
              }

              if (event.isSubscribed) {
                newStyle.backgroundColor = "lightgreen"
              }

              return {
                className: "",
                style: newStyle
              }
            }}
          />
        )}
      </div>
    ) : null
  }
}

MyCalendar.propTypes = {
  date: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  setView: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired
}
