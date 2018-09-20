$('#search').click(function(){
    var region = $('#region').val()
    var username = $("#name").val()
    if(username.length < 3)
        return $("#name").addClass('is-invalid')
    username = encodeURIComponent(username)
    //$.redirect('/search', {'region': region, 'username': username});
    window.location.href = "/search/"+region+"/"+username;
});
$("#name").keyup(function(event) {
    if (event.keyCode === 13)
        $("#search").click();
});