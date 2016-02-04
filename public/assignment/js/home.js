/**
 * Created by wendy on 1/26/16.
 */


$( document ).ready( function() {
    var newWindow;
    //click link nav to fields

    //use for navigate nav-side link
    /*
    $('.nav li a').click(function(e) {

        $('.nav li').removeClass('active');

        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        e.preventDefault();
    });
    */

    $("#register_form").click(function (e){
        $('.nav-tabs a[href="#tagfileds"]').tab('show');
    });
    $("#contact_list").click(function (e){
        $('.nav-tabs a[href="#tagfileds"]').tab('show');
    });
    $("#todo_list").click(function (e){
        $('.nav-tabs a[href="#tagfileds"]').tab('show');
    });

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
        $("#subpage").load("./welcome.html");
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
    /*
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
    */

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
       // alert(target);
    });

    $("#new_field").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        console.log("new field");
         newWindow.close();
    });
    $("#add_fields").click(function (e) {
        newWindow = window.open('./field_setting.html', "Fields Setting", "width=350,height=250");

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    });

});