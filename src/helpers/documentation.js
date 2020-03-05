const env = require('./../config/environment.config');
const m2s = require('mongoose-to-swagger');
const country = require('./../models/NOSQL/countries.model');
const fs = require('fs');

const path = require('path');
var dir_ = path.join(__dirname, 'swagger.json')


var arrayList = [
    {
        p: '/api/admin_roles',
        family: 'admin_roles',
        model: require('./../models/NOSQL/admin_roles.model')
    },
    {
        p: '/api/admin',
        family: 'admins',
        model: require('./../models/NOSQL/admin')
    },
    {
        p: '/api/user_roles',
        family: 'user_roles',
        model: require('./../models/NOSQL/user_roles.model')
    },
    {
        p: '/web/api/user',
        family: 'users',
        model: require('./../models/NOSQL/user.model')
    },
    {
        p: '/api/admin_routes',
        family: 'admin_access_routes_permissions',
        model: require('./../models/NOSQL/user.model')
    },
    {
        p: '/api/user_routes',
        family: 'users_access_routes_permissions',
        model: require('./../models/NOSQL/user.model')
    },
    {
        p: '/api/file_admin',
        family: 'file_admin',
        model: require('./../models/NOSQL/fileAdmin.model')
    },
    {
        p: '/api/article',
        family: 'blog',
        model: require('./../models/NOSQL/articles.model')
    },
    {
        p: '/api/dPage',
        family: 'dinamic_pages',
        model: require('./../models/NOSQL/dinamic_pages.model')
    },
    {
        p: '/api/country',
        family: 'places',
        model: require('./../models/NOSQL/countries.model')
    },
    {
        p: '/api/state',
        family: 'places',
        model: require('./../models/NOSQL/states.model')
    },
    {
        p: '/api/city',
        family: 'places',
        model: require('./../models/NOSQL/cities.model')
    }

];


general_query_helper_Constructor = async function (arr) {

    var allSpaces = [];

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item.model) {
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


    }

    return allSpaces;

};


let construcSwagger = async function (arr) {

    if (!arr) {
        arr = arrayList
    } else {
        arr = arrayList.concat(arr)
    }
    let OBJ = await  general_query_helper_Constructor(arr);

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


module.exports = construcSwagger;

