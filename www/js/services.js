angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */

//fake data 
 .factory('AllFriends', function(DB) {

  var allfriends = [
    { id: 0, name: 'Jack', money:30 },
    { id: 1, name: 'Joe', money:55 },
    { id: 2, name: 'Adlam', money:9 },
    { id: 3, name: 'Betty',money:31 }
  ];
  return {
    all: function(callback) {
      var sql = "SELECT * FROM AllFriendsTable";
      DB.transaction(function(tx) {
        console.log("Select all friends from db");
        tx.executeSql(sql, [], function(tx, result) {
          var r = [];
          for (var i = 0; i < result.rows.length; i++) {
            r.push(result.rows.item(i));
          }
          callback(r);
        });
      });
      return allfriends;
    },
    get: function(allfriendsId) {
      // Simple index lookup
      return allfriends[allfriendsId];
    },
    add: function(friend, callback){
      var sqlStr = 'INSERT INTO AllFriendsTable (name, email) VALUES (?,?)';
      DB.transaction(function(tx) {
        console.log(sqlStr)
        console.log(friend.name)
        tx.executeSql(sqlStr, [friend.name, friend.email]);
        callback();
      });
    },
    createTable: function() {
      DB.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS AllFriendsTable (id, name, email, money)');
      });
    }
  }
})

// //real data: already added friends 所有已添加的朋友
// .factory('AllFriends', function(DB) {
//   var allfriends = [];

//   DB.transaction(function createTable(tx) {
//     tx.executeSql('CREATE TABLE IF NOT EXISTS AllFriends (name, email, money)');
//   });

//   function saveRecord() {
//     console.log("Entering saveRecord");
//     DB.transaction(insertRecord);
//     console.log("Leaving saveRecord");
//   }

//   function insertRecord(tx) {
//     console.log("Entering insertRecord");
//     //Create a new date object to hold the date the user entered
//     var tmpName = document.getElementById("editname").value;
//     console.log("Name: " + tmpName);
//     var tmpEmail = document.getElementById("editEmail").value;
//     console.log("Email: " + tmpEmail);
//     var sqlStr = 'INSERT INTO AllFriends (name, email) VALUES (?,?)';
//     console.log(sqlStr);
//     tx.executeSql(sqlStr, [tmpName, tmpEmail]);

//   return {
//     all: function() {
//       return allfriends;
//     },
//     get: function(allfriendsId) {
//       // Simple index lookup
//       return allfriends[allfriendsId];
//     }
//   // }
// })



.factory('FriendsIOwe', function(DB) {
  var friendsiowe = [
    { id: 0, name: 'Jack', money:30 },
    { id: 1, name: 'Joe', money:55 },
    { id: 2, name: 'Helen', money:9 },
    { id: 3, name: 'Betty',money:31 }
  ];
  return {
    all: function() {
      return friendsiowe;
    },
    get: function(friendsioweId) {
      // Simple index lookup
      return friendsiowe[friendsioweId];
    }
  }
})

.factory('FriendsOweMe', function(DB) {
  var friendsoweme = [
    { id: 0, name: 'Stephen', money:60 },
    { id: 1, name: 'Catherine', money:55 }
  ];

  return {
    all: function() {
      return friendsoweme;
    },
    get: function(friendsowemeId) {
      // Simple index lookup
      return friendsoweme[friendsowemeId];
    }
  }
})

// .factory('FriendsOweMe', function(DB) {
//   var friendsoweme = [
//     { id: 0, name: 'Stephen', money:60 },
//     { id: 1, name: 'Catherine', money:55 }
//   ];

//   var msg;
//     DB.transaction(function (tx) {
//       tx.executeSql('CREATE TABLE IF NOT EXISTS FriendsOweMe (id unique, name, money)');
//       tx.executeSql('INSERT INTO FriendsOweMe (id, name, money) VALUES (1,"Stephen2",60)');
//       tx.executeSql('INSERT INTO FriendsOweMe (id, name, money) VALUES (2,"Catherine2",55)');
//       msg = '<p>Log message created and row inserted.</p>';
//       document.querySelector('#status').innerHTML =  msg;
//     });

//     DB.transaction(function (tx) {
//       tx.executeSql('SELECT * FROM FriendsOweMe', [], function (tx, results) {
//        var len = results.rows.length, i;
//        msg = "<p>Found rows: " + len + "</p>";
//        document.querySelector('#status').innerHTML +=  msg;
//        for (i = 0; i < len; i++){
//          msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
//          document.querySelector('#status').innerHTML +=  msg;
//        }
//      }, null);
//     });

//   return {
//     all: function() {
//       return friendsoweme;
//     },
//     get: function(friendsowemeId) {
//       // Simple index lookup
//       return friendsoweme[friendsowemeId];
//     }
//   }
// })


.factory('DB', function() {
  var DB=openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
  return DB;
});

