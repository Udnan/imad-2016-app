console.log('Loaded!');
var comment_button=document.getElementById("comment_button");
comment_button.onclick=function(){
    comment_button.innerHTML="-";
    var comment_box=document.getElementById("comment_box");
    comment_box.style.visibility="hidden";
}