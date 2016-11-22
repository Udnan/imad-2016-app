location.reload(true);
console.log('Loaded!');
var counter;
var btnSubmit=document.getElementById("btnSubmit");
/*btnSubmit.onclick=function(){
    //get the comments
    console.log("clicked submit button");
   
    var request= new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState === XMLHttpRequest.DONE){
        
            if (request.status===200){
                var comments=JSON.parse(request.responseText);
                var list='';
                for(var i=0;i<comments.length;i++){
                    
                    list='<div class="divComment">'+comments[i]+'</div>'+list;
                    console.log(i);
                    
                }
                var divComments=document.getElementById("divComments");
                divComments.innerHTML=list;
                
            }
        }
    };
    //make request 
    
    request.open('GET',"http://udnan.imad.hasura-app.io/comments/"+comment_box.value,true);
    request.send(null);
};*/


// Next article comming soon 
var span=document.getElementById('text-span');
var dailog=["Comming Soon...","Waiting For the next article???","I'm working on it ;)"];
var st="Comming Soon...";
var count=0;
var flag=0;
var no=0;//0 means unfilled or filling 1 means clearing 

function Type() {
		st=dailog[no];
		if (flag===0){
			span.innerHTML = span.innerHTML+st[count];
    		count+=1;
		}else{
			var s= span.innerHTML;
			span.innerHTML=s.slice(0,s.length-1);
			count=count-1;
			if (count ===0){
				flag=0;
				no=no+1;
				if (no===3){
					no=0;
				}
			}
		}
    	
    	if (count===st.length){
    		flag=1;
    	}

}


var myVar = setInterval(function(){Type(no);}, 200,no);


// new comment display system
//changed btnSubmit.onClick to window.onload
window.onload=function(){
    //get the comments
    console.log("loaded submit button");
   
    var request= new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState === XMLHttpRequest.DONE){
        
            if (request.status===200){
                var comments=request.responseText;
                comments=JSON.parse(comments);
                console.log(comments);
                var list='';
                for(var i=0;i<comments.length;i++){
                    
                    list='<div class="divComment"><p>'+'<b>'+comments[i].username+'</b>'+'</p><p>'+comments[i].comment+'</p></div>'+list;
                    console.log(i);
                    
                }
                var divComments=document.getElementById("divComments");
                divComments.innerHTML=list;
                
            }
        }
    };
    //make request 
    
    request.open('GET',"http://udnan.imad.hasura-app.io/comment",true);
    request.send(null);
    Loggedin();
    
};



//new comment add system
btnSubmit.onclick=function(){

	var request= new XMLHttpRequest();

	request.onreadystatechange = function(){
		if (request.readyState=== XMLHttpRequest.DONE){
				if (request.status===200){
					//succesfully commented
					console.log('user succesfully commented');
					alert('Commented  succesfully');

				}else if (request.status===403){
					alert('Forbidden');
				}else if (request.status===500){
					alert('Something went wrong ');
					alert(request.responseText);
				}
		}
	};

	var comment=document.getElementById('comment_box').value;
	console.log(comment);
	request.open('POST','http://udnan.imad.hasura-app.io/comment',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({'comment':comment}));
};



//logged in then
function Loggedin(){

	var request= new XMLHttpRequest();

	request.onreadystatechange = function(){
		if (request.readyState=== XMLHttpRequest.DONE){
				if (request.status===200){
					console.log('Found something');
					var result=request.responseText;
					if (result!='You are not logged in! '){
					console.log(result.slice(17));
					alert("Welcome "+result.slice(17));
					
					}else{
					    console.log("Not logged in!");
					}

				}else if (request.status===403){
					console('Forbidden user request');
				}else if (request.status===500){
					console.log('Something went wrong regarding user ');
					console.log(request.responseText);
				}
		}
	};

	//var comment=document.getElementById('password').value;
	//console.log(comment);
	request.open('GET','http://udnan.imad.hasura-app.io/check-login',true);
	request.send(null);
}