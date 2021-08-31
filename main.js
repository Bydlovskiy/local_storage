'use strict'  
// regExp
const upForm = document.forms.signUp;
const inForm = document.forms.signIn;

// SIGN UP VALIDATION

const firstNameExp = /^[a-zA-z]{2,}$/
const lastNameExp = /^[a-zA-z]{2,}$/
const emailExp = /^\w+@\w+\.\w+$/;
const passwordExp = /^\w{4,15}$/;


function validation(regExp,elem){
    if(regExp.test(upForm[elem].value)){
        upForm[elem].classList.add('is-valid')
        return true
    } else {
        upForm[elem].classList.add('is-invalid')
    }
}

function runValidation(){
    validation(firstNameExp,'firstName');
    validation(lastNameExp,'lastName');
    validation(emailExp,'email');
    validation(passwordExp,'password');
}

function removeValidClass(elem){
    upForm[elem].classList.remove('is-valid', 'is-invalid')
}

function removeValidClasses(){
    removeValidClass('firstName');
    removeValidClass('lastName');
    removeValidClass('email');
    removeValidClass('password');
}

function checkForm(){
    runValidation();
    if(validation(firstNameExp,'firstName') && validation(lastNameExp,'lastName') && validation(emailExp,'email') && validation(passwordExp,'password')){

        return true
    } else {
        return false 
    }
}

// add to storage 
class User {
    constructor(firstName,lastName,email,password){
        this.name = firstName;
        this.surname = lastName;
        this.email = email;
        this.password = password
    }
}

function createUserObj(name,surname,email,password){
    const userName = upForm[name].value;
    const userSurname = upForm[surname].value;
    const userEmail = upForm[email].value;
    const userPassword = upForm[password].value;
    let us = new User(userName,userSurname,userEmail,userPassword);
    return us;
}

function addToStorage(){
    let key = createUserObj('firstName','lastName','email','password').name;
    localStorage.setItem(key,JSON.stringify(createUserObj('firstName','lastName','email','password')))
}

upForm.addEventListener('submit',function(event){
    event.preventDefault();
    if( checkForm()){
        addToStorage();
        upForm.reset();
        removeValidClasses();
    }
})









