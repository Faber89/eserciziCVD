/*
 * CURVE DI HERMITE - Lu curva è forzata ad avere estremi p1, p2
 * con tangenti estreme assegnate s1 e s2 nell'intervallo u app. [0,1]
 */
var drawHermite = function(intervals,cp){
	var intervals = intervals || 20;
	var controlpoints = cp || [[1,0],[1,1],[1,0],[1,1]];

	var poly = COLOR([0,1,1])(POLYLINE([controlpoints[0],controlpoints[1]]));

	var domain = INTERVALS(1)(intervals);

	var curveMapping = CUBIC_HERMITE(S0)(controlpoints);
	var curve = MAP(curveMapping)(domain);
	DRAW(curve);
	DRAW(poly);

	//Disegno i punti di controllo
	var points = SIMPLICIAL_COMPLEX(controlpoints)([[0],[1]]);
	DRAW(points);

}

//ESEMPI - 1
drawHermite();
drawHermite(40,[[1,0],[1,1],[1,0],[1,0]]);
drawHermite(40,[[1,0],[1,1],[1,0],[10,0]]);
drawHermite(20,[[1,0],[1,1],[2,2],[2,1]]);
drawHermite(40,[[0,0],[10,0],[0,10],[10,10]]);

//ESEMPI - 2
drawHermite(40,[[0,0],[10,-1],[-100,100],[10,-10]]);
drawHermite(40,[[0,0],[10,-1],[1,-1],[10,-10]]);
drawHermite(40,[[0,0],[10,-1],[10,-10],[10,-10]]);
drawHermite(40,[[0,0],[10,-1],[20,-20],[10,-10]]);
drawHermite(40,[[0,0],[10,-1],[40,-40],[10,-10]]);


/*
 * CURVE DI BEZIER - una tale curva interpola i due punti di controllo estremi
 * e approssima i rimanenti due punti 
 */
 var drawBezier = function(intervals,cp){
	var intervals = intervals || 20;
	var controlpoints = cp || [[0,0],[1,0],[0,1],[1,1]];

	var poly = COLOR([0,1,1])(POLYLINE(controlpoints));

	var domain = INTERVALS(1)(intervals);

	var curveMapping = BEZIER(S0)(controlpoints);
	var curve = MAP(curveMapping)(domain);
	DRAW(curve);
	DRAW(poly);

	//Disegno i punti di controllo
	var points = SIMPLICIAL_COMPLEX(controlpoints)([[0],[1],[2],[3]]);
	DRAW(points);
}

//ESERCIZI - 1
drawBezier();
drawBezier(40,[[0,0],[1,-10],[5,20],[10,0]]);
drawBezier(40,[[0,0],[5,20],[1,-10],[10,0]]);


/*
 * SPLINE CARDINALI CUBICHE - Sono curve composite che interpola una sequenza di punti di controllo
 * escludendo il primo e il secondo (bisogna specificarli 2 volte per far si che vengano disegnati)
 * Il parametro h specifica la lunghezza della tangente ai punti. Influenza la "stondatura" delle curve. Default = 1
 */
 var drawCubicSpline = function(intervals,h,cp){
	var intervals = intervals || 20;
	var controlpoints = cp || [[0,0],[3,2],[4,-1],[7,3],[9,0],[11,1],[12,0]];
	var h = h || 1; 
	
	var poly = COLOR([0,1,1])(POLYLINE(controlpoints));

	var domain = INTERVALS(1)(intervals);
	var splineCardinal = SPLINE(CUBIC_CARDINAL(domain,h))(controlpoints);
	
	DRAW(splineCardinal);
	DRAW(poly);
}

drawCubicSpline();
drawCubicSpline(40,1,[[-3,6],[-4,2],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3]]);
// Disegno approssimato della &
drawCubicSpline(50,0.4,[[9,3],[9,3],[5,0],[2,2],
	[5,4],[6,6],[6,8],[5,9],[4,8],[4,6],[5,4],
	[9,0],[9,0]]);


