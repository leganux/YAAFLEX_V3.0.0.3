var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true
});

editor.setOption("theme", 'dracula');


$(document).ready(function () {

    $.fn.dataTable.ext.errMode = 'none';
    var UPDATE = '';

    var DT = $('#Table_of_cron').DataTable({
        language: DT_Lang,
        responsive: true,
        data: {},
        columns: [
            {
                data: "id"
            },
            {
                data: "state",
                render: function (data) {
                    return data ? '<span class="badge badge-success">Activo / Active</span>' : '<span class="badge badge-danger">Inactive / Inactivo</span>'
                }
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
                data: "cron_string"
            },
            {
                data: "minute"
            },
            {
                data: "hour"
            },
            {
                data: "dayOfTheMonth"
            },
            {
                data: "dayOfTheWeek"
            },
            {
                data: "monthOfTheYear"
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
        editor.setValue("function main (data){\nconsole.log('hello world');\n}");
        $('#txt_state').val('1');
        $('#txt_description').val('');
        $('#txt_minute').val('');
        $('#txt_hour').val('');
        $('#txt_dayofmont').val('');
        $('#txt_dayofweek').val('');
        $('#txt_mothofyear').val('');
        $('#txt_cron_string').val('* * * * *');

    });

    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: rootPath + "/api/cron/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                editor.setValue(data.code);

                $('#txt_state').val(data.state ? 1 : 0);
                $('#txt_description').val(data.description);
                $('#txt_cron_string').val(data.cron_string);
                $('#txt_minute').val(data.minute);
                $('#txt_hour').val(data.hour);
                $('#txt_dayofmont').val(data.dayOfTheMonth);
                $('#txt_dayofweek').val(data.dayOfTheWeek);
                $('#txt_mothofyear').val(data.monthOfTheYear);
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
                url: rootPath + "/api/cron/" + DELETE,
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
            url: rootPath + "/api/cron",
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
        if (editor.getValue() != '') {
            let data = {

                state: $('#txt_state').val(),
                //cron_string: $('#txt_cron_string').val(),
                minute: $('#txt_minute').val(),
                hour: $('#txt_hour').val(),
                dayOfTheMonth: $('#txt_dayofmont').val(),
                dayOfTheWeek: $('#txt_dayofweek').val(),
                monthOfTheYear: $('#txt_mothofyear').val(),
                description: $('#txt_description').val(),
                code: editor.getValue(),
            };


            let url = rootPath + "/api/cron";
            let method = 'POST';
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


});
