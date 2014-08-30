Router.map(function() {
  //首頁
  this.route(
    "home"
  , {"path"   : '/'
    ,"waitOn" :
        function() {
          return Meteor.subscribe("topic");
        }
    }
  );
});