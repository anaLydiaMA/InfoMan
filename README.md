# InfoMan
## URL = https://infoman-backend.mybluemix.net
##
### Available Requests:
1. [Get Form](#get_form)
2. [Update Form](#update_form)
3. [All Questions](#all_questions)
4. [Ask Watson](#ask_watson)
5. [Authentication](#authentication)
6. [User Creation](#user_creation)
7. [User Removal](#user_removal)
8. [All Users](#all_users)

:one:

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
#### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##
:two:

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
#### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>200</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##
:three:

Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>GET</kbd> | */conversation/questions*| Returns all the conversation available questions
#### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>200</kbd>
Failed    | <kbd>400</kbd>
##
:four:

Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>POST</kbd> | */conversation/askWatson*| Returns Watson response to the specified question on body
#### Request Body:
```
{
  "text": "question sample?"
}
```
#### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>200</kbd>
Failed    | <kbd>400</kbd>
##
:five:

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
#### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Unauthorized | <kbd>403</kbd>
##
:six:

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
#### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##
:seven:

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
#### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##
:eight:

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
#### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
