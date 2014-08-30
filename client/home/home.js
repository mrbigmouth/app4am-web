Template.home.helpers(
  {"list" :
      function() {
        var result = [];
        DB.topic.find().forEach(function(doc) {
          var data =
              {"topic"     : doc._id
              ,"topicName" : doc.name
              }
            , news =
                DB.news.findOne(
                  {"topicId" : doc._id}
                , {"sort"    :
                      {"updateTime" : -1
                      }
                  }
                )
            ;

          data.text = news.title;

          result.push(data);
        });
        return result;
      }
  }
)