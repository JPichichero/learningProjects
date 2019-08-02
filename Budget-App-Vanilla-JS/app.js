let budgetController = (function() {
    
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value; 
    };

    let calculateTotal = function(type) {
        let sum = 0;
        data.allItems[type].forEach(function(currentElement) {
            sum += currentElement.value;
        });
        data.totals[type] = sum;

    }

    // Global Data Structure
    let data = {
        allItems: {
            expense: [],
            income: [],
        },
        totals: {
            expense: 0,
            income: 0,
        },
        budget: 0,
        percentage: -1,
    };

    //public method to allow other modules to enter new item into data structure
    return {
        addItem: function(typeItem, descriptionItem, valueItem) {
            let newItem, ID;

            //Create new ID for elements from array; can add or remove.
            if (data.allItems[typeItem].length > 0) {
                ID = data.allItems[typeItem][data.allItems[typeItem].length-1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'income' or 'expense' typeItem
            if (typeItem === 'expense') {
                newItem = new Expense(ID, descriptionItem, valueItem);
            } else if (typeItem === 'income') {
                newItem = new Income(ID, descriptionItem, valueItem);
            }

            // push it into our data structure 
            data.allItems[typeItem].push(newItem);

            // return new element
            return newItem;
        },

        deleteItem: function(type, id) {
            let itemID, index;

            itemID = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = itemID.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function() {

            // Calculate total income and expenses
            calculateTotal('expense');
            calculateTotal('income');

            // Calculate budget (income - expense)
            data.budget = data.totals.income - data.totals.expense

            // calculate % of income spent
            if (data.totals.income > 0 ) {
                data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
            } else {
                data.percentage = -1;
            };
        },

        calculatePercentages: function() {
            data.allItems.expense.forEach(function(currentVariable) {
                currentVariable.calcPercentage(data.totals.income);
            });
        },

        getPercentages: function() {
            let allPercentages;

            allPercentages = data.allItems.expense.map(function(currentElement) {
                return currentElement.getPercentage();
            });
            return allPercentages;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.income,
                totalExpenses: data.totals.expense,
                percentage: data.percentage,
            }
        },

        testing: function() {
            console.log(data);
        }
    }


})();

let UIController = (function() {

    let DOMString = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        expensesPercentageLabel:'.item__percentage',
        container: '.container',
        dateLabel: '.budget__title--month',
    };

    let formatNumber = function(number, type) {
        let numberSplit, integer, decimal;
        // Rules
        // +, - before number
        // 2 decimal points
        // comma separating thousands

        number = Math.abs(number);
        number = number.toFixed(2);

        numberSplit = number.split('.');

        integer = numberSplit[0];
        if (integer.length > 3 ) {
            integer = integer.substr(0, integer.length - 3) + ',' + integer.substr(integer.length - 3, 3);
        }

        decimal = numberSplit[1];

        return (type === 'expense' ? '-' : '+') + ' ' + integer + '.' + decimal;

    };

    let nodeListForEach = function(list, callback) {
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    // Have to return so that result can be used publically.
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMString.inputType).value,
                description: document.querySelector(DOMString.inputDescription).value,
                value: parseFloat(document.querySelector(DOMString.inputValue).value),
            };
        },

        addListItem: function(object, type) {
            let html, newHTML;

            // create HTML string with placeholder text
            if ( type === 'income') {
                element = DOMString.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            } else if (type === 'expense') {
                element = DOMString.expenseContainer;         
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }

            // Replace placeholder text with actual data
            newHTML = html.replace('%id%', object.id);
            newHTML = newHTML.replace('%description%', object.description);
            newHTML = newHTML.replace('%value%', formatNumber(object.value, type));

            // Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

        },

        deleteListItem: function(selectorID) {
            let element; 
            
            // Weird setup
            element = document.getElementById(selectorID);
            
            element.parentNode.removeChild(element);

        },

        clearFields: function() {
            //Variable Declaration
            let fields, fieldsArray;
            
            //Clear fields
            fields = document.querySelectorAll(DOMString.inputDescription + ', ' + DOMString.inputValue);

            //Turn list into array.
            fieldsArray = Array.prototype.slice.call(fields);

            //ForEach Loop to clear field
            fieldsArray.forEach(function(currentElement, indexNumber, array) {
                currentElement.value = "";
            });

            //Set focus back to description
            fieldsArray[0].focus();
        },

        displayBudget: function(object) {
            let type;

            object.budget > 0 ? type = 'income' : type = 'expense';

            document.querySelector(DOMString.budgetLabel).textContent = formatNumber(object.budget, type);
            document.querySelector(DOMString.incomeLabel).textContent = formatNumber(object.totalIncome, 'income');
            document.querySelector(DOMString.expenseLabel).textContent = formatNumber(object.totalExpenses, 'expense');

            if (object.percentage > 0) {
                document.querySelector(DOMString.percentageLabel).textContent = object.percentage + '%';
            } else {
                document.querySelector(DOMString.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(currentPercentages) {
            let fields;

            fields = document.querySelectorAll(DOMString.expensesPercentageLabel);

            nodeListForEach(fields, function(current, index) {

                if (currentPercentages[index] > 0) {
                    current.textContent = currentPercentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });

        },

        displayMonth: function() {
            let now, months, month, year;
            
            now = new Date();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMString.dateLabel).textContent = months[month] + ' ' + year;
        },

        changedType: function() {
            let fields;

            fields = document.querySelectorAll(
                DOMString.inputType + ',' + DOMString.inputDescription + ',' +
                DOMString.inputValue);

            nodeListForEach(fields, function(currentElement) {
                currentElement.classList.toggle('red-focus');
            });

            document.querySelector(DOMString.inputButton).classList.toggle('red');

        },

        getDOMString: function() {
            return DOMString;
        }
    }
})();

