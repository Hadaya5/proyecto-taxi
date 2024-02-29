export const formatDateTime = (selectedTime, selectedDate) => {
    const dateTime = selectedTime._d;

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    let hoursStr;
    let minutesStr;
    let secondsStr;

    if (hours <= 9) {
      hoursStr = "0" + hours.toString();
    } else {
      hoursStr = hours;
    }
    if (minutes <= 9) {
      minutesStr = "0" + minutes.toString();
    } else {
      minutesStr = minutes;
    }
    if (seconds <= 9) {
      secondsStr = "0" + seconds.toString();
    } else {
      secondsStr = seconds;
    }

    return `${selectedDate} ${hoursStr}:${minutesStr}:${secondsStr}`

  }