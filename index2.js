var config = {
    apiKey: "AIzaSyBf2xwy7jijze0jFe6sCi2773K6swLSbqI",
    authDomain: "stocktrack-1f00d.firebaseapp.com",
    databaseURL: "https://stocktrack-1f00d.firebaseio.com",
    projectId: "stocktrack-1f00d",
    storageBucket: "stocktrack-1f00d.appspot.com",
    messagingSenderId: "92591988060"
  };

  firebase.initializeApp(config);


  	const username=document.getElementById('username');
  	const password=document.getElementById('password');
  	const signinbtn=document.getElementById('buttonin');
  	const signupbtn=document.getElementById('buttonup');

    

	function signin(){

		const email=document.getElementById('username').value;
		const password=document.getElementById('password').value;

    localStorage[0]=email;

      

		  firebase.auth().signInWithEmailAndPassword(email+"@good.com",password);

      
}

	function signup(){

		const email=document.getElementById('username').value;
		const password=document.getElementById('password').value;

      localStorage[0]=email;

		  firebase.auth().createUserWithEmailAndPassword(email+"@good.com",password);

	}	
	

  firebase.auth().onAuthStateChanged(firebaseUser=>{

    if (firebaseUser) {
      
      
      
      window.location = "index3.html";

    }

    else{
      console.log("Not Logged in");
    }

  });
  
  