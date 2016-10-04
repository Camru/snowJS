const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

/** CONSTANTS ************************************/
const FLAKE_DELAY = 20 /* ms */ 
const FLAKE_SIZE = 3;
const FLAKE_SPEED_RANGE =  0.3;  
const MAX_FLAKES = 10000;
/************************************************/

let flakes = [];
let ground = {};
let sineValues = [];

function makeSnowflake() {
	const flake = {
		x: Math.floor(Math.random() * ctx.canvas.width), 
		y: 10,
		size: Math.floor(Math.random() * FLAKE_SIZE),
		speed: Math.random() + FLAKE_SPEED_RANGE, 
		amplitude: getAmplitude()
	};	

	if (flakes.length < MAX_FLAKES) {
		flakes.push(flake);
	} 
}

function getAmplitude() {
	let amp = Math.random();
	return amp < 0.5 ? -amp : amp;
}

let ind = 1;
function counter() {
	if (ind === sineValues.length-1) {
		ind = 1;
	}
	ind++;
	setTimeout(() => {
		counter();
	}, 100);
}

function sineWave () {
	for (let i = 0; i < 100; i++) {
		let x = Math.sin((i/100) * Math.PI * 2);
		sineValues.push(x);
	}
}

function drawSnowflakes() {
	flakes.forEach((flake, index) => {
		if (flake.speed > 0 && flake.speed <= 0.8) {
			ctx.fillStyle = 'gray'; 
		} else {
			ctx.fillStyle = '#fff';
		}
		ctx.fillRect(flake.x, flake.y, flake.size, flake.size);

		flake.x += sineValues[ind] * flake.amplitude;
		flake.y += flake.speed;
		
		// Allow snowfall to buildup on ground
		if ((flake.y + flake.size) > canvas.height) {
			flakes[index]['y'] = canvas.height - (flake.size);
			flakes[index]['x'] = flake.x; 
			flakes[index]['amplitude'] = 0;
			flakes[index]['speed'] = 0;
			ctx.fillRect(flake.x, flake.y, flake.size, flake.size);
		}
	});
}

let lastSpawn = Date.now();
function loop(timestamp) {

	// redraw background every frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// only make a snowflake at designated ms intervals
	let now = Date.now();
	if ((now - lastSpawn) > FLAKE_DELAY) {
		makeSnowflake();
		lastSpawn = Date.now();
	}

	drawSnowflakes();
	
	requestAnimationFrame(loop);
}

// Initial setup 
sineWave();
counter();
loop();