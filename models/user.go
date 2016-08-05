package models

import (
	"Alpha_Go/database"
	"Alpha_Go/schema"
	"Alpha_Go/utils"
	"errors"
	"log"
	"time"

	"golang.org/x/crypto/bcrypt"
)

func CreateUser(email string, pwd string) (*schema.User, string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost)
	if err == nil {
		if insert, insertErr := database.Dbmap.Exec(`INSERT INTO user (email, password, created_at)
										VALUES (?, ?, ?)`, email, hash, time.Now().UnixNano()); insert != nil {

			user_id, _ := insert.LastInsertId()
			newUser := &schema.User{
				Id:    user_id,
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

			currentUser := &schema.User{
				Id:    user.Id,
				Email: email,
			}
			return currentUser, tokenString, nil

		}
	} else {
		return nil, "", errors.New("user not found")
	}
}

func FindAllUsers() ([]schema.User, error) {
	var users []schema.User
	_, err := database.Dbmap.Select(&users, "SELECT id, email FROM user")

	if err == nil {
		return users, nil
	} else {
		return nil, err
	}
}
