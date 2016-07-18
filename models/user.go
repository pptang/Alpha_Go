package models

import (
	"time"
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"Alpha_Go/database"
	"Alpha_Go/constants"
	"errors"
)

type User struct {
	Id        int64  `db:"id" json:"id"`
	Email string `db:"email" json:"email"`
	Password  string `db:"password" json:"password"`
}

func CreateUser(email string, pwd string) (*User, string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost)
	if (err == nil) {
		if insert, _ := database.Dbmap.Exec(`INSERT INTO user (email, password) VALUES (?, ?)`, email, hash); insert != nil {
			user_id, _ := insert.LastInsertId()
			newUser := &User {
				Id: user_id,
				Email: email,
			}
			jwtToken := jwt.New(jwt.SigningMethodHS256)

			claims := jwtToken.Claims.(jwt.MapClaims)
			claims["admin"] = true
			claims["email"] = email
			claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

			tokenString, _ := jwtToken.SignedString(constants.MY_SIGNING_KEY)

			return newUser, tokenString, nil

		} else {
			return nil, "", errors.New("Insert User Error")
		}
	} else {
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

			jwtToken := jwt.New(jwt.SigningMethodHS256)

			claims := jwtToken.Claims.(jwt.MapClaims)
			claims["admin"] = true
			claims["email"] = email
			claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

			tokenString, _ := jwtToken.SignedString(constants.MY_SIGNING_KEY)
			currentUser := &User {
				Email: email,
			}
			return currentUser, tokenString, nil

		}
	} else {
		return nil, "", errors.New("user not found")
	}
}
