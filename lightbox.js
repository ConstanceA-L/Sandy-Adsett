// This file originally handles the lightbox functionality
//The functionality has been integrated into the masonry.js file because every time the screen width changed and the grid is reloaded, 
// the lightbox was no longer applied. 

const galleryImages = document.querySelectorAll('.gallery-image img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const next = document.querySelector('.next');
const previous = document.querySelector('.prev');
let currentImageID = 0
let previousImageId = 0;

const defaultImage = {"id":1, "src":"", "alt":""};

// This adds an event listener that listen for a click on each image. if the image is pressed, the lightbox is triggered
galleryImages.forEach(image => {
    image.addEventListener('click', event =>{
        // this displays the lightbox
        lightbox.style.display = 'flex';

        // this fetches the current image and sets the details in the lightbox - the src, the alt text and the id (which is used for the next previous arrows)
        const imgSrc = event.target.src;
        lightboxImg.src = imgSrc;
        lightboxImg.alt = event.target.alt;
        lightboxImg.id = event.target.id;

        // this hides the previous arrow if the first image is displayed
        if(lightboxImg.id <=1){
            previous.style.display = 'none';
        }
        else{
            previous.style.display = 'block';
        }

        // this hides the next arrow if the last image is displayed
        if(lightboxImg.id >=imageData.length){
            next.style.display = 'none';
        }
        else{
            next.style.display = 'block';
        }
    });
});

// this hides the lightbox if the user clicks outside the image
lightbox.addEventListener('click', e =>{
    if (e.target == lightbox){
        lightbox.style.display = 'none';
    } 
});

// this displays the lightbox of the provided image data. it is triggered by the arrows
function showImage(tempImage){
    lightboxImg.src = tempImage.src;
    lightboxImg.alt = tempImage.alt;
    lightboxImg.id = tempImage.id;

    if(lightboxImg.id <=1){
        previous.style.display = 'none';
    }
    else{
        previous.style.display = 'block';
    }
    if(lightboxImg.id >= imageData.length){
        next.style.display = 'none';
    }
    else{
        next.style.display = 'block';
    }
}

// this adds an event listener to the previous arrow.
// it uses the image ids fetched from the image data to display the image witht the previous id.
// if there is no image with a smaller id, the previous button is hidden
previous.addEventListener('click',()=>{
    currentImageID = lightboxImg.id;
    previousImageId = currentImageID;

    if(currentImageID > 1){
        currentImageID --;
    }

    if(previousImageId != currentImageID){

        const tempImage = imageData.find(image => image.id === currentImageID);    
         
        if(tempImage){
            if (tempImage.src){
                showImage(tempImage);
            }
        }
        else{
            defaultImage.id = currentImageID;
            showImage(defaultImage);
        }
    }
})


// this adds an event listener to the next arrow.
// it uses the image ids fetched from the image data to display the image witht the next id.
// if there is no image with a higher id, the next button is hidden
next.addEventListener('click',()=>{
    currentImageID = lightboxImg.id;
    previousImageId = currentImageID;

    if(currentImageID < imageData.length){
        currentImageID ++;
    }

    if(previousImageId != currentImageID){
        const tempImage = imageData.find(image => image.id === currentImageID); 
        if(tempImage){
            if (tempImage.src){
                showImage(tempImage);
            }
        }
        else{
            defaultImage.id = currentImageID;
            showImage(defaultImage);
        }
    }
})