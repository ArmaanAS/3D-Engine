var page = document.getElementById("Page");
var c = page.getContext("2d");

function Face(index, points) {
	this.index = index;
	//this.points = points;
	this.nodes = [];
	
	for (var i in this.index) {
		this.nodes.push(points[this.index[i]]);
	}
}

Face.prototype.getNode = function(index) {
	return this.nodes[index];
};

Face.prototype.setNodes = function(points) {
	this.nodes = [];
	
	for (var i in this.index) {
		this.nodes.push(points[this.index[i]]);
	}
} 

Face.prototype.draw = function(x, y, z) {
	c.strokeStyle = "black";
	c.beginPath();
	
	this.getNode(0).visualise(x, y, z).moveTo();
	
	for (var i in this.nodes) {
		this.getNode(i).visualise(x, y, z).lineTo();
	}
	
	this.getNode(0).visualise(x, y, z).lineTo();
	
	c.closePath();
	c.stroke()
}

