package models

import (
  "time"
  "Alpha_Go/database"
)

type Event struct {
  Id int64 `db:"id" json:"id"`
  Title string `db:"title" json:"title"`
  Description string `db:"desc" json:"desc"`
  PlaceOptions []string `json:"place_options"`
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

func CreateEvent(title string, desc string, place_options []string,
                  date int64, holder_id int64) error {

  insert, insertErr := database.Dbmap.Exec(`INSERT INTO event (title, desc, date, holder_id, created_at)
                        VALUES (?, ?, ?, ?, ?)`, title, desc, date, holder_id,
                        time.Now().UnixNano())
  if insertErr == nil {
    event_id, _ := insert.LastInsertId()
    err := InsertEventPlaceOptions(event_id, place_options)
    if err == nil {
      return nil
    } else {
      return err
    }
  } else {
    return insertErr
  }

}

func InsertEventPlaceOptions(event_id int64, place_options []string) error {
  var placeOptionList []*PlaceOption

  created_at := time.Now().UnixNano()

  for _, option := range place_options {
    newPlaceOption := &PlaceOption {
      Title: option,
      EventId: event_id,
      Created: created_at,
    }
    placeOptionList = append(placeOptionList, newPlaceOption)
  }

  err := database.Dbmap.Insert(placeOptionList)
  if err == nil {
    return nil
  } else {
    return err
  }
}

func FindAllEvents() {

}
