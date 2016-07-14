package main

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"gopkg.in/gorp.v1"
	"log"
	// "strconv"
	"github.com/gin-gonic/contrib/static"
	"golang.org/x/crypto/bcrypt"
	"github.com/dgrijalva/jwt-go"
	"time"
)

var dbmap = initDb()

func initDb() *gorp.DbMap {
	db, err := sql.Open("mysql", "root:eddy0518@/myapi")
	checkErr(err, "sql.Open failed")
	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.MySQLDialect{"InnoDB", "UTF8"}}
	dbmap.AddTableWithName(User{}, "User").SetKeys(true, "Id")
	err = dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create table failed")
	return dbmap
}

func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}

type User struct {
	Id        int64  `db:"id" json:"id"`
	Email string `db:"email" json:"email"`
	Password  string `db:"password" json:"password"`
}

// func GetUsers(c *gin.Context) {
// 	var users []User
//
// 	_, err := dbmap.Select(&users, "SELECT * FROM user")
//
// 	if err == nil {
// 		c.JSON(200, users)
// 	} else {
// 		c.JSON(404, gin.H{"error": "no user(s) into the table"})
// 	}
//
// }

// func GetUser(c *gin.Context) {
// 	id := c.Params.ByName("id")
//
// 	var user User
// 	err := dbmap.SelectOne(&user, "SELECT * FROM user WHERE id=?", id)
//
// 	if err == nil {
// 		user_id, _ := strconv.ParseInt(id, 0, 64)
// 		content := &User{
// 			Id:	user_id,
// 			Email:	user.Email,
// 			Password:	user.Password,
// 		}
// 		c.JSON(200, content)
// 	} else {
// 		c.JSON(404, gin.H{"error": "user not found"})
// 	}
//
// }

// func PostUser(c *gin.Context) {
// 	var user User
// 	c.Bind(&user)
//
// 	if user.Firstname != "" && user.Lastname != "" {
//
// 		if insert, _ := dbmap.Exec(`INSERT INTO user (firstname, lastname) VALUES (?, ?)`, user.Firstname, user.Lastname); insert != nil {
// 			user_id, err := insert.LastInsertId()
// 			if err == nil {
// 				content := &User{
// 					Id:        user_id,
// 					Firstname: user.Firstname,
// 					Lastname:  user.Lastname,
// 				}
// 				c.JSON(201, content)
// 			} else {
// 				checkErr(err, "Insert failed")
// 			}
// 		}
//
// 	} else {
// 		c.JSON(422, gin.H{"error": "fields are empty"})
// 	}
// }

// func UpdateUser(c *gin.Context) {
// 	id := c.Params.ByName("id")
// 	var user User
// 	err := dbmap.SelectOne(&user, "SELECT * FROM user WHERE id=?", id)
//
// 	if err == nil {
// 		var json User
// 		c.Bind(&json)
//
// 		user_id, _ := strconv.ParseInt(id, 0, 64)
//
// 		user := User{
// 			Id:        user_id,
// 			Firstname: json.Firstname,
// 			Lastname:  json.Lastname,
// 		}
//
// 		if user.Firstname != "" && user.Lastname != "" {
// 			_, err = dbmap.Update(&user)
//
// 			if err == nil {
// 				c.JSON(200, user)
// 			} else {
// 				checkErr(err, "Updated failed")
// 			}
//
// 		} else {
// 			c.JSON(422, gin.H{"error": "fields are empty"})
// 		}
//
// 	} else {
// 		c.JSON(404, gin.H{"error": "user not found"})
// 	}
// }

// func DeleteUser(c *gin.Context) {
// 	id := c.Params.ByName("id")
//
// 	var user User
// 	err := dbmap.SelectOne(&user, "SELECT id FROM user WHERE id=?", id)
//
// 	if err == nil {
// 		_, err = dbmap.Delete(&user)
//
// 		if err == nil {
// 			c.JSON(200, gin.H{"id #" + id: " deleted"})
// 		} else {
// 			checkErr(err, "Delete failed")
// 		}
//
// 	} else {
// 		c.JSON(404, gin.H{"error": "user not found"})
// 	}
// }

func UserSignUp(c *gin.Context) {
	var user User
	c.Bind(&user)

	if user.Email != "" && user.Password != "" {
		var userInDb User
		err := dbmap.SelectOne(&userInDb, "SELECT * FROM user WHERE email=?", user.Email)
		if err == nil {
			c.JSON(409, gin.H{"error": true, "message": "This email has already been registered"})
		} else {
			hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
			if (err == nil) {
				if insert, _ := dbmap.Exec(`INSERT INTO user (email, password) VALUES (?, ?)`, user.Email, hash); insert != nil {
					user_id, _ := insert.LastInsertId()
					newUser := &User {
						Id: user_id,
						Email: user.Email,
					}
					jwtToken := jwt.New(jwt.SigningMethodHS256)
					claims := jwtToken.Claims.(jwt.MapClaims)
					claims["admin"] = true
					claims["email"] = user.Email
					claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
					c.JSON(201, gin.H{"user": newUser, "token": jwtToken})
				} else {
					c.JSON(500, gin.H{"error": true, "message": "Insert User Error"})
				}
			} else {
				c.JSON(500, gin.H{"error": true, "message": "Internal Error"})
			}
		}
	}
}

func UserSignIn(c *gin.Context) {
	var user User
	c.Bind(&user)

	if user.Email != "" && user.Password != "" {

		var userInDb User
		err := dbmap.SelectOne(&userInDb, "SELECT * FROM user WHERE email=?", user.Email)

		if err == nil {
			compPwdErr := bcrypt.CompareHashAndPassword([]byte(userInDb.Password), []byte(user.Password))
			if compPwdErr != nil {
				c.JSON(404, gin.H{"error": true, "message": "password is wrong"})
			} else {
				//TODO: Generate Token, also return user without password
				// c.JSON(200, gin.H{"user": true, token)
			}
		} else {
			c.JSON(404, gin.H{"error": true, "message": "user not found"})
		}

	} else {
		c.JSON(422, gin.H{"error": true, "message": "fields are empty"})
	}
}

func main() {
	r := gin.Default()

	r.Use(static.Serve("/", static.LocalFile("./public", true)))

	v1 := r.Group("api/v1")
	{
		v1.POST("/signup", UserSignUp)
		v1.POST("/signin", UserSignIn)
		// v1.GET("/users", GetUsers)
		// v1.GET("/users/:id", GetUser)
		// v1.POST("/users", PostUser)
		// v1.PUT("/users/:id", UpdateUser)
		// v1.DELETE("/users/:id", DeleteUser)
	}

	r.Run(":8080")
}
