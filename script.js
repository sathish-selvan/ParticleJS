const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const particlesArray = [];
let hue= 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
});

const mouse = {
    x :undefined,
    y : undefined,
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x
    mouse.y = event.y
    // drawCircle();
})

canvas.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle();
    for (let i =0;i< 2; i++){
        particlesArray.push(new Particles());
    }
})

function drawCircle(){
    ctx.fillStyle = 'Blue';
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y, 50, 0, Math.PI * 2);
    ctx.fill();
}

class Particles{
    constructor(){
        this.x = mouse.x
        this.y = mouse.y
        // this.x = Math.random()*canvas.width;
        // this.y = Math.random()*canvas.height;
        this.size = Math.random()*5 + 1;
        this.speedX = Math.random()*3 -1.5;
        this.speedY = Math.random()*3 -1.5;
        this.colour = 'hsl('+hue+",100%, 50%)"
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY; 
        if (this.size > 0.2) this.size -= 0.1
        // if (this.size < 0.2) this.size = Math.random()*2 + 1

    }
    draw(){
        ctx.fillStyle = this.colour ;
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// function init(){
//     for (let i = 0; i<= 1; i++ ){
//         particlesArray.push(new Particles());
//     }
// }

// init();

function handleParticles(){
    for (let i=0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j=i; j < particlesArray.length;j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance<200){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].colour;
                ctx.lineWidth = particlesArray[i].size/10;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.02)';
    // ctx.fillRect(0,0,canvas.width,canvas.height);
    handleParticles();
    hue+=5;
    requestAnimationFrame(animate)
}
animate();