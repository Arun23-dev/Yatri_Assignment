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
exports.GetTransactionsQueryDto = exports.AddFundsAuthenticatedDto = exports.AddFundsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class AddFundsDto {
    userId;
    amount;
    paymentMethod;
    reference;
    description;
}
exports.AddFundsDto = AddFundsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID of the customer',
        example: 'user123',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'User ID is required' }),
    (0, class_validator_1.IsString)({ message: 'User ID must be a string' }),
    __metadata("design:type", String)
], AddFundsDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amount to add to wallet',
        example: 100.50,
        minimum: 0.01,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Amount is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Amount must be a number' }),
    (0, class_validator_1.Min)(0.01, { message: 'Amount must be greater than zero' }),
    __metadata("design:type", Number)
], AddFundsDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment method used (e.g., credit_card, bank_transfer, cash)',
        example: 'credit_card',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Payment method is required' }),
    (0, class_validator_1.IsString)({ message: 'Payment method must be a string' }),
    __metadata("design:type", String)
], AddFundsDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional reference for the transaction',
        example: 'bank_transfer_12345',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Reference must be a string' }),
    __metadata("design:type", String)
], AddFundsDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional description for the transaction',
        example: 'Monthly top-up',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    __metadata("design:type", String)
], AddFundsDto.prototype, "description", void 0);
class AddFundsAuthenticatedDto {
    amount;
    paymentMethod;
    reference;
    description;
}
exports.AddFundsAuthenticatedDto = AddFundsAuthenticatedDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amount to add to wallet',
        example: 100.50,
        minimum: 0.01,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Amount is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Amount must be a number' }),
    (0, class_validator_1.Min)(0.01, { message: 'Amount must be greater than zero' }),
    __metadata("design:type", Number)
], AddFundsAuthenticatedDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment method used (e.g., credit_card, bank_transfer, cash)',
        example: 'credit_card',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Payment method is required' }),
    (0, class_validator_1.IsString)({ message: 'Payment method must be a string' }),
    __metadata("design:type", String)
], AddFundsAuthenticatedDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional reference for the transaction',
        example: 'bank_transfer_12345',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Reference must be a string' }),
    __metadata("design:type", String)
], AddFundsAuthenticatedDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional description for the transaction',
        example: 'Monthly top-up',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    __metadata("design:type", String)
], AddFundsAuthenticatedDto.prototype, "description", void 0);
class GetTransactionsQueryDto {
    page;
    limit;
    type;
}
exports.GetTransactionsQueryDto = GetTransactionsQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page number for pagination',
        example: 1,
        required: false,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetTransactionsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of transactions per page',
        example: 10,
        required: false,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetTransactionsQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by transaction type (credit/debit)',
        example: 'credit',
        required: false,
        enum: ['credit', 'debit'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Type must be a string' }),
    __metadata("design:type", String)
], GetTransactionsQueryDto.prototype, "type", void 0);
//# sourceMappingURL=customer.dto.js.map