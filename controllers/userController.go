package controllers

import (
	"github.com/dgrijalva/jwt-go"
	"log"
	"Alpha_Go/models"
	"github.com/gin-gonic/gin"
	"fmt"
	"Alpha_Go/constants"
)




func Register(c *gin.Context) {
	var user models.User
	c.Bind(&user)

	if user.Email != "" && user.Password != "" {

		_, err := models.FindUserByEmail(user.Email)

		if err == nil {

			c.JSON(409, gin.H{"error": true, "message": "This email has already been registered"})
		} else {

			newUser, tokenString, err := models.CreateUser(user.Email, user.Password)

			if (err == nil) {
				c.JSON(200, gin.H{"user": newUser, "token": tokenString})
			} else {
				c.JSON(500, gin.H{"error": true, "message": err.Error()})
			}

		}
	}
}

func Login(c *gin.Context) {
	var user models.User
	c.Bind(&user)

	if user.Email != "" && user.Password != "" {

		currentUser, tokenString, err := models.FindUserByEmailAndPassword(user.Email, user.Password)

		if err == nil {
			c.JSON(200, gin.H{"user": currentUser, "token": tokenString})
		} else {
			c.JSON(404, gin.H{"error": true, "message": err.Error()})
		}

	} else {
		c.JSON(422, gin.H{"error": true, "message": "fields are empty"})
	}
}

func GetUserInfo(c *gin.Context) {
	tokenString := c.Query("token")

	if tokenString != "" {
		token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				// Don't forget to validate the alg is what you expect:
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
						return nil, fmt.Errorf("Something wrong")
				}
				return constants.MY_SIGNING_KEY, nil
		})

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		    // fmt.Println(claims["foo"], claims["nbf"])

				currentEmail, _ := claims["email"].(string)
				currentUser := &models.User {
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
