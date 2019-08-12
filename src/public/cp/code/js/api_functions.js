var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true
});

editor.setOption("theme", 'dracula');


$(document).ready(function () {

    $.fn.dataTable.ext.errMode = 'none';
    var UPDATE = '';

    var DT = $('#Table_of_functions').DataTable({
        language: DT_Lang,
        responsive: true,
        data: {},
        columns: [
            {
                data: "id"
            },
            {
                data: "method"
            },
            {
                data: "description"
            },
            {
                data: "code",
                render: function (data) {
                    return data.substring(0, 250);
                }

            },
            {
                data: "route_name"

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


    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
        UPDATE = '';
        editor.setValue("function main (data){\nreturn 'hello world';\n}");
        $('#txt_method').val('POST');
        $('#txt_description').val('');
        $('#txt_route').val('').prop('disabled', false);
        $('#txt_params').val('');

    });


    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: rootPath + "/api/functions/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                editor.setValue(data.code);
                $('#txt_method').val(data.method);
                $('#txt_description').val(data.description);
                $('#txt_route').val(data.route_name).prop('disabled', true);
                $('#txt_params').val(data.params);
                $('#myDataModal').modal('show');
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
            console.error(err);
        });
    });

    $(document).on('click', '.DeleteElement', function () {
        DELETE = $(this).val();
        alertify.confirm(lx_i18n.txt_fonfirm_delete, lx_i18n.txt_fonfirm_delete_question, function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: rootPath + "/api/functions/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                GetDataTable();
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


    var GetDataTable = function () {
        DT.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: rootPath + "/api/functions",
        }).done(function (data) {

            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {

                    DT.clear().rows.add(data.data).draw();
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
            console.error(err);
        });
    }

    $('#SaveChanges').click(function () {
        if ($('#txt_route').val() !== '' && editor.getValue() != '') {
            var data = {
                method: $('#txt_method').val(),
                description: $('#txt_description').val(),

                params: $('#txt_params').val(),
                code: editor.getValue(),
            }
            var url = rootPath + "/api/functions";
            var method = 'POST';
            if (UPDATE !== '') {
                url = url + '/' + UPDATE;
                method = 'PUT'
            } else {
                data.route_name = $('#txt_route').val();
            }
            $.ajax({
                url: url,
                method: method,
                data: data
            }).done(function (data) {
                HoldOn.close();
                $('#myDataModal').modal('hide');
                GetDataTable();
                alertify.success(lx_i18n.txt_save_correctly);
            }).fail(function (err) {
                HoldOn.close();
                alertify.error(lx_i18n.txt_txt_an_error_occured);
                console.error(err);
            });

        } else {
            alertify.error(lx_i18n.txt_full_all_data);

        }

    });

    GetDataTable();

    $('#txt_route').change(function () {
        var x = $(this).val()
        x = v.snakeCase(x);
        x = x.substring(0, 50);
        $('#txt_route').val(x)
    })

});
