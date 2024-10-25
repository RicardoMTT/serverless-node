const AWS = require('aws-sdk');
const { getCharacters } = require('./getData'); 

// Mock de AWS SDK
// Mock más específico de AWS SDK
jest.mock('aws-sdk', () => {
    const mockPromise = jest.fn();
    const mockScan = jest.fn().mockReturnThis();
    
    return {
        DynamoDB: {
            DocumentClient: jest.fn(() => ({
                scan: mockScan,
                promise: mockPromise
            }))
        }
    };
});

describe('getCharacters', () => {
    let mockDocumentClient;
    let mockPromise;
        
    beforeEach(() => {
        jest.clearAllMocks();
        
        // Obtener acceso a los mocks
        mockDocumentClient = new AWS.DynamoDB.DocumentClient();
        mockPromise = mockDocumentClient.promise;
    });

    afterEach(() => {
        // Limpiar los mocks después de cada prueba
        jest.clearAllMocks();
    });

    test('should get list of characters', async () => {
        // Arrange
        const mockCharacters = [
            { id: '1', nombre: 'Juan' },
            { id: '2', nombre: 'María' }
        ];

        // Configurar el mock para devolver los personajes
        mockPromise.mockResolvedValue({
            Items: mockCharacters
        });

        // Act
        const characters = await getCharacters();
        
        // Assert
        expect(characters.statusCode).toBe(200);
        expect(JSON.parse(characters.body)).toEqual({
            characters: mockCharacters
        });
        expect(mockDocumentClient.scan).toHaveBeenCalledWith({
            TableName: 'PeopleTable'
        });
    });

    test('should handle when the list is empty', async () => {
        // Arrange
        mockPromise.mockResolvedValue({
            Items: []
        });

        // Act
        const characters = await getCharacters();

        // Assert
        expect(characters.statusCode).toBe(200);
        expect(JSON.parse(characters.body)).toEqual({
            characters: []
        });
    });
});