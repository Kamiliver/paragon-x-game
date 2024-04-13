const header = document.querySelector('header');
const header_title = document.getElementById('header_title');
const d_btn1 = document.getElementById('d_btn1');
const d_btn2 = document.getElementById('d_btn2');
const slider_btn = document.querySelectorAll('.dot');


const backimg = {
    fimg: 'img/egypt-slider.jpg',
    simg: 'img/sliderimg2.jpg',
    timg: 'img/racecar.jpg'
}


const slider_load = (index) =>{
    const images = [backimg.fimg, backimg.simg, backimg.timg]
    const titles = ["EGYPT AND WORLD", "RISE OF THE TOMB RAIDER", "HORIZON 4"]

    header.style.background = `url(${images[index]}) no-repeat center center/cover`;
    header_title.innerText = titles[index];

    slider_btn.forEach((btn, i)=>{
        btn.style.background = i === index ? "#fff" : "rgb(184,184,184,0.1)"
    })

    d_btn1.href = "#"
    d_btn2.href = "#"
};

let currentIndex = 0;

const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slider_btn.length;
    slider_load(currentIndex);
};

slider_btn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        currentIndex = index;
        slider_load(currentIndex);
    });
});

setInterval(nextSlide, 10000);
slider_load(currentIndex);