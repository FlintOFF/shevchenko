### DEMO server

http://shevchenko.38.242.138.64.sslip.io/api

### Instruction for deploy

https://www.pedroalonso.net/blog/hosting-nodejs-in-dokku


## Shevchenko

Before start service install dependencies first:
```bash
yarn install
```

To run shevchenko-service locally use command
```bash
yarn start
```

Note: you can change a `PORT` by modifying `start` command in `packge.json`

###Usage example:

- Call next http url:

```
POST localhost:3002/api
```

- Specify payload data:

```json
type inflect = inNominative | inGenitive | inDative | inAccusative | inAblative | inLocative | inVocative;

[{
    "inflect":"inAccusative",
    "gender": "male",
    "firstName": "Тарас",
    "middleName": "Григорович",
    "lastName": "Шевченко"
},{
    "inflect":"inDative",
    "gender": "male",
    "firstName": "Тарас",
    "middleName": "Григорович",
    "lastName": "Шевченко"
}]
```

- Response:

```json
[
    {
        "gender": "male",
        "firstName": "Тараса",
        "middleName": "Григоровича",
        "lastName": "Шевченка"
    },
    {
        "gender": "male",
        "firstName": "Тарасу",
        "middleName": "Григоровичу",
        "lastName": "Шевченку"
    }
]
```
