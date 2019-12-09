$(document).ready(function () {

    $.fn.dataTable.ext.errMode = 'none';
    var UPDATE = '';

    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
    });
    $('#nuevo_elemento_str').click(function () {
        $('#myDataModal_str').modal('show');
    });

    var DT = $('#Table_of_baas').DataTable({
        language: DT_Lang,
        responsive: true,
        data: {},
        columns: [
            {
                data: "id"
            },
            {
                data: "name",

            },
            {
                data: "description"
            },
            {
                data: "route_name",

            },
            {
                data: "createdAt"
            },
            {
                data: "updatedAt"
            },
            {
                data: "id",
                render: function (data) {
                    return '<center>' +
                        '<button class=" DeleteElement btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement btn btn-primary" value="' + data + '"><i class="fas fa-edit"></i></button>'
                        + '</center>'
                }
            },
        ]
    });

    var DT_str = $('#Table_of_baas_str').DataTable({
        language: DT_Lang,
        responsive: true,
        data: {},
        columns: [
            {
                data: "id"
            },
            {
                data: "name",

            }, {
                data: "type",

            }, {
                data: "r_model",

            },
            {
                data: "description"
            },
            {
                data: "property",

            }, {
                data: "id_table",

            },
            {
                data: "createdAt"
            },
            {
                data: "updatedAt"
            },
            {
                data: "id",
                render: function (data) {
                    return '<center>' +
                        '<button class=" DeleteElement btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement btn btn-primary" value="' + data + '"><i class="fas fa-edit"></i></button>'
                        + '</center>'
                }
            },
        ]
    });

    $('#SaveChanges').click(function () {
        var nombre = $('#txt_name_bass').val();
        var descripcion = $('#txt_description_bass').val();
        var ruta = $('#txt_route_name_bass').val();

        $.post(rootPath + '/api/baas/collection', {
            name: nombre,
            description: descripcion,
            route_name: ruta,
        }, function (data) {
            if (data.success) {

            }
            $('#myDataModal').modal('hide');
        });
    });


});