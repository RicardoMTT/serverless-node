const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const axios = require('axios');

const dynamodb = new AWS.DynamoDB.DocumentClient();


function mapCharacterAttributes(originalData) {
    return {
        nombre: originalData.name,
        altura: originalData.height,
        masa: originalData.mass,
        colorDeCabello: originalData.hair_color,
        colorDePiel: originalData.skin_color,
        colorDeOjos: originalData.eye_color,
        anioNacimiento: originalData.birth_year,
        genero: originalData.gender,
        planetaNatal: originalData.homeworld,
        peliculas: originalData.films,
        especies: originalData.species,
        vehiculos: originalData.vehicles,
        navesEstelares: originalData.starships,
        fechaCreacion: originalData.created,
        fechaEdicion: originalData.edited,
        url: originalData.url
    };
}


const fetchAndSaveCharacter = async (event) => {
    
    try {
        const swapiUrl = 'https://swapi.py4e.com/api/people/4/';

        const { data } = await axios.get(swapiUrl);

        const id = v4();

        const dataTransformed = mapCharacterAttributes(data);
                 
        const newPeople = {
            id,
           ...dataTransformed
        }

        const params = {
            TableName: 'PeopleTable',
            Item: newPeople,
          };

        
        await dynamodb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(dataTransformed),
        };
    } catch (error) {
        console.error('Error al obtener el personaje:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ mensaje: 'Error al obtener el personaje' }),
        };
    }
    
};
module.exports = {
    fetchAndSaveCharacter,
    mapCharacterAttributes
};