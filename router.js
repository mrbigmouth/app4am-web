Router.map(function() {
  //首頁
  this.route(
    "home"
  , {"path"   : '/'
    ,"waitOn" :
        function() {
          return [
            Meteor.subscribe("topic")
          , Meteor.subscribe("news")
          ]
        }
    }
  );

  //議題新聞列表
  this.route(
    "topic"
  , {"path"   : '/topic/:_id'
    ,"waitOn" :
        function() {
          return [ Meteor.subscribe("topic")
                 , Meteor.subscribe("news")
                 ]
        }
    ,"data"   :
        function() {
          return DB.topic.findOne( new Meteor.Collection.ObjectID(this.params._id) );
        }
    }
  );

  //新聞頁面
  this.route(
    "news"
  , {"path"   : '/news/:_id'
    ,"waitOn" :
        function() {
          return [
            Meteor.subscribe("topic")
          , Meteor.subscribe("news")
          ]
        }
    ,"data"   :
        function() {
          return DB.news.findOne( new Meteor.Collection.ObjectID(this.params._id) );
        }
    }
  );
});