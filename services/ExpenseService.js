angular.module('services.expense',[])
    .service('ExpenseService',function(){
        var allExpenses = [];
        var alreadyAdded = function(expense){
            return allExpenses.filter(function(exp){return exp.expenseName==expense.expenseName}).length>0;
        };
        var emptyField = function(expense){
           if(Object.keys(expense).length<6) return true;
           for(var key in expense){
               if(expense.hasOwnProperty(key)){
                   if(expense[key]==''||expense[key]==null||expense[key]==undefined) return true;
               }
           }
           return false;
        };
        var validateExpense = function(expense){
            var res = {valid : true, error : ''};
            if(alreadyAdded(expense)) {res.valid = false; res.error='Expense already exists!'}
            else if(emptyField(expense)) {res.valid = false; res.error='Please fill all fields!'}
            return res;
        };

        var getExpenseIndex = function(expense){
            for(var i=0;i<allExpenses.length;i++){
                if(expense.expenseName == allExpenses[i].expenseName) return i;
            }
        };
        this.getAllExpenses = function(){
            return allExpenses;
        };

        this.addExpense = function(expense){
            var res = validateExpense(expense);
            if(res.valid){
                allExpenses.push(expense);
            }
            console.log(allExpenses);
            return res;
        };

        this.editExpense = function(expense){
            var res = {valid : true, error : ''};
            if(emptyField(expense)) {res.valid = false; res.error='Please fill all fields!'}
            if(res.valid){
                var index = getExpenseIndex(expense);
                var expenseInArr = allExpenses[index];
                for(var prop in expense){
                    if(expense.hasOwnProperty(prop)){
                        expenseInArr[prop] = expense[prop];
                    }
                }
            }
            console.log(allExpenses);
            return res;
        };

        this.deleteExpense = function(expense){
            var index = getExpenseIndex(expense);
            allExpenses.splice(index,1);
        };
        this.fillDummyExpenses = function(){
            var date = new Date();
            for(var i=0;i<5;i++){
                allExpenses.push({
                    paymentType : 'Card',
                    selectedFriends : ['raj','ravi','shankar','anu','diva'].slice(i),
                    expenseName : 'Expense'+i,
                    dt : new Date(date.setDate(date.getDate() + i)),
                    selectedCurrency : ['rupee','dollar','euro','rupee','dollar'][i],
                    amount : 20*(i+1)
                })
            }
        }


    });