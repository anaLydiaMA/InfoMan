# InfoMan
### URL = https://infoman-backend.mybluemix.net
##
### 1. 
Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>POST</kbd> | */conversation/form*| Returns conversation updatable values
##### Request Body:
```
{
	"username": "name",
	"password": "pass"
}
```
##### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##
### 2. 
Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>POST</kbd> | */conversation/update*| Update specified values on conversation
##### Request Body:
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
##### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>200</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##
### 3.
Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>GET</kbd> | */conversation/questions*| Returns all the conversation available questions
##### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>200</kbd>
Failed    | <kbd>400</kbd>
##
### 4.
Method          | Path              | Description 
--------------- | ------------------| -----------
<kbd>GET</kbd> | */conversation/askWatson*| Returns Watson response to the specified question on body
##### Request Body:
```
{
  "text": "question sample?"
}
```
##### Request Status:
Issue    | Status
-------- | ---
Successful| <kbd>200</kbd>
Failed    | <kbd>400</kbd>
##
