Template.home.helpers(
  {"list" :
      function() {
        return DB.topic.find();
      }
  }
)