var fnWhenRender =
    _.debounce(
      function() {
        $("#topic")
          .find(".nav-tabs li")
            .removeClass("active")
            .first()
              .addClass("active")
              .end()
            .end()
          .find(".tab-content .tab-pane")
            .removeClass("active")
            .first()
              .addClass("active");
        $("window").trigger("resize");
      }
    , 100
    );
Template.topic.helpers(
  {"newspaper" :
      function(topicId) {
        var result         = {}
          , NewsPapersName =
              {"LTN"       : "自由時報"
              ,"Apple"     : "蘋果日報"
              ,"UDN"       : "聯合新聞網"
              ,"ChinaTime" : "中國時報"
              }
          , active
          ;

        DB.news.find({"topicId" : topicId }).forEach(function(doc) {
          result[ doc.newspaper ] = true;
        });

        //重設目前啟動頁籤
        fnWhenRender();
        return _.map(
                _.keys(result)
              , function(paperId) {
                  return {"paperId" : paperId
                         ,"name"    : NewsPapersName[ paperId ]
                         ,"topicId" : topicId
                         };
                }
              )
      }
  ,"news"      :
      function(topicId, paperId) {
        return DB.news.find(
          {"topicId"   : topicId
          ,"newspaper" : paperId
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
);

Template.topic.events(
  {"click a.tabTrigger" :
      function(e) {
        var $this = $(e.currentTarget)
          , id    = $(e.currentTarget).attr("data-id")
          ;

        $this.closest("li").addClass("active").siblings().removeClass("active");
        $("#topic")
          .find(".tab-content .tab-pane")
            .removeClass("active")
            .filter('[data-id="' + id + '"]')
              .addClass("active");
      }
  ,"click div.eachNews" :
      function(e) {
        var newsId = $(e.currentTarget).attr("data-id");
        Router.go("/news/" + newsId);
      }
  }
);
