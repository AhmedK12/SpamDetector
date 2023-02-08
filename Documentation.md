#Radon
## Project - CodingTest/ Spam





I have created two table in databse




### Models

- User Model
```yml
{
  name: {string, mandatory},
  email: {string,optional, valid email},
  phone: {string, mandatory, unique, valid Indian mobile number}, 
  password: {string, mandatory, minLen 8, maxLen 15}, // encrypted password
  }

```



- Product Model
```yaml
{ 
  name: {string},
  phone: {string, mandatory, unique, valid Indian mobile number}, 
  contactOf: {string, mandatory, unique, valid Indian mobile number}, // this paritcular number belongs to whom contactlist
  spam: {boolean,default : false},
}
```




## User APIs 
### POST /register
- A user has to register with at least name and phone number, along with a password, before
using. He can optionally add an email address.
Only one user can register on the app with a particular phone number.
A user needs to be logged in to do anything; there is no public access to anything.
```yaml
{
    "status": false,
    "message": "User Registered SuccessFully!",
    "data": {
        "id": 3,
        "email": "b170175@nitsikkim.ac.in",
        "phone": "9134256935",
        "name": "Alfanjo chekrovick",
        "password": "$2b$10$V5oSeFTcyOaV0jujJPZnfec1z4o95/A5eqRW9OSrWVVKJgQUIjz46",
        "updatedAt": "2022-07-28T04:24:30.469Z",
        "createdAt": "2022-07-28T04:24:30.469Z"
    }
}
```

### POST/login

becouse email is not mendtory that's why i use phone and password as  login creadentials

it take input from request body phone and password

response 

```yml
{
    "status": true,
    "message": "login successfully",
    "data": {
        "id": "1",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2NTg5ODI1NDMsImV4cCI6MTY1OTI0MTc0M30.20vWOzOuCnLV-b_nCt_4rCARS7XdDcnvUCPM9bZmg0c"
    }
}

```

### POST API for Spam Marking
## /spam
```yml
for this api only phone is mendatory user may give name and contacOf

it's responce should looklike this


{
    "status": true,
    "message": "Marked Successfully"
}


```


### GET API for Get user Number, passing as params
### /numbers/:phone

```yml
for this api we take inmput from params

response should looklike this

{
    "status": true,
    "data": [{
        "name": "Furkan Ahmed",
        "email": "b170185@nitsikkim.ac.in",
        "phone": "9134256934",
        "spam": null
    }]
}

```

### GET API
### /numbersByName  and search query name 
  
for this api we take input from query params

```yml
{
    "status": true,
    "data": [
        {
            "name": "Kajol Shrivastava",
            "phone": "7495925997",
            "spam": true
        },
        {
            "name": "Subham Sidhartha Mahapatra",
            "phone": "6962998706",
            "spam": true
        },
        {
            "name": "Amit Mazumder",
            "phone": "9345563983",
            "spam": true
        },
        {
            "name": "Shubham Dahifale",
            "phone": "7468169725",
            "spam": true
        },
        {
            "name": "Aqueeb Hussain",
            "phone": "7522310669",
            "spam": true
        },
        {
            "name": "Revanth V",
            "phone": "9284804626",
            "spam": true
        },
        {
            "name": "Debayati Sarkar",
            "phone": "7904791559",
            "spam": true
        },
        {
            "name": "Arjun Singh",
            "phone": "8923449856",
            "spam": true
        },
        {
            "name": "Biswajit Ghosh",
            "phone": "9046685526",
            "spam": true
        },
        {
            "name": "Anand Sharma",
            "phone": "9433570234",
            "spam": true
        },
        {
            "name": "Anjali Kothari",
            "phone": "9270540042",
            "spam": true
        },
        {
            "name": "AKASH TIWARI",
            "phone": "9538994960",
            "spam": true
        },
        {
            "name": "Bhawana Hemane",
            "phone": "9037632148",
            "spam": true
        },
        {
            "name": "Jai Sharma",
            "phone": "7710369873",
            "spam": true
        },
        {
            "name": "GUDDATI LOK SANTOSH KUMAR",
            "phone": "9277848835",
            "spam": true
        },
        {
            "name": "Kamaran Ahmed",
            "phone": "9542051871",
            "spam": true
        },
        {
            "name": "Anugya Bansal",
            "phone": "8691741554",
            "spam": true
        },
        {
            "name": "Harsh Jain",
            "phone": "6068975063",
            "spam": true
        },
        {
            "name": "Anand Sharma",
            "phone": "6943125734",
            "spam": true
        },
        {
            "name": "kamaran",
            "phone": "7602256374",
            "spam": true
        }
    ]
}



```



