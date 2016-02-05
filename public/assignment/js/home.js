/**
 * Created by wendy on 1/26/16.
 */


$(document).ready(function () {
    var newWindow;

    //navigate sidebar highline and activate each sidebar when click
    $('.nav-sidebar li a').click(function (e) {

        $('.nav-sidebar li').removeClass('active');

        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        e.preventDefault();
    });

    $("#form_maker").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./welcome.html");
    });

    //load subpage when click each navigation link on the top
    $("#nav_register").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./register.html");
    });
    $("#nav_login").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./login.html");
    });
    $("#nav_profile").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./profile.html");
    });
    $("#nav_logout").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./logout.html");
    });

    //load subpage when click each navigation side link on the left
    $("#navside_home").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./welcome.html");
    });
    $("#navside_profile").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./profile.html");
    });
    $("#navside_admin").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./admin.html");
    });

    $("#navside_forms").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#subpage").load("./forms.html");
    });

    //activate each tab when click tab
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#tagfields').load('./form-fields.html');
        var target = $(e.target).attr("href") // activated tab
    });

    //load form_fields.html when activate second tab
    $("table#forms_list tbody tr td a").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#tagfields').load('./form-fields.html');

        if ($('#tagforms').hasClass("active")) {
            $('#tagforms').removeClass("active");
            $('#tagforms').removeClass("in");
            $('#tagfields').addClass("active");
            $('#tagfields').addClass("in");
            $('#forms').removeClass("active");
            $('#fields').addClass("active");

        } else if ($('#tagfields').hasClass("active")) {
            $('#tagfields').removeClass("active");
            $('#tagfields').removeClass("in");
            $('#tagforms').addClass("active");
            $('#tagforms').addClass("in");
            $('#fields').removeClass("active");
            $('#forms').addClass("active");
        }
        e.preventDefault();
        e.stopPropagation();
    });

    //when click add_fields button popup field setting window
    $("#add_fields").click(function (e) {
        newWindow = window.open('./field_setting.html', "Fields Setting", "width=350,height=250");
        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    });
    //when finish field setting and submit close popup window
    $("#new_field").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        newWindow.close();
    });

});