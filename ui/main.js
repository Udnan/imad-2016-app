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
    request.onreadystatechange=function(){
        if(request.readyState === XMLHttpRequest.DONE){
        
            if (request.status===200){
                var comments=JSON.parse(request.responseText);
                var list='';
                for(var i=0;i<comments.length;i++){
                    
                    list='<li>'+comments[i]+'</li>';
                    console.log(i);
                    
                }
                var divComments=document.getElementById("divComments");
                divComments.innerHTML=list;
                
            }
        }
    }
    //make request 
    
    request.open('GET',"http://udnan.imad.hasura-app.io/comments/"+comment_box.value,true);
    request.send(null);
}
