import {
    APIGatewayAuthorizerResult,
    APIGatewayTokenAuthorizerEvent,
    APIGatewayTokenAuthorizerHandler,
} from 'aws-lambda';
import { Logger } from '../../../shared/utility/logger';
import { config } from '../configs/config';

export const basicAuthorizer: APIGatewayTokenAuthorizerHandler = async (
    event: APIGatewayTokenAuthorizerEvent,
    _context,
    cb
) => {
    Logger.logEvent(event);

    if (event?.type !== 'TOKEN') {
        cb('Unauthorized')
    }

    try {
        console.log('user', config.getCredByUser('valakar'));

        const { authorizationToken, methodArn } = event;
        const encodedCred = authorizationToken.split(' ')[1];
        const decodedCred = Buffer.from(encodedCred, 'base64');
        const [username, password] = decodedCred.toString('utf-8').split(':');
        const userCred = config.getCredByUser(username);
        const effect = password == userCred ? 'Allow' : 'Deny';

        return generatePolicy(encodedCred, methodArn, effect);
    } catch (error) {
        cb(`Unauthorized: ${error}`)
    }
};

const generatePolicy = (
    principalId: string,
    resource: string,
    effect: 'Allow' | 'Deny'
): APIGatewayAuthorizerResult => {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource
            }]
        }
    };
}
