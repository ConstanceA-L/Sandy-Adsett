// this file handles the light/dark mode functionality on the website

const toggleSwitch = document.getElementById('toggle');
const footer = document.getElementById('footer');
const nav = document.getElementById('nav');
const label = document.querySelector('.toggle-label');
const logo = document.getElementById('logo-img');
const hamburger = document.getElementById('hamburger');


// this triggers when a page is loaded and sets it as light or dark mode depending on what is stored in local storage. the website default is lightmode
document.addEventListener('DOMContentLoaded', function() {

  if(JSON.parse(localStorage.getItem('darkmode')) === true) {
    addDarkMode();
    document.getElementById("toggle").checked = true;
  }
  else{
    removeDarkMode();
  }
});

// This checks if a toggle switch exists on the page. if it does, it sets it as light or dark to reflect the var in local storage
if(toggleSwitch){
  toggleSwitch.addEventListener('change', function() {
    localStorage.setItem('darkmode',JSON.stringify(this.checked));
    if (this.checked) {
      addDarkMode();
    } else {
      removeDarkMode();
    }
  });
}


// this function add the darkmode to the website
  function addDarkMode(){
    document.body.classList.add('dark-mode');
    nav.classList.add('dark-mode');
    footer.classList.add('dark-mode');
    logo.src = "assets/logo-light.svg";
    hamburger.classList.add('dark-mode');

    //this statement checks if the user is on the gallery page and handles the galler image overlay 
    if (document.getElementById('gallery-background')){
      document.getElementById('gallery-background').classList.add('gallery-darkmode')
      document.getElementById('gallery-text').classList.add('gallery-text-darkmode')
    }

    //this statement checks if the user is on the contact page and adds darkmode to the form if they are
    if (document.getElementById('contactForm')){
      document.getElementById('contactForm').classList.add('dark-mode')
    }

    // this statement checks if the submit modal exists on the page and adds dark mode if it does
    if (document.getElementById('submit-modal')){
      document.getElementById('submit-modal').classList.add('modal-darkmode')
    }
    
    // this changes the label on the toggle
    if(label){
      label.textContent = 'Dark Mode';
    }
  }

  // this function removes darkmode from the site
  function removeDarkMode(){
    document.body.classList.remove('dark-mode');
    nav.classList.remove('dark-mode');
    footer.classList.remove('dark-mode');
    logo.src = "assets/logo.svg";
    hamburger.classList.remove('dark-mode');

    //this statement checks if the user is on the gallery page and handles the galler image overlay 
    if (document.getElementById('gallery-background')){
      document.getElementById('gallery-background').classList.remove('gallery-darkmode')
      document.getElementById('gallery-text').classList.remove('gallery-text-darkmode')
    }

    //this statement checks if the user is on the contact page and removes darkmode from the form if they are
    if (document.getElementById('contactForm')){
      document.getElementById('contactForm').classList.remove('dark-mode')
    }

    // this statement checks if the submit modal exists on the page and removes dark mode if it does
    if (document.getElementById('submit-modal')){
      document.getElementById('submit-modal').classList.remove('modal-darkmode')
    }
    
    // this changes the label on the toggle
    if (label){
      label.textContent = 'Light Mode';
    }
  }