# FotonTech Challenge

This is a solution to the [FotonTech Challenge](https://github.com/FotonTech/join).

How to run
-------------
* `npm install`
* Create a `nodemon.json` file and add `MONGO_URL` variable
* `npm start`

Stack
-------------
* Node.js / Express
* MongoDB / Mongoose

Project Description
-------------
* models:
  * user
  * post (related to user)
* endpoints:
  * `POST /auth/signup`
  * `POST /auth/login`
  * `POST /feed/create` (create a new post)
  * `GET /feed/list` (list all posts from the logged user)
  * `GET /feed/list/:postId` (get a post by its id, only the user that created the post can see it) 

