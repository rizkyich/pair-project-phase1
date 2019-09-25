module.exports = (dateString) => {

    dateString = new Date(dateString)
    let day = dateString.getDate()
    let month = dateString.getMonth()
    let year = dateString.getFullYear()

    return `${day}/${month}/${year}`
}