/*
 * B-SPLINE UNIFORMI CUBICHE - Sono curve che approssimano una serie di punti dati, obbligata a passare
 * per i suoi punti estremi. Come prima la spline non è definita negli intervalli p0 p1 e pm-1 pm.
 * per costringerla a farla passare per alcuni dei suoi punti occorre scriverli 3 volte.
 */
 var drawUniformBSpline = function(intervals,h,cp){
	var intervals = intervals || 20;
	var controlpoints = cp || [[-3,6],[-4,2],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3]];
	var h = h || 1; // imposta lunghezza della tangente ai punti.... influenza la "stondatura" delle curve. Default = 1
	var poly = COLOR([0,1,1])(POLYLINE(controlpoints));

	var domain = INTERVALS(1)(intervals);
	var splineCardinal = SPLINE(CUBIC_UBSPLINE(domain,h))(controlpoints);
	
	DRAW(splineCardinal);
	DRAW(poly);

	//Disegno i punti di controllo
	var points = SIMPLICIAL_COMPLEX(controlpoints)([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]]);
	DRAW(points);
}

drawUniformBSpline();
drawUniformBSpline(40,1,[[-3,6],[-4,2],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3]]);
drawUniformBSpline(40,1,[[-3,6],[-3,6],[-4,2],[-3,-1],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3],[2,-3]]);
drawUniformBSpline(40,1,[[-3,6],[-3,6],[-4,2],[-3,-1],[-3,-1],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3],[2,-3]]);

/*
 * SEGMENTO DI CURVA CUBICA
 * 
+### `NUBSLINE(degree)(knots)(controls)`
+Non-uniform B-Spline.
+#### I/O
+> #### in
+> `Number` `degree`: spline degree.
+> `Number` `[totpoints=80]`: total number of spline's points.
+> #### out
+> `Function`: an anonymous function.
+> > #### in
+> > `Array` `knots`: Array of integer describing spline's knots.
+> > #### out
+> > `Function`: an anonymous function.
+> > > #### in
+> > > `Array` `controls`: Array of integer describing spline's control points.
+> > > #### out
+> > > `plasm.Model`: non uniform spline.
 */

var drawNubspline = function(degree, knots, controls){
	var controls = controls || [[0,0],[-1,2],[1,4],[2,3],[1,1],[1,2],[2.5,1],[2.5,3],[4,4],[5,0]];
	var knots = knots || [0,0,0,0,1,2,3,4,5,6,7,7,7,7];
	var degree = degree || 3;

	var poly = COLOR([0,1,1])(POLYLINE(controls));

	// punti di controllo
	var listaDfacce = [];
	controls.forEach( function(v,i) { listaDfacce.push([i]); } );
	DRAW(COLOR([0.1,0.6,0.2])( SIMPLICIAL_COMPLEX(controls)(listaDfacce) ) );

	var nubspline = NUBSPLINE(3)(knots)(controls);
	DRAW(nubspline);
	DRAW(poly);
}

var controls = [[0,0],[-1,2],[1,4],[2,3],[1,1],[1,2],[2.5,1],[2.5,3],[4,4],[5,0]];
var knots = [0,0,0,0,1,2,3,4,5,6,7,7,7,7];
	
var nubspline = NUBSPLINE(3)(knots)(controls);

DRAW(nubspline);
/*

+### `NURBSLINE(degree)(knots)(controls)`
 	 624	
+
 	 625	
+Non-uniform Rational B-Spline.
 	 626	
+
 	 627	
+#### I/O
 	 628	
+
 	 629	
+> #### in
 	 630	
+> `Number` `degree`: spline degree.
 	 631	
+> `Number` `[totpoints=80]`: total number of spline's points.
 	 632	
+> 
 	 633	
+> #### out
 	 634	
+> `Function`: an anonymous function.
 	 635	
+> 
 	 636	
+> > #### in
 	 637	
+> > `Array` `knots`: Array of integer describing spline's knots.
 	 638	
+> >
 	 639	
+> > #### out
 	 640	
+> > `Function`: an anonymous function.
 	 641	
+> >
 	 642	
+> > > #### in
 	 643	
+> > > `Array` `controls`: Array of integer describing spline's control points.
 	 644	
+> > >
 	 645	
+> > > #### out
 	 646	
+> > > `plasm.Model`: non uniform rational spline.
 	 647	
+
 	 648	
+#### Example
 	 649	
+
 	 650	
+> ```js
 	 651	

 	 656	
+> ```
 	 657	
+
 	 658	
+- - -
 	 659	
+
*/
var _p = Math.sqrt(2)/2.0;
var controls = [[-1,0,1], [-_p,_p,_p], [0,1,1], [_p,_p,_p],[1,0,1], [_p,-_p,_p], [0,-1,1], [-_p,-_p,_p], [-1,0,1]];
var knots = [0,0,0,1,1,2,2,3,3,4,4,4];
var nurbs = NURBSPLINE(2)(knots)(controls);
DRAW(nurbs);

