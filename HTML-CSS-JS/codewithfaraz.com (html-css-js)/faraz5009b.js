$(".düðme" ).on("click", function() {
    if ( $("body").hasClass("karanlýk")) {
        $( "body" ).removeClass( "karanlýk" );
        $( ".düðme" ).text( "KARANLIK" );
    }else {$("body").addClass("karanlýk");
        $(".düðme").text("AYDINLIK");}
});