# InfoMan
## API
### URL = https://infoman-backend.mybluemix.net
#### **PATH = /conversation/form**
##### **POST**  ***RETURNS CONVERSATION FORM***
```
body:
{
	"username": "name",
	"password": "pass"
}
```
Issue    | Status
-------- | ---
Successful| <kbd>201</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##
### **PATH = /conversation/update**
#### **[POST]**  UPDATES CONVERSATION FORM
```
body:
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
Issue    | Status
-------- | ---
Successful| <kbd>200</kbd>
Failed    | <kbd>400</kbd>
Unauthorized | <kbd>403</kbd>
##
### [GET] https://infoman-backend.mybluemix.net/conversation/questions
### [GET] https://infoman-backend.mybluemix.net/conversation/askWatson
