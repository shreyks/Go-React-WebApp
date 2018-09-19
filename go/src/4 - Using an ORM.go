package main

import (
  "fmt"
  "github.com/jinzhu/gorm"                            // ORM package for Go
  _ "github.com/jinzhu/gorm/dialects/sqlite"          // for SQLite. Only imports functions so that ORM can use. Hence the '_'
)

// This is the structure for your database. Very similar to how SQLAlchemy works with Flask.
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

func main() {
   db, _ := gorm.Open("sqlite3", "./test.db")             // Creates an SQLite database, stores it in the file.
   defer db.Close()                                       // defer basically tells it to execute at the end of the main function's scope
   db.AutoMigrate(&Person{},&Quizzes{},&Questions{},&Highscore{})
                                // Creates database based on the Person structure as schema
   p1 := Person{FirstName: "John", LastName: "Doe"}
   p2 := Person{FirstName: "Jane", LastName: "Smith"}     // Example Person objects being created
   db.Create(&p1)   
   db.Create(&p2)                                      // Creates an entry in the db with the object p1
   var quiz []Quizzes
   db.Where("genre = ?", "Movies").Find(&quiz)  
   genre_score := 0
   for _,element := range quiz {
    var score []Highscore
    db.Where("qid = ?", element.ID).Find(&score)  
    for _,j := range score {
      genre_score += j.Hscore
    }

   }
   fmt.Printf("%v\n",genre_score)




                         // print out our record from the database
}
