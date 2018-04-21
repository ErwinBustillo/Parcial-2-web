import * as firebase  from 'firebase';

var config = {
    apiKey: "AIzaSyDUJie0vcCvCCvAlHtnXrWF0GwLz7qlZtA",
    authDomain: "usermanager-5e6e5.firebaseapp.com",
    databaseURL: "https://usermanager-5e6e5.firebaseio.com",
    projectId: "usermanager-5e6e5",
    storageBucket: "usermanager-5e6e5.appspot.com",
    messagingSenderId: "206084534078"
  };
firebase.initializeApp(config);


export function logIn(user){
    return firebase.auth().signInWithEmailAndPassword(user.email,user.password) 
}

export function SignUp(user){
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
}

export function logOut(){
    return firebase.auth().signOut()
}

export function deleteUser(userId){
    firebase.database().ref('/users/').child(userId).remove()
}

export function loadUsers(){
    return firebase.database().ref('/users')
}

export function getUserById(user){
    return firebase.database().ref('/users/'+user.uid)
}

//para guardarlo en firebase database
export function saveUser(user){
    return firebase.database().ref('/users/'+user.id).set({
        name: user.name,
        email: user.email, 
        password: user.password,
        role: user.role,
        created_at: user.created_at,
        last_time_logged: user.last_time_logged
    })
}

export let isAuthenticated = new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user)=> {
      resolve(user)
      })
  });


