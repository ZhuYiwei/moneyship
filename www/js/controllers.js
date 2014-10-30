angular.module('starter.controllers', [])

//
.controller('AddBillCtrl', function($scope,$state,$stateParams,AllBills,AllFriends) {
  $scope.goChooseFriend = function(){
    $state.go('app.choosefriends');
  }

  $scope.doAddBill=function(){
    var tmpBillName = $scope.Friend.name ;
    console.log("tmpBillName:"+tmpBillName);
    var tmpType = document.getElementById("typechoice").value;
    console.log("tmpBillType:"+tmpType);
    var tmpMoney = document.getElementById("newbillmoney").value;
    console.log("tmpBillMoney:"+tmpMoney);
    var tmpDescription = document.getElementById("newbilldescription").value;
    console.log("tmpBillDescription:"+tmpDescription);
    var tmpDate = document.getElementById("newbilldate").value;
    console.log("tmpBillDate:"+tmpDate);
    AllBills.createTable();
    AllBills.add({ name: tmpBillName, type:tmpType, money:tmpMoney, description:tmpDescription, date:tmpDate},
      function(){
        $state.go('app.home');
        $scope.Friend.name='';
        $scope.Friend.show=false;
        AllFriends.update({name:tmpBillName, type:tmpType, money:tmpMoney},function(){
          console.log("update5: update succeed");
        });
    });

  };
})

.controller('ChooseFriendCtrl', function($scope,$ionicViewService, $ionicModal, $timeout, $stateParams, AllFriends) {

  $scope.choose = function(friend){
    $scope.Friend.name=friend;
    $scope.Friend.show=true;
    console.log(friend);
    var backView = $ionicViewService.getBackView();
    backView.go();
  }

  $ionicModal.fromTemplateUrl('templates/addnewfriend.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.close = function() {
    $scope.modal.hide();
  };

  $scope.addfriend = function() {
    $scope.newFriendName=document.getElementById('inputfriendname').value;
    $scope.modal.show();
  };

  $scope.doadd = function() {     
    var tmpName = document.getElementById("newfriendname").value;
    var tmpEmail = document.getElementById("newfriendemail").value;
    console.log('Doing addnewfriend:', tmpName,tmpEmail);
    AllFriends.createTable();
    AllFriends.add({ name: tmpName, email: tmpEmail, money: 0 }, function() {
      AllFriends.all(function(r) {
        $scope.allfriends = r;
        console.log('AllFriendsList update');
      });
      $scope.modal.hide();
    });
  };

  $scope.allfriend = AllFriends.get($stateParams.allfriendsId);
  AllFriends.all(function(r) {$scope.allfriends = r});
})

.controller('HomeCtrl', function($ionicViewService,$scope,$stateParams,FriendsIOwe,FriendsOweMe,AllFriends,AllBills) {
  //跳转到主页面时立即清除back按钮 
  $ionicViewService.clearHistory();

  AllFriends.allfriendsoweme(function(r) {
    $scope.friendsoweme = r;
    console.log("controller:friendsoweme");
  });

  AllFriends.allfriendsiowe(function(r) {
    $scope.friendsiowe = r;
    console.log("controller:friendsiowe");
  });
  $scope.friendOwe = function(o){
    AllFriends.setOwe(o);
  }
  
  $scope.friendiowe = FriendsIOwe.get($stateParams.friendsioweId);
  $scope.friendoweme = FriendsOweMe.get($stateParams.friendsowemeId);
})

.controller('BillDetailCtrl', function($scope,$stateParams,AllFriends,AllBills) {  
  $scope.friend = AllFriends.getOwe();
  console.log($scope.friend);
  AllBills.select($scope.friend.name,function(r){
    $scope.billdetail = r;
  });
  $scope.settleAll=function(){
    AllFriends.reset($scope.friend.name);
    AllBills.deleterecord($scope.friend.name,function(){
      AllBills.select($scope.friend.name,function(r){
        $scope.billdetail = r;
        $scope.$apply();
        console.log("settleAll finish controller");
      });      
    });
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

//模板
.controller('AppCtrl', function($scope, $ionicModal, $timeout,DB) {
  // Form data for the login modal

  $scope.loginData = {};
  $scope.Friend={
    name: "",
    show: false
  };

  $scope.reset = function(){
    // DB.transaction(tx){
    //   tx.executeSql('DROP TABLE AllBillsTable');
    //   tx.executeSql('DROP TABLE AllFriendsTable');
    // };
  };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.click = function() {
    console.log(this.friend);
  };
});
