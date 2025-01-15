# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint allows users to register by providing their username, email, and password. The password will be hashed before storing it in the database.

## Request Body
The request body should be a JSON object with the following fields:
- `username` (string, required): The username of the user. Must be at least 3 characters long.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password of the user. Must be at least 6 characters long.

Example:
```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
}
```

## Response Body
The response body will be a JSON object with the following fields:
- `user` (object): The user object containing the user's details.
  - `_id` (string): The unique identifier of the user.
  - `username` (string): The username of the user.
  - `email` (string): The email address of the user.
- `token` (string): The authentication token for the user.

Example:
```json
{
    "user": {
        "_id": "60c72b2f9b1d8e001c8e4e1a",
        "username": "john_doe",
        "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Error Response
If there is an error with the request, the response body will be a JSON object with the following fields:
- `error` (array): An array of error objects.
  - `msg` (string): The error message.
  - `param` (string): The parameter that caused the error.
  - `location` (string): The location of the parameter.

Example:
```json
{
    "error": [
        {
            "msg": "Invalid email format",
            "param": "email",
            "location": "body"
        }
    ]
}
```

## Status Codes
- 201 Created: The user was successfully registered.
- 400 Bad Request: The request body is invalid or missing required fields.
- 500 Internal Server Error: An error occurred on the server side.

## Usage
To use this endpoint, send a POST request to /users/register with the required JSON body.
```sh
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
}'
```

# User Login Endpoint

## Endpoint
`POST /users/login`

## Description
This endpoint allows users to log in by providing their email and password. If the credentials are valid, an authentication token will be returned.

## Request Body
The request body should be a JSON object with the following fields:
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password of the user. Must be at least 6 characters long.

Example:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

## Response Body
The response body will be a JSON object with the following fields:
- `user` (object): The user object containing the user's details.
  - `_id` (string): The unique identifier of the user.
  - `username` (string): The username of the user.
  - `email` (string): The email address of the user.
- `token` (string): The authentication token for the user.

Example:
```json
{
    "user": {
        "_id": "60c72b2f9b1d8e001c8e4e1a",
        "username": "john_doe",
        "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Error Response
If there is an error with the request, the response body will be a JSON object with the following fields:
- `error` (array): An array of error objects.
  - `msg` (string): The error message.
  - `param` (string): The parameter that caused the error.
  - `location` (string): The location of the parameter.

Example:
```json
{
    "error": [
        {
            "msg": "Invalid email format",
            "param": "email",
            "location": "body"
        }
    ]
}
```

## Status Codes
- 200 OK: The user was successfully logged in.
- 400 Bad Request: The request body is invalid or missing required fields.
- 401 Unauthorized: The credentials are invalid.
- 500 Internal Server Error: An error occurred on the server side.

## Usage
To use this endpoint, send a POST request to /users/login with the required JSON body.
```sh
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
    "email": "john@example.com",
    "password": "password123"
}'
```