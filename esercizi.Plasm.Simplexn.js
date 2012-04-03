/*
 * ESERCIZI SU PLASM 
 */

//DEFINISCO UN CUBO
var cuboUnitario = CUBOID([1,1,1]);

//DISEGNO IL CUBO
DRAW(cuboUnitario);

//PER NASCONDERE IL CUBO
HIDE(cuboUnitario);

//SHOW - VISUALIZZA GLI OGGETTI CHE ABBIAMO NASCOSTO
//SHOW(model);

//DOMAIN - ACCETTA UNA LISTA DI COPPIE CHE INDICANO L'INIZIO E LA FINE DEL NOSTRO INTERVALLO 
//RITORNA UNA FUNZIONE CHE VUOLE LA LISTA DELLA DIVISIONE DEGLI INTERVALLI
var domain = DOMAIN([[1,5]])([4]);
DRAW(domain);

HIDE(domain);

var domain = DOMAIN([[1.5,5.5]])([4]);
DRAW(domain);

HIDE(domain);

//DISEGNA UNA LINEA
var drawLine = function(start,end,n,color){

	start = start || 0;
	end = end || 1;
	n = n || 10;
	color = color || [0,0,0];

	var domain = DOMAIN([[start,end]])([n]);
	DRAW(domain);
	COLOR(color)(domain);

};


var domain1 = DOMAIN([[1.5,5.5],[1,3]])([4,2]);
DRAW(domain1);

HIDE(domain1);

//DISEGNA UN PIANO
var drawPlan = function(domain,n,m,color){

	n = n || 10;
	color = color || [0,1,0];
	domain = [[0,1],[0,1]]

	var domain = DOMAIN(domain)([n,n]);
	DRAW(domain);
	COLOR(color)(domain);

};


var domain2 = DOMAIN([[1.5,5.5],[1,3],[0,1]])([4,2,1]);
DRAW(domain2);

HIDE(domain2);

//DISEGNA UN CUBO
var drawCube = function(domain,n,color){

	n = n || 10;
	color = color || [0,1,0];
	domain = [[0,1],[0,1],[0,1]]

	var domain = DOMAIN(domain)([n,n,n]);
	DRAW(domain);
	COLOR(color)(domain);

};


//MAP - MAPPA UNA FUNZIONE E NE ALTERA IL DOMINIO
//FUNZIONE MAP - UNA FUNZIONE DI ORDINE SUPERIORE CHE ACCETTA UNA FUNZIONE DI MAPPING CHE ACCETTA UN DOMINIO 
//MAP(mapping)(domain)
//INIZIAMO CON UN DOMINIO MONODIMENSIONALE IN 10 INTERVALLI DELL'INTERVALLO 0..1


var domain3 = DOMAIN([[0,10]])([10]);
var mapping = function(p){
	var u = p[0];
	return [u,1];
};
var mapped = MAP(mapping)(domain3);
DRAW(mapped);

HIDE(mapped);



//DISEGNA UNA BISETTRICE DEL PRIMO QUADRANTE
var drawBisettrice = function(start,end,n,color){

	start = start || 0;
	end = end || 1;
	n = n || 10;
	color = color || [0,0,0];

	var mapping = function(p){
		var u = p[0];
		return [u,u];
	};


	var domain = DOMAIN([[start,end]])([n]);
	var mapped = MAP(mapping)(domain);

	DRAW(mapped);
	COLOR(color)(mapped);

};


//DISEGNA UNA SINUSOIDE
var drawSinusoide = function(start,end,n,color){

	start = start || 0;
	end = end || 2;
	n = n || (end-start)*20;
	color = color || [0,0,0];

	var mapping = function(p){
		var u = p[0];
		return [u,SIN(u)];
	};


	var domain = DOMAIN([[start*PI,end*PI]])([n]);
	var mapped = MAP(mapping)(domain);

	DRAW(mapped);
	COLOR(color)(mapped);

};

//CIRCONFERENZA CON CENTRO NELL'ORIGINE

var drawCircle = function(r,color){

	r = r || 1;
	color = color || [0,0,0];

	var domain = DOMAIN([[0,2*PI]])([r*15]);

	var mapping = function(p){
		var u = p[0];
		return [
		r*Math.cos(u),
		r*Math.sin(u)
		];
	};

	var mapped = MAP(mapping)(domain);

	DRAW(mapped);
	COLOR(color)(mapped);

};

