var topicNews = [];
Template.home.helpers(
  {"topic" :
      function() {
        var result = [];
        DB.topic.find().forEach(function(doc) {
          var data =
              {"topic"     : doc._id._str
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

          if (news) {
            topicNews.push(news._id);
            data.text = news.title;
            result.push(data);
          }
        });
        topicNews = _.compact(topicNews);
        return result;
      }
  ,"news" :
      function() {
          return DB.news.find(
            {"_id" :
                {"$nin" : topicNews}
            }
          , {"sort"    :
                {"updateTime" : -1
                }
            }
          )
      }
  ,"showScoreClass" :
      function(comments) {
        var result = "score ";
        switch (comments ? comments.length : 0) {
        default :
          result += "bg-success";
          break;
        case 0 :
          result += "bg-success";
          break;
        case 1 :
          result += "bg-info";
          break;
        case 2 :
          result += "bg-warning";
          break;
        case 3 :
          result += "bg-danger";
          break;
        case 4 :
          result += "bg-danger";
          break;
        }
        return result;
      }
  ,"showScore" :
      function(comments) {
        return (100 - (comments ? comments.length : 0) * 25 ) + "%";
      }
  }
)

Template.home.events(
  {"click div.eachTopic" :
      function(e) {
        var topicId = $(e.currentTarget).attr("data-topic");
        Router.go("/topic/" + topicId);
      }
  ,"click div.eachNews" :
      function(e) {
        var newsId = $(e.currentTarget).attr("data-news");
        Router.go("/news/" + newsId);
      }
  }
)