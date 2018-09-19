package mymath

import (
  "github.com/jinzhu/gorm"                            // ORM package for Go
  _ "github.com/jinzhu/gorm/dialects/sqlite"          // for SQLite. Only imports functions so that ORM can use. Hence the '_'
)


type Person struct {
  ID int `json:"id"`
  FirstName string `json:"firstname"`
  LastName string `json:"lastname"`
}
type Quizzes struct {
  ID int `json:"id"`
  Genre string `json:"genre"`
}
type Questions struct {
  Qno int `json:"qno"`
  Quizno int `json:"quizno"`
  Ans int `json:"ans"`
  Question string `json:"question"`
  Op1 string `json:"op1"`
  Op2 string `json:"op2"`
  Op3 string `json:"op3"`
  Op4 string `json:"op4"`
}

type Highscore struct {
  Qid int `json:"qid"`
  Pid int `json:"pid"`
  Hscore int `json:"hscore"`
}



func Genre_max(genre string) int {
  db, _ := gorm.Open("sqlite3", "./test.db")
  defer db.Close()
	var quiz []Quizzes
	db.Where("genre = ?", genre).Find(&quiz)  
	genre_score := 0
	for _,element := range quiz {
	 var score []Highscore
	 db.Where("qid = ?", element.ID).Find(&score)  
	 for _,j := range score {
	   genre_score += j.Hscore
	 }
	}
	return (genre_score)
}