//SFERA CON CENTRO NELL'ORIGINE
var drawSfera = function(r,color){

	r = r || 1;
	color = color || [0,1,0];

	var domain = DOMAIN([[0,PI],[0,2*PI]])([r*40,r*60]);

	var mapping = function(p){
		var u = p[0];
		var v = p[1];

		return [
		r*SIN(u)*COS(v),
		r*SIN(u)*SIN(v),
		r*COS(u)
		];
	};

	var mapped = MAP(mapping)(domain);

	DRAW(mapped);
	COLOR(color)(mapped);

};

//CILINDRO

var drawCilinder = function(r,h,n,color){

	r = r || 1;
	h = h || 2;
	n = n || r*20;

	var domain = DOMAIN([[0,2*PI],[0,h]])([n,n]);

	var cilindro = function(p){
		var u = p[0];
		var v = p[1]; 

		return [r*Math.cos(u),r*Math.sin(u), v];
	};

	var mapped = MAP(cilindro)(domain);

	DRAW(mapped);
	COLOR(color)(mapped);
};

//CUBO CENTRATO NELLO'ORIGINE
var drawCube = function(l,n,color){
	
	l = l || 1;
	n = n || l;	
	halfl = (l/2);
	alert(halfl);

	color = color || [0,1,0];

	domain = [[-halfl,halfl],[-halfl,halfl],[-halfl,halfl]];

	var domain = DOMAIN(domain)([n,n,n]);
	DRAW(domain);
	COLOR(color)(domain);

};

//OPPURE TRAMITE LA FUNZIONE TRANSLATE/T E CUBOID
/*
 *TRANSLATE(array id delle dimensioni)(array dei valori di traslazione)(modello da translare)
 *clona il modello da translare, lo transla e lo ritorna!!!
*/

var drawCube = function(l,color) {

  var l = l || 1;
  var color = color || [0,1,0];
  var halfl = l/2;
  
  var cubo = TRANSLATE([0,1,2])([-halfl,-halfl,-halfl])(CUBOID([l,l,l]));
  
  DRAW(cubo);
  COLOR(color)(cubo);
  
};

//CONO
var drawCono = function(r,h,color) {
	r = r || 1;
	h = h || 2;
	n = r*30;
	m = n*2;
	color = color || [0,1,0];

	var domain = DOMAIN([[0,2*PI],[0,h]])([n,m]);

	var mapping = function(p) {
		var u = p[0];
		var v = p[1];
		return [
		r * ((h-v)/h) * COS(u), 
		r * ((h-v)/h) * SIN(u), 
		v
		];
	};

	var mapped = MAP(mapping)(domain);

	DRAW(mapped);
	COLOR(color)(mapped);

};

//DISEGNA UN TOROIDE

var drawToro = function (rInterno, rEsterno, color) {
	rInterno = rInterno || 1;
	rEsterno = rEsterno || 2;

	n = rInterno*40;
	m = rEsterno*20;

	color = color || [0,1,0];

	var domain = DOMAIN([[0,2*PI],[0,2*PI]])([n,m]);

	var mapping = function(p) {
		var u = p[0];
		var v = p[1];

		return [
		(rEsterno + rInterno*COS(v))*COS(u),
		(rEsterno + rInterno*COS(v))*SIN(u),
		rInterno*SIN(v)
		];
	};

	var mapped = MAP(mapping)(domain);
	DRAW(mapped);
	COLOR(color)(mapped);
	
};

//MEZZA SFERA
var drawHalfSphere = function(r,color){

	r = r || 1;
	color = color || [0,1,0];

	var domain = DOMAIN([[0,PI/2],[0,2*PI]])([r*40,r*60]);

	var mapping = function(p){
		var u = p[0];
		var v = p[1];

		return [
		r*SIN(u)*COS(v),
		r*SIN(u)*SIN(v),
		r*COS(u)
		];
	};

	var mapped = MAP(mapping)(domain);

	DRAW(mapped);
	COLOR(color)(mapped);
};


//CONO CON DUE RAGGI CENTRATO NELL'ORIGINE
var drawCono = function(rInf,rSup,h,color){

	rSup = rSup || 1;
	rInf = rInf || 2;
	h = h || 2;
	n = (rInf+rSup)*10;
	color = color || [0,1,0];

	var domain = DOMAIN([[0,2*PI],[0,h]])([n,n]);

	var mapping = function(p) {
		var u = p[0];
		var v = p[1];
		return [
		((rInf - rInf*(v/h) + rSup*(v/h))) * COS(u), 
		((rInf - rInf*(v/h) + rSup*(v/h))) * SIN(u), 
		v
		];
	};

	var mapped = MAP(mapping)(domain);

	DRAW(mapped);
	COLOR(color)(mapped);
};

