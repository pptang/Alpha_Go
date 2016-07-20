package controllers

import (
  "Alpha_Go/models"
	"github.com/gin-gonic/gin"
	"log"
	"reflect"
	"Alpha_Go/schema"
)

func NewOutingEvent(c *gin.Context) {
	var event schema.Event
	c.BindJSON(&event)

	user_id, _ := c.Get("user_id")

	log.Print("userid:")
	log.Println(user_id)
	// user_id = int64(user_id)
	log.Println(reflect.TypeOf(user_id))
	log.Println(reflect.TypeOf(int64(user_id.(float64))))
log.Print("event title:")
	log.Println(event.Title)
	log.Print("event.Description:")
		log.Println(event.Description)
		log.Print("event.PlaceOptions:")
			log.Println(event.PlaceOptions)
			log.Print("event.Date:")
				log.Println(event.Date)

	err := models.CreateEvent(event.Title, event.Description,
													event.PlaceOptions, event.Date, int64(user_id.(float64)))

	if err == nil {
		c.JSON(200, gin.H{})
	} else {
		c.JSON(500, gin.H{"error": true, "message": err.Error()})
	}

}
