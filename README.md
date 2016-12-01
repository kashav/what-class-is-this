## what-class-is-this

> Find out what class you're sitting in on (UofT).

### Installation

- __Requirements__
  + [Go](https://golang.org/)
  + [Node.js](https://nodejs.org/en/)
  + [MongoDB](https://www.mongodb.com/)

- Clone repository.

  ```sh
  $ git clone https://github.com/kshvmdn/what-class-is-this.git
  $ cd what-class-is-this
  ```

- Install dependencies

  ```sh
  $ cd client && npm install && cd ..
  $ cd server && go get -d && cd ..
  ```

- Start MongoDB (this will run it as a Daemon process, simply use `mongod` to run it normally)

  ```
  $ mongod --logpath log/mongod.log --logappend
  ```

- Populate database

  ```
  $ scripts/populate.sh
  ```

- Start server (include the `&` to run in background)

  ```sh
  $ go build -o server/www server/server.go && server/www &
  ```

- Start web application

  ```sh
  $ cd client
  $ npm start
  ```

### Contribute

This project is completely open source. Feel free to open an issue or submit a pull request! :smile:
