package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/static"
	"Alpha_Go/database"
	"Alpha_Go/controllers"
)
// func TestHandler(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "success"})
// }

// func authMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
//
// 		tokenString := c.Request.Header.Get("Authorization")
// 		tokenString = strings.Replace(tokenString, "Bear ", "", 1)
// 		log.Print(tokenString)
// 		// Parse takes the token string and a function for looking up the key. The latter is especially
// 		// useful if you use multiple keys for your application.  The standard is to use 'kid' in the
// 		// head of the token to identify which key to use, but the parsed token (head and claims) is provided
// 		// to the callback, providing flexibility.
// 		token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
// 		    // Don't forget to validate the alg is what you expect:
// 		    if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
// 		        return nil, fmt.Errorf("Something wrong")
// 		    }
// 		    return mySigningKey, nil
// 		})
//
// 		log.Print(token)
// 		if token.Valid {
// 			c.Next()
// 		} else {
// 			c.JSON(403, gin.H{"error": true, "message": "token not valid"})
// 		}
// 	}
//
// }

func main() {
	database.InitDb()

	r := gin.Default()

	r.Use(static.Serve("/", static.LocalFile("./public", true)))

	v1 := r.Group("api/v1")
	{
		v1.POST("/signup", controllers.Register)
		v1.POST("/signin", controllers.Login)
		v1.GET("/getUser", controllers.GetUserInfo)
		// v1.GET("/test", authMiddleware(), TestHandler)

	}

	r.Run(":8080")
}
