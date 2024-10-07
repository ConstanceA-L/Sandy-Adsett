// this file handles the submission modal and the contact form validation

const form = document.getElementById('contactForm');
const modal = document.getElementById('submit-modal');
const failed_info = document.getElementById('failed-requirements');

// this closes the modal when the user clickside out of it
window.addEventListener('click', (event) => {
    if (event.target === modal){
        modal.style.display = 'none';
    }
});

const formInputs = document.querySelectorAll('.form-input, .form-textarea');

// this loops through all the form inputs and makes it so that they are normal before auser interacts with them. 
// after a user interacts with and input box, and they do not write in it, the box outline turns red and the label is updated 
formInputs.forEach(input => {
    if(input.type === "email"){
        input.addEventListener('blur', validateEmailInput);
    }
    else{
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
              this.classList.add('empty-requirement');
              updateLabels(input);

            } else {
              this.classList.remove('empty-requirement');
              resetLabels(input);
            }
          });
    }
});


// this function validates the email input
function validateEmailInput() {
    const value = this.value.trim();

    if (value === '' || !isValidEmail(value)) {
        this.classList.add('empty-requirement');
        if(value === ''){
            document.getElementById('emailaddress-label').innerHTML = "Email Address: This one should probably be real"
        }
        else{
            document.getElementById('emailaddress-label').innerHTML = "Email Address: We need a valid address please!"
        }

    } else {
        this.classList.remove('empty-requirement');
        document.getElementById('emailaddress-label').innerHTML = "Email Address:"
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    
  }

// this function updates the input labels when they fail validation
function updateLabels(input){
    if(input.id === 'firstname'){
        document.getElementById('firstname-label').innerHTML = "First name: It might be a fake but we need one!"
    }
    else if(input.id === 'lastname'){
        document.getElementById('lastname-label').innerHTML = "Last name: Same idea as the first name..."
    }
    else if(input.id === 'emailaddress'){
        document.getElementById('emailaddress-label').innerHTML = "Email Address: This one should probably be real"
    }
    else if(input.id === 'subject'){
        document.getElementById('subject-label').innerHTML = "Subject: Sooo, what do you want to talk about?"
    }
    else if(input.id === 'message'){
        document.getElementById('message-label').innerHTML = "Message: Alright, explain it to us!"
    }
}


// this resets the labels to default 
function resetLabels(input){
    if(input.id === 'firstname'){
        document.getElementById('firstname-label').innerHTML = "First name:"
    }
    else if(input.id === 'lastname'){
        document.getElementById('lastname-label').innerHTML = "Last name:"
    }
    else if(input.id === 'emailaddress'){
        document.getElementById('emailaddress-label').innerHTML = "Email Address:"
    }
    else if(input.id === 'subject'){
        document.getElementById('subject-label').innerHTML = "Subject:"
    }
    else if(input.id === 'message'){
        document.getElementById('message-label').innerHTML = "Message:"
    }
}

// this validates the form
function validateForm() {
  let valid = true;

//   this loops through all the input and changes the styling/labels 
  formInputs.forEach(input => {
    if (input.value.trim() === '') {
        input.classList.add('empty-requirement');
        valid = false;

        updateLabels(input);
    }
    else {
        input.classList.remove('empty-requirement');

        resetLabels(input);
    }

  });
  return valid;
}

// this triggers when the submit button is clicked
// if the form has been successfully filled, the modal is displayed.
// otherwise, the failed into div is displayed
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!validateForm()) {
        failed_info.style.display = "block";
    }
    else{
        modal.style.display = "block";
        failed_info.style.display = "none";
        formInputs.forEach(input => {
            input.value = '';
        });
    }
});


