class Fyrairad {
	constructor(selector){
		this.rader = 6;
		this.cols = 7;
		this.player = "player-1";
		this.selector = selector;
		this.speletSlut = false;
		this.onSpelaresDrag = function() {};
		this.spelare1Score = function() {};
		this.spelare2Score = function() {};
		this.createGrid();
		this.setUpEvent();
		this.scoreP1 = 0;
		this.scoreP2 = 0;
	}

	createGrid() {
		// ger oss diven av fyraIRad
		const board = $(this.selector);
		//gör så att hela griden töms
		board.empty();
		//när man restartar kommer man tbx hit och med this.speletSlut = false; gör så man kan spela igen
		this.speletSlut = false;
		this.player = "player-1";
		this.scoreP1 = 0;
		this.scoreP2 = 0;
		//vi Loppar igenom varje rad och skapar en Div till varje rad
		for (let rad= 0; rad < this.rader; rad++) {
			const enrad = $('<div>').addClass('rad');
			//Och inne i varje rad skapar vi 7 olika columner
			for (let col = 0; col < this.cols; col++) {
				const encol = $('<div>').addClass("col tom")
				//attr står för addattribute()
				.attr("data-col", col).attr("data-rad", rad);
				
				enrad.append(encol);
			}
			board.append(enrad);
		}
	}

	setUpEvent() {
		const board = $(this.selector);
		//Gör så man får tillgång till this. Man behöver tillgång till this för att kuna bytta spelare
		const that = this;

		function hittaSistaTommaCellen(col) {
			//ta alla columenr som har samma attribute data, alltså är på Samma rad lodrätt
			const cells = $(`.col[data-col='${col}']`);
			//kollar igenom alla celler baklänges
			for(let i = cells.length - 1; i>= 0 ; i--) {
				//Man tar cellen man är på för tillfället
				const cell = $(cells[i]);
				//om cellen har classen "tom" ge tbx en cell
				if (cell.hasClass('tom')) {
					return cell;
				}
			}
			//Annars ge tbx noll
			return null;
		}

	
		//när man tar musen över en col så läser den här coden utav vart man är någon stans
		//och visar vart man kan lägga sin "bricka"
		board.on('mouseenter', '.col.tom', function() {
			//ifall spelet är slut ge inte något värde ifall man klickar
			if (that.speletSlut) return;
			//vi vill hitta den sista tomma cellen i den columen
			const col = $(this).data('col');
			//Vissar en markering över den sista tomma "brickan" alltså den längst ner i columen
			const sistaTommaCellen = hittaSistaTommaCellen(col);
			sistaTommaCellen.addClass(`hover-${that.player}`);

			
		});

		//denna funktion gör så att man bara ser vilken colum man är på för tillfället och tar bort
		//dom man tidigare varit på
		board.on("mouseleave", ".col", function() {
			$(".col").removeClass(`hover-${that.player}`);
		});

		//skapar en "bricka" som sätt längst ner på columen, ifall det redan e en bricka längst ner sätts den
		//brickan på den andra.
		board.on("click", ".col.tom" , function() {
			//Ifall sppelet är slut så ge inte något värde ifall man klickar
			if (that.speletSlut) return;

			const col = $(this).data("col");
			const rad = $(this).data("rad");

			//I en column finns det 6 "celler" eller "brickor" Denna funktion letar efter den sista tomma
			//Det vill säga ifall ngn fyllt up en "bricka" Då kommer den markera ovanför den "brickan"
			const sistaTommaCellen = hittaSistaTommaCellen(col);
			sistaTommaCellen.removeClass(`tom hover-$(that.player}`);
			sistaTommaCellen.addClass(that.player);
			sistaTommaCellen.data("spelare", that.player);


			const vinnare = that.kollEfterVinnare(
				sistaTommaCellen.data("rad"),
				sistaTommaCellen.data("col")
				)
			
			if (vinnare){
				//gör så att spelet sluta när man vunnit
				that.speletSlut = true;
				
				let spelare = prompt(`${that.player} Vad heter du?`)
				alert('Spelet är över. ' + spelare + ' has Get gud!');
				//tar bort så att muspekaren inte syns ifall man har vunnit
				$(".col.tom").removeClass("tom");
				return;
			}


			//bytter spelare
			that.player = (that.player === "player-1") ? "player-2" : "player-1";
			//för att räkna score
			if(that.player == "player-2"){
				that.scoreP2++;
			} else {
				that.scoreP1++;
			}
			//för att räkna score
			that.spelare1Score();
			that.spelare2Score();
			//Säger vems tur det är
			that.onSpelaresDrag();
			//Vi triggar igång mouseenter igen för att man ska se direkt när en spelare har tryckt
			//Att den andra får sin "hover" färg och ser att det är sin tur
			$(this).trigger("mouseenter");
		});
	}
		//kollar efter en vinnare
		kollEfterVinnare(rad, col){
			const that = this;


			//få cell
			function fåCell(i, j) {
				return $(`.col[data-rad='${i}'][data-col='${j}']`);
			}

			function kollaMot(mot) {
				let total = 0;
				let i = rad + mot.i;
				let j = col + mot.j;
				let next = fåCell(i, j);
				while (i >= 0 &&
					i< that.rader &&
					j >= 0 &&
					j < that.cols &&
					next.data("spelare") === that.player)
				{
					total++;
					i += mot.i;
					j += mot.j;
					next = fåCell(i,j);
				}
				return total;
			}
			//kollar ifall man har fått 4 irad åt något håll
			function kollaVin(motA, motB) {
				const total = 1 +
				kollaMot(motA) +
				kollaMot(motB);
				if (total >= 4) {
					return that.player;
				} else {
					return null;
				}
			}
			//kolla vin diagonalt ifrån Bott vänster till Topp höger
			function kollaDiagonaltBVtillTH() {
				return kollaVin({i: 1, j: -1}, {i: 1,j: 1})
			}
			//kolla vin diagonalt ifrån Topp vänster till Bott höger
			function kollaDiagonaltTVtillBH() {
				return kollaVin({i: 1, j: 1}, {i: -1,j: -1})
			}
			//Kollar ifall man vunnit verticalt
			function kollaVerticalt() {
				return kollaVin({i: -1, j: 0}, {i: 1, j: 0});
			}
			//kollar ifall man vunnit horizontelt
			function kollaHorizontelt() {
				return kollaVin({i: 0, j: -1}, {i: 0, j: 1});
			}

			//ger tbx värdet ifall man vunnit
			return kollaVerticalt() ||
			 kollaHorizontelt() ||
			 kollaDiagonaltTVtillBH() ||
			 kollaDiagonaltBVtillTH();
			}

			startaOm() {
				this.createGrid();
				this.onSpelaresDrag();
				this.spelare1Score();
				this.spelare2Score();
			}
		
	}
