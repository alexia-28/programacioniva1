 var $ =el => document.querySelector(el),
 id= el =>document.getElementById(el),
 todasclases =el =>document.querySelectorAll(el);
 var frmAlumno =id("formularioAlumno"),
 button = id("btnbuscar-alumnos");
 frmAlumno.addEventListener("submit", guardar);
 frmAlumno.addEventListener("reset", limpiar);
 function limpiar() {
     this.dataset.action= "nuevo";
     this.dataset.idalumno="";
 }
 function guardar() {
     let alumnos= {
         accion: this.dataset.action,
         id: this.dataset.idalumno,
         codigo: id("txtcodigoalumnos").value,
         nombre: id("txtnombreaslumno").value,
         direccion: id("txtdireccionalumno").value,
         telefono: id("txttelefonoalumno").value
     }
     console.log(alumnos);
     
     fetch (`Private/Modulos/Alumnos/Proceso.php?proceso=recibirDatos&alumno=${JSON.stringify(alumnos)}`).then(resp=>resp.json()).then(resp=>{
         id("respuestaalumno").innerHTML=`
            <div class="alert alert-success" role="alert">
                ${resp.msg}
            </div>
         `;

     })
 }
 button.addEventListener("click",event => {
    fetch(`Public/Vistas/Alumnos/buscar-Alumnos.html`).then( resp => resp.text() ).then( resp => {
            
        $(`.modulo-vistas-alumnos`).innerHTML = resp;

        modulo();

        let btnCerrar = id(`btn-close-buscar-alumnos`);

        btnCerrar.addEventListener("click", event => {
            console.log("cerrado");
            
            $(`.modulo-vistas-alumnos`).innerHTML = "";

        });

    });

});

function modulo(){
let frmBuscarAlumnos = id('txtBuscarAlumno');


frmBuscarAlumnos.addEventListener('keyup', e=>{
    traerDatos(frmBuscarAlumnos.value);
}); 

var modificarAlumno = (alumno)=>{
    id("formularioAlumno").dataset.action = 'modificar';
    id("formularioAlumno").dataset.idalumno = alumno.id_alumno;
    id("txtcodigoalumnos").value = alumno.codigo;
    id("txtnombreaslumno").value = alumno.nombre;
    id("txtdireccionalumno").value = alumno.direccion;
    id("txttelefonoalumno").value = alumno.telefono;
};
var eliminarAlumno = (idAlumno)=>{
    fetch(`Private/Modulos/Alumnos/Proceso.php?proceso=eliminarAlumno&alumno=${idAlumno}`).then(resp=>resp.json()).then(resp=>{
        traerDatos('');
    });
};
var traerDatos = (valor)=>{
    fetch(`Private/Modulos/Alumnos/Proceso.php?proceso=buscarAlumno&alumno=${valor}`).then(resp=>resp.json()).then(resp=>{
        let filas = '';
        console.log(resp);
        
        resp.forEach(alumno => {
            filas += `
                <tr>
                    <td>${alumno.codigo}</td>
                    <td>${alumno.nombre}</td>
                    <td>${alumno.direccion}</td>
                    <td>${alumno.telefono}</td>
                    <td>
                        <input data-alumno='${JSON.stringify(alumno)}' type="button" class="btn btn-outline-warning text-white modificar" value="mod">
                    </td>
                    <td>
                        <input data-idalumno='${alumno.id_alumno}' type="button" class="btn btn-outline-danger text-white eliminar" value="del">
                    </td>
                </tr>
            `;
        });
        $("#tbl-buscar-alumnos > tbody").innerHTML = filas;
        let botonModificar = todasclase('.modificar');
        let botonEliminar = todasclase('.eliminar');

        for (let index = 0; index < botonModificar.length; index++) {
            
            
            botonModificar[index].addEventListener('click',ModificarDatos);
            
        }

        for (let index = 0; index < botonEliminar.length; index++) {
            botonEliminar[index].addEventListener('click',EliminarDatos);
            
        }
        
        //$("#tbl-buscar-alumnos > tbody").addEventListener("click",enviarDatos);
    });
};

function ModificarDatos(){
    console.log(this.dataset.alumno);
    modificarAlumno(JSON.parse(this.dataset.alumno));
    $(`.modulo-vistas-alumnos`).innerHTML = "";
}

function EliminarDatos(){
    
    valorDelId = this.dataset.idalumno;
    
    alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
        eliminarAlumno(valorDelId);
        alertify.success('Registro Eliminado');
        
    }, function() {
        alertify.error('Cancelado');
        
    });
    

}

traerDatos('');
}