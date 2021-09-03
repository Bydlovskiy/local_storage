'use strict'
// access

const upForm = document.forms.signUp;
const inForm = document.forms.signIn;

// SIGN UP  
// regExp

const firstNameExp = /^[a-zA-z]{2,}$/
const lastNameExp = /^[a-zA-z]{2,}$/
const emailExp = /^\w+@\w+\.\w+$/;
const passwordExp = /^\w{4,15}$/;

// SIGN UP VALIDATION

function validation(regExp, elem) {
    if (regExp.test(upForm[elem].value)) {
        upForm[elem].classList.add('is-valid')
        return true
    } else {
        upForm[elem].classList.add('is-invalid')
    }
}

function runValidation() {
    validation(firstNameExp, 'firstName');
    validation(lastNameExp, 'lastName');
    validation(emailExp, 'email');
    validation(passwordExp, 'password');
}

// Form valid style

function removeValidClass(elem) {
    upForm[elem].classList.remove('is-valid', 'is-invalid')
}

function resetSignUpForm() {
    upForm.reset();
    removeValidClass('firstName');
    removeValidClass('lastName');
    removeValidClass('email');
    removeValidClass('password');
}

// check form correctness

function checkForm() {
    runValidation();
    if (validation(firstNameExp, 'firstName') && validation(lastNameExp, 'lastName') && validation(emailExp, 'email') && validation(passwordExp, 'password')) {
        return true
    } else {
        return false
    }
}

function checkNoRepeat() {
    if (localStorage.length == 0) {
        return true
    } else if (localStorage.length > 0 && !localStorage.getItem(upForm.email.value)) {
        return true;
    } else {
        // return message for repeat
        return false;
    }
}

// add to storage 

class User {
    constructor(firstName, lastName, email, password) {
        this.name = firstName;
        this.surname = lastName;
        this.email = email;
        this.password = password
    }
}

function createUserObj(name, surname, email, password) {
    const userName = upForm[name].value;
    const userSurname = upForm[surname].value;
    const userEmail = upForm[email].value;
    const userPassword = upForm[password].value;
    let us = new User(userName, userSurname, userEmail, userPassword);
    return us;
}

function addToStorage() {
    const key = createUserObj('firstName', 'lastName', 'email', 'password').email;
    localStorage.setItem(key, JSON.stringify(createUserObj('firstName', 'lastName', 'email', 'password')))
}

// SIGN IN

function bust() {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == inForm.email.value) {
            return localStorage.key(i);
        }
    }
    return false
}

function getUserObj() {
    if (!bust()) {} else {
        const User = JSON.parse(localStorage.getItem(bust()));
        return User;
    }
}


function checkPassword() {
    if (getUserObj().password == inForm.password.value) {
        return true
    } else {
        return false
        // message wrong password
    }
}

function showUserProfile() {
    if (localStorage.length == 0) {
        return 'local storage is empty';
    } else if (bust() == false) {
        return 'wrong email';
    } else if (checkPassword() == false) {
        return 'wrong password';
    } else if (checkPassword()) {
        setInfo(getUserName(), getUserEmail())
        document.querySelector('.profile').style.display = 'flex';
        document.querySelector('.signInBlock').style.display = 'none';
        inForm.reset();
    }
}

function errorMessage() {
    if(showUserProfile() != undefined){
        console.log(showUserProfile());
    }
}




// user list


function getUserName() {
    return getUserObj().name + ' ' + getUserObj().surname
}


function getUserEmail() {
    return getUserObj().email
}

function setInfo(name, email) {
    document.querySelector('.userName').textContent = name;
    document.querySelector('.userEmail').textContent = email;
}




// buttons

document.querySelector('.goToSignIn').addEventListener('click', () => {
    document.querySelector('.signUpBlock').style.display = 'none';
    document.querySelector('.signInBlock').style.display = 'block';
})

document.querySelector('.goToSignUp').addEventListener('click', () => {
    document.querySelector('.signUpBlock').style.display = 'block';
    document.querySelector('.signInBlock').style.display = 'none';
})

upForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (checkForm() && checkNoRepeat()) {
        addToStorage();
        resetSignUpForm();
    }
})

inForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // showUserProfile();
    errorMessage()
})

document.querySelector('.signOut').addEventListener('click', () => {
    document.querySelector('.profile').style.display = 'none';
    document.querySelector('.signInBlock').style.display = 'block';
})