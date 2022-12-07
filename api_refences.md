# Savvie API Documentation

## Endpoints:

### User

- `POST /signup`
- `POST /signin`
- `POST /signin-with-google`

### Food

- `GET /food`
- `GET /food/:id`

### Restaurant

- `GET /restaurants`
- `POST /restaurants`
- `GET /restaurants/:id`

### Category

- `GET /categories`
- `GET /categories/:id`

### Favorite

- `POST /favorites`
- `GET /favorites`
- `DELETE /favorites/:id`

### RESTO

- `GET /resto/food`
- `GET /resto/food/:id`
- `POST /resto/food`
- `DELETE /resto/food/:id`
- `PUT /resto/food/:id`
- `PATCH /resto/food-status/:id`
- `PATCH /resto/food-active/:id`

### 1. POST /signup

#### Description

- register as a new user

Request:

- body:

```json
{
  "fullName":STRING,
  "email": STRING,
  "password": STRING,
  "phoneNumber":INTEGER,
  "address":STRING
}
```

#### Response

_201 - Created_

```json
{
  "id": INTEGER,
  "fullName": STRING,
  "email": STRING,
  "phoneNumber": INTEGER,
  "address": STRING,
  "updatedAt": DATE,
  "createdAt": DATE,
}
```

_400 - Bad Request_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "FullName is required"
}
OR
{
  "message": "PhoneNumber is required"
}
OR
{
  "message": "Password is required"
}
```

### 2. POST /signin

#### Description

- Sign in as a user

Request:

- body:

```json
{
  "email": STRING,
  "password": STRING,
}
```

#### Response

_200 - OK_

```json
{
  "accessToken": STRING,
  "user": {
    "id": INTEGER,
    "fullName": STRING,
    "email": STRING,
    "phoneNumber": INTEGER,
    "address": STRING,
    "createdAt": DATE,
    "updatedAt": DATE
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Required Email or Password"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email or Password"
}
```

### 3. POST /signin-with-google

#### Description

- Sign in as a user by google

Request:

- headers:

```json
{
  "google_token": STRING
}

```

#### Response

_200 - OK_

```json
{
  "accessToken": STRING,
  "user": {
    "id": INTEGER,
    "fullName": STRING,
    "email": STRING,
    "phoneNumber": INTEGER,
    "address": STRING,
    "createdAt": DATE,
    "updatedAt": DATE
  }
}
```

### 4. GET /food

#### Description

- Get all the food data

#### Response

_200 - OK_

```json
[
  {
    "id": Integer,
    "name": String,
    "price": Integer,
    "discount":Integer,
    "description": Text,
    "imageUrl": String,
    "quantity" : Integer,
    "sales":Integer,
    "status":String,
    "categoryId": Integer,
    "createdAt": Date,
    "updatedAt": Date,
    "Category": Obj,
    "RestaurantId":Integer,
    "Restaurant":obj,
  },
  ...
]
```

### 5. GET /food/:id

#### Description

- Get one food data

#### Response

_200 - OK_

```json
{
  "id": Integer,
  "name": String,
  "price": Integer,
  "discount":Integer,
  "description": Text,
  "imageUrl": String,
  "quantity" : Integer,
  "sales":Integer,
  "status":String,
  "categoryId": Integer,
  "createdAt": Date,
  "updatedAt": Date,
  "Category": Obj,
  "RestaurantId":Integer,
  "Restaurant":obj,
}
```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```

### 6. GET /restaurants

#### Description

- Show all restaurants from database

#### Response

_200 - OK_

```json
[
   {
      "id": Integer,
      "UserId": Integer,
      "name": String,
      "is_open": Boolean,
      "open_time": Time,
      "close_time": Time,
      "rating": Float,
      "review_count": Integer,
      "latitude": Float,
      "longitude": Float,
      "address":Text,
      "is_delivery":Boolean,
      "is_pickup":Boolean,
      "income":Integer,
      "type":String,
      "logoUrl":Text,
      "createdAt":Date,
      "updatedAt":Date,
    },
    ...
]
```

### 7. POST /restaurants

#### Description

- Create a new restaurant data

Request:

- headers:

```json
{
  "access_token": STRING
}
```

- body:

```json
{
  "UserId": Integer,
  "name": String,
  "description":Text,
  "is_open": Boolean,
  "open_time": Time,
  "close_time": Time,
  "rating": Float,
  "review_count": Integer,
  "latitude": Float,
  "longitude": Float,
  "address":Text,
  "is_delivery":Boolean,
  "is_pickup":Boolean,
  "income":Integer,
  "type":String,
  "logoUrl":Text,
},
```

#### Response

_201 - Created_

```json
{
  "data": {
    "id": Integer,
    "name": String
    },
  "message": String
}
```

_400 - Bad Request_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Category is required"
}
OR
{
  "message": "Description is required"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

### 8. GET /restaurants/:id

#### Description

- Show one restaurants from database by id

#### Response

_200 - OK_

```json
{
  "id": Integer,
  "UserId": Integer,
  "name": String,
  "is_open": Boolean,
  "open_time": Time,
  "close_time": Time,
  "rating": Float,
  "review_count": Integer,
  "latitude": Float,
  "longitude": Float,
  "address":Text,
  "is_delivery":Boolean,
  "is_pickup":Boolean,
  "income":Integer,
  "type":String,
  "logoUrl":Text,
  "CategoryResto":Array,
  "createdAt":Date,
  "updatedAt":Date,
},

```

### 9. GET /categories

#### Description

- Show all category from database

#### Response

_200 - OK_

```json
[
   {
      "id": INTEGER,
      "name": STRING,
      "ImageUrl":TEXT,
      "createdAt": DATE,
      "updatedAt": DATE
    },
    ...
]
```

### 10. GET /categories/:id

#### Description

- Show all food that have the same category from database

#### Response

_200 - OK_

```json
{
  "category": {
    "id": INTEGER,
    "name": STRING,
    "ImageUrl":TEXT,
    "createdAt": DATE,
    "updatedAt": DATE
    },
  "food":Array
}
```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```

### 11. POST /favorites

#### Description

- Create a new user favorites

Request:

- headers:

```json
{
  "access_token": STRING
}
```

- body:

```json
{
  "UserId": Integer,
  "FoodId":Integer,
},
```

#### Response

_201 - Created_

```json
{
  "message": String
}
```

_400 - Bad Request_

```json
{
  "message": "UserId is required"
}
OR
{
  "message": "FoodId is required"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

### 12. GET /favorites

#### Description

- Show all Favourites of user

#### Response

_200 - OK_

```json
[
   {
      "id": INTEGER,
      "UserId": INTEGER,
      "FoodId": INTEGER,
      "createdAt": DATE,
      "updatedAt": DATE,
      "Food": ARRAY
    },
    ...
]
```

### 13. DELETE /favorites/:id

#### Description

- Remove a favorite data based on given id

Request:

- headers:

```json
{
  "access_token": STRING
}
```

#### Response

_200 - OK_

```json
{
  "message": " <category name> success to delete"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

_403 - Forbidden_

```json
{
  "message": "Not Authorize"
}
```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```

### 14. GET /resto/food

#### Description

- Get all the food data based on restaurant id

### Request:

- headers:

```json
{
  "access_token": STRING
}
```

#### Response

_200 - OK_

```json
[
  {
    "id": Integer,
    "name": String,
    "price": Integer,
    "discount":Integer,
    "description": Text,
    "imageUrl": String,
    "quantity" : Integer,
    "sales":Integer,
    "status":String,
    "categoryId": Integer,
    "createdAt": Date,
    "updatedAt": Date,
    "Category": Obj,
    "RestaurantId":Integer,
  },
  ...
]
```

### 15. GET /resto/food/:id

#### Description

- Get one food data based on given id

#### Response

_200 - OK_

```json
{
  "id": Integer,
  "name": String,
  "price": Integer,
  "discount":Integer,
  "description": Text,
  "imageUrl": String,
  "quantity" : Integer,
  "sales":Integer,
  "status":String,
  "categoryId": Integer,
  "createdAt": Date,
  "updatedAt": Date,
  "Category": Obj,
  "RestaurantId":Integer,
}
```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```

### 16. DELETE /food/:id

#### Description

- Remove a food data based on given id

Request:

- headers:

```json
{
  "access_token": STRING
}

```

#### Response

_200 - OK_

```json
{
  "message": " <category name> success to delete"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

_403 - Forbidden_

```json
{
  "message": "Not Authorize"
}
```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```

### 17. PATCH /food/:id

#### Description

- updated status food

Request:

- headers:

```json
{
  "access_token": STRING
}

```

- body:

```json
{
  "is_active": STRING,
}
```

#### Response

_200 - OK_

```json
{
  "message": "Food status has been updated!"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

_403 - Forbidden_

```json
{
  "message": "Not Authorize"
}
```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```

### 18. PATCH /food-status/:id

#### Description

- updated status food

Request:

- headers:

```json
{
  "access_token": STRING
}

```

- body:

```json
{
  "status": STRING,
}
```

#### Response

_200 - OK_

```json
{
  "message": "Food status has been updated!"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

_403 - Forbidden_

```json
{
  "message": "Not Authorize"
}
```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```

### 19. POST /resto/food

#### Description

- Create a new food data

Request:

- headers:

```json
{
  "access_token": STRING
}
```

- body:

```json
{
  "name": String,
  "price": Integer,
  "discount":Integer,
  "description": Text,
  "imageUrl": String,
  "quantity" : Integer,
  "sales":Integer,
  "status":String,
  "categoryId": Integer,
  "RestaurantId":Integer,
},
```

#### Response

_201 - Created_

```json
{
  "data": {
    "id": Integer,
    "name": String
    },
  "message": String
}
```

_400 - Bad Request_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Category is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Image is required"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

### 20. PUT /food/:id

#### Description

- Edited Food data value

Request:

- headers:

```json
{
  "access_token": STRING
}

```

- body:

```json
{
  "name": String,
  "price": Integer,
  "discount":Integer,
  "description": Text,
  "imageUrl": String,
  "quantity" : Integer,
  "sales":Integer,
  "status":String,
  "categoryId": Integer,
  "RestaurantId":Integer,
}
```

#### Response

_200 - OK_

```json
{
  "message": "Food has been updated!"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

_403 - Forbidden_

```json
{
  "message": "Not Authorize"
}
```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```

### Global Error

#### Response

_500 - Internal Server Error_

```json
{
  "message": "Internal Server Error"
}
```
