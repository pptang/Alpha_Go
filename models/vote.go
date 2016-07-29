package models

import (
	"Alpha_Go/database"
	"Alpha_Go/schema"
)

func CreateVote(event_id int64, options []int64, user_id int64) error {
	var err error
	for _, option := range options {

		newVote := schema.Vote{
			EventId:  event_id,
			OptionId: option,
			UserId:   user_id,
		}

		err = database.Dbmap.Insert(&newVote)
		if err != nil {
			break
		}

	}

	if err == nil {
		return nil
	} else {
		return err
	}

}

// func InsertEventPlaceOptions(event_id int64, place_options []schema.PlaceOption) error {
//
//   created_at := time.Now().UnixNano()
//   var err error
//   for _, option := range place_options {
//     newPlaceOption := schema.PlaceOption {
//       Title: option.Title,
//       EventId: event_id,
//       Created: created_at,
//     }
//     err = database.Dbmap.Insert(&newPlaceOption)
//     if err != nil {
//       break;
//     }
//   }
//
//   if err == nil {
//     return nil
//   } else {
//
//     return err
//   }
//
// }