package models

import "gopkg.in/mgo.v2/bson"

type (
	Time struct {
		Day      string `json:"day" bson:"day"`
		Start    int    `json:"start" bson:"start"`
		End      int    `json:"end" bson:"end"`
		Duration int    `json:"duration" bson:"duration"`
		Location string `json:"location" bson:"location"`
	}

	Section struct {
		Code        string   `json:"code" bson:"code"`
		Instructors []string `json:"instructors" bson:"instructors"`
		Times       []Time   `json:"times" bson:"times"`
		Size        int      `json:"size" bson:"size"`
		Enrolment   int      `json:"enrolment" bson:"enrolment"`
	}

	Course struct {
		Id            bson.ObjectId `json:"-" bson:"_id"`
		CourseId      string        `json:"id" bson:"id"`
		Code          string        `json:"code" bson:"code"`
		Name          string        `json:"name" bson:"name"`
		Description   string        `json:"description" bson:"description"`
		Division      string        `json:"division" bson:"division"`
		Department    string        `json:"department" bson:"department"`
		Prerequisites string        `json:"prerequisites" bson:"prerequisites"`
		Exclusions    string        `json:"exclusions" bson:"exclusions"`
		Level         int           `json:"level" bson:"level"`
		Campus        string        `json:"campus" bson:"campus"`
		Term          string        `json:"term" bson:"term"`
		Breadths      []int         `json:"breadths" bson:"breadths"`
		Sections      []Section     `json:"sections" bson:"meeting_sections"`
	}
)
