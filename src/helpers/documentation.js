const env = require('./../config/environment.config');
const m2s = require('mongoose-to-swagger');
const country = require('./../models/NOSQL/countries.model');


module.exports = {
    "swagger": "2.0",
    "info": {
        "title": "Rest documentation for YAAFLEX ",
        "description": "This is a Sample documentation of YAAFLEX. Use this section to create your own description of documentation based on OPEN-API JSON and SWAGGER",
        "version": "1.0"
    },
    "produces": [
        "application/json"
    ],
    "paths": {
        [env.root + "/api/country"]: {
            "get": {
                "x-swagger-router-controller": "country",
                "operationId": "country list",
                "tags": [
                    "/places"
                ],
                "description": "Using this path to get all the data in  country catalogue ",
                "parameters": [
                    {
                        "name": "strictsearch",
                        "in": "query",
                        "type": "object",
                        "collectionFormat": "multi",
                        "items": {
                            "type": "object"
                        },
                        "required": false
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
                                message: "Error Mesage",
                                error: {
                                    data: "error_data"
                                }

                            }
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "examples": {
                            "application/json": {
                                success: false,
                                message: "Error Mesage",
                                error: {
                                    data: "error_data"
                                }

                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "examples": {
                            "application/json": {
                                success: false,
                                message: "Error Mesage",
                                error: {
                                    data: "error_data"
                                }

                            }
                        }
                    }
                }
            },
            "post": {
                "x-swagger-router-controller": "country",
                "operationId": "0",
                "tags": [
                    "/places"
                ],
                "description": "Adding new country",
                "parameters": [],
                "responses": {}
            }
        },
        "/bar": {
            "get": {
                "x-swagger-router-controller": "bar",
                "operationId": "impossible",
                "tags": [
                    "/places"
                ],
                "description": "",
                "parameters": [],
                "responses": {}
            }
        }
    }
}