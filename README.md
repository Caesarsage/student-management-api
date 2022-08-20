## STUDENT MANAGEMENT API Documentation

## Technologies Used

- Backend - ExpressJS/Typescript
- Database - MongoDB
- Unit Testing - Mocha and Chai
- Endpoint Testing - Postman and ThunderClient
- Deployment - Mongo Atlas and Heroku

## How to run in development mode

#### Prerequisites

- Have nodejs v14 and above installed on your system
- Have mongodb installed

#### Dependencies installation

- Fork and clone the repository
- Run `npm install` on your terminal

#### Environment Variables

- Replace the following environment variable with yours
  - `MONGO_URL`
  - `PORT`

## How to run from hosted link
- Copy the `baseUrl` hosted on heroku link https://student-management-api-be.herokuapp.com

- Refer to [Endpoint](#endpoints) for Request Arguments requirement and endpoint to test on postman

## Error Handling

Errors are returned as JSON objects in the following format:

```json
{
    "statusCode": 404,
    "error": "not found"
}
```

The API will return four error types when requests fail:

- 400: Bad Request
- 404: Not Found
- 422: Not Processable
- 500: Internal server error

### Endpoints

#### GET `'/'`
- Home and welcome page

- **Request Arguments** : `None`

- **Returns** : welcome message

- **Sample** :

```json
message	"Welcome to Ori Student management board!!"
```

#### POST `'/api/student'`

- Sends a post request to register a new student
- **Request Arguments** : A json body containing, `name` - string, `gender` - string, `classLevel` - string
  (accepted classLevel are `JSS 1`, `JSS 2`. `JSS 3`, `SS 1`, `SS 2`, `SS 3`)

- Returns: Returns a success message and register student details.

- Sample:

```json
{
    "message": "successfully created student",
    "data": {
        "name": "Caesar",
        "gender": "Male",
        "registeredSubjects": [],
        "_id": "630102a9781c04f980887a56",
        "id": "630102a9781c04f980887a56",
        "__v": 0
    }
}



```

#### GET `'/api/students'`

- Fetches a list of object of students in which the keys are the id, name, gender, class and registered subject.
- Request Arguments: `None`
- Returns: A data object with a `id`, `name`, `gender`, `class` and `registered subjects`. `Total length` of students also return

- Sample: This endpoint return a total length of 9000 + monk data but for sample, 2 return

```json
{
    "data": [
        {
            "_id": "62fee58e5e3720fa590a83a6",
            "name": "CaesarSage",
            "gender": "Male",
            "registeredSubjects": [
                {
                    "_id": "62fe5b339c078cde1edd2f84",
                    "code": "English",
                    "leadTutor": "Destiny",
                    "credit": 23,
                    "__v": 0
                },
                {
                    "_id": "62fe5b5ee44f5a341426ad95",
                    "code": "Physics",
                    "leadTutor": "Destiny",
                    "credit": 23,
                    "__v": 0
                },
                {
                    "_id": "62fe5b91e44f5a341426ada2",
                    "code": "CRK",
                    "leadTutor": "Destiny",
                    "credit": 23,
                    "__v": 0
                }
            ],
            "id": "62fee58e5e3720fa590a83a6",
            "__v": 0
        },
        {
            "_id": "62fee5aa5e3720fa590a83a8",
            "name": "Caesar",
            "gender": "Male",
            "registeredSubjects": [
                {
                    "_id": "62fe5b009c078cde1edd2f7f",
                    "code": "Maths",
                    "leadTutor": "Destiny",
                    "credit": 50,
                    "__v": 0
                },
                {
                    "_id": "62fe5b339c078cde1edd2f84",
                    "code": "English",
                    "leadTutor": "Destiny",
                    "credit": 23,
                    "__v": 0
                },
                {
                    "_id": "62fe5b6be44f5a341426ad99",
                    "code": "Chemistry",
                    "leadTutor": "Destiny",
                    "credit": 23,
                    "__v": 0
                },
                {
                    "_id": "62ffcb6e4183d011eea1e636",
                    "code": "Government",
                    "leadTutor": "Mary",
                    "credit": 30,
                    "__v": 0
                },
                {
                    "_id": "62fe5b5ee44f5a341426ad95",
                    "code": "Physics",
                    "leadTutor": "Destiny",
                    "credit": 23,
                    "__v": 0
                }
            ],
            "id": "62fee5aa5e3720fa590a83a8",
            "__v": 0
        }
    ],
    "message": "All student found",
    "totalLength": 2
}

```

#### GET `'/api/student/${id}'`

- Fetches a single set of student by their id.
- Request Arguments: `id` - integer
- Returns: An object with student details, `name`, `gender`, `classLevel` and `list of registered subjects`.

- Sample:

```json
{
    "data": {
        "_id": "6300cdf9da2a835a22e387c3",
        "name": "Thomas Johnson",
        "classLevel": "SS 3",
        "gender": "male",
        "registeredSubjects": [],
        "__v": 0
    },
    "message": "Single student found"
}

```

#### DELETE `'/student/${id}'`

- Deletes a specified student using the id of the student
- Request Arguments: `id` - integer
- Returns: Returns a success message.
- Sample:

```json
{
  "message": "Single student deleted"
}
```

#### PUT `'/api/student/${id}'`

- Update a student data
- Request Arguments: A Student `id` - integer and json body containing any of the student data to update, `name` - string, `gender` - string, `classLevel` - string
- Returns: updated student and a success message

- Sample:

```json
{
    "data": {
        "_id": "6300cdf9da2a835a22e387c3",
        "name": "Thomas Johnson",
        "classLevel": "SS 3",
        "gender": "trans-gender",
        "registeredSubjects": [],
        "__v": 0
    },
    "message": "Single student updated"
}

```

<!-- ========== SUBJECTS ============== -->

#### POST `'/api/subject/student/${id}'`

- Register student subject

- Request Arguments: `id` - integer and array of json body of available subjects (5 min and 9 max) `"questions" : [{"code": "Maths"}, {"code":"English"}, {"code":"Economics"}, {"code":"CRK"}, {"code":"Physics"}]` - array.

- Returns: An object with registered subjects and a success message.

- Sample:

```json
{
    "data": {
        "_id": "6300cdf9da2a835a22e387c3",
        "name": "Thomas Johnson",
        "classLevel": "SS 3",
        "gender": "trans-gender",
        "registeredSubjects": [
            "63010357781c04f980887a62"
        ],
        "__v": 0
    },
    "message": "successfully register your subjects"
}

```

#### POST `'/api/subject'`

- Create subjects with its code, credit and lead tutor

- Request Arguments : A json body containing `code` - string, `leadTutor` - string, `credit` - integer

- Returns: An object data with created subjects and success message

- Sample :

```json
{
    "data": {
        "code": "Economics",
        "leadTutor": "Paul",
        "credit": 50,
        "_id": "63010409781c04f980887a84",
        "__v": 0
    },
    "msg": "Successfully created"
}

```

#### GET `'/api/subjects'`

- Fetch all available subjects.
- Request Argument: None
- Returns: a list of available subjects object details and a success message.
- Sample: `curl http://127.0.0.1:5000/api/subjects`

```json
{
    "data": [
        {
            "_id": "6301034d781c04f980887a5e",
            "code": "Government",
            "leadTutor": "Mary",
            "credit": 30,
            "__v": 0
        },
        {
            "_id": "63010357781c04f980887a62",
            "code": "Maths",
            "leadTutor": "Jane",
            "credit": 30,
            "__v": 0
        },
        {
            "_id": "6301036e781c04f980887a66",
            "code": "English",
            "leadTutor": "Abert",
            "credit": 20,
            "__v": 0
        },
        {
            "_id": "63010379781c04f980887a6a",
            "code": "Physics",
            "leadTutor": "Abert",
            "credit": 21,
            "__v": 0
        },
        {
            "_id": "6301038b781c04f980887a6e",
            "code": "Chemistry",
            "leadTutor": "Ruth",
            "credit": 31,
            "__v": 0
        },
        {
            "_id": "630103b3781c04f980887a73",
            "code": "Biology",
            "leadTutor": "Destiny",
            "credit": 30,
            "__v": 0
        },
        {
            "_id": "630103bb781c04f980887a77",
            "code": "CRK",
            "leadTutor": "Destiny",
            "credit": 30,
            "__v": 0
        },
        {
            "_id": "630103df781c04f980887a80",
            "code": "Marketing",
            "leadTutor": "Caesar",
            "credit": 50,
            "__v": 0
        },
        {
            "_id": "63010409781c04f980887a84",
            "code": "Economics",
            "leadTutor": "Paul",
            "credit": 50,
            "__v": 0
        }
    ],
    "message": "all subjects"
}

```

#### GET `'/api/student/${id}'`

- Fetches a single set of subject by their id.
- Request Arguments: `id` - integer
- Returns: An object with subject details, `code`, `leadTutor` and `credit`.

- Sample:

```json
{
    "data": {
        "_id": "63010409781c04f980887a84",
        "code": "Economics",
        "leadTutor": "Paul",
        "credit": 50,
        "__v": 0
    },
    "message": "Single subject found"
}

```

#### DELETE `'/student/${id}'`

- Deletes a specified subject using the id of the subject
- Request Arguments: `id` - integer
- Returns: Returns a success message.
- Sample:

```json
{
  "message": "Single subject deleted"
}
```

#### PUT `'/api/subject/${id}'`

- Update a subject data
- Request Arguments: A subject `id` - integer and json body containing any of the subject data to update, `code` - string, `leadTutor` - string, `credit` - integer
- Returns: updated subject and a success message

- Sample:

```json
{
    "data": {
        "_id": "63010409781c04f980887a84",
        "code": "Economics",
        "leadTutor": "Paul",
        "credit": 50,
        "__v": 0
    },
    "message": "Single student updated"
}

```
