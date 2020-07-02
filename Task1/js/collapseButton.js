const menu =  document.getElementById("menu");
const nav = document.getElementsByTagName('nav')[1];

menu.addEventListener('click', () => {
    nav.style.display = 'flex'
    nav.addEventListener('mouseleave', () => {
        nav.style.display = 'none';
    });
})