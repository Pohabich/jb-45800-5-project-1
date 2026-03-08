setHeader()
drawMenu('Filters')
setComboOptions('years', getYears())
addTable('tableContainer')
fillTableHeader(false)
fillTable(getData(), false)
setFooter()


// Handlers //
// Buttons
function applyDate(event) {
    //
    event.preventDefault();

    // Gathering 
    const year = getSelectedYear()
    const month = getSelectedMonth()
    const day = getSelectedDay()

    // Filtering
    const items = getData().filter(expense => new Date(expense.date).getFullYear() === year
        && (month === 0 || new Date(expense.date).getMonth() + 1 === month)
        && (day === 0 || new Date(expense.date).getDate() === day))

    // Reset other
    document.getElementById('resetAmount').click()

    // Applying
    fillTable(items, false)
}
function clearDateForm(event) {
    document.getElementById('months').disabled = true
    document.getElementById('days').disabled = true
}
function applyAmount(event) {
    //
    event.preventDefault();

    // Gathering
    const amountLimit = getSelectedAmount()

    // Filtering
    const items = getData().filter(expense => expense.amount < amountLimit + 1)

    // Reset other
    document.getElementById('resetDate').click()

    // Applying
    fillTable(items, false)
}
// Combos
function enableMonths(event) {
    const isDisabled = getSelectedYear() === ''

    document.getElementById('months').disabled = isDisabled
    document.getElementById('days').disabled = true

    if (!isDisabled) setComboOptions('months', getMonths()) //TODO (as possiblity): getMonthsAsText() as extended parameter
}
function enableDays(event) {
    const isDisabled = getSelectedMonth() === ''

    document.getElementById('days').disabled = isDisabled
    if (!isDisabled) setComboOptions('days', getDays())
}

// Helpers //
function getYears() {
    const years = getData().map(expense => new Date(expense.date).getFullYear())

    return [...new Set(years)].sort() // unique values only
}
function getMonths() {
    //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#%D0%BF%D0%BE%D0%B8%D1%81%D0%BA_%D0%B2_%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B5
    const year = getSelectedYear()
    const months = getData().filter(expense => new Date(expense.date).getFullYear() === year)
        .map(expense => new Date(expense.date).getMonth() + 1)

    return [...new Set(months)].sort((a, b) => a - b) //TODO: Do we need function here?
}
function getDays() {
    const year = getSelectedYear()
    const month = getSelectedMonth()
    const days = getData().filter(expense => new Date(expense.date).getFullYear() === year && (new Date(expense.date).getMonth() + 1) === month)
        .map(expense => new Date(expense.date).getDate())

    return [...new Set(days)].sort((a, b) => a - b)
}
//
function getSelectedYear() {
    return +document.getElementById('years').value
}
function getSelectedMonth() {
    return +document.getElementById('months').value
}
function getSelectedDay() {
    return +document.getElementById('days').value
}
function getSelectedAmount() {
    return +document.getElementById('amount').value
}