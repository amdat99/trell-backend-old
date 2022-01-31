# trell-backend
**Getting Started**

**0)** Run 
```npm install```
within the directory

**1)** To start the server run ```
npm run watch```
 and then ```
npm start```
 in a new terminal 
 
 **If npm run watch is not run in a seperate terminal first the api won't work properly**
  
 **Before running command 2,3 and 4 ensure that you have postgres setup and the db config is properly setup**
 
**db setup**

-Installing postgres on windows: https://www.youtube.com/watch?v=RAFZleZYxsc

-Redis would need to be setup also

old redis ver for **windows**: https://github.com/microsoftarchive/redis/releases  (downlaod the msi file)

For mac or linux downlaod the latest stable release from the redis website.

-Once Postgres is setup create a database called trello. This can be done easily in pgadmin

-After that a .env file should be created in the root directory (where the package.json is) and the user and password variable should be set.

E.g add the below in the .env file:

```
USER = postgres
PASSWORD = pass
```
**The USER and PASSWORD variables above should be updated with your postgres user and password.**

To check if postgres is properly setup run **npm run migrate** . If setup properly 9 migrations would have completed and the migrations would have created the tables within the trello database.


**2)** Run ```
npm run migrate```
 to commit migrations

*The above command creates all tables on the database which have a migration file setup*

**3)** Run ```
npm run rollback```
 to rollback migrations
 
 *The above command deletes all tables on the database which have a migration file setup*

**4)** Run```
npm run seed```
 to run seeders
 
  *The above command adds seeded data to a table within the database. This command should only be run if all the tables specified in the seed files exist within the db.*

 
 **Server stack**
 
Server is using express as the web framework and typescript as the language. Postgres is used as the main db, whilst Redis is used to store sessions. Knex is used as the query builder and to run seeders/migrations. Socket-io is used for websockets.


**Structure**

 Routing is handled within the **routes** folder with specific routing files.
 Logic and querying is handled within the **controllers** folder with specific controller files.
 Any re-usable types should be written within the **types** folder. Types relating to the db tables should be wtiten in the **tablesTypes.ts**, whilst other types should be in the **base.ts** file.
 Web Sockets are handled within the **sockets** folder.
 Any piece of logic that can be used in multiple controllers should be made into a function and placed inside the **helpers** folder inside the index.ts.
 
 
 **Database structure**
 
 The database has a user table where users are stored after registering and an organisation table where organisations are stored.
 When a user is added to an organisation their info is added to org_user table.
 
 **After a user enters into an organisation within the frontend and when a user:**
 
 **1)** Creates a board, board data is added to the board table,
 
 **2)** Creates a list within the board, list data is added to the list table,
 
 **3)** Creates a task within the list, task data is added to the task table,
 
 **4)** Creates a comment within a task, comment data is added to the comments table,
 
 **5)** Adds a file within the comment, file data is added to the files table.
 
 **6)** Any activity that happens within a task is stored within the activity table
 
  **7)** When a task is moved between lists the foriegn key constraint between the task and the old list is dropped and a new foriegn key should be updated with the new list_id



 **Routing**

 Express router middleware is used to create path spaces for different routes.

E.g in the bottom of server.ts ```app.use("/auth", auth);```  is called. auth is imported from the routes folder which uses the express router middleware to create sub-routes. Inside the routes/auth.ts their is a post request route called **'login'**. As such with this structure the url route would be http://localhost:4000/auth/login


**Querying**

The knex query builder is used for db queries. Documentation at https://knexjs.org/ . Typescript types are called on the queries which are related to the databse tables.
E.g ``` await db<User>("user").select("*").where({ email: email })``` is used within the login controller. The user within <> relates to a type a type within the types/tableTypes.ts folder. The type is just a representation of the columns on the table 



**Sessions**
Sessions are used for authentication with session data being stored within Redis.

