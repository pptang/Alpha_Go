package models

import (
	"time"
	"golang.org/x/crypto/bcrypt"
	"Alpha_Go/database"
	// "Alpha_Go/constants"
	"errors"
	"log"
	"Alpha_Go/utils"
)

type User struct {
	Id        int64  `db:"id" json:"id"`
	Email string `db:"email" json:"email"`
	Password  string `db:"password" json:"password"`
	Created int64 `db:"created_at" json:"created_at"`
}

func CreateUser(email string, pwd string) (*User, string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost)
	if (err == nil) {
		if insert, insertErr := database.Dbmap.Exec(`INSERT INTO user (email, password, created_at)
										VALUES (?, ?, ?)`, email, hash, time.Now().UnixNano()); insert != nil {

			user_id, _ := insert.LastInsertId()
			newUser := &User {
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

func FindUserByEmail(email string) (*User, error) {
	var user User
	err := database.Dbmap.SelectOne(&user, "SELECT * FROM user WHERE email=?", email)
	return &user, err
}

func FindUserByEmailAndPassword(email string, pwd string) (*User, string, error) {
	user, err := FindUserByEmail(email)
	if err == nil {
		compPwdErr := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(pwd))
		if compPwdErr != nil {
			return nil, "", errors.New("password is wrong")
		} else {

			tokenString := utils.GenerateJwt(user.Id, email)

			currentUser := &User {
				Email: email,
			}
			return currentUser, tokenString, nil

		}
	} else {
		return nil, "", errors.New("user not found")
	}
}
