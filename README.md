
# User Data API

It is an API that provides some random users' data. These random users have the following properties:

- id
- gender
- name
- contact
- address
- photoUrl

The API have a `userData.json` file under `json` folder. You can perform CRUD operations on the `.json` file using Express and the file system `fs` module. You can use the following endpoints to perform the operation:

    1. GET /user/random - A random user.
    Get a random user from the .json file


    2. GET /user/all - A list of all users.
    Get all the users from the .json file
    Note: you can limit the number of users using query parameter  limit


    3. POST /user/save - Save a user
    Save a user in the .json file
    Note: You are required to provide all the mentioned properties unless you will get error.


    4. PATCH /user/update/:id - Update a random user
    Update a user's information in the .json file using its id


    5. PATCH /user/bulk-update update multiple users
    Update multiple users' information in the .json file.
    Take an array of user ids and assign it to the body.

    6. DELETE /user/delete/:id
    Delete a user from the .json file using its id

### Deployed link
[Vercel](https://use-data-server.vercel.app/)

### Use this link to intigrate the API with your application
    https://use-data-server.vercel.app/api/v1/<API endpoint>