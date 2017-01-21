.PHONY: client server

all: client/www server/www

client:
	cd client && npm install

client/www: client

server:
	cd server && go get -d

server/www: server
	go build -o server/www server/server.go
