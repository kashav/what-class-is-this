package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
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
	router := httprouter.New()

	cc := controllers.NewCourseController(getSession())

	router.GET("/api/course/now", cc.GetNow)
	router.GET("/api/course/single/:id", cc.GetById)

	port := os.Getenv("PORT")

	if port == "" {
		port = "3001"
	}

	handler := cors.Default().Handler(router)
	if err := http.ListenAndServe(fmt.Sprintf("localhost:%s", port), handler); err != nil {
		log.Fatal(err)
	}

	log.Print("Listening at http://localhost:%s.\n", port)
}
