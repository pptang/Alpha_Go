package controllers

import (
  "Alpha_Go/models"
	"github.com/gin-gonic/gin"
	"Alpha_Go/schema"
	"log"
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
	// event_id := c.Query("eventId")
	if event_id != "" {
		event, err := models.FindEventById(event_id)
		if err != nil {
			c.JSON(200, gin.H{"event": event})
		} else {
			c.JSON(500, gin.H{"error": true, "message": err.Error()})
		}
	} else {
		c.JSON(401, gin.H{"error": true, "message": "Must pass event id"})
	}

}
