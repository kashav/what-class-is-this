## what-class-is-this: server

This API does a __very(!)__ small subset of things that [Cobalt](https://github.com/cobalt-uoft) does. Unless you're looking for something built in Go, I'd suggest using that.

### Usage

- Install dependencies (make sure you're at the project root).

  ```sh
  $ go get -d
  ```

- Build / start server. `PORT` defaults to [`3001`](http://localhost:3001).

  ```sh
  $ go build server.go
  ```

  ```sh
  $ PORT=<port> ./server
  ```
