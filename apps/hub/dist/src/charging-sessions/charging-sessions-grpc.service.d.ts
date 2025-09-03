import { ChargingSessionsService } from './charging-sessions.service';
export declare class ChargingSessionsGrpcService {
    private chargingSessionsService;
    constructor(chargingSessionsService: ChargingSessionsService);
    getChargingSessions(request: any): Promise<{
        sessions: {
            id: any;
            customer_id: any;
            bike_id: any;
            amount: any;
            start_time: any;
            end_time: any;
            status: any;
            created_at: any;
            updated_at: any;
            customer: {
                id: any;
                first_name: any;
                last_name: any;
                email: any;
                phone: any;
            } | null;
            bike: {
                id: any;
                serial_number: any;
                brand: any;
                model: any;
                status: any;
            } | null;
            duration_minutes: number;
            energy_consumed_kwh: number;
            cost: any;
        }[];
        total: number;
        page: number;
        limit: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
    }>;
    getChargingSession(request: any): Promise<{
        id: any;
        customer_id: any;
        bike_id: any;
        amount: any;
        start_time: any;
        end_time: any;
        status: any;
        created_at: any;
        updated_at: any;
        customer: {
            id: any;
            first_name: any;
            last_name: any;
            email: any;
            phone: any;
        } | null;
        bike: {
            id: any;
            serial_number: any;
            brand: any;
            model: any;
            status: any;
        } | null;
        duration_minutes: number;
        energy_consumed_kwh: number;
        cost: any;
    }>;
    getChargingSessionsByCustomer(request: any): Promise<{
        sessions: {
            id: any;
            customer_id: any;
            bike_id: any;
            amount: any;
            start_time: any;
            end_time: any;
            status: any;
            created_at: any;
            updated_at: any;
            customer: {
                id: any;
                first_name: any;
                last_name: any;
                email: any;
                phone: any;
            } | null;
            bike: {
                id: any;
                serial_number: any;
                brand: any;
                model: any;
                status: any;
            } | null;
            duration_minutes: number;
            energy_consumed_kwh: number;
            cost: any;
        }[];
        total: number;
        page: number;
        limit: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
    }>;
    getChargingSessionsByBike(request: any): Promise<{
        sessions: {
            id: any;
            customer_id: any;
            bike_id: any;
            amount: any;
            start_time: any;
            end_time: any;
            status: any;
            created_at: any;
            updated_at: any;
            customer: {
                id: any;
                first_name: any;
                last_name: any;
                email: any;
                phone: any;
            } | null;
            bike: {
                id: any;
                serial_number: any;
                brand: any;
                model: any;
                status: any;
            } | null;
            duration_minutes: number;
            energy_consumed_kwh: number;
            cost: any;
        }[];
        total: number;
        page: number;
        limit: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
    }>;
    getChargingSessionStats(request: any): Promise<{
        total_sessions: number;
        active_sessions: number;
        completed_sessions: number;
        cancelled_sessions: number;
        total_revenue: number;
        average_amount: number;
        average_duration_minutes: number;
        period: string;
    }>;
    getRevenueAnalytics(request: any): Promise<{
        period: string;
        group_by: string;
        data: {
            date: string;
            revenue: number;
        }[];
        total_revenue: number;
    }>;
    getCurrentActiveSession(request: any): Promise<{
        id: any;
        customer_id: any;
        bike_id: any;
        amount: any;
        start_time: any;
        end_time: any;
        status: any;
        created_at: any;
        updated_at: any;
        customer: {
            id: any;
            first_name: any;
            last_name: any;
            email: any;
            phone: any;
        } | null;
        bike: {
            id: any;
            serial_number: any;
            brand: any;
            model: any;
            status: any;
        } | null;
        duration_minutes: number;
        energy_consumed_kwh: number;
        cost: any;
    }>;
    private mapChargingSession;
    private calculateEnergyConsumption;
}
