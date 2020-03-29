var $ =el => document.querySelector(el),
 id= el =>document.getElementById(el),
 todasclases =el =>document.querySelectorAll(el);
 var frmDocentes =id("formularioDocentes"),
 button = id("btnbuscar-docente");
 frmDocentes.addEventListener("submit", guardar);
 frmDocentes.addEventListener("reset", limpiar);
 function limpiar() {
     this.dataset.action= "nuevo";
     this.dataset.iddocentes="";
 }
 function guardar() {
     let docentes= {
         accion: this.dataset.action,
         id: this.dataset.iddocentes,
         codigo: id("txtcodigodocente").value,
         nombre: id("txtnombredocente").value,
         direccion: id("txtdirecciondocente").value,
         telefono: id("txttelefonodocente").value,
         NIT: id("txtnitdocente").value
     }
     console.log(docentes);
     
     fetch (`Private/Modulos/Docentes/Proceso.php?proceso=recibirDatos&docentes=${JSON.stringify(docentes)}`).then(resp=>resp.json()).then(resp=>{
         id("respuestadocente").innerHTML=`
            <div class="alert alert-success" role="alert">
                ${resp.msg}
            </div>
         `;

     })
 }
 button.addEventListener("click",event => {
    fetch(`Public/Vistas/Docentes/buscar-Docentes.html`).then( resp => resp.text() ).then( resp => {
            
        $(`.modulo-vistas-docente`).innerHTML = resp;

        modulo();

        let btnCerrar = id(`btn-close-buscar-docentes`);

        btnCerrar.addEventListener("click", event => {
            console.log("cerrado");
            
            $(`.modulo-vistas-docente`).innerHTML = "";

        });

    });

});

function modulo(){
let frmBuscarDocentes = id('txtBuscardocente');


frmBuscarDocentes.addEventListener('keyup', e=>{
    traerDatos(frmBuscarDocentes.value);
}); 

var modificarDocentes = (docentes)=>{
    id("formularioDocentes").dataset.action = 'modificar';
    id("formularioDocentes").dataset.iddocentes = docentes.id_docentes;
    id("txtcodigodocente").value = docentes.codigo;
    id("txtnombredocente").value = docentes.nombre;
    id("txtdirecciondocente").value = docentes.direccion;
    id("txttelefonodocente").value = docentes.telefono;
    id("txtnitdocente").value = docentes.NIT;
};
var eliminarDocentes = (iddocentes)=>{
    fetch(`Private/Modulos/Docentes/Proceso.php?proceso=eliminarDocente&docentes=${iddocentes}`).then(resp=>resp.json()).then(resp=>{
        traerDatos('');
    });
};
var traerDatos = (valor)=>{
    fetch(`Private/Modulos/Docentes/Proceso.php?proceso=buscarDocentes&docentes=${valor}`).then(resp=>resp.json()).then(resp=>{
        let filas = '';
        console.log(resp);
        
        resp.forEach(docentes => {
            filas += `
                <tr>
                    <td>${docentes.codigo}</td>
                    <td>${docentes.nombre}</td>
                    <td>${docentes.direccion}</td>
                    <td>${docentes.telefono}</td>
                    <td>${docentes.NIT}</td>
                    <td>
                        <input data-docentes='${JSON.stringify(docentes)}' type="button" class="btn btn-outline-warning text-white modificar" value="mod">
                    </td>
                    <td>
                        <input data-iddocentes='${docentes.id_docentes}' type="button" class="btn btn-outline-danger text-white eliminar" value="del">
                    </td>
                </tr>
            `;
        });
        $("#tbl-buscar-docente > tbody").innerHTML = filas;
        let botonModificar = todasclase('.modificar');
        let botonEliminar = todasclase('.eliminar');

        for (let index = 0; index < botonModificar.length; index++) {
            
            
            botonModificar[index].addEventListener('click',ModificarDatos);
            
        }

        for (let index = 0; index < botonEliminar.length; index++) {
            botonEliminar[index].addEventListener('click',EliminarDatos);
            
        }
        
    });
};

function ModificarDatos(){
    console.log(this.dataset.docentes);
    modificarDocentes(JSON.parse(this.dataset.docentes));
    $(`.modulo-vistas-docente`).innerHTML = "";
}

function EliminarDatos(){
    
    valorDelId = this.dataset.iddocentes;
    
    alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
        eliminarDocentes(valorDelId);
        alertify.success('Registro Eliminado');
        
    }, function() {
        alertify.error('Cancelado');
        
    });
    

}

traerDatos('');
}