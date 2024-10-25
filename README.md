

# SWAPI DynamoDB Integration


## Introducción

Este servicio serverless permite obtener datos de personajes de Star Wars desde SWAPI (Star Wars API) y almacenarlos en DynamoDB.

### Flujo

- Obtiene datos de personajes desde SWAPI
- Transforma los datos al español
- TAlmacena la información en DynamoDB
- Genera IDs únicos para cada registro

### Instalación

```
npm install
```

### Desplegar nuevos cambios

```
serverless deploy
```

### Endpoints

POST:Endpoint para obtener los datos de personajes de SWAPI , realizar el mapeo al español y guardarlo en una tabla de DynamoDB
```
https://uqokm7mm2d.execute-api.us-east-1.amazonaws.com/fetchAndSaveCharacter
```

GET:Endpoint para obtener los datos almacenados en una tabla de DynamoDB
```
https://uqokm7mm2d.execute-api.us-east-1.amazonaws.com/getCharacters
```
