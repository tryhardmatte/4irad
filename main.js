$(document).ready(function() {
	
	const fyraIRad = new Fyrairad("#fyraIRad")

	fyraIRad.onSpelaresDrag = function() {
		$("#spelare").text(fyraIRad.player);
	}

    fyraIRad.spelare1Score = function() {
        $("#scoreP1").text(fyraIRad.scoreP2);
    }

    fyraIRad.spelare2Score = function() {
        $("#scoreP2").text(fyraIRad.scoreP1);
    }

	$("#startaOm").click(function() {
		fyraIRad.startaOm();
	});


/* //Så här flyttar man t.ex. en lista till en html sida
	var myList = [ 
    ['1','one'],
    ['1','two'],
    ['1','three'],
    ];

var mainList = document.getElementById("navp");

for(var i=0;i<myList.length;i++){
         var item = myList[i];
         var elem = document.createElement("li");
         elem.value=item[0];
         elem.innerHTML=item[1];

         mainList.appendChild(elem);
    }
    */
});