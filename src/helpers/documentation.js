const env = require('./../config/environment.config');
const m2s = require('mongoose-to-swagger');
const country = require('./../models/NOSQL/countries.model');


module.exports = {
    "swagger": "2.0",
    "info": {
        "title": "Rest documentation for YAAFLEX ",
        "description": "This is a Sample documentation of YAAFLEX. Use this section to create your own description of documentation based on API-DOC - SWAGGER",
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
                        "content": {
                            "application/json:": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "description": "Message from server"
                                        },
                                        "success": {
                                            "type": "boolean",
                                            "description": "True or false"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Forbbiden",
                        "content": {
                            "application/json:": {}
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