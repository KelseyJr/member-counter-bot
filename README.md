# member-counter-bot

# Setup
## Create your own bot-config.json and place it in the root folder
```json
{
	"token":"",
	"prefix":"mc!",
	"status":"Online",
	"status_type":"WATCHING",
	"activity":"type mc!help",
	"default_lang": "en_US",
	"db":"mongodb://username:password@host/database",
	"save_logs": true
}
```
## Or set environment variables

`token`

`prefix`

`status`

`status_type`'

`activity`

`default_lang`

`db`

`save_logs`

```sh
npm i
npm start
```