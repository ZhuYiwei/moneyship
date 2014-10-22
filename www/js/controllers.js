angular.module('starter.controllers', [])

//
.controller('AddBillCtrl', function($scope, $ionicModal, $timeout, $stateParams) {

  $scope.addbilldata = {};

  $ionicModal.fromTemplateUrl('templates/onetoone.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.close = function() {
    $scope.modal.hide();
  };


  $scope.doadd = function() {    
    console.log('Doing add', $scope.addbilldata);
    $timeout(function() {$scope.close();}, 1000);
  };

})


.controller('ChooseFriendCtrl', function($scope, $ionicModal, $timeout, $stateParams, AllFriends, DB) {

  $scope.addData = {};
 
  $ionicModal.fromTemplateUrl('templates/addnewfriend.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.close = function() {
    $scope.modal.hide();
  };
  
  $scope.name=$scope.friendname;
  console.log($scope.friendname)


  // $scope.searchfriend = document.getElementById.("inputfriendname");
  $scope.newfriend = AllFriends.newFriend;

  $scope.addfriend = function() {
    // $scope.newfriend.name = $scope.searchfriend;
    $scope.newFriendName=document.getElementById('inputfriendname').value;
    $scope.modal.show();
  };

  $scope.doadd = function() {    
    console.log('Doing add', $scope.newfriend);
    var tmpName = document.getElementById("newfriendname").value;
    var tmpEmail = document.getElementById("newfriendemail").value;
    AllFriends.add({ name: tmpName, email: tmpEmail }, function() {
      AllFriends.all(function(r) {$scope.allfriends = r});
      $scope.modal.hide();
    });
    

    // $timeout(function() {$scope.close();}, 1000);
  };

  $scope.allfriend = AllFriends.get($stateParams.allfriendsId);
  AllFriends.all(function(r) {$scope.allfriends = r});


})




.controller('HomeCtrl', function($scope,$stateParams,FriendsIOwe,FriendsOweMe) {
  $scope.friendsiowe = [
    { id: 0, name: 'Jack', money:30 },
    { id: 1, name: 'Joe', money:55 },
    { id: 2, name: 'Adam', money:9 },
    { id: 3, name: 'Betty',money:31 }
  ];
  $scope.friendiowe = FriendsIOwe.get($stateParams.friendsioweId);
  $scope.friendsoweme = FriendsOweMe.all();
  $scope.friendoweme = FriendsOweMe.get($stateParams.friendsowemeId);
})
//end

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
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

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
});
