/**
 * Created by wendy on 4/6/16.
 */
/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('TvSeasonController',TvSeasonController);

    function TvSeasonController($routeParams,TvService,CommentService,UserService){
        console.log("TvSeasonController");

        var vm = this;

        function init(){
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w500';
            vm.profile_size ='/w300'
            vm.currentActiveComment = -1;
            vm.commenttext = '';
            vm.subcommenttext ='';
            vm.$routeParams = $routeParams;
            vm.veriPosterImg = veriPosterImg;
            vm.getCommentSet = getCommentSet;
            vm.addComment = addComment;
            vm.addSubComment = addSubComment;
            vm.deleteComment = deleteComment;
            vm.deleteSubComment = deleteSubComment;
            vm.authPower = authPower;
            vm.activeCommentWell = activeCommentWell;
            vm.isCommentWellActive = isCommentWellActive;
            vm.islogin = islogin;
            vm.loadLike = loadLike;
            vm.like = like;
            vm.unlike = unlike;
            vm.arrayToString = arrayToString;
            vm.genProfilePath = genProfilePath;
            vm.genPosterPath = genPosterPath;
            vm.getSeasonById = getSeasonById;
            vm.roundRate = roundRate;
            vm.getSeasonById($routeParams.id,$routeParams.season_number);
        }

        init();

        function getSeasonById(id,season_number){
            TvService.getTvSeason(id,season_number).then(function(resp) {
                if (resp === undefined) {
                    alert("Item you are trying to search could not be found");
                } else {
                    vm.tv = resp;
                    if(!(vm.tv.poster_path===undefined||vm.tv.poster_path===''))
                        vm.tv.posterurl = vm.image_base_url + vm.poster_size + vm.tv.poster_path;

                    vm.getCommentSet();
                    vm.loadLike();
                }
            });
        }
        function getCommentSet(){
            CommentService.getCommentSet('season',vm.tv.id).then(function(resp) {
                if (resp === undefined) {
                    alert("Item you are trying to search could not be found");
                } else {
                    vm.commentSet = resp.data;
                }
            });
        }

        function addComment(){
            var user = UserService.getCurrentUser();
            var comment =
            {
                "text":vm.commenttext,
                "user_id" :user._id,
                "username":user.username,
                "date":(new Date).toString(),
                "subcomments":[]
            };
            CommentService.createComment('season',vm.tv.id,comment).then(function(resp){
                if (resp === undefined) {
                    alert("Create Comment Fail");
                } else if (resp.length === 0) {
                    alert("Create Comment Fail");
                } else {
                    vm.commenttext ='';
                    vm.commentSet = resp.data;
                }
            });
        }

        function addSubComment(index){
            var user = UserService.getCurrentUser();
            var subcomment =
            {
                "text":vm.subcommenttext,
                "user_id" :user._id,
                "username":user.username,
                "date":(new Date).toString()
            };
            CommentService.createSubComment('season',vm.tv.id,vm.commentSet.comments[index]._id, subcomment).then(function(resp){
                if (resp === undefined) {
                    alert("Create Sub Comment Fail");
                } else if (resp.length === 0) {
                    alert("Create Sub Comment Fail");
                } else {
                    vm.subcommenttext = '';
                    vm.commentSet.comments[index].subcomments = resp.data;
                }
            });
        }

        function deleteComment(comment_id){
            CommentService.deleteComment('season',vm.commentSet.tviso_id,comment_id).then(function(resp){
                if (resp === undefined) {
                    alert("Create Sub Comment Fail");
                } else if (resp.length === 0) {
                    alert("Create Sub Comment Fail");
                } else {
                    vm.subcommenttext = '';
                    vm.commentSet.comments = resp.data;
                }
            });
        }

        function deleteSubComment(comment_id, subcomment_id){
            CommentService.deleteSubComment('season',vm.tv.id,comment_id,subcomment_id).then(function(resp) {
                if (resp === undefined) {
                    alert("Create Sub Comment Fail");
                } else if (resp.length === 0) {
                    alert("Create Sub Comment Fail");
                } else {
                    vm.subcommenttext = '';
                    vm.commentSet.comments=resp.data;
                }
            });
        }

        function authPower(user_id){
            var user = UserService.getCurrentUser();
            return user!=undefined&&user!=null&&(user._id==user_id||user.rules=='admin');
        }

        function activeCommentWell(index){
            if(vm.currentActiveComment==index){
                vm.currentActiveComment = -1;
            }else {
                vm.currentActiveComment = index;
            }
        }

        function isCommentWellActive(index){
            return index == vm.currentActiveComment;
        }

        function islogin(){
            return UserService.islogin();
        }

        function veriPosterImg(imageurl){
            if(imageurl==undefined||imageurl===null){
                return './images/noposter.png';
            }else{
                return imageurl;
            }
        }

        function loadLike(){
            UserService.getProfile().then(function(resp){
                if (resp === undefined) {
                    alert("Get Current User Fail");
                } else if (resp.length === 0) {
                    alert("Get Current User Fail");
                } else {
                    var user = resp.data;
                    vm.likeitem = false;
                    for(var i in user.like){
                        if(user.like[i].tviso_id==vm.tv.id&&user.like[i].type=='season'){
                            vm.likeitem = true;
                            break;
                        }
                    }
                }
            });
        }

        function like(){
            UserService.getProfile().then(function(resp){
                if (resp === undefined) {
                    alert("Get Current User Fail");
                } else if (resp.length === 0) {
                    alert("Get Current User Fail");
                } else {
                    UserService.like('season',vm.tv.id).then(function(resp){
                        if (resp === undefined) {
                            alert("Like Season Fail");
                        } else if (resp.length === 0) {
                            alert("Like Season Fail");
                        } else {
                            vm.likeitem=false;
                            for(var i in resp.data){
                                if(resp.data[i].tviso_id==vm.tv.id&&resp.data[i].type=="season"){
                                    vm.likeitem = true;
                                }
                            }
                        }
                    });
                }
            });
        }

        function unlike(){
            UserService.getProfile().then(function(resp){
                if (resp === undefined) {
                    alert("Get Current User Fail");
                } else if (resp.length === 0) {
                    alert("Get Current User Fail");
                } else {
                    UserService.unlike('season',vm.tv.id).then(function(resp){
                        if (resp === undefined) {
                            alert("UnLike Season Fail");
                        } else if (resp.length === 0) {
                            alert("UnLike Season Fail");
                        } else {
                            vm.likeitem=false;
                            for(var i in resp.data){
                                if(resp.data[i].tviso_id==vm.tv.id&&resp.data[i].type=="season"){
                                    vm.likeitem = true;
                                }
                            }
                        }
                    });
                }
            });
        }
        function genProfilePath(path){
            if(path)    return vm.image_base_url + vm.profile_size + path;
            else return './images/noimage.jpg';
        }

        function genPosterPath(path){
            if(path==null) return './images/noposter.png';
            else return vm.image_base_url + vm.profile_size + path;
        }
        function arrayToString(arr){
            var str = "";
            for(var i in arr){
                str = str+arr[i].name+" | ";
            }
            return str.substring(0,str.length-2);
        }

        function roundRate(rate){
            return (Math.round(rate*10)).toString()+'%';
        }

    }
})();
