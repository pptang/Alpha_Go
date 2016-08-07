package models

import (
  "Alpha_Go/database"
  "Alpha_Go/schema"
)

func CreateBills(bills schema.BillRequest) error {
  var err error

  for _, bill := range bills.Bills {

    err = database.Dbmap.Insert(&bill)

    if err != nil {
      
      return err
    }
  }

  return nil
}
