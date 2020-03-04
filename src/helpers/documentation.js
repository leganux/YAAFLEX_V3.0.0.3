const env = require('./../config/environment.config');
const m2s = require('mongoose-to-swagger');
const country = require('./../models/NOSQL/countries.model');
const fs = require('fs');

const path = require('path');
var dir_ = path.join(__dirname, 'swagger.json')


var arrayList = [
    {
        p: '/api/admin_roles',
        family: 'roles',
        model: require('./../models/NOSQL/admin_roles.model')
    },
    {
        p: '/api/admin',
        family: 'roles',
        model: require('./../models/NOSQL/admin')
    },

];


general_query_helper_Constructor = async function (arr) {

    var allSpaces = [];

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];

        var response = await item.model.find().limit(3).skip(0).exec();
        allSpaces.push({
            path: item.p,
            data: {
                "get": {
                    "x-swagger-router-controller": item.family,
                    "operationId": item.family + '_get' + i + 1,
                    "tags": [
                        item.family
                    ],
                    "description": "Using this path to get all the data in catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        }, {
                            "name": "JSON query",
                            "description": "We use this this parameters to rich our requests." +
                            "\n " +
                            "\n Example: { strictsearch:{ name:'Afghanistan' }, sort:{ name:'desc'}, 'search':{'name':'< something to search like true, false, or %word%  >'},paginate:{limit:10, page:1} select:{ name:1, id:1 } ; " +
                            "\n Meaning: \n" +
                            "\n sort: order by field in desc or asc " +
                            "\n paginate: limits results by page an limit(how namy) per page " +
                            "\n strictsearch: make a strict search (match case) " +
                            "\n avoid: avoids contents that includes that (match case) " +
                            "\n like: makes a subquery frm  principal query %find% " +
                            "\n select: returns onliy the fiels you wanna " +
                            "\n search: search as bolean or as %word% in SQL " +
                            "\n SOON more search parameters ",
                            "in": "query",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns a list of " + item.p,
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": response
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "post": {
                    "x-swagger-router-controller": "country",
                    "operationId": item.family + '_post' + i + 2,
                    "tags": [
                        item.family
                    ],
                    "description": "Using this path to save a new document in catalogue",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "JSON object",
                            "description": "We use this object to save data in collection.",

                            "in": "body",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,
                            example: response[0]

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns a saved object",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": response[0]
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
            }
        });
        allSpaces.push({
            path: item.p + '/{id}',
            data: {
                "get": {
                    "x-swagger-router-controller": "country",
                    "operationId": item.family + '_getone' + i + 3,
                    "tags": [
                        item.family
                    ],
                    "description": "Using this path to get an element from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns an element form catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": response[0]
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "delete": {
                    "operationId": item.family + '_delete' + i + 1,
                    "tags": [
                        item.family
                    ],

                    "description": "Using this path to delete an element from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns the element that was deleted from catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": response[0]
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "put": {
                    "operationId": item.family + '_put' + i + 1,
                    "tags": [
                        item.family
                    ],

                    "description": "Using this path to update an element from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                        {
                            "name": "JSON object",
                            "description": "We use this object to update data in collection.",

                            "in": "body",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,
                            example: response[0]

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns the element that was updated in catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": response[0]
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
            }
        })

    }

    return allSpaces;

};


let construcSwagger = async function () {

    let OBJ = await  general_query_helper_Constructor(arrayList);

    var swaggerOBJ = {
        "swagger": "2.0",
        "info": {
            "title": "API-Rest documentation for YAAFLEX ",
            "description": "This is a Sample documentation of YAAFLEX. Use this section to create your own description of documentation based on OPEN-API JSON and SWAGGER",
            "version": "3.0.0.3"
        },
        "produces": [
            "application/json"
        ],
        "paths": {
            [env.root + "/auth/token/getAdminToken"]: {

                "post": {
                    "x-swagger-router-controller": "authToken",
                    "operationId": "0",
                    "tags": [
                        "auth-JWT"
                    ],
                    "description": "Using this path to generate a JSON Web token to make external API Request as admin",
                    "parameters": [
                        {
                            "name": "JSON object",
                            "description": "We use this object to login.",

                            "in": "body",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,
                            example: {
                                "username": "admin",
                                "password": "12345"
                            }

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns an auth token",
                            "examples": {
                                "application/json": {
                                    "message": "OK",
                                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjp7Il9pZCI6IjVjYmI1NjA3ZmI2NDNiNTliZTg4NzcwMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImVyaWNrY3J1ekBsZWdhbnV4LmNvbSIsInBhc3N3b3JkIjoiJDJhJDEyJHQ2YVFmLmd2ajVsUTVTNmgyckdqSGVQRC9wRVkzL0FURzljUVdhYlBxZVN1WHM2eGF1MG4yIiwiYWN0aXZlIjp0cnVlLCJyb2xlIjoiNWNiYTlkMDdjOWJlZjU0YmI2MGQyZTBhIiwiZHRfcmVnIjoiMjAxOS0wNC0yMFQxNzoyNToxMC4wMDBaIiwiX192IjowfSwicHJvcCI6eyJraW5kIjoiYWRtaW4iLCJyb2xlIjoiNWNiYTlkMDdjOWJlZjU0YmI2MGQyZTBhIn0sImlzRnJvbUFQSSI6dHJ1ZSwiaWF0IjoxNTgzMzUzNjU5LCJleHAiOjE1ODMzNTcyNTl9.JZrsCpmTc2CPA3GGGsiD5RUmCcMMFMGFTnvUKfq3phQ",
                                    "success": true
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },

            },
            [env.root + "/auth/token/getUserToken"]: {

                "post": {
                    "x-swagger-router-controller": "authToken",
                    "operationId": "1",
                    "tags": [
                        "auth-JWT"
                    ],
                    "description": "Using this path to generate a JSON Web token to make external API Request as user",
                    "parameters": [
                        {
                            "name": "JSON object",
                            "description": "We use this object to login.",

                            "in": "body",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,
                            example: {
                                "username": "admin",
                                "password": "12345"
                            }

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns an auth token",
                            "examples": {
                                "application/json": {
                                    "message": "OK",
                                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjp7Il9pZCI6IjVjYmI1NjA3ZmI2NDNiNTliZTg4NzcwMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImVyaWNrY3J1ekBsZWdhbnV4LmNvbSIsInBhc3N3b3JkIjoiJDJhJDEyJHQ2YVFmLmd2ajVsUTVTNmgyckdqSGVQRC9wRVkzL0FURzljUVdhYlBxZVN1WHM2eGF1MG4yIiwiYWN0aXZlIjp0cnVlLCJyb2xlIjoiNWNiYTlkMDdjOWJlZjU0YmI2MGQyZTBhIiwiZHRfcmVnIjoiMjAxOS0wNC0yMFQxNzoyNToxMC4wMDBaIiwiX192IjowfSwicHJvcCI6eyJraW5kIjoiYWRtaW4iLCJyb2xlIjoiNWNiYTlkMDdjOWJlZjU0YmI2MGQyZTBhIn0sImlzRnJvbUFQSSI6dHJ1ZSwiaWF0IjoxNTgzMzUzNjU5LCJleHAiOjE1ODMzNTcyNTl9.JZrsCpmTc2CPA3GGGsiD5RUmCcMMFMGFTnvUKfq3phQ",
                                    "success": true
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },

            },
            [env.root + "/api/country"]: {
                "get": {
                    "x-swagger-router-controller": "country",
                    "operationId": "2",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to get all the data in catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        }, {
                            "name": "JSON query",
                            "description": "We use this this parameters to rich our requests." +
                            "\n " +
                            "\n Example: { strictsearch:{ name:'Afghanistan' }, sort:{ name:'desc'}, 'search':{'name':'< something to search like true, false, or %word%  >'},paginate:{limit:10, page:1} select:{ name:1, id:1 } ; " +
                            "\n Meaning: \n" +
                            "\n sort: order by field in desc or asc " +
                            "\n paginate: limits results by page an limit(how namy) per page " +
                            "\n strictsearch: make a strict search (match case) " +
                            "\n avoid: avoids contents that includes that (match case) " +
                            "\n like: makes a subquery frm  principal query %find% " +
                            "\n select: returns onliy the fiels you wanna " +
                            "\n search: search as bolean or as %word% in SQL " +
                            "\n SOON more search parameters ",
                            "in": "query",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns a list of countries",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": [{
                                        "_id": "5cbb6dc522b4c967b75f3292",
                                        "id": 1,
                                        "sortname": "AF",
                                        "name": "Afghanistan",
                                        "phoneCode": "93"
                                    },
                                        {
                                            "_id": "5cbb6dc522b4c967b75f3293",
                                            "id": 2,
                                            "sortname": "AL",
                                            "name": "Albania",
                                            "phoneCode": "355"
                                        },
                                        {
                                            "_id": "5cbb6dc522b4c967b75f3294",
                                            "id": 3,
                                            "sortname": "DZ",
                                            "name": "Algeria",
                                            "phoneCode": "213"
                                        }]
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "post": {
                    "x-swagger-router-controller": "country",
                    "operationId": "3",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to save a new document in catalgue",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "JSON object",
                            "description": "We use this object to save data in collection.",

                            "in": "body",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,
                            example: {
                                id: 1,
                                shortname: 'AF',
                                name: 'Afghanistan',
                                phoneCode: '93'
                            }

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns a saved object",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        "_id": "5cbb6dc522b4c967b75f3292",
                                        "id": 1,
                                        "sortname": "AF",
                                        "name": "Afghanistan",
                                        "phoneCode": "93"
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },

            },
            [env.root + "/api/country/{id}"]: {
                "get": {
                    "x-swagger-router-controller": "country",
                    "operationId": "4",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to get an elemento from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns an element form catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        "_id": "5cbb6dc522b4c967b75f3292",
                                        "id": 1,
                                        "sortname": "AF",
                                        "name": "Afghanistan",
                                        "phoneCode": "93"
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "delete": {
                    "x-swagger-router-controller": "country",
                    "operationId": "5",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to delete an element from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns the element that was deleted from catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        "_id": "5cbb6dc522b4c967b75f3292",
                                        "id": 1,
                                        "sortname": "AF",
                                        "name": "Afghanistan",
                                        "phoneCode": "93"
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "put": {
                    "x-swagger-router-controller": "country",
                    "operationId": "6",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to update an element from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                        {
                            "name": "JSON object",
                            "description": "We use this object to update data in collection.",

                            "in": "body",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,
                            example: {
                                id: 1,
                                shortname: 'AF',
                                name: 'Afghanistan',
                                phoneCode: '93'
                            }

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns the element that was updated in catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        "_id": "5cbb6dc522b4c967b75f3292",
                                        "id": 1,
                                        "sortname": "AF",
                                        "name": "Afghanistan",
                                        "phoneCode": "93"
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
            },
            [env.root + "/api/state"]: {
                "get": {
                    "x-swagger-router-controller": "country",
                    "operationId": "7",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to get all the data in catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        }, {
                            "name": "JSON query",
                            "description": "We use this this parameters to rich our requests." +
                            "\n " +
                            "\n Example: { strictsearch:{ name:'Afghanistan' }, sort:{ name:'desc'}, 'search':{'name':'< something to search like true, false, or %word%  >'},paginate:{limit:10, page:1} select:{ name:1, id:1 } ; " +
                            "\n Meaning: \n" +
                            "\n sort: order by field in desc or asc " +
                            "\n paginate: limits results by page an limit(how namy) per page " +
                            "\n strictsearch: make a strict search (match case) " +
                            "\n avoid: avoids contents that includes that (match case) " +
                            "\n like: makes a subquery frm  principal query %find% " +
                            "\n select: returns onliy the fiels you wanna " +
                            "\n search: search as bolean or as %word% in SQL " +
                            "\n SOON more search parameters ",
                            "in": "query",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns a list of states",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": [{
                                        _id: "5cbb890d22b4c96ee24fba22",
                                        id: 1,
                                        name: "Andaman and Nicobar Islands",
                                        country_id: "101",
                                    },
                                        {
                                            _id: "5cbb890d22b4c96ee24fba23",
                                            id: 2,
                                            name: "Andhra Pradesh",
                                            country_id: "101",
                                        },
                                        {
                                            _id: "5cbb890d22b4c96ee24fba24",
                                            id: 3,
                                            name: "Arunachal Pradesh",
                                            country_id: "101",
                                        }]
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "post": {
                    "x-swagger-router-controller": "country",
                    "operationId": "8",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to save a new document in catalogue",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "JSON object",
                            "description": "We use this object to save data in collection.",

                            "in": "body",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,
                            example: {
                                _id: "5cbb890d22b4c96ee24fba22",
                                id: 1,
                                name: "Andaman and Nicobar Islands",
                                country_id: "101",
                            }

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns a saved object",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        "_id": "5cbb6dc522b4c967b75f3292",
                                        "id": 1,
                                        "sortname": "AF",
                                        "name": "Afghanistan",
                                        "phoneCode": "93"
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },

            },
            [env.root + "/api/state/{id}"]: {
                "get": {
                    "x-swagger-router-controller": "country",
                    "operationId": "9",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to get an elemento from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns an element form catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        _id: "5cbb890d22b4c96ee24fba22",
                                        id: 1,
                                        name: "Andaman and Nicobar Islands",
                                        country_id: "101",
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "delete": {
                    "x-swagger-router-controller": "country",
                    "operationId": "10",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to delete an element from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns the element that was deleted from catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        _id: "5cbb890d22b4c96ee24fba22",
                                        id: 1,
                                        name: "Andaman and Nicobar Islands",
                                        country_id: "101",
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "put": {
                    "x-swagger-router-controller": "country",
                    "operationId": "11",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to update an element from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                        {
                            "name": "JSON object",
                            "description": "We use this object to update data in collection.",

                            "in": "body",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,
                            example: {
                                _id: "5cbb890d22b4c96ee24fba22",
                                id: 1,
                                name: "Andaman and Nicobar Islands",
                                country_id: "101",
                            }

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns the element that was updated in catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        "_id": "5cbb6dc522b4c967b75f3292",
                                        "id": 1,
                                        "sortname": "AF",
                                        "name": "Afghanistan",
                                        "phoneCode": "93"
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
            },
            [env.root + "/api/city"]: {
                "get": {
                    "x-swagger-router-controller": "city",
                    "operationId": "12",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to get all the data in catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        }, {
                            "name": "JSON query",
                            "description": "We use this this parameters to rich our requests." +
                            "\n " +
                            "\n Example: { strictsearch:{ name:'Afghanistan' }, sort:{ name:'desc'}, 'search':{'name':'< something to search like true, false, or %word%  >'},paginate:{limit:10, page:1} select:{ name:1, id:1 } ; " +
                            "\n Meaning: \n" +
                            "\n sort: order by field in desc or asc " +
                            "\n paginate: limits results by page an limit(how namy) per page " +
                            "\n strictsearch: make a strict search (match case) " +
                            "\n avoid: avoids contents that includes that (match case) " +
                            "\n like: makes a subquery frm  principal query %find% " +
                            "\n select: returns onliy the fiels you wanna " +
                            "\n search: search as bolean or as %word% in SQL " +
                            "\n SOON more search parameters ",
                            "in": "query",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns a list of cities",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": [{
                                        _id: "5cbb8bca22b4c96ee24fca33",
                                        id: 1,
                                        name: "Bombuflat",
                                        state_id: "1",
                                    },
                                        {
                                            _id: "5cbb8bca22b4c96ee24fca34",
                                            id: 2,
                                            name: "Garacharma",
                                            state_id: "1",
                                        },
                                        {
                                            _id: "5cbb8bca22b4c96ee24fca35",
                                            id: 3,
                                            name: "Port Blair",
                                            state_id: "1",
                                        }]
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "post": {
                    "x-swagger-router-controller": "country",
                    "operationId": "13",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to save a new document in catalogue",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "JSON object",
                            "description": "We use this object to save data in collection.",

                            "in": "body",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,
                            example: {
                                _id: "5cbb8bca22b4c96ee24fca34",
                                id: 2,
                                name: "Garacharma",
                                state_id: "1",
                            }

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns a saved object",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        "_id": "5cbb6dc522b4c967b75f3292",
                                        "id": 1,
                                        "sortname": "AF",
                                        "name": "Afghanistan",
                                        "phoneCode": "93"
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },

            },
            [env.root + "/api/city/{id}"]: {
                "get": {
                    "x-swagger-router-controller": "country",
                    "operationId": "14",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to get an elemento from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns an element form catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        _id: "5cbb8bca22b4c96ee24fca34",
                                        id: 2,
                                        name: "Garacharma",
                                        state_id: "1",
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "delete": {
                    "x-swagger-router-controller": "country",
                    "operationId": "15",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to delete an element from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns the element that was deleted from catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        _id: "5cbb8bca22b4c96ee24fca34",
                                        id: 2,
                                        name: "Garacharma",
                                        state_id: "1",
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        }
                        ,
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
                "put": {
                    "x-swagger-router-controller": "country",
                    "operationId": "16",
                    "tags": [
                        "places"
                    ],
                    "description": "Using this path to update an element from catalogue ",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "type": "string",
                            "description": "It is used to request  the API from external APP you can use a simple token, Bearer token or Basic Auth. You must only use basic auth from a perfil of user and only request Server to Server to protect the information.    ",
                            "required": false
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "type": "string",
                            "description": "It is used to identify an specific element from catalogue by ID",
                            "required": false
                        },
                        {
                            "name": "JSON object",
                            "description": "We use this object to update data in collection.",

                            "in": "body",
                            "type": "object",
                            "collectionFormat": "multi",
                            "items": {
                                "type": "object"
                            },
                            "required": false,
                            example: {
                                _id: "5cbb8bca22b4c96ee24fca34",
                                id: 2,
                                name: "Garacharma",
                                state_id: "1",
                            }

                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Returns the element that was updated in catalogue",
                            "examples": {
                                "application/json": {
                                    "mesage": "OK",
                                    "success": true,
                                    "data": {
                                        "_id": "5cbb6dc522b4c967b75f3292",
                                        "id": 1,
                                        "sortname": "AF",
                                        "name": "Afghanistan",
                                        "phoneCode": "93"
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "Forbbiden",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "403 forbidden  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        },
                        "404": {
                            "description": "Not Found",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "404 not found  - Error Mesage ",
                                    error: "error_data"

                                }

                            }
                        },
                        "500": {
                            "description": "Internal Server Error",
                            "examples": {
                                "application/json": {
                                    success: false,
                                    message: "500  internal server error  - Error Mesage ",
                                    error: "error_data"

                                }
                            }
                        }
                    }
                },
            },


        }
    };

    for (var i = 0; i < OBJ.length; i++) {

        var item = OBJ[i];
        swaggerOBJ.paths[env.root + item.path] = item.data;
    }


    fs.writeFile(dir_, JSON.stringify(swaggerOBJ), 'utf-8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });


}


module.exports = construcSwagger()

