DB.topic.allow(
  {'insert' :
      function(userId, doc) {
        return false;
      }
  ,'update' :
      function(userId, doc) {
        return false;
      }
  ,'remove' :
      function() {
        return false;
      }
  }
);


Meteor.publish('topic', function() {
  return DB.topic.find();
});