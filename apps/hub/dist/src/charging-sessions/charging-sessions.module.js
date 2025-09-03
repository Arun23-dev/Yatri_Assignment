"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargingSessionsModule = void 0;
const common_1 = require("@nestjs/common");
const charging_sessions_controller_1 = require("./charging-sessions.controller");
const charging_sessions_service_1 = require("./charging-sessions.service");
const prisma_module_1 = require("../prisma/prisma.module");
const auth_module_1 = require("../auth/auth.module");
let ChargingSessionsModule = class ChargingSessionsModule {
};
exports.ChargingSessionsModule = ChargingSessionsModule;
exports.ChargingSessionsModule = ChargingSessionsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [charging_sessions_controller_1.ChargingSessionsController],
        providers: [charging_sessions_service_1.ChargingSessionsService],
        exports: [charging_sessions_service_1.ChargingSessionsService],
    })
], ChargingSessionsModule);
//# sourceMappingURL=charging-sessions.module.js.map