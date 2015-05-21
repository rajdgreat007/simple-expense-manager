angular.module('expenseManager',['services.expense','services.friend','filters','directives','ui.bootstrap'])
    .controller('ExpenseController',['$scope', 'ExpenseService','FriendService',
        function($scope, ExpenseService,FriendService){
        /*fill dummy data*/
        /*FriendService.fillDummyFriends();
        ExpenseService.fillDummyExpenses();*/

        $scope.addEdit = 'Add a new item:';
        $scope.addEditSave = 'Add a new expense';
        $scope.newExpense = {};
        $scope.allExpenses = ExpenseService.getAllExpenses();
        $scope.allFriends = FriendService.getAllFriends();
        $scope.addExpense = function(expense){
            if($scope.addEditSave.indexOf('Save')==0){
                var res = ExpenseService.editExpense($scope.newExpense);
                if(res.valid)  {
                    $scope.newExpense = {};
                    $scope.err=false;
                    $scope.errorMsg = '';
                    $scope.addEdit = 'Add a new item:';
                    $scope.addEditSave = 'Add a new expense';
                    $scope.selectedExpenseIndex = null;
                }
                else {
                    $scope.err=true;
                    $scope.errorMsg = res.error;
                }
            }else{
                var res=ExpenseService.addExpense(expense);
                if(res.valid)  {
                    $scope.newExpense = {};
                    $scope.err=false;
                    $scope.errorMsg = '';
                }
                else {
                    $scope.err=true;
                    $scope.errorMsg = res.error;
                }
            }
        };
        $scope.addFriend = function(friend){
            FriendService.addFriend(friend);
            $scope.newFriend = "";
        };

        $scope.editExpense = function(expense){
            $scope.addEdit = 'Edit item:';
            $scope.addEditSave = 'Save expense';
            for(var prop in expense){
                if(expense.hasOwnProperty(prop)){
                    $scope.newExpense[prop] = expense[prop];
                }
            }
        };

        $scope.deleteExpense = function(expense){
            ExpenseService.deleteExpense(expense);
        };



        /*datepicker code*/

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i=0;i<$scope.events.length;i++){
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };

    }]);
