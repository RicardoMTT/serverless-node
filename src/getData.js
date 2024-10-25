const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getCharacters = async(event) => {
   try {
    const result = await dynamodb.scan({
        TableName:'PeopleTable'
    }).promise()

    const personajes = result.Items || [];
    return {
        status : 200,
        body: JSON.stringify({personajes})
    }
   } catch (error) {
    console.error('error',error);
    return {
        statusCode: 500,
        body: JSON.stringify({ mensaje: 'Error al obtener los personaje' }),
    };
   }
}

module.exports = {
    getCharacters
}