setHeader()
drawMenu('Reporting')

drawChart(pie, 'pie', PIE_CHART_TITLE, CATEGORIES, getPieValues())
drawChart(bar, 'bar', BAR_CHART_TITLE, MONTHS, getBarValues())

setComboOptions('fileType', FILE_EXTENSIONS)
window.jsPDF = window.jspdf.jsPDF; // PDF saver required

setFooter()


// Charts stuff //
function getPieValues() {
    // Is we need place reduces into named function?
    return CATEGORIES.map(category => getData().filter(expense => expense.type === category).reduce((cumulative, curExpense) => cumulative + curExpense.amount, 0))
}
function getBarValues() {
    return [...Array(12).keys()].map(month => getData().filter(expense => new Date(expense.date).getMonth() === month).reduce((cumulative, curExpense) => cumulative + curExpense.amount, 0))
}
function drawChart(id, type, title, xValues, yValues) {
    const isLegendVisible = type === 'pie';

    const chrt = new Chart(id, {
        type: type,
        data: {
            labels: xValues,
            datasets: [{
                data: yValues,
                backgroundColor: CHART_COLORS
            }]
        },
        options: {
            legend: { display: isLegendVisible },
            title: {
                display: true,
                text: title,
                fontSize: 20,
                fontColor: 'black'
            },
            scales: {}
        }
    });

    if (!isLegendVisible) {
        chrt.options.scales.xAxes = [{
            gridLines: {
                drawOnChartArea: false
            },
            gridLines: {
                offsetGridLines: false
            }
        }];
        chrt.options.scales.yAxes = [{
            ticks: {
                min: 0
            }
        }];
        chrt.update()
    }
}

// Savers stuff //
function saveToFile(event) {
    event.preventDefault();

    switch (document.getElementById('fileType').value.toLowerCase()) {
        case 'csv':
            saveToCsv()
            break;
        case 'pdf':
            saveToPdf()
            break;
        default:
            alert('Unknown file extesion!')
    }
}
function saveToPdf() {
    try {
        const doc = new jsPDF();

        doc.autoTable({
            head: [TABLE_COLUMNS],
            body: getPdfBody(),
        });

        doc.save(FILE_DEFAULT_NAME + '.pdf');
    } catch (error) {
        reportError(error)
    }
}
function getPdfBody() {
    return getData().map(expense => Object.values(expense));
}
function saveToCsv() {
    saveFileWithPicker(getCsvData(), FILE_DEFAULT_NAME + '.csv');
}
async function saveFileWithPicker(content, suggestedName) {
    try {
        // Show the file picker and get a file handle
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: suggestedName,
            types: [{
                description: 'CSV file',
                accept: { 'text/plain': ['.csv'] },
            }],
        });

        // Create a writable stream to write to the file
        const writable = await fileHandle.createWritable();

        // Write the content
        await writable.write(content);

        // Close the file
        await writable.close();

    } catch (error) {
        reportError(error)
    }
}
function getCsvData() {
    return getData().reduce((acc, expense) => acc + `${Object.values(expense).join()}\n`, 'sep=,\n' + TABLE_COLUMNS.join() + '\n');
}
function reportError(error) {
    console.error(SAVE_ERROR_MSG + ':', error);
    alert(SAVE_ERROR_MSG);
}