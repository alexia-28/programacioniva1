var appalumno = new Vue({

    el:'#formularioAlumno',

data:{

    alumno:{

        idAlumno  : $("#formularioAlumno").data("idalumno"),
        accion    : $("#formularioAlumno").data("action"),
        codigo    : '',
        nombre    : '',
        direccion : '',
        telefono  : '',
        msg       : ''

    }

},
methods:{

    guardarAlumno:function(){

        console.log(JSON.stringify(this.alumno));
        
        fetch(`Private/Modulos/Alumnos/Proceso.php?proceso=recibirDatos&alumno=${JSON.stringify(this.alumno)}`).then( resp=>resp.json() ).then(resp=>{
            this.alumno.msg = resp.msg;
            this.alumno.idAlumno = 0;
            this.alumno.codigo = '';
            this.alumno.nombre = '';
            this.alumno.direccion = '';
            this.alumno.telefono = '';
            this.alumno.accion = 'nuevo';
            
        });

    },
    buscarAlumno:function(){

        $(`#modulo-vista-alumnos`).load(`Public/Vistas/Alumnos/buscar-Alumnos.html`, function () {

            appBuscarAlumnos.buscarAlumno();

        }).draggable();

    }

}

});