var appDocente = new Vue({

    el: "#formularioDocentes",

    data:{
        
        docentes: {
            idDocente  : $("#formularioDocentes").data("iddocente"),
            accion    : $("#formularioDocentes").data("action"),
            codigo    : '',
            nombre    : '',
            direccion : '',
            telefono  : '',
            NIT       : '',
            msg       : ''
        }

    },
    methods:{

        guardarDocentes: function() {
            console.log(JSON.stringify(this.docentes));

            fetch(`Private/Modulos/Docentes/Proceso.php?proceso=recibirDatos&docente=${JSON.stringify(this.docentes)}`).then( resp => resp.json()).then( resp => {

                this.docentes.msg           =    resp.msg;
                this.docentes.idDocente     =    0;
                this.docentes.codigo        =    '';
                this.docentes.nombre        =    '';
                this.docentes.direccion     =    '';
                this.docentes.telefono      =    '';
                this.docentes.NIT           =    '';
                this.docentes.accion        =    'nuevo';

            })
            
        },
        buscarDocentes: function () {

            $(`#modulo-vista-docentes`).load(`Public/Vistas/Docentes/buscar-docentes.html`, function () {

                appBuscarDocentes.buscarDocentes();

            }).draggable();

        }

    }

})