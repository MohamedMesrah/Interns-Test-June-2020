const header = document.getElementsByClassName('header')[0];

let i = 1;
setInterval(()=> {
    i = i % 7;
    currentImage(i+1);
    i++;
}, 2500)

function currentImage(i){
    header.style.backgroundImage = `url('./assets/portfolio-img${i}.jpg')`;
}