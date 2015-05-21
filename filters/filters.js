angular.module('filters',[])
    .filter('convertCurrency',function(){
        return function(value,currencyFilter,selectedCurrency){
            if(currencyFilter==selectedCurrency||currencyFilter==undefined) return value;
            if(currencyFilter=='dollar'){
                if(selectedCurrency=='rupee') return (parseInt(value)/60).toFixed(2);
                else return (parseInt(value)*1.11).toFixed(2);
            }else if(currencyFilter=='rupee'){
                if(selectedCurrency=='dollar') return (parseInt(value)*60).toFixed(2);
                else return (parseInt(value)*80).toFixed(2);
            }else if(currencyFilter=='euro'){
                if(selectedCurrency=='rupee') return (parseInt(value)/80).toFixed(2);
                else return (parseInt(value)/1.11).toFixed(2);
            }
        }
    });