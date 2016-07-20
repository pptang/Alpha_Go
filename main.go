package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/static"
	"Alpha_Go/database"
	"Alpha_Go/controllers"
	"strings"
	"Alpha_Go/utils"
	"reflect"
	"log"
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
			c.Next()
			// c.Abort()
		}

	}

}

func main() {
	database.InitDb()

	r := gin.Default()

	r.Use(static.Serve("/", static.LocalFile("./public", true)))

	v1 := r.Group("api/v1")
	{
		v1.POST("/signup", controllers.Register)
		v1.POST("/signin", controllers.Login)
		v1.GET("/getUser", controllers.GetUserInfo)
		v1.POST("/newOutingEvent", authMiddleware(), controllers.NewOutingEvent)
		v1.GET("/getAllEvents", authMiddleware(), controllers.GetAllEvents)
		v1.GET("/getEventById", authMiddleware(), controllers.GetEventById)
	}

	r.Run(":8080")
}
