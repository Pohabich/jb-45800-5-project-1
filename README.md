In this project, you must build a website for managing expenses. The website allows you to add/update/delete expenses, view various expenses, view graphs, generate reports, and more.

The site is made up of the following pages:
-	A home page that allows you to add, update, delete, and view expenses
-	A filter page that allows you to view expenses according to different categories
-	A graphs and reports page that allows you to view graphs and generate reports for various expenses
-	An about page to display information about the site and the programmer

On each steamed leaf:
-	Main title
-	A menu that allows you to navigate between pages.
-	Aesthetic design. Can use Tailwind-Bootstrap-Native CSS

The HOME PAGE should contain:
-	Form for recording a new expense or updating an existing expense.
-	The form must receive the following information:
-	The expense category is from a list of pre-prepared categories, for example food/fuel/leisure/authorities/other/...
-	Description of the expense
-	The amount of the expense
-	The date of issue

Validation:
-	Required fields: expense category, expense amount, expense date.
-	If the user selects the expense category "Other" (i.e. an item indicating that the expense does not exist in the list this built-in), then it is also mandatory to enter a description for the expense in the description field.
-	The amount of the expense is a price, must be positive, and cannot be over 100,000.
-	The issue date cannot be a future date. It must be the current day or a day in the past. No time is required, just date.

Below the form, a table of the various expenses must be presented.
The table should allow for updating an existing expense. For example, an "Update" button next to each expense that allows the expense details to be returned to the form for updating.
The table should allow for the deletion of an existing expense. For example, a "Delete" button next to each expense that allows you to delete the the expense.

All expenses must be saved in Local Storage and reloaded when you return to the site.

The FILTERS PAGE should contain:
-	Filter expenses by year: Selecting a year from a list box will display only expenses from that year in the table
-	Expenses filter by month: Selecting year + month will display in the table only the expenses from the selected year and month
-	Filter expenses by days: Selecting year + month + day will display in the table only the expenses from this date
-	Filter by expense amount: Entering a maximum expense amount will only display expenses up to this amount in the table.

Note: Expenses must be displayed according to the filters in the table displayed on this page (regardless of the table on the home page).

The GRAPHS AND REPORTS PAGE should contain:
-	Displaying a pie chart by expense category
-	Displaying a histogram chart according to the time of expenses, for example by years or months
-	Button to create a PDF file containing a report of all expenses
-	Button to create a CSV file containing the list of all expenses.

The INFORMATION PAGE should contain:
-	Explanation of the system
-	Description of the student
-	The student's picture.
