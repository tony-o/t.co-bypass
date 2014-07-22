(function($){
  $(document).bind('DOMSubtreeModified', function(){
    $("a[data-touched!='true']").each(function(){
      $(this).attr("data-touched", "true");
      if($(this).attr("href").match("//t.co/")){
        $(this).attr("href", $(this).attr("data-expanded-url") != "" ? $(this).attr("data-expanded-url") : $(this).attr("title"));
      }
    });
  });
})(jQuery || $);
