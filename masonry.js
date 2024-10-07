// This file handles loading the masonry grid and adding the lightbox to each image


// this is the image data. each image object includes an id, a title. a year, the medium of the artwork, the alt text and the image src
let imageData = [
    {
        "id":1,
        "title": "Tukotahi",
        "year": "1987",
        "medium": "Acrylic on board",
        "alt":"Blue background with red and blue swirls",
        "src": "assets/img/gal_1.jpg"
    },
    {
        "id":2,
        "title": "Kahurangi",
        "year": "1988",
        "medium": "Acrylic on board",
        "alt":"Dark background with circle and swirls forming a tree shape inside",
        "src": "assets/img/gal_2.jpg"
    },
    {
        "id":3,
        "title": "Ngahere",
        "year": "1980",
        "medium": "Acrylic on board",
        "alt":"Dark blue background with upside-down cross and swirls",
        "src": "assets/img/gal_4.jpg"
    },
    {
        "id":4,
        "title": "Pawhera series",
        "year": "1985",
        "medium": "Acrylic on board",
        "alt":"Lots of blue swirls",
        "src": "assets/img/gal_5.jpg"
    },
    {
        "id":5,
        "title": "Untitled",
        "year": "1994",
        "medium": "Acrylic on board",
        "alt":"Blue, red and green swirls",
        "src": "assets/img/gal_6.jpg"
    },
    {
        "id":6,
        "title": "Untitled",
        "year": "1994",
        "medium": "Acrylic on board",
        "alt":"Two canvases side by side with blue, red and green swirls",
        "src": "assets/img/gal_7.jpg"
    },
    {
        "id":7,
        "title": "Whare-Ngaro",
        "year": "1994",
        "medium": "Acrylic on board",
        "alt":"Colour abstract animal shapes",
        "src": "assets/img/gal_8.jpg"
    },
    {
        "id":8,
        "title": "Whirlwind",
        "year": "1980",
        "medium": "Acrylic on board",
        "alt":"Blue outline with swrils inside an inner square",
        "src": "assets/img/gal_9.jpg"
    }
];

// these variables are used by the grid
let imageIndex = 0;
const images = [];


// These variables are used by the lightbox functionality
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const next = document.querySelector('.next');
const previous = document.querySelector('.prev');
let currentImageID = 0
let previousImageId = 0;

// this defines a default image if there are any issues
const defaultImage = {"id":1, "src":"", "alt":""};

// This loops through the image data and creates array with each image that has an id. 
// it fetches the first image with an id so if there are duplicates, any extra are ignored
for (let i = 0; i <= imageData.length-1; i++) {

    if(imageData.some(img => img.id ===(i+1))){
        let tempImage = imageData.find(img => img.id === i+1);
        let image = {
            id: tempImage.id,
            title: tempImage.title ?? "",
            year: tempImage.year ?? "",
            alt: tempImage.alt ?? "",
            medium: tempImage.medium ?? "",
            imagesrc: tempImage.src ?? "",
        };
        images.push(image);
        imageIndex++;    
    }
}

// this selects the imge grid from the gallery page
const imagegrid = document.querySelector('.imagegrid');

// this generates a grid depending on the amount on columns provded
function generateGrid(columns) {
  imagegrid.innerHTML = '';

  let columnList = {};

//   this creates a column list for every column. SO if there are 3 columns, there are 3 columnlists
  for (let i = 0; i < columns; i++) {
    columnList[i] = [];
  }

//  This adds the image to the lists on by one. 
// If there are 3 images and 2 columns, then image 1 goes in list 1, image 2 in list 2 and image 3 goes in list 1.  
  for (let i = 0; i < images.length; i++) {
    columnList[i % columns].push(images[i]);
  }

//  this loops through each column 
  for (let i = 0; i < columns; i++) {
    let columnimages = columnList[i];

    // this creates a column div 
    let column = document.createElement('div');
    column.classList.add('image-gallery-column');

    // this loops through all the images in the current column
    for(const images of columnimages) {
        
        // this creates a div for each image
        let imageDiv = document.createElement('div');
        imageDiv.classList.add('gallery-image');
        
        // this creates the image element and adds the alt text, src and id from the data
        let image = document.createElement('img');
        image.src = images.imagesrc;
        image.alt = images.alt;
        image.id = images.id;

        // This adds an event listener that listen for a click on each image. if the image is pressed, the lightbox is triggered
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
        

        // this adds an overlay to the image. when the user hovers over the image, the title, year and medium of the work is shown
        let overlay = document.createElement('div');
        overlay.classList.add('overlay');
        
        // this checks what data is valid and adds it to the title element
        if(images.title || images.year || images.medium){
            let title = document.createElement('h2');
            title.classList.add('bilo-light');
    
            if(images.title){
                title.innerText = images.title;
            }

            if(images.year){
                if(images.title){
                    title.innerText += ", ";
                }
                title.innerText += images.year;
            }
    
            if(images.medium){
                title.innerText += '\n' + images.medium;
            }
      
            // this adds the title to the overlay
            overlay.appendChild(title);
        }
        
        // this adds the image and the overlay to the image div
        imageDiv.append(image, overlay);

        // the image div is then added to the column div
        column.appendChild(imageDiv);
    };
        // and finally, the colunms are added to the image grid
        imagegrid.appendChild(column);
  }
}


let windowWidth = window.innerWidth;
let previousScreenSize = window.innerWidth;

// this listens to if the screen is resized and regenrates the grid depending on the width of the screen 
// the grid is not reloaded if the previous width of the screen and he new width need the same column amount
window.addEventListener('resize', () => {

    if (innerWidth < 576 && previousScreenSize >= 576) {
        generateGrid(1);
    } 
    else if (innerWidth >= 576 && innerWidth < 768 && (previousScreenSize < 576 || previousScreenSize >= 768)) {
        generateGrid(2);
    } 
    else if (innerWidth >= 768 && previousScreenSize < 768) {
        generateGrid(3);
    }
    previousScreenSize = innerWidth;
});

// this generate the initial grid
if (windowWidth < 576) {
  generateGrid(1);
} else if (windowWidth >= 576 && windowWidth < 768) {
  generateGrid(2);
} else {
  generateGrid(3);
}

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