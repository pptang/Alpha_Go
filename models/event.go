package models

import (
  "time"
)

type Event struct {
  Id int64 `db:"id" json:"id"`
  Title string `db:"title" json:"title"`
  Description string `db:"desc" json:"desc"`
  Options []string `db:"options" json:"options"`
  Date time.Time `db:"date" json:"date"`
  HolderId int64 `db:"holder_id" json:"holder_id"`
}

func createEvent() {

}

func findAllEvents() {

}
