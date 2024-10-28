

# SWAPI DynamoDB Integration


## Introducción

Este servicio serverless permite obtener datos de personajes de Star Wars desde SWAPI (Star Wars API) y almacenarlos en DynamoDB.

### Flujo

- Obtiene datos de personajes desde SWAPI
- Transforma los datos al español
- Almacena la información en DynamoDB
- Genera IDs únicos para cada registro

### Instalación

```
npm install
```



### Pruebas unitarias

```
npm run test
```

### Desplegar nuevos cambios

```
serverless deploy
```

### Postman

[Ver colección en Postman](https://prueba-9731.postman.co/workspace/54439b17-c3a4-4ca1-976e-9676ebd89cc5/collection/19277596-b2166a13-dd5e-4654-9829-93994f3a4355)

### Endpoints

POST:Endpoint para obtener los datos de personajes de SWAPI , realizar el mapeo al español y guardarlo en una tabla de DynamoDB
```
https://uqokm7mm2d.execute-api.us-east-1.amazonaws.com/fetchAndSaveCharacter
```

GET:Endpoint para obtener los datos almacenados en una tabla de DynamoDB
```
https://uqokm7mm2d.execute-api.us-east-1.amazonaws.com/getCharacters
```
