
$(document).ready(function () {

    var UPDATE = '';

    $.fn.dataTable.ext.errMode = 'none';

    var DT = $('#uslers__').DataTable({
        language: DT_Lang,
        autoFill: false,
        data: {},
        responsive: true,
        columns: [
            {
                data: "username",

            },
            {
                data: "email",

            },
            {
                data: "password",
                render: function (data) {
                    if (data) {
                        return data.substring(0, 10) + '...';
                    }
                    return '_____';
                },

            },
            {
                data: "dt_reg",

            },
            {
                data: "provider_id",
                render: function (data, x, row) {

                    return data ? data : ''
                }

            },
            {
                data: "provider",
                render: function (data, x, row) {
                    return data ? data : ''
                }

            },
            {
                data: "user_picture",
                render: function (data, x, row) {
                    if (data) {
                        return '<img class="img img-thumbnail" src="' + data + '">'
                    }
                    return ''

                }

            },
            {
                data: "full_name",

            },
            {
                data: "role",
                render: function (data, x, row) {
                    if (data) {
                        return data.name;
                    }
                    return '';
                }

            },
            {
                data: "gender",

            },
            {
                data: "lang",

            },
            {
                data: "age",

            },
            {
                data: "phone",

            },
            {
                data: "cellphone",

            },
            {
                data: "bio",

            },
            {
                data: "country",

            },
            {
                data: "state",

            },
            {
                data: "city",

            },
            {
                data: "adress",

            },
            {
                data: "zip_code",

            },
            {
                data: "_id",

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
                data: "_id",
                render: function (data) {
                    return '<center>' +
                        '<button class=" DeleteElement btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement btn btn-primary" value="' + data + '"><i class="fas fa-edit"></i></button>'
                        + '<button class="EmailElement btn btn-info" value="' + data + '"><i class="fas fa-envelope"></i></button>'
                        + '</center>'
                }
            },

        ]
    });

    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
        UPDATE = '';
        $('#txt_username').val('')
        $('#txt_email').val('')
        $('#txt_password').val('')
        $('#txt_role').val('')
        $('#txt_fullname').val('')
        $('#txt_gender').val('')
        $('#txt_lang').val('')
        $('#txt_age').val('')
        $('#txt_phone').val('')
        $('#txt_cellphone').val('')
        $('#txt_country').val('')
        $('#txt_state').val('')
        $('#txt_city').val('')
        $('#txt_address').val('')
        $('#txt_zipcode').val('')
        $('#txt_image_save').val('')

    });


    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url:rootPath + "/api/user/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                $('#txt_username').val(data.username)
                $('#txt_email').val(data.email)
                $('#txt_password').val(data.password)
                $('#txt_role').val(data.role ? data.role._id : '')
                $('#txt_fullname').val(data.full_name)
                $('#txt_gender').val(data.gender)
                $('#txt_lang').val(data.lang)
                $('#txt_age').val(data.age)
                $('#txt_phone').val(data.phone)
                $('#txt_cellphone').val(data.cellphone)
                $('#txt_country').val(data.country)
                $('#txt_address').val(data.adress)
                $('#txt_zipcode').val(data.zip_code)
                $('#txt_image_save').val(data.user_picture)


                var SX = data;

                if (SX.country && SX.country !== '') {
                    $.getJSON(rootPath +'/api/state', {
                        strictsearch: {
                            country_id: SX.country
                        }
                    }, function (data2) {
                        if (data2.success) {
                            $.each(data2.data, function (i, item) {
                                $('#txt_state').append('<option value="' + item.id + '">' + item.name + '</option>')
                            });
                            $('#txt_state').val(SX.state)

                            $.getJSON(rootPath +'/api/city', {
                                strictsearch: {
                                    state_id: SX.state
                                }
                            }, function (data3) {
                                if (data3.success) {
                                    $.each(data3.data, function (i, item) {
                                        $('#txt_city').append('<option value="' + item.id + '">' + item.name + '</option>')
                                    });
                                    $('#txt_city').val(SX.city)
                                }
                            }).fail(function (err) {
                                console.error(err)
                                HoldOn.close();
                                alertify.error(lx_i18n.txt_txt_an_error_occured);
                            });

                        }
                    }).fail(function (err) {
                        console.error(err)
                        HoldOn.close();
                        alertify.error(lx_i18n.txt_txt_an_error_occured);
                    });
                }


                $('#myDataModal').modal('show')
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
                url:rootPath + "/api/user/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                TraeDataTable();
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

    $(document).on('change', '.CheckedActived_', function () {
        var X = $(this).val();
        var ch = $(this).prop('checked');

        $.ajax({
            url:rootPath + '/api/user/' + X,
            method: 'PUT',
            data: { active: ch }
        }).done(function (data) {
            TraeDataTable();
            alertify.success(lx_i18n.txt_save_correctly);
        }).fail(function (err) {

            alertify.error(lx_i18n.txt_txt_an_error_occured);
            console.error(err);
        });

    })

    var TraeDataTable = function () {
        DT.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url:rootPath + "/api/user",
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
        if ($('#txt_username').val() !== '' && $('#txt_email').val() && $('#txt_password').val()) {
            var data = {
                username: $('#txt_username').val(),
                email: $('#txt_email').val(),
                password: $('#txt_password').val(),
                role: $('#txt_role').val(),
                full_name: $('#txt_fullname').val(),
                gender: $('#txt_gender').val(),
                lang: $('#txt_lang').val(),
                age: $('#txt_age').val(),
                phone: $('#txt_phone').val(),
                cellphone: $('#txt_cellphone').val(),
                country: $('#txt_country').val(),
                state: $('#txt_state').val(),
                city: $('#txt_city').val(),
                adress: $('#txt_address').val(),
                zip_code: $('#txt_zipcode').val(),
                user_picture: $('#txt_image_save').val(),
            }
            var url =rootPath + "/api/user";
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
                TraeDataTable();
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

    TraeDataTable();

    var fillCatalogues = function () {

        //role catalogue
        $('#txt_role').html('');
        HoldOn.open(HoldOptions);
        $.getJSON(rootPath +'/api/user_roles', {
            strictsearch: {
                active: true
            },
            sort: {
                dt_reg: "asc"
            },
            //avoid:{},
            //paginate:{page:0,limit:0},
        }, function (data) {
            if (data.success) {
                $.each(data.data, function (i, item) {
                    $('#txt_role').append('<option value="' + item._id + '">' + item.name + '</option>')
                });
                HoldOn.close();
            }
        }).fail(function (err) {
            console.error(err)
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
        });

        //lang catalog
        $('#txt_lang').html('');
        HoldOn.open(HoldOptions);
        $.getJSON(rootPath +'/api/i18n', {
            //strictsearch: {},
            //sort: {},
            //avoid:{},
            //paginate:{page:0,limit:0},
        }, function (data) {
            if (data.success) {
                $.each(data.data, function (i, item) {
                    $('#txt_lang').append('<option value="' + item.code + '">' + item.name + '</option>')
                });
                HoldOn.close();
            }
        }).fail(function (err) {
            console.error(err)
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
        });

        //Country catalog
        $('#txt_country').html('');
        HoldOn.open(HoldOptions);
        $.getJSON(rootPath +'/api/country', {
            //strictsearch: {},
            //sort: {},
            //avoid:{},
            //paginate:{page:0,limit:0},
        }, function (data) {
            if (data.success) {
                $.each(data.data, function (i, item) {
                    $('#txt_country').append('<option value="' + item.id + '">' + item.name + '</option>')
                });
                HoldOn.close();
            }
        }).fail(function (err) {
            console.error(err)
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
        });


    }

    fillCatalogues();

    $('#txt_country').change(function () {
        var val = $(this).val();
        $('#txt_state').html('');
        HoldOn.open(HoldOptions);
        $.getJSON(rootPath +'/api/state', {
            strictsearch: {
                country_id: val
            }

        }, function (data) {
            if (data.success) {
                $.each(data.data, function (i, item) {
                    $('#txt_state').append('<option value="' + item.id + '">' + item.name + '</option>')
                });
                HoldOn.close();
            }
        }).fail(function (err) {
            console.error(err)
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
        });
    });

    $('#txt_state').change(function () {
        var val = $(this).val();
        $('#txt_city').html('');
        HoldOn.open(HoldOptions);
        $.getJSON(rootPath +'/api/city', {
            strictsearch: {
                state_id: val.toString()
            }
        }, function (data) {
            if (data.success) {
                $.each(data.data, function (i, item) {
                    $('#txt_city').append('<option value="' + item.id + '">' + item.name + '</option>')
                });
                HoldOn.close();
            }
        }).fail(function (err) {
            console.error(err)
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
        });
    });



    $('#txt_image').change(function () {
        if ($(this).val() == '') {
            return 0;
        }
        HoldOn.open(HoldOptions);
        var data = new FormData();
        data.append('Image', $('#txt_image')[0].files[0]);
        data.append('collection', 'image');
        $.ajax({
            url: rootPath +'/upload',
            data: data,
            contentType: false,
            processData: false,
            method: 'POST',
            success: function (data) {
                HoldOn.close();
                if (data.success) {
                    $('#txt_image_save').val(data.file);
                }
            },
            error: function (err) {
                HoldOn.close();
                alertify.error(lx_i18n.txt_txt_an_error_occured);
                console.error(err);
            }
        });

    })



});
