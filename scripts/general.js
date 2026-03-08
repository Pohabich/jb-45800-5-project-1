// Page tools //
function setHeader(content = APP_NAME) {
    document.title = content;
    document.querySelector('header').innerHTML = content;
}
function setFooter(content = COPYRIGHT) {
    const curYear = new Date().getFullYear();

    document.querySelector('footer').innerHTML = content + ' ' + curYear;
}
function drawMenu(activeItem = '', items = MENU_ITEMS) {
    let menuContent = '<ul class="nav nav-pills justify-content-center">';
    let activeCSS = '';

    if (activeItem === '') {
        activeItem = items[0];
    }

    for (const item of items) {
        activeCSS = item === activeItem ? 'active' : '';

        menuContent += `
                        <li class="nav-item">
                            <a class="nav-link ${activeCSS}" href="${item.toLowerCase()}.html">${item}</a>
                        </li>
                        `
    }
    menuContent += '</ul>';

    document.querySelector('nav').innerHTML = menuContent;
}

// LocalStorage tools //
function getData() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
}
function updateData(data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
}

// Table tools //
function addTable(tableContainerId, tableHeadId = 'tHead', tableBodyId = 'tData') {
    document.getElementById(tableContainerId).innerHTML = `
                                                            <table class="table table-bordered table-hover table-responsive">
                                                                <thead class="table-light">
                                                                    <tr id="${tableHeadId}" class="text-center"></tr>
                                                                </thead>
                                                                <tbody id="${tableBodyId}"></tbody>
                                                            </table>`
}
function fillTableHeader(isButtons = true, tableHeadId = 'tHead', columns = TABLE_COLUMNS) {
    let content = columns.reduce((acc, colName) => acc + `<th>${colName}</th>`, '');
    content += isButtons ? '<th></th>' : '';

    document.getElementById(tableHeadId).innerHTML = content;
}
function fillTable(data, isButtons = true, tableBodyId = 'tData') {
    let content = '';
    let buttons = '';
    let itemId = 0;

    for (const item of data) {
        if (isButtons) {
            buttons = `
                      <td>
                          <button onclick="editItem(${itemId})" class="btn btn-primary">Edit</button>
                          <button onclick="deleteItem(${itemId})" class="btn btn-danger">Delete</button>
                      </td>
                      `
            itemId++;
        }

        content += `
                    <tr>
                        ${Object.values(item).reduce((acc, arg) => acc + '<td>' + arg + '</td>', '')}
                        ${buttons}
                    </tr>
                    `
    }

    document.getElementById(tableBodyId).innerHTML = content ? content : `<tr>
                                                                            <th colspan="${TABLE_COLUMNS.length + isButtons}" class="text-center">${TABLE_EMPTY_MSG}</th>
                                                                          </tr>`;
}

// Helpers //
function setComboOptions(comboId, optionsData, setDisabledSelected = true) {
    document.getElementById(comboId).innerHTML = optionsData.reduce((comboOptions, option) => comboOptions += `<option value="${option}">${option}</option>`, setDisabledSelected ? `<option disabled selected value=""></option>` : '');
}
function isValueEmpty(value) {
    return value.length === 0
}
