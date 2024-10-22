# Update API Design

## API Endpoint: Update User Info
- **URL:** `/api/update-user/:id`
- **Method:** `PUT`
- **Description:** Updates user information in the database for the specified user ID.

## Request
- **URL Parameters:**
  - `id` (string): The unique ID of the user whose information needs to be updated.

- **Request Body:**
  The request body contains the updated data for the user. This should be a JSON object with the fields that need to be modified. Example:

  ```json
  {
      "id": "d168",
      "age": "3333",
      "gender": "female",
      "work_experience": 0,
      "canada_workex": "10",
      "dep_num": 0,
      "canada_born": "false",
      "citizen_status": "",
      "level_of_schooling": "",
      "fluent_english": "true",
      "reading_english_scale": 0,
      "speaking_english_scale": 0,
      "writing_english_scale": 0,
      "numeracy_scale": 0,
      "computer_scale": 0,
      "transportation_bool": "false",
      "caregiver_bool": "false",
      "housing": "",
      "income_source": "",
      "felony_bool": "false",
      "attending_school": "false",
      "currently_employed": "false",
      "substance_use": "false",
      "time_unemployed": 0,
      "need_mental_health_support_bool": "false"
  }
  ```

## Response
- **Success Response:**
  - **Status Code:** `200 OK`
  - **Response Body:**

  ```json
  {
    "message": "User updated successfully",
    "userId": "d168",
    "updatedData": {
      "id": "d168",
      "age": "33",
      "gender": "male",
      "work_experience": 0,
      "canada_workex": "10",
      "dep_num": 0,
      "canada_born": "false",
      "citizen_status": "",
      "level_of_schooling": "",
      "fluent_english": "true",
      "reading_english_scale": 0,
      "speaking_english_scale": 0,
      "writing_english_scale": 0,
      "numeracy_scale": 0,
      "computer_scale": 0,
      "transportation_bool": "false",
      "caregiver_bool": "false",
      "housing": "",
      "income_source": "",
      "felony_bool": "false",
      "attending_school": "false",
      "currently_employed": "false",
      "substance_use": "false",
      "time_unemployed": 0,
      "need_mental_health_support_bool": "false"
    }
  }
  ```

- **Error Responses:**
  - **404 Not Found:** If the user with the given id does not exist in the database.

  ```json
  {
    "message": "User not found"
  }
  ```

  - **500 Internal Server Error:** If there is an error reading or writing to the database.

  ```json
  {
    "message": "Error reading database"
  }
  ```

  or

  ```json
  {
    "message": "Error updating database"
  }
  ```

## Workflow
1. **Retrieve User Data:** The API reads the user data from the `db.json` file using `fs.readFile`. This JSON file contains all the user form submissions.
2. **Locate User:** The API searches for the user by their `id` in the `form-submissions` array within the database.
3. **Update Data:**
   - If the user is found, the API merges the new data provided in the request body (`req.body`) with the existing user data.
   - The user data is updated in memory.
4. **Write to Database:**
   - The API writes the updated data back to the `db.json` file using `fs.writeFile`.
5. **Return Response:** The API sends back a response indicating the success or failure of the update operation.

## Error Handling
- **User Not Found:** If no user exists with the provided ID, the API returns a `404 Not Found` response.
- **Database Access Issues:** If there is an issue reading or writing to the `db.json` file, the API returns a `500 Internal Server Error` response.
