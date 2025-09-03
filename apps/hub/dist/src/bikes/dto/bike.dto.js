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
exports.SearchBikesDto = exports.ReturnBikeDto = exports.AssignBikeDto = exports.UpdateBikeStatusDto = exports.CreateBikeDto = exports.BikeStatus = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var BikeStatus;
(function (BikeStatus) {
    BikeStatus["AVAILABLE"] = "AVAILABLE";
    BikeStatus["ASSIGNED"] = "ASSIGNED";
    BikeStatus["MAINTENANCE"] = "MAINTENANCE";
    BikeStatus["RETIRED"] = "RETIRED";
})(BikeStatus || (exports.BikeStatus = BikeStatus = {}));
class CreateBikeDto {
    serialNumber;
    brand;
    model;
    status;
}
exports.CreateBikeDto = CreateBikeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike serial number (required, must be unique)',
        example: 'BIKE001',
        minLength: 3,
        maxLength: 20,
        pattern: '^[A-Z0-9]+$'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Serial number is required' }),
    (0, class_validator_1.IsString)({ message: 'Serial number must be a string' }),
    __metadata("design:type", String)
], CreateBikeDto.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike brand name',
        example: 'Trek',
        minLength: 2,
        maxLength: 50
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Brand is required' }),
    (0, class_validator_1.IsString)({ message: 'Brand must be a string' }),
    __metadata("design:type", String)
], CreateBikeDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike model name',
        example: 'Mountain Bike Pro',
        minLength: 2,
        maxLength: 100
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Model is required' }),
    (0, class_validator_1.IsString)({ message: 'Model must be a string' }),
    __metadata("design:type", String)
], CreateBikeDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike status (optional, defaults to AVAILABLE)',
        enum: BikeStatus,
        enumName: 'BikeStatus',
        default: BikeStatus.AVAILABLE,
        example: BikeStatus.AVAILABLE,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(BikeStatus, { message: 'Status must be one of: AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED' }),
    __metadata("design:type", String)
], CreateBikeDto.prototype, "status", void 0);
class UpdateBikeStatusDto {
    status;
}
exports.UpdateBikeStatusDto = UpdateBikeStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New bike status',
        enum: BikeStatus,
        enumName: 'BikeStatus',
        example: BikeStatus.AVAILABLE
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Status is required' }),
    (0, class_validator_1.IsEnum)(BikeStatus, { message: 'Status must be one of: AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED' }),
    __metadata("design:type", String)
], UpdateBikeStatusDto.prototype, "status", void 0);
class AssignBikeDto {
    bikeId;
    customerId;
}
exports.AssignBikeDto = AssignBikeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike ID to assign',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Bike ID is required' }),
    (0, class_validator_1.IsString)({ message: 'Bike ID must be a string' }),
    __metadata("design:type", String)
], AssignBikeDto.prototype, "bikeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer ID to assign the bike to',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Customer ID is required' }),
    (0, class_validator_1.IsString)({ message: 'Customer ID must be a string' }),
    __metadata("design:type", String)
], AssignBikeDto.prototype, "customerId", void 0);
class ReturnBikeDto {
    bikeId;
    customerId;
}
exports.ReturnBikeDto = ReturnBikeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike ID to return',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Bike ID is required' }),
    (0, class_validator_1.IsString)({ message: 'Bike ID must be a string' }),
    __metadata("design:type", String)
], ReturnBikeDto.prototype, "bikeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer ID returning the bike',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Customer ID is required' }),
    (0, class_validator_1.IsString)({ message: 'Customer ID must be a string' }),
    __metadata("design:type", String)
], ReturnBikeDto.prototype, "customerId", void 0);
class SearchBikesDto {
    q;
    status;
    page;
    limit;
}
exports.SearchBikesDto = SearchBikesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search query (bike brand, model, or serial number)',
        example: 'Trek',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Search query must be a string' }),
    __metadata("design:type", String)
], SearchBikesDto.prototype, "q", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by bike status',
        enum: BikeStatus,
        enumName: 'BikeStatus',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(BikeStatus, { message: 'Status must be one of: AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED' }),
    __metadata("design:type", String)
], SearchBikesDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page number',
        example: 1,
        default: 1,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchBikesDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Items per page',
        example: 10,
        default: 10,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchBikesDto.prototype, "limit", void 0);
//# sourceMappingURL=bike.dto.js.map