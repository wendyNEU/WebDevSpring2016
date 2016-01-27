/**
 * Created by wendy on 1/26/16.
 */


$( document ).ready( function() {

    $("#nav_register").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./register.html");
    });
    $("#nav_login").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./login.html");
    });
    $("#nav_profile").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./profile.html");
    });
    $("#nav_logout").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./logout.html");
    });
    $("#navside_home").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./home.html");
    });
    $("#navside_profile").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./profile.html");
    });
    $("#navside_admin").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./admin.html");
    });
    $("#navside_forms").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./forms.html");
    });
    $("#tagforms").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./forms.html");
    });
    $("#tagfields").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./form-fields.html");
    });
});