setHeader()
drawMenu()
setComboOptions('expenseType', CATEGORIES)
setMaxDate()
addTable('tableContainer')
fillTableHeader()
fillTable(getData())
setFooter()

// Handlers
function submitExpense(event) {
    //
    event.preventDefault();

    // Gathering data
    const type = document.getElementById('expenseType').value
    const about = document.getElementById('about').value.trim()
    const amount = document.getElementById('amount').value
    const date = document.getElementById('date').value
    const expenses = getData();
    const editId = document.getElementById('expenseId').value;

    //
    if (editId) {
        // Use decomposion instead?
        const expense = expenses[+editId]

        expense.type = type
        expense.about = about
        expense.amount = +amount
        expense.date = date
    } else {
        expenses.push({
            type,
            about,
            amount: +amount,
            date
        })
    }

    // Synchronize
    updateAll(expenses)

    // Clear form
    // - values
    for (let i = 0; i < event.srcElement.elements.length - 2; i++) {
        event.srcElement.elements[i].value = ''
    }
    // - submit
    document.getElementById('submit').value = 'Submit'
}
function editItem(id) {
    const expense = getData()[id];
    const typeElement = document.getElementById('expenseType')

    typeElement.value = expense.type;
    document.getElementById('about').value = expense.about;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('date').value = expense.date;
    document.getElementById('submit').value = 'Update';
    document.getElementById('expenseId').value = id;

    typeElement.focus();
}
function deleteItem(id) {
    if (!confirm(`Do you really want to delete expense record ${id + 1}`)) {
        return
    }

    // Do job
    const data = getData()
    data.splice(id, 1)

    // Update all
    updateAll(data)
}

//
function setMaxDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = (today.getDate()).toString().padStart(2, '0');

    document.getElementById('date').setAttribute('max', `${year}-${month}-${day}`);
}
function setDescriptionRequired(event) {
    document.getElementById("about").required = document.getElementById("expenseType").value === CATEGORIES[CATEGORIES.length - 1];
}

// Performs update to storage and table content
function updateAll(data) {
    updateData(data);
    fillTable(data);
}