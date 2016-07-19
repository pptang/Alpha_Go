package database

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"gopkg.in/gorp.v1"
	"log"
)

var (
	Dbmap *gorp.DbMap
)

type User struct {
	Id        int64  `db:"id" json:"id"`
	Email string `db:"email" json:"email"`
	Password  string `db:"password" json:"password"`
	Created int64 `db:"created_at" json:"created_at"`
}

type Event struct {
  Id int64 `db:"id" json:"id"`
  Title string `db:"title" json:"title"`
  Description string `db:"desc" json:"desc"`
  Date int64 `db:"date" json:"date"`
  HolderId int64 `db:"holder_id" json:"holder_id"`
  Created int64 `db:"created_at" json:"created_at"`
}

type PlaceOption struct {
  Id int64 `db:"id" json:"id"`
  Title string `db:"title" json:"title"`
  EventId int64 `db:"event_id" json:"event_id"`
  Created int64 `db:"created_at" json:"created_at"`
}

func InitDb() {
	db, err := sql.Open("mysql", "root:eddy0518@/myapi")
	checkErr(err, "sql.Open failed")
	Dbmap = &gorp.DbMap{Db: db, Dialect: gorp.MySQLDialect{"InnoDB", "UTF8"}}
	Dbmap.AddTableWithName(User{}, "User").SetKeys(true, "Id")
	Dbmap.AddTableWithName(Event{}, "Event").SetKeys(true, "Id")
	Dbmap.AddTableWithName(PlaceOption{}, "PlaceOption").SetKeys(true, "Id")
	err = Dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create table failed")

}

func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}
