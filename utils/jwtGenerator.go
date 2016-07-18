package utils

import (
  "time"
  "github.com/dgrijalva/jwt-go"
  "Alpha_Go/constants"
  "fmt"
)

func GenerateJwt(user_id int64, email string) (string) {
  jwtToken := jwt.New(jwt.SigningMethodHS256)

  claims := jwtToken.Claims.(jwt.MapClaims)
  claims["id"] = user_id
  claims["email"] = email
  claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

  tokenString, _ := jwtToken.SignedString(constants.MY_SIGNING_KEY)
  return tokenString
}

func GetClaimsFromTokenString(tokenString string) (map[string]interface{}, bool){
  token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
      // Don't forget to validate the alg is what you expect:
      if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
          return nil, fmt.Errorf("Something wrong")
      }
      return constants.MY_SIGNING_KEY, nil
  })

  claims, ok := token.Claims.(jwt.MapClaims);

  if ok && token.Valid {
    return claims, true
  } else {
    return nil, false
  }

}
