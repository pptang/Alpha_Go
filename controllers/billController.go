package controllers

import (
  "Alpha_Go/models"
  "Alpha_Go/schema"
  "github.com/gin-gonic/gin"
)

func SendBills(c *gin.Context) {

  var bills schema.BillRequest
  c.BindJSON(&bills)

  err := models.CreateBills(bills);

  if err == nil {
    c.JSON(200, gin.H{})
  } else {
    c.JSON(500, gin.H{"error": true, "message": err.Error()})
  }
}
