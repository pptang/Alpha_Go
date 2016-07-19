package controllers

import (
  "Alpha_Go/models"
	"github.com/gin-gonic/gin"
	"strconv"
	"log"
)

func NewOutingEvent(c *gin.Context) {
	var event models.Event
	c.Bind(&event)
	//TODO: Get POST body
	user_id, getErr := c.Get("user_id")



	if !getErr {
		event.HolderId, _ = strconv.ParseInt(user_id.(string), 10, 64)
	}
	log.Print("userid:")
	log.Println(user_id)
log.Print("event title:")
	log.Println(event.Title)
	log.Print("event.Description:")
		log.Println(event.Description)
		log.Print("event.PlaceOptions:")
			log.Println(event.PlaceOptions)
			log.Print("event.Date:")
				log.Println(event.Date)
	log.Println(event.HolderId)

	// title := c.PostForm("title")
	// desc := c.PostForm("desc")
	// date := c.PostForm("date")
	// place_options := c.PostForm("place_options")
	//
	// int64Date, _ := strconv.ParseInt(date, 10, 64)

	err := models.CreateEvent(event.Title, event.Description,
													event.PlaceOptions, event.Date, event.HolderId)

	if err == nil {
		c.JSON(200, gin.H{})
	} else {
		c.JSON(500, gin.H{"error": true, "message": err.Error()})
	}

}
