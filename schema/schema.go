package schema

type User struct {
	Id        int64  `db:"id" json:"id"`
	Email string `db:"email" json:"email"`
	Password  string `db:"password" json:"password"`
	Created int64 `db:"created_at" json:"created_at"`
}

type Event struct {
  Id int64 `db:"id" json:"id"`
  Title string `db:"title" json:"title"`
  Description string `db:"description" json:"description"`
	PlaceOptions []string `db:"-" json:"place_options"`
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
