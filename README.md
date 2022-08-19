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
- Copy the hosted heroku link `link here`
- Refer to [Endpoint](#endpoints) for Request Arguments requirement to test on postman

## Error Handling

Errors are returned as JSON objects in the following format:

```json
{
    "statusCode": 404,
    "error": "not found"
}
```

The API will return three error types when requests fail:

- 400: Bad Request
- 404: Not Found
- 422: Not Processable
- 500: Internal server error

### Endpoints

#### POST `'/api/student'`

- Sends a post request to register a new student
- **Request Arguments** : A json body containing, `name` - string, `gender` - string, `classLevel` - string
  (accepted classLevel are `JSS 1`, `JSS 2`. `JSS 3`, `SS 1`, `SS 2`, `SS 3`)

- Returns: Returns a success message and register student details.

- Sample: `curl http://127.0.0.1:5000/api/question -X POST -H "Content-Type: application/json" -d '{"name": "Jane", "gender": "Female", "classLevel": "JSS 1"`'

```json

```

#### GET `'/api/students'`

- Fetches a list of object of students in which the keys are the id, name, gender, class and registered subject.
- Request Arguments: `None`
- Returns: A data object with a `id`, `name`, `gender`, `class` and `registered subjects`. `Total length` of students also return

- Sample: `curl http://127.0.0.1:5000/api/students`

```json

```

#### GET `'/api/student/${id}'`

- Fetches a single set of student by their id.
- Request Arguments: `id` - integer
- Returns: An object with student details, `name`, `gender`, `classLevel` and `list of registered subjects`.

- Sample: `curl http://127.0.0.1:5000/api/subjets/4`

```json

```

#### DELETE `'/student/${id}'`

- Deletes a specified student using the id of the student
- Request Arguments: `id` - integer
- Returns: Returns a success message.
- Sample: `curl -X DELETE http://127.0.0.1:5000/student/5`

```json
{
  "message": "Single student deleted"
}
```

#### PUT `'/api/student/${id}'`

- Update a student data
- Request Arguments: A Student `id` - integer and json body containing any of the student data to update, `name` - string, `gender` - string, `classLevel` - string
- Returns: updated student and a success message

- Sample: `curl -X POST -H "Content-Type: application/json" -d'{"name":"Dennis"}' http://127.0.0.1:5000/api/student/2`

```json

```

<!-- ========== SUBJECTS ============== -->

#### POST `'/api/subject/student/${id}'`

- Register student subject

- Request Arguments: `id` - integer and array of json body of available subjects (5 min and 9 max) `"questions" : [{"code": "Maths"}, {"code":"English"}, {"code":"Economics"}, {"code":"CRK"}, {"code":"Physics"}]` - array.

- Returns: An object with registered subjects and a success message.

- Sample: `curl -X POST -H "Content-Type: application/json" -d'{"questions": [{"code": "Maths"}, {"code":"English"}, {"code":"Economics"}, {"code":"CRK"}, {"code":"Physics"}]' http://127.0.0.1:5000/api/subject/student/2`

```json

```

#### POST `'/api/subject'`

- Create subjects with its code, credit and lead tutor

- Request Arguments : A json body containing `code` - string, `leadTutor` - string, `credit` - integer

- Returns: An object data with created subjects and success message

- Sample :

```json

```

#### GET `'/api/subjects'`

- Fetch all available subjects.
- Request Argument: None
- Returns: a list of available subjects object details and a success message.
- Sample: `curl http://127.0.0.1:5000/api/subjects`

```json

```

#### GET `'/api/student/${id}'`

- Fetches a single set of subject by their id.
- Request Arguments: `id` - integer
- Returns: An object with subject details, `code`, `leadTutor` and `credit`.

- Sample: `curl http://127.0.0.1:5000/api/subjets/4`

```json

```

#### DELETE `'/student/${id}'`

- Deletes a specified subject using the id of the subject
- Request Arguments: `id` - integer
- Returns: Returns a success message.
- Sample: `curl -X DELETE http://127.0.0.1:5000/student/5`

```json
{
  "message": "Single subject deleted"
}
```

#### PUT `'/api/subject/${id}'`

- Update a subject data
- Request Arguments: A subject `id` - integer and json body containing any of the subject data to update, `code` - string, `leadTutor` - string, `credit` - integer
- Returns: updated subject and a success message

- Sample: `curl -X POST -H "Content-Type: application/json" -d'{"credit":20}' http://127.0.0.1:5000/api/student/2`

```json

```
