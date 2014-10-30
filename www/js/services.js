angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */

//fake data 
 .factory('AllFriends', function(DB) {

  var allfriends = [];
  var VFriendsOweMe = [];
  var VFriendsIOwe = [];
  var friendOwe;
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
    },//AllFriends.all()
    setOwe: function(o){
      friendOwe = o;
    },
    getOwe: function(){
      return friendOwe;
    },//AllFriends.getOwe()
    //欠我钱的
    allfriendsoweme: function(callback) {
      var sql = "SELECT * FROM AllFriendsTable WHERE money>0";
      DB.transaction(function(tx) {
        console.log("Home: Select allfriendsoweme from AllFriendsTable");
        tx.executeSql(sql, [], function(tx, result) {
          var r = [];
          for (var i = 0; i < result.rows.length; i++) {
            r.push(result.rows.item(i));
            VFriendsOweMe.push(result.rows.item(i));
            r[i].id=i;
            VFriendsOweMe[i].id = i;//为啥赋值失败？
            r[i].name = "Yiwei";
            //console.log("r[i].id:",r[i].id);
            //console.log("VFriendsOweMe.id:",VFriendsOweMe[i].id);
            //console.log("VFriendsOweMe.name:",VFriendsOweMe[i].name);
          }
          callback(r);
        });
      });
    },
    //我欠谁钱
    allfriendsiowe: function(callback) {
      var sql = "SELECT * FROM AllFriendsTable WHERE money<0";
      DB.transaction(function(tx) {
        console.log("Home: Select allfriendsiowe from AllFriendsTable");
        tx.executeSql(sql, [], function(tx, result) {
          var r = [];
          for (var i = 0; i < result.rows.length; i++) {
            r.push(result.rows.item(i));
            VFriendsIOwe.push(result.rows.item(i));

          }
          callback(r);
        });
      });
    },
    get: function(allfriendsId) {
      // Simple index lookup
      return allfriends[allfriendsId];
    },
    getfriendsoweme: function(friendsowemeId) {
      return VFriendsOweMe[friendsowemeId];
    },
    getfriendsiowe: function(friendsioweId) {
      return VFriendsIOwe[friendsioweId];
    },
    add: function(friend, callback){
      var sqlStr = 'INSERT INTO AllFriendsTable (id,name, email, money) VALUES (?,?,?,?)';
      DB.transaction(function(tx) {
        console.log(sqlStr,friend.id,friend.name,friend.email,friend.money);
        tx.executeSql(sqlStr, [riend.id,friend.name, friend.email, friend.money]);
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
    reset: function(resetname,callback){
      var sqlStr = 'UPDATE AllFriendsTable SET money=0 WHERE name=?';
      DB.transaction(function(tx){
        tx.executeSql(sqlStr,[resetname],function(){
          console.log("Settle2:set money=0 succeed");
          callback();
        });
        
      });
    },//AllFriends.reset()
    select: function(selectname,callback){
      var sql='SELECT * FROM AllFriendsTable WHERE name=?';
      DB.transaction(function(tx) {
        console.log("");
        tx.executeSql(sql, [selectname], function(tx, result) {
          var r = [];
          r.push(result.rows.item(0));
          callback(r);
        });
      }); 
    },//AllFriends.select();
    createTable: function() {
      DB.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS AllFriendsTable (id, name NOT NULL UNIQUE,image, email NOT NULL UNIQUE, money NOT NULL)');
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
    select: function(selectname,callback){
      var sql = "SELECT * FROM AllBillsTable WHERE name=?";
      DB.transaction(function(tx){
        tx.executeSql(sql,[selectname],function(tx,result){
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
    deleterecord:function(deletename,callback){
      var sqlStr = 'DELETE FROM AllBillsTable WHERE name=?'
      DB.transaction(function(tx){
        tx.executeSql(sqlStr,[deletename],function(){
          console.log("delete succeed");
        }); 
        callback();
      });
      
    },
    createTable: function() {
      DB.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS AllBillsTable (name NOT NULL, type NOT NULL, money NOT NULL, description NOT NULL,image, date)');
      });
    }
  }
})
//take a picture
.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])
// .factory('Camera', ['$q', function($q) {

//   return {
//     getVideo: function(options) {
//       var q = $q.defer();
//       navigator.device.capture.captureVideo(function(result) {
//         q.resolve(result);
//         }, function(err) {q.reject(err);}, options);
//         return q.promise;
//         }
//                     }
//                   }])        

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

