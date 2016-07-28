package models

import (
  "time"
  "Alpha_Go/database"
  "Alpha_Go/schema"
  "log"
)

func CreateEvent(title string, description string, place_options []schema.PlaceOption,
                  date string, holder_id int64) error {

  insert, insertErr := database.Dbmap.Exec(`INSERT INTO event (title, description, date, holder_id, created_at)
                                            VALUES (?, ?, ?, ?, ?)`, title, description, date, holder_id, time.Now().UnixNano())
  if insertErr == nil {
    event_id, _ := insert.LastInsertId()
    log.Println(event_id)
    log.Println(place_options)
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

func InsertEventPlaceOptions(event_id int64, place_options []schema.PlaceOption) error {

  created_at := time.Now().UnixNano()
  var err error
  for _, option := range place_options {
    newPlaceOption := schema.PlaceOption {
      Title: option.Title,
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
  errFromEvent := database.Dbmap.SelectOne(&event, "select * from event where id=?", event_id)
  if errFromEvent != nil {
    return event, errFromEvent
  } else {
    var placeOptions []schema.PlaceOption
    _, errFromPlaceOptions := database.Dbmap.Select(&placeOptions, "select * from place_option where event_id=?", event_id)

    event.PlaceOptions = placeOptions

    if errFromPlaceOptions != nil {
      return event, errFromPlaceOptions
    }
  }


  return event, nil
}

func DeleteEventById(event_id string) error {
  _, err := database.Dbmap.Exec("delete from event where id=?", event_id)
  return err
}
