
$(document).ready(function () {

    $.fn.dataTable.ext.errMode = 'none';
    var UPDATE = '';

    var DT = $('#Table_').DataTable({
        language: DT_Lang,
        responsive: true,
        data: {},
        columns: [
            {
                data: "_id"
            },
            {
                data: "title"
            },
            {
                data: "f_name"
            },
            {
                data: "dt_reg"

            },
            {
                data: "dt_update"

            },
            {
                data: "active",
                render: function (data, s, row) {
                    if (data) {
                        return '<input value="' + row._id + '" type="checkbox" checked="true"  class="CheckedActived_" >'
                    } else {
                        return '<input value="' + row._id + '" type="checkbox"  class="CheckedActived_" >'
                    }

                }
            },
            {
                data: "autor"

            },
            {
                data: "_id",
                render: function (data) {
                    return '<center>' +
                        '<button class=" DeleteElement btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement btn btn-primary" value="' + data + '"><i class="fas fa-edit"></i></button>'
                        + '<hr>'
                        + '<button class="UploadPage_ btn btn-info btn-block" value="' + data + '"><i class="fas fa-file-upload"> </i> ' + lx_i18n.admin_button_upload_bootstrap_template + '</button>'
                        + '<button class="EditTemplate btn btn-success btn-block" value="' + data + '"><i class="fas fa-file-signature"></i> ' + lx_i18n.admin_button_bs_template_editor + '</button>'
                        + 'The Botstrap4 template editor (leganuxWBx) is still available  for external users at <a target="_blank" href="http://wbx.leganux.com/">http://wbx.leganux.com/</a> as standalone app'
                        + '</center>'
                }
            },

        ]
    });



    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
        UPDATE = '';
        $('#txt_title').val('')
        $('#txt_f_name').val('')


    });

    var UploadOrEditTemplate = '';

    $(document).on('click', '.UploadPage_', function () {
        UploadOrEditTemplate = $(this).val();
        $('#UploadTemplate_').modal('show')
    });

    $(document).on('click', '.EditTemplate', function () {
        UploadOrEditTemplate = $(this).val()
        localStorage.setItem('tmpEditLX', UploadOrEditTemplate);
        window.open('/lx_admin/leganuxWB/' + UploadOrEditTemplate);

    });


    $('#txt_template_file').change(function () {
        if ($(this).val() !== '' && $(this).val().includes('.html')) {
            var inputF = document.getElementById('txt_template_file');
            var reader = new FileReader();
            reader.readAsText(inputF.files[0]);
            reader.onloadend = function () {
                var X = reader.result;
                //X = extractBodyContent(X)
                if (X) {
                    $('#txt_data_templete').val(X)
                } else {
                    $('#txt_data_templete').val('')
                    alertify.error(lx_i18n.txt_txt_an_error_occured);
                }
            };
        }

    });

    //txt_data_templete

    $('#SaveChangesTempModal').click(function () {

        if ($('#txt_data_templete').val() == "") {
            alertify.error(lx_i18n.txt_txt_an_error_occured);
            return 0;
        }
        var url =rootPath + "/api/dPage";
        url = url + '/' + UploadOrEditTemplate;
        method = 'PUT'
        $.ajax({
            url: url,
            method: method,
            data: { html: $('#txt_data_templete').val() }
        }).done(function (data) {
            HoldOn.close();
            $('#UploadTemplate_').modal('hide');
            $('#txt_template_file').val('');
            GetDataTable();
            alertify.success(lx_i18n.txt_save_correctly);
        }).fail(function (err) {
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
            console.error(err);
        });
    })


    $(document).on('change', '.CheckedActived_', function () {
        var X = $(this).val();
        var ch = $(this).prop('checked');

        $.ajax({
            url:rootPath + '/api/dPage/' + X,
            method: 'PUT',
            data: { active: ch }
        }).done(function (data) {
            GetDataTable();
            alertify.success(lx_i18n.txt_save_correctly);
        }).fail(function (err) {

            alertify.error(lx_i18n.txt_txt_an_error_occured);
            console.error(err);
        });

    })

    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url:rootPath + "/api/dPage/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                $('#txt_title').val(data.title)
                $('#txt_f_name').val(data.f_name)


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
                url:rootPath + "/api/dPage/" + DELETE,
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
            url:rootPath + "/api/dPage",
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
        if ($('#txt_title').val() !== '' && $('#txt_f_name').val()) {
            var data = {
                title: $('#txt_title').val(),
                f_name: $('#txt_f_name').val(),

            }
            var url =rootPath + "/api/dPage";
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



    $('#txt_title').change(function () {
        var x = $(this).val()
        x = v.snakeCase(x);
        x = x.substring(0, 50);
        $('#txt_f_name').val(x)
    })

    $('#txt_f_name').change(function () {
        var x = $(this).val()
        x = v.snakeCase(x);
        x = x.substring(0, 50);
        $('#txt_f_name').val(x)
    })




});
