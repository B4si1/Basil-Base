const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleArray = [];
let hue = 0;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;    
});

const mouse = {
    x:undefined,
    y:undefined,
};

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 30; i++){
        particleArray.push(new Particle());
    }
    
});
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    particleArray.push(new Particle());
    
});
canvas.addEventListener('mousedown', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    particleArray.push(new Particle());
});

canvas.addEventListener('touchstart', function(event){
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
    particleArray.push(new Particle());
});

canvas.addEventListener('touchmove', function(event){
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
    particleArray.push(new Particle());
});

class Particle{

    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'orange';
    };
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -=0.1;
    };
    draw(){
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.radius);
        ctx.closePath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
        ctx.shadowColor = 'black';
        ctx.fill();
    };
};

function handleParticles(){
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();
        
       
        if (particleArray[i].size <= 0.3){
            particleArray.splice(i, 1);
            i--;
        };
        
    };
};

let fill = 'white';

function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    handleParticles();    
    requestAnimationFrame(animate);
};
animate();

