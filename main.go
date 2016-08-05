package main

import (
	"Alpha_Go/controllers"
	"Alpha_Go/database"
	"Alpha_Go/utils"
	"log"
	"reflect"
	"strings"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// func TestHandler(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "success"})
// }

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		tokenString := c.Request.Header.Get("Authorization")
		tokenString = strings.Replace(tokenString, "Bearer ", "", 1)

		claims, ok := utils.GetClaimsFromTokenString(tokenString)

		if ok {
			c.Set("user_id", claims["id"])
			log.Println(reflect.TypeOf(claims["id"]))
			c.Next()
		} else {
			// c.Next()
			c.Abort()
		}

	}

}

func main() {
	database.InitDb()

	r := gin.Default()

	// workaround for refresh issue
	r.Use(static.Serve("/", static.LocalFile("./public", true)))
	r.Use(static.Serve("/signin", static.LocalFile("./public", true)))
	r.Use(static.Serve("/signup", static.LocalFile("./public", true)))
	r.Use(static.Serve("/events/new", static.LocalFile("./public", true)))
	r.Use(static.Serve("/getEvent/:eventId", static.LocalFile("./public", true)))

	v1 := r.Group("api/v1")
	{
		v1.POST("/signup", controllers.Register)
		v1.POST("/signin", controllers.Login)
		v1.GET("/getUser", controllers.GetUserInfo)
		v1.GET("/getAllUsers", authMiddleware(), controllers.GetAllUsers)
		v1.POST("/events", authMiddleware(), controllers.NewOutingEvent)
		v1.GET("/getAllEvents", authMiddleware(), controllers.GetAllEvents)
		v1.GET("/getEvent/:eventId", authMiddleware(), controllers.GetEventById)
		v1.DELETE("/events/:eventId", authMiddleware(), controllers.DeleteEventById)
		v1.POST("/voteForOptions", authMiddleware(), controllers.VoteForOptions)
		v1.GET("/test", controllers.Test)
	}

	r.Run(":8080")
}
