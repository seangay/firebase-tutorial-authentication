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
    auth.signOut().then(() => {
        console.log('user signed out');
    });
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

        console.log(response.user);
    });
});