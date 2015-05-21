angular.module('services.expense',[])
    .service('ExpenseService',function(){
        var allExpenses = [];
        var alreadyAdded = function(expense){
            return allExpenses.filter(function(exp){return exp.expenseName==expense.expenseName}).length>0;
        };
        var emptyField = function(expense){
           if(Object.keys(expense).length!==6) return true;
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
            if(emptyField(expense)) {res.valid = false; res.error='Please fill all fields!'}
            return res;
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

        this.fillDummyExpenses = function(){
            for(var i=0;i<10;i++){

            }
        }


    });