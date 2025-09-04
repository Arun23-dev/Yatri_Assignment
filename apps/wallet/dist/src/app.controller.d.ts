import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    testWalletCreation(data: any): Promise<{
        success: boolean;
        message: string;
        data: any;
        timestamp: string;
    }>;
}