//CUPOLA
var drawDome = function(rInf,rSup,color){
	rSup = rSup || 1;
	rInf = rInf || 2;
	n = (rInf+rSup)*10;
	color = color || [0,1,0];

	var startDomain = Math.asin(rSup/rInf);

	var domain = DOMAIN([[startDomain,PI/2],[0,2*PI]])([n,n]);

	var mapping = function(p){
		var u = p[0];
		var v = p[1];

		return [
		rInf*SIN(u)*COS(v),
		rInf*SIN(u)*SIN(v),
		rInf*COS(u)
		];
	};

	var mapped = MAP(mapping)(domain);

	DRAW(mapped);
	COLOR(color)(mapped);
};

/*
 * SIMPLEXN
*/

//SIMPLICIALCOMPLEX - 
//DISEGNO UN QUADRATO UTILIZZANDO SIMPLICIALCOMPLEX
//CENTRATO NELL'ORIGINE
var drawQuad = function(l){

	var l = l || 1;

	var quad = new SIMPLICIALCOMPLEX
		([[0,0],[l,0],[l,l],[0,l]])
		([[0,1,3],[1,2,3]]);

	var quadT = T([0,1])([-l/2,-l/2])(quad);

	DRAW(quadT);
};

var quad = new SIMPLICIALCOMPLEX([[0,0],[1,0],[1,1],[0,1]])([[0,1,3],[1,2,3]]);

DRAW(quad);

HIDE(quad);

//POSSO PRENDERE UNO SCHELETRO DEL QUADRATO
DRAW(SKELETON(1)(quad));

// RIDEFINIZIONE DI SIMPLEXGRID
//SIMPLEXGRID - UNA GRIGLIA DI SIMPLESSI CONCATENATI
//LINEE SPEZZATE - 1SIMPLESSO -1SIMPLESSO +1SIMPLESSO ECC..

SIMPLEXGRID = function (quotes) {
    return p.simplexGrid(quotes);
};

//REPLICA(N)(VALORE) - RESTITUISCE UN'ARRAY DEL VALORE REPLICATO N VOLTE
//FA IL CONCAT DEL VALORE SU UN NUOVO ARRAY DI DIMENSIONE N
//DISEGNA UNA LINEA SPEZZATA CHE PARTE DALL'ORIGINE
var lineaSpezzata = function(l,spazio,lunghezza){

	l = l || 1;
	spazio = -spazio || -1;
	lunghezza = lunghezza || 3;

	return SIMPLEXGRID([REPLICA(lunghezza)([l,spazio])]);
}

DRAW(lineaSpezzata(1,1,9));

//STRISCIA DI LINEE O LINEA SPEZZATA
DRAW(SIMPLEXGRID([REPLICA(10)([1,-1])]));

//QUADRATO
DRAW(SIMPLEXGRID([[1],[1]]));

//CUBO
DRAW(SIMPLEXGRID([[1],[1],[1]]))

//STRISCIA DI QUADRATI
//STRUCT - MERGIA N MODELLI
//T - TRANSLA IL MODELLO model NELLA DIMENSIONE dims (può essere specificato un'array) DI values
//T(dims)(values)(model)
var quad10 = STRUCT(REPLICA(10)([quad,T([1])([2])]));
DRAW(quad10);

//PIANO DI QUADRATI
DRAW(SIMPLEXGRID( [REPLICA(10)([1,-1]), REPLICA(10)([1,-1])] ))

//PIANO
DRAW(SIMPLEXGRID([[20],[20]]))

// CUBO..3d cubi su tutto
DRAW(SIMPLEXGRID( [REPLICA(10)([1,-1]), REPLICA(10)([1,-1]), REPLICA(10)([1,-1])] ))

// oppure
DRAW(SIMPLEXGRID( REPEAT(3)(REPLICA(10)([1,-1])) ))

// SCHELETRO DEL CUBO 3D ???
var quad10 = SKELETON(3)(SIMPLEXGRID( REPEAT(3)(REPLICA(10)([1,-1])) ));

// TETRAEDO UNITARIO

var drawTetra = function(){
	var tetra = SIMPLICIALCOMPLEX([[0,0,1],[1,0,0],[0,1,0],[1,1,1]])([[0,1,2,3]]);

	DRAW(tetra);
}

