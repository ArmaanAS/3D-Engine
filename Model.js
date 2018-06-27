var page = document.getElementById("Page");
var c = page.getContext("2d");

function Model(pos, midPos, nodes, fcs, size) {
	this.size = size;
	this.pos = pos;
	this.midPos = midPos.multiply(this.size);
	this.translate = this.pos.clone().vectorSubtract(this.midPos);
	this.nodes = nodes;
	this.fcs = fcs;
	
	this.midPos.vectorAdd(this.translate);
	for (var i in this.nodes) {
		this.nodes[i].multiply(this.size).vectorAdd(this.translate);
	}
	
	this.faces = [];
	for (var f in fcs) {
		this.faces.push(new Face(this.fcs[f], this.nodes));
	}
}

Model.prototype.draw = function(a, b, c) {
	if (this.midPos.visualise(a, b, c).z < c) return;
	
	for (var i in this.faces) {
		this.faces[i].draw(a, b, c);
	}
}

Model.prototype.rotate = function(ax, ay, az) {
	var cx = Math.cos(ax),
		cy = Math.cos(ay),
		cz = Math.cos(az),
		sx = Math.sin(ax),
		sy = Math.sin(ay),
		sz = Math.sin(az);
	
	for (var i in this.nodes) {
		var xx = this.nodes[i].x,
			yy = this.nodes[i].y,
			zz = this.nodes[i].z;
			
		var	dx = this.midPos.x - xx,
			dy = this.midPos.y - yy,
			dz = this.midPos.z - zz;
			
		// Rotation around Z axis.
		xx = dx * cz + dy * sz + this.midPos.x;
		yy = dy * cz - dx * sz + this.midPos.y;	
		
		var	dx = this.midPos.x - xx,
			dy = this.midPos.y - yy,
			dz = this.midPos.z - zz;
			
		// Y axis
		xx = dx * cy - dz * sy + this.midPos.x;
		zz = dz * cy + dx * sy + this.midPos.z;
		
		var	dx = this.midPos.x - xx,
			dy = this.midPos.y - yy,
			dz = this.midPos.z - zz;
		
		// X axis
		yy = dy * cx + dz * sx + this.midPos.y;
		zz = dz * cx - dy * sx + this.midPos.z;
		
		this.nodes[i] = new Point(xx, yy, zz);
	}
	
	for (var i in this.faces) {
		this.faces[i].setNodes(this.nodes);
	}
}




