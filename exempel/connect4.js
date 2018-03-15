class Connect4 {
	constructor(selector){
		this.rows = 6;
		this.cols = 7;
		
		this.selector = selector;
		this.createGrid1();	
	}

/*	createGrid() {
		// ger oss diven av fyraIRad
		const playboard = $(this.selector);
		//gör så att hela griden töms
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
			playboard.append(enrad);
		}
	}*/


	createGrid1(){

		const playboard1 = $(this.selector);
		console.log(this.cols);

		for(let row = 0; row < this.rows; row++) {
			const aRow = $("<div>").addClass("row")

			for(let col = 0; col < this.cols; col++) {
				const aCol = $("<div>").addClass("col empty")
			

			.attr("data-col", col).attr("data-row", row);

			aRow.append(aCol);
		}
		playboard1.append(aRow);
	}
}
		
	}
	
