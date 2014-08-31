DB.news.allow(
  {'insert' :
      function(userId, doc) {
        return false;
      }
  ,'update' :
      function(userId, doc) {
        return true;
      }
  ,'remove' :
      function() {
        return false;
      }
  }
);

Meteor.publish("news", function() {
  return DB.news.find(
            {"topicId" :
                {"$ne" : null
                }
            }
          );
});