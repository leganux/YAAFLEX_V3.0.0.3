const express = require('express');
const router = express.Router();
const fs = require('fs');
const env = require('./../config/environment.config');

const swaggerUi = require('swagger-ui-express');

const path = require('path');
var dir_ = path.join(__dirname, 'swagger.json')


require('./documentation')();

router.use('/', swaggerUi.serve);


let setupSwagger = function () {
    try {
        if (!fs.existsSync(dir_)) {

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

            fs.writeFile(dir_, JSON.stringify(swaggerOBJ), 'utf-8', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }
        let content = fs.readFileSync(dir_)
        router.get('/', swaggerUi.setup(JSON.parse(content)));
    }
    catch (err) {
        console.error(err);

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

        fs.writeFile(dir_, JSON.stringify(swaggerOBJ), 'utf-8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        setTimeout(function () {
            setupSwagger()

        }, 1000)
    }

}

setupSwagger();

module.exports = router;