//TETRAEDO UNITARIO CENTRATO NELL'ORIGINE
//INSCRIVIBILE IN UNA SFERA DI RAGGIO R 
var drawTetraedro = function(r, color) {

  r = r || 1;
  color = color || [0,1,0];

  var lSpigolo = r*SQRT(8/3);
  var primoVertice = [0,0,r];
  var vAltezza = [0,0,r * (-1) * (1/3)];

  var baseUno = [vAltezza[0], vAltezza[1] + (lSpigolo/SQRT(3)), vAltezza[2]];
  var baseDue = [vAltezza[0] + (lSpigolo/2), vAltezza[1] - (lSpigolo/(2*SQRT(3))), vAltezza[2]];
  var baseTre = [vAltezza[0] - (lSpigolo/2), vAltezza[1] - (lSpigolo/(2*SQRT(3))), vAltezza[2]];


  var modelTetraedro = SIMPLICIALCOMPLEX([primoVertice,baseUno,baseDue,baseTre])([[0,1,2,3]]);
  DRAW(modelTetraedro);
  COLOR(color)(modelTetraedro);

  return modelTetraedro;
};


//OTTAEDRO
var drawOttaedro = function(r, color) {

	r = r || 1;
	color = color || [0,1,0];

	var lSpigolo = r * SQRT(2);
	var listaVertici = [[0,0,r],[r,0,0],[0,r,0],[-r,0,0],[0,-r,0],[0,0,-r]];
	var listaFacce = [[0,1,2],[0,2,3],[0,3,4],[0,4,1],[2,1,5],[3,2,5],[4,3,5],[1,4,5]];

	var modelOttaedro = SIMPLICIALCOMPLEX(listaVertici)(listaFacce);
	DRAW(modelOttaedro);
	COLOR(color)(modelOttaedro);

	return modelOttaedro;
};

/*
//DODECAEDRO
var drawDodecaedro = function(r,color) {
	r = r || 1;
	color = color || [0,1,0];

	var listaVertici = [[0,0,r],[r,0,0],[0,r,0],[-r,0,0],[0,-r,0],[0,0,-r]];



};
*/

//ISOCAEDRO
var drawIcosaedro = function(r, color) {
	r = r || 1;
	color = color || [0,1,0];

	var spigolo = SQRT( 2*r*((1/2) - (SQRT(5)/10)) );
	var radiusE = 2 * r * SQRT(5) * (1/5);
	// var altezzaFromPolo = 2 * r * ((1/2) - (SQRT(5)/10));

	var poloNord = [0,0,r];
	var poloSud = [-poloNord[0], -poloNord[1], -poloNord[2]];

	var pentagonoNord = [];
	var pentagonoSud = [];
	var i = 0;

	for (i = 0; i < 5; i++) {
		// pentagonoNord[i] = [radiusE * COS( (PI/2) + i * ((2/5)*PI) ), radiusE * SIN( (PI/2) + i * ((2/5)*PI) ), poloNord[2] - altezzaFromPolo];
		pentagonoNord[i] = [radiusE * COS( (PI/2) + i * ((2/5)*PI) ), radiusE * SIN( (PI/2) + i * ((2/5)*PI) ), radiusE/2];
	}

	for (i = 0; i < 5; i++) {
		// pentagonoSud[i] = [radiusE * COS( ((2/3)*PI) + i * ((2/5)*PI) ), radiusE * SIN( ((2/3)*PI) + i * ((2/5)*PI) ), altezzaFromPolo + poloSud[2]];
		pentagonoSud[i] = [radiusE * COS( ((3/2)*PI) + i * ((2/5)*PI) ), radiusE * SIN( ((3/2)*PI) + i * ((2/5)*PI) ), -(radiusE/2)];
	}

	var listaVertici = [];
	listaVertici.push(poloNord);
	for (i = 0; i < 5; i++) { listaVertici.push(pentagonoNord[i]); }
	for (i = 0; i < 5; i++) { listaVertici.push(pentagonoSud[i]); }
	listaVertici.push(poloSud);

	var listaFacce = [[0,1,2],[0,2,3],[0,3,4],[0,4,5],[0,5,1],
					[9,1,8],[1,5,8],[8,5,7],[7,5,4],[7,4,6],[6,4,3],[6,3,10],[3,2,10],[10,2,9],[2,1,9],
					[6,11,7],[7,11,8],[8,11,9],[9,11,10],[10,11,6]];
	var isocaedroModel = SIMPLICIALCOMPLEX(listaVertici)(listaFacce);

	DRAW(isocaedroModel);
	COLOR(color)(isocaedroModel);

	return isocaedroModel;
};
