package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error

type Person struct {
   ID uint `json:"id"`
   Firstname string `json:"firstname"`
   Lastname string `json:"lastname"`
   City string `json:"city"`
}

type UserAuth struct {
   ID uint `json:"id"`
   Logged int `json:"logged"`
   Username string `json:"username"`
   Password string `json:"password"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()
   db.AutoMigrate(&UserAuth{},&Person{})
   r := gin.Default()
   r.GET("/people/", GetPeople)                             // Creating routes for each functionality
   r.GET("/people/:id", GetPerson)
   r.POST("/people", CreatePerson)
   r.PUT("/people/:id", UpdatePerson)
   r.DELETE("/people/:id", DeletePerson)
   r.POST("/test", Test)
   r.POST("/authenticate",Authenticate)
   r.POST("/signup",MakeUser)
   r.Use((cors.Default()))
   r.Run(":8080")    
                                          // Run on port 8080
}

func Authenticate(c *gin.Context) {
   var user UserAuth
   c.BindJSON(&user)
   var person UserAuth
   if err:=db.Where("username = ?", user.Username).First(&person).Error; err!=nil{
      fmt.Printf("%s\n",err)
   }
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   if user.password == person.Password {
   	c.JSON(200,gin.H{
   		person.Logged = 1
   		"authenticated":1,
   		"id":person.ID,
   	   })
   } else {
   	c.JSON(200,gin.H{
   		"authenticated":0,
         "id":nil,
   		})
   }

}
func MakeUser(c *gin.Context) {
   var person UserAuth
   c.BindJSON(&person)
   person.Logged = 0
   db.Create(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200,person)
}

func Test(c *gin.Context) {
   var person Person
   var person1 Person
   c.BindJSON(&person)
   db.Where("id = ?", person.ID).First(&person1)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200,person1)

}

func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
   var person Person
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&person)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}

func CreatePerson(c *gin.Context) {
   var person Person
   c.BindJSON(&person)
   db.Create(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200,person)
}

func GetPerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   db.First(&person, id)
   if err := db.First(&person, id).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, person)
   }
}

func GetPeople(c *gin.Context) {
   var people []Person
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, people)
   }
}
