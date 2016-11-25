## what-class-is-this: server

Note: This API does a __very(!)__ small subset of things that [Cobalt](https://github.com/cobalt-uoft) does. Unless you're exclusively looking for something built in Go, I'd suggest using that instead.

Another note: I'm _kind of_ (very) new to Go, so if you see anything wrong/weird, (please) let me know.

### Usage

- Install dependencies (make sure you're at the server root).

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
