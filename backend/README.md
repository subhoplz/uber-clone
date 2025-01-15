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

# User Profile Endpoint

## Endpoint
`GET /users/profile`

## Description
This endpoint retrieves the profile information of the authenticated user.

## Authentication
Requires a valid JWT token in the Authorization header or cookie.

## Response Body
The response body will be a JSON object with the following fields:
- `success` (boolean): Indicates if the request was successful
- `user` (object): The user object containing the user's details
  - `_id` (string): The unique identifier of the user
  - `username` (string): The username of the user
  - `email` (string): The email address of the user

Example:
```json
{
    "success": true,
    "user": {
        "_id": "60c72b2f9b1d8e001c8e4e1a",
        "username": "john_doe",
        "email": "john@example.com"
    }
}
```

## Status Codes
- 200 OK: Profile retrieved successfully
- 401 Unauthorized: No valid authentication token provided
- 500 Internal Server Error: Server error occurred

## Usage
```sh
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer your_jwt_token"
```

# User Logout Endpoint

## Endpoint
`GET /users/logout`

## Description
This endpoint logs out the currently authenticated user by clearing their authentication cookie and blacklisting their current token.

## Authentication
Requires a valid JWT token in the Authorization header or cookie.

## Response Body
The response body will be a JSON object with the following field:
- `message` (string): A success message indicating the logout status

Example:
```json
{
    "message": "Logout successful"
}
```

## Status Codes
- 200 OK: User successfully logged out
- 401 Unauthorized: No valid authentication token provided
- 500 Internal Server Error: Server error occurred

## Usage
```sh
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer your_jwt_token" \
--cookie "token=your_jwt_token"
```

# Captain Registration Endpoint

## Endpoint
`POST /captains/register`

## Description
This endpoint allows captains to register by providing their username, email, password, and vehicle details. The password will be hashed before storing it in the database.

## Request Body
The request body should be a JSON object with the following fields:
- `username` (string, required): The username of the captain. Must be at least 3 characters long.
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password of the captain. Must be at least 6 characters long.
- `vehicle` (object, required): The vehicle details of the captain.
  - `color` (string, required): The color of the vehicle. Must be at least 3 characters long.
  - `plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
  - `capacity` (number, required): The capacity of the vehicle.
  - `vehicleType` (string, required): The type of the vehicle. Must be one of 'motorcycle', 'car', or 'auto'.

Example:
```json
{
    "username": "captain_jack",
    "email": "jack@example.com",
    "password": "password123",
    "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

## Response Body
The response body will be a JSON object with the following fields:
- `captain` (object): The captain object containing the captain's details.
  - `_id` (string): The unique identifier of the captain.
  - `username` (string): The username of the captain.
  - `email` (string): The email address of the captain.
  - `vehicle` (object): The vehicle details of the captain.
    - `color` (string): The color of the vehicle.
    - `plate` (string): The plate number of the vehicle.
    - `capacity` (number): The capacity of the vehicle.
    - `vehicleType` (string): The type of the vehicle.

Example:
```json
{
    "captain": {
        "_id": "60c72b2f9b1d8e001c8e4e1a",
        "username": "captain_jack",
        "email": "jack@example.com",
        "vehicle": {
            "color": "red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

## Usage
```sh
curl -X POST http://localhost:3000/captains/register \
-H "Content-Type: application/json" \
-d '{
    "username": "captain_jack",
    "email": "jack@example.com",
    "password": "password123",
    "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}'
```