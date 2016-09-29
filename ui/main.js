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
var counter;
var btnSubmit=document.getElementById("btnSubmit");
btnSubmit.onclick=function(){
    //get the comments
    console.log("clicked submit button");
    var request= new XMLHttpRequest();
    request.onReadyState=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            console.log("yeah1!");
            if (request.status===200){
                console.log("yeah!");
                counter=request.status;
                console.log(counter);
            }
        }
    }
    //make request 
    request.open('GET',"http://udnan.imad.hasura-app.io/comments",true);
    request.send(null);
}
