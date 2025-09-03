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
exports.PaginatedResponseDto = exports.ChargingSessionResponseDto = exports.EndChargingSessionDto = exports.StartChargingSessionDto = exports.SearchChargingSessionsDto = exports.UpdateChargingSessionDto = exports.CreateChargingSessionDto = exports.ChargingSessionStatus = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ChargingSessionStatus;
(function (ChargingSessionStatus) {
    ChargingSessionStatus["ACTIVE"] = "ACTIVE";
    ChargingSessionStatus["COMPLETED"] = "COMPLETED";
    ChargingSessionStatus["CANCELLED"] = "CANCELLED";
})(ChargingSessionStatus || (exports.ChargingSessionStatus = ChargingSessionStatus = {}));
class CreateChargingSessionDto {
    bikeId;
    amount;
    startTime;
    endTime;
    status;
}
exports.CreateChargingSessionDto = CreateChargingSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike ID for the charging session',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Bike ID is required' }),
    (0, class_validator_1.IsString)({ message: 'Bike ID must be a string' }),
    __metadata("design:type", String)
], CreateChargingSessionDto.prototype, "bikeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session amount',
        example: 5.50
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Amount is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Amount must be a number' }),
    __metadata("design:type", Number)
], CreateChargingSessionDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session start time',
        example: '2024-01-09T10:00:00Z'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Start time is required' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Start time must be a valid date string' }),
    __metadata("design:type", String)
], CreateChargingSessionDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session end time (optional)',
        example: '2024-01-09T11:30:00Z',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'End time must be a valid date string' }),
    __metadata("design:type", String)
], CreateChargingSessionDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session status',
        enum: ChargingSessionStatus,
        default: ChargingSessionStatus.ACTIVE,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ChargingSessionStatus, { message: 'Status must be one of: ACTIVE, COMPLETED, CANCELLED' }),
    __metadata("design:type", String)
], CreateChargingSessionDto.prototype, "status", void 0);
class UpdateChargingSessionDto {
    status;
    endTime;
}
exports.UpdateChargingSessionDto = UpdateChargingSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session status',
        enum: ChargingSessionStatus
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Status is required' }),
    (0, class_validator_1.IsEnum)(ChargingSessionStatus, { message: 'Status must be one of: ACTIVE, COMPLETED, CANCELLED' }),
    __metadata("design:type", String)
], UpdateChargingSessionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session end time (optional)',
        example: '2024-01-09T11:30:00Z',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'End time must be a valid date string' }),
    __metadata("design:type", String)
], UpdateChargingSessionDto.prototype, "endTime", void 0);
class SearchChargingSessionsDto {
    q;
    status;
    customerId;
    bikeId;
    startDate;
    endDate;
    page;
    limit;
}
exports.SearchChargingSessionsDto = SearchChargingSessionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search query (customer name, email, bike serial number)',
        example: 'John',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Search query must be a string' }),
    __metadata("design:type", String)
], SearchChargingSessionsDto.prototype, "q", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by charging session status',
        enum: ChargingSessionStatus,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ChargingSessionStatus, { message: 'Status must be one of: ACTIVE, COMPLETED, CANCELLED' }),
    __metadata("design:type", String)
], SearchChargingSessionsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by customer ID',
        example: '507f1f77bcf86cd799439011',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Customer ID must be a string' }),
    __metadata("design:type", String)
], SearchChargingSessionsDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by bike ID',
        example: '507f1f77bcf86cd799439011',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Bike ID must be a string' }),
    __metadata("design:type", String)
], SearchChargingSessionsDto.prototype, "bikeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date filter (ISO string)',
        example: '2024-01-01T00:00:00Z',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Start date must be a valid date string' }),
    __metadata("design:type", String)
], SearchChargingSessionsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date filter (ISO string)',
        example: '2024-01-31T23:59:59Z',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'End date must be a valid date string' }),
    __metadata("design:type", String)
], SearchChargingSessionsDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page number',
        example: 1,
        default: 1,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchChargingSessionsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Items per page',
        example: 10,
        default: 10,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchChargingSessionsDto.prototype, "limit", void 0);
class StartChargingSessionDto {
    bikeId;
    amount;
}
exports.StartChargingSessionDto = StartChargingSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike ID for the charging session',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Bike ID is required' }),
    (0, class_validator_1.IsString)({ message: 'Bike ID must be a string' }),
    __metadata("design:type", String)
], StartChargingSessionDto.prototype, "bikeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session amount',
        example: 5.50
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Amount is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Amount must be a number' }),
    __metadata("design:type", Number)
], StartChargingSessionDto.prototype, "amount", void 0);
class EndChargingSessionDto {
    endTime;
}
exports.EndChargingSessionDto = EndChargingSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging session end time (optional, defaults to current time)',
        example: '2024-01-09T11:30:00Z',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'End time must be a valid date string' }),
    __metadata("design:type", String)
], EndChargingSessionDto.prototype, "endTime", void 0);
class ChargingSessionResponseDto {
    id;
    customerId;
    bikeId;
    amount;
    startTime;
    endTime;
    status;
    createdAt;
    updatedAt;
    customer;
    bike;
}
exports.ChargingSessionResponseDto = ChargingSessionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Charging session ID' }),
    __metadata("design:type", String)
], ChargingSessionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer ID' }),
    __metadata("design:type", String)
], ChargingSessionResponseDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bike ID' }),
    __metadata("design:type", String)
], ChargingSessionResponseDto.prototype, "bikeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Charging session amount' }),
    __metadata("design:type", Number)
], ChargingSessionResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Charging session start time' }),
    __metadata("design:type", Date)
], ChargingSessionResponseDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Charging session end time' }),
    __metadata("design:type", Object)
], ChargingSessionResponseDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Charging session status' }),
    __metadata("design:type", String)
], ChargingSessionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Charging session creation time' }),
    __metadata("design:type", Date)
], ChargingSessionResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Charging session last update time' }),
    __metadata("design:type", Date)
], ChargingSessionResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer information' }),
    __metadata("design:type", Object)
], ChargingSessionResponseDto.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bike information' }),
    __metadata("design:type", Object)
], ChargingSessionResponseDto.prototype, "bike", void 0);
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
    (0, swagger_1.ApiProperty)({ description: 'List of items' }),
    __metadata("design:type", Array)
], PaginatedResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of items' }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current page number' }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Items per page' }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of pages' }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether there is a next page' }),
    __metadata("design:type", Boolean)
], PaginatedResponseDto.prototype, "hasNext", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether there is a previous page' }),
    __metadata("design:type", Boolean)
], PaginatedResponseDto.prototype, "hasPrev", void 0);
//# sourceMappingURL=charging-session.dto.js.map