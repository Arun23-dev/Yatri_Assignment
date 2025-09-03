"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCustomerResponseDto = exports.ApiResponseDto = exports.PaginatedResponseDto = exports.ChargingSessionResponseDto = exports.TransactionResponseDto = exports.WalletResponseDto = exports.BikeAssignmentResponseDto = exports.BikeResponseDto = exports.CustomerAuthResponseDto = exports.AdminAuthResponseDto = exports.CustomerResponseDto = exports.AdminResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AdminResponseDto {
    id;
    firstName;
    lastName;
    email;
    createdAt;
    updatedAt;
}
exports.AdminResponseDto = AdminResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin unique identifier',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], AdminResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin first name',
        example: 'John'
    }),
    __metadata("design:type", String)
], AdminResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin last name',
        example: 'Admin'
    }),
    __metadata("design:type", String)
], AdminResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin email address',
        example: 'admin@yatritask.com'
    }),
    __metadata("design:type", String)
], AdminResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin creation timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", Date)
], AdminResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin last update timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", Date)
], AdminResponseDto.prototype, "updatedAt", void 0);
class CustomerResponseDto {
    id;
    firstName;
    lastName;
    email;
    phone;
    address;
    createdAt;
    updatedAt;
}
exports.CustomerResponseDto = CustomerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer unique identifier',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], CustomerResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer first name',
        example: 'Jane'
    }),
    __metadata("design:type", String)
], CustomerResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer last name',
        example: 'Doe'
    }),
    __metadata("design:type", String)
], CustomerResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer email address',
        example: 'jane.doe@example.com'
    }),
    __metadata("design:type", String)
], CustomerResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer phone number',
        example: '+1234567890',
        nullable: true
    }),
    __metadata("design:type", Object)
], CustomerResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer address',
        example: '123 Main St, City, State 12345',
        nullable: true
    }),
    __metadata("design:type", Object)
], CustomerResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer creation timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", Date)
], CustomerResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer last update timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", Date)
], CustomerResponseDto.prototype, "updatedAt", void 0);
class AdminAuthResponseDto {
    token;
    admin;
}
exports.AdminAuthResponseDto = AdminAuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], AdminAuthResponseDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin information',
        type: AdminResponseDto
    }),
    __metadata("design:type", AdminResponseDto)
], AdminAuthResponseDto.prototype, "admin", void 0);
class CustomerAuthResponseDto {
    token;
    customer;
}
exports.CustomerAuthResponseDto = CustomerAuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], CustomerAuthResponseDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer information',
        type: CustomerResponseDto
    }),
    __metadata("design:type", CustomerResponseDto)
], CustomerAuthResponseDto.prototype, "customer", void 0);
class BikeResponseDto {
    id;
    serialNumber;
    model;
    status;
    createdAt;
    updatedAt;
}
exports.BikeResponseDto = BikeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike unique identifier',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], BikeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike serial number',
        example: 'BIKE001'
    }),
    __metadata("design:type", String)
], BikeResponseDto.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike model',
        example: 'Mountain Bike Pro'
    }),
    __metadata("design:type", String)
], BikeResponseDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike status',
        enum: ['AVAILABLE', 'ASSIGNED', 'MAINTENANCE', 'RETIRED'],
        example: 'AVAILABLE'
    }),
    __metadata("design:type", String)
], BikeResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike creation timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", Date)
], BikeResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike last update timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", Date)
], BikeResponseDto.prototype, "updatedAt", void 0);
class BikeAssignmentResponseDto {
    id;
    bike;
    customer;
    admin;
    assignedAt;
    returnedAt;
}
exports.BikeAssignmentResponseDto = BikeAssignmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assignment unique identifier',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], BikeAssignmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike information',
        type: BikeResponseDto
    }),
    __metadata("design:type", BikeResponseDto)
], BikeAssignmentResponseDto.prototype, "bike", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer information',
        type: CustomerResponseDto
    }),
    __metadata("design:type", CustomerResponseDto)
], BikeAssignmentResponseDto.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin who assigned the bike',
        type: AdminResponseDto
    }),
    __metadata("design:type", AdminResponseDto)
], BikeAssignmentResponseDto.prototype, "admin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assignment timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", Date)
], BikeAssignmentResponseDto.prototype, "assignedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Return timestamp (null if not returned)',
        example: '2024-01-09T17:30:00.000Z',
        nullable: true
    }),
    __metadata("design:type", Object)
], BikeAssignmentResponseDto.prototype, "returnedAt", void 0);
class WalletResponseDto {
    walletId;
    customerId;
    customerName;
    customerEmail;
    balance;
}
exports.WalletResponseDto = WalletResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Wallet unique identifier',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], WalletResponseDto.prototype, "walletId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer ID associated with the wallet',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], WalletResponseDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer name',
        example: 'Jane Doe'
    }),
    __metadata("design:type", String)
], WalletResponseDto.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer email',
        example: 'jane.doe@example.com'
    }),
    __metadata("design:type", String)
], WalletResponseDto.prototype, "customerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current wallet balance',
        example: 100.50
    }),
    __metadata("design:type", Number)
], WalletResponseDto.prototype, "balance", void 0);
class TransactionResponseDto {
    id;
    customerId;
    amount;
    type;
    description;
    timestamp;
}
exports.TransactionResponseDto = TransactionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transaction unique identifier',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer ID associated with the transaction',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transaction amount',
        example: 10.50
    }),
    __metadata("design:type", Number)
], TransactionResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transaction type',
        enum: ['CREDIT', 'DEBIT'],
        example: 'DEBIT'
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transaction description',
        example: 'Bike rental charge'
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transaction timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", Date)
], TransactionResponseDto.prototype, "timestamp", void 0);
class ChargingSessionResponseDto {
    id;
    customerId;
    bikeId;
    amount;
    startTime;
    endTime;
    status;
}
exports.ChargingSessionResponseDto = ChargingSessionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session unique identifier',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], ChargingSessionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer ID associated with the charging session',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], ChargingSessionResponseDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike ID associated with the charging session',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], ChargingSessionResponseDto.prototype, "bikeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session amount',
        example: 5.25
    }),
    __metadata("design:type", Number)
], ChargingSessionResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session start time',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", Date)
], ChargingSessionResponseDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session end time (null if ongoing)',
        example: '2024-01-09T17:30:00.000Z',
        nullable: true
    }),
    __metadata("design:type", Object)
], ChargingSessionResponseDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session status',
        enum: ['ACTIVE', 'COMPLETED', 'CANCELLED'],
        example: 'COMPLETED'
    }),
    __metadata("design:type", String)
], ChargingSessionResponseDto.prototype, "status", void 0);
class PaginatedResponseDto {
    items;
    total;
    page;
    limit;
    totalPages;
    hasNext;
    hasPrev;
}
exports.PaginatedResponseDto = PaginatedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of items',
        isArray: true
    }),
    __metadata("design:type", Array)
], PaginatedResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of items',
        example: 100
    }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current page number',
        example: 1
    }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of items per page',
        example: 10
    }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of pages',
        example: 10
    }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether there is a next page',
        example: true
    }),
    __metadata("design:type", Boolean)
], PaginatedResponseDto.prototype, "hasNext", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether there is a previous page',
        example: false
    }),
    __metadata("design:type", Boolean)
], PaginatedResponseDto.prototype, "hasPrev", void 0);
class ApiResponseDto {
    message;
    data;
    statusCode;
    timestamp;
}
exports.ApiResponseDto = ApiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Response message',
        example: 'Operation completed successfully'
    }),
    __metadata("design:type", String)
], ApiResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Response data',
        required: false
    }),
    __metadata("design:type", Object)
], ApiResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Response status code',
        example: 200
    }),
    __metadata("design:type", Number)
], ApiResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Response timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", Date)
], ApiResponseDto.prototype, "timestamp", void 0);
class DeleteCustomerResponseDto {
    message;
    customerId;
    customerEmail;
    customerName;
    walletDeleted;
    walletBalance;
    walletMessage;
}
exports.DeleteCustomerResponseDto = DeleteCustomerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Response message',
        example: 'Customer deleted successfully'
    }),
    __metadata("design:type", String)
], DeleteCustomerResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer ID that was deleted',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], DeleteCustomerResponseDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer email that was deleted',
        example: 'jane.doe@example.com'
    }),
    __metadata("design:type", String)
], DeleteCustomerResponseDto.prototype, "customerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer name that was deleted',
        example: 'Jane Doe'
    }),
    __metadata("design:type", String)
], DeleteCustomerResponseDto.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether wallet was also deleted',
        example: true
    }),
    __metadata("design:type", Boolean)
], DeleteCustomerResponseDto.prototype, "walletDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Wallet balance at time of deletion',
        example: 0.00
    }),
    __metadata("design:type", Number)
], DeleteCustomerResponseDto.prototype, "walletBalance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Wallet deletion message',
        example: 'Wallet deleted successfully',
        required: false
    }),
    __metadata("design:type", String)
], DeleteCustomerResponseDto.prototype, "walletMessage", void 0);
//# sourceMappingURL=response.dto.js.map