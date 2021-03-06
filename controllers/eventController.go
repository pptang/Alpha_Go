package controllers

import (
	"Alpha_Go/models"
	"Alpha_Go/schema"
	"log"

	"github.com/gin-gonic/gin"
)

func NewOutingEvent(c *gin.Context) {
	var event schema.Event
	c.BindJSON(&event)

	user_id, _ := c.Get("user_id")

	err := models.CreateEvent(event.Title, event.Description,
		event.PlaceOptions, event.Date, int64(user_id.(float64)))
	log.Println(err)
	if err == nil {
		c.JSON(200, gin.H{"event": event})
	} else {
		c.JSON(500, gin.H{"error": true, "message": err.Error()})
	}

}

func GetAllEvents(c *gin.Context) {
	events, err := models.FindAllEvents()

	if err == nil {
		c.JSON(200, gin.H{"events": events})
	} else {
		c.JSON(500, gin.H{"error": true, "message": err.Error()})
	}
}

func GetEventById(c *gin.Context) {
	event_id := c.Param("eventId")
	user_id, _ := c.Get("user_id")
	// event_id := c.Query("eventId")
	if event_id != "" {
		event, err := models.FindEventById(event_id, int64(user_id.(float64)))

		if err == nil {
			c.JSON(200, gin.H{"event": event})
		} else {
			c.JSON(500, gin.H{"error": true, "message": "error"})
		}
	} else {
		c.JSON(401, gin.H{"error": true, "message": "Must pass event id"})
	}

}

func DeleteEventById(c *gin.Context) {
	event_id := c.Param("eventId")

	if event_id != "" {
		err := models.DeleteEventById(event_id)

		if err == nil {
			c.JSON(200, gin.H{"event": "Successfully deleted"})
		} else {
			c.JSON(500, gin.H{"error": true, "message": "error"})
		}
	} else {
		c.JSON(401, gin.H{"error": true, "message": "Must pass event id"})
	}

}

func VoteForOptions(c *gin.Context) {
	var vote schema.Vote
	c.BindJSON(&vote)

	user_id, _ := c.Get("user_id")

	var placeOptions []schema.PlaceOption

	placeOptions, err := models.CreateVote(vote.EventId, vote.Options, int64(user_id.(float64)))
	log.Println(err)
	if err == nil {
		c.JSON(200, gin.H{"placeOptions": placeOptions, "isVoted": true})
	} else {
		c.JSON(500, gin.H{"error": true, "message": err.Error()})
	}
}
