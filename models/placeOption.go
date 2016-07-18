package models

import (

)

type PlaceOption struct {
  Id int64 `db:"id" json:"id"`
  Title string `db:"title" json:"title"`
  EventId int64 `db:"event_id" json:"event_id"`
  Created int64 `db:"created_at" json:"created_at"`
}
