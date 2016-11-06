package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2"

	"./controllers"
)

func getSession() *mgo.Session {
	s, err := mgo.Dial("mongodb://localhost")

	if err != nil {
		panic(err)
	}

	return s
}

func main() {
	r := httprouter.New()

	s := getSession()
	cc := controllers.NewCourseController(s)

	r.GET("/api/course/filter", cc.GetCurrent)
	r.GET("/api/course/single/:id", cc.GetById)

	http.ListenAndServe("localhost:3000", r)
}
