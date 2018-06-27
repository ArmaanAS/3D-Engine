var page = document.getElementById("Page");
var c = page.getContext("2d");

function resize() {
	page.width = window.innerWidth - 40;
	page.height = window.innerHeight - 60;
};
resize();

window.onresize = function(event) {
	resize();
};

window.onmousemove = function(e) {
	
}



