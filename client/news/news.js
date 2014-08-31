var padding =
    function(i) {
      if (i < 10) {
        return "0" + i;
      }
      else {
        return i + "";
      }
    };

Template.news.helpers(
  {"showTime" :
      function(date) {
        return date ? 
                  date.getFullYear() + 
                  "/" + 
                  padding(date.getMonth() + 1) + 
                  "/" + 
                  padding(date.getDate()) + 
                  " " + 
                  padding(date.getHours()) + 
                  ":" + 
                  padding(date.getMinutes())
               : 
                  "";
      }
  ,"showScoreClass" :
      function(comments) {
        var result = "progress-bar ";
        switch (comments ? comments.length : 0) {
        default :
          result += "progress-bar-success";
          break;
        case 0 :
          result += "progress-bar-success";
          break;
        case 1 :
          result += "progress-bar-info";
          break;
        case 2 :
          result += "progress-bar-warning";
          break;
        case 3 :
          result += "progress-bar-danger";
          break;
        case 4 :
          result += "progress-bar-danger";
          break;
        }
        return result;
      }
  ,"showScoreStyle" :
      function(comments) {
        return "width:"  + (100 - (comments ? comments.length : 0) * 25) + "%";
      }
  ,"showScore" :
      function(comments) {
        return (100 - (comments ? comments.length : 0) * 25 ) + "%";
      }
  ,"showClass" :
      function(comments, button) {
        if (_.indexOf(comments, button) === -1) {
          return "btn col-xs-12 text-center";
        }
        else {
          return "btn col-xs-12 text-center btn-danger";
        }
      }
  }
);

Template.news.events(
  {"click button.showComment" :
      function(e) {
        $(e.currentTarget).closest("div").find("div.comment").toggle();
      }
  ,"click div.comment button" :
      function(e, ins) {
        var $this    = $(e.currentTarget)
          , $comment = $this.closest("div.comment")
          , result   = []
          , id       = ins.data._id
          ;

        $this.toggleClass("btn-danger");
        $comment.find("button.btn-danger").each(function() {
          result.push( $(this).attr("data-comment") );
        });

        DB.news.update(id, {$set : {"comment" : result} } );
      }
  }
);