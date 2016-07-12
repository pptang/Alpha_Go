package main

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"gopkg.in/gorp.v1"
	"log"
	"strconv"
	"github.com/gin-gonic/contrib/static"
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
	Firstname string `db:"firstname" json:"firstname"`
	Lastname  string `db:"lastname" json:"lastname"`
}

func GetUsers(c *gin.Context) {
	var users []User

	_, err := dbmap.Select(&users, "SELECT * FROM user")

	if err == nil {
		c.JSON(200, users)
	} else {
		c.JSON(404, gin.H{"error": "no user(s) into the table"})
	}

	// var users = Users {
	// 	User{Id: 1, Firstname: "Bible", Lastname: "Tang"},
	// 	User{Id: 2, Firstname: "Steve", Lastname: "Jung"},
	// }
	//
	// c.JSON(200, users)
}

func GetUser(c *gin.Context) {
	id := c.Params.ByName("id")

	var user User
	err := dbmap.SelectOne(&user, "SELECT * FROM user WHERE id=?", id)

	if err == nil {
		user_id, _ := strconv.ParseInt(id, 0, 64)
		content := &User{
			Id:        user_id,
			Firstname: user.Firstname,
			Lastname:  user.Lastname,
		}
		c.JSON(200, content)
	} else {
		c.JSON(404, gin.H{"error": "user not found"})
	}

	// user_id, _ := strconv.ParseInt(id, 0, 64)
	// if user_id == 1 {
	// 	content := gin.H{"id": user_id, "firstname": "Bible", "lastname": "Tang"}
	// 	c.JSON(200, content)
	// } else if user_id == 2 {
	// 	content := gin.H{"id": user_id, "firstname": "Steve", "lastname": "Jung"}
	// 	c.JSON(200, content)
	// } else {
	// 	content := gin.H{"error": "user with id#" + id + " not found"}
	// 	c.JSON(404, content)
	// }
}

func PostUser(c *gin.Context) {
	var user User
	c.Bind(&user)

	if user.Firstname != "" && user.Lastname != "" {

		if insert, _ := dbmap.Exec(`INSERT INTO user (firstname, lastname) VALUES (?, ?)`, user.Firstname, user.Lastname); insert != nil {
			user_id, err := insert.LastInsertId()
			if err == nil {
				content := &User{
					Id:        user_id,
					Firstname: user.Firstname,
					Lastname:  user.Lastname,
				}
				c.JSON(201, content)
			} else {
				checkErr(err, "Insert failed")
			}
		}

	} else {
		c.JSON(422, gin.H{"error": "fields are empty"})
	}
}

func UpdateUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user User
	err := dbmap.SelectOne(&user, "SELECT * FROM user WHERE id=?", id)

	if err == nil {
		var json User
		c.Bind(&json)

		user_id, _ := strconv.ParseInt(id, 0, 64)

		user := User{
			Id:        user_id,
			Firstname: json.Firstname,
			Lastname:  json.Lastname,
		}

		if user.Firstname != "" && user.Lastname != "" {
			_, err = dbmap.Update(&user)

			if err == nil {
				c.JSON(200, user)
			} else {
				checkErr(err, "Updated failed")
			}

		} else {
			c.JSON(422, gin.H{"error": "fields are empty"})
		}

	} else {
		c.JSON(404, gin.H{"error": "user not found"})
	}
}

func DeleteUser(c *gin.Context) {
	id := c.Params.ByName("id")

	var user User
	err := dbmap.SelectOne(&user, "SELECT id FROM user WHERE id=?", id)

	if err == nil {
		_, err = dbmap.Delete(&user)

		if err == nil {
			c.JSON(200, gin.H{"id #" + id: " deleted"})
		} else {
			checkErr(err, "Delete failed")
		}

	} else {
		c.JSON(404, gin.H{"error": "user not found"})
	}
}

func main() {
	r := gin.Default()

	r.Use(static.Serve("/", static.LocalFile("./public", true)))

	v1 := r.Group("api/v1")
	{

		v1.GET("/users", GetUsers)
		v1.GET("/users/:id", GetUser)
		v1.POST("/users", PostUser)
		v1.PUT("/users/:id", UpdateUser)
		v1.DELETE("/users/:id", DeleteUser)
	}

	r.Run(":8080")
}
