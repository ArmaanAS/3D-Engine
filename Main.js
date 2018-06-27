var page = document.getElementById("Page");
var c = page.getContext("2d");

var vx = 0,
	vy = 0,
	vz = 0;

var Cube = new Model(
	new Point(100, 100, 100), 
	new Point(0.5, 0.5, 0.5),
	[
		new Point(0, 0, 0),
		new Point(0, 1, 0),
		new Point(1, 1, 0),
		new Point(1, 0, 0),
		new Point(0, 0, 1),
		new Point(0, 1, 1),
		new Point(1, 1, 1),
		new Point(1, 0, 1)
	],
	[
		[0, 1, 2, 3],
		[4, 5, 6, 7],
		[0, 1, 5, 4],
		[3, 2, 6, 7],
		[1, 2, 6, 5],
		[0, 3, 7, 4]
	],
	50
);

var width = depth = 200;
var spots = [];
for (var i = 0; i < width; i++) {
	for (var j = 0; j < depth; j++) {
		var f = noise.simplex2(i/100, j/100);
		spots.push(
			new Point(
				i * 5,
				Math.round(f * 200 + 200),
				j * 5
			)
		);
	}
}

triangle = function(i, j, k) {
	//if (i.z < z || j.z < z || k.z < z) return;
	if (i.z - z > dist) return;
	
	var d = i.visualise(x, y, z);	
	var e = j.visualise(x, y, z);
	var f = k.visualise(x, y, z);
	
	if (d.x > page.width || d.x < 0) {
		if (e.x > page.width || e.x < 0) {
			if (f.x > page.width || f.x < 0) {
				return;
			}
		}
	}
	
	if (d.y > page.height || d.y < 0) {
		if (e.y > page.height || e.y < 0) {
			if (f.y > page.height || f.y < 0) {
				return;
			}
		}
	}
	
	if (d.z < z || e.z < z || f.z < z) return;
	
	c.beginPath();
	
	d.moveTo();
	e.lineTo();
	f.lineTo();
	d.lineTo();
	
	c.closePath();
	
	var col = Math.round(i.y * 0.6375);
	c.strokeStyle = 'rgb(' + (255 - col) + ', ' + col + ', ' + 0 + ')';
	c.stroke();
	//c.fillStyle = 'rgb(' + (255 - col) + ', ' + col + ', ' + 0 + ')';
	//c.fill();
	
}

c.fillStyle = 'rgba(0, 0, 0, 1)';
c.strokeStyle = 'black';
c.font = '30px Mono Roboto';
setInterval(function() {
	c.clearRect(0, 0, page.width, page.height);
	
	Cube.draw(x, y, z);
	Cube.rotate(0.1, 0.1, 0.1);
	
	//c.fillRect(page.width/2, page.height/2, 2, 2);
	
	for (var i = 0; i < width - 1; i++) {
		for (var j = 0; j < depth - 1; j++) {
			triangle(
				spots[j * width + i], 
				spots[j * width + (i + 1)], 
				spots[(j + 1) * width + i]
			);
			
			/*triangle(
				spots[(j + 1) * width + (i + 1)], 
				spots[j * width + (i + 1)], 
				spots[(j + 1) * width + i]
			);*/
		}
	}
	/*for (var i in spots) {
		if (spots[i].z < z) continue;
		a = spots[i].visualise(x, y, z);//.lineTo();
		
		b = Math.abs(a.z - z);
		r = (200 * fov * speed) / b;
		
		if (r < 4) {
			c.fillRect(a.x, a.y, r, r);
		} else {
			c.beginPath();
			c.arc(a.x, a.y, r, 0, 5.5);
			c.closePath();
			c.fill();
		}
	}*/
	
	x += vx,
	y += vy,
	z += vz;
	
	//c.fillText('(' + x + ', ' + y + ', ' + z + ')', 100, 100);
	//c.fillText('(' + ax.toFixed(2) + ', ' + ay.toFixed(2) + ')', 100, 100);
}, 33);

var x = 600, y = 200, z = 00, pressed = false;
document.onmousedown = function(e) {
	if (e.button != 2) return;
	//x = e.pageX;
	//y = e.pageY;
	e.preventDefault();
	pressed = true;
}

document.onmousemove = function(e) {
	if (!pressed) return;
	ax = Math.PI * (e.pageX - 8 - page.width * 0.5) / page.width;
	ay = Math.PI * (e.pageY - 32 - page.height * 0.5) / page.height;
}

document.onmouseup = function(e) {
	pressed = false;	
}

document.onkeydown = function(e) {
	if (e.key == 'ArrowUp') {
		vz = 2 / speed;		
	} else if (e.key == 'ArrowDown') {
		vz = -2 / speed;		
	} else if (e.key == 'Control') {
		vy = -10 / speed;		
	} else if (e.key == 'Shift') {
		vy = 10 / speed;
	} else if (e.key == 'ArrowRight') {
		vx = 30 / speed;		
	} else if (e.key == 'ArrowLeft') {
		vx = -30 / speed;
	}
}

document.onkeyup = function(e) {
	if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
		vz = 0;
	} else if (e.key == 'Control' || e.key == 'Shift') {
		vy = 0;		
	} else if (e.key == 'ArrowRight' || e.key == 'ArrowLeft') {
		vx = 0;		
	}
}

var speed = 1;
setSpeed = function(i) {
	speed = 1/i;
}

var dist = 250;
setDistance = function(i) {
	dist = i;	
}