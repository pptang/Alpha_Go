package controllers

import (
	"Alpha_Go/models"
	"Alpha_Go/schema"
	"Alpha_Go/utils"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var user schema.User
	c.Bind(&user)

	if user.Email != "" && user.Password != "" {

		_, err := models.FindUserByEmail(user.Email)

		if err == nil {

			c.JSON(409, gin.H{"error": true, "message": "This email has already been registered"})
		} else {

			newUser, tokenString, err := models.CreateUser(user.Email, user.Password)

			if err == nil {
				c.JSON(200, gin.H{"user": newUser, "token": tokenString})
			} else {
				c.JSON(500, gin.H{"error": true, "message": err.Error()})
			}

		}
	}
}

func Login(c *gin.Context) {
	var user schema.User
	c.Bind(&user)

	if user.Email != "" && user.Password != "" {

		currentUser, tokenString, err := models.FindUserByEmailAndPassword(user.Email, user.Password)

		if err == nil {
			c.JSON(200, gin.H{"user": currentUser, "token": tokenString})
		} else {
			log.Println(err)
			c.JSON(404, gin.H{"error": true, "message": err.Error()})
		}

	} else {
		c.JSON(422, gin.H{"error": true, "message": "fields are empty"})
	}
}

func GetAllUsers(c *gin.Context) {
	users, err := models.FindAllUsers()

	if err == nil {
		c.JSON(200, gin.H{"users": users})
	} else {
		c.JSON(500, gin.H{"error": true, "message": err.Error()})
	}
}

func GetUserInfo(c *gin.Context) {
	tokenString := c.Query("token")

	if tokenString != "" {

		claims, ok := utils.GetClaimsFromTokenString(tokenString)

		if ok {
			currentEmail, _ := claims["email"].(string)
			currentId, _ := claims["id"].(float64)

			currentUser := &schema.User{
				Id:    int64(currentId),
				Email: currentEmail,
			}
			c.JSON(200, gin.H{"token": tokenString, "user": currentUser})
		} else {
			log.Println("Wrong in getuserinfo")
		}
	} else {
		c.JSON(401, gin.H{"error": true, "message": "Must pass token"})
	}
}

type Body struct {
	Data string
}

func Test(c *gin.Context) {
	resp, err := http.Get("http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=36847f3f-deff-4183-a5bb-800737591de5&limit=1&format=xml")
	if err != nil {
		c.JSON(400, gin.H{"error": true, "message": err})
		return
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		c.JSON(400, gin.H{"error": true, "message": err})
		return
	}

	c.JSON(200, gin.H{"data": string(body)})

}
