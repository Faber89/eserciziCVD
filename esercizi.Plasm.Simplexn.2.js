
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

	//DRAW(mapped);
	COLOR(color)(mapped);
	return mapped;
};


//CILINDRO PIENO
var cilindroPieno = function(r,h,n,m,p,color) {
	r = r || 1;
	h = h || 1;

	n = n || r*15;

	m = m || 1;
	p = p || 1;
	color = color || [0,1,0];

	var dominio = SIMPLEX_GRID([REPEAT(n)(2*PI/n), REPEAT(m)((r)/m), REPEAT(p)(h/p) ]);
	
	var mapping = function(pt) {
		return [
			pt[1]*SIN(pt[0]),
			pt[1]*COS(pt[0]),
		 	pt[2]
		];
	};

	var mapped = MAP(mapping)(dominio);
	return mapped;

	//DRAW(mapped);
	//COLOR(color)(mapped);

};

//BASE DI CILINDRI SFERICA
var drawGrigliaSfericaDiCilindri = function(r,numCil,h){
	r = r || 11;
	numCil = numCil || 8;
	h = h || 20;

	var cilindro = cilindroPieno(1,h);
	var angolo = (2 * PI)/numCil;
	var columns = [];

	for (var i = 0; i < numCil; i++) {
		var trasl = i * angolo;
		columns.push(T([0,1]) ([r*COS(trasl), r*SIN(trasl)]) (cilindro));
	}
	
	var colonnato = STRUCT(columns);
	return colonnato;	
	//DRAW(colonnato);
};

var drawPantheon = function(){
	var dome = drawSolidDome(10,1,2);
	var finalDome = T([2])([20])(dome);
	DRAW(finalDome);
	drawGrigliaSfericaDiCilindri();
}


//PROVA DI BASE
var testBase = function() {

	var base = STRUCT([cilindroPieno(10,0.25),T([2])([0.25]),
		cilindroPieno(9.8,0.25),T([2])([0.25]),
		cilindroPieno(9.6,0.25),T([2])([0.25]),
		cilindroPieno(9.4,0.25),T([2])([0.25]),
		cilindroPieno(9.2,0.25)]);


	var anelloDiCubi = function (raggio,numCubi,lunghezza,altezza){
		
		var raggio = raggio || 10;
		var numCubi = numCubi || 10;
		var lunghezza = lunghezza || 3;
		var altezza = altezza || 1;

		var domino = SIMPLEX_GRID([
					REPLICA(10)([1,-3]), 
					[-9.2,0.8], 
					[-0.25, 1]
					]);

		var mapping = function(p) {
			var u = p[0];
			var v = p[1];
			var w = p[2];

			var angolo = (p[0]*2*PI)/40;

			return [
				v * SIN(angolo),
				v * COS(angolo),
				w
			];
		};

		return cubiRigirati = MAP(mapping)(domino);
	};

		var baseFiga = STRUCT([base,anelloDiCubi()]);
		DRAW(baseFiga);

		return baseFiga;
};


//SEMI-SCHIFO
var semiSchifo = function(){
	DRAW(testBase());
	var dome = drawSolidDome(6,1,2);
	dome = T([2])([1.25+5])(dome);
	dome = COLOR([1,1,1])(dome);
	DRAW(dome);
	var colon = T([2])([1.25])(drawGrigliaSfericaDiCilindri(7,10,5));
	DRAW(colon);
};