var appMateria = new Vue({

    el: "#frmMaterias",
    data: {

        materias: {

            idMaterias   : $("#frmMaterias").data("idmateria"),
            accion      : $("#frmMaterias").data("accion"),
            codigo      : '',
            materia     : '',
            msg         : ''

        }

    },
    methods: {

        guardarMaterias: function () {

            console.log(JSON.stringify(this.materias));

            fetch(`Private/Modulos/Materias/proceso.php?proceso=recibirDatos&materia=${JSON.stringify(this.materias)}`).then( resp => resp.json() ).then( resp => {

                this.materias.msg = resp.msg;
                this.materias.idMateria = 0;
                this.materias.codigo = '';
                this.materias.materia = '';
                this.materias.accion = 'nuevo';

            })
            
        },
        buscarMaterias: function () {
            
            $(`#modulo-vista-materias`).load(`Public/Vistas/Materias/buscar-materias.html`, function () {
                
                appBuscarMateria.buscarMaterias();

            }).draggable();

        }

    }

})