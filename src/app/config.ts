import { gateway as MoltinGateway } from '@moltin/sdk';

export class Config {
    static readonly clientID: string = "MH9jo6uPN2kD8ruVzlOWV7pOTu2Fj1DihgjF5V0Qm1";
    static readonly clientSecret: string = "OMkM5YxyPhC7RwnS0PG35AE5TBaRoW6dZWFT8VnL3S";

    static readonly Moltin = MoltinGateway({
        client_id: Config.clientID,
        client_secret: Config.clientSecret
    });

    constructor() {

    }
}