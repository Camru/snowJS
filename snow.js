const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/** CONSTANTS ************************************/
const FLAKE_SIZE = 2;
const FLAKE_SPEED = 2;
const FLAKE_DELAY = 50 /* ms */ 
const MAX_FLAKES = 10000;
/************************************************/

let flakes = [];
let flakeX = 20;
let flakeY = 0;
function makeSnowflake() {
	const flake = {
		x: Math.floor(Math.random() * 1000), 
		y: 10,
	};	

	if (flakes.length < MAX_FLAKES) {
		flakes.push(flake);
	}
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


let lastSpawn = Date.now();
function loop(timestamp) {


	// redraw background
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let now = Date.now();
	flakes.forEach(flake => {
		ctx.fillStyle = '#fff' || getRandomColor();
		ctx.fillRect(flake.x, flake.y, FLAKE_SIZE, FLAKE_SIZE);
		flake.y += FLAKE_SPEED;

		if (flake.y > canvas.height) {
			flake.y = canvas.height - FLAKE_SIZE;
		}
	});

	if ((now - lastSpawn) > FLAKE_DELAY) {
		makeSnowflake();
		lastSpawn = Date.now();
	}

	
	requestAnimationFrame(loop);
}

loop();