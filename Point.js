var page = document.getElementById("Page");
var c = page.getContext("2d");

var fov = 0.5;

function Point(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

Point.prototype.clone = function() {
	return new Point(this.x, this.y, this.z);
}

Point.prototype.multiply = function(i) {
	this.x *= i;
	this.y *= i;
	this.z *= i;
	
	return this;
}

Point.prototype.divide = function(i) {
	this.x /= i;
	this.y /= i;
	this.z /= i;
	
	return this;
}

Point.prototype.vectorDivide = function(vec) {
	this.x /= vec.x;
	this.y /= vec.y;
	this.z /= vec.z;
	
	return this;
}

Point.prototype.vectorMultiply = function(vec) {
	this.x *= vec.x;
	this.y *= vec.y;
	this.z *= vec.z;
	
	return this;
}

Point.prototype.vectorAdd = function(vec) {
	this.x += vec.x;
	this.y += vec.y;
	this.z += vec.z;
	
	return this;
}

Point.prototype.vectorSubtract = function(vec) {
	this.x -= vec.x;
	this.y -= vec.y;
	this.z -= vec.z;
	
	return this;
}

Point.prototype.translate = function(a, b, c) {
	this.x += a;
	this.y += b;
	this.z += c;
	
	return this;
}

var ax = 0, ay = 0, az = 0;
Point.prototype.visualise = function(a, b, c) {
	//roll  = Math.PI * 2;
	//pitch = Math.PI * 2;
	//yaw   = Math.PI * 1.9;
	
	/*// X axis
	//nodes[[i]][2] = (cy - y) * d.cos - (cz - z) * d.sin + cy 
	//nodes[[i]][3] = (cz - z) * d.cos + (cy - y) * d.sin + cz	
	yy = (b - yy) * Math.cos(roll) + (c - zz) * Math.sin(roll) + b;
	zz = (c - zz) * Math.cos(roll) - (b - yy) * Math.sin(roll) + c;
	
	// Y axis
	//nodes[[i]][1] = (cx - x) * d.cos - (cz - z) * d.sin + cx
	//nodes[[i]][3] = (cz - z) * d.cos + (cx - x) * d.sin + cz
	xx = (a - xx) * Math.cos(pitch) - (c - zz) * Math.sin(pitch) + a;
	zz = (c - zz) * Math.cos(pitch) + (a - xx) * Math.sin(pitch) + c;
	
	// Rotation around Z axis.
	//nodes[[i]][1] = (cx - x) * d.cos - (cy - y) * d.sin + cx
	//nodes[[i]][2] = (cy - y) * d.cos + (cx - x) * d.sin + cy
	xx = (a - xx) * Math.cos(yaw) + (b - yy) * Math.sin(yaw) + a;
	yy = (b - yy) * Math.cos(yaw) - (a - xx) * Math.sin(yaw) + b;*/
	
	//var xx = (a - this.x) * Math.cos(ay) - (c - this.z) * Math.sin(ay) + (a - this.x) * Math.cos(az) + (b - this.y) * Math.sin(az) + a,
	//	yy = (b - this.y) * Math.cos(ax) + (c - this.z) * Math.sin(ax) + (b - this.y) * Math.cos(az) - (a - this.x) * Math.sin(az) + b,
	//	zz = (c - this.z) * Math.cos(ax) - (b - this.y) * Math.sin(ax) + (c - this.z) * Math.cos(ay) + (a - this.x) * Math.sin(ay) + c;
	
	var cx = Math.cos(ax),
		cy = Math.cos(ay),
		cz = Math.cos(az),
		sx = Math.sin(ax),
		sy = Math.sin(ay),
		sz = Math.sin(az),
		dx = this.x - a,
		dy = this.y - b,
		dz = this.z - c;
		
	var xx = cy * (sz * dy + cz * dx) - sy * dz,
		yy = sz * (cy * dz + sy * (sz * dy + cz * dx)) + cx * (cz * dy - sz * dx),
		zz = cx * (cy * dz + sy * (sz * dy + cz * dx)) - sx * (cz * dy - sz * dx);
	
	scale = (250 * fov * speed) / (c - zz);
	return new Point(
		page.width * 0.5 + (a - xx) * scale,
		page.height * 0.5 + (b - yy) * scale,
		zz
	);
	
	/*scale = (250 * fov * speed) / (c - this.z);
	return new Point(
		page.width - ((this.x - a) * scale + a),
		page.height - ((this.y - b) * scale + b),
		this.z
	);*/
}

Point.prototype.lineTo = function() {
	c.lineTo(this.x, this.y);
}

Point.prototype.moveTo = function() {
	c.moveTo(this.x, this.y);
}

Point.prototype.distance = function(a, b, c) {
	return Math.sqrt((this.x - a)**2 + (this.y - b)**2 + (this.z - c)**2);
}

setFOV = function(i) {
	fov = i;
}



