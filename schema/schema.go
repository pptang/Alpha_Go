package schema

type User struct {
	Id       int64  `db:"id" json:"id"`
	Email    string `db:"email" json:"email"`
	Password string `db:"password" json:"password"`
	Created  int64  `db:"created_at" json:"created_at"`
}

type Event struct {
	Id           int64         `db:"id" json:"id"`
	Title        string        `db:"title" json:"title"`
	Description  string        `db:"description" json:"description"`
	PlaceOptions []PlaceOption `db:"-" json:"place_options"`
	Date         string        `db:"date" json:"date"`
	HolderId     int64         `db:"holder_id" json:"holder_id"`
	Created      int64         `db:"created_at" json:"created_at"`
	IsVoted      bool          `db:"-" json:"isVoted"`
}

type PlaceOption struct {
	Id      int64  `db:"id" json:"id"`
	Title   string `db:"title" json:"title"`
	EventId int64  `db:"event_id" json:"event_id"`
	Created int64  `db:"created_at" json:"created_at"`
	Count   int64  `db:"-" json:"count"`
}

type Vote struct {
	Id       int64   `db:"id" json:"id"`
	EventId  int64   `db:"event_id" json:"event_id"`
	Options  []int64 `db:"-" json:"options"`
	OptionId int64   `db:"option_id" json:"-"`
	UserId   int64   `db:"user_id" json:"user_id"`
}

type BillRequest struct {
	Bills []Bill `json: "bills"`
}

type Bill struct {
	Id         int64 `db:"id" json:"id"`
	EventId    int64 `db:"event_id" json:"event_id"`
	UserId     int64 `db:"user_id" json:"user_id"`
	CreditorId int64 `db:"creditor_id" json:"creditor_id"`
	Amount     int64 `db:"amount" json:"amount"`
	IsCleared  bool  `db:"is_cleared" json:"is_cleared"`
}
