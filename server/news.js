Meteor.publish('news', function() {
  return DB.news.find({},{'limit' : 50});
});