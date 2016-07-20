package models

import (
  "time"
  "Alpha_Go/database"
  "log"
  "Alpha_Go/schema"
)

func CreateEvent(title string, description string, place_options []string,
                  date int64, holder_id int64) error {

  insert, insertErr := database.Dbmap.Exec(`INSERT INTO event (title, description, date, holder_id, created_at)
                                            VALUES (?, ?, ?, ?, ?)`, title, description, date, holder_id, time.Now().UnixNano())
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

  created_at := time.Now().UnixNano()
  var err error
  for _, option := range place_options {
    newPlaceOption := schema.PlaceOption {
      Title: option,
      EventId: event_id,
      Created: created_at,
    }
    err = database.Dbmap.Insert(&newPlaceOption)
    if err != nil {
      break;
    }
  }

  if err == nil {
    return nil
  } else {
    log.Println(err)
    return err
  }

}

func FindAllEvents() {

}
