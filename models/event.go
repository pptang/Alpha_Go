package models

import (
  "time"
  // "Alpha_Go/database"
)

type Event struct {
  Id int64 `db:"id" json:"id"`
  Title string `db:"title" json:"title"`
  Description string `db:"desc" json:"desc"`
  Date time.Time `db:"date" json:"date"`
  HolderId int64 `db:"holder_id" json:"holder_id"`
  Created int64 `db:"created_at" json:"created_at"`
}

func CreateEvent(title string, desc string, placeOptions []string,
                  date time.Time) {

}

func FindAllEvents() {

}
