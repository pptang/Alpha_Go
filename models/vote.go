package models

import (
	"Alpha_Go/database"
	"Alpha_Go/schema"
	"log"
	"strconv"
)

func CreateVote(event_id int64, options []int64, user_id int64) ([]schema.PlaceOption, error) {
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

	if err != nil {
		return nil, err
	}
	var placeOptions []schema.PlaceOption
	_, errFromPlaceOptions := database.Dbmap.Select(&placeOptions, "select * from place_option where event_id=?", event_id)

	if errFromPlaceOptions != nil {
		return nil, errFromPlaceOptions
	}

	placeOptions, errFromVoteCount := GetVoteCountsForOption(strconv.Itoa(int(event_id)), placeOptions)

	if errFromVoteCount != nil {
		return nil, errFromVoteCount
	}

	return placeOptions, nil

}

func GetVoteCountsForOption(eventId string, placeOptions []schema.PlaceOption) ([]schema.PlaceOption, error) {

	for index, option := range placeOptions {
		log.Println("eventId:", eventId)
		log.Println("optionId:", option.Id)
		voteCount, errFromCountVote := database.Dbmap.SelectInt("select count(*) from vote where event_id=? and option_id=?", eventId, option.Id)
		if errFromCountVote != nil {
			return nil, errFromCountVote
		}
		log.Println("voteCount", voteCount)
		placeOptions[index].Count = voteCount
	}

	return placeOptions, nil
}
