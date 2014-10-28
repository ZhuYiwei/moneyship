angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */

//fake data 
 .factory('AllFriends', function(DB) {

  var allfriends = [];
  return {

    all: function(callback) {
      var sql = "SELECT * FROM AllFriendsTable";
      DB.transaction(function(tx) {
        console.log("s: Select all friends from AllFriendsTable");
        tx.executeSql(sql, [], function(tx, result) {
          var r = [];
          for (var i = 0; i < result.rows.length; i++) {
            r.push(result.rows.item(i));
          }
          callback(r);
        });
      });
    },
    //欠我钱的
    allfriendsoweme: function(callback) {
      var sql = "SELECT * FROM AllFriendsTable WHERE money>0";
      DB.transaction(function(tx) {
        console.log("s: Select allfriendsoweme from AllFriendsTable");
        tx.executeSql(sql, [], function(tx, result) {
          var r = [];
          for (var i = 0; i < result.rows.length; i++) {
            r.push(result.rows.item(i));
          }
          callback(r);
        });
      });
    },
    //我欠谁钱
    allfriendsiowe: function(callback) {
      var sql = "SELECT * FROM AllFriendsTable WHERE money<0";
      DB.transaction(function(tx) {
        console.log("s: Select allfriendsiowe from AllFriendsTable");
        tx.executeSql(sql, [], function(tx, result) {
          var r = [];
          for (var i = 0; i < result.rows.length; i++) {
            r.push(result.rows.item(i));
          }
          callback(r);
        });
      });
    },
    get: function(allfriendsId) {
      // Simple index lookup
      return allfriends[allfriendsId];
    },
    add: function(friend, callback){
      var sqlStr = 'INSERT INTO AllFriendsTable (name, email, money) VALUES (?,?,?)';
      DB.transaction(function(tx) {
        console.log(sqlStr,friend.name,friend.email,friend.money);
        tx.executeSql(sqlStr, [friend.name, friend.email, friend.money]);
        callback();
      });
    },
    update: function(bill, callback){
      var sqlStr = 'UPDATE AllFriendsTable SET money=? WHERE name=?';
      var originmoney;
      console.log("Update1:tempmoney(text)=",bill.money);
      DB.transaction(function(tx) {
        tx.executeSql('SELECT * FROM AllFriendsTable WHERE name=?',[bill.name],function(tx, result) {
          originmoney=result.rows.item(0).money;
          console.log("Update2:originmoney=",originmoney);         
          if(bill.type=="owe"){
            console.log("update3:newmoney after owe");
            tx.executeSql(sqlStr, [(originmoney-parseInt(bill.money)), bill.name],function(){
              console.log("update4:originmoney-parseInt(bill.money)=",originmoney-parseInt(bill.money));
              callback();
            });
          }
          else{
            console.log("update3:new money after I'm owed:");
            tx.executeSql(sqlStr, [(originmoney+parseInt(bill.money)),bill.name],function(){
              console.log("update4:originmoney+parseInt(bill.money)=",originmoney+parseInt(bill.money));
              callback();
            });
          }
        });      
      });
    },
    createTable: function() {
      DB.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS AllFriendsTable (id, name NOT NULL UNIQUE, email NOT NULL UNIQUE, money NOT NULL)');
      });
    }
  }
})





 .factory('AllBills', function(DB) {

  return {

    all: function(callback) {
      var sql = "SELECT * FROM AllFriendsTable";
      DB.transaction(function(tx) {
        console.log("s: Select all friends from AllFriendsTable");
        tx.executeSql(sql, [], function(tx, result) {
          var r = [];
          for (var i = 0; i < result.rows.length; i++) {
            r.push(result.rows.item(i));
          }
          callback(r);
        });
      });
    },
   
    get: function(allfriendsId) {
      // Simple index lookup
      return allfriends[allfriendsId];
    },
    add: function(bill, callback){
      var sqlStr = 'INSERT INTO AllBillsTable (name,type,money,description,date) VALUES (?,?,?,?,?)';
      DB.transaction(function(tx) {
        console.log(sqlStr,bill.name,bill.type, bill.money,bill.description,bill.date);
        tx.executeSql(sqlStr, [bill.name, bill.type, bill.money, bill.description, bill.date]);
        callback();
      });
    },
    createTable: function() {
      DB.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS AllBillsTable (name NOT NULL, type NOT NULL, money NOT NULL, description,image, date)');
      });
    }
  }
})


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


.factory('DB', function() {
  var DB=openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
  return DB;
});

