var DT = {};
var DT2 = {};
var DT3 = {};

$(document).ready(function () {

    $.fn.dataTable.ext.errMode = 'none';


    DT = $('#Table_of_Countries').DataTable({
        language: DT_Lang,
        responsive: true,
        data: {},
        processing: true,
        serverSide: true,
        ajax: {
            url: rootPath + "/api/country/datatable",
            type: "POST"
        },
        columns: [
            {
                data: "_id"

            },
            {
                data: "id"

            },
            {
                data: "sortname"

            },

            {
                data: "name"

            },
            {
                data: "phoneCode"

            }
        ]
    });

    DT2 = $('#Table_of_States').DataTable({
        language: DT_Lang,
        responsive: true,
        data: {},
        processing: true,
        serverSide: true,
        ajax: {
            url: rootPath + "/api/state/datatable",
            type: "POST"
        },
        columns: [
            {
                data: "_id"

            },
            {
                data: "id"

            },

            {
                data: "name"

            },
            {
                data: "country_id"

            }
        ]
    });

    DT3 = $('#Table_of_Cities').DataTable({
        language: DT_Lang,
        responsive: true,
        data: {},
        processing: true,
        serverSide: true,
        ajax: {
            url: rootPath + "/api/city/datatable",
            type: "POST"
        },
        columns: [
            {
                data: "_id"

            },
            {
                data: "id"

            },

            {
                data: "name"

            },
            {
                data: "state_id"

            }
        ]
    });


});
