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
exports.ChangePasswordDto = exports.LogoutDto = exports.LoginCustomerDto = exports.LoginAdminDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class LoginAdminDto {
    email;
    password;
}
exports.LoginAdminDto = LoginAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin email address',
        example: 'admin@yatritask.com',
        format: 'email'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin password',
        example: 'admin123',
        minLength: 6
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "password", void 0);
class LoginCustomerDto {
    email;
    password;
}
exports.LoginCustomerDto = LoginCustomerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer email address',
        example: 'jane.doe@example.com',
        format: 'email'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    __metadata("design:type", String)
], LoginCustomerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer password',
        example: 'password123',
        minLength: 6
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    __metadata("design:type", String)
], LoginCustomerDto.prototype, "password", void 0);
class LogoutDto {
    email;
    password;
}
exports.LogoutDto = LogoutDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email address (admin or customer)',
        example: 'admin@yatritask.com',
        format: 'email'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    __metadata("design:type", String)
], LogoutDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        example: 'password123',
        minLength: 6
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    __metadata("design:type", String)
], LogoutDto.prototype, "password", void 0);
class ChangePasswordDto {
    currentPassword;
    newPassword;
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current password',
        example: 'currentPassword123',
        minLength: 6
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Current password is required' }),
    (0, class_validator_1.IsString)({ message: 'Current password must be a string' }),
    (0, class_validator_1.MinLength)(6, { message: 'Current password must be at least 6 characters long' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New password',
        example: 'newPassword123',
        minLength: 6
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'New password is required' }),
    (0, class_validator_1.IsString)({ message: 'New password must be a string' }),
    (0, class_validator_1.MinLength)(6, { message: 'New password must be at least 6 characters long' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
//# sourceMappingURL=auth.dto.js.map