
/*
 * ALTRI ESERCIZI SU PLASM
 */

//ELICOIDE NORMALE
var helicoid = function(radius, h, turns, n, m){ 
	var width = width || 0.1;
	var radius = radius || 1;
	var h = h || 1;
	var turns = turns || 6;
	var n = n || 180;
	var m = m || 1;
	var p = p || 1;
	var domain = SIMPLEX_GRID ([
		REPEAT(n)(turns*2*Math.PI/n),
		REPEAT(m)(radius/m)
		]);

	var fx = function(uv) {
		var u = uv[0];
		var v = uv[1];
		return v*Math.sin(u);
	}

	var fy = function(uv) {
		var u = uv[0];
		var v = uv[1];
 		return v*Math.cos(u);
 }

	var fz = function(uv) { 
		var u = uv[0];
		var v = uv[1];
		return u * h/(turns*2*Math.PI);
	}

	var mapping = function(array){
		return [fx(array), fy(array), fz(array)]
	}

	var object = MAP(mapping)(domain);
	return object;
};

DRAW(helicoid(radius=1, h=3, turns=6, n=180, m=3));


//ELICOIDE CON SPESSORE
var solidHelicoid = function(width, radius, h, turns, n, m, p){
	width = width || 0.5;
	radius = radius || 1;
	h = h || 10;
	turns = turns || 6;
	n = n || 220;
	m = m || 100;
	p = p || 1;

	var domain = SIMPLEX_GRID([REPEAT(n)(turns*2*Math.PI/n), REPEAT(m)(radius/m), [width/p]]);
	
	var fx = function(uvz){
		var u = uvz[0];
		var v = uvz[1];
		return v * Math.sin(u);
	}

	var fy = function(uvz){
		var u = uvz[0];
		var v = uvz[1];
		return v * Math.cos(u);
}

	var fz = function(uvz){
		var u = uvz[0];
		var v = uvz[1];
		var z = uvz[2];
		return width*z + (u * h/(turns*2*Math.PI));
	}

	var mapping = function(array){
		return [fx(array), fy(array), fz(array)];
	}

	return MAP(mapping)(domain);

}

DRAW(solidHelicoid(0.05, 1, 3));


//CUPOLA CON SPESSORE
var drawSolidDome = function(rInf,rSup,width,color){
	rSup = rSup || 1;
	rInf = rInf || 2;
	n = (rInf+rSup)*10;

	color = color || [0,1,0];
	width = width || 0.3;

	var startDomain = Math.asin(rSup/rInf);

	var domain = DOMAIN([
		[startDomain,PI/2],
		[0,2*PI],
		[0,width]])([n,n,1]);

	var mapping = function(p){
		var u = p[0];
		var v = p[1];
		var w = p[2];

		return [
		(rInf +w)*SIN(u)*COS(v),
		(rInf +w)*SIN(u)*SIN(v),
		(rInf +w)*COS(u)
		];
	};

	var mapped = MAP(mapping)(domain);

	DRAW(mapped);
	COLOR(color)(mapped);
};



