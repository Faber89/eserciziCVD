
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

//MAP - MAPPA UNA FUNZIONE E NE ALTERA IL DOMINIO
//DOMAIN - ACCETTA UNA LISTA DI COPPIE CHE INDICANO L'INIZIO E LA FINE DEL NOSTRO INTERVALLO 
//RITORNA UNA FUNZIONE CHE VUOLE LA LISTA DELLA DIVISIONE DEGLI INTERVALLI
var domain = DOMAIN([[1,5]])([4]);
DRAW(domain);

HIDE(domain);

var domain = DOMAIN([[1.5,5.5]])([4]);
DRAW(domain);

HIDE(domain);

var domain1 = DOMAIN([[1.5,5.5],[1,3]])([4,2]);
DRAW(domain1);

HIDE(domain1);

var domain2 = DOMAIN([[1.5,5.5],[1,3],[0,1]])([4,2,1]);
DRAW(domain2);

HIDE(domain2);

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

//BISETTRICE DEL PRIMO QUADRANTE
var bisettrice = function(p){
	var u = p[0];
	return [u,u];
};
var mapped = MAP(bisettrice)(domain3);
DRAW(mapped);

//COLOR([R,G,B])(model) - PER COLORARE IL MODELLO model
COLOR([0,0,0])(mapped)

HIDE(mapped);


//FUNZIONE SINUSOIDALE
var domain4 = DOMAIN([[0,2*PI]])([20]);
var sinusoide = function(p){
	var u = p[0];
	return [u,SIN(u)];
};
var mapped = MAP(sinusoide)(domain4);
DRAW(mapped);

COLOR([0,0,0])(mapped);

HIDE(mapped);

//CIRCONFERENZA

var drawCircle = function(r,n){

	var domain = DOMAIN([[0,2*PI]])([n]);

	var cerchio = function(p){
		var u = p[0];
		return [r*Math.cos(u),
		r*Math.sin(u)
		];
	};

	var mapped = MAP(cerchio)(domain);

	DRAW(mapped);
	COLOR([0,0,0])(mapped);

};

//CILINDRO

var drawCilinder = function(r,h,n,m,color){
	r = r || 1;
	h = h || 1;
	n = n || 36*2;
	m = m || 36;
	color = color || [0,1,0];

	var domain = DOMAIN([[0,2*PI],[0,h]])([n,m]);

	var cilindro = function(p){
		var u = p[0]; 
		var v = p[1]; 

		return [
		r*Math.cos(u),
		r*Math.sin(u),
		v
		];
	};

	var mapped = MAP(cilindro)(domain);

	DRAW(mapped);
	COLOR(color)(mapped);

};

//SFERA CENTRATA NELL'ORIGINE 
var drawSfera = function (r,n,m,color) {  
	r = r || 1;
  n = n || 36;
  m = m || 74;
  color = color || [1,0,0];

  var domain = DOMAIN([[0,PI], [0,2*PI]])([n,n*2]);
  var mapping = function (p) {
    var u = p[0];
    var v = p[1];

    return [
      r * SIN(u) * COS(v),
      r * SIN(u) * SIN(v),
      r * COS(u)
    ];
  };
  
  var mapped =  MAP(mapping)(domain);
  DRAW(mapped);
	COLOR(color)(mapped);
};


//FUNZIONE CHE DISEGNA UN CUBO TRASLATO NELL'ORIGINE
var drawCuboTraslato = function(r,color) {
  var newRaggio = r || 1;
  var newColor = color || [1,0,0];
  var spigolo = newRaggio * (2/Math.sqrt(3));
  var halfSpigolo = spigolo/2;
  
  /*
	TRANSLATE(array id delle dimensioni)(array dei valori di traslazione)(modello da translare)
	clona il modello da translare, lo transla e lo ritorna!!!
  */
  var cuboDisegna = TRANSLATE([0,1,2])([-halfSpigolo,-halfSpigolo,-halfSpigolo])(CUBOID([spigolo,spigolo,spigolo]));
  
  DRAW(cuboDisegna);
  COLOR(newColor)(cuboDisegna);
  
  return cuboDisegna;
};


/* DISEGNA UN TOROIDE */

