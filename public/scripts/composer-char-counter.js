$( document ).ready(function() {
    console.log( "ready!" );
    $('textarea').keyup(updateCount);
    $('textarea').keydown(updateCount);
    
    function updateCount() {
        console.log("updateCount");
        var cs = $(this).val().length;
        $('#counter').text(140 - cs);
        if (cs > 140){
            console.log(document.getElementById("counter").style.color);
            document.getElementById("counter").style.color = "red";
        }
        else {
            document.getElementById("counter").style.color = "#244751";
        }

    }
});