let appController = (function(budgetCtrl, UICtrl) {

    let setupEventListeners = function() {
        let DOM = UICtrl.getDOMString();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });    

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    let updateBudget = function() {
        // Calculate budget
        budgetCtrl.calculateBudget();

        // Return Budget
        let budget = budgetCtrl.getBudget();

        // Display Budget
        UICtrl.displayBudget(budget);
    };

    let updatePercentages = function() {

        // Calculate percentage
        budgetCtrl.calculatePercentages();

        // Read percentage from budget controller
        let currentPercentages = budgetCtrl.getPercentages();

        // Update UI with new percentages
        UICtrl.displayPercentages(currentPercentages);
    };

    let ctrlAddItem = function() {
        //Variable declaration
        let input, newItem

        // 1. Get Field Input Data
        input = UICtrl.getInput();
        console.log(input);
        
        // Check that description and values were entered
        if (input.description !== "" && ! isNaN(input.value) && input.value > 0) {

            // Add the item to budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);

            // Add item to UI
            UICtrl.addListItem(newItem, input.type);

            // Clear the fields after entry
            UICtrl.clearFields();

            // Calculate and update budget
            updateBudget();

            // Calculate and update percentages
            updatePercentages();
        }
    }

    let ctrlDeleteItem = function(event) {
        let itemID, splitID, type, ID;
  
        // Seems like it's not the most clean or well-done code.
        itemID = (event.target.parentNode.parentNode.parentNode.parentNode.id);

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // Delete item from data structure
            budgetCtrl.deleteItem(type, ID);

            // Delete item from UI
            UICtrl.deleteListItem(itemID);

            // Calculate and update budget
            updateBudget();

            // Calculate and update percentages
            updatePercentages();
       }
    };

    return {
        init: function() {
            console.log('Application has started');
            UICtrl.displayMonth();
            UICtrl.displayBudget ({ // Resets everything. 
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percentage: -1,
            });
            setupEventListeners();
        }

    }

})(budgetController, UIController);

appController.init();