var drawToro = function (rInterno, rEsterno, n,m,color) {
	rInterno = rInterno || 1;
	rEsterno = rEsterno || 5;
	n = n || 36;
	m = m || 36*2;
	color = color || [1,0,0];

	var dominioToro = DOMAIN([[0,2*PI],[0,2*PI]])([n,m]);
	var mappingToro = function(p) {
		var u = p[0];
		var v = p[1];
		return [(rEsterno + rInterno*COS(v))*COS(u), (rEsterno + rInterno*COS(v))*SIN(u), rInterno*SIN(v)];
	};

	var mappedToro = MAP(mappingToro)(dominioToro);
	DRAW(mappedToro);
	COLOR(color)(mappedToro);

	return mappedToro;	
};

/* DISEGNA UN TOROIDE DA UN CILINDRO ESISTENTE

var drawToroFromCilindro = function (modelloCilindro, rEsterno, n, color) {
	modelloCilindro = modelloCilindro || drawCilinder();
	rEsterno = rEsterno || 5;
	n = n || 36;
	color = color || [1,0,0];

	var mappingToro = function(p) {
		var u = p[0];
		var v = p[1];
		var w = p[2];
		return [(u+rEsterno)*SIN(w*4), (v+rEsterno)*COS(w*4), rEsterno*SIN(v)];
	};

	var mappedToro = MAP(mappingToro)(modelloCilindro);
	DRAW(mappedToro);
	COLOR(color)(mappedToro);
	
	return mappedToro;	
};

*/

/* DISEGNA UN CONO */

var drawCono = function(r,h,n,m,color) {
	r = r || 1;
	h = h || 1;
	n = n || 36;
	m = m || 36*2;
	color = color || [1,0,0];

	var dominioCircle = DOMAIN([[0,2*PI],[0,h]])([n,m]);

	var mappingCircle = function(p) {
		var u = p[0];
		var v = p[1];
		return [r * COS(u) * ((h-v)/h), r * SIN(u) * ((h-v)/h), v];
	};

	var mappedCircle = MAP(mappingCircle)(dominioCircle);
	DRAW(mappedCircle);
	COLOR(color)(mappedCircle);

	return mappedCircle;
};


/*
 * SIMPLEXN
*/

//DISEGNO UN QUADRATO UTILIZZANDO SIMPLICIALCOMPLEX

var quad = new SIMPLICIALCOMPLEX([[0,0],[1,0],[1,1],[0,1]])([[0,1,3],[1,2,3]]);

DRAW(quad);

// RIDEFINIZIONE DI SIMPLEXGRID
SIMPLEXGRID = function (quotes) {
    return p.simplexGrid(quotes);
};

HIDE(quad);

//POSSO PRENDERE UNO SCHELETRO DEL QUADRATO
DRAW(SKELETON(1)(quad));

//SIMPLEXGRID - UNA GRIGLIA DI SIMPLESSI CONCATENATI
//LINEE SPEZZATE - 1SIMPLESSO -1SIMPLESSO +1SIMPLESSO ECC..
DRAW(SIMPLEXGRID([[1,-1, 1, -1, 1]]))

//STRISCIA DI LINEE - REPLICA RESTITUISCE UN'ARRAY CON GLI ELEMENTI PASSATI COME PARAMETRO REPLICATI N VOLTE
DRAW(SIMPLEXGRID([REPLICA(10)([1,-1])]))

//QUADRATO
DRAW(SIMPLEXGRID([[1],[1]]))

//STRISCIA DI QUADRATI
DRAW(SIMPLEXGRID([REPLICA(10)([[1],[1]])]))

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
SIMPLEXGRID( [REPLICA(10)([1,-1]), REPLICA(10)([1,-1]), REPLICA(10)([1,-1])] )

// oppure
SIMPLEXGRID( REPEAT(3)(REPLICA(10)([1,-1])) )

// SCHELETRO DEL CUBO 3D ???
quad10 = SKELETON(3)(SIMPLEXGRID( REPEAT(3)(REPLICA(10)([1,-1])) ));

// TETRAEDO UNITARIO

var tetra = SIMPLICIALCOMPLEX([[0,0,1],[1,0,0],[0,1,0],[1,1,1]])([[0,1,2,3]]);

DRAW(tetra)

// Tetraedro centrato nell'origine inscrivibile in una sfera di raggio r
var drawTetraedro = function(r, color) {
  r = r || 1;
  color = color || [0,0,1];

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


//ICOSAEDRO

