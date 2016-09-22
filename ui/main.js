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