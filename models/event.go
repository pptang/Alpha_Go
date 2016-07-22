package models

import (
  "time"
  "Alpha_Go/database"
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

    return err
  }

}

func FindAllEvents() ([]schema.Event, error){
  var events []schema.Event
  _, err := database.Dbmap.Select(&events, "select * from event order by created_at desc")

  if err != nil {
    return events, nil
  } else {
    return nil, err
  }
  return nil, nil
}

func FindEventById(event_id string) (schema.Event, error){

  var event schema.Event
  err := database.Dbmap.SelectOne(&event, "select * from event where id=?", event_id)

  return event, err
}
