'use strict'  
// regExp
const upForm = document.forms.signUp;
const inForm = document.forms.signIn;

// SIGN UP VALIDATION

let firstNameExp = /^[a-zA-z]{2,}$/
let lastNameExp = /^[a-zA-z]{2,}$/
let emailExp = /^\w+@\w+\.\w+$/;
let passwordExp = /^\w{4,15}$/;


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

upForm.addEventListener('submit',function(event){
    event.preventDefault();
    if( checkForm()){
        upForm.reset();
        removeValidClasses()

    }
   
})









