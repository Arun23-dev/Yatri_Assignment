export declare class CreateAdminDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export declare class CreateCustomerDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
}
export declare class UpdateCustomerDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
}
