window.addEventListener("load", function load(event){
    
    document.getElementById("inputTitulo")
    .addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode === 13) {
	        buscar();
	    }
	});

},false);


function buscar(){
	var titulo = document.getElementById("inputTitulo").value;
	var respuesta = peticion(titulo);
	insertarHTMLPelicula(respuesta);
}

function insertarHTMLPelicula(respuesta){
	
	var html = "";
	if(respuesta["Response"] == "True"){

		var peliculas = respuesta["Search"];

		for(var i = 0; i < peliculas.length; i++){			
			html += '<div class="col-lg-4 mb-4">';
			html += '<div class="card h-100">';
			html += '<h4 class="card-header">'+peliculas[i]["Title"]+'</h4>';
			html += '<div class="card-body">';
			html += '<img class="card-img-top imagen-card" src="'+peliculas[i]["Poster"]+'" alt="">';
			html += '</div>';
			html += '<div class="card-footer">';
			html += '<button class="btn btn-primary" onclick=detalles("'+peliculas[i]["imdbID"]+'")>Ver más</button>';
			html += '<button type="button" class="btn btn-info derecha" onclick=addFavorita("'+peliculas[i]["imdbID"]+'")>Fav</button>';			
			html += '</div>';
			html += '</div>';
			html += '</div>';
		}
	}

	document.getElementById("peliculas").innerHTML = html;
}

function addFavorita(pelicula){
	if(getSesionStorage() != null){
		var favoritas = new Array();
		var existe = false;
		if(getLocalStorage() != null){
			favoritas = getLocalStorage();			
			for(var i = 0; i < favoritas.length; i++){
				if(favoritas[i] == pelicula){
					existe = true;				
				}
			}
		}	
		if(existe == false){
			favoritas.push(pelicula);	
			setLocalStorage(favoritas);
		}	
	}else{
		alert("No ha iniciado sesión.");
	}
}

function detalles(id){
	var respuesta = peticionDetalles(id);	
	document.getElementById("imagenModal").src = respuesta["Poster"];
	document.getElementById("tituloModal").innerHTML = respuesta["Title"];
	document.getElementById("directorModal").innerHTML = respuesta["Director"];
	document.getElementById("actoresModal").innerHTML = respuesta["Actors"];
	document.getElementById("yearModal").innerHTML = respuesta["Year"];
	document.getElementById("tramaModal").innerHTML = respuesta["Plot"];
	$("#ModalDetalles").modal("show");
}