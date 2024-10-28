const axios = require('axios');
const AWS = require('aws-sdk');
const { v4 } = require('uuid');
const { fetchAndSaveCharacter } = require('./transformData');

jest.mock('axios');
jest.mock('uuid');
jest.mock('aws-sdk', () => ({
    DynamoDB: {
        DocumentClient: jest.fn(() => ({
            put: jest.fn(() => ({
                promise: jest.fn()
            }))
        }))
    }
}));

describe('Star Wars Character Service', () => {
    let mockDocumentClient;
    let mockPromise;
    
    beforeEach(() => {
        jest.clearAllMocks();
        
        v4.mockReturnValue('mock-uuid');
        
        mockPromise = jest.fn().mockResolvedValue({});
        mockDocumentClient = new AWS.DynamoDB.DocumentClient();
        mockDocumentClient.put().promise = mockPromise;
    });

    describe('fetchAndSaveCharacter', () => {
        test('Should get and save a characther successfully', async () => {
            // Arrange
            const mockApiResponse = {
                data: {
                    name: 'Darth Vader',
                    height: '202',
                    mass: '136',
                    hair_color: 'none',
                    skin_color: 'white',
                    eye_color: 'yellow',
                    birth_year: '41.9BBY',
                    gender: 'male',
                    homeworld: 'https://swapi.py4e.com/api/planets/1/',
                    films: ['https://swapi.py4e.com/api/films/1/'],
                    species: ['https://swapi.py4e.com/api/species/1/'],
                    vehicles: ['https://swapi.py4e.com/api/vehicles/1/'],
                    starships: ['https://swapi.py4e.com/api/starships/1/'],
                    created: '2014-12-10T15:18:20.704000Z',
                    edited: '2014-12-20T21:17:50.313000Z',
                    url: 'https://swapi.py4e.com/api/people/4/'
                }
            };

            axios.get.mockResolvedValue(mockApiResponse);

            // Act
            const result = await fetchAndSaveCharacter();

            // Assert
            expect(result.statusCode).toBe(200);
            
        });
    });

    describe('mapCharacterAttributes', () => {
        test('Should map attributes of characters successfully', () => {
            // Arrange
            const originalData = {
                name: 'Luke Skywalker',
                height: '172',
                mass: '77',
                hair_color: 'blond',
                skin_color: 'fair',
                eye_color: 'blue',
                birth_year: '19BBY',
                gender: 'male',
                homeworld: 'https://swapi.py4e.com/api/planets/1/',
                films: ['https://swapi.py4e.com/api/films/1/'],
                species: ['https://swapi.py4e.com/api/species/1/'],
                vehicles: ['https://swapi.py4e.com/api/vehicles/1/'],
                starships: ['https://swapi.py4e.com/api/starships/1/'],
                created: '2014-12-09T13:50:51.644000Z',
                edited: '2014-12-20T21:17:56.891000Z',
                url: 'https://swapi.py4e.com/api/people/1/'
            };

            // Act
            const { mapCharacterAttributes } = require('./transformData');
            const result = mapCharacterAttributes(originalData);

            // Assert
            expect(result).toEqual({
                nombre: 'Luke Skywalker',
                altura: '172',
                masa: '77',
                colorDeCabello: 'blond',
                colorDePiel: 'fair',
                colorDeOjos: 'blue',
                anioNacimiento: '19BBY',
                genero: 'male',
                planetaNatal: 'https://swapi.py4e.com/api/planets/1/',
                peliculas: ['https://swapi.py4e.com/api/films/1/'],
                especies: ['https://swapi.py4e.com/api/species/1/'],
                vehiculos: ['https://swapi.py4e.com/api/vehicles/1/'],
                navesEstelares: ['https://swapi.py4e.com/api/starships/1/'],
                fechaCreacion: '2014-12-09T13:50:51.644000Z',
                fechaEdicion: '2014-12-20T21:17:56.891000Z',
                url: 'https://swapi.py4e.com/api/people/1/'
            });
        });
    });

});