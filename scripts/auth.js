//listen for auth status changes
auth.onAuthStateChanged((user) => {
    if (user) {
        //get data
        firestoreDB.collection('guides').onSnapshot((snapshot) => {
            setupGuides(snapshot.docs);
            setupUI(user);
        }).catch((error) => {
            console.log(error.message)
        });
    } else {
        setupGuides([]);
        setupUI();
    }
});

//create a new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    const title = createForm['title'].value;
    const content = createForm['content'].value;

    //call firestore to save the document to the guides collection
    firestoreDB.collection('guides').add({ title: title, content: content })
    .then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    })
    .catch((error) => {
        console.log(error.message);
    });
});

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(response => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

//logout 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (evt) => {
    evt.preventDefault();
    auth.signOut();
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //login the user with these values
    auth.signInWithEmailAndPassword(email, password).then((response) => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});