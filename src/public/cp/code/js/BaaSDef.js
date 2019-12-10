$.fn.dataTable.ext.errMode = 'none';
var UPDATE = '';
var UPDATE_str = '';
var WTable = '';

var vt = 'x,String,Number,Date,Buffer,Boolean,Mixed,SchemaSingle,SchemaArray,Array'.split(',');

var DT_cntn_ = {};

$(document).ready(function () {


    $('#nuevo_elemento').click(function () {
        UPDATE = '';
        $('#txt_name_bass').val('')
        $('#txt_description_bass').val('')
        $('#txt_route_name_bass').val('')
        $('#myDataModal').modal('show');
    });
    $('#nuevo_elemento_str').click(function () {
        $('#myDataModal_str').modal('show');

        UPDATE_str = ''
        $('#admin_field_name').val('');
        $('#admin_field_description').val('');
        $('#admin_field_property').val('{}');
        $('#admin_field_type').val(-1);
        $('#admin_field_r_model').val(-1);
        $('#admin_field_tab_id').val(WTable);
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
                        '<button class=" DeleteElement btn btn-block btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement btn btn-block btn-primary" value="' + data + '"><i class="fas fa-edit"></i></button>'
                        + '<button class="StructureElement btn  btn-block btn-secondary" value="' + data + '"><i class="fas fa-bezier-curve"></i></button>'
                        + '<button class="DataElement btn  btn-block btn-dark" value="' + data + '"><i class="fas fa-database"></i></button>'
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
                        '<button class=" DeleteElement_str btn btn-block btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement_str btn btn-block btn-primary" value="' + data + '"><i class="fas fa-edit"></i></button>'
                        + '</center>'
                }
            },
        ]
    });

    $('#SaveChanges').click(function () {

        var nombre = $('#txt_name_bass').val();
        var descripcion = $('#txt_description_bass').val();
        var ruta = $('#txt_route_name_bass').val();

        if (nombre.trim() == '' || descripcion.trim() == "" || ruta.trim() == "") {
            alertify.error(lx_i18n.txt_full_all_data)
            return 0;
        }
        HoldOn.open(HoldOptions);

        var data = {
            name: nombre,
            description: descripcion,
            route_name: ruta,
        }

        var url = rootPath + '/api/baas/collection';
        var method = 'POST';
        if (UPDATE !== '') {
            url = url + '/' + UPDATE;
            method = 'PUT'
        }

        $.ajax({
            url: url,
            method: method,
            data: data
        }).done(function (data) {
            HoldOn.close();
            $('#myDataModal').modal('hide');
            getTablesData();
            alertify.success(lx_i18n.txt_save_correctly);
        }).fail(function (err) {
            $('#myDataModal').modal('hide');
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
            console.error(err);
        });
    });

    $('#SaveChanges_str').click(function () {

        var vt = 'x,String,Number,Date,Buffer,Boolean,Mixed,SchemaSingle,SchemaArray,Array'.split(',');

        var nombre = $('#admin_field_name').val();
        var type = $('#admin_field_type').val();
        var rmodel = $('#admin_field_r_model').val();
        var description = $('#admin_field_description').val();
        var property = $('#admin_field_property').val();
        var idCollection = $('#admin_field_tab_id').val();

        if (nombre.trim() == '' || type.trim() == '-1' || description.trim() == "" || property.trim() == "" || idCollection.trim() == "") {
            alertify.error(lx_i18n.txt_full_all_data)
            return 0;
        }

        if ((type.trim() == '7' || type.trim() == '8') && rmodel.trim() == '-1') {
            alertify.error(lx_i18n.txt_must_select_related_model)
            return 0
        }
        HoldOn.open(HoldOptions);

        var data = {
            name: nombre,
            type: vt[type],
            description: description,
            property: property,
            id_table: idCollection,
            r_model: rmodel != -1 ? rmodel : '',
        }

        var url = rootPath + '/api/baas/fields';
        var method = 'POST';
        if (UPDATE_str !== '') {
            url = url + '/' + UPDATE_str;
            method = 'PUT'
        }

        $.ajax({
            url: url,
            method: method,
            data: data
        }).done(function (data) {
            HoldOn.close();
            $('#myDataModal_str').modal('hide');
            getTablesDataStructure(WTable);
            alertify.success(lx_i18n.txt_save_correctly);
        }).fail(function (err) {
            $('#myDataModal_str').modal('hide');
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
            console.error(err);
        });
    });

    var getTablesData = function () {

        DT.clear().draw();
        HoldOn.open(HoldOptions)
        $.get(rootPath + '/api/baas/collection', {}, function (data) {
            if (data.success) {
                DT.clear().rows.add(data.data).draw();
                HoldOn.close();
                $('#admin_field_r_model').html('<option value="-1">' + lx_i18n.admin_field_select_one + '</option>');

                data.data.map(function (item, i) {
                    $('#admin_field_r_model').append('<option value="' + item.id + '">' + item.name + '</option>');

                });
            }
        });

    };

    var getTablesDataStructure = function (id) {
        DT_str.clear().draw();
        HoldOn.open(HoldOptions)
        $.get(rootPath + '/api/baas/fields', {
            strictsearch: {
                id_table: id
            }
        }, function (data) {
            if (data.success) {
                DT_str.clear().rows.add(data.data).draw();
                HoldOn.close();

            }
        });

    };

    var deploydatatableData = function (Workingtable) {
        DT_cntn_ = $('#Table_of_baas_cnt').DataTable({
            language: DT_Lang,
            "columnDefs": [
                {"name": "engine"},
                {"name": "browser"},
                {"name": "platform"},
                {"name": "version"},
                {"name": "grade"}
            ],
            responsive: true,
            data: {},
        });

    }

    $(document.body).on('click', '.EditElement', function () {
        HoldOn.open(HoldOptions);
        UPDATE = $(this).val();
        $.get(rootPath + '/api/baas/collection/' + UPDATE, {
            id: UPDATE
        }, function (data) {
            HoldOn.close();
            if (data.success) {
                $('#myDataModal').modal('show');
                $('#txt_name_bass').val(data.data.name);
                $('#txt_description_bass').val(data.data.description);
                $('#txt_route_name_bass').val(data.data.route_name);
            }
        })
    });

    $(document.body).on('click', '.EditElement_str', function () {
        HoldOn.open(HoldOptions);
        UPDATE_str = $(this).val();
        $.get(rootPath + '/api/baas/fields/' + UPDATE_str, {
            id: UPDATE_str
        }, function (data) {
            HoldOn.close();
            if (data.success) {
                $('#myDataModal_str').modal('show');
                $('#admin_field_name').val(data.data.name);
                $('#admin_field_type').val(vt.indexOf(data.data.type));
                $('#admin_field_r_model').val(data.data.r_model);
                $('#admin_field_description').val(data.data.description);
                $('#admin_field_property').val(data.data.property);
                $('#admin_field_tab_id').val(data.data.id_table);
            }
        })
    });

    $(document.body).on('click', '.StructureElement', function () {

        WTable = $(this).val();
        $('#Structure_').removeClass('disabled');
        $('#Structure_').click();
        getTablesDataStructure(WTable)

    });

    $(document.body).on('click', '.DataElement', function () {

        WTable = $(this).val();
        $('#Content_').removeClass('disabled');
        $('#Content_').click();
        deploydatatableData(WTable);


    });

    $(document.body).on('click', '.DeleteElement', function () {
        DELETE = $(this).val();
        alertify.confirm(lx_i18n.txt_fonfirm_delete, lx_i18n.txt_fonfirm_delete_question, function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: rootPath + '/api/baas/collection/' + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                getTablesData();
                alertify.success(lx_i18n.txt_delete_correctly)
            }).fail(function (err) {
                HoldOn.close();
                alertify.error(lx_i18n.txt_txt_an_error_occured);
                console.error(err);
            });
        }, function () {
            HoldOn.close();
        });

    });

    $(document.body).on('click', '.DeleteElement_str', function () {
        DELETE = $(this).val();
        alertify.confirm(lx_i18n.txt_fonfirm_delete, lx_i18n.txt_fonfirm_delete_question, function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: rootPath + '/api/baas/fields/' + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                getTablesDataStructure(WTable);
                alertify.success(lx_i18n.txt_delete_correctly)
            }).fail(function (err) {
                HoldOn.close();
                alertify.error(lx_i18n.txt_txt_an_error_occured);
                console.error(err);
            });
        }, function () {
            HoldOn.close();
        });

    });

    $('#tables_').click(function () {
        $('#Structure_').addClass('disabled')
        $('#Content_').addClass('disabled')
        WTable = '';
    });


// inicializa
    getTablesData();


    var toSnake = function (elem) {
        $(elem).change(function () {
            var value = $(elem).val();
            value = v.snakeCase(value)
            $(elem).val(value);

        });
    }
    toSnake('#txt_name_bass');
    toSnake('#txt_route_name_bass');
    toSnake('#admin_field_name');


});