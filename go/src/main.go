package main

import (
   "fmt"
   d "./db_calc"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB       
var err error                                  // declaring the db globally
var r *gin.Engine

type Person struct {
	ID uint `json:"id"`
	Logged int `json:"logged"`
	Username string `json:"username"`
	Password string `json:"password"`
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
   db,err = gorm.Open("sqlite3","./test.db")     
   if err != nil {
      fmt.Println(err)
   }        
   defer db.Close()
   db.AutoMigrate(&Person{},&Quizzes{},&Questions{},&Highscore{})                          
   r := gin.Default()
   r.POST("/signup",MakeUser)	//signing up
   r.POST("/authenticate",Authenticate)	//login authenticate
   r.GET("/getgenres",GetGenres)	//string list of genres
   r.GET("/getquestions/:genre",GetQuestions)	//return JSON of array of questions
   r.GET("/")
   r.Use((cors.Default()))
   r.Run(":8080")
}

func initializeRoutes() {
	// r.POST("/signup", MakeUser)	//signing up
}
func MakeUser(c *gin.Context) {
   var person Person
   c.BindJSON(&person)
   person.Logged = 0
   db.Create(&person)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200,person)
}

func Authenticate(c *gin.Context) {
	var user Person
	c.BindJSON(&user)
	var person Person
	if err:=db.Where("username = ?", user.Username).First(&person).Error; err!=nil{
	   fmt.Printf("%s\n",err)
	}
	c.Header("access-control-allow-origin", "*")
	if user.Password == person.Password {
		c.JSON(200,gin.H{
			"authenticated":1,
			"id":person.ID,
		   })
	} else {
		c.JSON(200,gin.H{
			"authenticated":0,
			})
	}
}

func GetGenres(c *gin.Context) {
	var genres []string = d.List_genre()
	c.Header("access-control-allow-origin", "*")
	c.JSON(200,genres)
}


func GetQuestions(c *gin.Context) {
	var genre string = c.Params.ByName("genre")
	var quiz []Quizzes
	db.Where("genre = ?",genre).Find(&quiz)
	var questions []Questions
	for _,element := range quiz {
	 var list []Questions
	 db.Where("quizno = ?", element.ID).Find(&list)  
	 for _,j := range list {
	   questions = append(questions,j)
	 }
	}
	c.JSON(200,questions)
}
 








