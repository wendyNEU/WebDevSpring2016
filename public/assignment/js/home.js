/**
 * Created by wendy on 1/26/16.
 */


$( document ).ready( function() {
    var newWindow;

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
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
        alert(target);
    });

    $("#new_field").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        console.log("new field");
        /*
         var label = $('#label').val();//document.getElementById("label").nodeValue;
         var placeholder = $('#placeholder').val();//document.getElementById("placeholder").nodeValue;
         var tooltip = $('#tooltip').val();//document.getElementById("tooltip").nodeValue;


         var type = $( "#type option:selected" ).text();
         var options = $("textarea#options").val().split("\n");
         var existfields = document.getElementById("exist_fields");

         var section = document.createElement("div");
         section.setAttribute("class","form-group row");

         var buttonpencil = document.createElement("button");
         buttonpencil.setAttribute("class","btn btn-primary glyphicon glyphicon-pencil");
         var buttonplus = document.createElement("button");
         buttonplus.setAttribute("class","btn btn-primary glyphicon glyphicon-plus");
         var buttonremove = document.createElement("button");
         buttonremove.setAttribute("class","btn btn-primary glyphicon glyphicon-remove");
         var buttonalignjustify = document.createElement("button");
         buttonalignjustify.setAttribute("class","btn btn-primary glyphicon glyphicon-align-justify");
         var buttongroup = document.createElement("div");
         buttongroup.setAttribute("class","col-sm-6 col-md-6");
         buttongroup.appendChild(buttonpencil);
         buttongroup.appendChild(buttonplus);
         buttongroup.appendChild(buttonremove);
         buttongroup.appendChild(buttonalignjustify);

         var field = document.createElement("div");
         field.setAttribute("class","col-sm-6 col-md-6");
         var labele = document.createElement("label");
         labele.setAttribute("class","form-control-label");
         labele.setAttribute("for",""+label);
         labele.createTextNode(""+label);
         field.appendChild(label);


         if(type==='Single Line Text Field'){
         var input = document.createElement("input");
         input.setAttribute("type","text");
         input.setAttribute("class","form-control");
         input.setAttribute("id",""+label);
         input.setAttribute("placeholder",placeholder+"");

         field.appendChild(input);

         section.appendChild(field);
         section.appendChild(buttongroup);

         }else if(type==='Date Field'){

         }else if(type==='Dropdown Field'){

         }else if(type==='Checkboxes Field'){

         }else if(type==='Radio Buttons Field'){

         }
         existfields.appendChild(section);
         */
         newWindow.close();
    });
    $("#add_fields").click(function (e) {
        newWindow = window.open('./form-fields.html', "Fields Setting", "width=350,height=250");

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    });
});