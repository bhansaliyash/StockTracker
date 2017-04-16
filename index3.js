var config = {
    apiKey: "AIzaSyBf2xwy7jijze0jFe6sCi2773K6swLSbqI",
    authDomain: "stocktrack-1f00d.firebaseapp.com",
    databaseURL: "https://stocktrack-1f00d.firebaseio.com",
    projectId: "stocktrack-1f00d",
    storageBucket: "stocktrack-1f00d.appspot.com",
    messagingSenderId: "92591988060"
  };

var total=0;

const fb=firebase.initializeApp(config);

var refresh=document.getElementById("refresh");

var stockValue;
var c=0;
  var noOf=0;
  var username=localStorage[0];
  var data;
  var cVal;

/*$(document).ready(function() {
stockPrice();
});*/

var bool=true;;


var quote;






function stockPrice(key,c,company,bprice,quantity){
	

	var urla="http://finance.google.com/finance/info?client=ig&q=BOM:"+key;

	$.ajax({
	url: urla,
	dataType: "jsonp",
	jsonp: "callback",
	jsonpCallback: "quote"
	});



	quote = function(data) {

	var val=data[0].l_fix;
	console.log(val); 

	var plv=(val-bprice)*quantity;
	plv=plv.toFixed(2);


	fb.database().ref('/'+username+'/listobj'+c).set({
        	curp: val,
        	comp: company,
        	bp: bprice,
        	quan: quantity,
        	pl: plv,
        	c:c
        	
        });

	};
}

  

  

  //var noOfval =fb.database().ref('/'+username+'/noOf');
 // var cval =fb.database().ref('/'+username+'cVal');
  	

  
  var data1=firebase.database().ref('/'+username)



    $(document).ready(function() {
      
    	total=0;
      
      


        data1.on("child_added", function(snapshot, prevChildKey) {

        	bool=false;

  			var newPost = snapshot.val();

  			var li1 = document.createElement("LI");  
	 
	 
     	  

        	li1.innerHTML = newPost.comp;
		
			var li2 = document.createElement("LI");  
       
        	li2.innerHTML = newPost.quan;

        	var li3 = document.createElement("LI");  
    
        	li3.innerHTML = newPost.bp;


        	
        
			
			
    			var li4 = document.createElement("LI");  
       
        	li4.innerHTML = newPost.curp;

        	cVal=newPost.c;
        	c=cVal;
        
        	var li5 = document.createElement("LI");  
       
        	li5.innerHTML = newPost.pl;

        	var li6 = document.createElement("LI"); 
       		var button = document.createElement("button");
			button.innerHTML = "d";

		

			setTotal(newPost.pl,newPost.c);


			li6.appendChild(button);

		

			document.getElementById("list").appendChild(li1);
        	document.getElementById("list").appendChild(li2);
        	document.getElementById("list").appendChild(li3);
        	document.getElementById("list").appendChild(li4);
        	document.getElementById("list").appendChild(li5);
        	document.getElementById("list").appendChild(li6);

			
        
        	button.addEventListener ("click", function() {



  				document.getElementById("list").removeChild(li1);
  				document.getElementById("list").removeChild(li2);
  				document.getElementById("list").removeChild(li3);
  				document.getElementById("list").removeChild(li4);
  				document.getElementById("list").removeChild(li5);
  				document.getElementById("list").removeChild(li6);
  				noOf--;

  				stockPrice(newPost.comp,newPost.c,newPost.comp,newPost.bp,newPost.quan);



  				//total-=newPost.pl;
  				//setTotal();
  				/*noOfval.remove();
        		noOfval.push(noOf);*/

        		console.log(cVal);
  			});
  			
        });


		data1.on("child_changed", function(snapshot, prevChildKey) {

        	

  			var newPost = snapshot.val();

  			var li1 = document.createElement("LI");  
	 
	 
     	  

        	li1.innerHTML = newPost.comp;
		
			var li2 = document.createElement("LI");  
       
        	li2.innerHTML = newPost.quan;

        	var li3 = document.createElement("LI");  
    
        	li3.innerHTML = newPost.bp;


        	
        
			
			
    			var li4 = document.createElement("LI");  
       
        	li4.innerHTML = newPost.curp;

        	cVal=newPost.c;
        	c=cVal;
        
        	var li5 = document.createElement("LI");  
       
        	li5.innerHTML = newPost.pl;

        	var li6 = document.createElement("LI"); 
       		var button = document.createElement("button");
			button.innerHTML = "d";

		

			setTotal(newPost.pl,newPost.c);


			li6.appendChild(button);

		

			document.getElementById("list").appendChild(li1);
        	document.getElementById("list").appendChild(li2);
        	document.getElementById("list").appendChild(li3);
        	document.getElementById("list").appendChild(li4);
        	document.getElementById("list").appendChild(li5);
        	document.getElementById("list").appendChild(li6);

			
        
        	button.addEventListener ("click", function() {



  				document.getElementById("list").removeChild(li1);
  				document.getElementById("list").removeChild(li2);
  				document.getElementById("list").removeChild(li3);
  				document.getElementById("list").removeChild(li4);
  				document.getElementById("list").removeChild(li5);
  				document.getElementById("list").removeChild(li6);
  				noOf--;

  				stockPrice(newPost.comp,newPost.c,newPost.comp,newPost.bp,newPost.quan);



  				//total-=newPost.pl;
  				//setTotal();
  				/*noOfval.remove();
        		noOfval.push(noOf);*/

        		console.log(cVal);
  			});
  			


 		

		});

		


        

   	 	});

    
 


function signout(){
	firebase.auth().signOut();

	firebase.auth().onAuthStateChanged(firebaseUser=>{

    if (firebaseUser) {
      window.location = "index3.html";
    }

    else{
    	window.location = "index2.html";
      console.log("Not Logged in");
    }

  });
}

function onadd(){

	
	noOf++;
	c++;
	

	data =fb.database().ref('/'+username+'/listobj'+c);

	const company =document.getElementById("company").value;
	const quantity =document.getElementById("quantity").value;
	const bprice =document.getElementById("bprice").value;

	//total+=bprice*quantity;

	stockPrice(company,c,company,bprice,quantity);

	

}

	

function setTotal(val,ca){

	var myNode = document.getElementById("tpl1");
	
	while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
	}

	total+=parseFloat(val);
	var p =document.createElement("LI");
	p.innerHTML=total;


	document.getElementById("tpl1").appendChild(p);
}







