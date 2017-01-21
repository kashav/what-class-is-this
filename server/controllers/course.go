package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

	"github.com/kshvmdn/what-class-is-this/server/models"
)

type CourseController struct {
	session *mgo.Session
}

func NewCourseController(s *mgo.Session) *CourseController {
	return &CourseController{s}
}

func (cc CourseController) GetById(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	id := p.ByName("id")

	c := models.Course{}

	query := bson.M{"id": id}

	if err := cc.session.DB("wcit").C("courses").Find(query).One(&c); err != nil {
		w.WriteHeader(404)
		return
	}

	cj, _ := json.Marshal(c)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	fmt.Fprintf(w, "%s", cj)
}

func (cc CourseController) GetNow(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	params := r.URL.Query()

	location := params.Get("location")
	day := params.Get("day")
	start, _ := strconv.Atoi(params.Get("start"))

	if len(location) == 0 {
		w.WriteHeader(404)
		return
	}

	if len(day) == 0 {
		day = time.Now().Weekday().String()
	}

	if start == 0 {
		h, m, s := time.Now().Clock()
		start = h*60*60 + m*60 + s
	}

	c := []models.Course{}

	query := bson.M{
		"term": "2016 Fall",
		"meeting_sections": bson.M{
			"$elemMatch": bson.M{
				"times": bson.M{
					"$elemMatch": bson.M{
						"day":      strings.ToUpper(day),
						"location": location,
						"start": bson.M{
							"$gte": start,
						},
					},
				},
			},
		},
	}

	if err := cc.session.DB("wcit").C("courses").Find(query).All(&c); err != nil {
		w.WriteHeader(404)
		return
	}

	cj, _ := json.Marshal(c)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	fmt.Fprintf(w, "%s", cj)
}
