import moment from 'moment'

export const checkEvent = event => {
  let customClasses = { winter: [], autumn: [], holidays: [] }
  let start = moment(event.start)
    .format()
    .split('T')[0]
  let end = moment(event.end)
    .format()
    .split('T')[0]
  let dates = []
  let holidays = []

  if (start === end) {
    dates = [start]
    if (event.note) {
      holidays.push(start)
    }
  } else {
    start = moment(event.start)
    end = moment(event.end)
    while (start.diff(end, 'days') > 1) {
      if (event.note) {
        holidays.push(start.format().split('T')[0])
      }
      dates.push(start.format().split('T')[0])
      start.add(1, 'weeks').calendar()
    }
  }
  customClasses.holidays = customClasses.holidays.concat(holidays)
  if (event.isSubscribed) {
    customClasses.autumn = customClasses.autumn.concat(dates)
  } else {
    customClasses.winter = customClasses.winter.concat(dates)
  }
  return customClasses
}

// winter -> meetup
// autumn -> meetup + isSubscribed
// holidays -> meetup + note

export const getCustomClasses = events => {
  let customClasses = { winter: [], autumn: [], holidays: [] }
  for (const event of events) {
    const _customClasses = checkEvent(event)
    customClasses.winter = customClasses.winter.concat(_customClasses.winter)
    customClasses.autumn = customClasses.autumn.concat(_customClasses.autumn)
    customClasses.holidays = customClasses.holidays.concat(
      _customClasses.holidays
    )
  }
  return customClasses
}
