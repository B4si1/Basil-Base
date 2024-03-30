const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const greenScore = document.getElementById('green');
const blueScore = document.getElementById('blue');
const redScore = document.getElementById('red');
const totalScore = document.getElementById('total');
const scoreLog = document.getElementById('log');
const treesInput = document.getElementById('trees');
const waterInput = document.getElementById('water');
const fireInput = document.getElementById('fire');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const screenlog = document.getElementById('screenlog')

canvas.width = window.innerWidth - 20;
canvas.height = 700;
let q = 0;
const maxParticles = 700;
const renderGreenParticles = 50;
const renderBlueParticles = 50;
const renderRedParticles = 6;
const particleArea = 40;
const maxParticleSize = 12;
const minParticleSize = 4;
const particleRadius = 3;
const lineDistance = 200;
const detectRadius = 30;
const killRadius = 10;

// console.log(fireInput)


// let canAnimate = true;
// document.addEventListener('click', function(e){
//     // console.log(e.target.id)
//     // console.log(fireInput.value)
//     let x = fireInput.valueAsNumber + treesInput.valueAsNumber + waterInput.valueAsNumber
//     // console.log(x)
//     if(e.target.id === 'start'){
//         if( x <= maxParticles){
//             canAnimate = true;
//             setTimeout(function() {animate();}, 50);
            
//             // screenlog.innerHTML += `text ok!`
//         }else{
//             screenlog.innerHTML += `<span id='red'> too many particles, max total 200.`
//         }
//     }
    
//     if(e.target.id === 'stop'){
//         canAnimate = false;
//         greenEffect.particles = []
//         blueEffect.particles = []
//         redEffect.particles = []
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }
//     // console.log(canAnimate)
// })


function fearLoop(source , fear){
    for(let j = 0; j < fear.particles.length; j++){
        const dx = source.x - fear.particles[j].x;
        const dy = source.y - fear.particles[j].y;
        const distance = Math.hypot(dx, dy);
        const force = (particleArea / distance);
        if(distance < detectRadius){
            const angle = Math.atan2(dy, dx);
            source.pushX += Math.cos(angle) * force;
            source.pushY += Math.sin(angle) * force;
            
        }
    }
}

function killLoop(source , create, target, optionalSpawn){
    for(let j = 0; j < target.particles.length; j++){
        const dx = source.x - target.particles[j].x;
        const dy = source.y - target.particles[j].y;
        const distance = Math.hypot(dx, dy);
        if(distance < killRadius){
            target.particles.splice(j , 1);
            if(q < maxParticles){
                create.createParticle();
            }
            
            if (optionalSpawn != null){
                if(q < maxParticles){
                    optionalSpawn.createParticle();
                }
            }
        }
    }
}

function drawConnections(context, source, color){
    const maxDistance = lineDistance;
        for (let a = 0; a < source.length; a++) {
            for (let b = a; b < source.length; b++) {
                const dx = source[a].x - source[b].x;
                const dy = source[a].y - source[b].y;
                const distance = Math.hypot(dx, dy);
                if (distance < maxDistance) {
                    context.save();
                    context.strokeStyle = color;
                    const opacity = 1 - (distance / maxDistance);
                    context.globalAlpha = opacity;
                    context.beginPath();
                    context.moveTo(source[a].x, source[a].y);
                    context.lineTo(source[b].x, source[b].y);
                    context.stroke();
                    context.restore();
                }
            }
        }
}

function updateScores(){
    
    q = redEffect.particles.length + greenEffect.particles.length + blueEffect.particles.length
    blueScore.innerText = `Water : ${blueEffect.particles.length}`;
    greenScore.innerText = `Trees : ${greenEffect.particles.length}`;
    redScore.innerText = `Fire : ${redEffect.particles.length}`;
    totalScore.innerText = `TOTAL : ${q}`;
}

class GreenParticle{
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random() * maxParticleSize + minParticleSize;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 0.2 - 0.1;
        this.vy = Math.random() * 0.2 - 0.1;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.1;
        this.color = 'green';
    }

    // Method to draw the particle
    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        // context.stroke();
        
    }

    update() {
        // Fear Loop (green fear red)
        fearLoop(this , redEffect)
        // Feed Loop (green kills blue)
        killLoop(this , greenEffect, blueEffect)

        // this.x += (this.pushX *= this.friction) + this.vx;
        // this.y += (this.pushY *= this.friction) + this.vy; 

        this.x += (this.pushX *= this.friction) 
        this.y += (this.pushY *= this.friction) 
        
        if(this.x < this.radius){
            this.x = this.radius;
            this.vx *= -1;
        }else if(this.x > this.effect.width - this.radius) {
            this.x = this.effect.width - this.radius;
            this.vx *= -1;
        }
        
        if(this.y < this.radius){
            this.y = this.radius;
            this.vy *= -1;
        }else if(this.y > this.effect.height - this.radius) {
            this.y = this.effect.height - this.radius;
            this.vy *= -1;
        }
    }

    reset() {
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    }
}

