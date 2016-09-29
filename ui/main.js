console.log('Loaded!');
var comment_button=document.getElementById("comment_button");
comment_button.onclick=function(){
    var comment_box=document.getElementById("comment_box");
    if (comment_button.innerHTML==="+"){
        comment_button.innerHTML="-"
        comment_box.style.visibility="visible";
    }
    else{
        comment_button.innerHTML="+"
        comment_box.style.visibility="hidden";
    }
    
}

var btnSubmit=document.getElementById("btnSubmit");
btnSubmit.onclick=funtion(){
    //get the comments
    var request= new XMLHttpRequest();
    request.onReadyState=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if (request.status===200){
                var counter=request.responseText;
                console.log(counter)
            }
        }
    }
    //make request 
    request.open('GET',"http://udnan.imad.hasura-app.io/comments");
}
