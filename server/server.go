package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2"

	"what-class-is-this/server/controllers"
)

func getSession() *mgo.Session {
	s, err := mgo.Dial("mongodb://localhost")

	if err != nil {
		log.Fatal(err)
	}

	return s
}

func main() {
	r := httprouter.New()

	cc := controllers.NewCourseController(getSession())

	r.GET("/api/course/filter", cc.GetCurrent)
	r.GET("/api/course/single/:id", cc.GetById)

	port := os.Getenv("PORT")

	if port == "" {
		port = "3001"
	}

	if err := http.ListenAndServe(fmt.Sprintf("localhost:%s", port), r); err != nil {
		log.Fatal(err)
	}

	log.Print("Listening at http://localhost:%s.\n", port)
}
