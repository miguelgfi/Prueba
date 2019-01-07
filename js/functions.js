window.addEventListener("load", function load(event){
    
    

},false);


/**
  * Petición de una película
  */
function peticion(titulo){
	// Creación de la petición HTTP
	var req = new XMLHttpRequest();
	// Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
	req.open("POST", "http://www.omdbapi.com/?apikey=f12ba140&s="+titulo+"&type=movie", false);
	// Envío de la petición
	req.send(null);
	// Impresión por la consola de la respuesta recibida desde el servidor
	var respuesta = JSON.parse(req.responseText);

	return respuesta;
}

/**
  * Petición de una película
  */
function peticionDetalles(id){
	// Creación de la petición HTTP
	var req = new XMLHttpRequest();
	// Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
	req.open("POST", "http://www.omdbapi.com/?apikey=f12ba140&i="+id, false);
	// Envío de la petición
	req.send(null);
	// Impresión por la consola de la respuesta recibida desde el servidor
	var respuesta = JSON.parse(req.responseText);

	return respuesta;
}

function getLocalStorage(){
	return JSON.parse(localStorage.getItem("favoritas"));
}

function setLocalStorage(set){
	localStorage.setItem("favoritas",JSON.stringify(set));
}

function getSesionStorage(){
	return JSON.parse(sessionStorage.getItem("sesion"));
}

function setSesionStorage(set){
	sessionStorage.setItem("sesion",JSON.stringify(set));
}

function modalInicioSesion(){
	$("#ModalInicioSesion").modal("show");
}

function modalFavoritas(){
	var html = "";
	if(getLocalStorage() != null){
		favoritas = getLocalStorage();			
		for(var i = 0; i < favoritas.length; i++){
			html += insertarHTMLPeliculaFavoritas(peticionDetalles(favoritas[i]));
		}
		document.getElementById("tabla_favoritas").innerHTML = html;
	}
	$("#ModalFavoritas").modal("show");
}

function insertarHTMLPeliculaFavoritas(respuesta){

	var html = "";

	html += '<tr>';
	html += '<th scope="row" class="imagenMini"><img src="'+respuesta["Poster"]+'" alt=""></td>';
	html += '<td>'+respuesta["Title"]+'</td>';
	html += '</tr>';

	return html;	
}

function iniciarSesion(){
	var usuario = document.getElementById("usuario").value;
	var password = document.getElementById("password").value;

	if(usuario == "prueba" && password == "prueba"){
		$("#ModalInicioSesion").modal("hide");
		document.getElementById("inicio_sesion").classList.add("ocultar");
		document.getElementById("cuenta").classList.remove("ocultar");
		var sesion = {"usuario":usuario};
		setSesionStorage(sesion);
		document.getElementById("usuario").value = "";
		document.getElementById("password").value = "";
	}else{
		alert("Usuario o contraseña incorrectos");
		return;
	}
}

function cerrarSesion(){
	sessionStorage.removeItem("sesion");
	localStorage.removeItem("favoritas");
	document.getElementById("cuenta").classList.add("ocultar");
	document.getElementById("inicio_sesion").classList.remove("ocultar");
}