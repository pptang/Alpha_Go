package database

import (
	"Alpha_Go/schema"
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"gopkg.in/gorp.v1"
)

var (
	Dbmap *gorp.DbMap
)

func InitDb() {
	log.Println("init DB")
	db, err := sql.Open("mysql", "root:eddy0518@/myapi")
	checkErr(err, "sql.Open failed")
	Dbmap = &gorp.DbMap{Db: db, Dialect: gorp.MySQLDialect{"InnoDB", "UTF8"}}
	Dbmap.AddTableWithName(schema.User{}, "user").SetKeys(true, "Id")
	Dbmap.AddTableWithName(schema.Event{}, "event").SetKeys(true, "Id")
	Dbmap.AddTableWithName(schema.PlaceOption{}, "place_option").SetKeys(true, "Id")
	Dbmap.AddTableWithName(schema.Vote{}, "vote").SetKeys(true, "Id")
	Dbmap.AddTableWithName(schema.Bill{}, "bill").SetKeys(true, "Id")
	err = Dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create table failed")

}

func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}
