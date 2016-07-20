package models

import (
	"time"
	"golang.org/x/crypto/bcrypt"
	"Alpha_Go/database"
	"Alpha_Go/schema"
	"errors"
	"log"
	"Alpha_Go/utils"
)

func CreateUser(email string, pwd string) (*schema.User, string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost)
	if (err == nil) {
		if insert, insertErr := database.Dbmap.Exec(`INSERT INTO user (email, password, created_at)
										VALUES (?, ?, ?)`, email, hash, time.Now().UnixNano()); insert != nil {

			user_id, _ := insert.LastInsertId()
			newUser := &schema.User {
				Id: user_id,
				Email: email,
			}

			tokenString := utils.GenerateJwt(user_id, email)

			return newUser, tokenString, nil

		} else {
			log.Println(insertErr)
			return nil, "", errors.New("Insert User Error")
		}
	} else {
		log.Println(err)
		return nil, "", errors.New("Internal Error")
	}
}

func FindUserByEmail(email string) (*schema.User, error) {
	var user schema.User
	err := database.Dbmap.SelectOne(&user, "SELECT * FROM user WHERE email=?", email)
	return &user, err
}

func FindUserByEmailAndPassword(email string, pwd string) (*schema.User, string, error) {
	user, err := FindUserByEmail(email)
	if err == nil {
		compPwdErr := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(pwd))
		if compPwdErr != nil {
			return nil, "", errors.New("password is wrong")
		} else {

			tokenString := utils.GenerateJwt(user.Id, email)

			currentUser := &schema.User {
				Email: email,
			}
			return currentUser, tokenString, nil

		}
	} else {
		return nil, "", errors.New("user not found")
	}
}
