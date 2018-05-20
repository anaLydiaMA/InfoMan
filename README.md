# InfoMan
## URL = https://infoman-backend.mybluemix.net
##
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
##
:six:

Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>POST</kbd> | */user/create*| Creates a user on Database
#### Request Body:
```
{
	"username": "owner name",
	"password": "owner pass",
	"new_username: "user to create",
	"new_password": "password to create"
}
```
#### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
