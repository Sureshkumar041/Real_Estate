const DateTime = () => {

    var date = new Date();
    // Current Time
    var hours = date.getHours();
    var minutes = date.getMinutes()
    var newformat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var currentTime = hours + ':' + minutes + ' ' + newformat;
    // Current Date
    var dat = date.getDate()
    const months = date.getMonth()
    const year = date.getFullYear()
    dat = dat < 10 ? '0' + dat : dat;
    var currentDate = dat + '/' + (months + 1) + '/' + year;
    const dt = {
        currentDate: currentDate,
        currentTime: currentTime
    }
    return dt
}

module.exports = DateTime;