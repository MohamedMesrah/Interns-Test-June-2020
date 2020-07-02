const imgs = document.getElementsByTagName('img');
const lightbox = document.getElementsByClassName('lightbox')[0];

// remove lightbox on clicking the close button
document.getElementsByClassName('close')[0].addEventListener('click', () => {
    lightbox.style.display = 'none';   
})

// add click event to images
for (let i = 0; i < imgs.length; i++) {
    const img = document.createElement("img");  
    if(imgs[i].className.startsWith('c')){
        imgs[i].addEventListener('click', (e) => {
            lightbox.style.display = 'block'; 
            img.src = e.currentTarget.src;
            lightbox.appendChild(img);
        })
    }
}