/*
 * SURFACES
 */

//PROD1X1
var a = POLYLINE([[1],[3],[4]]);
var b = POLYLINE([[2.2],[3.5],[7.8],[9.0]]);
var axb = PROD1x1([a,b]);
var struct = STRUCT([axb, SKELETON(1)(axb)]);

//PROD1X2
var a = POLYLINE([[1],[3],[4]]);
var b = POLYLINE([[0,2],[1,1],[2,1],[3,0]]);
var axb = PROD1x2([a,b]);
DRAW(STRUCT([axb, SKELETON(1)(axb)]));

//PROD2X1
var a = POLYLINE([[1],[3],[4]]);
var b = POLYLINE([[0,2],[1,1],[2,1],[3,0]]);
var bxa = PROD2x1([b,a]);
DRAW(STRUCT([bxa, SKELETON(1)(bxa)]));


//SUPERFICI CON CURVE DI BEZIER
var domain = INTERVALS(1)(32);
var controlpoints = [[-0,0],[1,0],[1,1],[2,1],[3,1]];
var curveMapping = BEZIER(S0)(controlpoints);
var curve = MAP(curveMapping)(domain);
DRAW(curve);
var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
var c0 = BEZIER(S0)([[0,0,0],[10,0,0]]);
DRAW(MAP(c0)(INTERVALS(1)(32)))
var c1 = BEZIER(S0)([[0,2,0],[8,3,0],[9,2,0]]);
DRAW(MAP(c1)(INTERVALS(1)(32)))
var c2 = BEZIER(S0)([[0,4,1],[7,5,-1],[8,5,1],[12,4,0]]);
DRAW(MAP(c2)(INTERVALS(1)(32)))
var c3 = BEZIER(S0)([[0,6,0],[9,6,3],[10,6,-1]]);
DRAW(MAP(c3)(INTERVALS(1)(32)))
var out = MAP(BEZIER(S1)([c0,c1,c2,c3]))(domain);
DRAW(COLOR([1,0,0,0.5])(out));

//SUPERFICI CON CUBIC_HERMITE
var domain = INTERVALS(1)(20);
var controlpoints = [[1,0],[1,1],[ -1, 1],[ 1,0]];
var curveMapping = CUBIC_HERMITE(S0)(controlpoints);
var curve = MAP(curveMapping)(domain);
DRAW(curve);
var domain = PROD1x1([INTERVALS(1)(14),INTERVALS(1)(14)]);
var c1 = CUBIC_HERMITE(S0)([[1,0,0],[0,1,0],[0,3,0],[-3,0,0]]);
DRAW(MAP(c1)(INTERVALS(1)(20)))
var c2 = CUBIC_HERMITE(S0)([[0.5,0,0],[0,0.5,0],[0,1,0],[-1,0,0]]);
DRAW(MAP(c2)(INTERVALS(1)(20)))
var sur3 = CUBIC_HERMITE(S1)([c1,c2,[1,1,1],[-1,-1,-1]]);
var out = MAP(sur3)(domain);
DRAW(COLOR([1,0,0,0.5])(out));

//PROVA DI VASO
var domain = PROD1x1([INTERVALS(1)(14),INTERVALS(1)(14)]);
var c1 = CUBIC_HERMITE(S0)([[2,0.5,0],[1.5,3.5,0],[-5,1,0],[-3,1,0]]);
DRAW(MAP(c1)(INTERVALS(1)(20)));
var c2 = CUBIC_HERMITE(S0)([[2,0.5,0],[2.5,3.5,0],[5,1,0],[3,1,0]]);
DRAW(MAP(c2)(INTERVALS(1)(20)));
var sur3 = CUBIC_HERMITE(S1)([c1,c2,[0,0,2],[0,0,-2]]);
var mapped =  MAP(sur3)(domain);
DRAW(COLOR([1,0,0,0.5])(mapped));
var sur3 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-2],[0,0,2]]);
var mapped =  MAP(sur3)(domain);
DRAW(COLOR([1,0,0,0.5])(mapped));


