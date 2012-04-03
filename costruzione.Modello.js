//LEZIONE 02/04/12

var pillars = SIMPLEX_GRID([
	REPLICA(3)([0.15,-6*2.4,0.15]), //x
	[0.15,-6*2.4,0.15],//y
	[1.5,3,3]//z
	]);


var beams = SIMPLEX_GRID([
	REPLICA(3)([0.15,-6*2.4,0.15]), //x
	[14.7],//y - corrispondente alla somma di 0.15+6*2.4+0.15 
	[-7.5,1.5]//z
]);


//STRUCT // STRUTTURA -ASSEMBLIAMO INSIEME PIù OGGETTI GEOMETRICI
var building = STRUCT([pillars, beams]);
//COLOR VALORI COMPRESI TRA 0 E 1
var steelFrames = COLOR([0.2,0.2,0.2])(
	building);

DRAW(steelFrames);

//DISEGNAMO I SOLAI
var floors = SIMPLEX_GRID([
	REPLICA(3)([14.7]), //x
	[-0.15,14.4,-0.15],//y
	[-1.2,0.3,-2.7,0.3,-2.7,0.3]//z
	]);

DRAW(floors);

//DISEGNO LA SPORGENZA
var cantileverFloor = SIMPLEX_GRID([
	[0.15,2*2.4,0.15],//x
	[-0.15,14.4,-0.15],//y
	[-1.2,0.3,-2.7,0.3,-2.7,0.3]//z
	]);

var cantileverPillars = SIMPLEX_GRID([
	[0.15], //x
	[0.15,-14.4,0.15],//y
	[1.5,3,3]//z
	]);

var cantileverBeams = SIMPLEX_GRID([
	[0.15], //x
	[14.7],//y - corrispondente alla somma di 0.15+6*2.4+0.15 
	[-7.5,1.5]//z
	]);

var cantilever = STRUCT(
	[cantileverFloor,cantileverPillars,cantileverBeams]);

//COME POSSO RIBALTARLO RISPETTO L'ASSE Y?
//EFFETTUO UNA TRASFORMAZIONE DI SCALA CON DELLE MATRICI DI SCALA CHE DIFFERISCONO DALLA MATRICE IDENTITà
//PER I VALORI DELLA DIAGONALE PRINCIPALE... PER VALORI NEGATIVI, RIBALTO
var cantilever1 = T([0])([-0.15])(STRUCT(
	[T([0])([-0.15-2*2.4])(cantileverFloor),
	COLOR([0.2,0.2,0.2])(cantileverPillars),
	COLOR([0.2,0.2,0.2])(cantileverBeams)]));

var cantilever2 = T([0])([3*14.7])(cantilever);

var building = STRUCT([cantilever1,building,cantilever2]);

DRAW(building);

//STRUCT SI APPLICA AD UN'ARRAY CHE DEVE CONTENERE MODELLI E TRASFORMAZIONI(ROTAZIONI TRASLAZIONI)

//GRIGLIE DELL'EDIFICIO - GRIGLIE DI 1/3 DI MODULO
var grid1 = SIMPLEX_GRID([ [-0.15, 0.05, -2.3, 0.05], [0.15], [1.5,3,3] ]);
var grid2 = SIMPLEX_GRID([ [-0.15, -0.05, 2.3, -0.05], [0.15], [0.3, -0.9, 0.3,-2.95,0.05,-2.7,0.3] ]);
var grid3 = SIMPLEX_GRID([ [-0.15, -0.05, -1.125, 0.05, -1.125,  -0.05], [0.15], [-0.3, 0.9, -0.3, 2.95,0.05] ]);

//FINESTRE DI UN TERZO DI MODULO
var panel = SIMPLEX_GRID([ [-0.15, -0.05, 1.125, -0.05, 1.125,  -0.05], [-0.1,0.05], [-0.3, 0.9, -0.3, 2.95/2] ]);

//PANNELLI COLORATI
//UNIONE DEI GRID
var grid = COLOR([0.2,0.2,0.2])(STRUCT([grid1,grid2,grid3]));
//FUNZIONE CHE RITORNA LA GRIGLIA + I PANNELLI COLORATI
//GRID + PANEL
var frame = function(color) {return STRUCT([ COLOR(color)(panel), grid])};
//RITORNA UN GRUPPO DI FRAME 
var frameGroup = function(number,color) {
	return STRUCT( REPLICA(number)([ frame(color), T([0])([2.4]) ]))};

//DEFINISCE I GRUPPI DI FRAME DA INSERIRE NELLA STRUTTURA
var colors = [[1,0,0],[0,1,0],[0,0,1],[0,1,1],[1,0,1],[1,1,0]];
var frames = STRUCT([
	frameGroup(3,colors[0]), T([0])([3*2.4]),
	frameGroup(3,colors[1]), T([0])([3*2.4]), T([0])([0.3]),
	frameGroup(3,colors[2]), T([0])([3*2.4]),
	frameGroup(3,colors[3]), T([0])([3*2.4]), T([0])([0.3]),
	frameGroup(3,colors[4]), T([0])([3*2.4]),
	frameGroup(3,colors[5])
]);

var backFrames = T([1])([14.7])(S([1])([-1])(frames));

DRAW(STRUCT([ steelFrames,floors,cantilever1,cantilever2,frames,backFrames ]));
