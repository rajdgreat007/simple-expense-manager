angular.module('services.friend',[])
    .service('FriendService',function(){
        var allFriends = [];
        var alreadyAdded = function(friend){
          return allFriends.indexOf(friend)!==-1;
        };
        this.getAllFriends = function(){
            return allFriends;
        };
        
        this.addFriend = function(friend){
            if(!alreadyAdded(friend)) allFriends.push(friend);
            console.log(allFriends)
        };

        this.fillDummyFriends = function(){
            for(var i=0;i<5;i++){
                allFriends.push(['raj','ravi','shankar','anu','diva'][i])
            }
        }

    });