class BlueParticle{
    constructor(effect){
        this.effect = effect;
        this.radius = 4 // Math.random() * maxParticleSize + minParticleSize;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 0.2 - 0.1;
        this.vy = Math.random() * 0.2 - 0.1;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.1;
        this.color = 'cyan';
    }

    // Method to draw the particle
    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        // context.stroke();
        
    }

    update() {
        // Fear Loop (blue fear green)
        // fearLoop(this , greenEffect)
        // Feed Loop (blue kills red)
        killLoop(this , blueEffect, redEffect)

        this.x += (this.pushX *= this.friction) + this.vx;
        this.y += (this.pushY *= this.friction) + this.vy; 
        
        if(this.x < this.radius){
            this.x = this.radius;
            this.vx *= -1;
        }else if(this.x > this.effect.width - this.radius) {
            this.x = this.effect.width - this.radius;
            this.vx *= -1;
        }
        
        if(this.y < this.radius){
            this.y = this.radius;
            this.vy *= -1;
        }else if(this.y > this.effect.height - this.radius) {
            this.y = this.effect.height - this.radius;
            this.vy *= -1;
        }
    }

    reset() {
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    }
}

class RedParticle{
    constructor(effect){
        this.effect = effect;
        this.radius = 4 // Math.random() * maxParticleSize + minParticleSize;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.95;
        this.color = 'red';
    }

    // Method to draw the particle
    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        // context.stroke();
        
    }

    update() {
        // Fear Loop (red fear blue)
        fearLoop(this , blueEffect)
        // Feed Loop (red kills green)
        killLoop(this , redEffect , greenEffect, blueEffect)

        this.x += (this.pushX *= this.friction) + this.vx;
        this.y += (this.pushY *= this.friction) + this.vy; 
        
        if(this.x < this.radius){
            this.x = this.radius;
            this.vx *= -1;
        }else if(this.x > this.effect.width - this.radius) {
            this.x = this.effect.width - this.radius;
            this.vx *= -1;
        }
        
        if(this.y < this.radius){
            this.y = this.radius;
            this.vy *= -1;
        }else if(this.y > this.effect.height - this.radius) {
            this.y = this.effect.height - this.radius;
            this.vy *= -1;
        }
        
    }



    reset() {
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    }
}

class GreenEffect{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = renderGreenParticles;
        this.createParticle();
        this.createBaseParticles();
        window.addEventListener('resize', e => {
            this.resize(e.target.window.innerWidth - 20);
        });
    }

    createParticle() {
        this.particles.push(new GreenParticle(this));
        // console.log(this.particles)
    }

    createBaseParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new GreenParticle(this));
        }
    }

    handleParticles(context) {
        drawConnections(context, this.particles, 'green')
        for(let i = 0; i < this.particles.length; i++){
                this.particles[i].draw(context);
                this.particles[i].update();
            }
        }
        resize(width) {
            this.canvas.width = width;
            this.width = width;
            // Reset particle positions
            this.particles.forEach(particle => {
                particle.reset();
            });
        }
}
 
class BlueEffect{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = renderBlueParticles;
        this.createParticle();
        this.createBaseParticles();
        window.addEventListener('resize', e => {
            this.resize(e.target.window.innerWidth - 20);
        });
    }

    createParticle() {
        this.particles.push(new BlueParticle(this));
        // console.log(this.particles)
    }

    createBaseParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new BlueParticle(this));
        }
    }

    handleParticles(context) {
        drawConnections(context, this.particles, 'cyan')
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].draw(context);
            this.particles[i].update();
        }
    }
    resize(width) {
        this.canvas.width = width;
        this.width = width;
        // Reset particle positions
        this.particles.forEach(particle => {
            particle.reset();
        });
    }
}

class RedEffect{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = renderRedParticles;
        this.createParticle();
        this.createBaseParticles();
        window.addEventListener('resize', e => {
            this.resize(e.target.window.innerWidth - 20);
        });
    }

    

    createParticle() {
        this.particles.push(new RedParticle(this));
        // console.log(this.particles)
    }

    createBaseParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new RedParticle(this));
        }
    }

    handleParticles(context) {
        drawConnections(context, this.particles, 'red')
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].draw(context);
            this.particles[i].update();
        }
    }

    resize(width) {
        this.canvas.width = width;
        this.width = width;
        // Reset particle positions
        this.particles.forEach(particle => {
            particle.reset();
        });
    }
}
    
        
// Create an instance of the Effect class
const greenEffect = new GreenEffect(canvas, ctx);
const blueEffect = new BlueEffect(canvas, ctx);
const redEffect = new RedEffect(canvas, ctx);

// Animation loop
function animate() {
    updateScores()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    greenEffect.handleParticles(ctx);
    blueEffect.handleParticles(ctx);
    redEffect.handleParticles(ctx);
    requestAnimationFrame(animate);
    
    
}

// Start the animation loop
animate();

document.addEventListener('keyup' , function(e){
    if(e.which == 71){
        greenEffect.createParticle()
    }
})


