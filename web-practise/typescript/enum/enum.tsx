enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}

interface DateTime {
    day: Days
}


function setDateTime(dateTime: DateTime) {
    console.log(`DateTime set to 2019 ${dateTime.day}`)
}

setDateTime({day: Days.Mon})
