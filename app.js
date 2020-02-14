document.addEventListener("DOMContentLoaded", (event) =>{
    const formAlumnos = document.querySelector("#frmAlumno");
    formAlumnos.addEventListener("submit", (e)=>{
        e.preventDefault(); 
        let codigo = document.querySelector("#txtCodigoAlumno").value,
            nombre = document.querySelector("#txtNombreAlumno").value,
            direccion = document.querySelector("#txtDireccionAlumno").value,
            telefono = document.querySelector("#txtTelefonoAlumno").value;
        if( 'localStorage' in window ){
            window.localStorage.setItem("codigo" + codigo, codigo);
            window.localStorage.setItem("nombre" + codigo, nombre);
            window.localStorage.setItem("direccion" + codigo, direccion);
            window.localStorage.setItem("telefono" + codigo, telefono);
        } else {
            alert("almacenamiento en local NO soportado!!! Actualizate!");
        }
    });
    document.querySelector("#btnRecuperarAlumnos").addEventListener("click",(e)=>{
        if( 'localStorage' in window ){
            var codigo = document.querySelector("#txtCodigoAlumno").value;

            var keycodig = "codigo" + codigo, keynombre = "nombre" + codigo, keydireccion = "direccion" + codigo, keytelefono = "telefono" + codigo;

            document.querySelector("#txtCodigoAlumno").value = window.localStorage.getItem(keycodig);
            document.querySelector("#txtNombreAlumno").value = window.localStorage.getItem(keynombre);
            document.querySelector("#txtDireccionAlumno").value = window.localStorage.getItem(keydireccion);
            document.querySelector("#txtTelefonoAlumno").value = window.localStorage.getItem(keytelefono);

        }  else {
            alert("almacenamiento en local NO soportado!!! Actualizate!");
        }
    }); 
    document.querySelector("#btnBorrarAlumnos").addEventListener("click", (e)=>{
        if( 'localStorage' in window ){
            var codigo = document.querySelector("#txtCodigoAlumno").value;
            var keycodig = "codigo" + codigo, keynombre = "nombre" + codigo, keydireccion = "direccion" + codigo, keytelefono = "telefono" + codigo;

            window.localStorage.removeItem(keycodig);
            window.localStorage.removeItem(keynombre);
            window.localStorage.removeItem(keytelefono);
            window.localStorage.removeItem(keydireccion);

            document.querySelector("#txtCodigoAlumno").value ="";
            document.querySelector("#txtNombreAlumno").value ="";
            document.querySelector("#txtDireccionAlumno").value ="";
            document.querySelector("#txtTelefonoAlumno").value ="";
        }
    });
});

/*document.addEventListener("DOMContentLoaded",init);*/

/*document.addEventListener("DOMContentLoaded",function(event){
    alert("Pagina cargo forma 2");
});*/

/*function init(event){
    alert("Hola la pagina a cargado");
}*/