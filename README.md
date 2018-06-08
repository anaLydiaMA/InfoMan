# InfoMan
## URL = https://infoman-backend.mybluemix.net
### Available Requests:
1. [Get Form](#get_form)
2. [Update Form](#update_form)
3. [All Questions](#all_questions)
4. [Ask Watson](#ask_watson)
5. [Authentication](#authentication)
6. [User Creation](#user_creation)
7. [User Removal](#user_removal)
8. [All Users](#all_users)

<a name="get_form"></a>
### 1. Get Form: 

Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>POST</kbd> | */conversation/form*| Returns conversation updatable values
#### Request Body:
```
{
	"username": "name",
	"password": "pass"
}
```
#### Response Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##

<a name="update_form"></a>
### 2. Update Form
Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>POST</kbd> | */conversation/update*| Update specified values on conversation
#### Request Body:
```
{
  "username": "name",
  "password": "pass",
  "area": "new area",
  "variables": 
  [
    { 
      "field":"new field name",
      "currentValue": "new field value"
    },
    ...
  ]
}
```
#### Response Status:
Issue    | Status
-------- | ---
Successful| <kbd>200</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##
<a name="all_questions"></a>
### 3. All Questions
Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>GET</kbd> | */conversation/questions*| Returns all the conversation available questions
#### Response Status:
Issue    | Status
-------- | ---
Successful| <kbd>200</kbd>
Failed    | <kbd>400</kbd>
##
<a name="ask_watson"></a>
### 4. Ask Watson
Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>POST</kbd> | */conversation/askWatson*| Returns Watson response to the specified question on body
#### Request Body:
```
{
  "text": "question sample?"
}
```
#### Response Status:
Issue    | Status
-------- | ---
Successful| <kbd>200</kbd>
Failed    | <kbd>400</kbd>
##
<a name="authentication"></a>
### 5. Authentication
Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>POST</kbd> | */user/login*| Authenticates a user on Database
#### Request Body:
```
{
	"username": "name",
	"password": "pass"
}
```
#### Response Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Unauthorized | <kbd>403</kbd>
##
<a name="user_creation"></a>
### 6. User Creation
Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>POST</kbd> | */user/create*| Creates a user on Database
#### Request Body:
```
{
	"username": "admin name",
	"password": "admin pass",
	"new_username: "new user's username",
	"new_password": "new user's password"
}
```
#### Response Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##
<a name="user_removal"></a>
### 7. User Removal
Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>POST</kbd> | */user/delete/{id}*| Deletes a user on Database
#### Request on Route:
<kbd>id</kbd> : Username to delete from database
#### Request Body:
```
{
	"username": "name",
	"password": "pass"
}
```
#### Response Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##
<a name="all_users"></a>
### 8. All Users
Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>POST</kbd> | */user/list*| Returns the list of usernames registered on Database
#### Request Body:
```
{
	"username": "name",
	"password": "pass"
}
```
#### Response Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
