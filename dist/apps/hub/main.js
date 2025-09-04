/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(42);
const cookie_parser_1 = __importDefault(__webpack_require__(261));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('YatriTask Hub API')
        .setDescription(`
      # 🚀 YatriTask Hub API Documentation
      
      ## Overview
      This is the main REST API for the YatriTask bike rental management system. 
      It handles authentication, user management, bike operations, and communicates with the Wallet microservice via gRPC.
      
      ## 🔐 Authentication
      Most endpoints require JWT authentication. Include your JWT token in the Authorization header:
      \`Authorization: Bearer <your_jwt_token>\`
      
      ## 👥 User Roles
      - **CUSTOMER**: Can view own wallet, transactions, and charging sessions
      - **ADMIN**: Full access to all APIs and user management
      - **STAFF**: Limited admin access
      
      ## 🚴 Bike Management
      - Create, view, and manage bikes
      - Assign bikes to users
      - Return bikes from users
      - Track bike status
      
      ## 💰 Wallet Operations
      - View wallet balance and transactions
      - Access charging session history
      - All wallet operations are handled via gRPC communication with the Wallet microservice
      
      ## 📊 API Endpoints
      - **Authentication**: Register, login, logout
      - **Users**: CRUD operations for user management
      - **Bikes**: Bike inventory and assignment management
      - **Admins**: Admin-specific operations and dashboard
      
      ## 🔗 Related Services
      - **Wallet Microservice**: Runs on localhost:5000 (gRPC)
      - **Swagger UI**: Interactive API documentation
      
      ## 🚨 Error Codes
      - **400**: Bad Request - Invalid input data
      - **401**: Unauthorized - Missing or invalid JWT token
      - **403**: Forbidden - Insufficient permissions
      - **404**: Not Found - Resource not found
      - **409**: Conflict - Resource already exists (e.g., duplicate email)
      - **500**: Internal Server Error - Server-side error
    `)
        .setVersion('1.0.0')
        .addTag('auth', 'Authentication endpoints for user registration and login')
        .addTag('users', 'User management operations (Admin only)')
        .addTag('bikes', 'Bike inventory and assignment management')
        .addTag('admins', 'Admin-specific operations and dashboard')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .addServer('http://localhost:3001', 'Development server')
        .addServer('https://api.yatritask.com', 'Production server')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'none',
            filter: true,
            showRequestDuration: true,
            syntaxHighlight: {
                activate: true,
                theme: 'monokai',
            },
        },
        customSiteTitle: 'YatriTask Hub API Documentation',
        customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #2c3e50; font-size: 36px; }
      .swagger-ui .info .description { font-size: 16px; line-height: 1.6; }
      .swagger-ui .scheme-container { background: #f8f9fa; padding: 20px; border-radius: 8px; }
    `,
    });
    await app.listen(3001);
    console.log(`🚀 Hub application is running on: http://localhost:3001`);
    console.log(`📚 Swagger documentation: http://localhost:3001/api`);
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const app_controller_1 = __webpack_require__(4);
const app_service_1 = __webpack_require__(5);
const config_1 = __webpack_require__(6);
const customers_module_1 = __webpack_require__(40);
const auth_module_1 = __webpack_require__(225);
const prisma_module_1 = __webpack_require__(224);
const bikes_module_1 = __webpack_require__(253);
const charging_sessions_module_1 = __webpack_require__(257);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            customers_module_1.CustomersModule,
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            bikes_module_1.BikesModule,
            charging_sessions_module_1.ChargingSessionsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(5);
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(3);
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(7));


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(8), exports);
__exportStar(__webpack_require__(9), exports);
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(29), exports);
__exportStar(__webpack_require__(34), exports);
__exportStar(__webpack_require__(36), exports);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConditionalModule = void 0;
const common_1 = __webpack_require__(3);
const config_module_1 = __webpack_require__(9);
/**
 * Same logic as in `@nestjs/core` package.
 * @param instance The instance which should get the name from
 * @returns The name of an instance or `undefined`
 */
const getInstanceName = (instance) => {
    if (instance?.forwardRef) {
        return instance.forwardRef()?.name;
    }
    if (instance.module) {
        return instance.module?.name;
    }
    return instance.name;
};
/**
 * @publicApi
 */
class ConditionalModule {
    /**
     * @publicApi
     */
    static async registerWhen(module, condition, options) {
        const { timeout = 5000, debug = true } = options ?? {};
        const moduleName = getInstanceName(module) || module.toString();
        const timer = setTimeout(() => {
            throw new Error(`Nest was not able to resolve the config variables within ${timeout} milliseconds. Bause of this, the ConditionalModule was not able to determine if ${moduleName} should be registered or not`);
        }, timeout);
        timer.unref();
        const returnModule = { module: ConditionalModule, imports: [], exports: [] };
        if (typeof condition === 'string') {
            const key = condition;
            condition = env => {
                return env[key]?.toLowerCase() !== 'false';
            };
        }
        await config_module_1.ConfigModule.envVariablesLoaded;
        clearTimeout(timer);
        const evaluation = condition(process.env);
        if (evaluation) {
            returnModule.imports.push(module);
            returnModule.exports.push(module);
        }
        else {
            if (debug) {
                common_1.Logger.debug(`${condition.toString()} evaluated to false. Skipping the registration of ${moduleName}`, ConditionalModule.name);
            }
        }
        return returnModule;
    }
}
exports.ConditionalModule = ConditionalModule;


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var ConfigModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const common_1 = __webpack_require__(3);
const shared_utils_1 = __webpack_require__(10);
const dotenv = __importStar(__webpack_require__(11));
const dotenv_expand_1 = __webpack_require__(17);
const fs = __importStar(__webpack_require__(12));
const path_1 = __webpack_require__(13);
const config_host_module_1 = __webpack_require__(18);
const config_constants_1 = __webpack_require__(19);
const config_service_1 = __webpack_require__(20);
const create_config_factory_util_1 = __webpack_require__(25);
const get_registration_token_util_1 = __webpack_require__(27);
const merge_configs_util_1 = __webpack_require__(28);
/**
 * @publicApi
 */
let ConfigModule = ConfigModule_1 = class ConfigModule {
    /**
     * This promise resolves when "dotenv" completes loading environment variables.
     * When "ignoreEnvFile" is set to true, then it will resolve immediately after the
     * "ConfigModule#forRoot" method is called.
     */
    static get envVariablesLoaded() {
        return this._envVariablesLoaded;
    }
    /**
     * Loads environment variables based on the "ignoreEnvFile" flag and "envFilePath" value.
     * Additionally, registers custom configurations globally.
     * @param options
     */
    static async forRoot(options = {}) {
        const envFilePaths = Array.isArray(options.envFilePath)
            ? options.envFilePath
            : [options.envFilePath || (0, path_1.resolve)(process.cwd(), '.env')];
        let validatedEnvConfig = undefined;
        let config = options.ignoreEnvFile
            ? {}
            : this.loadEnvFile(envFilePaths, options);
        if (!options.ignoreEnvVars && options.validatePredefined !== false) {
            config = {
                ...config,
                ...process.env,
            };
        }
        if (options.validate) {
            const validatedConfig = options.validate(config);
            validatedEnvConfig = validatedConfig;
            this.assignVariablesToProcess(validatedConfig);
        }
        else if (options.validationSchema) {
            const validationOptions = this.getSchemaValidationOptions(options);
            const { error, value: validatedConfig } = options.validationSchema.validate(config, validationOptions);
            if (error) {
                throw new Error(`Config validation error: ${error.message}`);
            }
            validatedEnvConfig = validatedConfig;
            this.assignVariablesToProcess(validatedConfig);
        }
        else {
            this.assignVariablesToProcess(config);
        }
        const isConfigToLoad = options.load && options.load.length;
        const configFactory = await Promise.all(options.load || []);
        const providers = configFactory
            .map(factory => (0, create_config_factory_util_1.createConfigProvider)(factory))
            .filter(item => item);
        const configProviderTokens = providers.map(item => item.provide);
        const configServiceProvider = {
            provide: config_service_1.ConfigService,
            useFactory: (configService) => {
                const untypedConfigService = configService;
                if (options.cache) {
                    untypedConfigService.isCacheEnabled = true;
                }
                if (options.skipProcessEnv) {
                    untypedConfigService.skipProcessEnv = true;
                }
                configService.setEnvFilePaths(envFilePaths);
                return configService;
            },
            inject: [config_constants_1.CONFIGURATION_SERVICE_TOKEN, ...configProviderTokens],
        };
        providers.push(configServiceProvider);
        if (validatedEnvConfig) {
            const validatedEnvConfigLoader = {
                provide: config_constants_1.VALIDATED_ENV_LOADER,
                useFactory: (host) => {
                    host[config_constants_1.VALIDATED_ENV_PROPNAME] = validatedEnvConfig;
                },
                inject: [config_constants_1.CONFIGURATION_TOKEN],
            };
            providers.push(validatedEnvConfigLoader);
        }
        this.environmentVariablesLoadedSignal();
        return {
            module: ConfigModule_1,
            global: options.isGlobal,
            providers: isConfigToLoad
                ? [
                    ...providers,
                    {
                        provide: config_constants_1.CONFIGURATION_LOADER,
                        useFactory: (host, ...configurations) => {
                            configurations.forEach((item, index) => this.mergePartial(host, item, providers[index]));
                        },
                        inject: [config_constants_1.CONFIGURATION_TOKEN, ...configProviderTokens],
                    },
                ]
                : providers,
            exports: [config_service_1.ConfigService, ...configProviderTokens],
        };
    }
    /**
     * Registers configuration object (partial registration).
     * @param config
     */
    static forFeature(config) {
        const configProvider = (0, create_config_factory_util_1.createConfigProvider)(config);
        const serviceProvider = {
            provide: config_service_1.ConfigService,
            useFactory: (configService) => configService,
            inject: [config_constants_1.CONFIGURATION_SERVICE_TOKEN, configProvider.provide],
        };
        return {
            module: ConfigModule_1,
            providers: [
                configProvider,
                serviceProvider,
                {
                    provide: config_constants_1.CONFIGURATION_LOADER,
                    useFactory: (host, partialConfig) => {
                        this.mergePartial(host, partialConfig, configProvider);
                    },
                    inject: [config_constants_1.CONFIGURATION_TOKEN, configProvider.provide],
                },
            ],
            exports: [config_service_1.ConfigService, configProvider.provide],
        };
    }
    static loadEnvFile(envFilePaths, options) {
        let config = {};
        for (const envFilePath of envFilePaths) {
            if (fs.existsSync(envFilePath)) {
                config = Object.assign(dotenv.parse(fs.readFileSync(envFilePath)), config);
                if (options.expandVariables) {
                    const expandOptions = typeof options.expandVariables === 'object'
                        ? options.expandVariables
                        : {};
                    config =
                        (0, dotenv_expand_1.expand)({ ...expandOptions, parsed: config }).parsed || config;
                }
            }
        }
        return config;
    }
    static assignVariablesToProcess(config) {
        if (!(0, shared_utils_1.isObject)(config)) {
            return;
        }
        const keys = Object.keys(config).filter(key => !(key in process.env));
        keys.forEach(key => {
            const value = config[key];
            if (typeof value === 'string') {
                process.env[key] = value;
            }
            else if (typeof value === 'boolean' || typeof value === 'number') {
                process.env[key] = `${value}`;
            }
        });
    }
    static mergePartial(host, item, provider) {
        const factoryRef = provider.useFactory;
        const token = (0, get_registration_token_util_1.getRegistrationToken)(factoryRef);
        (0, merge_configs_util_1.mergeConfigObject)(host, item, token);
    }
    static getSchemaValidationOptions(options) {
        if (options.validationOptions) {
            if (typeof options.validationOptions.allowUnknown === 'undefined') {
                options.validationOptions.allowUnknown = true;
            }
            return options.validationOptions;
        }
        return {
            abortEarly: false,
            allowUnknown: true,
        };
    }
};
exports.ConfigModule = ConfigModule;
ConfigModule._envVariablesLoaded = new Promise(resolve => (ConfigModule_1.environmentVariablesLoadedSignal = resolve));
exports.ConfigModule = ConfigModule = ConfigModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [config_host_module_1.ConfigHostModule],
        providers: [
            {
                provide: config_service_1.ConfigService,
                useExisting: config_constants_1.CONFIGURATION_SERVICE_TOKEN,
            },
        ],
        exports: [config_host_module_1.ConfigHostModule, config_service_1.ConfigService],
    })
], ConfigModule);


/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/utils/shared.utils");

/***/ }),
/* 11 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(12)
const path = __webpack_require__(13)
const os = __webpack_require__(14)
const crypto = __webpack_require__(15)
const packageJson = __webpack_require__(16)

const version = packageJson.version

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg

// Parse src into an Object
function parse (src) {
  const obj = {}

  // Convert buffer to string
  let lines = src.toString()

  // Convert line breaks to same format
  lines = lines.replace(/\r\n?/mg, '\n')

  let match
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1]

    // Default undefined or null to empty string
    let value = (match[2] || '')

    // Remove whitespace
    value = value.trim()

    // Check if double quoted
    const maybeQuote = value[0]

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2')

    // Expand newlines if double quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n')
      value = value.replace(/\\r/g, '\r')
    }

    // Add to object
    obj[key] = value
  }

  return obj
}

function _parseVault (options) {
  const vaultPath = _vaultPath(options)

  // Parse .env.vault
  const result = DotenvModule.configDotenv({ path: vaultPath })
  if (!result.parsed) {
    const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`)
    err.code = 'MISSING_DATA'
    throw err
  }

  // handle scenario for comma separated keys - for use with key rotation
  // example: DOTENV_KEY="dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=prod,dotenv://:key_7890@dotenvx.com/vault/.env.vault?environment=prod"
  const keys = _dotenvKey(options).split(',')
  const length = keys.length

  let decrypted
  for (let i = 0; i < length; i++) {
    try {
      // Get full key
      const key = keys[i].trim()

      // Get instructions for decrypt
      const attrs = _instructions(result, key)

      // Decrypt
      decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key)

      break
    } catch (error) {
      // last key
      if (i + 1 >= length) {
        throw error
      }
      // try next key
    }
  }

  // Parse decrypted .env string
  return DotenvModule.parse(decrypted)
}

function _log (message) {
  console.log(`[dotenv@${version}][INFO] ${message}`)
}

function _warn (message) {
  console.log(`[dotenv@${version}][WARN] ${message}`)
}

function _debug (message) {
  console.log(`[dotenv@${version}][DEBUG] ${message}`)
}

function _dotenvKey (options) {
  // prioritize developer directly setting options.DOTENV_KEY
  if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
    return options.DOTENV_KEY
  }

  // secondary infra already contains a DOTENV_KEY environment variable
  if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
    return process.env.DOTENV_KEY
  }

  // fallback to empty string
  return ''
}

function _instructions (result, dotenvKey) {
  // Parse DOTENV_KEY. Format is a URI
  let uri
  try {
    uri = new URL(dotenvKey)
  } catch (error) {
    if (error.code === 'ERR_INVALID_URL') {
      const err = new Error('INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development')
      err.code = 'INVALID_DOTENV_KEY'
      throw err
    }

    throw error
  }

  // Get decrypt key
  const key = uri.password
  if (!key) {
    const err = new Error('INVALID_DOTENV_KEY: Missing key part')
    err.code = 'INVALID_DOTENV_KEY'
    throw err
  }

  // Get environment
  const environment = uri.searchParams.get('environment')
  if (!environment) {
    const err = new Error('INVALID_DOTENV_KEY: Missing environment part')
    err.code = 'INVALID_DOTENV_KEY'
    throw err
  }

  // Get ciphertext payload
  const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`
  const ciphertext = result.parsed[environmentKey] // DOTENV_VAULT_PRODUCTION
  if (!ciphertext) {
    const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`)
    err.code = 'NOT_FOUND_DOTENV_ENVIRONMENT'
    throw err
  }

  return { ciphertext, key }
}

function _vaultPath (options) {
  let possibleVaultPath = null

  if (options && options.path && options.path.length > 0) {
    if (Array.isArray(options.path)) {
      for (const filepath of options.path) {
        if (fs.existsSync(filepath)) {
          possibleVaultPath = filepath.endsWith('.vault') ? filepath : `${filepath}.vault`
        }
      }
    } else {
      possibleVaultPath = options.path.endsWith('.vault') ? options.path : `${options.path}.vault`
    }
  } else {
    possibleVaultPath = path.resolve(process.cwd(), '.env.vault')
  }

  if (fs.existsSync(possibleVaultPath)) {
    return possibleVaultPath
  }

  return null
}

function _resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

function _configVault (options) {
  _log('Loading env from encrypted .env.vault')

  const parsed = DotenvModule._parseVault(options)

  let processEnv = process.env
  if (options && options.processEnv != null) {
    processEnv = options.processEnv
  }

  DotenvModule.populate(processEnv, parsed, options)

  return { parsed }
}

function configDotenv (options) {
  const dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding = 'utf8'
  const debug = Boolean(options && options.debug)

  if (options && options.encoding) {
    encoding = options.encoding
  } else {
    if (debug) {
      _debug('No encoding is specified. UTF-8 is used by default')
    }
  }

  let optionPaths = [dotenvPath] // default, look for .env
  if (options && options.path) {
    if (!Array.isArray(options.path)) {
      optionPaths = [_resolveHome(options.path)]
    } else {
      optionPaths = [] // reset default
      for (const filepath of options.path) {
        optionPaths.push(_resolveHome(filepath))
      }
    }
  }

  // Build the parsed data in a temporary object (because we need to return it).  Once we have the final
  // parsed data, we will combine it with process.env (or options.processEnv if provided).
  let lastError
  const parsedAll = {}
  for (const path of optionPaths) {
    try {
      // Specifying an encoding returns a string instead of a buffer
      const parsed = DotenvModule.parse(fs.readFileSync(path, { encoding }))

      DotenvModule.populate(parsedAll, parsed, options)
    } catch (e) {
      if (debug) {
        _debug(`Failed to load ${path} ${e.message}`)
      }
      lastError = e
    }
  }

  let processEnv = process.env
  if (options && options.processEnv != null) {
    processEnv = options.processEnv
  }

  DotenvModule.populate(processEnv, parsedAll, options)

  if (lastError) {
    return { parsed: parsedAll, error: lastError }
  } else {
    return { parsed: parsedAll }
  }
}

// Populates process.env from .env file
function config (options) {
  // fallback to original dotenv if DOTENV_KEY is not set
  if (_dotenvKey(options).length === 0) {
    return DotenvModule.configDotenv(options)
  }

  const vaultPath = _vaultPath(options)

  // dotenvKey exists but .env.vault file does not exist
  if (!vaultPath) {
    _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`)

    return DotenvModule.configDotenv(options)
  }

  return DotenvModule._configVault(options)
}

function decrypt (encrypted, keyStr) {
  const key = Buffer.from(keyStr.slice(-64), 'hex')
  let ciphertext = Buffer.from(encrypted, 'base64')

  const nonce = ciphertext.subarray(0, 12)
  const authTag = ciphertext.subarray(-16)
  ciphertext = ciphertext.subarray(12, -16)

  try {
    const aesgcm = crypto.createDecipheriv('aes-256-gcm', key, nonce)
    aesgcm.setAuthTag(authTag)
    return `${aesgcm.update(ciphertext)}${aesgcm.final()}`
  } catch (error) {
    const isRange = error instanceof RangeError
    const invalidKeyLength = error.message === 'Invalid key length'
    const decryptionFailed = error.message === 'Unsupported state or unable to authenticate data'

    if (isRange || invalidKeyLength) {
      const err = new Error('INVALID_DOTENV_KEY: It must be 64 characters long (or more)')
      err.code = 'INVALID_DOTENV_KEY'
      throw err
    } else if (decryptionFailed) {
      const err = new Error('DECRYPTION_FAILED: Please check your DOTENV_KEY')
      err.code = 'DECRYPTION_FAILED'
      throw err
    } else {
      throw error
    }
  }
}

// Populate process.env with parsed values
function populate (processEnv, parsed, options = {}) {
  const debug = Boolean(options && options.debug)
  const override = Boolean(options && options.override)

  if (typeof parsed !== 'object') {
    const err = new Error('OBJECT_REQUIRED: Please check the processEnv argument being passed to populate')
    err.code = 'OBJECT_REQUIRED'
    throw err
  }

  // Set process.env
  for (const key of Object.keys(parsed)) {
    if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
      if (override === true) {
        processEnv[key] = parsed[key]
      }

      if (debug) {
        if (override === true) {
          _debug(`"${key}" is already defined and WAS overwritten`)
        } else {
          _debug(`"${key}" is already defined and was NOT overwritten`)
        }
      }
    } else {
      processEnv[key] = parsed[key]
    }
  }
}

const DotenvModule = {
  configDotenv,
  _configVault,
  _parseVault,
  config,
  decrypt,
  parse,
  populate
}

module.exports.configDotenv = DotenvModule.configDotenv
module.exports._configVault = DotenvModule._configVault
module.exports._parseVault = DotenvModule._parseVault
module.exports.config = DotenvModule.config
module.exports.decrypt = DotenvModule.decrypt
module.exports.parse = DotenvModule.parse
module.exports.populate = DotenvModule.populate

module.exports = DotenvModule


/***/ }),
/* 12 */
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),
/* 13 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 14 */
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),
/* 15 */
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),
/* 16 */
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"dotenv","version":"16.4.7","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","pretest":"npm run lint && npm run dts-check","test":"tap run --allow-empty-coverage --disable-coverage --timeout=60000","test:coverage":"tap run --show-full-coverage --timeout=60000 --coverage-report=lcov","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"funding":"https://dotenvx.com","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@types/node":"^18.11.3","decache":"^4.6.2","sinon":"^14.0.1","standard":"^17.0.0","standard-version":"^9.5.0","tap":"^19.2.0","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}');

/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";


function _resolveEscapeSequences (value) {
  return value.replace(/\\\$/g, '$')
}

function expandValue (value, processEnv, runningParsed) {
  const env = { ...runningParsed, ...processEnv } // process.env wins

  const regex = /(?<!\\)\${([^{}]+)}|(?<!\\)\$([A-Za-z_][A-Za-z0-9_]*)/g

  let result = value
  let match
  const seen = new Set() // self-referential checker

  while ((match = regex.exec(result)) !== null) {
    seen.add(result)

    const [template, bracedExpression, unbracedExpression] = match
    const expression = bracedExpression || unbracedExpression

    // match the operators `:+`, `+`, `:-`, and `-`
    const opRegex = /(:\+|\+|:-|-)/
    // find first match
    const opMatch = expression.match(opRegex)
    const splitter = opMatch ? opMatch[0] : null

    const r = expression.split(splitter)

    let defaultValue
    let value

    const key = r.shift()

    if ([':+', '+'].includes(splitter)) {
      defaultValue = env[key] ? r.join(splitter) : ''
      value = null
    } else {
      defaultValue = r.join(splitter)
      value = env[key]
    }

    if (value) {
      // self-referential check
      if (seen.has(value)) {
        result = result.replace(template, defaultValue)
      } else {
        result = result.replace(template, value)
      }
    } else {
      result = result.replace(template, defaultValue)
    }

    // if the result equaled what was in process.env and runningParsed then stop expanding
    if (result === runningParsed[key]) {
      break
    }

    regex.lastIndex = 0 // reset regex search position to re-evaluate after each replacement
  }

  return result
}

function expand (options) {
  // for use with progressive expansion
  const runningParsed = {}

  let processEnv = process.env
  if (options && options.processEnv != null) {
    processEnv = options.processEnv
  }

  // dotenv.config() ran before this so the assumption is process.env has already been set
  for (const key in options.parsed) {
    let value = options.parsed[key]

    // short-circuit scenario: process.env was already set prior to the file value
    if (processEnv[key] && processEnv[key] !== value) {
      value = processEnv[key]
    } else {
      value = expandValue(value, processEnv, runningParsed)
    }

    options.parsed[key] = _resolveEscapeSequences(value)

    // for use with progressive expansion
    runningParsed[key] = _resolveEscapeSequences(value)
  }

  for (const processKey in options.parsed) {
    processEnv[processKey] = options.parsed[processKey]
  }

  return options
}

module.exports.expand = expand


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigHostModule = void 0;
const common_1 = __webpack_require__(3);
const config_constants_1 = __webpack_require__(19);
const config_service_1 = __webpack_require__(20);
/**
 * @publicApi
 */
let ConfigHostModule = class ConfigHostModule {
};
exports.ConfigHostModule = ConfigHostModule;
exports.ConfigHostModule = ConfigHostModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: config_constants_1.CONFIGURATION_TOKEN,
                useFactory: () => ({}),
            },
            {
                provide: config_constants_1.CONFIGURATION_SERVICE_TOKEN,
                useClass: config_service_1.ConfigService,
            },
        ],
        exports: [config_constants_1.CONFIGURATION_TOKEN, config_constants_1.CONFIGURATION_SERVICE_TOKEN],
    })
], ConfigHostModule);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AS_PROVIDER_METHOD_KEY = exports.VALIDATED_ENV_PROPNAME = exports.PARTIAL_CONFIGURATION_PROPNAME = exports.PARTIAL_CONFIGURATION_KEY = exports.VALIDATED_ENV_LOADER = exports.CONFIGURATION_LOADER = exports.CONFIGURATION_TOKEN = exports.CONFIGURATION_SERVICE_TOKEN = void 0;
/**
 * Injection tokens
 */
exports.CONFIGURATION_SERVICE_TOKEN = Symbol('CONFIG_SERVICE');
exports.CONFIGURATION_TOKEN = 'CONFIGURATION_TOKEN';
exports.CONFIGURATION_LOADER = 'CONFIGURATION_LOADER';
exports.VALIDATED_ENV_LOADER = 'VALIDATED_ENV_LOADER';
exports.PARTIAL_CONFIGURATION_KEY = 'PARTIAL_CONFIGURATION_KEY';
exports.PARTIAL_CONFIGURATION_PROPNAME = 'KEY';
exports.VALIDATED_ENV_PROPNAME = '_PROCESS_ENV_VALIDATED';
exports.AS_PROVIDER_METHOD_KEY = 'asProvider';


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigService = void 0;
const common_1 = __webpack_require__(3);
const shared_utils_1 = __webpack_require__(10);
const dotenv = __importStar(__webpack_require__(11));
const fs_1 = __importDefault(__webpack_require__(12));
const get_1 = __importDefault(__webpack_require__(21));
const has_1 = __importDefault(__webpack_require__(22));
const set_1 = __importDefault(__webpack_require__(23));
const rxjs_1 = __webpack_require__(24);
const config_constants_1 = __webpack_require__(19);
/**
 * @publicApi
 */
let ConfigService = class ConfigService {
    set isCacheEnabled(value) {
        this._isCacheEnabled = value;
    }
    get isCacheEnabled() {
        return this._isCacheEnabled;
    }
    set skipProcessEnv(value) {
        this._skipProcessEnv = value;
    }
    get skipProcessEnv() {
        return this._skipProcessEnv;
    }
    constructor(internalConfig = {}) {
        this.internalConfig = internalConfig;
        this.cache = {};
        this._changes$ = new rxjs_1.Subject();
        this._skipProcessEnv = false;
        this._isCacheEnabled = false;
        this.envFilePaths = [];
    }
    /**
     * Returns a stream of configuration changes.
     * Each event contains the attribute path, the old value and the new value.
     */
    get changes$() {
        return this._changes$.asObservable();
    }
    /**
     * Get a configuration value (either custom configuration or process environment variable)
     * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
     * It returns a default value if the key does not exist.
     * @param propertyPath
     * @param defaultValueOrOptions
     */
    get(propertyPath, defaultValueOrOptions, options) {
        const internalValue = this.getFromInternalConfig(propertyPath);
        if (!(0, shared_utils_1.isUndefined)(internalValue)) {
            return internalValue;
        }
        const validatedEnvValue = this.getFromValidatedEnv(propertyPath);
        if (!(0, shared_utils_1.isUndefined)(validatedEnvValue)) {
            return validatedEnvValue;
        }
        const defaultValue = this.isGetOptionsObject(defaultValueOrOptions) &&
            !options
            ? undefined
            : defaultValueOrOptions;
        if (!this._skipProcessEnv) {
            const processEnvValue = this.getFromProcessEnv(propertyPath, defaultValue);
            if (!(0, shared_utils_1.isUndefined)(processEnvValue)) {
                return processEnvValue;
            }
        }
        return defaultValue;
    }
    /**
     * Get a configuration value (either custom configuration or process environment variable)
     * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
     * It returns a default value if the key does not exist.
     * If the default value is undefined an exception will be thrown.
     * @param propertyPath
     * @param defaultValueOrOptions
     */
    getOrThrow(propertyPath, defaultValueOrOptions, options) {
        // @ts-expect-error Bypass method overloads
        const value = this.get(propertyPath, defaultValueOrOptions, options);
        if ((0, shared_utils_1.isUndefined)(value)) {
            throw new TypeError(`Configuration key "${propertyPath.toString()}" does not exist`);
        }
        return value;
    }
    /**
     * Sets a configuration value based on property path.
     * @param propertyPath
     * @param value
     */
    set(propertyPath, value) {
        const oldValue = this.get(propertyPath);
        (0, set_1.default)(this.internalConfig, propertyPath, value);
        if (typeof propertyPath === 'string') {
            process.env[propertyPath] = String(value);
            this.updateInterpolatedEnv(propertyPath, String(value));
        }
        if (this.isCacheEnabled) {
            this.setInCacheIfDefined(propertyPath, value);
        }
        this._changes$.next({
            path: propertyPath,
            oldValue,
            newValue: value,
        });
    }
    /**
     * Sets env file paths from `config.module.ts` to parse.
     * @param paths
     */
    setEnvFilePaths(paths) {
        this.envFilePaths = paths;
    }
    getFromCache(propertyPath, defaultValue) {
        const cachedValue = (0, get_1.default)(this.cache, propertyPath);
        return (0, shared_utils_1.isUndefined)(cachedValue)
            ? defaultValue
            : cachedValue;
    }
    getFromValidatedEnv(propertyPath) {
        const validatedEnvValue = (0, get_1.default)(this.internalConfig[config_constants_1.VALIDATED_ENV_PROPNAME], propertyPath);
        return validatedEnvValue;
    }
    getFromProcessEnv(propertyPath, defaultValue) {
        if (this.isCacheEnabled &&
            (0, has_1.default)(this.cache, propertyPath)) {
            const cachedValue = this.getFromCache(propertyPath, defaultValue);
            return !(0, shared_utils_1.isUndefined)(cachedValue) ? cachedValue : defaultValue;
        }
        const processValue = (0, get_1.default)(process.env, propertyPath);
        this.setInCacheIfDefined(propertyPath, processValue);
        return processValue;
    }
    getFromInternalConfig(propertyPath) {
        const internalValue = (0, get_1.default)(this.internalConfig, propertyPath);
        return internalValue;
    }
    setInCacheIfDefined(propertyPath, value) {
        if (typeof value === 'undefined') {
            return;
        }
        (0, set_1.default)(this.cache, propertyPath, value);
    }
    isGetOptionsObject(options) {
        return options && options?.infer && Object.keys(options).length === 1;
    }
    updateInterpolatedEnv(propertyPath, value) {
        let config = {};
        for (const envFilePath of this.envFilePaths) {
            if (fs_1.default.existsSync(envFilePath)) {
                config = Object.assign(dotenv.parse(fs_1.default.readFileSync(envFilePath)), config);
            }
        }
        const regex = new RegExp(`\\$\\{?${propertyPath}\\}?`, 'g');
        for (const [k, v] of Object.entries(config)) {
            if (regex.test(v)) {
                process.env[k] = v.replace(regex, value);
            }
        }
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)(config_constants_1.CONFIGURATION_TOKEN)),
    __metadata("design:paramtypes", [Object])
], ConfigService);


/***/ }),
/* 21 */
/***/ ((module) => {

"use strict";
module.exports = require("lodash/get");

/***/ }),
/* 22 */
/***/ ((module) => {

"use strict";
module.exports = require("lodash/has");

/***/ }),
/* 23 */
/***/ ((module) => {

"use strict";
module.exports = require("lodash/set");

/***/ }),
/* 24 */
/***/ ((module) => {

"use strict";
module.exports = require("rxjs");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createConfigProvider = createConfigProvider;
const get_config_token_util_1 = __webpack_require__(26);
const crypto_1 = __webpack_require__(15);
/**
 * @publicApi
 */
function createConfigProvider(factory) {
    return {
        provide: factory.KEY || (0, get_config_token_util_1.getConfigToken)((0, crypto_1.randomUUID)()),
        useFactory: factory,
        inject: [],
    };
}


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getConfigToken = getConfigToken;
/**
 * @publicApi
 */
function getConfigToken(token) {
    return `CONFIGURATION(${token.toString()})`;
}


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRegistrationToken = getRegistrationToken;
const config_constants_1 = __webpack_require__(19);
/**
 * @publicApi
 */
function getRegistrationToken(config) {
    return config[config_constants_1.PARTIAL_CONFIGURATION_KEY];
}


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeConfigObject = mergeConfigObject;
const set_1 = __importDefault(__webpack_require__(23));
/**
 * @publicApi
 */
function mergeConfigObject(host, partial, token) {
    if (token) {
        (0, set_1.default)(host, token, partial);
        return partial;
    }
    Object.assign(host, partial);
}


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(30), exports);
__exportStar(__webpack_require__(31), exports);
__exportStar(__webpack_require__(32), exports);
__exportStar(__webpack_require__(33), exports);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(35), exports);
__exportStar(__webpack_require__(26), exports);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerAs = registerAs;
const __1 = __webpack_require__(7);
const config_constants_1 = __webpack_require__(19);
const get_config_token_util_1 = __webpack_require__(26);
/**
 * @publicApi
 *
 * Registers the configuration object behind a specified token.
 */
function registerAs(token, configFactory) {
    const defineProperty = (key, value) => {
        Object.defineProperty(configFactory, key, {
            configurable: false,
            enumerable: false,
            value,
            writable: false,
        });
    };
    defineProperty(config_constants_1.PARTIAL_CONFIGURATION_KEY, token);
    defineProperty(config_constants_1.PARTIAL_CONFIGURATION_PROPNAME, (0, get_config_token_util_1.getConfigToken)(token));
    defineProperty(config_constants_1.AS_PROVIDER_METHOD_KEY, () => ({
        imports: [__1.ConfigModule.forFeature(configFactory)],
        useFactory: (config) => config,
        inject: [(0, get_config_token_util_1.getConfigToken)(token)],
    }));
    return configFactory;
}


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(38), exports);
__exportStar(__webpack_require__(39), exports);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomersModule = void 0;
const common_1 = __webpack_require__(3);
const customers_controller_1 = __webpack_require__(41);
const customer_profile_controller_1 = __webpack_require__(220);
const customers_service_1 = __webpack_require__(151);
const prisma_module_1 = __webpack_require__(224);
const auth_module_1 = __webpack_require__(225);
const wallet_grpc_service_1 = __webpack_require__(168);
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [customers_controller_1.CustomersController, customer_profile_controller_1.CustomerProfileController],
        providers: [customers_service_1.CustomersService, wallet_grpc_service_1.WalletGrpcService],
        exports: [customers_service_1.CustomersService],
    })
], CustomersModule);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomersController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(42);
const customers_service_1 = __webpack_require__(151);
const customer_dto_1 = __webpack_require__(173);
const response_dto_1 = __webpack_require__(174);
const admin_auth_guard_1 = __webpack_require__(175);
let CustomersController = class CustomersController {
    customersService;
    constructor(customersService) {
        this.customersService = customersService;
    }
    async createCustomer(body) {
        const customer = await this.customersService.createCustomer(body);
        return {
            message: 'Customer created successfully',
            data: customer,
            statusCode: common_1.HttpStatus.CREATED,
            timestamp: new Date()
        };
    }
    async getAllCustomers(page = 1, limit = 5) {
        return this.customersService.getAllCustomers(page, limit);
    }
    async searchCustomers(query, page = 1, limit = 5) {
        return this.customersService.searchCustomers(query, page, limit);
    }
    async getCustomerById(id) {
        return this.customersService.getCustomerById(id);
    }
    async updateCustomer(id, body) {
        return this.customersService.updateCustomer(id, body);
    }
    async deleteCustomer(id) {
        return this.customersService.deleteCustomer(id);
    }
    async getCustomerWallet(id) {
        const customer = await this.customersService.getCustomerById(id);
        const walletInfo = await this.customersService.getCustomerWallet(id);
        return {
            message: 'Customer wallet information retrieved successfully',
            data: {
                customer,
                wallet: walletInfo
            },
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new customer (Admin only)',
        description: 'Creates a new customer account. Only admins can create customers.'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Customer created successfully',
        type: (response_dto_1.ApiResponseDto),
        schema: {
            example: {
                message: 'Customer created successfully',
                data: {
                    id: '507f1f77bcf86cd799439011',
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: 'jane.doe@example.com',
                    phone: '+1234567890',
                    address: '123 Main St, City, State 12345',
                    createdAt: '2024-01-09T16:30:00.000Z',
                    updatedAt: '2024-01-09T16:30:00.000Z'
                },
                statusCode: 201,
                timestamp: '2024-01-09T16:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Customer with this email already exists'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof customer_dto_1.CreateCustomerDto !== "undefined" && customer_dto_1.CreateCustomerDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CustomersController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all customers (Admin only)',
        description: 'Retrieves a paginated list of all customers. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 5)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customers retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getAllCustomers", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Search customers (Admin only)',
        description: 'Search customers by name or email. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true, type: String, description: 'Search query' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 5)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Search results retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "searchCustomers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get customer by ID (Admin only)',
        description: 'Retrieves a specific customer by their ID. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer retrieved successfully',
        type: response_dto_1.CustomerResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Customer not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CustomersController.prototype, "getCustomerById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update customer (Admin only)',
        description: 'Partially updates a customer\'s information. Only admins can update customers. Only send the fields you want to update.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer updated successfully',
        type: response_dto_1.CustomerResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Customer not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Email already exists'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof customer_dto_1.UpdateCustomerDto !== "undefined" && customer_dto_1.UpdateCustomerDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CustomersController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete customer (Admin only)',
        description: 'Deletes a customer and their associated wallet. Cannot delete customers with active bike assignments.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer and wallet deleted successfully',
        type: response_dto_1.DeleteCustomerResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid customer ID format'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Customer not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Customer has active bike assignments'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CustomersController.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.Get)(':id/wallet'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get customer wallet information',
        description: 'Retrieves wallet information for a specific customer via gRPC call to Wallet service.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer ID', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer wallet information retrieved successfully',
        type: response_dto_1.ApiResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Customer not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin authentication required'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getCustomerWallet", null);
exports.CustomersController = CustomersController = __decorate([
    (0, swagger_1.ApiTags)('customers'),
    (0, common_1.Controller)('customers'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof customers_service_1.CustomersService !== "undefined" && customers_service_1.CustomersService) === "function" ? _a : Object])
], CustomersController);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(43));


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(44);
__exportStar(__webpack_require__(45), exports);
__exportStar(__webpack_require__(77), exports);
__exportStar(__webpack_require__(80), exports);
__exportStar(__webpack_require__(83), exports);
__exportStar(__webpack_require__(133), exports);
__exportStar(__webpack_require__(90), exports);


/***/ }),
/* 44 */
/***/ ((module) => {

"use strict";
module.exports = require("reflect-metadata");

/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiResponseProperty = exports.ApiPropertyOptional = exports.ApiProperty = void 0;
__exportStar(__webpack_require__(46), exports);
__exportStar(__webpack_require__(51), exports);
__exportStar(__webpack_require__(52), exports);
__exportStar(__webpack_require__(57), exports);
__exportStar(__webpack_require__(58), exports);
__exportStar(__webpack_require__(59), exports);
__exportStar(__webpack_require__(60), exports);
__exportStar(__webpack_require__(61), exports);
__exportStar(__webpack_require__(62), exports);
__exportStar(__webpack_require__(63), exports);
__exportStar(__webpack_require__(64), exports);
__exportStar(__webpack_require__(65), exports);
__exportStar(__webpack_require__(66), exports);
__exportStar(__webpack_require__(67), exports);
__exportStar(__webpack_require__(68), exports);
__exportStar(__webpack_require__(69), exports);
var api_property_decorator_1 = __webpack_require__(70);
Object.defineProperty(exports, "ApiProperty", ({ enumerable: true, get: function () { return api_property_decorator_1.ApiProperty; } }));
Object.defineProperty(exports, "ApiPropertyOptional", ({ enumerable: true, get: function () { return api_property_decorator_1.ApiPropertyOptional; } }));
Object.defineProperty(exports, "ApiResponseProperty", ({ enumerable: true, get: function () { return api_property_decorator_1.ApiResponseProperty; } }));
__exportStar(__webpack_require__(71), exports);
__exportStar(__webpack_require__(72), exports);
__exportStar(__webpack_require__(47), exports);
__exportStar(__webpack_require__(73), exports);
__exportStar(__webpack_require__(74), exports);
__exportStar(__webpack_require__(75), exports);
__exportStar(__webpack_require__(76), exports);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiBasicAuth = ApiBasicAuth;
const api_security_decorator_1 = __webpack_require__(47);
function ApiBasicAuth(name = 'basic') {
    return (0, api_security_decorator_1.ApiSecurity)(name);
}


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiSecurity = ApiSecurity;
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const extend_metadata_util_1 = __webpack_require__(50);
function ApiSecurity(name, requirements = []) {
    let metadata;
    if ((0, lodash_1.isString)(name)) {
        metadata = [{ [name]: requirements }];
    }
    else {
        metadata = [name];
    }
    return (target, key, descriptor) => {
        if (descriptor) {
            metadata = (0, extend_metadata_util_1.extendMetadata)(metadata, constants_1.DECORATORS.API_SECURITY, descriptor.value);
            Reflect.defineMetadata(constants_1.DECORATORS.API_SECURITY, metadata, descriptor.value);
            return descriptor;
        }
        metadata = (0, extend_metadata_util_1.extendMetadata)(metadata, constants_1.DECORATORS.API_SECURITY, target);
        Reflect.defineMetadata(constants_1.DECORATORS.API_SECURITY, metadata, target);
        return target;
    };
}


/***/ }),
/* 48 */
/***/ ((module) => {

"use strict";
module.exports = require("lodash");

/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DECORATORS = exports.DECORATORS_PREFIX = void 0;
exports.DECORATORS_PREFIX = 'swagger';
exports.DECORATORS = {
    API_OPERATION: `${exports.DECORATORS_PREFIX}/apiOperation`,
    API_RESPONSE: `${exports.DECORATORS_PREFIX}/apiResponse`,
    API_PRODUCES: `${exports.DECORATORS_PREFIX}/apiProduces`,
    API_CONSUMES: `${exports.DECORATORS_PREFIX}/apiConsumes`,
    API_TAGS: `${exports.DECORATORS_PREFIX}/apiUseTags`,
    API_CALLBACKS: `${exports.DECORATORS_PREFIX}/apiCallbacks`,
    API_PARAMETERS: `${exports.DECORATORS_PREFIX}/apiParameters`,
    API_HEADERS: `${exports.DECORATORS_PREFIX}/apiHeaders`,
    API_MODEL_PROPERTIES: `${exports.DECORATORS_PREFIX}/apiModelProperties`,
    API_MODEL_PROPERTIES_ARRAY: `${exports.DECORATORS_PREFIX}/apiModelPropertiesArray`,
    API_SECURITY: `${exports.DECORATORS_PREFIX}/apiSecurity`,
    API_EXCLUDE_ENDPOINT: `${exports.DECORATORS_PREFIX}/apiExcludeEndpoint`,
    API_EXCLUDE_CONTROLLER: `${exports.DECORATORS_PREFIX}/apiExcludeController`,
    API_EXTRA_MODELS: `${exports.DECORATORS_PREFIX}/apiExtraModels`,
    API_EXTENSION: `${exports.DECORATORS_PREFIX}/apiExtension`,
    API_SCHEMA: `${exports.DECORATORS_PREFIX}/apiSchema`,
    API_DEFAULT_GETTER: `${exports.DECORATORS_PREFIX}/apiDefaultGetter`,
    API_LINK: `${exports.DECORATORS_PREFIX}/apiLink`
};


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendMetadata = extendMetadata;
__webpack_require__(44);
function extendMetadata(metadata, metakey, target) {
    const existingMetadata = Reflect.getMetadata(metakey, target);
    if (!existingMetadata) {
        return metadata;
    }
    return existingMetadata.concat(metadata);
}


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiBearerAuth = ApiBearerAuth;
const api_security_decorator_1 = __webpack_require__(47);
function ApiBearerAuth(name = 'bearer') {
    return (0, api_security_decorator_1.ApiSecurity)(name);
}


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiBody = ApiBody;
const lodash_1 = __webpack_require__(48);
const enum_utils_1 = __webpack_require__(53);
const helpers_1 = __webpack_require__(54);
const defaultBodyMetadata = {
    type: String,
    required: true
};
function ApiBody(options) {
    const [type, isArray] = (0, helpers_1.getTypeIsArrayTuple)(options.type, options.isArray);
    const param = Object.assign(Object.assign({ in: 'body' }, (0, lodash_1.omit)(options, 'enum')), { type,
        isArray });
    if ((0, enum_utils_1.isEnumArray)(options)) {
        (0, enum_utils_1.addEnumArraySchema)(param, options);
    }
    else if ((0, enum_utils_1.isEnumDefined)(options)) {
        (0, enum_utils_1.addEnumSchema)(param, options);
    }
    return (0, helpers_1.createParamDecorator)(param, defaultBodyMetadata);
}


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isEnumMetadata = exports.isEnumDefined = exports.isEnumArray = void 0;
exports.getEnumValues = getEnumValues;
exports.getEnumType = getEnumType;
exports.addEnumArraySchema = addEnumArraySchema;
exports.addEnumSchema = addEnumSchema;
const lodash_1 = __webpack_require__(48);
function getEnumValues(enumType) {
    if (typeof enumType === 'function') {
        return getEnumValues(enumType());
    }
    if (Array.isArray(enumType)) {
        return enumType;
    }
    if (typeof enumType !== 'object') {
        return [];
    }
    const numericValues = Object.values(enumType)
        .filter((value) => typeof value === 'number')
        .map((value) => value.toString());
    return Object.keys(enumType)
        .filter((key) => !numericValues.includes(key))
        .map((key) => enumType[key]);
}
function getEnumType(values) {
    const hasString = values.filter(lodash_1.isString).length > 0;
    return hasString ? 'string' : 'number';
}
function addEnumArraySchema(paramDefinition, decoratorOptions) {
    const paramSchema = paramDefinition.schema || {};
    paramDefinition.schema = paramSchema;
    paramSchema.type = 'array';
    delete paramDefinition.isArray;
    const enumValues = getEnumValues(decoratorOptions.enum);
    paramSchema.items = {
        type: getEnumType(enumValues),
        enum: enumValues
    };
    if (decoratorOptions.enumName) {
        paramDefinition.enumName = decoratorOptions.enumName;
    }
    if (decoratorOptions.enumSchema) {
        paramDefinition.enumSchema = decoratorOptions.enumSchema;
    }
}
function addEnumSchema(paramDefinition, decoratorOptions) {
    const paramSchema = paramDefinition.schema || {};
    const enumValues = getEnumValues(decoratorOptions.enum);
    paramDefinition.schema = paramSchema;
    paramSchema.enum = enumValues;
    paramSchema.type = getEnumType(enumValues);
    if (decoratorOptions.enumName) {
        paramDefinition.enumName = decoratorOptions.enumName;
    }
    if (decoratorOptions.enumSchema) {
        paramDefinition.enumSchema = decoratorOptions.enumSchema;
    }
}
const isEnumArray = (obj) => obj.isArray && obj.enum;
exports.isEnumArray = isEnumArray;
const isEnumDefined = (obj) => obj.enum;
exports.isEnumDefined = isEnumDefined;
const isEnumMetadata = (metadata) => { var _a; return metadata.enum || (metadata.isArray && ((_a = metadata.items) === null || _a === void 0 ? void 0 : _a['enum'])); };
exports.isEnumMetadata = isEnumMetadata;


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMethodDecorator = createMethodDecorator;
exports.createClassDecorator = createClassDecorator;
exports.createPropertyDecorator = createPropertyDecorator;
exports.createMixedDecorator = createMixedDecorator;
exports.createParamDecorator = createParamDecorator;
exports.getTypeIsArrayTuple = getTypeIsArrayTuple;
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const plugin_constants_1 = __webpack_require__(55);
const constants_2 = __webpack_require__(56);
const shared_utils_1 = __webpack_require__(10);
function createMethodDecorator(metakey, metadata, { overrideExisting } = { overrideExisting: true }) {
    return (target, key, descriptor) => {
        if (typeof metadata === 'object') {
            const prevValue = Reflect.getMetadata(metakey, descriptor.value);
            if (prevValue && !overrideExisting) {
                return descriptor;
            }
            Reflect.defineMetadata(metakey, Object.assign(Object.assign({}, prevValue), metadata), descriptor.value);
            return descriptor;
        }
        Reflect.defineMetadata(metakey, metadata, descriptor.value);
        return descriptor;
    };
}
function createClassDecorator(metakey, metadata = []) {
    return (target) => {
        const prevValue = Reflect.getMetadata(metakey, target) || [];
        Reflect.defineMetadata(metakey, [...prevValue, ...metadata], target);
        return target;
    };
}
function createPropertyDecorator(metakey, metadata, overrideExisting = true) {
    return (target, propertyKey) => {
        var _a, _b, _c, _d;
        const properties = Reflect.getMetadata(constants_1.DECORATORS.API_MODEL_PROPERTIES_ARRAY, target) || [];
        const key = `:${propertyKey}`;
        if (!properties.includes(key)) {
            Reflect.defineMetadata(constants_1.DECORATORS.API_MODEL_PROPERTIES_ARRAY, [...properties, `:${propertyKey}`], target);
        }
        const existingMetadata = Reflect.getMetadata(metakey, target, propertyKey);
        if (existingMetadata) {
            const newMetadata = (0, lodash_1.pickBy)(metadata, (0, lodash_1.negate)(lodash_1.isUndefined));
            const metadataToSave = overrideExisting
                ? Object.assign(Object.assign({}, existingMetadata), newMetadata) : Object.assign(Object.assign({}, newMetadata), existingMetadata);
            Reflect.defineMetadata(metakey, metadataToSave, target, propertyKey);
        }
        else {
            const type = (_d = (_c = (_b = (_a = target === null || target === void 0 ? void 0 : target.constructor) === null || _a === void 0 ? void 0 : _a[plugin_constants_1.METADATA_FACTORY_NAME]) === null || _b === void 0 ? void 0 : _b.call(_a)[propertyKey]) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : Reflect.getMetadata('design:type', target, propertyKey);
            Reflect.defineMetadata(metakey, Object.assign({ type }, (0, lodash_1.pickBy)(metadata, (0, lodash_1.negate)(lodash_1.isUndefined))), target, propertyKey);
        }
    };
}
function createMixedDecorator(metakey, metadata) {
    return (target, key, descriptor) => {
        if (descriptor) {
            let metadatas;
            if (Array.isArray(metadata)) {
                const previousMetadata = Reflect.getMetadata(metakey, descriptor.value) || [];
                metadatas = [...previousMetadata, ...metadata];
            }
            else {
                const previousMetadata = Reflect.getMetadata(metakey, descriptor.value) || {};
                metadatas = Object.assign(Object.assign({}, previousMetadata), metadata);
            }
            Reflect.defineMetadata(metakey, metadatas, descriptor.value);
            return descriptor;
        }
        let metadatas;
        if (Array.isArray(metadata)) {
            const previousMetadata = Reflect.getMetadata(metakey, target) || [];
            metadatas = [...previousMetadata, ...metadata];
        }
        else {
            const previousMetadata = Reflect.getMetadata(metakey, target) || {};
            metadatas = Object.assign(Object.assign({}, previousMetadata), metadata);
        }
        Reflect.defineMetadata(metakey, metadatas, target);
        return target;
    };
}
function createParamDecorator(metadata, initial) {
    return (target, key, descriptor) => {
        const paramOptions = Object.assign(Object.assign({}, initial), (0, lodash_1.pickBy)(metadata, (0, lodash_1.negate)(lodash_1.isUndefined)));
        if (descriptor) {
            const parameters = Reflect.getMetadata(constants_1.DECORATORS.API_PARAMETERS, descriptor.value) || [];
            Reflect.defineMetadata(constants_1.DECORATORS.API_PARAMETERS, [...parameters, paramOptions], descriptor.value);
            return descriptor;
        }
        if (typeof target === 'object') {
            return target;
        }
        const propertyKeys = Object.getOwnPropertyNames(target.prototype);
        for (const propertyKey of propertyKeys) {
            if ((0, shared_utils_1.isConstructor)(propertyKey)) {
                continue;
            }
            const methodDescriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyKey);
            if (!methodDescriptor) {
                continue;
            }
            const isApiMethod = Reflect.hasMetadata(constants_2.METHOD_METADATA, methodDescriptor.value);
            if (!isApiMethod) {
                continue;
            }
            const parameters = Reflect.getMetadata(constants_1.DECORATORS.API_PARAMETERS, methodDescriptor.value) || [];
            Reflect.defineMetadata(constants_1.DECORATORS.API_PARAMETERS, [...parameters, paramOptions], methodDescriptor.value);
        }
    };
}
function getTypeIsArrayTuple(input, isArrayFlag) {
    if (!input) {
        return [input, isArrayFlag];
    }
    if (isArrayFlag) {
        return [input, isArrayFlag];
    }
    const isInputArray = (0, lodash_1.isArray)(input);
    const type = isInputArray ? input[0] : input;
    return [type, isInputArray];
}


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.METADATA_FACTORY_NAME = exports.OPENAPI_PACKAGE_NAME = exports.OPENAPI_NAMESPACE = void 0;
exports.OPENAPI_NAMESPACE = 'openapi';
exports.OPENAPI_PACKAGE_NAME = '@nestjs/swagger';
exports.METADATA_FACTORY_NAME = '_OPENAPI_METADATA_FACTORY';


/***/ }),
/* 56 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/constants");

/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiConsumes = ApiConsumes;
const constants_1 = __webpack_require__(49);
const helpers_1 = __webpack_require__(54);
function ApiConsumes(...mimeTypes) {
    return (0, helpers_1.createMixedDecorator)(constants_1.DECORATORS.API_CONSUMES, mimeTypes);
}


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiCookieAuth = ApiCookieAuth;
const api_security_decorator_1 = __webpack_require__(47);
function ApiCookieAuth(name = 'cookie') {
    return (0, api_security_decorator_1.ApiSecurity)(name);
}


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiDefaultGetter = ApiDefaultGetter;
const constants_1 = __webpack_require__(49);
function ApiDefaultGetter(type, parameter) {
    return (prototype, key, descriptor) => {
        if (type.prototype) {
            Reflect.defineMetadata(constants_1.DECORATORS.API_DEFAULT_GETTER, { getter: descriptor.value, parameter, prototype }, type.prototype);
        }
        return descriptor;
    };
}


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiExcludeEndpoint = ApiExcludeEndpoint;
const constants_1 = __webpack_require__(49);
const helpers_1 = __webpack_require__(54);
function ApiExcludeEndpoint(disable = true) {
    return (0, helpers_1.createMethodDecorator)(constants_1.DECORATORS.API_EXCLUDE_ENDPOINT, {
        disable
    });
}


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiExcludeController = ApiExcludeController;
const constants_1 = __webpack_require__(49);
const helpers_1 = __webpack_require__(54);
function ApiExcludeController(disable = true) {
    return (0, helpers_1.createClassDecorator)(constants_1.DECORATORS.API_EXCLUDE_CONTROLLER, [disable]);
}


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiExtraModels = ApiExtraModels;
const constants_1 = __webpack_require__(49);
function ApiExtraModels(...models) {
    return (target, key, descriptor) => {
        if (descriptor) {
            const extraModels = Reflect.getMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, descriptor.value) ||
                [];
            Reflect.defineMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, [...extraModels, ...models], descriptor.value);
            return descriptor;
        }
        const extraModels = Reflect.getMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, target) || [];
        Reflect.defineMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, [...extraModels, ...models], target);
        return target;
    };
}


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiHeaders = void 0;
exports.ApiHeader = ApiHeader;
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const enum_utils_1 = __webpack_require__(53);
const helpers_1 = __webpack_require__(54);
const defaultHeaderOptions = {
    name: ''
};
function ApiHeader(options) {
    const param = (0, lodash_1.pickBy)({
        name: (0, lodash_1.isNil)(options.name) ? defaultHeaderOptions.name : options.name,
        in: 'header',
        description: options.description,
        required: options.required,
        examples: options.examples,
        schema: Object.assign({ type: 'string' }, (options.schema || {}))
    }, (0, lodash_1.negate)(lodash_1.isUndefined));
    if (options.enum) {
        const enumValues = (0, enum_utils_1.getEnumValues)(options.enum);
        param.schema = Object.assign(Object.assign({}, param.schema), { enum: enumValues, type: (0, enum_utils_1.getEnumType)(enumValues) });
    }
    return (target, key, descriptor) => {
        if (descriptor) {
            return (0, helpers_1.createParamDecorator)(param, defaultHeaderOptions)(target, key, descriptor);
        }
        return (0, helpers_1.createClassDecorator)(constants_1.DECORATORS.API_HEADERS, [param])(target);
    };
}
const ApiHeaders = (headers) => {
    return (target, key, descriptor) => {
        headers.forEach((options) => ApiHeader(options)(target, key, descriptor));
    };
};
exports.ApiHeaders = ApiHeaders;


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiHideProperty = ApiHideProperty;
function ApiHideProperty() {
    return (target, propertyKey) => { };
}


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiLink = ApiLink;
const constants_1 = __webpack_require__(49);
function ApiLink({ from, fromField = 'id', routeParam }) {
    return (controllerPrototype, key, descriptor) => {
        var _a;
        const { prototype } = from;
        if (prototype) {
            const links = (_a = Reflect.getMetadata(constants_1.DECORATORS.API_LINK, prototype)) !== null && _a !== void 0 ? _a : [];
            links.push({
                method: descriptor.value,
                prototype: controllerPrototype,
                field: fromField,
                parameter: routeParam
            });
            Reflect.defineMetadata(constants_1.DECORATORS.API_LINK, links, prototype);
        }
        return descriptor;
    };
}


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiOAuth2 = ApiOAuth2;
const api_security_decorator_1 = __webpack_require__(47);
function ApiOAuth2(scopes, name = 'oauth2') {
    return (0, api_security_decorator_1.ApiSecurity)(name, scopes);
}


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiOperation = ApiOperation;
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const helpers_1 = __webpack_require__(54);
const defaultOperationOptions = {
    summary: ''
};
function ApiOperation(options, { overrideExisting } = { overrideExisting: true }) {
    return (0, helpers_1.createMethodDecorator)(constants_1.DECORATORS.API_OPERATION, (0, lodash_1.pickBy)(Object.assign(Object.assign({}, defaultOperationOptions), options), (0, lodash_1.negate)(lodash_1.isUndefined)), { overrideExisting });
}


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiParam = ApiParam;
const lodash_1 = __webpack_require__(48);
const enum_utils_1 = __webpack_require__(53);
const helpers_1 = __webpack_require__(54);
const defaultParamOptions = {
    name: '',
    required: true
};
function ApiParam(options) {
    const param = Object.assign({ name: (0, lodash_1.isNil)(options.name) ? defaultParamOptions.name : options.name, in: 'path' }, (0, lodash_1.omit)(options, 'enum'));
    if ((0, enum_utils_1.isEnumDefined)(options)) {
        (0, enum_utils_1.addEnumSchema)(param, options);
    }
    return (0, helpers_1.createParamDecorator)(param, defaultParamOptions);
}


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiProduces = ApiProduces;
const constants_1 = __webpack_require__(49);
const helpers_1 = __webpack_require__(54);
function ApiProduces(...mimeTypes) {
    return (0, helpers_1.createMixedDecorator)(constants_1.DECORATORS.API_PRODUCES, mimeTypes);
}


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiProperty = ApiProperty;
exports.createApiPropertyDecorator = createApiPropertyDecorator;
exports.ApiPropertyOptional = ApiPropertyOptional;
exports.ApiResponseProperty = ApiResponseProperty;
const constants_1 = __webpack_require__(49);
const enum_utils_1 = __webpack_require__(53);
const helpers_1 = __webpack_require__(54);
const isEnumArray = (opts) => opts.isArray && 'enum' in opts;
function ApiProperty(options = {}) {
    return createApiPropertyDecorator(options);
}
function createApiPropertyDecorator(options = {}, overrideExisting = true) {
    const [type, isArray] = (0, helpers_1.getTypeIsArrayTuple)(options.type, options.isArray);
    options = Object.assign(Object.assign({}, options), { type,
        isArray });
    if (isEnumArray(options)) {
        options.type = 'array';
        const enumValues = (0, enum_utils_1.getEnumValues)(options.enum);
        options.items = {
            type: (0, enum_utils_1.getEnumType)(enumValues),
            enum: enumValues
        };
        delete options.enum;
    }
    else if ('enum' in options && options.enum !== undefined) {
        const enumValues = (0, enum_utils_1.getEnumValues)(options.enum);
        options.enum = enumValues;
        options.type = (0, enum_utils_1.getEnumType)(enumValues);
    }
    if (Array.isArray(options.type)) {
        options.type = 'array';
        options.items = {
            type: 'array',
            items: {
                type: options.type[0]
            }
        };
    }
    return (0, helpers_1.createPropertyDecorator)(constants_1.DECORATORS.API_MODEL_PROPERTIES, options, overrideExisting);
}
function ApiPropertyOptional(options = {}) {
    return ApiProperty(Object.assign(Object.assign({}, options), { required: false }));
}
function ApiResponseProperty(options = {}) {
    return ApiProperty(Object.assign({ readOnly: true }, options));
}


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiQuery = ApiQuery;
const lodash_1 = __webpack_require__(48);
const enum_utils_1 = __webpack_require__(53);
const helpers_1 = __webpack_require__(54);
const defaultQueryOptions = {
    name: '',
    required: true
};
function ApiQuery(options) {
    const apiQueryMetadata = options;
    const [type, isArray] = (0, helpers_1.getTypeIsArrayTuple)(apiQueryMetadata.type, apiQueryMetadata.isArray);
    const param = Object.assign(Object.assign({ name: 'name' in options ? options.name : defaultQueryOptions.name, in: 'query' }, (0, lodash_1.omit)(options, 'enum')), { type });
    if ((0, enum_utils_1.isEnumArray)(options)) {
        (0, enum_utils_1.addEnumArraySchema)(param, options);
    }
    else if ((0, enum_utils_1.isEnumDefined)(options)) {
        (0, enum_utils_1.addEnumSchema)(param, options);
    }
    if (isArray) {
        param.isArray = isArray;
    }
    return (0, helpers_1.createParamDecorator)(param, defaultQueryOptions);
}


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiDefaultResponse = exports.ApiHttpVersionNotSupportedResponse = exports.ApiGatewayTimeoutResponse = exports.ApiServiceUnavailableResponse = exports.ApiBadGatewayResponse = exports.ApiNotImplementedResponse = exports.ApiInternalServerErrorResponse = exports.ApiTooManyRequestsResponse = exports.ApiPreconditionRequiredResponse = exports.ApiFailedDependencyResponse = exports.ApiUnprocessableEntityResponse = exports.ApiMisdirectedResponse = exports.ApiIAmATeapotResponse = exports.ApiExpectationFailedResponse = exports.ApiRequestedRangeNotSatisfiableResponse = exports.ApiUnsupportedMediaTypeResponse = exports.ApiUriTooLongResponse = exports.ApiPayloadTooLargeResponse = exports.ApiPreconditionFailedResponse = exports.ApiLengthRequiredResponse = exports.ApiGoneResponse = exports.ApiConflictResponse = exports.ApiRequestTimeoutResponse = exports.ApiProxyAuthenticationRequiredResponse = exports.ApiNotAcceptableResponse = exports.ApiMethodNotAllowedResponse = exports.ApiNotFoundResponse = exports.ApiForbiddenResponse = exports.ApiPaymentRequiredResponse = exports.ApiUnauthorizedResponse = exports.ApiBadRequestResponse = exports.ApiPermanentRedirectResponse = exports.ApiTemporaryRedirectResponse = exports.ApiNotModifiedResponse = exports.ApiSeeOtherResponse = exports.ApiFoundResponse = exports.ApiMovedPermanentlyResponse = exports.ApiAmbiguousResponse = exports.ApiPartialContentResponse = exports.ApiResetContentResponse = exports.ApiNoContentResponse = exports.ApiNonAuthoritativeInformationResponse = exports.ApiAcceptedResponse = exports.ApiCreatedResponse = exports.ApiOkResponse = exports.ApiEarlyhintsResponse = exports.ApiProcessingResponse = exports.ApiSwitchingProtocolsResponse = exports.ApiContinueResponse = void 0;
exports.ApiResponse = ApiResponse;
const common_1 = __webpack_require__(3);
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const helpers_1 = __webpack_require__(54);
function ApiResponse(options, { overrideExisting } = { overrideExisting: true }) {
    const apiResponseMetadata = options;
    const [type, isArray] = (0, helpers_1.getTypeIsArrayTuple)(apiResponseMetadata.type, apiResponseMetadata.isArray);
    apiResponseMetadata.type = type;
    apiResponseMetadata.isArray = isArray;
    options.description = options.description ? options.description : '';
    const groupedMetadata = {
        [options.status || 'default']: (0, lodash_1.omit)(options, 'status')
    };
    return (target, key, descriptor) => {
        if (descriptor) {
            const responses = Reflect.getMetadata(constants_1.DECORATORS.API_RESPONSE, descriptor.value);
            if (responses && !overrideExisting) {
                return descriptor;
            }
            Reflect.defineMetadata(constants_1.DECORATORS.API_RESPONSE, Object.assign(Object.assign({}, responses), groupedMetadata), descriptor.value);
            return descriptor;
        }
        const responses = Reflect.getMetadata(constants_1.DECORATORS.API_RESPONSE, target);
        if (responses && !overrideExisting) {
            return descriptor;
        }
        Reflect.defineMetadata(constants_1.DECORATORS.API_RESPONSE, Object.assign(Object.assign({}, responses), groupedMetadata), target);
        return target;
    };
}
const decorators = {};
const statusList = Object.keys(common_1.HttpStatus)
    .filter((key) => !isNaN(Number(common_1.HttpStatus[key])))
    .map((key) => {
    const functionName = key
        .split('_')
        .map((strToken) => `${strToken[0].toUpperCase()}${strToken.slice(1).toLowerCase()}`)
        .join('');
    return {
        code: Number(common_1.HttpStatus[key]),
        functionName: `Api${functionName}Response`
    };
});
statusList.forEach(({ code, functionName }) => {
    decorators[functionName] = function (options = {}) {
        return ApiResponse(Object.assign(Object.assign({}, options), { status: code }));
    };
});
exports.ApiContinueResponse = decorators.ApiContinueResponse, exports.ApiSwitchingProtocolsResponse = decorators.ApiSwitchingProtocolsResponse, exports.ApiProcessingResponse = decorators.ApiProcessingResponse, exports.ApiEarlyhintsResponse = decorators.ApiEarlyhintsResponse, exports.ApiOkResponse = decorators.ApiOkResponse, exports.ApiCreatedResponse = decorators.ApiCreatedResponse, exports.ApiAcceptedResponse = decorators.ApiAcceptedResponse, exports.ApiNonAuthoritativeInformationResponse = decorators.ApiNonAuthoritativeInformationResponse, exports.ApiNoContentResponse = decorators.ApiNoContentResponse, exports.ApiResetContentResponse = decorators.ApiResetContentResponse, exports.ApiPartialContentResponse = decorators.ApiPartialContentResponse, exports.ApiAmbiguousResponse = decorators.ApiAmbiguousResponse, exports.ApiMovedPermanentlyResponse = decorators.ApiMovedPermanentlyResponse, exports.ApiFoundResponse = decorators.ApiFoundResponse, exports.ApiSeeOtherResponse = decorators.ApiSeeOtherResponse, exports.ApiNotModifiedResponse = decorators.ApiNotModifiedResponse, exports.ApiTemporaryRedirectResponse = decorators.ApiTemporaryRedirectResponse, exports.ApiPermanentRedirectResponse = decorators.ApiPermanentRedirectResponse, exports.ApiBadRequestResponse = decorators.ApiBadRequestResponse, exports.ApiUnauthorizedResponse = decorators.ApiUnauthorizedResponse, exports.ApiPaymentRequiredResponse = decorators.ApiPaymentRequiredResponse, exports.ApiForbiddenResponse = decorators.ApiForbiddenResponse, exports.ApiNotFoundResponse = decorators.ApiNotFoundResponse, exports.ApiMethodNotAllowedResponse = decorators.ApiMethodNotAllowedResponse, exports.ApiNotAcceptableResponse = decorators.ApiNotAcceptableResponse, exports.ApiProxyAuthenticationRequiredResponse = decorators.ApiProxyAuthenticationRequiredResponse, exports.ApiRequestTimeoutResponse = decorators.ApiRequestTimeoutResponse, exports.ApiConflictResponse = decorators.ApiConflictResponse, exports.ApiGoneResponse = decorators.ApiGoneResponse, exports.ApiLengthRequiredResponse = decorators.ApiLengthRequiredResponse, exports.ApiPreconditionFailedResponse = decorators.ApiPreconditionFailedResponse, exports.ApiPayloadTooLargeResponse = decorators.ApiPayloadTooLargeResponse, exports.ApiUriTooLongResponse = decorators.ApiUriTooLongResponse, exports.ApiUnsupportedMediaTypeResponse = decorators.ApiUnsupportedMediaTypeResponse, exports.ApiRequestedRangeNotSatisfiableResponse = decorators.ApiRequestedRangeNotSatisfiableResponse, exports.ApiExpectationFailedResponse = decorators.ApiExpectationFailedResponse, exports.ApiIAmATeapotResponse = decorators.ApiIAmATeapotResponse, exports.ApiMisdirectedResponse = decorators.ApiMisdirectedResponse, exports.ApiUnprocessableEntityResponse = decorators.ApiUnprocessableEntityResponse, exports.ApiFailedDependencyResponse = decorators.ApiFailedDependencyResponse, exports.ApiPreconditionRequiredResponse = decorators.ApiPreconditionRequiredResponse, exports.ApiTooManyRequestsResponse = decorators.ApiTooManyRequestsResponse, exports.ApiInternalServerErrorResponse = decorators.ApiInternalServerErrorResponse, exports.ApiNotImplementedResponse = decorators.ApiNotImplementedResponse, exports.ApiBadGatewayResponse = decorators.ApiBadGatewayResponse, exports.ApiServiceUnavailableResponse = decorators.ApiServiceUnavailableResponse, exports.ApiGatewayTimeoutResponse = decorators.ApiGatewayTimeoutResponse, exports.ApiHttpVersionNotSupportedResponse = decorators.ApiHttpVersionNotSupportedResponse;
const ApiDefaultResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: 'default' }));
exports.ApiDefaultResponse = ApiDefaultResponse;


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiTags = ApiTags;
const constants_1 = __webpack_require__(49);
const helpers_1 = __webpack_require__(54);
function ApiTags(...tags) {
    return (0, helpers_1.createMixedDecorator)(constants_1.DECORATORS.API_TAGS, tags);
}


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiCallbacks = ApiCallbacks;
const constants_1 = __webpack_require__(49);
const helpers_1 = __webpack_require__(54);
function ApiCallbacks(...callbackObject) {
    return (0, helpers_1.createMixedDecorator)(constants_1.DECORATORS.API_CALLBACKS, callbackObject);
}


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiExtension = ApiExtension;
const constants_1 = __webpack_require__(49);
const helpers_1 = __webpack_require__(54);
const lodash_1 = __webpack_require__(48);
function ApiExtension(extensionKey, extensionProperties) {
    if (!extensionKey.startsWith('x-')) {
        throw new Error('Extension key is not prefixed. Please ensure you prefix it with `x-`.');
    }
    const extensionObject = {
        [extensionKey]: (0, lodash_1.clone)(extensionProperties)
    };
    return (0, helpers_1.createMixedDecorator)(constants_1.DECORATORS.API_EXTENSION, extensionObject);
}


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiSchema = ApiSchema;
const constants_1 = __webpack_require__(49);
const helpers_1 = __webpack_require__(54);
function ApiSchema(options) {
    return (0, helpers_1.createClassDecorator)(constants_1.DECORATORS.API_SCHEMA, [options]);
}


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentBuilder = void 0;
const common_1 = __webpack_require__(3);
const lodash_1 = __webpack_require__(48);
const document_base_1 = __webpack_require__(78);
const global_parameters_storage_1 = __webpack_require__(79);
class DocumentBuilder {
    constructor() {
        this.logger = new common_1.Logger(DocumentBuilder.name);
        this.document = (0, document_base_1.buildDocumentBase)();
    }
    setTitle(title) {
        this.document.info.title = title;
        return this;
    }
    setDescription(description) {
        this.document.info.description = description;
        return this;
    }
    setVersion(version) {
        this.document.info.version = version;
        return this;
    }
    setTermsOfService(termsOfService) {
        this.document.info.termsOfService = termsOfService;
        return this;
    }
    setContact(name, url, email) {
        this.document.info.contact = { name, url, email };
        return this;
    }
    setLicense(name, url) {
        this.document.info.license = { name, url };
        return this;
    }
    setOpenAPIVersion(version) {
        if (version.match(/^\d\.\d\.\d$/)) {
            this.document.openapi = version;
        }
        else {
            this.logger.warn('The OpenApi version is invalid. Expecting format "x.x.x"');
        }
        return this;
    }
    addServer(url, description, variables) {
        this.document.servers.push({ url, description, variables });
        return this;
    }
    setExternalDoc(description, url) {
        this.document.externalDocs = { description, url };
        return this;
    }
    setBasePath(path) {
        this.logger.warn('The "setBasePath" method has been deprecated. Now, a global prefix is populated automatically. If you want to ignore it, take a look here: https://docs.nestjs.com/recipes/swagger#global-prefix. Alternatively, you can use "addServer" method to set up multiple different paths.');
        return this;
    }
    addTag(name, description = '', externalDocs) {
        this.document.tags = this.document.tags.concat((0, lodash_1.pickBy)({
            name,
            description,
            externalDocs
        }, (0, lodash_1.negate)(lodash_1.isUndefined)));
        return this;
    }
    addExtension(extensionKey, extensionProperties) {
        if (!extensionKey.startsWith('x-')) {
            throw new Error('Extension key is not prefixed. Please ensure you prefix it with `x-`.');
        }
        this.document[extensionKey] = (0, lodash_1.clone)(extensionProperties);
        return this;
    }
    addSecurity(name, options) {
        this.document.components.securitySchemes = Object.assign(Object.assign({}, (this.document.components.securitySchemes || {})), { [name]: options });
        return this;
    }
    addGlobalParameters(...parameters) {
        global_parameters_storage_1.GlobalParametersStorage.add(...parameters);
        return this;
    }
    addSecurityRequirements(name, requirements = []) {
        let securityRequirement;
        if ((0, lodash_1.isString)(name)) {
            securityRequirement = { [name]: requirements };
        }
        else {
            securityRequirement = name;
        }
        this.document.security = (this.document.security || []).concat(Object.assign({}, securityRequirement));
        return this;
    }
    addBearerAuth(options = {
        type: 'http'
    }, name = 'bearer') {
        this.addSecurity(name, Object.assign({ scheme: 'bearer', bearerFormat: 'JWT' }, options));
        return this;
    }
    addOAuth2(options = {
        type: 'oauth2'
    }, name = 'oauth2') {
        this.addSecurity(name, Object.assign({ type: 'oauth2', flows: {} }, options));
        return this;
    }
    addApiKey(options = {
        type: 'apiKey'
    }, name = 'api_key') {
        this.addSecurity(name, Object.assign({ type: 'apiKey', in: 'header', name }, options));
        return this;
    }
    addBasicAuth(options = {
        type: 'http'
    }, name = 'basic') {
        this.addSecurity(name, Object.assign({ type: 'http', scheme: 'basic' }, options));
        return this;
    }
    addCookieAuth(cookieName = 'connect.sid', options = {
        type: 'apiKey'
    }, securityName = 'cookie') {
        this.addSecurity(securityName, Object.assign({ type: 'apiKey', in: 'cookie', name: cookieName }, options));
        return this;
    }
    build() {
        return this.document;
    }
}
exports.DocumentBuilder = DocumentBuilder;


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildDocumentBase = void 0;
const buildDocumentBase = () => ({
    openapi: '3.0.0',
    info: {
        title: '',
        description: '',
        version: '1.0.0',
        contact: {}
    },
    tags: [],
    servers: [],
    components: {}
});
exports.buildDocumentBase = buildDocumentBase;


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalParametersStorage = exports.GlobalParametersStorageHost = void 0;
class GlobalParametersStorageHost {
    constructor() {
        this.parameters = new Array();
    }
    add(...parameters) {
        this.parameters.push(...parameters);
    }
    getAll() {
        return this.parameters;
    }
    clear() {
        this.parameters = [];
    }
}
exports.GlobalParametersStorageHost = GlobalParametersStorageHost;
const globalRef = global;
exports.GlobalParametersStorage = globalRef.SwaggerGlobalParametersStorage ||
    (globalRef.SwaggerGlobalParametersStorage =
        new GlobalParametersStorageHost());


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(81), exports);
__exportStar(__webpack_require__(82), exports);


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerModule = void 0;
const jsyaml = __webpack_require__(84);
const metadata_loader_1 = __webpack_require__(85);
const swagger_scanner_1 = __webpack_require__(86);
const swagger_ui_1 = __webpack_require__(123);
const assign_two_levels_deep_1 = __webpack_require__(128);
const get_global_prefix_1 = __webpack_require__(121);
const normalize_rel_path_1 = __webpack_require__(129);
const resolve_path_util_1 = __webpack_require__(130);
const validate_global_prefix_util_1 = __webpack_require__(131);
const validate_path_util_1 = __webpack_require__(132);
class SwaggerModule {
    static createDocument(app, config, options = {}) {
        const swaggerScanner = new swagger_scanner_1.SwaggerScanner();
        const document = swaggerScanner.scanApplication(app, options);
        document.components = (0, assign_two_levels_deep_1.assignTwoLevelsDeep)({}, config.components, document.components);
        return Object.assign(Object.assign({ openapi: '3.0.0', paths: {} }, config), document);
    }
    static loadPluginMetadata(metadataFn) {
        return __awaiter(this, void 0, void 0, function* () {
            const metadata = yield metadataFn();
            return this.metadataLoader.load(metadata);
        });
    }
    static serveStatic(finalPath, app, customStaticPath) {
        const httpAdapter = app.getHttpAdapter();
        const swaggerAssetsPath = customStaticPath
            ? (0, resolve_path_util_1.resolvePath)(customStaticPath)
            : (0, swagger_ui_1.getSwaggerAssetsAbsoluteFSPath)();
        if (httpAdapter && httpAdapter.getType() === 'fastify') {
            app.useStaticAssets({
                root: swaggerAssetsPath,
                prefix: finalPath,
                decorateReply: false
            });
        }
        else {
            app.useStaticAssets(swaggerAssetsPath, {
                prefix: finalPath
            });
        }
    }
    static serveDocuments(finalPath, urlLastSubdirectory, httpAdapter, documentOrFactory, options) {
        let document;
        const getBuiltDocument = () => {
            if (!document) {
                document =
                    typeof documentOrFactory === 'function'
                        ? documentOrFactory()
                        : documentOrFactory;
            }
            return document;
        };
        if (options.ui) {
            this.serveSwaggerUi(finalPath, urlLastSubdirectory, httpAdapter, getBuiltDocument, options.swaggerOptions);
        }
        if (options.raw === true ||
            (Array.isArray(options.raw) && options.raw.length > 0)) {
            const serveJson = options.raw === true || options.raw.includes('json');
            const serveYaml = options.raw === true || options.raw.includes('yaml');
            this.serveDefinitions(httpAdapter, getBuiltDocument, options, {
                serveJson,
                serveYaml
            });
        }
    }
    static serveSwaggerUi(finalPath, urlLastSubdirectory, httpAdapter, getBuiltDocument, swaggerOptions) {
        const baseUrlForSwaggerUI = (0, normalize_rel_path_1.normalizeRelPath)(`./${urlLastSubdirectory}/`);
        let swaggerUiHtml;
        let swaggerUiInitJS;
        httpAdapter.get((0, normalize_rel_path_1.normalizeRelPath)(`${finalPath}/swagger-ui-init.js`), (req, res) => {
            res.type('application/javascript');
            const document = getBuiltDocument();
            if (swaggerOptions.patchDocumentOnRequest) {
                const documentToSerialize = swaggerOptions.patchDocumentOnRequest(req, res, document);
                const swaggerInitJsPerRequest = (0, swagger_ui_1.buildSwaggerInitJS)(documentToSerialize, swaggerOptions);
                return res.send(swaggerInitJsPerRequest);
            }
            if (!swaggerUiInitJS) {
                swaggerUiInitJS = (0, swagger_ui_1.buildSwaggerInitJS)(document, swaggerOptions);
            }
            res.send(swaggerUiInitJS);
        });
        try {
            httpAdapter.get((0, normalize_rel_path_1.normalizeRelPath)(`${finalPath}/${urlLastSubdirectory}/swagger-ui-init.js`), (req, res) => {
                res.type('application/javascript');
                const document = getBuiltDocument();
                if (swaggerOptions.patchDocumentOnRequest) {
                    const documentToSerialize = swaggerOptions.patchDocumentOnRequest(req, res, document);
                    const swaggerInitJsPerRequest = (0, swagger_ui_1.buildSwaggerInitJS)(documentToSerialize, swaggerOptions);
                    return res.send(swaggerInitJsPerRequest);
                }
                if (!swaggerUiInitJS) {
                    swaggerUiInitJS = (0, swagger_ui_1.buildSwaggerInitJS)(document, swaggerOptions);
                }
                res.send(swaggerUiInitJS);
            });
        }
        catch (err) {
        }
        function serveSwaggerHtml(_, res) {
            res.type('text/html');
            if (!swaggerUiHtml) {
                swaggerUiHtml = (0, swagger_ui_1.buildSwaggerHTML)(baseUrlForSwaggerUI, swaggerOptions);
            }
            res.send(swaggerUiHtml);
        }
        httpAdapter.get(finalPath, serveSwaggerHtml);
        httpAdapter.get(`${finalPath}/index.html`, serveSwaggerHtml);
        try {
            httpAdapter.get((0, normalize_rel_path_1.normalizeRelPath)(`${finalPath}/`), serveSwaggerHtml);
        }
        catch (err) {
        }
    }
    static serveDefinitions(httpAdapter, getBuiltDocument, options, serveOptions) {
        if (serveOptions.serveJson) {
            httpAdapter.get((0, normalize_rel_path_1.normalizeRelPath)(options.jsonDocumentUrl), (req, res) => {
                res.type('application/json');
                const document = getBuiltDocument();
                const documentToSerialize = options.swaggerOptions
                    .patchDocumentOnRequest
                    ? options.swaggerOptions.patchDocumentOnRequest(req, res, document)
                    : document;
                res.send(JSON.stringify(documentToSerialize));
            });
        }
        if (serveOptions.serveYaml) {
            httpAdapter.get((0, normalize_rel_path_1.normalizeRelPath)(options.yamlDocumentUrl), (req, res) => {
                res.type('text/yaml');
                const document = getBuiltDocument();
                const documentToSerialize = options.swaggerOptions
                    .patchDocumentOnRequest
                    ? options.swaggerOptions.patchDocumentOnRequest(req, res, document)
                    : document;
                const yamlDocument = jsyaml.dump(documentToSerialize, {
                    skipInvalid: true,
                    noRefs: true
                });
                res.send(yamlDocument);
            });
        }
    }
    static setup(path, app, documentOrFactory, options) {
        var _a, _b, _c;
        const globalPrefix = (0, get_global_prefix_1.getGlobalPrefix)(app);
        const finalPath = (0, validate_path_util_1.validatePath)((options === null || options === void 0 ? void 0 : options.useGlobalPrefix) && (0, validate_global_prefix_util_1.validateGlobalPrefix)(globalPrefix)
            ? `${globalPrefix}${(0, validate_path_util_1.validatePath)(path)}`
            : path);
        const urlLastSubdirectory = finalPath.split('/').slice(-1).pop() || '';
        const validatedGlobalPrefix = (options === null || options === void 0 ? void 0 : options.useGlobalPrefix) && (0, validate_global_prefix_util_1.validateGlobalPrefix)(globalPrefix)
            ? (0, validate_path_util_1.validatePath)(globalPrefix)
            : '';
        const finalJSONDocumentPath = (options === null || options === void 0 ? void 0 : options.jsonDocumentUrl)
            ? `${validatedGlobalPrefix}${(0, validate_path_util_1.validatePath)(options.jsonDocumentUrl)}`
            : `${finalPath}-json`;
        const finalYAMLDocumentPath = (options === null || options === void 0 ? void 0 : options.yamlDocumentUrl)
            ? `${validatedGlobalPrefix}${(0, validate_path_util_1.validatePath)(options.yamlDocumentUrl)}`
            : `${finalPath}-yaml`;
        const ui = (_b = (_a = options === null || options === void 0 ? void 0 : options.ui) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.swaggerUiEnabled) !== null && _b !== void 0 ? _b : true;
        const raw = (_c = options === null || options === void 0 ? void 0 : options.raw) !== null && _c !== void 0 ? _c : true;
        const httpAdapter = app.getHttpAdapter();
        SwaggerModule.serveDocuments(finalPath, urlLastSubdirectory, httpAdapter, documentOrFactory, {
            ui,
            raw,
            jsonDocumentUrl: finalJSONDocumentPath,
            yamlDocumentUrl: finalYAMLDocumentPath,
            swaggerOptions: options || {}
        });
        if (ui) {
            SwaggerModule.serveStatic(finalPath, app, options === null || options === void 0 ? void 0 : options.customSwaggerUiPath);
            const serveStaticSlashEndingPath = `${finalPath}/${urlLastSubdirectory}`;
            if (serveStaticSlashEndingPath !== finalPath) {
                SwaggerModule.serveStatic(serveStaticSlashEndingPath, app);
            }
        }
    }
}
exports.SwaggerModule = SwaggerModule;
SwaggerModule.metadataLoader = new metadata_loader_1.MetadataLoader();


/***/ }),
/* 84 */
/***/ ((module) => {

"use strict";
module.exports = require("js-yaml");

/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataLoader = void 0;
const plugin_constants_1 = __webpack_require__(55);
class MetadataLoader {
    static addRefreshHook(hook) {
        return MetadataLoader.refreshHooks.push(hook);
    }
    load(metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const pkgMetadata = metadata['@nestjs/swagger'];
            if (!pkgMetadata) {
                return;
            }
            const { models, controllers } = pkgMetadata;
            if (models) {
                yield this.applyMetadata(models);
            }
            if (controllers) {
                yield this.applyMetadata(controllers);
            }
            this.runHooks();
        });
    }
    applyMetadata(meta) {
        return __awaiter(this, void 0, void 0, function* () {
            const loadPromises = meta.map((_a) => __awaiter(this, [_a], void 0, function* ([fileImport, fileMeta]) {
                const fileRef = yield fileImport;
                Object.keys(fileMeta).map((key) => {
                    const clsRef = fileRef[key];
                    clsRef[plugin_constants_1.METADATA_FACTORY_NAME] = () => fileMeta[key];
                });
            }));
            yield Promise.all(loadPromises);
        });
    }
    runHooks() {
        MetadataLoader.refreshHooks.forEach((hook) => hook());
    }
}
exports.MetadataLoader = MetadataLoader;
MetadataLoader.refreshHooks = new Array();


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerScanner = void 0;
const constants_1 = __webpack_require__(56);
const lodash_1 = __webpack_require__(48);
const model_properties_accessor_1 = __webpack_require__(87);
const schema_object_factory_1 = __webpack_require__(88);
const swagger_types_mapper_1 = __webpack_require__(96);
const swagger_explorer_1 = __webpack_require__(97);
const swagger_transformer_1 = __webpack_require__(119);
const get_global_prefix_1 = __webpack_require__(121);
const strip_last_slash_util_1 = __webpack_require__(122);
class SwaggerScanner {
    constructor() {
        this.transformer = new swagger_transformer_1.SwaggerTransformer();
        this.schemaObjectFactory = new schema_object_factory_1.SchemaObjectFactory(new model_properties_accessor_1.ModelPropertiesAccessor(), new swagger_types_mapper_1.SwaggerTypesMapper());
        this.explorer = new swagger_explorer_1.SwaggerExplorer(this.schemaObjectFactory);
    }
    scanApplication(app, options) {
        const { deepScanRoutes, include: includedModules = [], extraModels = [], ignoreGlobalPrefix = false, operationIdFactory, linkNameFactory, autoTagControllers = true } = options;
        const container = app.container;
        const internalConfigRef = app.config;
        const modules = this.getModules(container.getModules(), includedModules);
        const globalPrefix = !ignoreGlobalPrefix
            ? (0, strip_last_slash_util_1.stripLastSlash)((0, get_global_prefix_1.getGlobalPrefix)(app))
            : '';
        const denormalizedPaths = modules.map(({ controllers, metatype, imports }) => {
            let result = [];
            if (deepScanRoutes) {
                const isGlobal = (module) => !container.isGlobalModule(module);
                Array.from(imports.values())
                    .filter(isGlobal)
                    .forEach(({ metatype, controllers }) => {
                    const modulePath = this.getModulePathMetadata(container, metatype);
                    result = result.concat(this.scanModuleControllers(controllers, modulePath, globalPrefix, internalConfigRef, operationIdFactory, linkNameFactory, autoTagControllers));
                });
            }
            const modulePath = this.getModulePathMetadata(container, metatype);
            result = result.concat(this.scanModuleControllers(controllers, modulePath, globalPrefix, internalConfigRef, operationIdFactory, linkNameFactory, autoTagControllers));
            return this.transformer.unescapeColonsInPath(app, result);
        });
        const schemas = this.explorer.getSchemas();
        this.addExtraModels(schemas, extraModels);
        return Object.assign(Object.assign({}, this.transformer.normalizePaths((0, lodash_1.flatten)(denormalizedPaths))), { components: {
                schemas: schemas
            } });
    }
    scanModuleControllers(controller, modulePath, globalPrefix, applicationConfig, operationIdFactory, linkNameFactory, autoTagControllers) {
        const denormalizedArray = [...controller.values()].map((ctrl) => this.explorer.exploreController(ctrl, applicationConfig, modulePath, globalPrefix, operationIdFactory, linkNameFactory, autoTagControllers));
        return (0, lodash_1.flatten)(denormalizedArray);
    }
    getModules(modulesContainer, include) {
        if (!include || (0, lodash_1.isEmpty)(include)) {
            return [...modulesContainer.values()];
        }
        return [...modulesContainer.values()].filter(({ metatype }) => include.some((item) => item === metatype));
    }
    addExtraModels(schemas, extraModels) {
        extraModels.forEach((item) => {
            this.schemaObjectFactory.exploreModelSchema(item, schemas);
        });
    }
    getModulePathMetadata(container, metatype) {
        const modulesContainer = container.getModules();
        const modulePath = Reflect.getMetadata(constants_1.MODULE_PATH + modulesContainer.applicationId, metatype);
        return modulePath !== null && modulePath !== void 0 ? modulePath : Reflect.getMetadata(constants_1.MODULE_PATH, metatype);
    }
}
exports.SwaggerScanner = SwaggerScanner;


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelPropertiesAccessor = void 0;
const shared_utils_1 = __webpack_require__(10);
__webpack_require__(44);
const constants_1 = __webpack_require__(49);
const api_property_decorator_1 = __webpack_require__(70);
const plugin_constants_1 = __webpack_require__(55);
class ModelPropertiesAccessor {
    getModelProperties(prototype) {
        const properties = Reflect.getMetadata(constants_1.DECORATORS.API_MODEL_PROPERTIES_ARRAY, prototype) ||
            [];
        return properties
            .filter(shared_utils_1.isString)
            .filter((key) => key.charAt(0) === ':' && !(0, shared_utils_1.isFunction)(prototype[key]))
            .map((key) => key.slice(1));
    }
    applyMetadataFactory(prototype) {
        const classPrototype = prototype;
        do {
            if (!prototype.constructor) {
                return;
            }
            if (!prototype.constructor[plugin_constants_1.METADATA_FACTORY_NAME]) {
                continue;
            }
            const metadata = prototype.constructor[plugin_constants_1.METADATA_FACTORY_NAME]();
            const properties = Object.keys(metadata);
            properties.forEach((key) => {
                (0, api_property_decorator_1.createApiPropertyDecorator)(metadata[key], false)(classPrototype, key);
            });
        } while ((prototype = Reflect.getPrototypeOf(prototype)) &&
            prototype !== Object.prototype &&
            prototype);
    }
}
exports.ModelPropertiesAccessor = ModelPropertiesAccessor;


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchemaObjectFactory = void 0;
const shared_utils_1 = __webpack_require__(10);
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const helpers_1 = __webpack_require__(54);
const api_extra_models_explorer_1 = __webpack_require__(89);
const utils_1 = __webpack_require__(90);
const enum_utils_1 = __webpack_require__(53);
const is_body_parameter_util_1 = __webpack_require__(92);
const is_built_in_type_util_1 = __webpack_require__(93);
const is_date_ctor_util_1 = __webpack_require__(95);
class SchemaObjectFactory {
    constructor(modelPropertiesAccessor, swaggerTypesMapper) {
        this.modelPropertiesAccessor = modelPropertiesAccessor;
        this.swaggerTypesMapper = swaggerTypesMapper;
    }
    createFromModel(parameters, schemas) {
        const parameterObjects = parameters.map((param) => {
            if (this.isLazyTypeFunc(param.type)) {
                [param.type, param.isArray] = (0, helpers_1.getTypeIsArrayTuple)(param.type(), undefined);
            }
            if (!(0, is_body_parameter_util_1.isBodyParameter)(param) && param.enumName) {
                return this.createEnumParam(param, schemas);
            }
            if (this.isPrimitiveType(param.type)) {
                return param;
            }
            if (this.isArrayCtor(param.type)) {
                return this.mapArrayCtorParam(param);
            }
            if (!(0, is_body_parameter_util_1.isBodyParameter)(param)) {
                return this.createQueryOrParamSchema(param, schemas);
            }
            return this.getCustomType(param, schemas);
        });
        return (0, lodash_1.flatten)(parameterObjects);
    }
    getCustomType(param, schemas) {
        const modelName = this.exploreModelSchema(param.type, schemas);
        const name = param.name || modelName;
        const schema = Object.assign(Object.assign({}, (param.schema || {})), { $ref: (0, utils_1.getSchemaPath)(modelName) });
        const isArray = param.isArray;
        param = (0, lodash_1.omit)(param, 'isArray');
        if (isArray) {
            return Object.assign(Object.assign({}, param), { name, schema: {
                    type: 'array',
                    items: schema
                } });
        }
        return Object.assign(Object.assign({}, param), { name,
            schema });
    }
    createQueryOrParamSchema(param, schemas) {
        if ((0, is_date_ctor_util_1.isDateCtor)(param.type)) {
            return Object.assign(Object.assign({ format: 'date-time' }, param), { type: 'string' });
        }
        if (this.isBigInt(param.type)) {
            return Object.assign(Object.assign({ format: 'int64' }, param), { type: 'integer' });
        }
        if ((0, lodash_1.isFunction)(param.type)) {
            if (param.name) {
                return this.getCustomType(param, schemas);
            }
            const propertiesWithType = this.extractPropertiesFromType(param.type, schemas);
            if (!propertiesWithType) {
                return param;
            }
            return propertiesWithType.map((property) => {
                var _a;
                const keysToOmit = [
                    'isArray',
                    'enumName',
                    'enumSchema',
                    'selfRequired'
                ];
                const parameterObject = Object.assign(Object.assign({}, (0, lodash_1.omit)(property, keysToOmit)), { in: 'query', required: (_a = property.required) !== null && _a !== void 0 ? _a : true });
                const keysToMoveToSchema = [
                    ...this.swaggerTypesMapper.getSchemaOptionsKeys(),
                    'allOf'
                ];
                return keysToMoveToSchema.reduce((acc, key) => {
                    if (key in property) {
                        acc.schema = Object.assign(Object.assign({}, acc.schema), { [key]: property[key] });
                        delete acc[key];
                    }
                    return acc;
                }, parameterObject);
            });
        }
        return param;
    }
    extractPropertiesFromType(type, schemas, pendingSchemasRefs = []) {
        const { prototype } = type;
        if (!prototype) {
            return;
        }
        const extraModels = (0, api_extra_models_explorer_1.exploreGlobalApiExtraModelsMetadata)(type);
        extraModels.forEach((item) => this.exploreModelSchema(item, schemas, pendingSchemasRefs));
        this.modelPropertiesAccessor.applyMetadataFactory(prototype);
        const modelProperties = this.modelPropertiesAccessor.getModelProperties(prototype);
        const propertiesWithType = modelProperties.map((key) => {
            const property = this.mergePropertyWithMetadata(key, prototype, schemas, pendingSchemasRefs);
            const schemaCombinators = ['oneOf', 'anyOf', 'allOf'];
            const declaredSchemaCombinator = schemaCombinators.find((combinator) => combinator in property);
            if (declaredSchemaCombinator) {
                const schemaObjectMetadata = property;
                if ((schemaObjectMetadata === null || schemaObjectMetadata === void 0 ? void 0 : schemaObjectMetadata.type) === 'array' ||
                    schemaObjectMetadata.isArray) {
                    schemaObjectMetadata.items = {};
                    schemaObjectMetadata.items[declaredSchemaCombinator] =
                        property[declaredSchemaCombinator];
                    delete property[declaredSchemaCombinator];
                }
                else {
                    delete schemaObjectMetadata.type;
                }
            }
            return property;
        });
        return propertiesWithType;
    }
    exploreModelSchema(type, schemas, pendingSchemasRefs = []) {
        if (this.isLazyTypeFunc(type)) {
            type = type();
        }
        const propertiesWithType = this.extractPropertiesFromType(type, schemas, pendingSchemasRefs);
        if (!propertiesWithType) {
            return '';
        }
        const extensionProperties = Reflect.getMetadata(constants_1.DECORATORS.API_EXTENSION, type) || {};
        const { schemaName, schemaProperties } = this.getSchemaMetadata(type);
        const typeDefinition = Object.assign(Object.assign({ type: 'object', properties: (0, lodash_1.mapValues)((0, lodash_1.keyBy)(propertiesWithType, 'name'), (property) => {
                const keysToOmit = [
                    'name',
                    'isArray',
                    'enumName',
                    'enumSchema',
                    'selfRequired'
                ];
                if ('required' in property && Array.isArray(property.required)) {
                    return (0, lodash_1.omit)(property, keysToOmit);
                }
                return (0, lodash_1.omit)(property, [...keysToOmit, 'required']);
            }) }, extensionProperties), schemaProperties);
        const typeDefinitionRequiredFields = propertiesWithType
            .filter((property) => (property.required != false && !Array.isArray(property.required)) ||
            ('selfRequired' in property && property.selfRequired != false))
            .map((property) => property.name);
        if (typeDefinitionRequiredFields.length > 0) {
            typeDefinition['required'] = typeDefinitionRequiredFields;
        }
        schemas[schemaName] = typeDefinition;
        return schemaName;
    }
    getSchemaMetadata(type) {
        var _a, _b;
        const schemas = (_a = Reflect.getOwnMetadata(constants_1.DECORATORS.API_SCHEMA, type)) !== null && _a !== void 0 ? _a : [];
        const _c = (_b = schemas[schemas.length - 1]) !== null && _b !== void 0 ? _b : {}, { name } = _c, schemaProperties = __rest(_c, ["name"]);
        return { schemaName: name !== null && name !== void 0 ? name : type.name, schemaProperties };
    }
    mergePropertyWithMetadata(key, prototype, schemas, pendingSchemaRefs, metadata) {
        if (!metadata) {
            metadata =
                (0, lodash_1.omit)(Reflect.getMetadata(constants_1.DECORATORS.API_MODEL_PROPERTIES, prototype, key), 'link') || {};
        }
        if (this.isLazyTypeFunc(metadata.type)) {
            metadata.type = metadata.type();
            [metadata.type, metadata.isArray] = (0, helpers_1.getTypeIsArrayTuple)(metadata.type, metadata.isArray);
        }
        if (Array.isArray(metadata.type)) {
            return this.createFromNestedArray(key, metadata, schemas, pendingSchemaRefs);
        }
        return this.createSchemaMetadata(key, metadata, schemas, pendingSchemaRefs);
    }
    createEnumParam(param, schemas) {
        var _a, _b, _c, _d, _e;
        const enumName = param.enumName;
        const $ref = (0, utils_1.getSchemaPath)(enumName);
        if (!(enumName in schemas)) {
            const _enum = param.enum
                ? param.enum
                : param.schema
                    ? param.schema['items']
                        ? param.schema['items']['enum']
                        : param.schema['enum']
                    : param.isArray && param.items
                        ? param.items.enum
                        : undefined;
            schemas[enumName] = Object.assign(Object.assign({ type: (_d = (param.isArray
                    ? (_b = (_a = param.schema) === null || _a === void 0 ? void 0 : _a['items']) === null || _b === void 0 ? void 0 : _b['type']
                    : (_c = param.schema) === null || _c === void 0 ? void 0 : _c['type'])) !== null && _d !== void 0 ? _d : 'string', enum: _enum }, param.enumSchema), (param['x-enumNames'] ? { 'x-enumNames': param['x-enumNames'] } : {}));
        }
        else {
            if (param.enumSchema) {
                schemas[enumName] = Object.assign(Object.assign({}, schemas[enumName]), param.enumSchema);
            }
        }
        param.schema =
            param.isArray || ((_e = param.schema) === null || _e === void 0 ? void 0 : _e['items'])
                ? { type: 'array', items: { $ref } }
                : { $ref };
        return (0, lodash_1.omit)(param, [
            'isArray',
            'items',
            'enumName',
            'enum',
            'x-enumNames',
            'enumSchema'
        ]);
    }
    createEnumSchemaType(key, metadata, schemas) {
        var _a;
        if (!('enumName' in metadata) || !metadata.enumName) {
            return Object.assign(Object.assign({}, metadata), { name: metadata.name || key });
        }
        const enumName = metadata.enumName;
        const $ref = (0, utils_1.getSchemaPath)(enumName);
        const enumType = (_a = (metadata.isArray ? metadata.items['type'] : metadata.type)) !== null && _a !== void 0 ? _a : 'string';
        if (!schemas[enumName]) {
            schemas[enumName] = Object.assign(Object.assign({ type: enumType }, metadata.enumSchema), { enum: metadata.isArray && metadata.items
                    ? metadata.items['enum']
                    : metadata.enum });
        }
        else {
            if (metadata.enumSchema) {
                schemas[enumName] = Object.assign(Object.assign({}, schemas[enumName]), metadata.enumSchema);
            }
        }
        const _schemaObject = Object.assign(Object.assign({}, metadata), { name: metadata.name || key, type: metadata.isArray ? 'array' : 'string' });
        const refHost = metadata.isArray
            ? { items: { $ref } }
            : { allOf: [{ $ref }] };
        const paramObject = Object.assign(Object.assign({}, _schemaObject), refHost);
        const pathsToOmit = ['enum', 'enumName', 'enumSchema'];
        if (!metadata.isArray) {
            pathsToOmit.push('type');
        }
        return (0, lodash_1.omit)(paramObject, pathsToOmit);
    }
    createNotBuiltInTypeReference(key, metadata, trueMetadataType, schemas, pendingSchemaRefs) {
        if ((0, shared_utils_1.isUndefined)(trueMetadataType)) {
            throw new Error(`A circular dependency has been detected (property key: "${key}"). Please, make sure that each side of a bidirectional relationships are using lazy resolvers ("type: () => ClassType").`);
        }
        let schemaObjectName = trueMetadataType.name;
        if (!(schemaObjectName in schemas) &&
            !pendingSchemaRefs.includes(schemaObjectName)) {
            schemaObjectName = this.exploreModelSchema(trueMetadataType, schemas, [...pendingSchemaRefs, schemaObjectName]);
        }
        const $ref = (0, utils_1.getSchemaPath)(schemaObjectName);
        if (metadata.isArray) {
            return this.transformToArraySchemaProperty(metadata, key, { $ref });
        }
        const keysToRemove = ['type', 'isArray', 'required', 'name'];
        const validMetadataObject = (0, lodash_1.omit)(metadata, keysToRemove);
        const extraMetadataKeys = Object.keys(validMetadataObject);
        if (extraMetadataKeys.length > 0) {
            return Object.assign(Object.assign({ name: metadata.name || key, required: metadata.required }, validMetadataObject), { allOf: [{ $ref }] });
        }
        return {
            name: metadata.name || key,
            required: metadata.required,
            $ref
        };
    }
    transformToArraySchemaProperty(metadata, key, type) {
        const keysToRemove = ['type', 'enum'];
        const [movedProperties, keysToMove] = this.extractPropertyModifiers(metadata);
        const schemaHost = Object.assign(Object.assign({}, (0, lodash_1.omit)(metadata, [...keysToRemove, ...keysToMove])), { name: metadata.name || key, type: 'array', items: (0, lodash_1.isString)(type)
                ? Object.assign({ type }, movedProperties) : Object.assign(Object.assign({}, type), movedProperties) });
        schemaHost.items = (0, lodash_1.omitBy)(schemaHost.items, shared_utils_1.isUndefined);
        return schemaHost;
    }
    mapArrayCtorParam(param) {
        return Object.assign(Object.assign({}, (0, lodash_1.omit)(param, 'type')), { schema: {
                type: 'array',
                items: {
                    type: 'string'
                }
            } });
    }
    createFromObjectLiteral(key, literalObj, schemas) {
        const objLiteralKeys = Object.keys(literalObj);
        const properties = {};
        const required = [];
        objLiteralKeys.forEach((key) => {
            const propertyCompilerMetadata = literalObj[key];
            if ((0, enum_utils_1.isEnumArray)(propertyCompilerMetadata)) {
                propertyCompilerMetadata.type = 'array';
                const enumValues = (0, enum_utils_1.getEnumValues)(propertyCompilerMetadata.enum);
                propertyCompilerMetadata.items = {
                    type: (0, enum_utils_1.getEnumType)(enumValues),
                    enum: enumValues
                };
                delete propertyCompilerMetadata.enum;
            }
            else if (propertyCompilerMetadata.enum) {
                const enumValues = (0, enum_utils_1.getEnumValues)(propertyCompilerMetadata.enum);
                propertyCompilerMetadata.enum = enumValues;
                propertyCompilerMetadata.type = (0, enum_utils_1.getEnumType)(enumValues);
            }
            const propertyMetadata = this.mergePropertyWithMetadata(key, Object, schemas, [], propertyCompilerMetadata);
            if ('required' in propertyMetadata && propertyMetadata.required) {
                required.push(key);
            }
            const keysToRemove = ['isArray', 'name', 'required'];
            const validMetadataObject = (0, lodash_1.omit)(propertyMetadata, keysToRemove);
            properties[key] = validMetadataObject;
        });
        const schema = {
            name: key,
            type: 'object',
            properties,
            required
        };
        return schema;
    }
    createFromNestedArray(key, metadata, schemas, pendingSchemaRefs) {
        const recurse = (type) => {
            if (!Array.isArray(type)) {
                const schemaMetadata = this.createSchemaMetadata(key, metadata, schemas, pendingSchemaRefs, type);
                return (0, lodash_1.omit)(schemaMetadata, ['isArray', 'name']);
            }
            return {
                name: key,
                type: 'array',
                items: recurse(type[0])
            };
        };
        return recurse(metadata.type);
    }
    createSchemaMetadata(key, metadata, schemas, pendingSchemaRefs, nestedArrayType) {
        const typeRef = nestedArrayType || metadata.type;
        if (this.isObjectLiteral(typeRef)) {
            const schemaFromObjectLiteral = this.createFromObjectLiteral(key, typeRef, schemas);
            return Object.assign(Object.assign({}, schemaFromObjectLiteral), { selfRequired: metadata.required });
        }
        if ((0, lodash_1.isString)(typeRef)) {
            if ((0, enum_utils_1.isEnumMetadata)(metadata)) {
                return this.createEnumSchemaType(key, metadata, schemas);
            }
            if (metadata.isArray) {
                return this.transformToArraySchemaProperty(metadata, key, typeRef);
            }
            return Object.assign(Object.assign({}, metadata), { name: metadata.name || key });
        }
        if ((0, is_date_ctor_util_1.isDateCtor)(typeRef)) {
            if (metadata.isArray) {
                return this.transformToArraySchemaProperty(metadata, key, {
                    format: metadata.format || 'date-time',
                    type: 'string'
                });
            }
            return Object.assign(Object.assign({ format: 'date-time' }, metadata), { type: 'string', name: metadata.name || key });
        }
        if (this.isBigInt(typeRef)) {
            return Object.assign(Object.assign({ format: 'int64' }, metadata), { type: 'integer', name: metadata.name || key });
        }
        if (!(0, is_built_in_type_util_1.isBuiltInType)(typeRef)) {
            return this.createNotBuiltInTypeReference(key, metadata, typeRef, schemas, pendingSchemaRefs);
        }
        const typeName = this.getTypeName(typeRef);
        const itemType = this.swaggerTypesMapper.mapTypeToOpenAPIType(typeName);
        if (metadata.isArray) {
            return this.transformToArraySchemaProperty(metadata, key, {
                type: itemType
            });
        }
        else if (itemType === 'array') {
            const defaultOnArray = 'string';
            const hasSchemaCombinator = ['oneOf', 'anyOf', 'allOf'].some((combinator) => combinator in metadata);
            if (hasSchemaCombinator) {
                return Object.assign(Object.assign({}, metadata), { type: undefined, name: metadata.name || key });
            }
            return this.transformToArraySchemaProperty(metadata, key, {
                type: defaultOnArray
            });
        }
        return Object.assign(Object.assign({}, metadata), { name: metadata.name || key, type: itemType });
    }
    isArrayCtor(type) {
        return type === Array;
    }
    isPrimitiveType(type) {
        return ((0, lodash_1.isFunction)(type) &&
            [String, Boolean, Number].some((item) => item === type));
    }
    isLazyTypeFunc(type) {
        return (0, lodash_1.isFunction)(type) && type.name == 'type';
    }
    getTypeName(type) {
        return type && (0, lodash_1.isFunction)(type) ? type.name : type;
    }
    isObjectLiteral(obj) {
        if (typeof obj !== 'object' || !obj) {
            return false;
        }
        const hasOwnProp = Object.prototype.hasOwnProperty;
        let objPrototype = obj;
        while (Object.getPrototypeOf((objPrototype = Object.getPrototypeOf(objPrototype))) !== null)
            ;
        for (const prop in obj) {
            if (!hasOwnProp.call(obj, prop) && !hasOwnProp.call(objPrototype, prop)) {
                return false;
            }
        }
        return Object.getPrototypeOf(obj) === objPrototype;
    }
    isBigInt(type) {
        return type === BigInt;
    }
    extractPropertyModifiers(metadata) {
        const modifierKeys = [
            'format',
            'maximum',
            'maxLength',
            'minimum',
            'minLength',
            'pattern'
        ];
        return [(0, lodash_1.pick)(metadata, modifierKeys), modifierKeys];
    }
}
exports.SchemaObjectFactory = SchemaObjectFactory;


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exploreApiExtraModelsMetadata = exports.exploreGlobalApiExtraModelsMetadata = void 0;
const constants_1 = __webpack_require__(49);
const exploreGlobalApiExtraModelsMetadata = (metatype) => {
    const extraModels = Reflect.getMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, metatype);
    return extraModels || [];
};
exports.exploreGlobalApiExtraModelsMetadata = exploreGlobalApiExtraModelsMetadata;
const exploreApiExtraModelsMetadata = (instance, prototype, method) => Reflect.getMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, method) || [];
exports.exploreApiExtraModelsMetadata = exploreApiExtraModelsMetadata;


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(91), exports);


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSchemaPath = getSchemaPath;
exports.refs = refs;
const shared_utils_1 = __webpack_require__(10);
const constants_1 = __webpack_require__(49);
function getSchemaPath(model) {
    const modelName = (0, shared_utils_1.isString)(model) ? model : getSchemaNameByClass(model);
    return `#/components/schemas/${modelName}`;
}
function getSchemaNameByClass(target) {
    var _a;
    if (!target || typeof target !== 'function') {
        return '';
    }
    const customSchema = Reflect.getOwnMetadata(constants_1.DECORATORS.API_SCHEMA, target);
    if (!customSchema || customSchema.length === 0) {
        return target.name;
    }
    return (_a = customSchema[customSchema.length - 1].name) !== null && _a !== void 0 ? _a : target.name;
}
function refs(...models) {
    return models.map((item) => ({
        $ref: getSchemaPath(item.name)
    }));
}


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isBodyParameter = isBodyParameter;
function isBodyParameter(param) {
    return param.in === 'body';
}


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isBuiltInType = isBuiltInType;
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(94);
function isBuiltInType(type) {
    return (0, lodash_1.isFunction)(type) && constants_1.BUILT_IN_TYPES.some((item) => item === type);
}


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BUILT_IN_TYPES = void 0;
exports.BUILT_IN_TYPES = [String, Boolean, Number, Object, Array];


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isDateCtor = isDateCtor;
function isDateCtor(type) {
    return type === Date;
}


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerTypesMapper = void 0;
const lodash_1 = __webpack_require__(48);
class SwaggerTypesMapper {
    constructor() {
        this.keysToRemove = [
            'type',
            'isArray',
            'enum',
            'enumName',
            'enumSchema',
            'items',
            '$ref',
            ...this.getSchemaOptionsKeys()
        ];
    }
    mapParamTypes(parameters) {
        return parameters.map((param) => {
            if (this.hasSchemaDefinition(param) ||
                this.hasRawContentDefinition(param)) {
                return this.omitParamKeys(param);
            }
            const { type } = param;
            const typeName = type && (0, lodash_1.isFunction)(type)
                ? this.mapTypeToOpenAPIType(type.name)
                : this.mapTypeToOpenAPIType(type);
            const paramWithTypeMetadata = (0, lodash_1.omitBy)(Object.assign(Object.assign({}, param), { type: typeName }), lodash_1.isUndefined);
            if (this.isEnumArrayType(paramWithTypeMetadata)) {
                return this.mapEnumArrayType(paramWithTypeMetadata, this.keysToRemove);
            }
            else if (paramWithTypeMetadata.isArray) {
                return this.mapArrayType(paramWithTypeMetadata, this.keysToRemove);
            }
            return Object.assign(Object.assign({}, (0, lodash_1.omit)(param, this.keysToRemove)), { schema: (0, lodash_1.omitBy)(Object.assign(Object.assign(Object.assign({}, this.getSchemaOptions(param)), (param.schema || {})), { enum: paramWithTypeMetadata.enum, type: paramWithTypeMetadata.type, $ref: paramWithTypeMetadata.$ref }), lodash_1.isUndefined) });
        });
    }
    mapTypeToOpenAPIType(type) {
        if (!(type && type.charAt)) {
            return;
        }
        return type.charAt(0).toLowerCase() + type.slice(1);
    }
    mapEnumArrayType(param, keysToRemove) {
        return Object.assign(Object.assign({}, (0, lodash_1.omit)(param, keysToRemove)), { schema: Object.assign(Object.assign({}, this.getSchemaOptions(param)), { type: 'array', items: param.items }) });
    }
    mapArrayType(param, keysToRemove) {
        const itemsModifierKeys = ['format', 'maximum', 'minimum', 'pattern'];
        const items = param.items ||
            (0, lodash_1.omitBy)(Object.assign(Object.assign({}, (param.schema || {})), { enum: param.enum, type: this.mapTypeToOpenAPIType(param.type) }), lodash_1.isUndefined);
        const modifierProperties = (0, lodash_1.pick)(param, itemsModifierKeys);
        return Object.assign(Object.assign({}, (0, lodash_1.omit)(param, keysToRemove)), { schema: Object.assign(Object.assign({}, (0, lodash_1.omit)(this.getSchemaOptions(param), [...itemsModifierKeys])), { type: 'array', items: (0, lodash_1.isString)(items.type)
                    ? Object.assign({ type: items.type }, modifierProperties) : Object.assign(Object.assign({}, items.type), modifierProperties) }) });
    }
    getSchemaOptionsKeys() {
        return [
            'properties',
            'patternProperties',
            'additionalProperties',
            'minimum',
            'maximum',
            'maxProperties',
            'minItems',
            'minProperties',
            'maxItems',
            'minLength',
            'maxLength',
            'exclusiveMaximum',
            'exclusiveMinimum',
            'uniqueItems',
            'title',
            'format',
            'pattern',
            'nullable',
            'default',
            'example',
            'oneOf',
            'anyOf'
        ];
    }
    getSchemaOptions(param) {
        const schemaKeys = this.getSchemaOptionsKeys();
        const optionsObject = schemaKeys.reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: param[key] })), {});
        return (0, lodash_1.omitBy)(optionsObject, lodash_1.isUndefined);
    }
    isEnumArrayType(param) {
        return param.isArray && param.items && param.items.enum;
    }
    hasSchemaDefinition(param) {
        return !!param.schema;
    }
    hasRawContentDefinition(param) {
        return 'content' in param;
    }
    omitParamKeys(param) {
        return (0, lodash_1.omit)(param, this.keysToRemove);
    }
}
exports.SwaggerTypesMapper = SwaggerTypesMapper;


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerExplorer = void 0;
const common_1 = __webpack_require__(3);
const constants_1 = __webpack_require__(56);
const interfaces_1 = __webpack_require__(98);
const shared_utils_1 = __webpack_require__(10);
const core_1 = __webpack_require__(1);
const route_path_factory_1 = __webpack_require__(99);
const lodash_1 = __webpack_require__(48);
const pathToRegexp = __webpack_require__(100);
const constants_2 = __webpack_require__(49);
const api_callbacks_explorer_1 = __webpack_require__(101);
const api_exclude_controller_explorer_1 = __webpack_require__(102);
const api_exclude_endpoint_explorer_1 = __webpack_require__(103);
const api_extra_models_explorer_1 = __webpack_require__(89);
const api_headers_explorer_1 = __webpack_require__(104);
const api_operation_explorer_1 = __webpack_require__(105);
const api_parameters_explorer_1 = __webpack_require__(106);
const api_response_explorer_1 = __webpack_require__(111);
const api_security_explorer_1 = __webpack_require__(117);
const api_use_tags_explorer_1 = __webpack_require__(118);
const mimetype_content_wrapper_1 = __webpack_require__(113);
const is_body_parameter_util_1 = __webpack_require__(92);
const merge_and_uniq_util_1 = __webpack_require__(116);
class SwaggerExplorer {
    constructor(schemaObjectFactory) {
        this.schemaObjectFactory = schemaObjectFactory;
        this.mimetypeContentWrapper = new mimetype_content_wrapper_1.MimetypeContentWrapper();
        this.metadataScanner = new core_1.MetadataScanner();
        this.schemas = {};
        this.operationIdFactory = (controllerKey, methodKey, version) => version
            ? controllerKey
                ? `${controllerKey}_${methodKey}_${version}`
                : `${methodKey}_${version}`
            : controllerKey
                ? `${controllerKey}_${methodKey}`
                : methodKey;
        this.linkNameFactory = (controllerKey, methodKey, fieldKey) => controllerKey
            ? `${controllerKey}_${methodKey}_from_${fieldKey}`
            : `${methodKey}_from_${fieldKey}`;
    }
    exploreController(wrapper, applicationConfig, modulePath, globalPrefix, operationIdFactory, linkNameFactory, autoTagControllers) {
        this.routePathFactory = new route_path_factory_1.RoutePathFactory(applicationConfig);
        if (operationIdFactory) {
            this.operationIdFactory = operationIdFactory;
        }
        if (linkNameFactory) {
            this.linkNameFactory = linkNameFactory;
        }
        const { instance, metatype } = wrapper;
        const prototype = Object.getPrototypeOf(instance);
        const documentResolvers = {
            root: [
                this.exploreRoutePathAndMethod,
                api_operation_explorer_1.exploreApiOperationMetadata,
                api_parameters_explorer_1.exploreApiParametersMetadata.bind(null, this.schemas)
            ],
            security: [api_security_explorer_1.exploreApiSecurityMetadata],
            tags: [api_use_tags_explorer_1.exploreApiTagsMetadata],
            callbacks: [api_callbacks_explorer_1.exploreApiCallbacksMetadata],
            responses: [
                api_response_explorer_1.exploreApiResponseMetadata.bind(null, this.schemas, {
                    operationId: this.operationIdFactory,
                    linkName: this.linkNameFactory
                })
            ]
        };
        return this.generateDenormalizedDocument(metatype, prototype, instance, documentResolvers, applicationConfig, {
            modulePath,
            globalPrefix,
            autoTagControllers
        });
    }
    getSchemas() {
        return this.schemas;
    }
    generateDenormalizedDocument(metatype, prototype, instance, documentResolvers, applicationConfig, options) {
        const self = this;
        const excludeController = (0, api_exclude_controller_explorer_1.exploreApiExcludeControllerMetadata)(metatype);
        if (excludeController) {
            return [];
        }
        const globalMetadata = this.exploreGlobalMetadata(metatype, {
            autoTagControllers: options.autoTagControllers
        });
        const ctrlExtraModels = (0, api_extra_models_explorer_1.exploreGlobalApiExtraModelsMetadata)(metatype);
        this.registerExtraModels(ctrlExtraModels);
        const denormalizedPaths = this.metadataScanner.scanFromPrototype(instance, prototype, (name) => {
            const targetCallback = prototype[name];
            const excludeEndpoint = (0, api_exclude_endpoint_explorer_1.exploreApiExcludeEndpointMetadata)(instance, prototype, targetCallback);
            if (excludeEndpoint && excludeEndpoint.disable) {
                return;
            }
            const ctrlExtraModels = (0, api_extra_models_explorer_1.exploreApiExtraModelsMetadata)(instance, prototype, targetCallback);
            this.registerExtraModels(ctrlExtraModels);
            const methodMetadata = (0, lodash_1.mapValues)(documentResolvers, (explorers) => explorers.reduce((metadata, fn) => {
                const exploredMetadata = fn.call(self, instance, prototype, targetCallback, metatype, options.globalPrefix, options.modulePath, applicationConfig, options.autoTagControllers);
                if (!exploredMetadata) {
                    return metadata;
                }
                if (!(0, lodash_1.isArray)(exploredMetadata)) {
                    if (Array.isArray(metadata)) {
                        return metadata.map((item) => (Object.assign(Object.assign({}, item), exploredMetadata)));
                    }
                    return Object.assign(Object.assign({}, metadata), exploredMetadata);
                }
                return (0, lodash_1.isArray)(metadata)
                    ? [...metadata, ...exploredMetadata]
                    : exploredMetadata;
            }, {}));
            if (Array.isArray(methodMetadata.root)) {
                return methodMetadata.root.map((endpointMetadata) => {
                    endpointMetadata = (0, lodash_1.cloneDeep)(Object.assign(Object.assign({}, methodMetadata), { root: endpointMetadata }));
                    const mergedMethodMetadata = this.mergeMetadata(globalMetadata, (0, lodash_1.omitBy)(endpointMetadata, lodash_1.isEmpty));
                    return this.migrateOperationSchema(Object.assign(Object.assign({ responses: {} }, (0, lodash_1.omit)(globalMetadata, 'chunks')), mergedMethodMetadata), prototype, targetCallback);
                });
            }
            const mergedMethodMetadata = this.mergeMetadata(globalMetadata, (0, lodash_1.omitBy)(methodMetadata, lodash_1.isEmpty));
            return [
                this.migrateOperationSchema(Object.assign(Object.assign({ responses: {} }, (0, lodash_1.omit)(globalMetadata, 'chunks')), mergedMethodMetadata), prototype, targetCallback)
            ];
        });
        return (0, lodash_1.flatten)(denormalizedPaths).filter((path) => { var _a; return (_a = path.root) === null || _a === void 0 ? void 0 : _a.path; });
    }
    exploreGlobalMetadata(metatype, options) {
        const globalExplorers = [
            (0, api_use_tags_explorer_1.exploreGlobalApiTagsMetadata)(options.autoTagControllers),
            api_security_explorer_1.exploreGlobalApiSecurityMetadata,
            api_response_explorer_1.exploreGlobalApiResponseMetadata.bind(null, this.schemas),
            api_headers_explorer_1.exploreGlobalApiHeaderMetadata
        ];
        const globalMetadata = globalExplorers
            .map((explorer) => explorer.call(explorer, metatype))
            .filter((val) => !(0, shared_utils_1.isUndefined)(val))
            .reduce((curr, next) => {
            if (next.depth) {
                return Object.assign(Object.assign({}, curr), { chunks: (curr.chunks || []).concat(next) });
            }
            return Object.assign(Object.assign({}, curr), next);
        }, {});
        return globalMetadata;
    }
    exploreRoutePathAndMethod(instance, prototype, method, metatype, globalPrefix, modulePath, applicationConfig) {
        const methodPath = Reflect.getMetadata(constants_1.PATH_METADATA, method);
        if ((0, shared_utils_1.isUndefined)(methodPath)) {
            return undefined;
        }
        const requestMethod = Reflect.getMetadata(constants_1.METHOD_METADATA, method);
        const methodVersion = Reflect.getMetadata(constants_1.VERSION_METADATA, method);
        const versioningOptions = applicationConfig.getVersioning();
        const controllerVersion = this.getVersionMetadata(metatype, versioningOptions);
        const versionOrVersions = methodVersion !== null && methodVersion !== void 0 ? methodVersion : controllerVersion;
        const versions = this.getRoutePathVersions(versionOrVersions, versioningOptions);
        const allRoutePaths = this.routePathFactory.create({
            methodPath,
            methodVersion,
            modulePath,
            globalPrefix,
            controllerVersion,
            ctrlPath: this.reflectControllerPath(metatype),
            versioningOptions: applicationConfig.getVersioning()
        }, requestMethod);
        return (0, lodash_1.flatten)(allRoutePaths.map((routePath, index) => {
            const fullPath = this.validateRoutePath(routePath);
            const apiExtension = Reflect.getMetadata(constants_2.DECORATORS.API_EXTENSION, method);
            if (requestMethod === common_1.RequestMethod.ALL) {
                const validMethods = Object.values(common_1.RequestMethod).filter((meth) => meth !== 'ALL' && typeof meth === 'string');
                return validMethods.map((requestMethod) => (Object.assign({ method: requestMethod.toLowerCase(), path: fullPath === '' ? '/' : fullPath, operationId: `${this.getOperationId(instance, method.name)}_${requestMethod.toLowerCase()}` }, apiExtension)));
            }
            const pathVersion = versions.find((v) => fullPath.includes(`/${v}/`) || fullPath.endsWith(`/${v}`));
            const isAlias = allRoutePaths.length > 1 && allRoutePaths.length !== versions.length;
            const methodKey = isAlias ? `${method.name}[${index}]` : method.name;
            return Object.assign({ method: common_1.RequestMethod[requestMethod].toLowerCase(), path: fullPath === '' ? '/' : fullPath, operationId: this.getOperationId(instance, methodKey, pathVersion) }, apiExtension);
        }));
    }
    getOperationId(instance, methodKey, version) {
        var _a;
        return this.operationIdFactory(((_a = instance.constructor) === null || _a === void 0 ? void 0 : _a.name) || '', methodKey, version);
    }
    getRoutePathVersions(versionValue, versioningOptions) {
        let versions = [];
        if (!versionValue || (versioningOptions === null || versioningOptions === void 0 ? void 0 : versioningOptions.type) !== common_1.VersioningType.URI) {
            return versions;
        }
        if (Array.isArray(versionValue)) {
            versions = versionValue.filter((v) => v !== interfaces_1.VERSION_NEUTRAL);
        }
        else if (versionValue !== interfaces_1.VERSION_NEUTRAL) {
            versions = [versionValue];
        }
        const prefix = this.routePathFactory.getVersionPrefix(versioningOptions);
        versions = versions.map((v) => `${prefix}${v}`);
        return versions;
    }
    reflectControllerPath(metatype) {
        return Reflect.getMetadata(constants_1.PATH_METADATA, metatype);
    }
    validateRoutePath(path) {
        if ((0, shared_utils_1.isUndefined)(path)) {
            return '';
        }
        if (Array.isArray(path)) {
            path = (0, lodash_1.head)(path);
        }
        let pathWithParams = '';
        for (const item of pathToRegexp.parse(path)) {
            pathWithParams += (0, shared_utils_1.isString)(item) ? item : `${item.prefix}{${item.name}}`;
        }
        return pathWithParams === '/' ? '' : (0, shared_utils_1.addLeadingSlash)(pathWithParams);
    }
    mergeMetadata(globalMetadata, methodMetadata) {
        if (methodMetadata.root && !methodMetadata.root.parameters) {
            methodMetadata.root.parameters = [];
        }
        const deepMerge = (metadata) => (value, key) => {
            if (!metadata[key]) {
                return value;
            }
            const globalValue = metadata[key];
            if (metadata.depth) {
                return this.deepMergeMetadata(globalValue, value, metadata.depth);
            }
            return this.mergeValues(globalValue, value);
        };
        if (globalMetadata.chunks) {
            const { chunks } = globalMetadata;
            chunks.forEach((chunk) => {
                methodMetadata = (0, lodash_1.mapValues)(methodMetadata, deepMerge(chunk));
            });
        }
        return (0, lodash_1.mapValues)(methodMetadata, deepMerge(globalMetadata));
    }
    deepMergeMetadata(globalValue, methodValue, maxDepth, currentDepthLevel = 0) {
        if (currentDepthLevel === maxDepth) {
            return this.mergeValues(globalValue, methodValue);
        }
        return (0, lodash_1.mapValues)(methodValue, (value, key) => {
            if (key in globalValue) {
                return this.deepMergeMetadata(globalValue[key], methodValue[key], maxDepth, currentDepthLevel + 1);
            }
            return value;
        });
    }
    mergeValues(globalValue, methodValue) {
        if (!(0, lodash_1.isArray)(globalValue)) {
            return Object.assign(Object.assign({}, globalValue), methodValue);
        }
        return [...globalValue, ...methodValue];
    }
    migrateOperationSchema(document, prototype, method) {
        const parametersObject = (0, lodash_1.get)(document, 'root.parameters');
        const requestBodyIndex = (parametersObject || []).findIndex(is_body_parameter_util_1.isBodyParameter);
        if (requestBodyIndex < 0) {
            return document;
        }
        const requestBody = parametersObject[requestBodyIndex];
        parametersObject.splice(requestBodyIndex, 1);
        const classConsumes = Reflect.getMetadata(constants_2.DECORATORS.API_CONSUMES, prototype);
        const methodConsumes = Reflect.getMetadata(constants_2.DECORATORS.API_CONSUMES, method);
        let consumes = (0, merge_and_uniq_util_1.mergeAndUniq)(classConsumes, methodConsumes);
        consumes = (0, lodash_1.isEmpty)(consumes) ? ['application/json'] : consumes;
        const keysToRemove = ['schema', 'in', 'name', 'examples'];
        document.root.requestBody = Object.assign(Object.assign({}, (0, lodash_1.omit)(requestBody, keysToRemove)), this.mimetypeContentWrapper.wrap(consumes, (0, lodash_1.pick)(requestBody, ['schema', 'examples'])));
        return document;
    }
    registerExtraModels(extraModels) {
        extraModels.forEach((item) => this.schemaObjectFactory.exploreModelSchema(item, this.schemas));
    }
    getVersionMetadata(metatype, versioningOptions) {
        var _a;
        if ((versioningOptions === null || versioningOptions === void 0 ? void 0 : versioningOptions.type) === common_1.VersioningType.URI) {
            return ((_a = Reflect.getMetadata(constants_1.VERSION_METADATA, metatype)) !== null && _a !== void 0 ? _a : versioningOptions.defaultVersion);
        }
    }
}
exports.SwaggerExplorer = SwaggerExplorer;


/***/ }),
/* 98 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/interfaces");

/***/ }),
/* 99 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core/router/route-path-factory");

/***/ }),
/* 100 */
/***/ ((module) => {

"use strict";
module.exports = require("path-to-regexp");

/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exploreApiCallbacksMetadata = void 0;
const constants_1 = __webpack_require__(49);
const utils_1 = __webpack_require__(90);
const exploreApiCallbacksMetadata = (instance, prototype, method) => {
    const callbacksData = Reflect.getMetadata(constants_1.DECORATORS.API_CALLBACKS, method);
    if (!callbacksData)
        return callbacksData;
    return callbacksData.reduce((acc, callbackData) => {
        const { name: eventName, callbackUrl, method: callbackMethod, requestBody, expectedResponse } = callbackData;
        return Object.assign(Object.assign({}, acc), { [eventName]: {
                [callbackUrl]: {
                    [callbackMethod]: {
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: (0, utils_1.getSchemaPath)(requestBody.type)
                                    }
                                }
                            }
                        },
                        responses: {
                            [expectedResponse.status]: {
                                description: expectedResponse.description ||
                                    'Your server returns this code if it accepts the callback'
                            }
                        }
                    }
                }
            } });
    }, {});
};
exports.exploreApiCallbacksMetadata = exploreApiCallbacksMetadata;


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exploreApiExcludeControllerMetadata = void 0;
const constants_1 = __webpack_require__(49);
const exploreApiExcludeControllerMetadata = (metatype) => {
    var _a;
    return ((_a = Reflect.getMetadata(constants_1.DECORATORS.API_EXCLUDE_CONTROLLER, metatype)) === null || _a === void 0 ? void 0 : _a[0]) ===
        true;
};
exports.exploreApiExcludeControllerMetadata = exploreApiExcludeControllerMetadata;


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exploreApiExcludeEndpointMetadata = void 0;
const constants_1 = __webpack_require__(49);
const exploreApiExcludeEndpointMetadata = (instance, prototype, method) => Reflect.getMetadata(constants_1.DECORATORS.API_EXCLUDE_ENDPOINT, method);
exports.exploreApiExcludeEndpointMetadata = exploreApiExcludeEndpointMetadata;


/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exploreGlobalApiHeaderMetadata = void 0;
const constants_1 = __webpack_require__(49);
const exploreGlobalApiHeaderMetadata = (metatype) => {
    const headers = Reflect.getMetadata(constants_1.DECORATORS.API_HEADERS, metatype);
    return headers ? { root: { parameters: headers }, depth: 1 } : undefined;
};
exports.exploreGlobalApiHeaderMetadata = exploreGlobalApiHeaderMetadata;


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exploreApiOperationMetadata = void 0;
const constants_1 = __webpack_require__(49);
const api_operation_decorator_1 = __webpack_require__(67);
const plugin_constants_1 = __webpack_require__(55);
const exploreApiOperationMetadata = (instance, prototype, method) => {
    applyMetadataFactory(prototype, instance);
    return Reflect.getMetadata(constants_1.DECORATORS.API_OPERATION, method);
};
exports.exploreApiOperationMetadata = exploreApiOperationMetadata;
function applyMetadataFactory(prototype, instance) {
    const classPrototype = prototype;
    do {
        if (!prototype.constructor) {
            return;
        }
        if (!prototype.constructor[plugin_constants_1.METADATA_FACTORY_NAME]) {
            continue;
        }
        const metadata = prototype.constructor[plugin_constants_1.METADATA_FACTORY_NAME]();
        const methodKeys = Object.keys(metadata).filter((key) => typeof instance[key] === 'function');
        methodKeys.forEach((key) => {
            const operationMeta = {};
            const { summary, deprecated, tags, description } = metadata[key];
            applyIfNotNil(operationMeta, 'summary', summary);
            applyIfNotNil(operationMeta, 'deprecated', deprecated);
            applyIfNotNil(operationMeta, 'tags', tags);
            applyIfNotNil(operationMeta, 'description', description);
            if (Object.keys(operationMeta).length === 0) {
                return;
            }
            (0, api_operation_decorator_1.ApiOperation)(operationMeta, { overrideExisting: false })(classPrototype, key, Object.getOwnPropertyDescriptor(classPrototype, key));
        });
    } while ((prototype = Reflect.getPrototypeOf(prototype)) &&
        prototype !== Object.prototype &&
        prototype);
}
function applyIfNotNil(target, key, value) {
    if (value !== undefined && value !== null) {
        target[key] = value;
    }
}


/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exploreApiParametersMetadata = void 0;
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const model_properties_accessor_1 = __webpack_require__(87);
const parameter_metadata_accessor_1 = __webpack_require__(107);
const parameters_metadata_mapper_1 = __webpack_require__(110);
const schema_object_factory_1 = __webpack_require__(88);
const swagger_types_mapper_1 = __webpack_require__(96);
const global_parameters_storage_1 = __webpack_require__(79);
const parameterMetadataAccessor = new parameter_metadata_accessor_1.ParameterMetadataAccessor();
const modelPropertiesAccessor = new model_properties_accessor_1.ModelPropertiesAccessor();
const parametersMetadataMapper = new parameters_metadata_mapper_1.ParametersMetadataMapper(modelPropertiesAccessor);
const swaggerTypesMapper = new swagger_types_mapper_1.SwaggerTypesMapper();
const schemaObjectFactory = new schema_object_factory_1.SchemaObjectFactory(modelPropertiesAccessor, swaggerTypesMapper);
const exploreApiParametersMetadata = (schemas, instance, prototype, method) => {
    const explicitParameters = Reflect.getMetadata(constants_1.DECORATORS.API_PARAMETERS, method);
    const globalParameters = global_parameters_storage_1.GlobalParametersStorage.getAll();
    const parametersMetadata = parameterMetadataAccessor.explore(instance, prototype, method);
    const noExplicitAndGlobalMetadata = (0, lodash_1.isNil)(explicitParameters) && (0, lodash_1.isNil)(globalParameters);
    if (noExplicitAndGlobalMetadata && (0, lodash_1.isNil)(parametersMetadata)) {
        return undefined;
    }
    const reflectedParametersAsProperties = parametersMetadataMapper.transformModelToProperties(parametersMetadata || {});
    let properties = reflectedParametersAsProperties;
    if (!noExplicitAndGlobalMetadata) {
        const mergeImplicitAndExplicit = (item) => (0, lodash_1.assign)(item, (0, lodash_1.find)(explicitParameters, ['name', item.name]));
        properties = removeBodyMetadataIfExplicitExists(properties, explicitParameters);
        properties = (0, lodash_1.map)(properties, mergeImplicitAndExplicit);
        properties = (0, lodash_1.unionWith)(properties, explicitParameters, globalParameters, (arrVal, othVal) => {
            return arrVal.name === othVal.name && arrVal.in === othVal.in;
        });
    }
    const paramsWithDefinitions = schemaObjectFactory.createFromModel(properties, schemas);
    const parameters = swaggerTypesMapper.mapParamTypes(paramsWithDefinitions);
    return parameters ? { parameters } : undefined;
};
exports.exploreApiParametersMetadata = exploreApiParametersMetadata;
function removeBodyMetadataIfExplicitExists(properties, explicitParams) {
    const isBodyReflected = (0, lodash_1.some)(properties, (p) => p.in === 'body');
    const isBodyDefinedExplicitly = (0, lodash_1.some)(explicitParams, (p) => p.in === 'body');
    if (isBodyReflected && isBodyDefinedExplicitly) {
        return (0, lodash_1.omitBy)(properties, (p) => p.in === 'body');
    }
    return properties;
}


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParameterMetadataAccessor = void 0;
const constants_1 = __webpack_require__(56);
const route_paramtypes_enum_1 = __webpack_require__(108);
const lodash_1 = __webpack_require__(48);
const reverse_object_keys_util_1 = __webpack_require__(109);
const PARAM_TOKEN_PLACEHOLDER = 'placeholder';
class ParameterMetadataAccessor {
    explore(instance, prototype, method) {
        const types = Reflect.getMetadata(constants_1.PARAMTYPES_METADATA, instance, method.name);
        if (!(types === null || types === void 0 ? void 0 : types.length)) {
            return undefined;
        }
        const routeArgsMetadata = Reflect.getMetadata(constants_1.ROUTE_ARGS_METADATA, instance.constructor, method.name) || {};
        const parametersWithType = (0, lodash_1.mapValues)((0, reverse_object_keys_util_1.reverseObjectKeys)(routeArgsMetadata), (param) => ({
            type: types[param.index],
            name: param.data,
            required: true
        }));
        const excludePredicate = (val) => val.in === PARAM_TOKEN_PLACEHOLDER || (val.name && val.in === 'body');
        const parameters = (0, lodash_1.omitBy)((0, lodash_1.mapValues)(parametersWithType, (val, key) => (Object.assign(Object.assign({}, val), { in: this.mapParamType(key) }))), excludePredicate);
        return !(0, lodash_1.isEmpty)(parameters) ? parameters : undefined;
    }
    mapParamType(key) {
        const keyPair = key.split(':');
        switch (Number(keyPair[0])) {
            case route_paramtypes_enum_1.RouteParamtypes.BODY:
                return 'body';
            case route_paramtypes_enum_1.RouteParamtypes.PARAM:
                return 'path';
            case route_paramtypes_enum_1.RouteParamtypes.QUERY:
                return 'query';
            case route_paramtypes_enum_1.RouteParamtypes.HEADERS:
                return 'header';
            default:
                return PARAM_TOKEN_PLACEHOLDER;
        }
    }
}
exports.ParameterMetadataAccessor = ParameterMetadataAccessor;


/***/ }),
/* 108 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/enums/route-paramtypes.enum");

/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reverseObjectKeys = reverseObjectKeys;
function reverseObjectKeys(originalObject) {
    const reversedObject = {};
    const keys = Object.keys(originalObject).reverse();
    for (const key of keys) {
        reversedObject[key] = originalObject[key];
    }
    return reversedObject;
}


/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParametersMetadataMapper = void 0;
const shared_utils_1 = __webpack_require__(10);
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const is_body_parameter_util_1 = __webpack_require__(92);
class ParametersMetadataMapper {
    constructor(modelPropertiesAccessor) {
        this.modelPropertiesAccessor = modelPropertiesAccessor;
    }
    transformModelToProperties(parameters) {
        const properties = (0, lodash_1.flatMap)(parameters, (param) => {
            if (!param || param.type === Object || !param.type) {
                return undefined;
            }
            if (param.name) {
                return param;
            }
            if ((0, is_body_parameter_util_1.isBodyParameter)(param)) {
                const isCtor = param.type && (0, shared_utils_1.isFunction)(param.type);
                const name = isCtor ? param.type.name : param.type;
                return Object.assign(Object.assign({}, param), { name });
            }
            const { prototype } = param.type;
            this.modelPropertiesAccessor.applyMetadataFactory(prototype);
            const modelProperties = this.modelPropertiesAccessor.getModelProperties(prototype);
            return modelProperties.map((key) => this.mergeImplicitWithExplicit(key, prototype, param));
        });
        return properties.filter(lodash_1.identity);
    }
    mergeImplicitWithExplicit(key, prototype, param) {
        const reflectedParam = Reflect.getMetadata(constants_1.DECORATORS.API_MODEL_PROPERTIES, prototype, key) ||
            {};
        return Object.assign(Object.assign(Object.assign({}, param), reflectedParam), { name: reflectedParam.name || key });
    }
}
exports.ParametersMetadataMapper = ParametersMetadataMapper;


/***/ }),
/* 111 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exploreApiResponseMetadata = exports.exploreGlobalApiResponseMetadata = void 0;
const common_1 = __webpack_require__(3);
const constants_1 = __webpack_require__(56);
const shared_utils_1 = __webpack_require__(10);
const lodash_1 = __webpack_require__(48);
const constants_2 = __webpack_require__(49);
const decorators_1 = __webpack_require__(45);
const plugin_constants_1 = __webpack_require__(55);
const response_object_factory_1 = __webpack_require__(112);
const merge_and_uniq_util_1 = __webpack_require__(116);
const responseObjectFactory = new response_object_factory_1.ResponseObjectFactory();
const exploreGlobalApiResponseMetadata = (schemas, metatype, factories) => {
    const responses = Reflect.getMetadata(constants_2.DECORATORS.API_RESPONSE, metatype);
    const produces = Reflect.getMetadata(constants_2.DECORATORS.API_PRODUCES, metatype);
    return responses
        ? {
            responses: mapResponsesToSwaggerResponses(responses, schemas, produces, factories)
        }
        : undefined;
};
exports.exploreGlobalApiResponseMetadata = exploreGlobalApiResponseMetadata;
const exploreApiResponseMetadata = (schemas, factories, instance, prototype, method) => {
    applyMetadataFactory(prototype, instance);
    const responses = Reflect.getMetadata(constants_2.DECORATORS.API_RESPONSE, method);
    if (responses) {
        const classProduces = Reflect.getMetadata(constants_2.DECORATORS.API_PRODUCES, prototype);
        const methodProduces = Reflect.getMetadata(constants_2.DECORATORS.API_PRODUCES, method);
        const produces = (0, merge_and_uniq_util_1.mergeAndUniq)((0, lodash_1.get)(classProduces, 'produces'), methodProduces);
        return mapResponsesToSwaggerResponses(responses, schemas, produces, factories);
    }
    const status = getStatusCode(method);
    if (status) {
        return { [status]: { description: '' } };
    }
    return undefined;
};
exports.exploreApiResponseMetadata = exploreApiResponseMetadata;
const getStatusCode = (method) => {
    const status = Reflect.getMetadata(constants_1.HTTP_CODE_METADATA, method);
    if (status) {
        return status;
    }
    const requestMethod = Reflect.getMetadata(constants_1.METHOD_METADATA, method);
    switch (requestMethod) {
        case common_1.RequestMethod.POST:
            return common_1.HttpStatus.CREATED;
        default:
            return common_1.HttpStatus.OK;
    }
};
const omitParamType = (param) => (0, lodash_1.omit)(param, 'type');
const mapResponsesToSwaggerResponses = (responses, schemas, produces = ['application/json'], factories) => {
    produces = (0, shared_utils_1.isEmpty)(produces) ? ['application/json'] : produces;
    const openApiResponses = (0, lodash_1.mapValues)(responses, (response) => responseObjectFactory.create(response, produces, schemas, factories));
    return (0, lodash_1.mapValues)(openApiResponses, omitParamType);
};
function applyMetadataFactory(prototype, instance) {
    const classPrototype = prototype;
    do {
        if (!prototype.constructor) {
            return;
        }
        if (!prototype.constructor[plugin_constants_1.METADATA_FACTORY_NAME]) {
            continue;
        }
        const metadata = prototype.constructor[plugin_constants_1.METADATA_FACTORY_NAME]();
        const methodKeys = Object.keys(metadata).filter((key) => typeof instance[key] === 'function');
        methodKeys.forEach((key) => {
            const _a = metadata[key], { summary, deprecated, tags } = _a, meta = __rest(_a, ["summary", "deprecated", "tags"]);
            if (Object.keys(meta).length === 0) {
                return;
            }
            if (meta.status === undefined) {
                meta.status = getStatusCode(instance[key]);
            }
            (0, decorators_1.ApiResponse)(meta, { overrideExisting: false })(classPrototype, key, Object.getOwnPropertyDescriptor(classPrototype, key));
        });
    } while ((prototype = Reflect.getPrototypeOf(prototype)) &&
        prototype !== Object.prototype &&
        prototype);
}


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseObjectFactory = void 0;
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const is_built_in_type_util_1 = __webpack_require__(93);
const mimetype_content_wrapper_1 = __webpack_require__(113);
const model_properties_accessor_1 = __webpack_require__(87);
const response_object_mapper_1 = __webpack_require__(115);
const schema_object_factory_1 = __webpack_require__(88);
const swagger_types_mapper_1 = __webpack_require__(96);
class ResponseObjectFactory {
    constructor() {
        this.mimetypeContentWrapper = new mimetype_content_wrapper_1.MimetypeContentWrapper();
        this.modelPropertiesAccessor = new model_properties_accessor_1.ModelPropertiesAccessor();
        this.swaggerTypesMapper = new swagger_types_mapper_1.SwaggerTypesMapper();
        this.schemaObjectFactory = new schema_object_factory_1.SchemaObjectFactory(this.modelPropertiesAccessor, this.swaggerTypesMapper);
        this.responseObjectMapper = new response_object_mapper_1.ResponseObjectMapper();
    }
    create(response, produces, schemas, factories) {
        var _a;
        const { type, isArray } = response;
        response = (0, lodash_1.omit)(response, ['isArray']);
        if (!type) {
            return this.responseObjectMapper.wrapSchemaWithContent(response, produces);
        }
        if ((0, is_built_in_type_util_1.isBuiltInType)(type)) {
            const typeName = type && (0, lodash_1.isFunction)(type) ? type.name : type;
            const swaggerType = this.swaggerTypesMapper.mapTypeToOpenAPIType(typeName);
            const exampleKeys = ['example', 'examples'];
            if (isArray) {
                const content = this.mimetypeContentWrapper.wrap(produces, {
                    schema: {
                        type: 'array',
                        items: {
                            type: swaggerType
                        }
                    }
                });
                return Object.assign(Object.assign({}, (0, lodash_1.omit)(response, exampleKeys)), content);
            }
            const content = this.mimetypeContentWrapper.wrap(produces, {
                schema: {
                    type: swaggerType
                }
            });
            return Object.assign(Object.assign({}, (0, lodash_1.omit)(response, exampleKeys)), content);
        }
        const name = this.schemaObjectFactory.exploreModelSchema(type, schemas);
        if ((0, lodash_1.isFunction)(type) && type.prototype) {
            const { prototype } = type;
            const links = {};
            const properties = this.modelPropertiesAccessor.getModelProperties(prototype);
            const generateLink = (controllerPrototype, method, parameter, field) => {
                const linkName = factories.linkName(controllerPrototype.constructor.name, method.name, field);
                links[linkName] = {
                    operationId: factories.operationId(controllerPrototype.constructor.name, method.name),
                    parameters: {
                        [parameter]: `$response.body#/${field}`
                    }
                };
            };
            for (const key of properties) {
                const metadata = (_a = Reflect.getMetadata(constants_1.DECORATORS.API_MODEL_PROPERTIES, prototype, key)) !== null && _a !== void 0 ? _a : {};
                if (!metadata.link) {
                    continue;
                }
                const linkedType = metadata.link();
                const linkedGetterInfo = Reflect.getMetadata(constants_1.DECORATORS.API_DEFAULT_GETTER, linkedType.prototype);
                if (!linkedGetterInfo) {
                    continue;
                }
                const { getter, parameter, prototype: controllerPrototype } = linkedGetterInfo;
                generateLink(controllerPrototype, getter, parameter, key);
            }
            const customLinks = Reflect.getMetadata(constants_1.DECORATORS.API_LINK, prototype);
            for (const customLink of customLinks !== null && customLinks !== void 0 ? customLinks : []) {
                const { method, parameter, field, prototype: controllerPrototype } = customLink;
                generateLink(controllerPrototype, method, parameter, field);
            }
            if (!(0, lodash_1.isEmpty)(links)) {
                response.links = Object.assign(links, response.links);
            }
        }
        if (isArray) {
            return this.responseObjectMapper.toArrayRefObject(response, name, produces);
        }
        return this.responseObjectMapper.toRefObject(response, name, produces);
    }
}
exports.ResponseObjectFactory = ResponseObjectFactory;


/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MimetypeContentWrapper = void 0;
const remove_undefined_keys_1 = __webpack_require__(114);
class MimetypeContentWrapper {
    wrap(mimetype, obj) {
        const content = mimetype.reduce((acc, item) => (Object.assign(Object.assign({}, acc), { [item]: (0, remove_undefined_keys_1.removeUndefinedKeys)(obj) })), {});
        return { content };
    }
}
exports.MimetypeContentWrapper = MimetypeContentWrapper;


/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeUndefinedKeys = removeUndefinedKeys;
function removeUndefinedKeys(obj) {
    Object.entries(obj).forEach(([key, value]) => {
        if (value === undefined) {
            delete obj[key];
        }
    });
    return obj;
}


/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseObjectMapper = void 0;
const lodash_1 = __webpack_require__(48);
const utils_1 = __webpack_require__(90);
const mimetype_content_wrapper_1 = __webpack_require__(113);
class ResponseObjectMapper {
    constructor() {
        this.mimetypeContentWrapper = new mimetype_content_wrapper_1.MimetypeContentWrapper();
    }
    toArrayRefObject(response, name, produces) {
        const exampleKeys = ['example', 'examples'];
        return Object.assign(Object.assign({}, (0, lodash_1.omit)(response, exampleKeys)), this.mimetypeContentWrapper.wrap(produces, Object.assign({ schema: {
                type: 'array',
                items: {
                    $ref: (0, utils_1.getSchemaPath)(name)
                }
            } }, (0, lodash_1.pick)(response, exampleKeys))));
    }
    toRefObject(response, name, produces) {
        const exampleKeys = ['example', 'examples'];
        return Object.assign(Object.assign({}, (0, lodash_1.omit)(response, exampleKeys)), this.mimetypeContentWrapper.wrap(produces, Object.assign({ schema: {
                $ref: (0, utils_1.getSchemaPath)(name)
            } }, (0, lodash_1.pick)(response, exampleKeys))));
    }
    wrapSchemaWithContent(response, produces) {
        if (!response.schema &&
            !('example' in response) &&
            !('examples' in response)) {
            return response;
        }
        const exampleKeys = ['example', 'examples'];
        const content = this.mimetypeContentWrapper.wrap(produces, Object.assign({ schema: response.schema }, (0, lodash_1.pick)(response, exampleKeys)));
        const keysToOmit = [...exampleKeys, 'schema'];
        return Object.assign(Object.assign({}, (0, lodash_1.omit)(response, keysToOmit)), content);
    }
}
exports.ResponseObjectMapper = ResponseObjectMapper;


/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeAndUniq = mergeAndUniq;
const lodash_1 = __webpack_require__(48);
function mergeAndUniq(a = [], b = []) {
    return (0, lodash_1.uniq)((0, lodash_1.merge)(a, b));
}


/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exploreApiSecurityMetadata = exports.exploreGlobalApiSecurityMetadata = void 0;
const constants_1 = __webpack_require__(49);
const exploreGlobalApiSecurityMetadata = (metatype) => {
    const security = Reflect.getMetadata(constants_1.DECORATORS.API_SECURITY, metatype);
    return security ? { security } : undefined;
};
exports.exploreGlobalApiSecurityMetadata = exploreGlobalApiSecurityMetadata;
const exploreApiSecurityMetadata = (instance, prototype, method) => {
    return Reflect.getMetadata(constants_1.DECORATORS.API_SECURITY, method);
};
exports.exploreApiSecurityMetadata = exploreApiSecurityMetadata;


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exploreApiTagsMetadata = exports.exploreGlobalApiTagsMetadata = void 0;
const constants_1 = __webpack_require__(49);
const exploreGlobalApiTagsMetadata = (autoTagControllers) => (metatype) => {
    const decoratorTags = Reflect.getMetadata(constants_1.DECORATORS.API_TAGS, metatype);
    const isEmpty = !decoratorTags || decoratorTags.length === 0;
    if (isEmpty && autoTagControllers) {
        const defaultTag = metatype.name.replace(/Controller$/, '');
        return {
            tags: [defaultTag]
        };
    }
    return isEmpty ? undefined : { tags: decoratorTags };
};
exports.exploreGlobalApiTagsMetadata = exploreGlobalApiTagsMetadata;
const exploreApiTagsMetadata = (instance, prototype, method) => Reflect.getMetadata(constants_1.DECORATORS.API_TAGS, method);
exports.exploreApiTagsMetadata = exploreApiTagsMetadata;


/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerTransformer = void 0;
const lodash_1 = __webpack_require__(48);
const sort_object_lexicographically_1 = __webpack_require__(120);
class SwaggerTransformer {
    normalizePaths(denormalizedDoc) {
        const roots = (0, lodash_1.filter)(denormalizedDoc, (r) => r.root);
        const groupedByPath = (0, lodash_1.groupBy)(roots, ({ root }) => root.path);
        const paths = (0, lodash_1.mapValues)(groupedByPath, (routes) => {
            const keyByMethod = (0, lodash_1.keyBy)(routes, ({ root }) => root.method);
            return (0, lodash_1.mapValues)(keyByMethod, (route) => {
                const mergedDefinition = Object.assign(Object.assign({}, (0, lodash_1.omit)(route, 'root')), (0, lodash_1.omit)(route.root, ['method', 'path']));
                return (0, sort_object_lexicographically_1.sortObjectLexicographically)(mergedDefinition);
            });
        });
        return {
            paths
        };
    }
    unescapeColonsInPath(app, moduleRoutes) {
        const httpAdapter = app.getHttpAdapter();
        const usingFastify = httpAdapter && httpAdapter.getType() === 'fastify';
        const unescapeColon = usingFastify
            ? (path) => path.replace(/:\{([^}]+)\}/g, ':$1')
            : (path) => path.replace(/\[:\]/g, ':');
        return moduleRoutes.map((moduleRoute) => (Object.assign(Object.assign({}, moduleRoute), { root: Object.assign(Object.assign({}, moduleRoute.root), { path: unescapeColon(moduleRoute.root.path) }) })));
    }
}
exports.SwaggerTransformer = SwaggerTransformer;


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sortObjectLexicographically = sortObjectLexicographically;
function sortObjectLexicographically(obj) {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj = {};
    for (const key of sortedKeys) {
        sortedObj[key] = obj[key];
    }
    return sortedObj;
}


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGlobalPrefix = getGlobalPrefix;
function getGlobalPrefix(app) {
    const internalConfigRef = app.config;
    return (internalConfigRef && internalConfigRef.getGlobalPrefix()) || '';
}


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stripLastSlash = stripLastSlash;
function stripLastSlash(path) {
    return path && path[path.length - 1] === '/'
        ? path.slice(0, path.length - 1)
        : path;
}


/***/ }),
/* 123 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(124), exports);


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildSwaggerInitJS = buildSwaggerInitJS;
exports.getSwaggerAssetsAbsoluteFSPath = getSwaggerAssetsAbsoluteFSPath;
exports.buildSwaggerHTML = buildSwaggerHTML;
const constants_1 = __webpack_require__(125);
const helpers_1 = __webpack_require__(126);
function buildSwaggerInitJS(swaggerDoc, customOptions = {}) {
    const { swaggerOptions = {}, swaggerUrl } = customOptions;
    const swaggerInitOptions = {
        swaggerDoc,
        swaggerUrl,
        customOptions: swaggerOptions
    };
    const jsInitOptions = (0, helpers_1.buildJSInitOptions)(swaggerInitOptions);
    return constants_1.jsTemplateString.replace('<% swaggerOptions %>', jsInitOptions);
}
let swaggerAssetsAbsoluteFSPath;
function getSwaggerAssetsAbsoluteFSPath() {
    if (!swaggerAssetsAbsoluteFSPath) {
        swaggerAssetsAbsoluteFSPath = __webpack_require__(127)();
    }
    return swaggerAssetsAbsoluteFSPath;
}
function toExternalScriptTag(url) {
    return `<script src='${url}'></script>`;
}
function toInlineScriptTag(jsCode) {
    return `<script>${jsCode}</script>`;
}
function toExternalStylesheetTag(url) {
    return `<link href='${url}' rel='stylesheet'>`;
}
function toTags(customCode, toScript) {
    if (!customCode) {
        return '';
    }
    if (typeof customCode === 'string') {
        return toScript(customCode);
    }
    else {
        return customCode.map(toScript).join('\n');
    }
}
function buildSwaggerHTML(baseUrl, customOptions = {}) {
    const { customCss = '', customJs = '', customJsStr = '', customfavIcon = false, customSiteTitle = 'Swagger UI', customCssUrl = '', explorer = false } = customOptions;
    const favIconString = customfavIcon
        ? `<link rel='icon' href='${customfavIcon}' />`
        : constants_1.favIconHtml;
    const explorerCss = explorer
        ? ''
        : '.swagger-ui .topbar .download-url-wrapper { display: none }';
    return constants_1.htmlTemplateString
        .replace('<% customCss %>', customCss)
        .replace('<% explorerCss %>', explorerCss)
        .replace('<% favIconString %>', favIconString)
        .replace(/<% baseUrl %>/g, baseUrl)
        .replace('<% customJs %>', toTags(customJs, toExternalScriptTag))
        .replace('<% customJsStr %>', toTags(customJsStr, toInlineScriptTag))
        .replace('<% customCssUrl %>', toTags(customCssUrl, toExternalStylesheetTag))
        .replace('<% title %>', customSiteTitle);
}


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jsTemplateString = exports.htmlTemplateString = exports.favIconHtml = void 0;
exports.favIconHtml = '<link rel="icon" type="image/png" href="<% baseUrl %>favicon-32x32.png" sizes="32x32" />' +
    '<link rel="icon" type="image/png" href="<% baseUrl %>favicon-16x16.png" sizes="16x16" />';
exports.htmlTemplateString = `
<!-- HTML for static distribution bundle build -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><% title %></title>
  <link rel="stylesheet" type="text/css" href="<% baseUrl %>swagger-ui.css" >
  <% favIconString %>
  <style>
    html
    {
      box-sizing: border-box;
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }
    *,
    *:before,
    *:after
    {
      box-sizing: inherit;
    }

    body {
      margin:0;
      background: #fafafa;
    }
  </style>
</head>

<body>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
  <defs>
    <symbol viewBox="0 0 20 20" id="unlocked">
      <path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V6h2v-.801C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8z"></path>
    </symbol>

    <symbol viewBox="0 0 20 20" id="locked">
      <path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8zM12 8H8V5.199C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8z"/>
    </symbol>

    <symbol viewBox="0 0 20 20" id="close">
      <path d="M14.348 14.849c-.469.469-1.229.469-1.697 0L10 11.819l-2.651 3.029c-.469.469-1.229.469-1.697 0-.469-.469-.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-.469-.469-.469-1.228 0-1.697.469-.469 1.228-.469 1.697 0L10 8.183l2.651-3.031c.469-.469 1.228-.469 1.697 0 .469.469.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c.469.469.469 1.229 0 1.698z"/>
    </symbol>

    <symbol viewBox="0 0 20 20" id="large-arrow">
      <path d="M13.25 10L6.109 2.58c-.268-.27-.268-.707 0-.979.268-.27.701-.27.969 0l7.83 7.908c.268.271.268.709 0 .979l-7.83 7.908c-.268.271-.701.27-.969 0-.268-.269-.268-.707 0-.979L13.25 10z"/>
    </symbol>

    <symbol viewBox="0 0 20 20" id="large-arrow-down">
      <path d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z"/>
    </symbol>


    <symbol viewBox="0 0 24 24" id="jump-to">
      <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
    </symbol>

    <symbol viewBox="0 0 24 24" id="expand">
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
    </symbol>

  </defs>
</svg>

<div id="swagger-ui"></div>

<script src="<% baseUrl %>swagger-ui-bundle.js"> </script>
<script src="<% baseUrl %>swagger-ui-standalone-preset.js"> </script>
<script src="<% baseUrl %>swagger-ui-init.js"> </script>
<% customJs %>
<% customJsStr %>
<% customCssUrl %>
<style>
  <% customCss %>
  <% explorerCss %>
</style>
</body>

</html>
`;
exports.jsTemplateString = `
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  <% swaggerOptions %>
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
`;


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildJSInitOptions = buildJSInitOptions;
function buildJSInitOptions(initOptions) {
    const functionPlaceholder = '____FUNCTION_PLACEHOLDER____';
    const fns = [];
    let json = JSON.stringify(initOptions, (key, value) => {
        if (typeof value === 'function') {
            fns.push(value);
            return functionPlaceholder;
        }
        return value;
    }, 2);
    json = json.replace(new RegExp('"' + functionPlaceholder + '"', 'g'), () => fns.shift());
    return `let options = ${json};`;
}


/***/ }),
/* 127 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
 * getAbsoluteFSPath
 * @return {string} When run in NodeJS env, returns the absolute path to the current directory
 *                  When run outside of NodeJS, will return an error message
 */
const getAbsoluteFSPath = function () {
  // detect whether we are running in a browser or nodejs
  if ( true && module.exports) {
    return (__webpack_require__(13).resolve)(__dirname)
  }
  throw new Error('getAbsoluteFSPath can only be called within a Nodejs environment');
}

module.exports = getAbsoluteFSPath


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assignTwoLevelsDeep = assignTwoLevelsDeep;
function assignTwoLevelsDeep(_dest, ...args) {
    const dest = _dest;
    for (const arg of args) {
        for (const [key, value] of Object.entries(arg !== null && arg !== void 0 ? arg : {})) {
            dest[key] = Object.assign(Object.assign({}, dest[key]), value);
        }
    }
    return dest;
}


/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.normalizeRelPath = normalizeRelPath;
function normalizeRelPath(input) {
    const output = input.replace(/\/\/+/g, '/');
    return output;
}


/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolvePath = resolvePath;
const pathLib = __webpack_require__(13);
function resolvePath(path) {
    return path ? pathLib.resolve(path) : path;
}


/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateGlobalPrefix = void 0;
const validateGlobalPrefix = (globalPrefix) => globalPrefix && !globalPrefix.match(/^(\/?)$/);
exports.validateGlobalPrefix = validateGlobalPrefix;


/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validatePath = void 0;
const validatePath = (inputPath) => inputPath.charAt(0) !== '/' ? '/' + inputPath : inputPath;
exports.validatePath = validatePath;


/***/ }),
/* 133 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(134), exports);
__exportStar(__webpack_require__(148), exports);
__exportStar(__webpack_require__(149), exports);
__exportStar(__webpack_require__(150), exports);


/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IntersectionType = IntersectionType;
const mapped_types_1 = __webpack_require__(135);
const constants_1 = __webpack_require__(49);
const decorators_1 = __webpack_require__(45);
const metadata_loader_1 = __webpack_require__(85);
const model_properties_accessor_1 = __webpack_require__(87);
const mapped_types_utils_1 = __webpack_require__(147);
const modelPropertiesAccessor = new model_properties_accessor_1.ModelPropertiesAccessor();
function IntersectionType(...classRefs) {
    class IntersectionClassType {
        constructor() {
            classRefs.forEach((classRef) => {
                (0, mapped_types_1.inheritPropertyInitializers)(this, classRef);
            });
        }
    }
    classRefs.forEach((classRef) => {
        const fields = modelPropertiesAccessor.getModelProperties(classRef.prototype);
        (0, mapped_types_1.inheritValidationMetadata)(classRef, IntersectionClassType);
        (0, mapped_types_1.inheritTransformationMetadata)(classRef, IntersectionClassType);
        function applyFields(fields) {
            (0, mapped_types_utils_1.clonePluginMetadataFactory)(IntersectionClassType, classRef.prototype);
            fields.forEach((propertyKey) => {
                const metadata = Reflect.getMetadata(constants_1.DECORATORS.API_MODEL_PROPERTIES, classRef.prototype, propertyKey);
                const decoratorFactory = (0, decorators_1.ApiProperty)(metadata);
                decoratorFactory(IntersectionClassType.prototype, propertyKey);
            });
        }
        applyFields(fields);
        metadata_loader_1.MetadataLoader.addRefreshHook(() => {
            const fields = modelPropertiesAccessor.getModelProperties(classRef.prototype);
            applyFields(fields);
        });
    });
    const intersectedNames = classRefs.reduce((prev, ref) => prev + ref.name, '');
    Object.defineProperty(IntersectionClassType, 'name', {
        value: `Intersection${intersectedNames}`
    });
    return IntersectionClassType;
}


/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(136));


/***/ }),
/* 136 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inheritValidationMetadata = exports.inheritTransformationMetadata = exports.inheritPropertyInitializers = exports.applyValidateIfDefinedDecorator = exports.applyIsOptionalDecorator = void 0;
__exportStar(__webpack_require__(137), exports);
__exportStar(__webpack_require__(143), exports);
__exportStar(__webpack_require__(144), exports);
__exportStar(__webpack_require__(145), exports);
__exportStar(__webpack_require__(146), exports);
var type_helpers_utils_1 = __webpack_require__(138);
Object.defineProperty(exports, "applyIsOptionalDecorator", ({ enumerable: true, get: function () { return type_helpers_utils_1.applyIsOptionalDecorator; } }));
Object.defineProperty(exports, "applyValidateIfDefinedDecorator", ({ enumerable: true, get: function () { return type_helpers_utils_1.applyValidateIfDefinedDecorator; } }));
Object.defineProperty(exports, "inheritPropertyInitializers", ({ enumerable: true, get: function () { return type_helpers_utils_1.inheritPropertyInitializers; } }));
Object.defineProperty(exports, "inheritTransformationMetadata", ({ enumerable: true, get: function () { return type_helpers_utils_1.inheritTransformationMetadata; } }));
Object.defineProperty(exports, "inheritValidationMetadata", ({ enumerable: true, get: function () { return type_helpers_utils_1.inheritValidationMetadata; } }));


/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IntersectionType = void 0;
const type_helpers_utils_1 = __webpack_require__(138);
function IntersectionType(...classRefs) {
    class IntersectionClassType {
        constructor() {
            classRefs.forEach((classRef) => {
                (0, type_helpers_utils_1.inheritPropertyInitializers)(this, classRef);
            });
        }
    }
    classRefs.forEach((classRef) => {
        (0, type_helpers_utils_1.inheritValidationMetadata)(classRef, IntersectionClassType);
        (0, type_helpers_utils_1.inheritTransformationMetadata)(classRef, IntersectionClassType, undefined, false);
    });
    const intersectedNames = classRefs.reduce((prev, ref) => prev + ref.name, '');
    Object.defineProperty(IntersectionClassType, 'name', {
        value: `Intersection${intersectedNames}`,
    });
    return IntersectionClassType;
}
exports.IntersectionType = IntersectionType;


/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inheritPropertyInitializers = exports.inheritTransformationMetadata = exports.inheritValidationMetadata = exports.applyValidateIfDefinedDecorator = exports.applyIsOptionalDecorator = void 0;
const common_1 = __webpack_require__(3);
const logger = new common_1.Logger('MappedTypes');
function applyIsOptionalDecorator(targetClass, propertyKey) {
    if (!isClassValidatorAvailable()) {
        return;
    }
    const classValidator = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'class-validator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    const decoratorFactory = classValidator.IsOptional();
    decoratorFactory(targetClass.prototype, propertyKey);
}
exports.applyIsOptionalDecorator = applyIsOptionalDecorator;
function applyValidateIfDefinedDecorator(targetClass, propertyKey) {
    if (!isClassValidatorAvailable()) {
        return;
    }
    const classValidator = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'class-validator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    const decoratorFactory = classValidator.ValidateIf((_, value) => value !== undefined);
    decoratorFactory(targetClass.prototype, propertyKey);
}
exports.applyValidateIfDefinedDecorator = applyValidateIfDefinedDecorator;
function inheritValidationMetadata(parentClass, targetClass, isPropertyInherited) {
    if (!isClassValidatorAvailable()) {
        return;
    }
    try {
        const classValidator = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'class-validator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
        const metadataStorage = classValidator.getMetadataStorage
            ? classValidator.getMetadataStorage()
            : classValidator.getFromContainer(classValidator.MetadataStorage);
        const getTargetValidationMetadatasArgs = [parentClass, null, false, false];
        const targetMetadata = metadataStorage.getTargetValidationMetadatas(...getTargetValidationMetadatasArgs);
        return targetMetadata
            .filter(({ propertyName }) => !isPropertyInherited || isPropertyInherited(propertyName))
            .map((value) => {
            const originalType = Reflect.getMetadata('design:type', parentClass.prototype, value.propertyName);
            if (originalType) {
                Reflect.defineMetadata('design:type', originalType, targetClass.prototype, value.propertyName);
            }
            metadataStorage.addValidationMetadata({
                ...value,
                target: targetClass,
            });
            return value.propertyName;
        });
    }
    catch (err) {
        logger.error(`Validation ("class-validator") metadata cannot be inherited for "${parentClass.name}" class.`);
        logger.error(err);
    }
}
exports.inheritValidationMetadata = inheritValidationMetadata;
function inheritTransformationMetadata(parentClass, targetClass, isPropertyInherited, stackDecorators = true) {
    if (!isClassTransformerAvailable()) {
        return;
    }
    try {
        const transformMetadataKeys = [
            '_excludeMetadatas',
            '_exposeMetadatas',
            '_transformMetadatas',
            '_typeMetadatas',
        ];
        transformMetadataKeys.forEach((key) => inheritTransformerMetadata(key, parentClass, targetClass, isPropertyInherited, stackDecorators));
    }
    catch (err) {
        logger.error(`Transformer ("class-transformer") metadata cannot be inherited for "${parentClass.name}" class.`);
        logger.error(err);
    }
}
exports.inheritTransformationMetadata = inheritTransformationMetadata;
function inheritTransformerMetadata(key, parentClass, targetClass, isPropertyInherited, stackDecorators = true) {
    let classTransformer;
    try {
        classTransformer = __webpack_require__(139);
    }
    catch {
        classTransformer = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'class-transformer/storage'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    }
    const metadataStorage = classTransformer.defaultMetadataStorage;
    while (parentClass && parentClass !== Object) {
        if (metadataStorage[key].has(parentClass)) {
            const metadataMap = metadataStorage[key];
            const parentMetadata = metadataMap.get(parentClass);
            const targetMetadataEntries = Array.from(parentMetadata.entries())
                .filter(([key]) => !isPropertyInherited || isPropertyInherited(key))
                .map(([key, metadata]) => {
                if (Array.isArray(metadata)) {
                    const targetMetadata = metadata.map((item) => ({
                        ...item,
                        target: targetClass,
                    }));
                    return [key, targetMetadata];
                }
                return [key, { ...metadata, target: targetClass }];
            });
            if (metadataMap.has(targetClass)) {
                const existingRules = metadataMap.get(targetClass).entries();
                const mergeMap = new Map();
                [existingRules, targetMetadataEntries].forEach((entries) => {
                    for (const [valueKey, value] of entries) {
                        if (mergeMap.has(valueKey) && stackDecorators) {
                            const parentValue = mergeMap.get(valueKey);
                            if (Array.isArray(parentValue)) {
                                parentValue.push(...(Array.isArray(value) ? value : [value]));
                            }
                        }
                        else {
                            mergeMap.set(valueKey, value);
                        }
                    }
                });
                metadataMap.set(targetClass, mergeMap);
            }
            else {
                metadataMap.set(targetClass, new Map(targetMetadataEntries));
            }
        }
        parentClass = Object.getPrototypeOf(parentClass);
    }
}
function isClassValidatorAvailable() {
    try {
        __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'class-validator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
        return true;
    }
    catch {
        return false;
    }
}
function isClassTransformerAvailable() {
    try {
        __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'class-transformer'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
        return true;
    }
    catch {
        return false;
    }
}
function inheritPropertyInitializers(target, sourceClass, isPropertyInherited = (key) => true) {
    try {
        const tempInstance = new sourceClass();
        const propertyNames = Object.getOwnPropertyNames(tempInstance);
        propertyNames
            .filter((propertyName) => typeof tempInstance[propertyName] !== 'undefined' &&
            typeof target[propertyName] === 'undefined')
            .filter((propertyName) => isPropertyInherited(propertyName))
            .forEach((propertyName) => {
            target[propertyName] = tempInstance[propertyName];
        });
    }
    catch { }
}
exports.inheritPropertyInitializers = inheritPropertyInitializers;


/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultMetadataStorage = void 0;
const MetadataStorage_1 = __webpack_require__(140);
/**
 * Default metadata storage is used as singleton and can be used to storage all metadatas.
 */
exports.defaultMetadataStorage = new MetadataStorage_1.MetadataStorage();
//# sourceMappingURL=storage.js.map

/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataStorage = void 0;
const enums_1 = __webpack_require__(141);
/**
 * Storage all library metadata.
 */
class MetadataStorage {
    constructor() {
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this._typeMetadatas = new Map();
        this._transformMetadatas = new Map();
        this._exposeMetadatas = new Map();
        this._excludeMetadatas = new Map();
        this._ancestorsMap = new Map();
    }
    // -------------------------------------------------------------------------
    // Adder Methods
    // -------------------------------------------------------------------------
    addTypeMetadata(metadata) {
        if (!this._typeMetadatas.has(metadata.target)) {
            this._typeMetadatas.set(metadata.target, new Map());
        }
        this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    }
    addTransformMetadata(metadata) {
        if (!this._transformMetadatas.has(metadata.target)) {
            this._transformMetadatas.set(metadata.target, new Map());
        }
        if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
            this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
        }
        this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
    }
    addExposeMetadata(metadata) {
        if (!this._exposeMetadatas.has(metadata.target)) {
            this._exposeMetadatas.set(metadata.target, new Map());
        }
        this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    }
    addExcludeMetadata(metadata) {
        if (!this._excludeMetadatas.has(metadata.target)) {
            this._excludeMetadatas.set(metadata.target, new Map());
        }
        this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    findTransformMetadatas(target, propertyName, transformationType) {
        return this.findMetadatas(this._transformMetadatas, target, propertyName).filter(metadata => {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return (transformationType === enums_1.TransformationType.CLASS_TO_CLASS ||
                    transformationType === enums_1.TransformationType.PLAIN_TO_CLASS);
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === enums_1.TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        });
    }
    findExcludeMetadata(target, propertyName) {
        return this.findMetadata(this._excludeMetadatas, target, propertyName);
    }
    findExposeMetadata(target, propertyName) {
        return this.findMetadata(this._exposeMetadatas, target, propertyName);
    }
    findExposeMetadataByCustomName(target, name) {
        return this.getExposedMetadatas(target).find(metadata => {
            return metadata.options && metadata.options.name === name;
        });
    }
    findTypeMetadata(target, propertyName) {
        return this.findMetadata(this._typeMetadatas, target, propertyName);
    }
    getStrategy(target) {
        const excludeMap = this._excludeMetadatas.get(target);
        const exclude = excludeMap && excludeMap.get(undefined);
        const exposeMap = this._exposeMetadatas.get(target);
        const expose = exposeMap && exposeMap.get(undefined);
        if ((exclude && expose) || (!exclude && !expose))
            return 'none';
        return exclude ? 'excludeAll' : 'exposeAll';
    }
    getExposedMetadatas(target) {
        return this.getMetadata(this._exposeMetadatas, target);
    }
    getExcludedMetadatas(target) {
        return this.getMetadata(this._excludeMetadatas, target);
    }
    getExposedProperties(target, transformationType) {
        return this.getExposedMetadatas(target)
            .filter(metadata => {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return (transformationType === enums_1.TransformationType.CLASS_TO_CLASS ||
                    transformationType === enums_1.TransformationType.PLAIN_TO_CLASS);
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === enums_1.TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        })
            .map(metadata => metadata.propertyName);
    }
    getExcludedProperties(target, transformationType) {
        return this.getExcludedMetadatas(target)
            .filter(metadata => {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return (transformationType === enums_1.TransformationType.CLASS_TO_CLASS ||
                    transformationType === enums_1.TransformationType.PLAIN_TO_CLASS);
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === enums_1.TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        })
            .map(metadata => metadata.propertyName);
    }
    clear() {
        this._typeMetadatas.clear();
        this._exposeMetadatas.clear();
        this._excludeMetadatas.clear();
        this._ancestorsMap.clear();
    }
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    getMetadata(metadatas, target) {
        const metadataFromTargetMap = metadatas.get(target);
        let metadataFromTarget;
        if (metadataFromTargetMap) {
            metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(meta => meta.propertyName !== undefined);
        }
        const metadataFromAncestors = [];
        for (const ancestor of this.getAncestors(target)) {
            const ancestorMetadataMap = metadatas.get(ancestor);
            if (ancestorMetadataMap) {
                const metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(meta => meta.propertyName !== undefined);
                metadataFromAncestors.push(...metadataFromAncestor);
            }
        }
        return metadataFromAncestors.concat(metadataFromTarget || []);
    }
    findMetadata(metadatas, target, propertyName) {
        const metadataFromTargetMap = metadatas.get(target);
        if (metadataFromTargetMap) {
            const metadataFromTarget = metadataFromTargetMap.get(propertyName);
            if (metadataFromTarget) {
                return metadataFromTarget;
            }
        }
        for (const ancestor of this.getAncestors(target)) {
            const ancestorMetadataMap = metadatas.get(ancestor);
            if (ancestorMetadataMap) {
                const ancestorResult = ancestorMetadataMap.get(propertyName);
                if (ancestorResult) {
                    return ancestorResult;
                }
            }
        }
        return undefined;
    }
    findMetadatas(metadatas, target, propertyName) {
        const metadataFromTargetMap = metadatas.get(target);
        let metadataFromTarget;
        if (metadataFromTargetMap) {
            metadataFromTarget = metadataFromTargetMap.get(propertyName);
        }
        const metadataFromAncestorsTarget = [];
        for (const ancestor of this.getAncestors(target)) {
            const ancestorMetadataMap = metadatas.get(ancestor);
            if (ancestorMetadataMap) {
                if (ancestorMetadataMap.has(propertyName)) {
                    metadataFromAncestorsTarget.push(...ancestorMetadataMap.get(propertyName));
                }
            }
        }
        return metadataFromAncestorsTarget
            .slice()
            .reverse()
            .concat((metadataFromTarget || []).slice().reverse());
    }
    getAncestors(target) {
        if (!target)
            return [];
        if (!this._ancestorsMap.has(target)) {
            const ancestors = [];
            for (let baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== 'undefined'; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
                ancestors.push(baseClass);
            }
            this._ancestorsMap.set(target, ancestors);
        }
        return this._ancestorsMap.get(target);
    }
}
exports.MetadataStorage = MetadataStorage;
//# sourceMappingURL=MetadataStorage.js.map

/***/ }),
/* 141 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(142), exports);
//# sourceMappingURL=index.js.map

/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformationType = void 0;
var TransformationType;
(function (TransformationType) {
    TransformationType[TransformationType["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
    TransformationType[TransformationType["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
    TransformationType[TransformationType["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
})(TransformationType = exports.TransformationType || (exports.TransformationType = {}));
//# sourceMappingURL=transformation-type.enum.js.map

/***/ }),
/* 143 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 144 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OmitType = void 0;
const type_helpers_utils_1 = __webpack_require__(138);
function OmitType(classRef, keys) {
    const isInheritedPredicate = (propertyKey) => !keys.includes(propertyKey);
    class OmitClassType {
        constructor() {
            (0, type_helpers_utils_1.inheritPropertyInitializers)(this, classRef, isInheritedPredicate);
        }
    }
    (0, type_helpers_utils_1.inheritValidationMetadata)(classRef, OmitClassType, isInheritedPredicate);
    (0, type_helpers_utils_1.inheritTransformationMetadata)(classRef, OmitClassType, isInheritedPredicate);
    return OmitClassType;
}
exports.OmitType = OmitType;


/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartialType = void 0;
const type_helpers_utils_1 = __webpack_require__(138);
function PartialType(classRef, options = {}) {
    class PartialClassType {
        constructor() {
            (0, type_helpers_utils_1.inheritPropertyInitializers)(this, classRef);
        }
    }
    const propertyKeys = (0, type_helpers_utils_1.inheritValidationMetadata)(classRef, PartialClassType);
    (0, type_helpers_utils_1.inheritTransformationMetadata)(classRef, PartialClassType);
    if (propertyKeys) {
        propertyKeys.forEach((key) => {
            options.skipNullProperties === false
                ? (0, type_helpers_utils_1.applyValidateIfDefinedDecorator)(PartialClassType, key)
                : (0, type_helpers_utils_1.applyIsOptionalDecorator)(PartialClassType, key);
        });
    }
    Object.defineProperty(PartialClassType, 'name', {
        value: `Partial${classRef.name}`,
    });
    return PartialClassType;
}
exports.PartialType = PartialType;


/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PickType = void 0;
const type_helpers_utils_1 = __webpack_require__(138);
function PickType(classRef, keys) {
    const isInheritedPredicate = (propertyKey) => keys.includes(propertyKey);
    class PickClassType {
        constructor() {
            (0, type_helpers_utils_1.inheritPropertyInitializers)(this, classRef, isInheritedPredicate);
        }
    }
    (0, type_helpers_utils_1.inheritValidationMetadata)(classRef, PickClassType, isInheritedPredicate);
    (0, type_helpers_utils_1.inheritTransformationMetadata)(classRef, PickClassType, isInheritedPredicate);
    return PickClassType;
}
exports.PickType = PickType;


/***/ }),
/* 147 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clonePluginMetadataFactory = clonePluginMetadataFactory;
const lodash_1 = __webpack_require__(48);
const plugin_constants_1 = __webpack_require__(55);
function clonePluginMetadataFactory(target, parent, transformFn = lodash_1.identity) {
    let targetMetadata = {};
    do {
        if (!parent.constructor) {
            return;
        }
        if (!parent.constructor[plugin_constants_1.METADATA_FACTORY_NAME]) {
            continue;
        }
        const parentMetadata = parent.constructor[plugin_constants_1.METADATA_FACTORY_NAME]();
        targetMetadata = Object.assign(Object.assign({}, parentMetadata), targetMetadata);
    } while ((parent = Reflect.getPrototypeOf(parent)) &&
        parent !== Object.prototype &&
        parent);
    targetMetadata = transformFn(targetMetadata);
    if (target[plugin_constants_1.METADATA_FACTORY_NAME]) {
        const originalFactory = target[plugin_constants_1.METADATA_FACTORY_NAME];
        target[plugin_constants_1.METADATA_FACTORY_NAME] = () => {
            const originalMetadata = originalFactory();
            return Object.assign(Object.assign({}, originalMetadata), targetMetadata);
        };
    }
    else {
        target[plugin_constants_1.METADATA_FACTORY_NAME] = () => targetMetadata;
    }
}


/***/ }),
/* 148 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OmitType = OmitType;
const mapped_types_1 = __webpack_require__(135);
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const decorators_1 = __webpack_require__(45);
const metadata_loader_1 = __webpack_require__(85);
const model_properties_accessor_1 = __webpack_require__(87);
const mapped_types_utils_1 = __webpack_require__(147);
const modelPropertiesAccessor = new model_properties_accessor_1.ModelPropertiesAccessor();
function OmitType(classRef, keys) {
    const fields = modelPropertiesAccessor
        .getModelProperties(classRef.prototype)
        .filter((item) => !keys.includes(item));
    const isInheritedPredicate = (propertyKey) => !keys.includes(propertyKey);
    class OmitTypeClass {
        constructor() {
            (0, mapped_types_1.inheritPropertyInitializers)(this, classRef, isInheritedPredicate);
        }
    }
    (0, mapped_types_1.inheritValidationMetadata)(classRef, OmitTypeClass, isInheritedPredicate);
    (0, mapped_types_1.inheritTransformationMetadata)(classRef, OmitTypeClass, isInheritedPredicate);
    function applyFields(fields) {
        (0, mapped_types_utils_1.clonePluginMetadataFactory)(OmitTypeClass, classRef.prototype, (metadata) => (0, lodash_1.omit)(metadata, keys));
        fields.forEach((propertyKey) => {
            const metadata = Reflect.getMetadata(constants_1.DECORATORS.API_MODEL_PROPERTIES, classRef.prototype, propertyKey);
            const decoratorFactory = (0, decorators_1.ApiProperty)(metadata);
            decoratorFactory(OmitTypeClass.prototype, propertyKey);
        });
    }
    applyFields(fields);
    metadata_loader_1.MetadataLoader.addRefreshHook(() => {
        const fields = modelPropertiesAccessor
            .getModelProperties(classRef.prototype)
            .filter((item) => !keys.includes(item));
        applyFields(fields);
    });
    return OmitTypeClass;
}


/***/ }),
/* 149 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartialType = PartialType;
const mapped_types_1 = __webpack_require__(135);
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const decorators_1 = __webpack_require__(45);
const metadata_loader_1 = __webpack_require__(85);
const plugin_constants_1 = __webpack_require__(55);
const model_properties_accessor_1 = __webpack_require__(87);
const mapped_types_utils_1 = __webpack_require__(147);
const modelPropertiesAccessor = new model_properties_accessor_1.ModelPropertiesAccessor();
function PartialType(classRef, options = {}) {
    const applyPartialDecoratorFn = options.skipNullProperties === false
        ? mapped_types_1.applyValidateIfDefinedDecorator
        : mapped_types_1.applyIsOptionalDecorator;
    const fields = modelPropertiesAccessor.getModelProperties(classRef.prototype);
    class PartialTypeClass {
        constructor() {
            (0, mapped_types_1.inheritPropertyInitializers)(this, classRef);
        }
    }
    const keysWithValidationConstraints = (0, mapped_types_1.inheritValidationMetadata)(classRef, PartialTypeClass);
    if (keysWithValidationConstraints) {
        keysWithValidationConstraints
            .filter((key) => !fields.includes(key))
            .forEach((key) => applyPartialDecoratorFn(PartialTypeClass, key));
    }
    (0, mapped_types_1.inheritTransformationMetadata)(classRef, PartialTypeClass);
    function applyFields(fields) {
        (0, mapped_types_utils_1.clonePluginMetadataFactory)(PartialTypeClass, classRef.prototype, (metadata) => (0, lodash_1.mapValues)(metadata, (item) => (Object.assign(Object.assign({}, item), { required: false }))));
        if (PartialTypeClass[plugin_constants_1.METADATA_FACTORY_NAME]) {
            const pluginFields = Object.keys(PartialTypeClass[plugin_constants_1.METADATA_FACTORY_NAME]());
            pluginFields.forEach((key) => applyPartialDecoratorFn(PartialTypeClass, key));
        }
        fields.forEach((key) => {
            const metadata = Reflect.getMetadata(constants_1.DECORATORS.API_MODEL_PROPERTIES, classRef.prototype, key) || {};
            const decoratorFactory = (0, decorators_1.ApiProperty)(Object.assign(Object.assign({}, metadata), { required: false }));
            decoratorFactory(PartialTypeClass.prototype, key);
            applyPartialDecoratorFn(PartialTypeClass, key);
        });
    }
    applyFields(fields);
    metadata_loader_1.MetadataLoader.addRefreshHook(() => {
        const fields = modelPropertiesAccessor.getModelProperties(classRef.prototype);
        applyFields(fields);
    });
    return PartialTypeClass;
}


/***/ }),
/* 150 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PickType = PickType;
const mapped_types_1 = __webpack_require__(135);
const lodash_1 = __webpack_require__(48);
const constants_1 = __webpack_require__(49);
const decorators_1 = __webpack_require__(45);
const metadata_loader_1 = __webpack_require__(85);
const model_properties_accessor_1 = __webpack_require__(87);
const mapped_types_utils_1 = __webpack_require__(147);
const modelPropertiesAccessor = new model_properties_accessor_1.ModelPropertiesAccessor();
function PickType(classRef, keys) {
    const fields = modelPropertiesAccessor
        .getModelProperties(classRef.prototype)
        .filter((item) => keys.includes(item));
    const isInheritedPredicate = (propertyKey) => keys.includes(propertyKey);
    class PickTypeClass {
        constructor() {
            (0, mapped_types_1.inheritPropertyInitializers)(this, classRef, isInheritedPredicate);
        }
    }
    (0, mapped_types_1.inheritValidationMetadata)(classRef, PickTypeClass, isInheritedPredicate);
    (0, mapped_types_1.inheritTransformationMetadata)(classRef, PickTypeClass, isInheritedPredicate);
    function applyFields(fields) {
        (0, mapped_types_utils_1.clonePluginMetadataFactory)(PickTypeClass, classRef.prototype, (metadata) => (0, lodash_1.pick)(metadata, keys));
        fields.forEach((propertyKey) => {
            const metadata = Reflect.getMetadata(constants_1.DECORATORS.API_MODEL_PROPERTIES, classRef.prototype, propertyKey);
            const decoratorFactory = (0, decorators_1.ApiProperty)(metadata);
            decoratorFactory(PickTypeClass.prototype, propertyKey);
        });
    }
    applyFields(fields);
    metadata_loader_1.MetadataLoader.addRefreshHook(() => {
        const fields = modelPropertiesAccessor
            .getModelProperties(classRef.prototype)
            .filter((item) => keys.includes(item));
        applyFields(fields);
    });
    return PickTypeClass;
}


/***/ }),
/* 151 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CustomersService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomersService = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(152);
const wallet_grpc_service_1 = __webpack_require__(168);
const bcrypt = __importStar(__webpack_require__(169));
const rxjs_1 = __webpack_require__(24);
let CustomersService = CustomersService_1 = class CustomersService {
    prisma;
    walletGrpcService;
    logger = new common_1.Logger(CustomersService_1.name);
    constructor(prisma, walletGrpcService) {
        this.prisma = prisma;
        this.walletGrpcService = walletGrpcService;
    }
    async createCustomer(data) {
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { email: data.email },
        });
        if (existingCustomer) {
            throw new common_1.ConflictException('Customer with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(data.password, 5);
        const customer = await this.prisma.customer.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                phone: data.phone,
                address: data.address,
            },
        });
        try {
            this.logger.log(`Creating wallet for customer: ${customer.email}`);
            const walletResponse = await (0, rxjs_1.firstValueFrom)(this.walletGrpcService.createWallet({
                userId: customer.id,
                customerName: `${customer.firstName} ${customer.lastName}`,
                customerEmail: customer.email,
            }));
            if (walletResponse.success) {
                this.logger.log(`Wallet created successfully for customer: ${customer.email}, Wallet ID: ${walletResponse.walletId}`);
            }
            else {
                this.logger.error(`Failed to create wallet for customer: ${customer.email}, Error: ${walletResponse.message}`);
            }
        }
        catch (error) {
            this.logger.error(`Error creating wallet for customer ${customer.email}:`, error);
        }
        const { password, ...customerWithoutPassword } = customer;
        return customerWithoutPassword;
    }
    async getAllCustomers(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [customers, total] = await Promise.all([
            this.prisma.customer.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    address: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.customer.count(),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: customers,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getCustomerById(id) {
        const cleanId = id.replace(/[{}]/g, '');
        if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
            throw new common_1.BadRequestException('Invalid customer ID format');
        }
        const customer = await this.prisma.customer.findUnique({
            where: { id: cleanId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        return customer;
    }
    async updateCustomer(id, data) {
        const cleanId = id.replace(/[{}]/g, '');
        if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
            throw new common_1.BadRequestException('Invalid customer ID format');
        }
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { id: cleanId },
        });
        if (!existingCustomer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        if (data.email && data.email !== existingCustomer.email) {
            const emailConflict = await this.prisma.customer.findUnique({
                where: { email: data.email },
            });
            if (emailConflict) {
                throw new common_1.ConflictException('Customer with this email already exists');
            }
        }
        const customer = await this.prisma.customer.update({
            where: { id: cleanId },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return customer;
    }
    async deleteCustomer(id) {
        const cleanId = id.replace(/[{}]/g, '');
        if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
            throw new common_1.BadRequestException('Invalid customer ID format');
        }
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { id: cleanId },
        });
        if (!existingCustomer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const activeAssignments = await this.prisma.bikeAssignment.findFirst({
            where: {
                customerId: cleanId,
                returnedAt: undefined,
            },
        });
        if (activeAssignments) {
            throw new common_1.ConflictException('Cannot delete customer with active bike assignments');
        }
        const customerInfo = {
            id: existingCustomer.id,
            email: existingCustomer.email,
            name: `${existingCustomer.firstName} ${existingCustomer.lastName}`,
        };
        let walletBalance = 0;
        let walletMessage = '';
        try {
            this.logger.log(`Checking wallet balance for customer: ${existingCustomer.email}`);
            const walletResponse = await (0, rxjs_1.firstValueFrom)(this.walletGrpcService.getWallet({
                userId: cleanId,
            }));
            if (walletResponse.success) {
                walletBalance = walletResponse.balance;
                this.logger.log(`Wallet balance for customer ${existingCustomer.email}: $${walletBalance}`);
            }
            else {
                this.logger.warn(`Failed to retrieve wallet for customer: ${existingCustomer.email}, Error: ${walletResponse.message}`);
                walletMessage = walletResponse.message;
            }
        }
        catch (error) {
            this.logger.error(`Error checking wallet balance for customer ${existingCustomer.email}:`, error);
            throw new common_1.BadRequestException('Unable to verify wallet balance. Please try again.');
        }
        if (walletBalance > 0) {
            throw new common_1.BadRequestException(`Customer cannot be deleted because wallet balance is not zero. Current balance: $${walletBalance.toFixed(2)}`);
        }
        let walletDeleted = false;
        let finalWalletMessage = 'Wallet not found or already deleted';
        try {
            this.logger.log(`Attempting to delete wallet for customer: ${existingCustomer.email}`);
            const deleteWalletResponse = await (0, rxjs_1.firstValueFrom)(this.walletGrpcService.deleteWallet({
                userId: cleanId,
            }));
            if (deleteWalletResponse.success) {
                walletDeleted = true;
                finalWalletMessage = deleteWalletResponse.message;
                this.logger.log(`Wallet deleted successfully for customer: ${existingCustomer.email}`);
            }
            else {
                finalWalletMessage = deleteWalletResponse.message;
                this.logger.warn(`Failed to delete wallet for customer: ${existingCustomer.email}, Error: ${deleteWalletResponse.message}`);
            }
        }
        catch (error) {
            this.logger.error(`Error deleting wallet for customer ${existingCustomer.email}:`, error);
            finalWalletMessage = 'Error deleting wallet - wallet may still exist';
        }
        await this.prisma.customer.delete({
            where: { id: cleanId },
        });
        this.logger.log(`Customer deleted successfully: ${existingCustomer.email}`);
        return {
            message: 'Customer and wallet deleted successfully',
            customerId: customerInfo.id,
            customerEmail: customerInfo.email,
            customerName: customerInfo.name,
            walletDeleted,
            walletBalance,
            walletMessage: finalWalletMessage,
        };
    }
    async searchCustomers(query, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [customers, total] = await Promise.all([
            this.prisma.customer.findMany({
                where: {
                    OR: [
                        { firstName: { contains: query, mode: 'insensitive' } },
                        { lastName: { contains: query, mode: 'insensitive' } },
                        { email: { contains: query, mode: 'insensitive' } },
                    ],
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    address: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.customer.count({
                where: {
                    OR: [
                        { firstName: { contains: query, mode: 'insensitive' } },
                        { lastName: { contains: query, mode: 'insensitive' } },
                        { email: { contains: query, mode: 'insensitive' } },
                    ],
                },
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: customers,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getCustomerWallet(customerId) {
        const cleanId = customerId.replace(/[{}]/g, '');
        if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
            throw new common_1.BadRequestException('Invalid customer ID format');
        }
        try {
            this.logger.log(`Fetching wallet for customer: ${cleanId}`);
            const walletResponse = await (0, rxjs_1.firstValueFrom)(this.walletGrpcService.getWallet({
                userId: cleanId,
            }));
            if (walletResponse.success) {
                this.logger.log(`Wallet retrieved successfully for customer: ${cleanId}`);
                return walletResponse;
            }
            else {
                this.logger.error(`Failed to retrieve wallet for customer: ${cleanId}, Error: ${walletResponse.message}`);
                return walletResponse;
            }
        }
        catch (error) {
            this.logger.error(`Error retrieving wallet for customer ${cleanId}:`, error);
            return {
                success: false,
                walletId: '',
                balance: 0,
                userId: '',
                customerName: '',
                message: 'Failed to retrieve wallet due to gRPC error'
            };
        }
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = CustomersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof wallet_grpc_service_1.WalletGrpcService !== "undefined" && wallet_grpc_service_1.WalletGrpcService) === "function" ? _b : Object])
], CustomersService);


/***/ }),
/* 152 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(3);
const client_1 = __webpack_require__(153);
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 153 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  ...__webpack_require__(154),
}


/***/ }),
/* 154 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */
module.exports = { ...__webpack_require__(155) }

/***/ }),
/* 155 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */

Object.defineProperty(exports, "__esModule", ({ value: true }));

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = __webpack_require__(156)


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.15.0
 * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
 */
Prisma.prismaVersion = {
  client: "6.15.0",
  engine: "85179d7826409ee107a6ba334b5e305ae3fba9fb"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = __webpack_require__(13)

/**
 * Enums
 */
exports.Prisma.AdminScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CustomerScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
  phone: 'phone',
  address: 'address',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BikeScalarFieldEnum = {
  id: 'id',
  serialNumber: 'serialNumber',
  brand: 'brand',
  model: 'model',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BikeAssignmentScalarFieldEnum = {
  id: 'id',
  assignedAt: 'assignedAt',
  returnedAt: 'returnedAt',
  assignedBy: 'assignedBy',
  bikeId: 'bikeId',
  customerId: 'customerId'
};

exports.Prisma.ChargingSessionScalarFieldEnum = {
  id: 'id',
  customerId: 'customerId',
  bikeId: 'bikeId',
  amount: 'amount',
  startTime: 'startTime',
  endTime: 'endTime',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};


exports.Prisma.ModelName = {
  Admin: 'Admin',
  Customer: 'Customer',
  Bike: 'Bike',
  BikeAssignment: 'BikeAssignment',
  ChargingSession: 'ChargingSession'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/arunchaudhary/YatriTask/apps/hub/node_modules/@prisma/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/home/arunchaudhary/YatriTask/apps/hub/prisma/schema.prisma"
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.15.0",
  "engineVersion": "85179d7826409ee107a6ba334b5e305ae3fba9fb",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mongodb",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n}\n\ndatasource db {\n  provider = \"mongodb\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// Admin model for admin users\nmodel Admin {\n  id        String   @id @default(auto()) @map(\"_id\") @db.ObjectId\n  firstName String\n  lastName  String\n  email     String   @unique\n  password  String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Admin can manage bikes\n  bikeAssignments BikeAssignment[]\n}\n\n// Customer model for regular customers\nmodel Customer {\n  id        String   @id @default(auto()) @map(\"_id\") @db.ObjectId\n  firstName String\n  lastName  String\n  email     String   @unique\n  password  String\n  phone     String?\n  address   String?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Customer relations\n  bikeAssignments  BikeAssignment[]\n  chargingSessions ChargingSession[]\n}\n\nmodel Bike {\n  id           String   @id @default(auto()) @map(\"_id\") @db.ObjectId\n  serialNumber String   @unique\n  brand        String\n  model        String\n  status       String   @default(\"AVAILABLE\") // AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  // Relations\n  bikeAssignments  BikeAssignment[]\n  chargingSessions ChargingSession[]\n}\n\nmodel BikeAssignment {\n  id         String    @id @default(auto()) @map(\"_id\") @db.ObjectId\n  assignedAt DateTime  @default(now())\n  returnedAt DateTime?\n  assignedBy String    @db.ObjectId // Admin ID who assigned the bike\n\n  // Relations\n  bike       Bike     @relation(fields: [bikeId], references: [id])\n  bikeId     String   @db.ObjectId\n  customer   Customer @relation(fields: [customerId], references: [id])\n  customerId String   @db.ObjectId\n  admin      Admin    @relation(fields: [assignedBy], references: [id])\n}\n\nmodel ChargingSession {\n  id         String    @id @default(auto()) @map(\"_id\") @db.ObjectId\n  customerId String    @db.ObjectId\n  bikeId     String    @db.ObjectId\n  amount     Float\n  startTime  DateTime\n  endTime    DateTime?\n  status     String    @default(\"ACTIVE\") // ACTIVE, COMPLETED, CANCELLED\n  createdAt  DateTime  @default(now())\n  updatedAt  DateTime  @updatedAt\n\n  // Relations\n  customer Customer @relation(fields: [customerId], references: [id])\n  bike     Bike     @relation(fields: [bikeId], references: [id])\n}\n",
  "inlineSchemaHash": "68a008e4f51aac22db2e4f66de5fb29f5cc5a8f3a261d5e6c955c72b435f5a0f",
  "copyEngine": true
}

const fs = __webpack_require__(12)

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "node_modules/.prisma/client",
    ".prisma/client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Admin\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"bikeAssignments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BikeAssignment\",\"nativeType\":null,\"relationName\":\"AdminToBikeAssignment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Customer\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"bikeAssignments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BikeAssignment\",\"nativeType\":null,\"relationName\":\"BikeAssignmentToCustomer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chargingSessions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChargingSession\",\"nativeType\":null,\"relationName\":\"ChargingSessionToCustomer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Bike\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"serialNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brand\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"model\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"AVAILABLE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"bikeAssignments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BikeAssignment\",\"nativeType\":null,\"relationName\":\"BikeToBikeAssignment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chargingSessions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChargingSession\",\"nativeType\":null,\"relationName\":\"BikeToChargingSession\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BikeAssignment\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assignedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"returnedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assignedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bike\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bike\",\"nativeType\":null,\"relationName\":\"BikeToBikeAssignment\",\"relationFromFields\":[\"bikeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bikeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Customer\",\"nativeType\":null,\"relationName\":\"BikeAssignmentToCustomer\",\"relationFromFields\":[\"customerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"admin\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Admin\",\"nativeType\":null,\"relationName\":\"AdminToBikeAssignment\",\"relationFromFields\":[\"assignedBy\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ChargingSession\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bikeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"customer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Customer\",\"nativeType\":null,\"relationName\":\"ChargingSessionToCustomer\",\"relationFromFields\":[\"customerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bike\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bike\",\"nativeType\":null,\"relationName\":\"BikeToChargingSession\",\"relationFromFields\":[\"bikeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = __webpack_require__(156)

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node");
path.join(process.cwd(), "node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "node_modules/.prisma/client/schema.prisma")


/***/ }),
/* 156 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
var xu=Object.create;var Vt=Object.defineProperty;var vu=Object.getOwnPropertyDescriptor;var Pu=Object.getOwnPropertyNames;var Tu=Object.getPrototypeOf,Su=Object.prototype.hasOwnProperty;var Oo=(e,r)=>()=>(e&&(r=e(e=0)),r);var ne=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports),tr=(e,r)=>{for(var t in r)Vt(e,t,{get:r[t],enumerable:!0})},ko=(e,r,t,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of Pu(r))!Su.call(e,i)&&i!==t&&Vt(e,i,{get:()=>r[i],enumerable:!(n=vu(r,i))||n.enumerable});return e};var A=(e,r,t)=>(t=e!=null?xu(Tu(e)):{},ko(r||!e||!e.__esModule?Vt(t,"default",{value:e,enumerable:!0}):t,e)),Ru=e=>ko(Vt({},"__esModule",{value:!0}),e);var hi=ne((Mg,os)=>{"use strict";os.exports=(e,r=process.argv)=>{let t=e.startsWith("-")?"":e.length===1?"-":"--",n=r.indexOf(t+e),i=r.indexOf("--");return n!==-1&&(i===-1||n<i)}});var ls=ne(($g,as)=>{"use strict";var Vc=__webpack_require__(157),ss=__webpack_require__(158),de=hi(),{env:G}=process,Qe;de("no-color")||de("no-colors")||de("color=false")||de("color=never")?Qe=0:(de("color")||de("colors")||de("color=true")||de("color=always"))&&(Qe=1);"FORCE_COLOR"in G&&(G.FORCE_COLOR==="true"?Qe=1:G.FORCE_COLOR==="false"?Qe=0:Qe=G.FORCE_COLOR.length===0?1:Math.min(parseInt(G.FORCE_COLOR,10),3));function yi(e){return e===0?!1:{level:e,hasBasic:!0,has256:e>=2,has16m:e>=3}}function bi(e,r){if(Qe===0)return 0;if(de("color=16m")||de("color=full")||de("color=truecolor"))return 3;if(de("color=256"))return 2;if(e&&!r&&Qe===void 0)return 0;let t=Qe||0;if(G.TERM==="dumb")return t;if(process.platform==="win32"){let n=Vc.release().split(".");return Number(n[0])>=10&&Number(n[2])>=10586?Number(n[2])>=14931?3:2:1}if("CI"in G)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(n=>n in G)||G.CI_NAME==="codeship"?1:t;if("TEAMCITY_VERSION"in G)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(G.TEAMCITY_VERSION)?1:0;if(G.COLORTERM==="truecolor")return 3;if("TERM_PROGRAM"in G){let n=parseInt((G.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(G.TERM_PROGRAM){case"iTerm.app":return n>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(G.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(G.TERM)||"COLORTERM"in G?1:t}function jc(e){let r=bi(e,e&&e.isTTY);return yi(r)}as.exports={supportsColor:jc,stdout:yi(bi(!0,ss.isatty(1))),stderr:yi(bi(!0,ss.isatty(2)))}});var ps=ne((qg,cs)=>{"use strict";var Bc=ls(),br=hi();function us(e){if(/^\d{3,4}$/.test(e)){let t=/(\d{1,2})(\d{2})/.exec(e)||[];return{major:0,minor:parseInt(t[1],10),patch:parseInt(t[2],10)}}let r=(e||"").split(".").map(t=>parseInt(t,10));return{major:r[0],minor:r[1],patch:r[2]}}function Ei(e){let{CI:r,FORCE_HYPERLINK:t,NETLIFY:n,TEAMCITY_VERSION:i,TERM_PROGRAM:o,TERM_PROGRAM_VERSION:s,VTE_VERSION:a,TERM:l}=process.env;if(t)return!(t.length>0&&parseInt(t,10)===0);if(br("no-hyperlink")||br("no-hyperlinks")||br("hyperlink=false")||br("hyperlink=never"))return!1;if(br("hyperlink=true")||br("hyperlink=always")||n)return!0;if(!Bc.supportsColor(e)||e&&!e.isTTY)return!1;if("WT_SESSION"in process.env)return!0;if(process.platform==="win32"||r||i)return!1;if(o){let u=us(s||"");switch(o){case"iTerm.app":return u.major===3?u.minor>=1:u.major>3;case"WezTerm":return u.major>=20200620;case"vscode":return u.major>1||u.major===1&&u.minor>=72;case"ghostty":return!0}}if(a){if(a==="0.50.0")return!1;let u=us(a);return u.major>0||u.minor>=50}switch(l){case"alacritty":return!0}return!1}cs.exports={supportsHyperlink:Ei,stdout:Ei(process.stdout),stderr:Ei(process.stderr)}});var ds=ne((Zg,Uc)=>{Uc.exports={name:"@prisma/internals",version:"6.15.0",description:"This package is intended for Prisma's internal use",main:"dist/index.js",types:"dist/index.d.ts",repository:{type:"git",url:"https://github.com/prisma/prisma.git",directory:"packages/internals"},homepage:"https://www.prisma.io",author:"Tim Suchanek <suchanek@prisma.io>",bugs:"https://github.com/prisma/prisma/issues",license:"Apache-2.0",scripts:{dev:"DEV=true tsx helpers/build.ts",build:"tsx helpers/build.ts",test:"dotenv -e ../../.db.env -- jest --silent",prepublishOnly:"pnpm run build"},files:["README.md","dist","!**/libquery_engine*","!dist/get-generators/engines/*","scripts"],devDependencies:{"@babel/helper-validator-identifier":"7.25.9","@opentelemetry/api":"1.9.0","@swc/core":"1.11.5","@swc/jest":"0.2.37","@types/babel__helper-validator-identifier":"7.15.2","@types/jest":"29.5.14","@types/node":"18.19.76","@types/resolve":"1.20.6",archiver:"6.0.2","checkpoint-client":"1.1.33","cli-truncate":"4.0.0",dotenv:"16.5.0",empathic:"2.0.0",esbuild:"0.25.5","escape-string-regexp":"5.0.0",execa:"5.1.1","fast-glob":"3.3.3","find-up":"7.0.0","fp-ts":"2.16.9","fs-extra":"11.3.0","fs-jetpack":"5.1.0","global-dirs":"4.0.0",globby:"11.1.0","identifier-regex":"1.0.0","indent-string":"4.0.0","is-windows":"1.0.2","is-wsl":"3.1.0",jest:"29.7.0","jest-junit":"16.0.0",kleur:"4.1.5","mock-stdin":"1.0.0","new-github-issue-url":"0.2.1","node-fetch":"3.3.2","npm-packlist":"5.1.3",open:"7.4.2","p-map":"4.0.0",resolve:"1.22.10","string-width":"7.2.0","strip-ansi":"6.0.1","strip-indent":"4.0.0","temp-dir":"2.0.0",tempy:"1.0.1","terminal-link":"4.0.0",tmp:"0.2.3","ts-node":"10.9.2","ts-pattern":"5.6.2","ts-toolbelt":"9.6.0",typescript:"5.4.5",yarn:"1.22.22"},dependencies:{"@prisma/config":"workspace:*","@prisma/debug":"workspace:*","@prisma/dmmf":"workspace:*","@prisma/driver-adapter-utils":"workspace:*","@prisma/engines":"workspace:*","@prisma/fetch-engine":"workspace:*","@prisma/generator":"workspace:*","@prisma/generator-helper":"workspace:*","@prisma/get-platform":"workspace:*","@prisma/prisma-schema-wasm":"6.15.0-5.85179d7826409ee107a6ba334b5e305ae3fba9fb","@prisma/schema-engine-wasm":"6.15.0-5.85179d7826409ee107a6ba334b5e305ae3fba9fb","@prisma/schema-files-loader":"workspace:*",arg:"5.0.2",prompts:"2.4.2"},peerDependencies:{typescript:">=5.1.0"},peerDependenciesMeta:{typescript:{optional:!0}},sideEffects:!1}});var Ti=ne((Eh,Hc)=>{Hc.exports={name:"@prisma/engines-version",version:"6.15.0-5.85179d7826409ee107a6ba334b5e305ae3fba9fb",main:"index.js",types:"index.d.ts",license:"Apache-2.0",author:"Tim Suchanek <suchanek@prisma.io>",prisma:{enginesVersion:"85179d7826409ee107a6ba334b5e305ae3fba9fb"},repository:{type:"git",url:"https://github.com/prisma/engines-wrapper.git",directory:"packages/engines-version"},devDependencies:{"@types/node":"18.19.76",typescript:"4.9.5"},files:["index.js","index.d.ts"],scripts:{build:"tsc -d"}}});var nn=ne(tn=>{"use strict";Object.defineProperty(tn,"__esModule",{value:!0});tn.enginesVersion=void 0;tn.enginesVersion=Ti().prisma.enginesVersion});var ys=ne((_h,hs)=>{"use strict";hs.exports=e=>{let r=e.match(/^[ \t]*(?=\S)/gm);return r?r.reduce((t,n)=>Math.min(t,n.length),1/0):0}});var Di=ne((Fh,ws)=>{"use strict";ws.exports=(e,r=1,t)=>{if(t={indent:" ",includeEmptyLines:!1,...t},typeof e!="string")throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);if(typeof r!="number")throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof r}\``);if(typeof t.indent!="string")throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof t.indent}\``);if(r===0)return e;let n=t.includeEmptyLines?/^/gm:/^(?!\s*$)/gm;return e.replace(n,t.indent.repeat(r))}});var Ts=ne((qh,Ps)=>{"use strict";Ps.exports=({onlyFirst:e=!1}={})=>{let r=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");return new RegExp(r,e?void 0:"g")}});var Ni=ne((Vh,Ss)=>{"use strict";var op=Ts();Ss.exports=e=>typeof e=="string"?e.replace(op(),""):e});var Rs=ne((Gh,sp)=>{sp.exports={name:"dotenv",version:"16.5.0",description:"Loads environment variables from .env file",main:"lib/main.js",types:"lib/main.d.ts",exports:{".":{types:"./lib/main.d.ts",require:"./lib/main.js",default:"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},scripts:{"dts-check":"tsc --project tests/types/tsconfig.json",lint:"standard",pretest:"npm run lint && npm run dts-check",test:"tap run --allow-empty-coverage --disable-coverage --timeout=60000","test:coverage":"tap run --show-full-coverage --timeout=60000 --coverage-report=lcov",prerelease:"npm test",release:"standard-version"},repository:{type:"git",url:"git://github.com/motdotla/dotenv.git"},homepage:"https://github.com/motdotla/dotenv#readme",funding:"https://dotenvx.com",keywords:["dotenv","env",".env","environment","variables","config","settings"],readmeFilename:"README.md",license:"BSD-2-Clause",devDependencies:{"@types/node":"^18.11.3",decache:"^4.6.2",sinon:"^14.0.1",standard:"^17.0.0","standard-version":"^9.5.0",tap:"^19.2.0",typescript:"^4.8.4"},engines:{node:">=12"},browser:{fs:!1}}});var Os=ne((Qh,_e)=>{"use strict";var Fi=__webpack_require__(159),Mi=__webpack_require__(160),ap=__webpack_require__(157),lp=__webpack_require__(161),up=Rs(),Cs=up.version,cp=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function pp(e){let r={},t=e.toString();t=t.replace(/\r\n?/mg,`
`);let n;for(;(n=cp.exec(t))!=null;){let i=n[1],o=n[2]||"";o=o.trim();let s=o[0];o=o.replace(/^(['"`])([\s\S]*)\1$/mg,"$2"),s==='"'&&(o=o.replace(/\\n/g,`
`),o=o.replace(/\\r/g,"\r")),r[i]=o}return r}function dp(e){let r=Ds(e),t=B.configDotenv({path:r});if(!t.parsed){let s=new Error(`MISSING_DATA: Cannot parse ${r} for an unknown reason`);throw s.code="MISSING_DATA",s}let n=Is(e).split(","),i=n.length,o;for(let s=0;s<i;s++)try{let a=n[s].trim(),l=fp(t,a);o=B.decrypt(l.ciphertext,l.key);break}catch(a){if(s+1>=i)throw a}return B.parse(o)}function mp(e){console.log(`[dotenv@${Cs}][WARN] ${e}`)}function it(e){console.log(`[dotenv@${Cs}][DEBUG] ${e}`)}function Is(e){return e&&e.DOTENV_KEY&&e.DOTENV_KEY.length>0?e.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function fp(e,r){let t;try{t=new URL(r)}catch(a){if(a.code==="ERR_INVALID_URL"){let l=new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");throw l.code="INVALID_DOTENV_KEY",l}throw a}let n=t.password;if(!n){let a=new Error("INVALID_DOTENV_KEY: Missing key part");throw a.code="INVALID_DOTENV_KEY",a}let i=t.searchParams.get("environment");if(!i){let a=new Error("INVALID_DOTENV_KEY: Missing environment part");throw a.code="INVALID_DOTENV_KEY",a}let o=`DOTENV_VAULT_${i.toUpperCase()}`,s=e.parsed[o];if(!s){let a=new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${o} in your .env.vault file.`);throw a.code="NOT_FOUND_DOTENV_ENVIRONMENT",a}return{ciphertext:s,key:n}}function Ds(e){let r=null;if(e&&e.path&&e.path.length>0)if(Array.isArray(e.path))for(let t of e.path)Fi.existsSync(t)&&(r=t.endsWith(".vault")?t:`${t}.vault`);else r=e.path.endsWith(".vault")?e.path:`${e.path}.vault`;else r=Mi.resolve(process.cwd(),".env.vault");return Fi.existsSync(r)?r:null}function As(e){return e[0]==="~"?Mi.join(ap.homedir(),e.slice(1)):e}function gp(e){!!(e&&e.debug)&&it("Loading env from encrypted .env.vault");let t=B._parseVault(e),n=process.env;return e&&e.processEnv!=null&&(n=e.processEnv),B.populate(n,t,e),{parsed:t}}function hp(e){let r=Mi.resolve(process.cwd(),".env"),t="utf8",n=!!(e&&e.debug);e&&e.encoding?t=e.encoding:n&&it("No encoding is specified. UTF-8 is used by default");let i=[r];if(e&&e.path)if(!Array.isArray(e.path))i=[As(e.path)];else{i=[];for(let l of e.path)i.push(As(l))}let o,s={};for(let l of i)try{let u=B.parse(Fi.readFileSync(l,{encoding:t}));B.populate(s,u,e)}catch(u){n&&it(`Failed to load ${l} ${u.message}`),o=u}let a=process.env;return e&&e.processEnv!=null&&(a=e.processEnv),B.populate(a,s,e),o?{parsed:s,error:o}:{parsed:s}}function yp(e){if(Is(e).length===0)return B.configDotenv(e);let r=Ds(e);return r?B._configVault(e):(mp(`You set DOTENV_KEY but you are missing a .env.vault file at ${r}. Did you forget to build it?`),B.configDotenv(e))}function bp(e,r){let t=Buffer.from(r.slice(-64),"hex"),n=Buffer.from(e,"base64"),i=n.subarray(0,12),o=n.subarray(-16);n=n.subarray(12,-16);try{let s=lp.createDecipheriv("aes-256-gcm",t,i);return s.setAuthTag(o),`${s.update(n)}${s.final()}`}catch(s){let a=s instanceof RangeError,l=s.message==="Invalid key length",u=s.message==="Unsupported state or unable to authenticate data";if(a||l){let c=new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");throw c.code="INVALID_DOTENV_KEY",c}else if(u){let c=new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw c.code="DECRYPTION_FAILED",c}else throw s}}function Ep(e,r,t={}){let n=!!(t&&t.debug),i=!!(t&&t.override);if(typeof r!="object"){let o=new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");throw o.code="OBJECT_REQUIRED",o}for(let o of Object.keys(r))Object.prototype.hasOwnProperty.call(e,o)?(i===!0&&(e[o]=r[o]),n&&it(i===!0?`"${o}" is already defined and WAS overwritten`:`"${o}" is already defined and was NOT overwritten`)):e[o]=r[o]}var B={configDotenv:hp,_configVault:gp,_parseVault:dp,config:yp,decrypt:bp,parse:pp,populate:Ep};_e.exports.configDotenv=B.configDotenv;_e.exports._configVault=B._configVault;_e.exports._parseVault=B._parseVault;_e.exports.config=B.config;_e.exports.decrypt=B.decrypt;_e.exports.parse=B.parse;_e.exports.populate=B.populate;_e.exports=B});var Ls=ne((zh,un)=>{"use strict";un.exports=(e={})=>{let r;if(e.repoUrl)r=e.repoUrl;else if(e.user&&e.repo)r=`https://github.com/${e.user}/${e.repo}`;else throw new Error("You need to specify either the `repoUrl` option or both the `user` and `repo` options");let t=new URL(`${r}/issues/new`),n=["body","title","labels","template","milestone","assignee","projects"];for(let i of n){let o=e[i];if(o!==void 0){if(i==="labels"||i==="projects"){if(!Array.isArray(o))throw new TypeError(`The \`${i}\` option should be an array`);o=o.join(",")}t.searchParams.set(i,o)}}return t.toString()};un.exports.default=un.exports});var Ki=ne((Sb,ia)=>{"use strict";ia.exports=function(){function e(r,t,n,i,o){return r<t||n<t?r>n?n+1:r+1:i===o?t:t+1}return function(r,t){if(r===t)return 0;if(r.length>t.length){var n=r;r=t,t=n}for(var i=r.length,o=t.length;i>0&&r.charCodeAt(i-1)===t.charCodeAt(o-1);)i--,o--;for(var s=0;s<i&&r.charCodeAt(s)===t.charCodeAt(s);)s++;if(i-=s,o-=s,i===0||o<3)return o;var a=0,l,u,c,p,d,f,h,g,D,T,S,b,O=[];for(l=0;l<i;l++)O.push(l+1),O.push(r.charCodeAt(s+l));for(var me=O.length-1;a<o-3;)for(D=t.charCodeAt(s+(u=a)),T=t.charCodeAt(s+(c=a+1)),S=t.charCodeAt(s+(p=a+2)),b=t.charCodeAt(s+(d=a+3)),f=a+=4,l=0;l<me;l+=2)h=O[l],g=O[l+1],u=e(h,u,c,D,g),c=e(u,c,p,T,g),p=e(c,p,d,S,g),f=e(p,d,f,b,g),O[l]=f,d=p,p=c,c=u,u=h;for(;a<o;)for(D=t.charCodeAt(s+(u=a)),f=++a,l=0;l<me;l+=2)h=O[l],O[l]=f=e(h,u,f,D,O[l+1]),u=h;return f}}()});var ua=Oo(()=>{"use strict"});var ca=Oo(()=>{"use strict"});var Qf={};tr(Qf,{DMMF:()=>ut,Debug:()=>N,Decimal:()=>Fe,Extensions:()=>ni,MetricsClient:()=>Nr,PrismaClientInitializationError:()=>P,PrismaClientKnownRequestError:()=>z,PrismaClientRustPanicError:()=>le,PrismaClientUnknownRequestError:()=>V,PrismaClientValidationError:()=>Z,Public:()=>ii,Sql:()=>oe,createParam:()=>Ra,defineDmmfProperty:()=>ka,deserializeJsonResponse:()=>qr,deserializeRawResult:()=>Xn,dmmfToRuntimeDataModel:()=>$s,empty:()=>La,getPrismaClient:()=>bu,getRuntime:()=>Gn,join:()=>Na,makeStrictEnum:()=>Eu,makeTypedQueryFactory:()=>_a,objectEnumValues:()=>Dn,raw:()=>no,serializeJsonQuery:()=>Mn,skip:()=>Fn,sqltag:()=>io,warnEnvConflicts:()=>wu,warnOnce:()=>st});module.exports=Ru(Qf);var ni={};tr(ni,{defineExtension:()=>_o,getExtensionContext:()=>No});function _o(e){return typeof e=="function"?e:r=>r.$extends(e)}function No(e){return e}var ii={};tr(ii,{validator:()=>Lo});function Lo(...e){return r=>r}var jt={};tr(jt,{$:()=>Vo,bgBlack:()=>Fu,bgBlue:()=>Vu,bgCyan:()=>Bu,bgGreen:()=>$u,bgMagenta:()=>ju,bgRed:()=>Mu,bgWhite:()=>Uu,bgYellow:()=>qu,black:()=>ku,blue:()=>nr,bold:()=>W,cyan:()=>De,dim:()=>Ce,gray:()=>Kr,green:()=>qe,grey:()=>Lu,hidden:()=>Du,inverse:()=>Iu,italic:()=>Cu,magenta:()=>_u,red:()=>ce,reset:()=>Au,strikethrough:()=>Ou,underline:()=>Y,white:()=>Nu,yellow:()=>Ie});var oi,Fo,Mo,$o,qo=!0;typeof process<"u"&&({FORCE_COLOR:oi,NODE_DISABLE_COLORS:Fo,NO_COLOR:Mo,TERM:$o}=process.env||{},qo=process.stdout&&process.stdout.isTTY);var Vo={enabled:!Fo&&Mo==null&&$o!=="dumb"&&(oi!=null&&oi!=="0"||qo)};function F(e,r){let t=new RegExp(`\\x1b\\[${r}m`,"g"),n=`\x1B[${e}m`,i=`\x1B[${r}m`;return function(o){return!Vo.enabled||o==null?o:n+(~(""+o).indexOf(i)?o.replace(t,i+n):o)+i}}var Au=F(0,0),W=F(1,22),Ce=F(2,22),Cu=F(3,23),Y=F(4,24),Iu=F(7,27),Du=F(8,28),Ou=F(9,29),ku=F(30,39),ce=F(31,39),qe=F(32,39),Ie=F(33,39),nr=F(34,39),_u=F(35,39),De=F(36,39),Nu=F(37,39),Kr=F(90,39),Lu=F(90,39),Fu=F(40,49),Mu=F(41,49),$u=F(42,49),qu=F(43,49),Vu=F(44,49),ju=F(45,49),Bu=F(46,49),Uu=F(47,49);var Gu=100,jo=["green","yellow","blue","magenta","cyan","red"],Hr=[],Bo=Date.now(),Qu=0,si=typeof process<"u"?process.env:{};globalThis.DEBUG??=si.DEBUG??"";globalThis.DEBUG_COLORS??=si.DEBUG_COLORS?si.DEBUG_COLORS==="true":!0;var Yr={enable(e){typeof e=="string"&&(globalThis.DEBUG=e)},disable(){let e=globalThis.DEBUG;return globalThis.DEBUG="",e},enabled(e){let r=globalThis.DEBUG.split(",").map(i=>i.replace(/[.+?^${}()|[\]\\]/g,"\\$&")),t=r.some(i=>i===""||i[0]==="-"?!1:e.match(RegExp(i.split("*").join(".*")+"$"))),n=r.some(i=>i===""||i[0]!=="-"?!1:e.match(RegExp(i.slice(1).split("*").join(".*")+"$")));return t&&!n},log:(...e)=>{let[r,t,...n]=e;(console.warn??console.log)(`${r} ${t}`,...n)},formatters:{}};function Wu(e){let r={color:jo[Qu++%jo.length],enabled:Yr.enabled(e),namespace:e,log:Yr.log,extend:()=>{}},t=(...n)=>{let{enabled:i,namespace:o,color:s,log:a}=r;if(n.length!==0&&Hr.push([o,...n]),Hr.length>Gu&&Hr.shift(),Yr.enabled(o)||i){let l=n.map(c=>typeof c=="string"?c:Ju(c)),u=`+${Date.now()-Bo}ms`;Bo=Date.now(),globalThis.DEBUG_COLORS?a(jt[s](W(o)),...l,jt[s](u)):a(o,...l,u)}};return new Proxy(t,{get:(n,i)=>r[i],set:(n,i,o)=>r[i]=o})}var N=new Proxy(Wu,{get:(e,r)=>Yr[r],set:(e,r,t)=>Yr[r]=t});function Ju(e,r=2){let t=new Set;return JSON.stringify(e,(n,i)=>{if(typeof i=="object"&&i!==null){if(t.has(i))return"[Circular *]";t.add(i)}else if(typeof i=="bigint")return i.toString();return i},r)}function Uo(e=7500){let r=Hr.map(([t,...n])=>`${t} ${n.map(i=>typeof i=="string"?i:JSON.stringify(i)).join(" ")}`).join(`
`);return r.length<e?r:r.slice(-e)}function Go(){Hr.length=0}var gr=N;var Qo=A(__webpack_require__(159));function ai(){let e=process.env.PRISMA_QUERY_ENGINE_LIBRARY;if(!(e&&Qo.default.existsSync(e))&&process.arch==="ia32")throw new Error('The default query engine type (Node-API, "library") is currently not supported for 32bit Node. Please set `engineType = "binary"` in the "generator" block of your "schema.prisma" file (or use the environment variables "PRISMA_CLIENT_ENGINE_TYPE=binary" and/or "PRISMA_CLI_QUERY_ENGINE_TYPE=binary".)')}var li=["darwin","darwin-arm64","debian-openssl-1.0.x","debian-openssl-1.1.x","debian-openssl-3.0.x","rhel-openssl-1.0.x","rhel-openssl-1.1.x","rhel-openssl-3.0.x","linux-arm64-openssl-1.1.x","linux-arm64-openssl-1.0.x","linux-arm64-openssl-3.0.x","linux-arm-openssl-1.1.x","linux-arm-openssl-1.0.x","linux-arm-openssl-3.0.x","linux-musl","linux-musl-openssl-3.0.x","linux-musl-arm64-openssl-1.1.x","linux-musl-arm64-openssl-3.0.x","linux-nixos","linux-static-x64","linux-static-arm64","windows","freebsd11","freebsd12","freebsd13","freebsd14","freebsd15","openbsd","netbsd","arm"];var Bt="libquery_engine";function Ut(e,r){let t=r==="url";return e.includes("windows")?t?"query_engine.dll.node":`query_engine-${e}.dll.node`:e.includes("darwin")?t?`${Bt}.dylib.node`:`${Bt}-${e}.dylib.node`:t?`${Bt}.so.node`:`${Bt}-${e}.so.node`}var Ho=A(__webpack_require__(162)),mi=A(__webpack_require__(163)),Kt=A(__webpack_require__(157));var Oe=Symbol.for("@ts-pattern/matcher"),Ku=Symbol.for("@ts-pattern/isVariadic"),Qt="@ts-pattern/anonymous-select-key",ui=e=>!!(e&&typeof e=="object"),Gt=e=>e&&!!e[Oe],Ee=(e,r,t)=>{if(Gt(e)){let n=e[Oe](),{matched:i,selections:o}=n.match(r);return i&&o&&Object.keys(o).forEach(s=>t(s,o[s])),i}if(ui(e)){if(!ui(r))return!1;if(Array.isArray(e)){if(!Array.isArray(r))return!1;let n=[],i=[],o=[];for(let s of e.keys()){let a=e[s];Gt(a)&&a[Ku]?o.push(a):o.length?i.push(a):n.push(a)}if(o.length){if(o.length>1)throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");if(r.length<n.length+i.length)return!1;let s=r.slice(0,n.length),a=i.length===0?[]:r.slice(-i.length),l=r.slice(n.length,i.length===0?1/0:-i.length);return n.every((u,c)=>Ee(u,s[c],t))&&i.every((u,c)=>Ee(u,a[c],t))&&(o.length===0||Ee(o[0],l,t))}return e.length===r.length&&e.every((s,a)=>Ee(s,r[a],t))}return Reflect.ownKeys(e).every(n=>{let i=e[n];return(n in r||Gt(o=i)&&o[Oe]().matcherType==="optional")&&Ee(i,r[n],t);// removed by dead control flow
{ var o; }})}return Object.is(r,e)},Ge=e=>{var r,t,n;return ui(e)?Gt(e)?(r=(t=(n=e[Oe]()).getSelectionKeys)==null?void 0:t.call(n))!=null?r:[]:Array.isArray(e)?zr(e,Ge):zr(Object.values(e),Ge):[]},zr=(e,r)=>e.reduce((t,n)=>t.concat(r(n)),[]);function pe(e){return Object.assign(e,{optional:()=>Hu(e),and:r=>q(e,r),or:r=>Yu(e,r),select:r=>r===void 0?Wo(e):Wo(r,e)})}function Hu(e){return pe({[Oe]:()=>({match:r=>{let t={},n=(i,o)=>{t[i]=o};return r===void 0?(Ge(e).forEach(i=>n(i,void 0)),{matched:!0,selections:t}):{matched:Ee(e,r,n),selections:t}},getSelectionKeys:()=>Ge(e),matcherType:"optional"})})}function q(...e){return pe({[Oe]:()=>({match:r=>{let t={},n=(i,o)=>{t[i]=o};return{matched:e.every(i=>Ee(i,r,n)),selections:t}},getSelectionKeys:()=>zr(e,Ge),matcherType:"and"})})}function Yu(...e){return pe({[Oe]:()=>({match:r=>{let t={},n=(i,o)=>{t[i]=o};return zr(e,Ge).forEach(i=>n(i,void 0)),{matched:e.some(i=>Ee(i,r,n)),selections:t}},getSelectionKeys:()=>zr(e,Ge),matcherType:"or"})})}function C(e){return{[Oe]:()=>({match:r=>({matched:!!e(r)})})}}function Wo(...e){let r=typeof e[0]=="string"?e[0]:void 0,t=e.length===2?e[1]:typeof e[0]=="string"?void 0:e[0];return pe({[Oe]:()=>({match:n=>{let i={[r??Qt]:n};return{matched:t===void 0||Ee(t,n,(o,s)=>{i[o]=s}),selections:i}},getSelectionKeys:()=>[r??Qt].concat(t===void 0?[]:Ge(t))})})}function ye(e){return typeof e=="number"}function Ve(e){return typeof e=="string"}function je(e){return typeof e=="bigint"}var ig=pe(C(function(e){return!0}));var Be=e=>Object.assign(pe(e),{startsWith:r=>{return Be(q(e,(t=r,C(n=>Ve(n)&&n.startsWith(t)))));// removed by dead control flow
{ var t; }},endsWith:r=>{return Be(q(e,(t=r,C(n=>Ve(n)&&n.endsWith(t)))));// removed by dead control flow
{ var t; }},minLength:r=>Be(q(e,(t=>C(n=>Ve(n)&&n.length>=t))(r))),length:r=>Be(q(e,(t=>C(n=>Ve(n)&&n.length===t))(r))),maxLength:r=>Be(q(e,(t=>C(n=>Ve(n)&&n.length<=t))(r))),includes:r=>{return Be(q(e,(t=r,C(n=>Ve(n)&&n.includes(t)))));// removed by dead control flow
{ var t; }},regex:r=>{return Be(q(e,(t=r,C(n=>Ve(n)&&!!n.match(t)))));// removed by dead control flow
{ var t; }}}),og=Be(C(Ve)),be=e=>Object.assign(pe(e),{between:(r,t)=>be(q(e,((n,i)=>C(o=>ye(o)&&n<=o&&i>=o))(r,t))),lt:r=>be(q(e,(t=>C(n=>ye(n)&&n<t))(r))),gt:r=>be(q(e,(t=>C(n=>ye(n)&&n>t))(r))),lte:r=>be(q(e,(t=>C(n=>ye(n)&&n<=t))(r))),gte:r=>be(q(e,(t=>C(n=>ye(n)&&n>=t))(r))),int:()=>be(q(e,C(r=>ye(r)&&Number.isInteger(r)))),finite:()=>be(q(e,C(r=>ye(r)&&Number.isFinite(r)))),positive:()=>be(q(e,C(r=>ye(r)&&r>0))),negative:()=>be(q(e,C(r=>ye(r)&&r<0)))}),sg=be(C(ye)),Ue=e=>Object.assign(pe(e),{between:(r,t)=>Ue(q(e,((n,i)=>C(o=>je(o)&&n<=o&&i>=o))(r,t))),lt:r=>Ue(q(e,(t=>C(n=>je(n)&&n<t))(r))),gt:r=>Ue(q(e,(t=>C(n=>je(n)&&n>t))(r))),lte:r=>Ue(q(e,(t=>C(n=>je(n)&&n<=t))(r))),gte:r=>Ue(q(e,(t=>C(n=>je(n)&&n>=t))(r))),positive:()=>Ue(q(e,C(r=>je(r)&&r>0))),negative:()=>Ue(q(e,C(r=>je(r)&&r<0)))}),ag=Ue(C(je)),lg=pe(C(function(e){return typeof e=="boolean"})),ug=pe(C(function(e){return typeof e=="symbol"})),cg=pe(C(function(e){return e==null})),pg=pe(C(function(e){return e!=null}));var ci=class extends Error{constructor(r){let t;try{t=JSON.stringify(r)}catch{t=r}super(`Pattern matching error: no pattern matches value ${t}`),this.input=void 0,this.input=r}},pi={matched:!1,value:void 0};function hr(e){return new di(e,pi)}var di=class e{constructor(r,t){this.input=void 0,this.state=void 0,this.input=r,this.state=t}with(...r){if(this.state.matched)return this;let t=r[r.length-1],n=[r[0]],i;r.length===3&&typeof r[1]=="function"?i=r[1]:r.length>2&&n.push(...r.slice(1,r.length-1));let o=!1,s={},a=(u,c)=>{o=!0,s[u]=c},l=!n.some(u=>Ee(u,this.input,a))||i&&!i(this.input)?pi:{matched:!0,value:t(o?Qt in s?s[Qt]:s:this.input,this.input)};return new e(this.input,l)}when(r,t){if(this.state.matched)return this;let n=!!r(this.input);return new e(this.input,n?{matched:!0,value:t(this.input,this.input)}:pi)}otherwise(r){return this.state.matched?this.state.value:r(this.input)}exhaustive(){if(this.state.matched)return this.state.value;throw new ci(this.input)}run(){return this.exhaustive()}returnType(){return this}};var Yo=__webpack_require__(164);var zu={warn:Ie("prisma:warn")},Zu={warn:()=>!process.env.PRISMA_DISABLE_WARNINGS};function Wt(e,...r){Zu.warn()&&console.warn(`${zu.warn} ${e}`,...r)}var Xu=(0,Yo.promisify)(Ho.default.exec),ee=gr("prisma:get-platform"),ec=["1.0.x","1.1.x","3.0.x"];async function zo(){let e=Kt.default.platform(),r=process.arch;if(e==="freebsd"){let s=await Ht("freebsd-version");if(s&&s.trim().length>0){let l=/^(\d+)\.?/.exec(s);if(l)return{platform:"freebsd",targetDistro:`freebsd${l[1]}`,arch:r}}}if(e!=="linux")return{platform:e,arch:r};let t=await tc(),n=await cc(),i=ic({arch:r,archFromUname:n,familyDistro:t.familyDistro}),{libssl:o}=await oc(i);return{platform:"linux",libssl:o,arch:r,archFromUname:n,...t}}function rc(e){let r=/^ID="?([^"\n]*)"?$/im,t=/^ID_LIKE="?([^"\n]*)"?$/im,n=r.exec(e),i=n&&n[1]&&n[1].toLowerCase()||"",o=t.exec(e),s=o&&o[1]&&o[1].toLowerCase()||"",a=hr({id:i,idLike:s}).with({id:"alpine"},({id:l})=>({targetDistro:"musl",familyDistro:l,originalDistro:l})).with({id:"raspbian"},({id:l})=>({targetDistro:"arm",familyDistro:"debian",originalDistro:l})).with({id:"nixos"},({id:l})=>({targetDistro:"nixos",originalDistro:l,familyDistro:"nixos"})).with({id:"debian"},{id:"ubuntu"},({id:l})=>({targetDistro:"debian",familyDistro:"debian",originalDistro:l})).with({id:"rhel"},{id:"centos"},{id:"fedora"},({id:l})=>({targetDistro:"rhel",familyDistro:"rhel",originalDistro:l})).when(({idLike:l})=>l.includes("debian")||l.includes("ubuntu"),({id:l})=>({targetDistro:"debian",familyDistro:"debian",originalDistro:l})).when(({idLike:l})=>i==="arch"||l.includes("arch"),({id:l})=>({targetDistro:"debian",familyDistro:"arch",originalDistro:l})).when(({idLike:l})=>l.includes("centos")||l.includes("fedora")||l.includes("rhel")||l.includes("suse"),({id:l})=>({targetDistro:"rhel",familyDistro:"rhel",originalDistro:l})).otherwise(({id:l})=>({targetDistro:void 0,familyDistro:void 0,originalDistro:l}));return ee(`Found distro info:
${JSON.stringify(a,null,2)}`),a}async function tc(){let e="/etc/os-release";try{let r=await mi.default.readFile(e,{encoding:"utf-8"});return rc(r)}catch{return{targetDistro:void 0,familyDistro:void 0,originalDistro:void 0}}}function nc(e){let r=/^OpenSSL\s(\d+\.\d+)\.\d+/.exec(e);if(r){let t=`${r[1]}.x`;return Zo(t)}}function Jo(e){let r=/libssl\.so\.(\d)(\.\d)?/.exec(e);if(r){let t=`${r[1]}${r[2]??".0"}.x`;return Zo(t)}}function Zo(e){let r=(()=>{if(es(e))return e;let t=e.split(".");return t[1]="0",t.join(".")})();if(ec.includes(r))return r}function ic(e){return hr(e).with({familyDistro:"musl"},()=>(ee('Trying platform-specific paths for "alpine"'),["/lib","/usr/lib"])).with({familyDistro:"debian"},({archFromUname:r})=>(ee('Trying platform-specific paths for "debian" (and "ubuntu")'),[`/usr/lib/${r}-linux-gnu`,`/lib/${r}-linux-gnu`])).with({familyDistro:"rhel"},()=>(ee('Trying platform-specific paths for "rhel"'),["/lib64","/usr/lib64"])).otherwise(({familyDistro:r,arch:t,archFromUname:n})=>(ee(`Don't know any platform-specific paths for "${r}" on ${t} (${n})`),[]))}async function oc(e){let r='grep -v "libssl.so.0"',t=await Ko(e);if(t){ee(`Found libssl.so file using platform-specific paths: ${t}`);let o=Jo(t);if(ee(`The parsed libssl version is: ${o}`),o)return{libssl:o,strategy:"libssl-specific-path"}}ee('Falling back to "ldconfig" and other generic paths');let n=await Ht(`ldconfig -p | sed "s/.*=>s*//" | sed "s|.*/||" | grep libssl | sort | ${r}`);if(n||(n=await Ko(["/lib64","/usr/lib64","/lib","/usr/lib"])),n){ee(`Found libssl.so file using "ldconfig" or other generic paths: ${n}`);let o=Jo(n);if(ee(`The parsed libssl version is: ${o}`),o)return{libssl:o,strategy:"ldconfig"}}let i=await Ht("openssl version -v");if(i){ee(`Found openssl binary with version: ${i}`);let o=nc(i);if(ee(`The parsed openssl version is: ${o}`),o)return{libssl:o,strategy:"openssl-binary"}}return ee("Couldn't find any version of libssl or OpenSSL in the system"),{}}async function Ko(e){for(let r of e){let t=await sc(r);if(t)return t}}async function sc(e){try{return(await mi.default.readdir(e)).find(t=>t.startsWith("libssl.so.")&&!t.startsWith("libssl.so.0"))}catch(r){if(r.code==="ENOENT")return;throw r}}async function ir(){let{binaryTarget:e}=await Xo();return e}function ac(e){return e.binaryTarget!==void 0}async function fi(){let{memoized:e,...r}=await Xo();return r}var Jt={};async function Xo(){if(ac(Jt))return Promise.resolve({...Jt,memoized:!0});let e=await zo(),r=lc(e);return Jt={...e,binaryTarget:r},{...Jt,memoized:!1}}function lc(e){let{platform:r,arch:t,archFromUname:n,libssl:i,targetDistro:o,familyDistro:s,originalDistro:a}=e;r==="linux"&&!["x64","arm64"].includes(t)&&Wt(`Prisma only officially supports Linux on amd64 (x86_64) and arm64 (aarch64) system architectures (detected "${t}" instead). If you are using your own custom Prisma engines, you can ignore this warning, as long as you've compiled the engines for your system architecture "${n}".`);let l="1.1.x";if(r==="linux"&&i===void 0){let c=hr({familyDistro:s}).with({familyDistro:"debian"},()=>"Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, add this command to your Dockerfile, or switch to an image that already has OpenSSL installed.").otherwise(()=>"Please manually install OpenSSL and try installing Prisma again.");Wt(`Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-${l}".
${c}`)}let u="debian";if(r==="linux"&&o===void 0&&ee(`Distro is "${a}". Falling back to Prisma engines built for "${u}".`),r==="darwin"&&t==="arm64")return"darwin-arm64";if(r==="darwin")return"darwin";if(r==="win32")return"windows";if(r==="freebsd")return o;if(r==="openbsd")return"openbsd";if(r==="netbsd")return"netbsd";if(r==="linux"&&o==="nixos")return"linux-nixos";if(r==="linux"&&t==="arm64")return`${o==="musl"?"linux-musl-arm64":"linux-arm64"}-openssl-${i||l}`;if(r==="linux"&&t==="arm")return`linux-arm-openssl-${i||l}`;if(r==="linux"&&o==="musl"){let c="linux-musl";return!i||es(i)?c:`${c}-openssl-${i}`}return r==="linux"&&o&&i?`${o}-openssl-${i}`:(r!=="linux"&&Wt(`Prisma detected unknown OS "${r}" and may not work as expected. Defaulting to "linux".`),i?`${u}-openssl-${i}`:o?`${o}-openssl-${l}`:`${u}-openssl-${l}`)}async function uc(e){try{return await e()}catch{return}}function Ht(e){return uc(async()=>{let r=await Xu(e);return ee(`Command "${e}" successfully returned "${r.stdout}"`),r.stdout})}async function cc(){return typeof Kt.default.machine=="function"?Kt.default.machine():(await Ht("uname -m"))?.trim()}function es(e){return e.startsWith("1.")}var Zt={};tr(Zt,{beep:()=>Fc,clearScreen:()=>kc,clearTerminal:()=>_c,cursorBackward:()=>yc,cursorDown:()=>gc,cursorForward:()=>hc,cursorGetPosition:()=>wc,cursorHide:()=>Pc,cursorLeft:()=>ns,cursorMove:()=>fc,cursorNextLine:()=>xc,cursorPrevLine:()=>vc,cursorRestorePosition:()=>Ec,cursorSavePosition:()=>bc,cursorShow:()=>Tc,cursorTo:()=>mc,cursorUp:()=>ts,enterAlternativeScreen:()=>Nc,eraseDown:()=>Cc,eraseEndLine:()=>Rc,eraseLine:()=>is,eraseLines:()=>Sc,eraseScreen:()=>gi,eraseStartLine:()=>Ac,eraseUp:()=>Ic,exitAlternativeScreen:()=>Lc,iTerm:()=>qc,image:()=>$c,link:()=>Mc,scrollDown:()=>Oc,scrollUp:()=>Dc});var zt=A(__webpack_require__(165),1);var Yt=globalThis.window?.document!==void 0,Eg=globalThis.process?.versions?.node!==void 0,wg=globalThis.process?.versions?.bun!==void 0,xg=globalThis.Deno?.version?.deno!==void 0,vg=globalThis.process?.versions?.electron!==void 0,Pg=globalThis.navigator?.userAgent?.includes("jsdom")===!0,Tg=typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope,Sg=typeof DedicatedWorkerGlobalScope<"u"&&globalThis instanceof DedicatedWorkerGlobalScope,Rg=typeof SharedWorkerGlobalScope<"u"&&globalThis instanceof SharedWorkerGlobalScope,Ag=typeof ServiceWorkerGlobalScope<"u"&&globalThis instanceof ServiceWorkerGlobalScope,Zr=globalThis.navigator?.userAgentData?.platform,Cg=Zr==="macOS"||globalThis.navigator?.platform==="MacIntel"||globalThis.navigator?.userAgent?.includes(" Mac ")===!0||globalThis.process?.platform==="darwin",Ig=Zr==="Windows"||globalThis.navigator?.platform==="Win32"||globalThis.process?.platform==="win32",Dg=Zr==="Linux"||globalThis.navigator?.platform?.startsWith("Linux")===!0||globalThis.navigator?.userAgent?.includes(" Linux ")===!0||globalThis.process?.platform==="linux",Og=Zr==="iOS"||globalThis.navigator?.platform==="MacIntel"&&globalThis.navigator?.maxTouchPoints>1||/iPad|iPhone|iPod/.test(globalThis.navigator?.platform),kg=Zr==="Android"||globalThis.navigator?.platform==="Android"||globalThis.navigator?.userAgent?.includes(" Android ")===!0||globalThis.process?.platform==="android";var I="\x1B[",et="\x1B]",yr="\x07",Xr=";",rs=!Yt&&zt.default.env.TERM_PROGRAM==="Apple_Terminal",pc=!Yt&&zt.default.platform==="win32",dc=Yt?()=>{throw new Error("`process.cwd()` only works in Node.js, not the browser.")}:zt.default.cwd,mc=(e,r)=>{if(typeof e!="number")throw new TypeError("The `x` argument is required");return typeof r!="number"?I+(e+1)+"G":I+(r+1)+Xr+(e+1)+"H"},fc=(e,r)=>{if(typeof e!="number")throw new TypeError("The `x` argument is required");let t="";return e<0?t+=I+-e+"D":e>0&&(t+=I+e+"C"),r<0?t+=I+-r+"A":r>0&&(t+=I+r+"B"),t},ts=(e=1)=>I+e+"A",gc=(e=1)=>I+e+"B",hc=(e=1)=>I+e+"C",yc=(e=1)=>I+e+"D",ns=I+"G",bc=rs?"\x1B7":I+"s",Ec=rs?"\x1B8":I+"u",wc=I+"6n",xc=I+"E",vc=I+"F",Pc=I+"?25l",Tc=I+"?25h",Sc=e=>{let r="";for(let t=0;t<e;t++)r+=is+(t<e-1?ts():"");return e&&(r+=ns),r},Rc=I+"K",Ac=I+"1K",is=I+"2K",Cc=I+"J",Ic=I+"1J",gi=I+"2J",Dc=I+"S",Oc=I+"T",kc="\x1Bc",_c=pc?`${gi}${I}0f`:`${gi}${I}3J${I}H`,Nc=I+"?1049h",Lc=I+"?1049l",Fc=yr,Mc=(e,r)=>[et,"8",Xr,Xr,r,yr,e,et,"8",Xr,Xr,yr].join(""),$c=(e,r={})=>{let t=`${et}1337;File=inline=1`;return r.width&&(t+=`;width=${r.width}`),r.height&&(t+=`;height=${r.height}`),r.preserveAspectRatio===!1&&(t+=";preserveAspectRatio=0"),t+":"+Buffer.from(e).toString("base64")+yr},qc={setCwd:(e=dc())=>`${et}50;CurrentDir=${e}${yr}`,annotation(e,r={}){let t=`${et}1337;`,n=r.x!==void 0,i=r.y!==void 0;if((n||i)&&!(n&&i&&r.length!==void 0))throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");return e=e.replaceAll("|",""),t+=r.isHidden?"AddHiddenAnnotation=":"AddAnnotation=",r.length>0?t+=(n?[e,r.length,r.x,r.y]:[r.length,e]).join("|"):t+=e,t+yr}};var Xt=A(ps(),1);function or(e,r,{target:t="stdout",...n}={}){return Xt.default[t]?Zt.link(e,r):n.fallback===!1?e:typeof n.fallback=="function"?n.fallback(e,r):`${e} (\u200B${r}\u200B)`}or.isSupported=Xt.default.stdout;or.stderr=(e,r,t={})=>or(e,r,{target:"stderr",...t});or.stderr.isSupported=Xt.default.stderr;function wi(e){return or(e,e,{fallback:Y})}var Gc=ds(),xi=Gc.version;function Er(e){let r=Qc();return r||(e?.config.engineType==="library"?"library":e?.config.engineType==="binary"?"binary":e?.config.engineType==="client"?"client":Wc(e))}function Qc(){let e=process.env.PRISMA_CLIENT_ENGINE_TYPE;return e==="library"?"library":e==="binary"?"binary":e==="client"?"client":void 0}function Wc(e){return e?.previewFeatures.includes("queryCompiler")?"client":"library"}function vi(e){return e.name==="DriverAdapterError"&&typeof e.cause=="object"}function en(e){return{ok:!0,value:e,map(r){return en(r(e))},flatMap(r){return r(e)}}}function sr(e){return{ok:!1,error:e,map(){return sr(e)},flatMap(){return sr(e)}}}var ms=N("driver-adapter-utils"),Pi=class{registeredErrors=[];consumeError(r){return this.registeredErrors[r]}registerNewError(r){let t=0;for(;this.registeredErrors[t]!==void 0;)t++;return this.registeredErrors[t]={error:r},t}};var rn=(e,r=new Pi)=>{let t={adapterName:e.adapterName,errorRegistry:r,queryRaw:ke(r,e.queryRaw.bind(e)),executeRaw:ke(r,e.executeRaw.bind(e)),executeScript:ke(r,e.executeScript.bind(e)),dispose:ke(r,e.dispose.bind(e)),provider:e.provider,startTransaction:async(...n)=>(await ke(r,e.startTransaction.bind(e))(...n)).map(o=>Jc(r,o))};return e.getConnectionInfo&&(t.getConnectionInfo=Kc(r,e.getConnectionInfo.bind(e))),t},Jc=(e,r)=>({adapterName:r.adapterName,provider:r.provider,options:r.options,queryRaw:ke(e,r.queryRaw.bind(r)),executeRaw:ke(e,r.executeRaw.bind(r)),commit:ke(e,r.commit.bind(r)),rollback:ke(e,r.rollback.bind(r))});function ke(e,r){return async(...t)=>{try{return en(await r(...t))}catch(n){if(ms("[error@wrapAsync]",n),vi(n))return sr(n.cause);let i=e.registerNewError(n);return sr({kind:"GenericJs",id:i})}}}function Kc(e,r){return(...t)=>{try{return en(r(...t))}catch(n){if(ms("[error@wrapSync]",n),vi(n))return sr(n.cause);let i=e.registerNewError(n);return sr({kind:"GenericJs",id:i})}}}var Yc=A(nn());var M=A(__webpack_require__(160)),zc=A(nn()),Th=N("prisma:engines");function fs(){return M.default.join(__dirname,"../")}var Sh="libquery-engine";M.default.join(__dirname,"../query-engine-darwin");M.default.join(__dirname,"../query-engine-darwin-arm64");M.default.join(__dirname,"../query-engine-debian-openssl-1.0.x");M.default.join(__dirname,"../query-engine-debian-openssl-1.1.x");M.default.join(__dirname,"../query-engine-debian-openssl-3.0.x");M.default.join(__dirname,"../query-engine-linux-static-x64");M.default.join(__dirname,"../query-engine-linux-static-arm64");M.default.join(__dirname,"../query-engine-rhel-openssl-1.0.x");M.default.join(__dirname,"../query-engine-rhel-openssl-1.1.x");M.default.join(__dirname,"../query-engine-rhel-openssl-3.0.x");M.default.join(__dirname,"../libquery_engine-darwin.dylib.node");M.default.join(__dirname,"../libquery_engine-darwin-arm64.dylib.node");M.default.join(__dirname,"../libquery_engine-debian-openssl-1.0.x.so.node");M.default.join(__dirname,"../libquery_engine-debian-openssl-1.1.x.so.node");M.default.join(__dirname,"../libquery_engine-debian-openssl-3.0.x.so.node");M.default.join(__dirname,"../libquery_engine-linux-arm64-openssl-1.0.x.so.node");M.default.join(__dirname,"../libquery_engine-linux-arm64-openssl-1.1.x.so.node");M.default.join(__dirname,"../libquery_engine-linux-arm64-openssl-3.0.x.so.node");M.default.join(__dirname,"../libquery_engine-linux-musl.so.node");M.default.join(__dirname,"../libquery_engine-linux-musl-openssl-3.0.x.so.node");M.default.join(__dirname,"../libquery_engine-rhel-openssl-1.0.x.so.node");M.default.join(__dirname,"../libquery_engine-rhel-openssl-1.1.x.so.node");M.default.join(__dirname,"../libquery_engine-rhel-openssl-3.0.x.so.node");M.default.join(__dirname,"../query_engine-windows.dll.node");var Si=A(__webpack_require__(159)),gs=gr("chmodPlusX");function Ri(e){if(process.platform==="win32")return;let r=Si.default.statSync(e),t=r.mode|64|8|1;if(r.mode===t){gs(`Execution permissions of ${e} are fine`);return}let n=t.toString(8).slice(-3);gs(`Have to call chmodPlusX on ${e}`),Si.default.chmodSync(e,n)}function Ai(e){let r=e.e,t=a=>`Prisma cannot find the required \`${a}\` system library in your system`,n=r.message.includes("cannot open shared object file"),i=`Please refer to the documentation about Prisma's system requirements: ${wi("https://pris.ly/d/system-requirements")}`,o=`Unable to require(\`${Ce(e.id)}\`).`,s=hr({message:r.message,code:r.code}).with({code:"ENOENT"},()=>"File does not exist.").when(({message:a})=>n&&a.includes("libz"),()=>`${t("libz")}. Please install it and try again.`).when(({message:a})=>n&&a.includes("libgcc_s"),()=>`${t("libgcc_s")}. Please install it and try again.`).when(({message:a})=>n&&a.includes("libssl"),()=>{let a=e.platformInfo.libssl?`openssl-${e.platformInfo.libssl}`:"openssl";return`${t("libssl")}. Please install ${a} and try again.`}).when(({message:a})=>a.includes("GLIBC"),()=>`Prisma has detected an incompatible version of the \`glibc\` C standard library installed in your system. This probably means your system may be too old to run Prisma. ${i}`).when(({message:a})=>e.platformInfo.platform==="linux"&&a.includes("symbol not found"),()=>`The Prisma engines are not compatible with your system ${e.platformInfo.originalDistro} on (${e.platformInfo.archFromUname}) which uses the \`${e.platformInfo.binaryTarget}\` binaryTarget by default. ${i}`).otherwise(()=>`The Prisma engines do not seem to be compatible with your system. ${i}`);return`${o}
${s}

Details: ${r.message}`}var bs=A(ys(),1);function Ci(e){let r=(0,bs.default)(e);if(r===0)return e;let t=new RegExp(`^[ \\t]{${r}}`,"gm");return e.replace(t,"")}var Es="prisma+postgres",on=`${Es}:`;function sn(e){return e?.toString().startsWith(`${on}//`)??!1}function Ii(e){if(!sn(e))return!1;let{host:r}=new URL(e);return r.includes("localhost")||r.includes("127.0.0.1")||r.includes("[::1]")}var xs=A(Di());function ki(e){return String(new Oi(e))}var Oi=class{constructor(r){this.config=r}toString(){let{config:r}=this,t=r.provider.fromEnvVar?`env("${r.provider.fromEnvVar}")`:r.provider.value,n=JSON.parse(JSON.stringify({provider:t,binaryTargets:Zc(r.binaryTargets)}));return`generator ${r.name} {
${(0,xs.default)(Xc(n),2)}
}`}};function Zc(e){let r;if(e.length>0){let t=e.find(n=>n.fromEnvVar!==null);t?r=`env("${t.fromEnvVar}")`:r=e.map(n=>n.native?"native":n.value)}else r=void 0;return r}function Xc(e){let r=Object.keys(e).reduce((t,n)=>Math.max(t,n.length),0);return Object.entries(e).map(([t,n])=>`${t.padEnd(r)} = ${ep(n)}`).join(`
`)}function ep(e){return JSON.parse(JSON.stringify(e,(r,t)=>Array.isArray(t)?`[${t.map(n=>JSON.stringify(n)).join(", ")}]`:JSON.stringify(t)))}var tt={};tr(tt,{error:()=>np,info:()=>tp,log:()=>rp,query:()=>ip,should:()=>vs,tags:()=>rt,warn:()=>_i});var rt={error:ce("prisma:error"),warn:Ie("prisma:warn"),info:De("prisma:info"),query:nr("prisma:query")},vs={warn:()=>!process.env.PRISMA_DISABLE_WARNINGS};function rp(...e){console.log(...e)}function _i(e,...r){vs.warn()&&console.warn(`${rt.warn} ${e}`,...r)}function tp(e,...r){console.info(`${rt.info} ${e}`,...r)}function np(e,...r){console.error(`${rt.error} ${e}`,...r)}function ip(e,...r){console.log(`${rt.query} ${e}`,...r)}function an(e,r){if(!e)throw new Error(`${r}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`)}function ar(e,r){throw new Error(r)}var nt=A(__webpack_require__(160));function Li(e){return nt.default.sep===nt.default.posix.sep?e:e.split(nt.default.sep).join(nt.default.posix.sep)}var qi=A(Os()),ln=A(__webpack_require__(159));var wr=A(__webpack_require__(160));function ks(e){let r=e.ignoreProcessEnv?{}:process.env,t=n=>n.match(/(.?\${(?:[a-zA-Z0-9_]+)?})/g)?.reduce(function(o,s){let a=/(.?)\${([a-zA-Z0-9_]+)?}/g.exec(s);if(!a)return o;let l=a[1],u,c;if(l==="\\")c=a[0],u=c.replace("\\$","$");else{let p=a[2];c=a[0].substring(l.length),u=Object.hasOwnProperty.call(r,p)?r[p]:e.parsed[p]||"",u=t(u)}return o.replace(c,u)},n)??n;for(let n in e.parsed){let i=Object.hasOwnProperty.call(r,n)?r[n]:e.parsed[n];e.parsed[n]=t(i)}for(let n in e.parsed)r[n]=e.parsed[n];return e}var $i=gr("prisma:tryLoadEnv");function ot({rootEnvPath:e,schemaEnvPath:r},t={conflictCheck:"none"}){let n=_s(e);t.conflictCheck!=="none"&&wp(n,r,t.conflictCheck);let i=null;return Ns(n?.path,r)||(i=_s(r)),!n&&!i&&$i("No Environment variables loaded"),i?.dotenvResult.error?console.error(ce(W("Schema Env Error: "))+i.dotenvResult.error):{message:[n?.message,i?.message].filter(Boolean).join(`
`),parsed:{...n?.dotenvResult?.parsed,...i?.dotenvResult?.parsed}}}function wp(e,r,t){let n=e?.dotenvResult.parsed,i=!Ns(e?.path,r);if(n&&r&&i&&ln.default.existsSync(r)){let o=qi.default.parse(ln.default.readFileSync(r)),s=[];for(let a in o)n[a]===o[a]&&s.push(a);if(s.length>0){let a=wr.default.relative(process.cwd(),e.path),l=wr.default.relative(process.cwd(),r);if(t==="error"){let u=`There is a conflict between env var${s.length>1?"s":""} in ${Y(a)} and ${Y(l)}
Conflicting env vars:
${s.map(c=>`  ${W(c)}`).join(`
`)}

We suggest to move the contents of ${Y(l)} to ${Y(a)} to consolidate your env vars.
`;throw new Error(u)}else if(t==="warn"){let u=`Conflict for env var${s.length>1?"s":""} ${s.map(c=>W(c)).join(", ")} in ${Y(a)} and ${Y(l)}
Env vars from ${Y(l)} overwrite the ones from ${Y(a)}
      `;console.warn(`${Ie("warn(prisma)")} ${u}`)}}}}function _s(e){if(xp(e)){$i(`Environment variables loaded from ${e}`);let r=qi.default.config({path:e,debug:process.env.DOTENV_CONFIG_DEBUG?!0:void 0});return{dotenvResult:ks(r),message:Ce(`Environment variables loaded from ${wr.default.relative(process.cwd(),e)}`),path:e}}else $i(`Environment variables not found at ${e}`);return null}function Ns(e,r){return e&&r&&wr.default.resolve(e)===wr.default.resolve(r)}function xp(e){return!!(e&&ln.default.existsSync(e))}function Vi(e,r){return Object.prototype.hasOwnProperty.call(e,r)}function cn(e,r){let t={};for(let n of Object.keys(e))t[n]=r(e[n],n);return t}function ji(e,r){if(e.length===0)return;let t=e[0];for(let n=1;n<e.length;n++)r(t,e[n])<0&&(t=e[n]);return t}function x(e,r){Object.defineProperty(e,"name",{value:r,configurable:!0})}var Fs=new Set,st=(e,r,...t)=>{Fs.has(e)||(Fs.add(e),_i(r,...t))};var P=class e extends Error{clientVersion;errorCode;retryable;constructor(r,t,n){super(r),this.name="PrismaClientInitializationError",this.clientVersion=t,this.errorCode=n,Error.captureStackTrace(e)}get[Symbol.toStringTag](){return"PrismaClientInitializationError"}};x(P,"PrismaClientInitializationError");var z=class extends Error{code;meta;clientVersion;batchRequestIdx;constructor(r,{code:t,clientVersion:n,meta:i,batchRequestIdx:o}){super(r),this.name="PrismaClientKnownRequestError",this.code=t,this.clientVersion=n,this.meta=i,Object.defineProperty(this,"batchRequestIdx",{value:o,enumerable:!1,writable:!0})}get[Symbol.toStringTag](){return"PrismaClientKnownRequestError"}};x(z,"PrismaClientKnownRequestError");var le=class extends Error{clientVersion;constructor(r,t){super(r),this.name="PrismaClientRustPanicError",this.clientVersion=t}get[Symbol.toStringTag](){return"PrismaClientRustPanicError"}};x(le,"PrismaClientRustPanicError");var V=class extends Error{clientVersion;batchRequestIdx;constructor(r,{clientVersion:t,batchRequestIdx:n}){super(r),this.name="PrismaClientUnknownRequestError",this.clientVersion=t,Object.defineProperty(this,"batchRequestIdx",{value:n,writable:!0,enumerable:!1})}get[Symbol.toStringTag](){return"PrismaClientUnknownRequestError"}};x(V,"PrismaClientUnknownRequestError");var Z=class extends Error{name="PrismaClientValidationError";clientVersion;constructor(r,{clientVersion:t}){super(r),this.clientVersion=t}get[Symbol.toStringTag](){return"PrismaClientValidationError"}};x(Z,"PrismaClientValidationError");var we=class{_map=new Map;get(r){return this._map.get(r)?.value}set(r,t){this._map.set(r,{value:t})}getOrCreate(r,t){let n=this._map.get(r);if(n)return n.value;let i=t();return this.set(r,i),i}};function We(e){return e.substring(0,1).toLowerCase()+e.substring(1)}function Ms(e,r){let t={};for(let n of e){let i=n[r];t[i]=n}return t}function at(e){let r;return{get(){return r||(r={value:e()}),r.value}}}function $s(e){return{models:Bi(e.models),enums:Bi(e.enums),types:Bi(e.types)}}function Bi(e){let r={};for(let{name:t,...n}of e)r[t]=n;return r}function xr(e){return e instanceof Date||Object.prototype.toString.call(e)==="[object Date]"}function dn(e){return e.toString()!=="Invalid Date"}var vr=9e15,Ye=1e9,Ui="0123456789abcdef",gn="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",hn="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",Gi={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-vr,maxE:vr,crypto:!1},Bs,Ne,w=!0,bn="[DecimalError] ",He=bn+"Invalid argument: ",Us=bn+"Precision limit exceeded",Gs=bn+"crypto unavailable",Qs="[object Decimal]",X=Math.floor,U=Math.pow,vp=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,Pp=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,Tp=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,Ws=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,fe=1e7,E=7,Sp=9007199254740991,Rp=gn.length-1,Qi=hn.length-1,m={toStringTag:Qs};m.absoluteValue=m.abs=function(){var e=new this.constructor(this);return e.s<0&&(e.s=1),y(e)};m.ceil=function(){return y(new this.constructor(this),this.e+1,2)};m.clampedTo=m.clamp=function(e,r){var t,n=this,i=n.constructor;if(e=new i(e),r=new i(r),!e.s||!r.s)return new i(NaN);if(e.gt(r))throw Error(He+r);return t=n.cmp(e),t<0?e:n.cmp(r)>0?r:new i(n)};m.comparedTo=m.cmp=function(e){var r,t,n,i,o=this,s=o.d,a=(e=new o.constructor(e)).d,l=o.s,u=e.s;if(!s||!a)return!l||!u?NaN:l!==u?l:s===a?0:!s^l<0?1:-1;if(!s[0]||!a[0])return s[0]?l:a[0]?-u:0;if(l!==u)return l;if(o.e!==e.e)return o.e>e.e^l<0?1:-1;for(n=s.length,i=a.length,r=0,t=n<i?n:i;r<t;++r)if(s[r]!==a[r])return s[r]>a[r]^l<0?1:-1;return n===i?0:n>i^l<0?1:-1};m.cosine=m.cos=function(){var e,r,t=this,n=t.constructor;return t.d?t.d[0]?(e=n.precision,r=n.rounding,n.precision=e+Math.max(t.e,t.sd())+E,n.rounding=1,t=Ap(n,zs(n,t)),n.precision=e,n.rounding=r,y(Ne==2||Ne==3?t.neg():t,e,r,!0)):new n(1):new n(NaN)};m.cubeRoot=m.cbrt=function(){var e,r,t,n,i,o,s,a,l,u,c=this,p=c.constructor;if(!c.isFinite()||c.isZero())return new p(c);for(w=!1,o=c.s*U(c.s*c,1/3),!o||Math.abs(o)==1/0?(t=J(c.d),e=c.e,(o=(e-t.length+1)%3)&&(t+=o==1||o==-2?"0":"00"),o=U(t,1/3),e=X((e+1)/3)-(e%3==(e<0?-1:2)),o==1/0?t="5e"+e:(t=o.toExponential(),t=t.slice(0,t.indexOf("e")+1)+e),n=new p(t),n.s=c.s):n=new p(o.toString()),s=(e=p.precision)+3;;)if(a=n,l=a.times(a).times(a),u=l.plus(c),n=L(u.plus(c).times(a),u.plus(l),s+2,1),J(a.d).slice(0,s)===(t=J(n.d)).slice(0,s))if(t=t.slice(s-3,s+1),t=="9999"||!i&&t=="4999"){if(!i&&(y(a,e+1,0),a.times(a).times(a).eq(c))){n=a;break}s+=4,i=1}else{(!+t||!+t.slice(1)&&t.charAt(0)=="5")&&(y(n,e+1,1),r=!n.times(n).times(n).eq(c));break}return w=!0,y(n,e,p.rounding,r)};m.decimalPlaces=m.dp=function(){var e,r=this.d,t=NaN;if(r){if(e=r.length-1,t=(e-X(this.e/E))*E,e=r[e],e)for(;e%10==0;e/=10)t--;t<0&&(t=0)}return t};m.dividedBy=m.div=function(e){return L(this,new this.constructor(e))};m.dividedToIntegerBy=m.divToInt=function(e){var r=this,t=r.constructor;return y(L(r,new t(e),0,1,1),t.precision,t.rounding)};m.equals=m.eq=function(e){return this.cmp(e)===0};m.floor=function(){return y(new this.constructor(this),this.e+1,3)};m.greaterThan=m.gt=function(e){return this.cmp(e)>0};m.greaterThanOrEqualTo=m.gte=function(e){var r=this.cmp(e);return r==1||r===0};m.hyperbolicCosine=m.cosh=function(){var e,r,t,n,i,o=this,s=o.constructor,a=new s(1);if(!o.isFinite())return new s(o.s?1/0:NaN);if(o.isZero())return a;t=s.precision,n=s.rounding,s.precision=t+Math.max(o.e,o.sd())+4,s.rounding=1,i=o.d.length,i<32?(e=Math.ceil(i/3),r=(1/wn(4,e)).toString()):(e=16,r="2.3283064365386962890625e-10"),o=Pr(s,1,o.times(r),new s(1),!0);for(var l,u=e,c=new s(8);u--;)l=o.times(o),o=a.minus(l.times(c.minus(l.times(c))));return y(o,s.precision=t,s.rounding=n,!0)};m.hyperbolicSine=m.sinh=function(){var e,r,t,n,i=this,o=i.constructor;if(!i.isFinite()||i.isZero())return new o(i);if(r=o.precision,t=o.rounding,o.precision=r+Math.max(i.e,i.sd())+4,o.rounding=1,n=i.d.length,n<3)i=Pr(o,2,i,i,!0);else{e=1.4*Math.sqrt(n),e=e>16?16:e|0,i=i.times(1/wn(5,e)),i=Pr(o,2,i,i,!0);for(var s,a=new o(5),l=new o(16),u=new o(20);e--;)s=i.times(i),i=i.times(a.plus(s.times(l.times(s).plus(u))))}return o.precision=r,o.rounding=t,y(i,r,t,!0)};m.hyperbolicTangent=m.tanh=function(){var e,r,t=this,n=t.constructor;return t.isFinite()?t.isZero()?new n(t):(e=n.precision,r=n.rounding,n.precision=e+7,n.rounding=1,L(t.sinh(),t.cosh(),n.precision=e,n.rounding=r)):new n(t.s)};m.inverseCosine=m.acos=function(){var e=this,r=e.constructor,t=e.abs().cmp(1),n=r.precision,i=r.rounding;return t!==-1?t===0?e.isNeg()?xe(r,n,i):new r(0):new r(NaN):e.isZero()?xe(r,n+4,i).times(.5):(r.precision=n+6,r.rounding=1,e=new r(1).minus(e).div(e.plus(1)).sqrt().atan(),r.precision=n,r.rounding=i,e.times(2))};m.inverseHyperbolicCosine=m.acosh=function(){var e,r,t=this,n=t.constructor;return t.lte(1)?new n(t.eq(1)?0:NaN):t.isFinite()?(e=n.precision,r=n.rounding,n.precision=e+Math.max(Math.abs(t.e),t.sd())+4,n.rounding=1,w=!1,t=t.times(t).minus(1).sqrt().plus(t),w=!0,n.precision=e,n.rounding=r,t.ln()):new n(t)};m.inverseHyperbolicSine=m.asinh=function(){var e,r,t=this,n=t.constructor;return!t.isFinite()||t.isZero()?new n(t):(e=n.precision,r=n.rounding,n.precision=e+2*Math.max(Math.abs(t.e),t.sd())+6,n.rounding=1,w=!1,t=t.times(t).plus(1).sqrt().plus(t),w=!0,n.precision=e,n.rounding=r,t.ln())};m.inverseHyperbolicTangent=m.atanh=function(){var e,r,t,n,i=this,o=i.constructor;return i.isFinite()?i.e>=0?new o(i.abs().eq(1)?i.s/0:i.isZero()?i:NaN):(e=o.precision,r=o.rounding,n=i.sd(),Math.max(n,e)<2*-i.e-1?y(new o(i),e,r,!0):(o.precision=t=n-i.e,i=L(i.plus(1),new o(1).minus(i),t+e,1),o.precision=e+4,o.rounding=1,i=i.ln(),o.precision=e,o.rounding=r,i.times(.5))):new o(NaN)};m.inverseSine=m.asin=function(){var e,r,t,n,i=this,o=i.constructor;return i.isZero()?new o(i):(r=i.abs().cmp(1),t=o.precision,n=o.rounding,r!==-1?r===0?(e=xe(o,t+4,n).times(.5),e.s=i.s,e):new o(NaN):(o.precision=t+6,o.rounding=1,i=i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan(),o.precision=t,o.rounding=n,i.times(2)))};m.inverseTangent=m.atan=function(){var e,r,t,n,i,o,s,a,l,u=this,c=u.constructor,p=c.precision,d=c.rounding;if(u.isFinite()){if(u.isZero())return new c(u);if(u.abs().eq(1)&&p+4<=Qi)return s=xe(c,p+4,d).times(.25),s.s=u.s,s}else{if(!u.s)return new c(NaN);if(p+4<=Qi)return s=xe(c,p+4,d).times(.5),s.s=u.s,s}for(c.precision=a=p+10,c.rounding=1,t=Math.min(28,a/E+2|0),e=t;e;--e)u=u.div(u.times(u).plus(1).sqrt().plus(1));for(w=!1,r=Math.ceil(a/E),n=1,l=u.times(u),s=new c(u),i=u;e!==-1;)if(i=i.times(l),o=s.minus(i.div(n+=2)),i=i.times(l),s=o.plus(i.div(n+=2)),s.d[r]!==void 0)for(e=r;s.d[e]===o.d[e]&&e--;);return t&&(s=s.times(2<<t-1)),w=!0,y(s,c.precision=p,c.rounding=d,!0)};m.isFinite=function(){return!!this.d};m.isInteger=m.isInt=function(){return!!this.d&&X(this.e/E)>this.d.length-2};m.isNaN=function(){return!this.s};m.isNegative=m.isNeg=function(){return this.s<0};m.isPositive=m.isPos=function(){return this.s>0};m.isZero=function(){return!!this.d&&this.d[0]===0};m.lessThan=m.lt=function(e){return this.cmp(e)<0};m.lessThanOrEqualTo=m.lte=function(e){return this.cmp(e)<1};m.logarithm=m.log=function(e){var r,t,n,i,o,s,a,l,u=this,c=u.constructor,p=c.precision,d=c.rounding,f=5;if(e==null)e=new c(10),r=!0;else{if(e=new c(e),t=e.d,e.s<0||!t||!t[0]||e.eq(1))return new c(NaN);r=e.eq(10)}if(t=u.d,u.s<0||!t||!t[0]||u.eq(1))return new c(t&&!t[0]?-1/0:u.s!=1?NaN:t?0:1/0);if(r)if(t.length>1)o=!0;else{for(i=t[0];i%10===0;)i/=10;o=i!==1}if(w=!1,a=p+f,s=Ke(u,a),n=r?yn(c,a+10):Ke(e,a),l=L(s,n,a,1),lt(l.d,i=p,d))do if(a+=10,s=Ke(u,a),n=r?yn(c,a+10):Ke(e,a),l=L(s,n,a,1),!o){+J(l.d).slice(i+1,i+15)+1==1e14&&(l=y(l,p+1,0));break}while(lt(l.d,i+=10,d));return w=!0,y(l,p,d)};m.minus=m.sub=function(e){var r,t,n,i,o,s,a,l,u,c,p,d,f=this,h=f.constructor;if(e=new h(e),!f.d||!e.d)return!f.s||!e.s?e=new h(NaN):f.d?e.s=-e.s:e=new h(e.d||f.s!==e.s?f:NaN),e;if(f.s!=e.s)return e.s=-e.s,f.plus(e);if(u=f.d,d=e.d,a=h.precision,l=h.rounding,!u[0]||!d[0]){if(d[0])e.s=-e.s;else if(u[0])e=new h(f);else return new h(l===3?-0:0);return w?y(e,a,l):e}if(t=X(e.e/E),c=X(f.e/E),u=u.slice(),o=c-t,o){for(p=o<0,p?(r=u,o=-o,s=d.length):(r=d,t=c,s=u.length),n=Math.max(Math.ceil(a/E),s)+2,o>n&&(o=n,r.length=1),r.reverse(),n=o;n--;)r.push(0);r.reverse()}else{for(n=u.length,s=d.length,p=n<s,p&&(s=n),n=0;n<s;n++)if(u[n]!=d[n]){p=u[n]<d[n];break}o=0}for(p&&(r=u,u=d,d=r,e.s=-e.s),s=u.length,n=d.length-s;n>0;--n)u[s++]=0;for(n=d.length;n>o;){if(u[--n]<d[n]){for(i=n;i&&u[--i]===0;)u[i]=fe-1;--u[i],u[n]+=fe}u[n]-=d[n]}for(;u[--s]===0;)u.pop();for(;u[0]===0;u.shift())--t;return u[0]?(e.d=u,e.e=En(u,t),w?y(e,a,l):e):new h(l===3?-0:0)};m.modulo=m.mod=function(e){var r,t=this,n=t.constructor;return e=new n(e),!t.d||!e.s||e.d&&!e.d[0]?new n(NaN):!e.d||t.d&&!t.d[0]?y(new n(t),n.precision,n.rounding):(w=!1,n.modulo==9?(r=L(t,e.abs(),0,3,1),r.s*=e.s):r=L(t,e,0,n.modulo,1),r=r.times(e),w=!0,t.minus(r))};m.naturalExponential=m.exp=function(){return Wi(this)};m.naturalLogarithm=m.ln=function(){return Ke(this)};m.negated=m.neg=function(){var e=new this.constructor(this);return e.s=-e.s,y(e)};m.plus=m.add=function(e){var r,t,n,i,o,s,a,l,u,c,p=this,d=p.constructor;if(e=new d(e),!p.d||!e.d)return!p.s||!e.s?e=new d(NaN):p.d||(e=new d(e.d||p.s===e.s?p:NaN)),e;if(p.s!=e.s)return e.s=-e.s,p.minus(e);if(u=p.d,c=e.d,a=d.precision,l=d.rounding,!u[0]||!c[0])return c[0]||(e=new d(p)),w?y(e,a,l):e;if(o=X(p.e/E),n=X(e.e/E),u=u.slice(),i=o-n,i){for(i<0?(t=u,i=-i,s=c.length):(t=c,n=o,s=u.length),o=Math.ceil(a/E),s=o>s?o+1:s+1,i>s&&(i=s,t.length=1),t.reverse();i--;)t.push(0);t.reverse()}for(s=u.length,i=c.length,s-i<0&&(i=s,t=c,c=u,u=t),r=0;i;)r=(u[--i]=u[i]+c[i]+r)/fe|0,u[i]%=fe;for(r&&(u.unshift(r),++n),s=u.length;u[--s]==0;)u.pop();return e.d=u,e.e=En(u,n),w?y(e,a,l):e};m.precision=m.sd=function(e){var r,t=this;if(e!==void 0&&e!==!!e&&e!==1&&e!==0)throw Error(He+e);return t.d?(r=Js(t.d),e&&t.e+1>r&&(r=t.e+1)):r=NaN,r};m.round=function(){var e=this,r=e.constructor;return y(new r(e),e.e+1,r.rounding)};m.sine=m.sin=function(){var e,r,t=this,n=t.constructor;return t.isFinite()?t.isZero()?new n(t):(e=n.precision,r=n.rounding,n.precision=e+Math.max(t.e,t.sd())+E,n.rounding=1,t=Ip(n,zs(n,t)),n.precision=e,n.rounding=r,y(Ne>2?t.neg():t,e,r,!0)):new n(NaN)};m.squareRoot=m.sqrt=function(){var e,r,t,n,i,o,s=this,a=s.d,l=s.e,u=s.s,c=s.constructor;if(u!==1||!a||!a[0])return new c(!u||u<0&&(!a||a[0])?NaN:a?s:1/0);for(w=!1,u=Math.sqrt(+s),u==0||u==1/0?(r=J(a),(r.length+l)%2==0&&(r+="0"),u=Math.sqrt(r),l=X((l+1)/2)-(l<0||l%2),u==1/0?r="5e"+l:(r=u.toExponential(),r=r.slice(0,r.indexOf("e")+1)+l),n=new c(r)):n=new c(u.toString()),t=(l=c.precision)+3;;)if(o=n,n=o.plus(L(s,o,t+2,1)).times(.5),J(o.d).slice(0,t)===(r=J(n.d)).slice(0,t))if(r=r.slice(t-3,t+1),r=="9999"||!i&&r=="4999"){if(!i&&(y(o,l+1,0),o.times(o).eq(s))){n=o;break}t+=4,i=1}else{(!+r||!+r.slice(1)&&r.charAt(0)=="5")&&(y(n,l+1,1),e=!n.times(n).eq(s));break}return w=!0,y(n,l,c.rounding,e)};m.tangent=m.tan=function(){var e,r,t=this,n=t.constructor;return t.isFinite()?t.isZero()?new n(t):(e=n.precision,r=n.rounding,n.precision=e+10,n.rounding=1,t=t.sin(),t.s=1,t=L(t,new n(1).minus(t.times(t)).sqrt(),e+10,0),n.precision=e,n.rounding=r,y(Ne==2||Ne==4?t.neg():t,e,r,!0)):new n(NaN)};m.times=m.mul=function(e){var r,t,n,i,o,s,a,l,u,c=this,p=c.constructor,d=c.d,f=(e=new p(e)).d;if(e.s*=c.s,!d||!d[0]||!f||!f[0])return new p(!e.s||d&&!d[0]&&!f||f&&!f[0]&&!d?NaN:!d||!f?e.s/0:e.s*0);for(t=X(c.e/E)+X(e.e/E),l=d.length,u=f.length,l<u&&(o=d,d=f,f=o,s=l,l=u,u=s),o=[],s=l+u,n=s;n--;)o.push(0);for(n=u;--n>=0;){for(r=0,i=l+n;i>n;)a=o[i]+f[n]*d[i-n-1]+r,o[i--]=a%fe|0,r=a/fe|0;o[i]=(o[i]+r)%fe|0}for(;!o[--s];)o.pop();return r?++t:o.shift(),e.d=o,e.e=En(o,t),w?y(e,p.precision,p.rounding):e};m.toBinary=function(e,r){return Ji(this,2,e,r)};m.toDecimalPlaces=m.toDP=function(e,r){var t=this,n=t.constructor;return t=new n(t),e===void 0?t:(ie(e,0,Ye),r===void 0?r=n.rounding:ie(r,0,8),y(t,e+t.e+1,r))};m.toExponential=function(e,r){var t,n=this,i=n.constructor;return e===void 0?t=ve(n,!0):(ie(e,0,Ye),r===void 0?r=i.rounding:ie(r,0,8),n=y(new i(n),e+1,r),t=ve(n,!0,e+1)),n.isNeg()&&!n.isZero()?"-"+t:t};m.toFixed=function(e,r){var t,n,i=this,o=i.constructor;return e===void 0?t=ve(i):(ie(e,0,Ye),r===void 0?r=o.rounding:ie(r,0,8),n=y(new o(i),e+i.e+1,r),t=ve(n,!1,e+n.e+1)),i.isNeg()&&!i.isZero()?"-"+t:t};m.toFraction=function(e){var r,t,n,i,o,s,a,l,u,c,p,d,f=this,h=f.d,g=f.constructor;if(!h)return new g(f);if(u=t=new g(1),n=l=new g(0),r=new g(n),o=r.e=Js(h)-f.e-1,s=o%E,r.d[0]=U(10,s<0?E+s:s),e==null)e=o>0?r:u;else{if(a=new g(e),!a.isInt()||a.lt(u))throw Error(He+a);e=a.gt(r)?o>0?r:u:a}for(w=!1,a=new g(J(h)),c=g.precision,g.precision=o=h.length*E*2;p=L(a,r,0,1,1),i=t.plus(p.times(n)),i.cmp(e)!=1;)t=n,n=i,i=u,u=l.plus(p.times(i)),l=i,i=r,r=a.minus(p.times(i)),a=i;return i=L(e.minus(t),n,0,1,1),l=l.plus(i.times(u)),t=t.plus(i.times(n)),l.s=u.s=f.s,d=L(u,n,o,1).minus(f).abs().cmp(L(l,t,o,1).minus(f).abs())<1?[u,n]:[l,t],g.precision=c,w=!0,d};m.toHexadecimal=m.toHex=function(e,r){return Ji(this,16,e,r)};m.toNearest=function(e,r){var t=this,n=t.constructor;if(t=new n(t),e==null){if(!t.d)return t;e=new n(1),r=n.rounding}else{if(e=new n(e),r===void 0?r=n.rounding:ie(r,0,8),!t.d)return e.s?t:e;if(!e.d)return e.s&&(e.s=t.s),e}return e.d[0]?(w=!1,t=L(t,e,0,r,1).times(e),w=!0,y(t)):(e.s=t.s,t=e),t};m.toNumber=function(){return+this};m.toOctal=function(e,r){return Ji(this,8,e,r)};m.toPower=m.pow=function(e){var r,t,n,i,o,s,a=this,l=a.constructor,u=+(e=new l(e));if(!a.d||!e.d||!a.d[0]||!e.d[0])return new l(U(+a,u));if(a=new l(a),a.eq(1))return a;if(n=l.precision,o=l.rounding,e.eq(1))return y(a,n,o);if(r=X(e.e/E),r>=e.d.length-1&&(t=u<0?-u:u)<=Sp)return i=Ks(l,a,t,n),e.s<0?new l(1).div(i):y(i,n,o);if(s=a.s,s<0){if(r<e.d.length-1)return new l(NaN);if((e.d[r]&1)==0&&(s=1),a.e==0&&a.d[0]==1&&a.d.length==1)return a.s=s,a}return t=U(+a,u),r=t==0||!isFinite(t)?X(u*(Math.log("0."+J(a.d))/Math.LN10+a.e+1)):new l(t+"").e,r>l.maxE+1||r<l.minE-1?new l(r>0?s/0:0):(w=!1,l.rounding=a.s=1,t=Math.min(12,(r+"").length),i=Wi(e.times(Ke(a,n+t)),n),i.d&&(i=y(i,n+5,1),lt(i.d,n,o)&&(r=n+10,i=y(Wi(e.times(Ke(a,r+t)),r),r+5,1),+J(i.d).slice(n+1,n+15)+1==1e14&&(i=y(i,n+1,0)))),i.s=s,w=!0,l.rounding=o,y(i,n,o))};m.toPrecision=function(e,r){var t,n=this,i=n.constructor;return e===void 0?t=ve(n,n.e<=i.toExpNeg||n.e>=i.toExpPos):(ie(e,1,Ye),r===void 0?r=i.rounding:ie(r,0,8),n=y(new i(n),e,r),t=ve(n,e<=n.e||n.e<=i.toExpNeg,e)),n.isNeg()&&!n.isZero()?"-"+t:t};m.toSignificantDigits=m.toSD=function(e,r){var t=this,n=t.constructor;return e===void 0?(e=n.precision,r=n.rounding):(ie(e,1,Ye),r===void 0?r=n.rounding:ie(r,0,8)),y(new n(t),e,r)};m.toString=function(){var e=this,r=e.constructor,t=ve(e,e.e<=r.toExpNeg||e.e>=r.toExpPos);return e.isNeg()&&!e.isZero()?"-"+t:t};m.truncated=m.trunc=function(){return y(new this.constructor(this),this.e+1,1)};m.valueOf=m.toJSON=function(){var e=this,r=e.constructor,t=ve(e,e.e<=r.toExpNeg||e.e>=r.toExpPos);return e.isNeg()?"-"+t:t};function J(e){var r,t,n,i=e.length-1,o="",s=e[0];if(i>0){for(o+=s,r=1;r<i;r++)n=e[r]+"",t=E-n.length,t&&(o+=Je(t)),o+=n;s=e[r],n=s+"",t=E-n.length,t&&(o+=Je(t))}else if(s===0)return"0";for(;s%10===0;)s/=10;return o+s}function ie(e,r,t){if(e!==~~e||e<r||e>t)throw Error(He+e)}function lt(e,r,t,n){var i,o,s,a;for(o=e[0];o>=10;o/=10)--r;return--r<0?(r+=E,i=0):(i=Math.ceil((r+1)/E),r%=E),o=U(10,E-r),a=e[i]%o|0,n==null?r<3?(r==0?a=a/100|0:r==1&&(a=a/10|0),s=t<4&&a==99999||t>3&&a==49999||a==5e4||a==0):s=(t<4&&a+1==o||t>3&&a+1==o/2)&&(e[i+1]/o/100|0)==U(10,r-2)-1||(a==o/2||a==0)&&(e[i+1]/o/100|0)==0:r<4?(r==0?a=a/1e3|0:r==1?a=a/100|0:r==2&&(a=a/10|0),s=(n||t<4)&&a==9999||!n&&t>3&&a==4999):s=((n||t<4)&&a+1==o||!n&&t>3&&a+1==o/2)&&(e[i+1]/o/1e3|0)==U(10,r-3)-1,s}function mn(e,r,t){for(var n,i=[0],o,s=0,a=e.length;s<a;){for(o=i.length;o--;)i[o]*=r;for(i[0]+=Ui.indexOf(e.charAt(s++)),n=0;n<i.length;n++)i[n]>t-1&&(i[n+1]===void 0&&(i[n+1]=0),i[n+1]+=i[n]/t|0,i[n]%=t)}return i.reverse()}function Ap(e,r){var t,n,i;if(r.isZero())return r;n=r.d.length,n<32?(t=Math.ceil(n/3),i=(1/wn(4,t)).toString()):(t=16,i="2.3283064365386962890625e-10"),e.precision+=t,r=Pr(e,1,r.times(i),new e(1));for(var o=t;o--;){var s=r.times(r);r=s.times(s).minus(s).times(8).plus(1)}return e.precision-=t,r}var L=function(){function e(n,i,o){var s,a=0,l=n.length;for(n=n.slice();l--;)s=n[l]*i+a,n[l]=s%o|0,a=s/o|0;return a&&n.unshift(a),n}function r(n,i,o,s){var a,l;if(o!=s)l=o>s?1:-1;else for(a=l=0;a<o;a++)if(n[a]!=i[a]){l=n[a]>i[a]?1:-1;break}return l}function t(n,i,o,s){for(var a=0;o--;)n[o]-=a,a=n[o]<i[o]?1:0,n[o]=a*s+n[o]-i[o];for(;!n[0]&&n.length>1;)n.shift()}return function(n,i,o,s,a,l){var u,c,p,d,f,h,g,D,T,S,b,O,me,ae,Jr,j,te,Ae,K,fr,qt=n.constructor,ti=n.s==i.s?1:-1,H=n.d,_=i.d;if(!H||!H[0]||!_||!_[0])return new qt(!n.s||!i.s||(H?_&&H[0]==_[0]:!_)?NaN:H&&H[0]==0||!_?ti*0:ti/0);for(l?(f=1,c=n.e-i.e):(l=fe,f=E,c=X(n.e/f)-X(i.e/f)),K=_.length,te=H.length,T=new qt(ti),S=T.d=[],p=0;_[p]==(H[p]||0);p++);if(_[p]>(H[p]||0)&&c--,o==null?(ae=o=qt.precision,s=qt.rounding):a?ae=o+(n.e-i.e)+1:ae=o,ae<0)S.push(1),h=!0;else{if(ae=ae/f+2|0,p=0,K==1){for(d=0,_=_[0],ae++;(p<te||d)&&ae--;p++)Jr=d*l+(H[p]||0),S[p]=Jr/_|0,d=Jr%_|0;h=d||p<te}else{for(d=l/(_[0]+1)|0,d>1&&(_=e(_,d,l),H=e(H,d,l),K=_.length,te=H.length),j=K,b=H.slice(0,K),O=b.length;O<K;)b[O++]=0;fr=_.slice(),fr.unshift(0),Ae=_[0],_[1]>=l/2&&++Ae;do d=0,u=r(_,b,K,O),u<0?(me=b[0],K!=O&&(me=me*l+(b[1]||0)),d=me/Ae|0,d>1?(d>=l&&(d=l-1),g=e(_,d,l),D=g.length,O=b.length,u=r(g,b,D,O),u==1&&(d--,t(g,K<D?fr:_,D,l))):(d==0&&(u=d=1),g=_.slice()),D=g.length,D<O&&g.unshift(0),t(b,g,O,l),u==-1&&(O=b.length,u=r(_,b,K,O),u<1&&(d++,t(b,K<O?fr:_,O,l))),O=b.length):u===0&&(d++,b=[0]),S[p++]=d,u&&b[0]?b[O++]=H[j]||0:(b=[H[j]],O=1);while((j++<te||b[0]!==void 0)&&ae--);h=b[0]!==void 0}S[0]||S.shift()}if(f==1)T.e=c,Bs=h;else{for(p=1,d=S[0];d>=10;d/=10)p++;T.e=p+c*f-1,y(T,a?o+T.e+1:o,s,h)}return T}}();function y(e,r,t,n){var i,o,s,a,l,u,c,p,d,f=e.constructor;e:if(r!=null){if(p=e.d,!p)return e;for(i=1,a=p[0];a>=10;a/=10)i++;if(o=r-i,o<0)o+=E,s=r,c=p[d=0],l=c/U(10,i-s-1)%10|0;else if(d=Math.ceil((o+1)/E),a=p.length,d>=a)if(n){for(;a++<=d;)p.push(0);c=l=0,i=1,o%=E,s=o-E+1}else break e;else{for(c=a=p[d],i=1;a>=10;a/=10)i++;o%=E,s=o-E+i,l=s<0?0:c/U(10,i-s-1)%10|0}if(n=n||r<0||p[d+1]!==void 0||(s<0?c:c%U(10,i-s-1)),u=t<4?(l||n)&&(t==0||t==(e.s<0?3:2)):l>5||l==5&&(t==4||n||t==6&&(o>0?s>0?c/U(10,i-s):0:p[d-1])%10&1||t==(e.s<0?8:7)),r<1||!p[0])return p.length=0,u?(r-=e.e+1,p[0]=U(10,(E-r%E)%E),e.e=-r||0):p[0]=e.e=0,e;if(o==0?(p.length=d,a=1,d--):(p.length=d+1,a=U(10,E-o),p[d]=s>0?(c/U(10,i-s)%U(10,s)|0)*a:0),u)for(;;)if(d==0){for(o=1,s=p[0];s>=10;s/=10)o++;for(s=p[0]+=a,a=1;s>=10;s/=10)a++;o!=a&&(e.e++,p[0]==fe&&(p[0]=1));break}else{if(p[d]+=a,p[d]!=fe)break;p[d--]=0,a=1}for(o=p.length;p[--o]===0;)p.pop()}return w&&(e.e>f.maxE?(e.d=null,e.e=NaN):e.e<f.minE&&(e.e=0,e.d=[0])),e}function ve(e,r,t){if(!e.isFinite())return Ys(e);var n,i=e.e,o=J(e.d),s=o.length;return r?(t&&(n=t-s)>0?o=o.charAt(0)+"."+o.slice(1)+Je(n):s>1&&(o=o.charAt(0)+"."+o.slice(1)),o=o+(e.e<0?"e":"e+")+e.e):i<0?(o="0."+Je(-i-1)+o,t&&(n=t-s)>0&&(o+=Je(n))):i>=s?(o+=Je(i+1-s),t&&(n=t-i-1)>0&&(o=o+"."+Je(n))):((n=i+1)<s&&(o=o.slice(0,n)+"."+o.slice(n)),t&&(n=t-s)>0&&(i+1===s&&(o+="."),o+=Je(n))),o}function En(e,r){var t=e[0];for(r*=E;t>=10;t/=10)r++;return r}function yn(e,r,t){if(r>Rp)throw w=!0,t&&(e.precision=t),Error(Us);return y(new e(gn),r,1,!0)}function xe(e,r,t){if(r>Qi)throw Error(Us);return y(new e(hn),r,t,!0)}function Js(e){var r=e.length-1,t=r*E+1;if(r=e[r],r){for(;r%10==0;r/=10)t--;for(r=e[0];r>=10;r/=10)t++}return t}function Je(e){for(var r="";e--;)r+="0";return r}function Ks(e,r,t,n){var i,o=new e(1),s=Math.ceil(n/E+4);for(w=!1;;){if(t%2&&(o=o.times(r),Vs(o.d,s)&&(i=!0)),t=X(t/2),t===0){t=o.d.length-1,i&&o.d[t]===0&&++o.d[t];break}r=r.times(r),Vs(r.d,s)}return w=!0,o}function qs(e){return e.d[e.d.length-1]&1}function Hs(e,r,t){for(var n,i,o=new e(r[0]),s=0;++s<r.length;){if(i=new e(r[s]),!i.s){o=i;break}n=o.cmp(i),(n===t||n===0&&o.s===t)&&(o=i)}return o}function Wi(e,r){var t,n,i,o,s,a,l,u=0,c=0,p=0,d=e.constructor,f=d.rounding,h=d.precision;if(!e.d||!e.d[0]||e.e>17)return new d(e.d?e.d[0]?e.s<0?0:1/0:1:e.s?e.s<0?0:e:NaN);for(r==null?(w=!1,l=h):l=r,a=new d(.03125);e.e>-2;)e=e.times(a),p+=5;for(n=Math.log(U(2,p))/Math.LN10*2+5|0,l+=n,t=o=s=new d(1),d.precision=l;;){if(o=y(o.times(e),l,1),t=t.times(++c),a=s.plus(L(o,t,l,1)),J(a.d).slice(0,l)===J(s.d).slice(0,l)){for(i=p;i--;)s=y(s.times(s),l,1);if(r==null)if(u<3&&lt(s.d,l-n,f,u))d.precision=l+=10,t=o=a=new d(1),c=0,u++;else return y(s,d.precision=h,f,w=!0);else return d.precision=h,s}s=a}}function Ke(e,r){var t,n,i,o,s,a,l,u,c,p,d,f=1,h=10,g=e,D=g.d,T=g.constructor,S=T.rounding,b=T.precision;if(g.s<0||!D||!D[0]||!g.e&&D[0]==1&&D.length==1)return new T(D&&!D[0]?-1/0:g.s!=1?NaN:D?0:g);if(r==null?(w=!1,c=b):c=r,T.precision=c+=h,t=J(D),n=t.charAt(0),Math.abs(o=g.e)<15e14){for(;n<7&&n!=1||n==1&&t.charAt(1)>3;)g=g.times(e),t=J(g.d),n=t.charAt(0),f++;o=g.e,n>1?(g=new T("0."+t),o++):g=new T(n+"."+t.slice(1))}else return u=yn(T,c+2,b).times(o+""),g=Ke(new T(n+"."+t.slice(1)),c-h).plus(u),T.precision=b,r==null?y(g,b,S,w=!0):g;for(p=g,l=s=g=L(g.minus(1),g.plus(1),c,1),d=y(g.times(g),c,1),i=3;;){if(s=y(s.times(d),c,1),u=l.plus(L(s,new T(i),c,1)),J(u.d).slice(0,c)===J(l.d).slice(0,c))if(l=l.times(2),o!==0&&(l=l.plus(yn(T,c+2,b).times(o+""))),l=L(l,new T(f),c,1),r==null)if(lt(l.d,c-h,S,a))T.precision=c+=h,u=s=g=L(p.minus(1),p.plus(1),c,1),d=y(g.times(g),c,1),i=a=1;else return y(l,T.precision=b,S,w=!0);else return T.precision=b,l;l=u,i+=2}}function Ys(e){return String(e.s*e.s/0)}function fn(e,r){var t,n,i;for((t=r.indexOf("."))>-1&&(r=r.replace(".","")),(n=r.search(/e/i))>0?(t<0&&(t=n),t+=+r.slice(n+1),r=r.substring(0,n)):t<0&&(t=r.length),n=0;r.charCodeAt(n)===48;n++);for(i=r.length;r.charCodeAt(i-1)===48;--i);if(r=r.slice(n,i),r){if(i-=n,e.e=t=t-n-1,e.d=[],n=(t+1)%E,t<0&&(n+=E),n<i){for(n&&e.d.push(+r.slice(0,n)),i-=E;n<i;)e.d.push(+r.slice(n,n+=E));r=r.slice(n),n=E-r.length}else n-=i;for(;n--;)r+="0";e.d.push(+r),w&&(e.e>e.constructor.maxE?(e.d=null,e.e=NaN):e.e<e.constructor.minE&&(e.e=0,e.d=[0]))}else e.e=0,e.d=[0];return e}function Cp(e,r){var t,n,i,o,s,a,l,u,c;if(r.indexOf("_")>-1){if(r=r.replace(/(\d)_(?=\d)/g,"$1"),Ws.test(r))return fn(e,r)}else if(r==="Infinity"||r==="NaN")return+r||(e.s=NaN),e.e=NaN,e.d=null,e;if(Pp.test(r))t=16,r=r.toLowerCase();else if(vp.test(r))t=2;else if(Tp.test(r))t=8;else throw Error(He+r);for(o=r.search(/p/i),o>0?(l=+r.slice(o+1),r=r.substring(2,o)):r=r.slice(2),o=r.indexOf("."),s=o>=0,n=e.constructor,s&&(r=r.replace(".",""),a=r.length,o=a-o,i=Ks(n,new n(t),o,o*2)),u=mn(r,t,fe),c=u.length-1,o=c;u[o]===0;--o)u.pop();return o<0?new n(e.s*0):(e.e=En(u,c),e.d=u,w=!1,s&&(e=L(e,i,a*4)),l&&(e=e.times(Math.abs(l)<54?U(2,l):Le.pow(2,l))),w=!0,e)}function Ip(e,r){var t,n=r.d.length;if(n<3)return r.isZero()?r:Pr(e,2,r,r);t=1.4*Math.sqrt(n),t=t>16?16:t|0,r=r.times(1/wn(5,t)),r=Pr(e,2,r,r);for(var i,o=new e(5),s=new e(16),a=new e(20);t--;)i=r.times(r),r=r.times(o.plus(i.times(s.times(i).minus(a))));return r}function Pr(e,r,t,n,i){var o,s,a,l,u=1,c=e.precision,p=Math.ceil(c/E);for(w=!1,l=t.times(t),a=new e(n);;){if(s=L(a.times(l),new e(r++*r++),c,1),a=i?n.plus(s):n.minus(s),n=L(s.times(l),new e(r++*r++),c,1),s=a.plus(n),s.d[p]!==void 0){for(o=p;s.d[o]===a.d[o]&&o--;);if(o==-1)break}o=a,a=n,n=s,s=o,u++}return w=!0,s.d.length=p+1,s}function wn(e,r){for(var t=e;--r;)t*=e;return t}function zs(e,r){var t,n=r.s<0,i=xe(e,e.precision,1),o=i.times(.5);if(r=r.abs(),r.lte(o))return Ne=n?4:1,r;if(t=r.divToInt(i),t.isZero())Ne=n?3:2;else{if(r=r.minus(t.times(i)),r.lte(o))return Ne=qs(t)?n?2:3:n?4:1,r;Ne=qs(t)?n?1:4:n?3:2}return r.minus(i).abs()}function Ji(e,r,t,n){var i,o,s,a,l,u,c,p,d,f=e.constructor,h=t!==void 0;if(h?(ie(t,1,Ye),n===void 0?n=f.rounding:ie(n,0,8)):(t=f.precision,n=f.rounding),!e.isFinite())c=Ys(e);else{for(c=ve(e),s=c.indexOf("."),h?(i=2,r==16?t=t*4-3:r==8&&(t=t*3-2)):i=r,s>=0&&(c=c.replace(".",""),d=new f(1),d.e=c.length-s,d.d=mn(ve(d),10,i),d.e=d.d.length),p=mn(c,10,i),o=l=p.length;p[--l]==0;)p.pop();if(!p[0])c=h?"0p+0":"0";else{if(s<0?o--:(e=new f(e),e.d=p,e.e=o,e=L(e,d,t,n,0,i),p=e.d,o=e.e,u=Bs),s=p[t],a=i/2,u=u||p[t+1]!==void 0,u=n<4?(s!==void 0||u)&&(n===0||n===(e.s<0?3:2)):s>a||s===a&&(n===4||u||n===6&&p[t-1]&1||n===(e.s<0?8:7)),p.length=t,u)for(;++p[--t]>i-1;)p[t]=0,t||(++o,p.unshift(1));for(l=p.length;!p[l-1];--l);for(s=0,c="";s<l;s++)c+=Ui.charAt(p[s]);if(h){if(l>1)if(r==16||r==8){for(s=r==16?4:3,--l;l%s;l++)c+="0";for(p=mn(c,i,r),l=p.length;!p[l-1];--l);for(s=1,c="1.";s<l;s++)c+=Ui.charAt(p[s])}else c=c.charAt(0)+"."+c.slice(1);c=c+(o<0?"p":"p+")+o}else if(o<0){for(;++o;)c="0"+c;c="0."+c}else if(++o>l)for(o-=l;o--;)c+="0";else o<l&&(c=c.slice(0,o)+"."+c.slice(o))}c=(r==16?"0x":r==2?"0b":r==8?"0o":"")+c}return e.s<0?"-"+c:c}function Vs(e,r){if(e.length>r)return e.length=r,!0}function Dp(e){return new this(e).abs()}function Op(e){return new this(e).acos()}function kp(e){return new this(e).acosh()}function _p(e,r){return new this(e).plus(r)}function Np(e){return new this(e).asin()}function Lp(e){return new this(e).asinh()}function Fp(e){return new this(e).atan()}function Mp(e){return new this(e).atanh()}function $p(e,r){e=new this(e),r=new this(r);var t,n=this.precision,i=this.rounding,o=n+4;return!e.s||!r.s?t=new this(NaN):!e.d&&!r.d?(t=xe(this,o,1).times(r.s>0?.25:.75),t.s=e.s):!r.d||e.isZero()?(t=r.s<0?xe(this,n,i):new this(0),t.s=e.s):!e.d||r.isZero()?(t=xe(this,o,1).times(.5),t.s=e.s):r.s<0?(this.precision=o,this.rounding=1,t=this.atan(L(e,r,o,1)),r=xe(this,o,1),this.precision=n,this.rounding=i,t=e.s<0?t.minus(r):t.plus(r)):t=this.atan(L(e,r,o,1)),t}function qp(e){return new this(e).cbrt()}function Vp(e){return y(e=new this(e),e.e+1,2)}function jp(e,r,t){return new this(e).clamp(r,t)}function Bp(e){if(!e||typeof e!="object")throw Error(bn+"Object expected");var r,t,n,i=e.defaults===!0,o=["precision",1,Ye,"rounding",0,8,"toExpNeg",-vr,0,"toExpPos",0,vr,"maxE",0,vr,"minE",-vr,0,"modulo",0,9];for(r=0;r<o.length;r+=3)if(t=o[r],i&&(this[t]=Gi[t]),(n=e[t])!==void 0)if(X(n)===n&&n>=o[r+1]&&n<=o[r+2])this[t]=n;else throw Error(He+t+": "+n);if(t="crypto",i&&(this[t]=Gi[t]),(n=e[t])!==void 0)if(n===!0||n===!1||n===0||n===1)if(n)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))this[t]=!0;else throw Error(Gs);else this[t]=!1;else throw Error(He+t+": "+n);return this}function Up(e){return new this(e).cos()}function Gp(e){return new this(e).cosh()}function Zs(e){var r,t,n;function i(o){var s,a,l,u=this;if(!(u instanceof i))return new i(o);if(u.constructor=i,js(o)){u.s=o.s,w?!o.d||o.e>i.maxE?(u.e=NaN,u.d=null):o.e<i.minE?(u.e=0,u.d=[0]):(u.e=o.e,u.d=o.d.slice()):(u.e=o.e,u.d=o.d?o.d.slice():o.d);return}if(l=typeof o,l==="number"){if(o===0){u.s=1/o<0?-1:1,u.e=0,u.d=[0];return}if(o<0?(o=-o,u.s=-1):u.s=1,o===~~o&&o<1e7){for(s=0,a=o;a>=10;a/=10)s++;w?s>i.maxE?(u.e=NaN,u.d=null):s<i.minE?(u.e=0,u.d=[0]):(u.e=s,u.d=[o]):(u.e=s,u.d=[o]);return}if(o*0!==0){o||(u.s=NaN),u.e=NaN,u.d=null;return}return fn(u,o.toString())}if(l==="string")return(a=o.charCodeAt(0))===45?(o=o.slice(1),u.s=-1):(a===43&&(o=o.slice(1)),u.s=1),Ws.test(o)?fn(u,o):Cp(u,o);if(l==="bigint")return o<0?(o=-o,u.s=-1):u.s=1,fn(u,o.toString());throw Error(He+o)}if(i.prototype=m,i.ROUND_UP=0,i.ROUND_DOWN=1,i.ROUND_CEIL=2,i.ROUND_FLOOR=3,i.ROUND_HALF_UP=4,i.ROUND_HALF_DOWN=5,i.ROUND_HALF_EVEN=6,i.ROUND_HALF_CEIL=7,i.ROUND_HALF_FLOOR=8,i.EUCLID=9,i.config=i.set=Bp,i.clone=Zs,i.isDecimal=js,i.abs=Dp,i.acos=Op,i.acosh=kp,i.add=_p,i.asin=Np,i.asinh=Lp,i.atan=Fp,i.atanh=Mp,i.atan2=$p,i.cbrt=qp,i.ceil=Vp,i.clamp=jp,i.cos=Up,i.cosh=Gp,i.div=Qp,i.exp=Wp,i.floor=Jp,i.hypot=Kp,i.ln=Hp,i.log=Yp,i.log10=Zp,i.log2=zp,i.max=Xp,i.min=ed,i.mod=rd,i.mul=td,i.pow=nd,i.random=id,i.round=od,i.sign=sd,i.sin=ad,i.sinh=ld,i.sqrt=ud,i.sub=cd,i.sum=pd,i.tan=dd,i.tanh=md,i.trunc=fd,e===void 0&&(e={}),e&&e.defaults!==!0)for(n=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"],r=0;r<n.length;)e.hasOwnProperty(t=n[r++])||(e[t]=this[t]);return i.config(e),i}function Qp(e,r){return new this(e).div(r)}function Wp(e){return new this(e).exp()}function Jp(e){return y(e=new this(e),e.e+1,3)}function Kp(){var e,r,t=new this(0);for(w=!1,e=0;e<arguments.length;)if(r=new this(arguments[e++]),r.d)t.d&&(t=t.plus(r.times(r)));else{if(r.s)return w=!0,new this(1/0);t=r}return w=!0,t.sqrt()}function js(e){return e instanceof Le||e&&e.toStringTag===Qs||!1}function Hp(e){return new this(e).ln()}function Yp(e,r){return new this(e).log(r)}function zp(e){return new this(e).log(2)}function Zp(e){return new this(e).log(10)}function Xp(){return Hs(this,arguments,-1)}function ed(){return Hs(this,arguments,1)}function rd(e,r){return new this(e).mod(r)}function td(e,r){return new this(e).mul(r)}function nd(e,r){return new this(e).pow(r)}function id(e){var r,t,n,i,o=0,s=new this(1),a=[];if(e===void 0?e=this.precision:ie(e,1,Ye),n=Math.ceil(e/E),this.crypto)if(crypto.getRandomValues)for(r=crypto.getRandomValues(new Uint32Array(n));o<n;)i=r[o],i>=429e7?r[o]=crypto.getRandomValues(new Uint32Array(1))[0]:a[o++]=i%1e7;else if(crypto.randomBytes){for(r=crypto.randomBytes(n*=4);o<n;)i=r[o]+(r[o+1]<<8)+(r[o+2]<<16)+((r[o+3]&127)<<24),i>=214e7?crypto.randomBytes(4).copy(r,o):(a.push(i%1e7),o+=4);o=n/4}else throw Error(Gs);else for(;o<n;)a[o++]=Math.random()*1e7|0;for(n=a[--o],e%=E,n&&e&&(i=U(10,E-e),a[o]=(n/i|0)*i);a[o]===0;o--)a.pop();if(o<0)t=0,a=[0];else{for(t=-1;a[0]===0;t-=E)a.shift();for(n=1,i=a[0];i>=10;i/=10)n++;n<E&&(t-=E-n)}return s.e=t,s.d=a,s}function od(e){return y(e=new this(e),e.e+1,this.rounding)}function sd(e){return e=new this(e),e.d?e.d[0]?e.s:0*e.s:e.s||NaN}function ad(e){return new this(e).sin()}function ld(e){return new this(e).sinh()}function ud(e){return new this(e).sqrt()}function cd(e,r){return new this(e).sub(r)}function pd(){var e=0,r=arguments,t=new this(r[e]);for(w=!1;t.s&&++e<r.length;)t=t.plus(r[e]);return w=!0,y(t,this.precision,this.rounding)}function dd(e){return new this(e).tan()}function md(e){return new this(e).tanh()}function fd(e){return y(e=new this(e),e.e+1,1)}m[Symbol.for("nodejs.util.inspect.custom")]=m.toString;m[Symbol.toStringTag]="Decimal";var Le=m.constructor=Zs(Gi);gn=new Le(gn);hn=new Le(hn);var Fe=Le;function Tr(e){return Le.isDecimal(e)?!0:e!==null&&typeof e=="object"&&typeof e.s=="number"&&typeof e.e=="number"&&typeof e.toFixed=="function"&&Array.isArray(e.d)}var ut={};tr(ut,{ModelAction:()=>Sr,datamodelEnumToSchemaEnum:()=>gd});function gd(e){return{name:e.name,values:e.values.map(r=>r.name)}}var Sr=(b=>(b.findUnique="findUnique",b.findUniqueOrThrow="findUniqueOrThrow",b.findFirst="findFirst",b.findFirstOrThrow="findFirstOrThrow",b.findMany="findMany",b.create="create",b.createMany="createMany",b.createManyAndReturn="createManyAndReturn",b.update="update",b.updateMany="updateMany",b.updateManyAndReturn="updateManyAndReturn",b.upsert="upsert",b.delete="delete",b.deleteMany="deleteMany",b.groupBy="groupBy",b.count="count",b.aggregate="aggregate",b.findRaw="findRaw",b.aggregateRaw="aggregateRaw",b))(Sr||{});var na=A(Di());var ta=A(__webpack_require__(159));var Xs={keyword:De,entity:De,value:e=>W(nr(e)),punctuation:nr,directive:De,function:De,variable:e=>W(nr(e)),string:e=>W(qe(e)),boolean:Ie,number:De,comment:Kr};var hd=e=>e,xn={},yd=0,v={manual:xn.Prism&&xn.Prism.manual,disableWorkerMessageHandler:xn.Prism&&xn.Prism.disableWorkerMessageHandler,util:{encode:function(e){if(e instanceof ge){let r=e;return new ge(r.type,v.util.encode(r.content),r.alias)}else return Array.isArray(e)?e.map(v.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++yd}),e.__id},clone:function e(r,t){let n,i,o=v.util.type(r);switch(t=t||{},o){case"Object":if(i=v.util.objId(r),t[i])return t[i];n={},t[i]=n;for(let s in r)r.hasOwnProperty(s)&&(n[s]=e(r[s],t));return n;case"Array":return i=v.util.objId(r),t[i]?t[i]:(n=[],t[i]=n,r.forEach(function(s,a){n[a]=e(s,t)}),n);default:return r}}},languages:{extend:function(e,r){let t=v.util.clone(v.languages[e]);for(let n in r)t[n]=r[n];return t},insertBefore:function(e,r,t,n){n=n||v.languages;let i=n[e],o={};for(let a in i)if(i.hasOwnProperty(a)){if(a==r)for(let l in t)t.hasOwnProperty(l)&&(o[l]=t[l]);t.hasOwnProperty(a)||(o[a]=i[a])}let s=n[e];return n[e]=o,v.languages.DFS(v.languages,function(a,l){l===s&&a!=e&&(this[a]=o)}),o},DFS:function e(r,t,n,i){i=i||{};let o=v.util.objId;for(let s in r)if(r.hasOwnProperty(s)){t.call(r,s,r[s],n||s);let a=r[s],l=v.util.type(a);l==="Object"&&!i[o(a)]?(i[o(a)]=!0,e(a,t,null,i)):l==="Array"&&!i[o(a)]&&(i[o(a)]=!0,e(a,t,s,i))}}},plugins:{},highlight:function(e,r,t){let n={code:e,grammar:r,language:t};return v.hooks.run("before-tokenize",n),n.tokens=v.tokenize(n.code,n.grammar),v.hooks.run("after-tokenize",n),ge.stringify(v.util.encode(n.tokens),n.language)},matchGrammar:function(e,r,t,n,i,o,s){for(let g in t){if(!t.hasOwnProperty(g)||!t[g])continue;if(g==s)return;let D=t[g];D=v.util.type(D)==="Array"?D:[D];for(let T=0;T<D.length;++T){let S=D[T],b=S.inside,O=!!S.lookbehind,me=!!S.greedy,ae=0,Jr=S.alias;if(me&&!S.pattern.global){let j=S.pattern.toString().match(/[imuy]*$/)[0];S.pattern=RegExp(S.pattern.source,j+"g")}S=S.pattern||S;for(let j=n,te=i;j<r.length;te+=r[j].length,++j){let Ae=r[j];if(r.length>e.length)return;if(Ae instanceof ge)continue;if(me&&j!=r.length-1){S.lastIndex=te;var p=S.exec(e);if(!p)break;var c=p.index+(O?p[1].length:0),d=p.index+p[0].length,a=j,l=te;for(let _=r.length;a<_&&(l<d||!r[a].type&&!r[a-1].greedy);++a)l+=r[a].length,c>=l&&(++j,te=l);if(r[j]instanceof ge)continue;u=a-j,Ae=e.slice(te,l),p.index-=te}else{S.lastIndex=0;var p=S.exec(Ae),u=1}if(!p){if(o)break;continue}O&&(ae=p[1]?p[1].length:0);var c=p.index+ae,p=p[0].slice(ae),d=c+p.length,f=Ae.slice(0,c),h=Ae.slice(d);let K=[j,u];f&&(++j,te+=f.length,K.push(f));let fr=new ge(g,b?v.tokenize(p,b):p,Jr,p,me);if(K.push(fr),h&&K.push(h),Array.prototype.splice.apply(r,K),u!=1&&v.matchGrammar(e,r,t,j,te,!0,g),o)break}}}},tokenize:function(e,r){let t=[e],n=r.rest;if(n){for(let i in n)r[i]=n[i];delete r.rest}return v.matchGrammar(e,t,r,0,0,!1),t},hooks:{all:{},add:function(e,r){let t=v.hooks.all;t[e]=t[e]||[],t[e].push(r)},run:function(e,r){let t=v.hooks.all[e];if(!(!t||!t.length))for(var n=0,i;i=t[n++];)i(r)}},Token:ge};v.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};v.languages.javascript=v.languages.extend("clike",{"class-name":[v.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},{pattern:/(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,function:/[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/});v.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;v.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,lookbehind:!0,inside:v.languages.javascript},{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,inside:v.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,lookbehind:!0,inside:v.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,lookbehind:!0,inside:v.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});v.languages.markup&&v.languages.markup.tag.addInlined("script","javascript");v.languages.js=v.languages.javascript;v.languages.typescript=v.languages.extend("javascript",{keyword:/\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,builtin:/\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/});v.languages.ts=v.languages.typescript;function ge(e,r,t,n,i){this.type=e,this.content=r,this.alias=t,this.length=(n||"").length|0,this.greedy=!!i}ge.stringify=function(e,r){return typeof e=="string"?e:Array.isArray(e)?e.map(function(t){return ge.stringify(t,r)}).join(""):bd(e.type)(e.content)};function bd(e){return Xs[e]||hd}function ea(e){return Ed(e,v.languages.javascript)}function Ed(e,r){return v.tokenize(e,r).map(n=>ge.stringify(n)).join("")}function ra(e){return Ci(e)}var vn=class e{firstLineNumber;lines;static read(r){let t;try{t=ta.default.readFileSync(r,"utf-8")}catch{return null}return e.fromContent(t)}static fromContent(r){let t=r.split(/\r?\n/);return new e(1,t)}constructor(r,t){this.firstLineNumber=r,this.lines=t}get lastLineNumber(){return this.firstLineNumber+this.lines.length-1}mapLineAt(r,t){if(r<this.firstLineNumber||r>this.lines.length+this.firstLineNumber)return this;let n=r-this.firstLineNumber,i=[...this.lines];return i[n]=t(i[n]),new e(this.firstLineNumber,i)}mapLines(r){return new e(this.firstLineNumber,this.lines.map((t,n)=>r(t,this.firstLineNumber+n)))}lineAt(r){return this.lines[r-this.firstLineNumber]}prependSymbolAt(r,t){return this.mapLines((n,i)=>i===r?`${t} ${n}`:`  ${n}`)}slice(r,t){let n=this.lines.slice(r-1,t).join(`
`);return new e(r,ra(n).split(`
`))}highlight(){let r=ea(this.toString());return new e(this.firstLineNumber,r.split(`
`))}toString(){return this.lines.join(`
`)}};var wd={red:ce,gray:Kr,dim:Ce,bold:W,underline:Y,highlightSource:e=>e.highlight()},xd={red:e=>e,gray:e=>e,dim:e=>e,bold:e=>e,underline:e=>e,highlightSource:e=>e};function vd({message:e,originalMethod:r,isPanic:t,callArguments:n}){return{functionName:`prisma.${r}()`,message:e,isPanic:t??!1,callArguments:n}}function Pd({callsite:e,message:r,originalMethod:t,isPanic:n,callArguments:i},o){let s=vd({message:r,originalMethod:t,isPanic:n,callArguments:i});if(!e||typeof window<"u"||process.env.NODE_ENV==="production")return s;let a=e.getLocation();if(!a||!a.lineNumber||!a.columnNumber)return s;let l=Math.max(1,a.lineNumber-3),u=vn.read(a.fileName)?.slice(l,a.lineNumber),c=u?.lineAt(a.lineNumber);if(u&&c){let p=Sd(c),d=Td(c);if(!d)return s;s.functionName=`${d.code})`,s.location=a,n||(u=u.mapLineAt(a.lineNumber,h=>h.slice(0,d.openingBraceIndex))),u=o.highlightSource(u);let f=String(u.lastLineNumber).length;if(s.contextLines=u.mapLines((h,g)=>o.gray(String(g).padStart(f))+" "+h).mapLines(h=>o.dim(h)).prependSymbolAt(a.lineNumber,o.bold(o.red("\u2192"))),i){let h=p+f+1;h+=2,s.callArguments=(0,na.default)(i,h).slice(h)}}return s}function Td(e){let r=Object.keys(Sr).join("|"),n=new RegExp(String.raw`\.(${r})\(`).exec(e);if(n){let i=n.index+n[0].length,o=e.lastIndexOf(" ",n.index)+1;return{code:e.slice(o,i),openingBraceIndex:i}}return null}function Sd(e){let r=0;for(let t=0;t<e.length;t++){if(e.charAt(t)!==" ")return r;r++}return r}function Rd({functionName:e,location:r,message:t,isPanic:n,contextLines:i,callArguments:o},s){let a=[""],l=r?" in":":";if(n?(a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)),a.push(s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${l}`))):a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${l}`)),r&&a.push(s.underline(Ad(r))),i){a.push("");let u=[i.toString()];o&&(u.push(o),u.push(s.dim(")"))),a.push(u.join("")),o&&a.push("")}else a.push(""),o&&a.push(o),a.push("");return a.push(t),a.join(`
`)}function Ad(e){let r=[e.fileName];return e.lineNumber&&r.push(String(e.lineNumber)),e.columnNumber&&r.push(String(e.columnNumber)),r.join(":")}function Pn(e){let r=e.showColors?wd:xd,t;return t=Pd(e,r),Rd(t,r)}var da=A(Ki());function aa(e,r,t){let n=la(e),i=Cd(n),o=Dd(i);o?Tn(o,r,t):r.addErrorMessage(()=>"Unknown error")}function la(e){return e.errors.flatMap(r=>r.kind==="Union"?la(r):[r])}function Cd(e){let r=new Map,t=[];for(let n of e){if(n.kind!=="InvalidArgumentType"){t.push(n);continue}let i=`${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`,o=r.get(i);o?r.set(i,{...n,argument:{...n.argument,typeNames:Id(o.argument.typeNames,n.argument.typeNames)}}):r.set(i,n)}return t.push(...r.values()),t}function Id(e,r){return[...new Set(e.concat(r))]}function Dd(e){return ji(e,(r,t)=>{let n=oa(r),i=oa(t);return n!==i?n-i:sa(r)-sa(t)})}function oa(e){let r=0;return Array.isArray(e.selectionPath)&&(r+=e.selectionPath.length),Array.isArray(e.argumentPath)&&(r+=e.argumentPath.length),r}function sa(e){switch(e.kind){case"InvalidArgumentValue":case"ValueTooLarge":return 20;case"InvalidArgumentType":return 10;case"RequiredArgumentMissing":return-10;default:return 0}}var ue=class{constructor(r,t){this.name=r;this.value=t}isRequired=!1;makeRequired(){return this.isRequired=!0,this}write(r){let{colors:{green:t}}=r.context;r.addMarginSymbol(t(this.isRequired?"+":"?")),r.write(t(this.name)),this.isRequired||r.write(t("?")),r.write(t(": ")),typeof this.value=="string"?r.write(t(this.value)):r.write(this.value)}};ca();var Rr=class{constructor(r=0,t){this.context=t;this.currentIndent=r}lines=[];currentLine="";currentIndent=0;marginSymbol;afterNextNewLineCallback;write(r){return typeof r=="string"?this.currentLine+=r:r.write(this),this}writeJoined(r,t,n=(i,o)=>o.write(i)){let i=t.length-1;for(let o=0;o<t.length;o++)n(t[o],this),o!==i&&this.write(r);return this}writeLine(r){return this.write(r).newLine()}newLine(){this.lines.push(this.indentedCurrentLine()),this.currentLine="",this.marginSymbol=void 0;let r=this.afterNextNewLineCallback;return this.afterNextNewLineCallback=void 0,r?.(),this}withIndent(r){return this.indent(),r(this),this.unindent(),this}afterNextNewline(r){return this.afterNextNewLineCallback=r,this}indent(){return this.currentIndent++,this}unindent(){return this.currentIndent>0&&this.currentIndent--,this}addMarginSymbol(r){return this.marginSymbol=r,this}toString(){return this.lines.concat(this.indentedCurrentLine()).join(`
`)}getCurrentLineLength(){return this.currentLine.length}indentedCurrentLine(){let r=this.currentLine.padStart(this.currentLine.length+2*this.currentIndent);return this.marginSymbol?this.marginSymbol+r.slice(1):r}};ua();var Sn=class{constructor(r){this.value=r}write(r){r.write(this.value)}markAsError(){this.value.markAsError()}};var Rn=e=>e,An={bold:Rn,red:Rn,green:Rn,dim:Rn,enabled:!1},pa={bold:W,red:ce,green:qe,dim:Ce,enabled:!0},Ar={write(e){e.writeLine(",")}};var Pe=class{constructor(r){this.contents=r}isUnderlined=!1;color=r=>r;underline(){return this.isUnderlined=!0,this}setColor(r){return this.color=r,this}write(r){let t=r.getCurrentLineLength();r.write(this.color(this.contents)),this.isUnderlined&&r.afterNextNewline(()=>{r.write(" ".repeat(t)).writeLine(this.color("~".repeat(this.contents.length)))})}};var ze=class{hasError=!1;markAsError(){return this.hasError=!0,this}};var Cr=class extends ze{items=[];addItem(r){return this.items.push(new Sn(r)),this}getField(r){return this.items[r]}getPrintWidth(){return this.items.length===0?2:Math.max(...this.items.map(t=>t.value.getPrintWidth()))+2}write(r){if(this.items.length===0){this.writeEmpty(r);return}this.writeWithItems(r)}writeEmpty(r){let t=new Pe("[]");this.hasError&&t.setColor(r.context.colors.red).underline(),r.write(t)}writeWithItems(r){let{colors:t}=r.context;r.writeLine("[").withIndent(()=>r.writeJoined(Ar,this.items).newLine()).write("]"),this.hasError&&r.afterNextNewline(()=>{r.writeLine(t.red("~".repeat(this.getPrintWidth())))})}asObject(){}};var Ir=class e extends ze{fields={};suggestions=[];addField(r){this.fields[r.name]=r}addSuggestion(r){this.suggestions.push(r)}getField(r){return this.fields[r]}getDeepField(r){let[t,...n]=r,i=this.getField(t);if(!i)return;let o=i;for(let s of n){let a;if(o.value instanceof e?a=o.value.getField(s):o.value instanceof Cr&&(a=o.value.getField(Number(s))),!a)return;o=a}return o}getDeepFieldValue(r){return r.length===0?this:this.getDeepField(r)?.value}hasField(r){return!!this.getField(r)}removeAllFields(){this.fields={}}removeField(r){delete this.fields[r]}getFields(){return this.fields}isEmpty(){return Object.keys(this.fields).length===0}getFieldValue(r){return this.getField(r)?.value}getDeepSubSelectionValue(r){let t=this;for(let n of r){if(!(t instanceof e))return;let i=t.getSubSelectionValue(n);if(!i)return;t=i}return t}getDeepSelectionParent(r){let t=this.getSelectionParent();if(!t)return;let n=t;for(let i of r){let o=n.value.getFieldValue(i);if(!o||!(o instanceof e))return;let s=o.getSelectionParent();if(!s)return;n=s}return n}getSelectionParent(){let r=this.getField("select")?.value.asObject();if(r)return{kind:"select",value:r};let t=this.getField("include")?.value.asObject();if(t)return{kind:"include",value:t}}getSubSelectionValue(r){return this.getSelectionParent()?.value.fields[r].value}getPrintWidth(){let r=Object.values(this.fields);return r.length==0?2:Math.max(...r.map(n=>n.getPrintWidth()))+2}write(r){let t=Object.values(this.fields);if(t.length===0&&this.suggestions.length===0){this.writeEmpty(r);return}this.writeWithContents(r,t)}asObject(){return this}writeEmpty(r){let t=new Pe("{}");this.hasError&&t.setColor(r.context.colors.red).underline(),r.write(t)}writeWithContents(r,t){r.writeLine("{").withIndent(()=>{r.writeJoined(Ar,[...t,...this.suggestions]).newLine()}),r.write("}"),this.hasError&&r.afterNextNewline(()=>{r.writeLine(r.context.colors.red("~".repeat(this.getPrintWidth())))})}};var Q=class extends ze{constructor(t){super();this.text=t}getPrintWidth(){return this.text.length}write(t){let n=new Pe(this.text);this.hasError&&n.underline().setColor(t.context.colors.red),t.write(n)}asObject(){}};var ct=class{fields=[];addField(r,t){return this.fields.push({write(n){let{green:i,dim:o}=n.context.colors;n.write(i(o(`${r}: ${t}`))).addMarginSymbol(i(o("+")))}}),this}write(r){let{colors:{green:t}}=r.context;r.writeLine(t("{")).withIndent(()=>{r.writeJoined(Ar,this.fields).newLine()}).write(t("}")).addMarginSymbol(t("+"))}};function Tn(e,r,t){switch(e.kind){case"MutuallyExclusiveFields":Od(e,r);break;case"IncludeOnScalar":kd(e,r);break;case"EmptySelection":_d(e,r,t);break;case"UnknownSelectionField":Md(e,r);break;case"InvalidSelectionValue":$d(e,r);break;case"UnknownArgument":qd(e,r);break;case"UnknownInputField":Vd(e,r);break;case"RequiredArgumentMissing":jd(e,r);break;case"InvalidArgumentType":Bd(e,r);break;case"InvalidArgumentValue":Ud(e,r);break;case"ValueTooLarge":Gd(e,r);break;case"SomeFieldsMissing":Qd(e,r);break;case"TooManyFieldsGiven":Wd(e,r);break;case"Union":aa(e,r,t);break;default:throw new Error("not implemented: "+e.kind)}}function Od(e,r){let t=r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();t&&(t.getField(e.firstField)?.markAsError(),t.getField(e.secondField)?.markAsError()),r.addErrorMessage(n=>`Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red("not both")} at the same time.`)}function kd(e,r){let[t,n]=Dr(e.selectionPath),i=e.outputType,o=r.arguments.getDeepSelectionParent(t)?.value;if(o&&(o.getField(n)?.markAsError(),i))for(let s of i.fields)s.isRelation&&o.addSuggestion(new ue(s.name,"true"));r.addErrorMessage(s=>{let a=`Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;return i?a+=` on model ${s.bold(i.name)}. ${pt(s)}`:a+=".",a+=`
Note that ${s.bold("include")} statements only accept relation fields.`,a})}function _d(e,r,t){let n=r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();if(n){let i=n.getField("omit")?.value.asObject();if(i){Nd(e,r,i);return}if(n.hasField("select")){Ld(e,r);return}}if(t?.[We(e.outputType.name)]){Fd(e,r);return}r.addErrorMessage(()=>`Unknown field at "${e.selectionPath.join(".")} selection"`)}function Nd(e,r,t){t.removeAllFields();for(let n of e.outputType.fields)t.addSuggestion(new ue(n.name,"false"));r.addErrorMessage(n=>`The ${n.red("omit")} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`)}function Ld(e,r){let t=e.outputType,n=r.arguments.getDeepSelectionParent(e.selectionPath)?.value,i=n?.isEmpty()??!1;n&&(n.removeAllFields(),ga(n,t)),r.addErrorMessage(o=>i?`The ${o.red("`select`")} statement for type ${o.bold(t.name)} must not be empty. ${pt(o)}`:`The ${o.red("`select`")} statement for type ${o.bold(t.name)} needs ${o.bold("at least one truthy value")}.`)}function Fd(e,r){let t=new ct;for(let i of e.outputType.fields)i.isRelation||t.addField(i.name,"false");let n=new ue("omit",t).makeRequired();if(e.selectionPath.length===0)r.arguments.addSuggestion(n);else{let[i,o]=Dr(e.selectionPath),a=r.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);if(a){let l=a?.value.asObject()??new Ir;l.addSuggestion(n),a.value=l}}r.addErrorMessage(i=>`The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e.outputType.name)}. At least one field must be included in the result`)}function Md(e,r){let t=ha(e.selectionPath,r);if(t.parentKind!=="unknown"){t.field.markAsError();let n=t.parent;switch(t.parentKind){case"select":ga(n,e.outputType);break;case"include":Jd(n,e.outputType);break;case"omit":Kd(n,e.outputType);break}}r.addErrorMessage(n=>{let i=[`Unknown field ${n.red(`\`${t.fieldName}\``)}`];return t.parentKind!=="unknown"&&i.push(`for ${n.bold(t.parentKind)} statement`),i.push(`on model ${n.bold(`\`${e.outputType.name}\``)}.`),i.push(pt(n)),i.join(" ")})}function $d(e,r){let t=ha(e.selectionPath,r);t.parentKind!=="unknown"&&t.field.value.markAsError(),r.addErrorMessage(n=>`Invalid value for selection field \`${n.red(t.fieldName)}\`: ${e.underlyingError}`)}function qd(e,r){let t=e.argumentPath[0],n=r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();n&&(n.getField(t)?.markAsError(),Hd(n,e.arguments)),r.addErrorMessage(i=>ma(i,t,e.arguments.map(o=>o.name)))}function Vd(e,r){let[t,n]=Dr(e.argumentPath),i=r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();if(i){i.getDeepField(e.argumentPath)?.markAsError();let o=i.getDeepFieldValue(t)?.asObject();o&&ya(o,e.inputType)}r.addErrorMessage(o=>ma(o,n,e.inputType.fields.map(s=>s.name)))}function ma(e,r,t){let n=[`Unknown argument \`${e.red(r)}\`.`],i=zd(r,t);return i&&n.push(`Did you mean \`${e.green(i)}\`?`),t.length>0&&n.push(pt(e)),n.join(" ")}function jd(e,r){let t;r.addErrorMessage(l=>t?.value instanceof Q&&t.value.text==="null"?`Argument \`${l.green(o)}\` must not be ${l.red("null")}.`:`Argument \`${l.green(o)}\` is missing.`);let n=r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();if(!n)return;let[i,o]=Dr(e.argumentPath),s=new ct,a=n.getDeepFieldValue(i)?.asObject();if(a){if(t=a.getField(o),t&&a.removeField(o),e.inputTypes.length===1&&e.inputTypes[0].kind==="object"){for(let l of e.inputTypes[0].fields)s.addField(l.name,l.typeNames.join(" | "));a.addSuggestion(new ue(o,s).makeRequired())}else{let l=e.inputTypes.map(fa).join(" | ");a.addSuggestion(new ue(o,l).makeRequired())}if(e.dependentArgumentPath){n.getDeepField(e.dependentArgumentPath)?.markAsError();let[,l]=Dr(e.dependentArgumentPath);r.addErrorMessage(u=>`Argument \`${u.green(o)}\` is required because argument \`${u.green(l)}\` was provided.`)}}}function fa(e){return e.kind==="list"?`${fa(e.elementType)}[]`:e.name}function Bd(e,r){let t=e.argument.name,n=r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();n&&n.getDeepFieldValue(e.argumentPath)?.markAsError(),r.addErrorMessage(i=>{let o=Cn("or",e.argument.typeNames.map(s=>i.green(s)));return`Argument \`${i.bold(t)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`})}function Ud(e,r){let t=e.argument.name,n=r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();n&&n.getDeepFieldValue(e.argumentPath)?.markAsError(),r.addErrorMessage(i=>{let o=[`Invalid value for argument \`${i.bold(t)}\``];if(e.underlyingError&&o.push(`: ${e.underlyingError}`),o.push("."),e.argument.typeNames.length>0){let s=Cn("or",e.argument.typeNames.map(a=>i.green(a)));o.push(` Expected ${s}.`)}return o.join("")})}function Gd(e,r){let t=e.argument.name,n=r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(),i;if(n){let s=n.getDeepField(e.argumentPath)?.value;s?.markAsError(),s instanceof Q&&(i=s.text)}r.addErrorMessage(o=>{let s=["Unable to fit value"];return i&&s.push(o.red(i)),s.push(`into a 64-bit signed integer for field \`${o.bold(t)}\``),s.join(" ")})}function Qd(e,r){let t=e.argumentPath[e.argumentPath.length-1],n=r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();if(n){let i=n.getDeepFieldValue(e.argumentPath)?.asObject();i&&ya(i,e.inputType)}r.addErrorMessage(i=>{let o=[`Argument \`${i.bold(t)}\` of type ${i.bold(e.inputType.name)} needs`];return e.constraints.minFieldCount===1?e.constraints.requiredFields?o.push(`${i.green("at least one of")} ${Cn("or",e.constraints.requiredFields.map(s=>`\`${i.bold(s)}\``))} arguments.`):o.push(`${i.green("at least one")} argument.`):o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`),o.push(pt(i)),o.join(" ")})}function Wd(e,r){let t=e.argumentPath[e.argumentPath.length-1],n=r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(),i=[];if(n){let o=n.getDeepFieldValue(e.argumentPath)?.asObject();o&&(o.markAsError(),i=Object.keys(o.getFields()))}r.addErrorMessage(o=>{let s=[`Argument \`${o.bold(t)}\` of type ${o.bold(e.inputType.name)} needs`];return e.constraints.minFieldCount===1&&e.constraints.maxFieldCount==1?s.push(`${o.green("exactly one")} argument,`):e.constraints.maxFieldCount==1?s.push(`${o.green("at most one")} argument,`):s.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`),s.push(`but you provided ${Cn("and",i.map(a=>o.red(a)))}. Please choose`),e.constraints.maxFieldCount===1?s.push("one."):s.push(`${e.constraints.maxFieldCount}.`),s.join(" ")})}function ga(e,r){for(let t of r.fields)e.hasField(t.name)||e.addSuggestion(new ue(t.name,"true"))}function Jd(e,r){for(let t of r.fields)t.isRelation&&!e.hasField(t.name)&&e.addSuggestion(new ue(t.name,"true"))}function Kd(e,r){for(let t of r.fields)!e.hasField(t.name)&&!t.isRelation&&e.addSuggestion(new ue(t.name,"true"))}function Hd(e,r){for(let t of r)e.hasField(t.name)||e.addSuggestion(new ue(t.name,t.typeNames.join(" | ")))}function ha(e,r){let[t,n]=Dr(e),i=r.arguments.getDeepSubSelectionValue(t)?.asObject();if(!i)return{parentKind:"unknown",fieldName:n};let o=i.getFieldValue("select")?.asObject(),s=i.getFieldValue("include")?.asObject(),a=i.getFieldValue("omit")?.asObject(),l=o?.getField(n);return o&&l?{parentKind:"select",parent:o,field:l,fieldName:n}:(l=s?.getField(n),s&&l?{parentKind:"include",field:l,parent:s,fieldName:n}:(l=a?.getField(n),a&&l?{parentKind:"omit",field:l,parent:a,fieldName:n}:{parentKind:"unknown",fieldName:n}))}function ya(e,r){if(r.kind==="object")for(let t of r.fields)e.hasField(t.name)||e.addSuggestion(new ue(t.name,t.typeNames.join(" | ")))}function Dr(e){let r=[...e],t=r.pop();if(!t)throw new Error("unexpected empty path");return[r,t]}function pt({green:e,enabled:r}){return"Available options are "+(r?`listed in ${e("green")}`:"marked with ?")+"."}function Cn(e,r){if(r.length===1)return r[0];let t=[...r],n=t.pop();return`${t.join(", ")} ${e} ${n}`}var Yd=3;function zd(e,r){let t=1/0,n;for(let i of r){let o=(0,da.default)(e,i);o>Yd||o<t&&(t=o,n=i)}return n}var dt=class{modelName;name;typeName;isList;isEnum;constructor(r,t,n,i,o){this.modelName=r,this.name=t,this.typeName=n,this.isList=i,this.isEnum=o}_toGraphQLInputType(){let r=this.isList?"List":"",t=this.isEnum?"Enum":"";return`${r}${t}${this.typeName}FieldRefInput<${this.modelName}>`}};function Or(e){return e instanceof dt}var In=Symbol(),Yi=new WeakMap,Me=class{constructor(r){r===In?Yi.set(this,`Prisma.${this._getName()}`):Yi.set(this,`new Prisma.${this._getNamespace()}.${this._getName()}()`)}_getName(){return this.constructor.name}toString(){return Yi.get(this)}},mt=class extends Me{_getNamespace(){return"NullTypes"}},ft=class extends mt{#e};zi(ft,"DbNull");var gt=class extends mt{#e};zi(gt,"JsonNull");var ht=class extends mt{#e};zi(ht,"AnyNull");var Dn={classes:{DbNull:ft,JsonNull:gt,AnyNull:ht},instances:{DbNull:new ft(In),JsonNull:new gt(In),AnyNull:new ht(In)}};function zi(e,r){Object.defineProperty(e,"name",{value:r,configurable:!0})}var ba=": ",On=class{constructor(r,t){this.name=r;this.value=t}hasError=!1;markAsError(){this.hasError=!0}getPrintWidth(){return this.name.length+this.value.getPrintWidth()+ba.length}write(r){let t=new Pe(this.name);this.hasError&&t.underline().setColor(r.context.colors.red),r.write(t).write(ba).write(this.value)}};var Zi=class{arguments;errorMessages=[];constructor(r){this.arguments=r}write(r){r.write(this.arguments)}addErrorMessage(r){this.errorMessages.push(r)}renderAllMessages(r){return this.errorMessages.map(t=>t(r)).join(`
`)}};function kr(e){return new Zi(Ea(e))}function Ea(e){let r=new Ir;for(let[t,n]of Object.entries(e)){let i=new On(t,wa(n));r.addField(i)}return r}function wa(e){if(typeof e=="string")return new Q(JSON.stringify(e));if(typeof e=="number"||typeof e=="boolean")return new Q(String(e));if(typeof e=="bigint")return new Q(`${e}n`);if(e===null)return new Q("null");if(e===void 0)return new Q("undefined");if(Tr(e))return new Q(`new Prisma.Decimal("${e.toFixed()}")`);if(e instanceof Uint8Array)return Buffer.isBuffer(e)?new Q(`Buffer.alloc(${e.byteLength})`):new Q(`new Uint8Array(${e.byteLength})`);if(e instanceof Date){let r=dn(e)?e.toISOString():"Invalid Date";return new Q(`new Date("${r}")`)}return e instanceof Me?new Q(`Prisma.${e._getName()}`):Or(e)?new Q(`prisma.${We(e.modelName)}.$fields.${e.name}`):Array.isArray(e)?Zd(e):typeof e=="object"?Ea(e):new Q(Object.prototype.toString.call(e))}function Zd(e){let r=new Cr;for(let t of e)r.addItem(wa(t));return r}function kn(e,r){let t=r==="pretty"?pa:An,n=e.renderAllMessages(t),i=new Rr(0,{colors:t}).write(e).toString();return{message:n,args:i}}function _n({args:e,errors:r,errorFormat:t,callsite:n,originalMethod:i,clientVersion:o,globalOmit:s}){let a=kr(e);for(let p of r)Tn(p,a,s);let{message:l,args:u}=kn(a,t),c=Pn({message:l,callsite:n,originalMethod:i,showColors:t==="pretty",callArguments:u});throw new Z(c,{clientVersion:o})}function Te(e){return e.replace(/^./,r=>r.toLowerCase())}function va(e,r,t){let n=Te(t);return!r.result||!(r.result.$allModels||r.result[n])?e:Xd({...e,...xa(r.name,e,r.result.$allModels),...xa(r.name,e,r.result[n])})}function Xd(e){let r=new we,t=(n,i)=>r.getOrCreate(n,()=>i.has(n)?[n]:(i.add(n),e[n]?e[n].needs.flatMap(o=>t(o,i)):[n]));return cn(e,n=>({...n,needs:t(n.name,new Set)}))}function xa(e,r,t){return t?cn(t,({needs:n,compute:i},o)=>({name:o,needs:n?Object.keys(n).filter(s=>n[s]):[],compute:em(r,o,i)})):{}}function em(e,r,t){let n=e?.[r]?.compute;return n?i=>t({...i,[r]:n(i)}):t}function Pa(e,r){if(!r)return e;let t={...e};for(let n of Object.values(r))if(e[n.name])for(let i of n.needs)t[i]=!0;return t}function Ta(e,r){if(!r)return e;let t={...e};for(let n of Object.values(r))if(!e[n.name])for(let i of n.needs)delete t[i];return t}var Nn=class{constructor(r,t){this.extension=r;this.previous=t}computedFieldsCache=new we;modelExtensionsCache=new we;queryCallbacksCache=new we;clientExtensions=at(()=>this.extension.client?{...this.previous?.getAllClientExtensions(),...this.extension.client}:this.previous?.getAllClientExtensions());batchCallbacks=at(()=>{let r=this.previous?.getAllBatchQueryCallbacks()??[],t=this.extension.query?.$__internalBatch;return t?r.concat(t):r});getAllComputedFields(r){return this.computedFieldsCache.getOrCreate(r,()=>va(this.previous?.getAllComputedFields(r),this.extension,r))}getAllClientExtensions(){return this.clientExtensions.get()}getAllModelExtensions(r){return this.modelExtensionsCache.getOrCreate(r,()=>{let t=Te(r);return!this.extension.model||!(this.extension.model[t]||this.extension.model.$allModels)?this.previous?.getAllModelExtensions(r):{...this.previous?.getAllModelExtensions(r),...this.extension.model.$allModels,...this.extension.model[t]}})}getAllQueryCallbacks(r,t){return this.queryCallbacksCache.getOrCreate(`${r}:${t}`,()=>{let n=this.previous?.getAllQueryCallbacks(r,t)??[],i=[],o=this.extension.query;return!o||!(o[r]||o.$allModels||o[t]||o.$allOperations)?n:(o[r]!==void 0&&(o[r][t]!==void 0&&i.push(o[r][t]),o[r].$allOperations!==void 0&&i.push(o[r].$allOperations)),r!=="$none"&&o.$allModels!==void 0&&(o.$allModels[t]!==void 0&&i.push(o.$allModels[t]),o.$allModels.$allOperations!==void 0&&i.push(o.$allModels.$allOperations)),o[t]!==void 0&&i.push(o[t]),o.$allOperations!==void 0&&i.push(o.$allOperations),n.concat(i))})}getAllBatchQueryCallbacks(){return this.batchCallbacks.get()}},_r=class e{constructor(r){this.head=r}static empty(){return new e}static single(r){return new e(new Nn(r))}isEmpty(){return this.head===void 0}append(r){return new e(new Nn(r,this.head))}getAllComputedFields(r){return this.head?.getAllComputedFields(r)}getAllClientExtensions(){return this.head?.getAllClientExtensions()}getAllModelExtensions(r){return this.head?.getAllModelExtensions(r)}getAllQueryCallbacks(r,t){return this.head?.getAllQueryCallbacks(r,t)??[]}getAllBatchQueryCallbacks(){return this.head?.getAllBatchQueryCallbacks()??[]}};var Ln=class{constructor(r){this.name=r}};function Sa(e){return e instanceof Ln}function Ra(e){return new Ln(e)}var Aa=Symbol(),yt=class{constructor(r){if(r!==Aa)throw new Error("Skip instance can not be constructed directly")}ifUndefined(r){return r===void 0?Fn:r}},Fn=new yt(Aa);function Se(e){return e instanceof yt}var rm={findUnique:"findUnique",findUniqueOrThrow:"findUniqueOrThrow",findFirst:"findFirst",findFirstOrThrow:"findFirstOrThrow",findMany:"findMany",count:"aggregate",create:"createOne",createMany:"createMany",createManyAndReturn:"createManyAndReturn",update:"updateOne",updateMany:"updateMany",updateManyAndReturn:"updateManyAndReturn",upsert:"upsertOne",delete:"deleteOne",deleteMany:"deleteMany",executeRaw:"executeRaw",queryRaw:"queryRaw",aggregate:"aggregate",groupBy:"groupBy",runCommandRaw:"runCommandRaw",findRaw:"findRaw",aggregateRaw:"aggregateRaw"},Ca="explicitly `undefined` values are not allowed";function Mn({modelName:e,action:r,args:t,runtimeDataModel:n,extensions:i=_r.empty(),callsite:o,clientMethod:s,errorFormat:a,clientVersion:l,previewFeatures:u,globalOmit:c}){let p=new Xi({runtimeDataModel:n,modelName:e,action:r,rootArgs:t,callsite:o,extensions:i,selectionPath:[],argumentPath:[],originalMethod:s,errorFormat:a,clientVersion:l,previewFeatures:u,globalOmit:c});return{modelName:e,action:rm[r],query:bt(t,p)}}function bt({select:e,include:r,...t}={},n){let i=t.omit;return delete t.omit,{arguments:Da(t,n),selection:tm(e,r,i,n)}}function tm(e,r,t,n){return e?(r?n.throwValidationError({kind:"MutuallyExclusiveFields",firstField:"include",secondField:"select",selectionPath:n.getSelectionPath()}):t&&n.throwValidationError({kind:"MutuallyExclusiveFields",firstField:"omit",secondField:"select",selectionPath:n.getSelectionPath()}),sm(e,n)):nm(n,r,t)}function nm(e,r,t){let n={};return e.modelOrType&&!e.isRawAction()&&(n.$composites=!0,n.$scalars=!0),r&&im(n,r,e),om(n,t,e),n}function im(e,r,t){for(let[n,i]of Object.entries(r)){if(Se(i))continue;let o=t.nestSelection(n);if(eo(i,o),i===!1||i===void 0){e[n]=!1;continue}let s=t.findField(n);if(s&&s.kind!=="object"&&t.throwValidationError({kind:"IncludeOnScalar",selectionPath:t.getSelectionPath().concat(n),outputType:t.getOutputTypeDescription()}),s){e[n]=bt(i===!0?{}:i,o);continue}if(i===!0){e[n]=!0;continue}e[n]=bt(i,o)}}function om(e,r,t){let n=t.getComputedFields(),i={...t.getGlobalOmit(),...r},o=Ta(i,n);for(let[s,a]of Object.entries(o)){if(Se(a))continue;eo(a,t.nestSelection(s));let l=t.findField(s);n?.[s]&&!l||(e[s]=!a)}}function sm(e,r){let t={},n=r.getComputedFields(),i=Pa(e,n);for(let[o,s]of Object.entries(i)){if(Se(s))continue;let a=r.nestSelection(o);eo(s,a);let l=r.findField(o);if(!(n?.[o]&&!l)){if(s===!1||s===void 0||Se(s)){t[o]=!1;continue}if(s===!0){l?.kind==="object"?t[o]=bt({},a):t[o]=!0;continue}t[o]=bt(s,a)}}return t}function Ia(e,r){if(e===null)return null;if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return e;if(typeof e=="bigint")return{$type:"BigInt",value:String(e)};if(xr(e)){if(dn(e))return{$type:"DateTime",value:e.toISOString()};r.throwValidationError({kind:"InvalidArgumentValue",selectionPath:r.getSelectionPath(),argumentPath:r.getArgumentPath(),argument:{name:r.getArgumentName(),typeNames:["Date"]},underlyingError:"Provided Date object is invalid"})}if(Sa(e))return{$type:"Param",value:e.name};if(Or(e))return{$type:"FieldRef",value:{_ref:e.name,_container:e.modelName}};if(Array.isArray(e))return am(e,r);if(ArrayBuffer.isView(e)){let{buffer:t,byteOffset:n,byteLength:i}=e;return{$type:"Bytes",value:Buffer.from(t,n,i).toString("base64")}}if(lm(e))return e.values;if(Tr(e))return{$type:"Decimal",value:e.toFixed()};if(e instanceof Me){if(e!==Dn.instances[e._getName()])throw new Error("Invalid ObjectEnumValue");return{$type:"Enum",value:e._getName()}}if(um(e))return e.toJSON();if(typeof e=="object")return Da(e,r);r.throwValidationError({kind:"InvalidArgumentValue",selectionPath:r.getSelectionPath(),argumentPath:r.getArgumentPath(),argument:{name:r.getArgumentName(),typeNames:[]},underlyingError:`We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it`})}function Da(e,r){if(e.$type)return{$type:"Raw",value:e};let t={};for(let n in e){let i=e[n],o=r.nestArgument(n);Se(i)||(i!==void 0?t[n]=Ia(i,o):r.isPreviewFeatureOn("strictUndefinedChecks")&&r.throwValidationError({kind:"InvalidArgumentValue",argumentPath:o.getArgumentPath(),selectionPath:r.getSelectionPath(),argument:{name:r.getArgumentName(),typeNames:[]},underlyingError:Ca}))}return t}function am(e,r){let t=[];for(let n=0;n<e.length;n++){let i=r.nestArgument(String(n)),o=e[n];if(o===void 0||Se(o)){let s=o===void 0?"undefined":"Prisma.skip";r.throwValidationError({kind:"InvalidArgumentValue",selectionPath:i.getSelectionPath(),argumentPath:i.getArgumentPath(),argument:{name:`${r.getArgumentName()}[${n}]`,typeNames:[]},underlyingError:`Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values`})}t.push(Ia(o,i))}return t}function lm(e){return typeof e=="object"&&e!==null&&e.__prismaRawParameters__===!0}function um(e){return typeof e=="object"&&e!==null&&typeof e.toJSON=="function"}function eo(e,r){e===void 0&&r.isPreviewFeatureOn("strictUndefinedChecks")&&r.throwValidationError({kind:"InvalidSelectionValue",selectionPath:r.getSelectionPath(),underlyingError:Ca})}var Xi=class e{constructor(r){this.params=r;this.params.modelName&&(this.modelOrType=this.params.runtimeDataModel.models[this.params.modelName]??this.params.runtimeDataModel.types[this.params.modelName])}modelOrType;throwValidationError(r){_n({errors:[r],originalMethod:this.params.originalMethod,args:this.params.rootArgs??{},callsite:this.params.callsite,errorFormat:this.params.errorFormat,clientVersion:this.params.clientVersion,globalOmit:this.params.globalOmit})}getSelectionPath(){return this.params.selectionPath}getArgumentPath(){return this.params.argumentPath}getArgumentName(){return this.params.argumentPath[this.params.argumentPath.length-1]}getOutputTypeDescription(){if(!(!this.params.modelName||!this.modelOrType))return{name:this.params.modelName,fields:this.modelOrType.fields.map(r=>({name:r.name,typeName:"boolean",isRelation:r.kind==="object"}))}}isRawAction(){return["executeRaw","queryRaw","runCommandRaw","findRaw","aggregateRaw"].includes(this.params.action)}isPreviewFeatureOn(r){return this.params.previewFeatures.includes(r)}getComputedFields(){if(this.params.modelName)return this.params.extensions.getAllComputedFields(this.params.modelName)}findField(r){return this.modelOrType?.fields.find(t=>t.name===r)}nestSelection(r){let t=this.findField(r),n=t?.kind==="object"?t.type:void 0;return new e({...this.params,modelName:n,selectionPath:this.params.selectionPath.concat(r)})}getGlobalOmit(){return this.params.modelName&&this.shouldApplyGlobalOmit()?this.params.globalOmit?.[We(this.params.modelName)]??{}:{}}shouldApplyGlobalOmit(){switch(this.params.action){case"findFirst":case"findFirstOrThrow":case"findUniqueOrThrow":case"findMany":case"upsert":case"findUnique":case"createManyAndReturn":case"create":case"update":case"updateManyAndReturn":case"delete":return!0;case"executeRaw":case"aggregateRaw":case"runCommandRaw":case"findRaw":case"createMany":case"deleteMany":case"groupBy":case"updateMany":case"count":case"aggregate":case"queryRaw":return!1;default:ar(this.params.action,"Unknown action")}}nestArgument(r){return new e({...this.params,argumentPath:this.params.argumentPath.concat(r)})}};function Oa(e){if(!e._hasPreviewFlag("metrics"))throw new Z("`metrics` preview feature must be enabled in order to access metrics API",{clientVersion:e._clientVersion})}var Nr=class{_client;constructor(r){this._client=r}prometheus(r){return Oa(this._client),this._client._engine.metrics({format:"prometheus",...r})}json(r){return Oa(this._client),this._client._engine.metrics({format:"json",...r})}};function ka(e,r){let t=at(()=>cm(r));Object.defineProperty(e,"dmmf",{get:()=>t.get()})}function cm(e){return{datamodel:{models:ro(e.models),enums:ro(e.enums),types:ro(e.types)}}}function ro(e){return Object.entries(e).map(([r,t])=>({name:r,...t}))}var to=new WeakMap,$n="$$PrismaTypedSql",Et=class{constructor(r,t){to.set(this,{sql:r,values:t}),Object.defineProperty(this,$n,{value:$n})}get sql(){return to.get(this).sql}get values(){return to.get(this).values}};function _a(e){return(...r)=>new Et(e,r)}function qn(e){return e!=null&&e[$n]===$n}var fu=A(Ti());var gu=__webpack_require__(166),hu=__webpack_require__(167),yu=A(__webpack_require__(159)),ri=A(__webpack_require__(160));var oe=class e{constructor(r,t){if(r.length-1!==t.length)throw r.length===0?new TypeError("Expected at least 1 string"):new TypeError(`Expected ${r.length} strings to have ${r.length-1} values`);let n=t.reduce((s,a)=>s+(a instanceof e?a.values.length:1),0);this.values=new Array(n),this.strings=new Array(n+1),this.strings[0]=r[0];let i=0,o=0;for(;i<t.length;){let s=t[i++],a=r[i];if(s instanceof e){this.strings[o]+=s.strings[0];let l=0;for(;l<s.values.length;)this.values[o++]=s.values[l++],this.strings[o]=s.strings[l];this.strings[o]+=a}else this.values[o++]=s,this.strings[o]=a}}get sql(){let r=this.strings.length,t=1,n=this.strings[0];for(;t<r;)n+=`?${this.strings[t++]}`;return n}get statement(){let r=this.strings.length,t=1,n=this.strings[0];for(;t<r;)n+=`:${t}${this.strings[t++]}`;return n}get text(){let r=this.strings.length,t=1,n=this.strings[0];for(;t<r;)n+=`$${t}${this.strings[t++]}`;return n}inspect(){return{sql:this.sql,statement:this.statement,text:this.text,values:this.values}}};function Na(e,r=",",t="",n=""){if(e.length===0)throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");return new oe([t,...Array(e.length-1).fill(r),n],e)}function no(e){return new oe([e],[])}var La=no("");function io(e,...r){return new oe(e,r)}function wt(e){return{getKeys(){return Object.keys(e)},getPropertyValue(r){return e[r]}}}function re(e,r){return{getKeys(){return[e]},getPropertyValue(){return r()}}}function lr(e){let r=new we;return{getKeys(){return e.getKeys()},getPropertyValue(t){return r.getOrCreate(t,()=>e.getPropertyValue(t))},getPropertyDescriptor(t){return e.getPropertyDescriptor?.(t)}}}var Vn={enumerable:!0,configurable:!0,writable:!0};function jn(e){let r=new Set(e);return{getPrototypeOf:()=>Object.prototype,getOwnPropertyDescriptor:()=>Vn,has:(t,n)=>r.has(n),set:(t,n,i)=>r.add(n)&&Reflect.set(t,n,i),ownKeys:()=>[...r]}}var Fa=Symbol.for("nodejs.util.inspect.custom");function he(e,r){let t=pm(r),n=new Set,i=new Proxy(e,{get(o,s){if(n.has(s))return o[s];let a=t.get(s);return a?a.getPropertyValue(s):o[s]},has(o,s){if(n.has(s))return!0;let a=t.get(s);return a?a.has?.(s)??!0:Reflect.has(o,s)},ownKeys(o){let s=Ma(Reflect.ownKeys(o),t),a=Ma(Array.from(t.keys()),t);return[...new Set([...s,...a,...n])]},set(o,s,a){return t.get(s)?.getPropertyDescriptor?.(s)?.writable===!1?!1:(n.add(s),Reflect.set(o,s,a))},getOwnPropertyDescriptor(o,s){let a=Reflect.getOwnPropertyDescriptor(o,s);if(a&&!a.configurable)return a;let l=t.get(s);return l?l.getPropertyDescriptor?{...Vn,...l?.getPropertyDescriptor(s)}:Vn:a},defineProperty(o,s,a){return n.add(s),Reflect.defineProperty(o,s,a)},getPrototypeOf:()=>Object.prototype});return i[Fa]=function(){let o={...this};return delete o[Fa],o},i}function pm(e){let r=new Map;for(let t of e){let n=t.getKeys();for(let i of n)r.set(i,t)}return r}function Ma(e,r){return e.filter(t=>r.get(t)?.has?.(t)??!0)}function Lr(e){return{getKeys(){return e},has(){return!1},getPropertyValue(){}}}function Fr(e,r){return{batch:e,transaction:r?.kind==="batch"?{isolationLevel:r.options.isolationLevel}:void 0}}function $a(e){if(e===void 0)return"";let r=kr(e);return new Rr(0,{colors:An}).write(r).toString()}var dm="P2037";function Mr({error:e,user_facing_error:r},t,n){return r.error_code?new z(mm(r,n),{code:r.error_code,clientVersion:t,meta:r.meta,batchRequestIdx:r.batch_request_idx}):new V(e,{clientVersion:t,batchRequestIdx:r.batch_request_idx})}function mm(e,r){let t=e.message;return(r==="postgresql"||r==="postgres"||r==="mysql")&&e.error_code===dm&&(t+=`
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`),t}var xt="<unknown>";function qa(e){var r=e.split(`
`);return r.reduce(function(t,n){var i=hm(n)||bm(n)||xm(n)||Sm(n)||Pm(n);return i&&t.push(i),t},[])}var fm=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|rsc|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,gm=/\((\S*)(?::(\d+))(?::(\d+))\)/;function hm(e){var r=fm.exec(e);if(!r)return null;var t=r[2]&&r[2].indexOf("native")===0,n=r[2]&&r[2].indexOf("eval")===0,i=gm.exec(r[2]);return n&&i!=null&&(r[2]=i[1],r[3]=i[2],r[4]=i[3]),{file:t?null:r[2],methodName:r[1]||xt,arguments:t?[r[2]]:[],lineNumber:r[3]?+r[3]:null,column:r[4]?+r[4]:null}}var ym=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|rsc|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;function bm(e){var r=ym.exec(e);return r?{file:r[2],methodName:r[1]||xt,arguments:[],lineNumber:+r[3],column:r[4]?+r[4]:null}:null}var Em=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|rsc|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,wm=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i;function xm(e){var r=Em.exec(e);if(!r)return null;var t=r[3]&&r[3].indexOf(" > eval")>-1,n=wm.exec(r[3]);return t&&n!=null&&(r[3]=n[1],r[4]=n[2],r[5]=null),{file:r[3],methodName:r[1]||xt,arguments:r[2]?r[2].split(","):[],lineNumber:r[4]?+r[4]:null,column:r[5]?+r[5]:null}}var vm=/^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;function Pm(e){var r=vm.exec(e);return r?{file:r[3],methodName:r[1]||xt,arguments:[],lineNumber:+r[4],column:r[5]?+r[5]:null}:null}var Tm=/^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;function Sm(e){var r=Tm.exec(e);return r?{file:r[2],methodName:r[1]||xt,arguments:[],lineNumber:+r[3],column:r[4]?+r[4]:null}:null}var oo=class{getLocation(){return null}},so=class{_error;constructor(){this._error=new Error}getLocation(){let r=this._error.stack;if(!r)return null;let n=qa(r).find(i=>{if(!i.file)return!1;let o=Li(i.file);return o!=="<anonymous>"&&!o.includes("@prisma")&&!o.includes("/packages/client/src/runtime/")&&!o.endsWith("/runtime/binary.js")&&!o.endsWith("/runtime/library.js")&&!o.endsWith("/runtime/edge.js")&&!o.endsWith("/runtime/edge-esm.js")&&!o.startsWith("internal/")&&!i.methodName.includes("new ")&&!i.methodName.includes("getCallSite")&&!i.methodName.includes("Proxy.")&&i.methodName.split(".").length<4});return!n||!n.file?null:{fileName:n.file,lineNumber:n.lineNumber,columnNumber:n.column}}};function Ze(e){return e==="minimal"?typeof $EnabledCallSite=="function"&&e!=="minimal"?new $EnabledCallSite:new oo:new so}var Va={_avg:!0,_count:!0,_sum:!0,_min:!0,_max:!0};function $r(e={}){let r=Am(e);return Object.entries(r).reduce((n,[i,o])=>(Va[i]!==void 0?n.select[i]={select:o}:n[i]=o,n),{select:{}})}function Am(e={}){return typeof e._count=="boolean"?{...e,_count:{_all:e._count}}:e}function Bn(e={}){return r=>(typeof e._count=="boolean"&&(r._count=r._count._all),r)}function ja(e,r){let t=Bn(e);return r({action:"aggregate",unpacker:t,argsMapper:$r})(e)}function Cm(e={}){let{select:r,...t}=e;return typeof r=="object"?$r({...t,_count:r}):$r({...t,_count:{_all:!0}})}function Im(e={}){return typeof e.select=="object"?r=>Bn(e)(r)._count:r=>Bn(e)(r)._count._all}function Ba(e,r){return r({action:"count",unpacker:Im(e),argsMapper:Cm})(e)}function Dm(e={}){let r=$r(e);if(Array.isArray(r.by))for(let t of r.by)typeof t=="string"&&(r.select[t]=!0);else typeof r.by=="string"&&(r.select[r.by]=!0);return r}function Om(e={}){return r=>(typeof e?._count=="boolean"&&r.forEach(t=>{t._count=t._count._all}),r)}function Ua(e,r){return r({action:"groupBy",unpacker:Om(e),argsMapper:Dm})(e)}function Ga(e,r,t){if(r==="aggregate")return n=>ja(n,t);if(r==="count")return n=>Ba(n,t);if(r==="groupBy")return n=>Ua(n,t)}function Qa(e,r){let t=r.fields.filter(i=>!i.relationName),n=Ms(t,"name");return new Proxy({},{get(i,o){if(o in i||typeof o=="symbol")return i[o];let s=n[o];if(s)return new dt(e,o,s.type,s.isList,s.kind==="enum")},...jn(Object.keys(n))})}var Wa=e=>Array.isArray(e)?e:e.split("."),ao=(e,r)=>Wa(r).reduce((t,n)=>t&&t[n],e),Ja=(e,r,t)=>Wa(r).reduceRight((n,i,o,s)=>Object.assign({},ao(e,s.slice(0,o)),{[i]:n}),t);function km(e,r){return e===void 0||r===void 0?[]:[...r,"select",e]}function _m(e,r,t){return r===void 0?e??{}:Ja(r,t,e||!0)}function lo(e,r,t,n,i,o){let a=e._runtimeDataModel.models[r].fields.reduce((l,u)=>({...l,[u.name]:u}),{});return l=>{let u=Ze(e._errorFormat),c=km(n,i),p=_m(l,o,c),d=t({dataPath:c,callsite:u})(p),f=Nm(e,r);return new Proxy(d,{get(h,g){if(!f.includes(g))return h[g];let T=[a[g].type,t,g],S=[c,p];return lo(e,...T,...S)},...jn([...f,...Object.getOwnPropertyNames(d)])})}}function Nm(e,r){return e._runtimeDataModel.models[r].fields.filter(t=>t.kind==="object").map(t=>t.name)}var Lm=["findUnique","findUniqueOrThrow","findFirst","findFirstOrThrow","create","update","upsert","delete"],Fm=["aggregate","count","groupBy"];function uo(e,r){let t=e._extensions.getAllModelExtensions(r)??{},n=[Mm(e,r),qm(e,r),wt(t),re("name",()=>r),re("$name",()=>r),re("$parent",()=>e._appliedParent)];return he({},n)}function Mm(e,r){let t=Te(r),n=Object.keys(Sr).concat("count");return{getKeys(){return n},getPropertyValue(i){let o=i,s=a=>l=>{let u=Ze(e._errorFormat);return e._createPrismaPromise(c=>{let p={args:l,dataPath:[],action:o,model:r,clientMethod:`${t}.${i}`,jsModelName:t,transaction:c,callsite:u};return e._request({...p,...a})},{action:o,args:l,model:r})};return Lm.includes(o)?lo(e,r,s):$m(i)?Ga(e,i,s):s({})}}}function $m(e){return Fm.includes(e)}function qm(e,r){return lr(re("fields",()=>{let t=e._runtimeDataModel.models[r];return Qa(r,t)}))}function Ka(e){return e.replace(/^./,r=>r.toUpperCase())}var co=Symbol();function vt(e){let r=[Vm(e),jm(e),re(co,()=>e),re("$parent",()=>e._appliedParent)],t=e._extensions.getAllClientExtensions();return t&&r.push(wt(t)),he(e,r)}function Vm(e){let r=Object.getPrototypeOf(e._originalClient),t=[...new Set(Object.getOwnPropertyNames(r))];return{getKeys(){return t},getPropertyValue(n){return e[n]}}}function jm(e){let r=Object.keys(e._runtimeDataModel.models),t=r.map(Te),n=[...new Set(r.concat(t))];return lr({getKeys(){return n},getPropertyValue(i){let o=Ka(i);if(e._runtimeDataModel.models[o]!==void 0)return uo(e,o);if(e._runtimeDataModel.models[i]!==void 0)return uo(e,i)},getPropertyDescriptor(i){if(!t.includes(i))return{enumerable:!1}}})}function Ha(e){return e[co]?e[co]:e}function Ya(e){if(typeof e=="function")return e(this);if(e.client?.__AccelerateEngine){let t=e.client.__AccelerateEngine;this._originalClient._engine=new t(this._originalClient._accelerateEngineConfig)}let r=Object.create(this._originalClient,{_extensions:{value:this._extensions.append(e)},_appliedParent:{value:this,configurable:!0},$on:{value:void 0}});return vt(r)}function za({result:e,modelName:r,select:t,omit:n,extensions:i}){let o=i.getAllComputedFields(r);if(!o)return e;let s=[],a=[];for(let l of Object.values(o)){if(n){if(n[l.name])continue;let u=l.needs.filter(c=>n[c]);u.length>0&&a.push(Lr(u))}else if(t){if(!t[l.name])continue;let u=l.needs.filter(c=>!t[c]);u.length>0&&a.push(Lr(u))}Bm(e,l.needs)&&s.push(Um(l,he(e,s)))}return s.length>0||a.length>0?he(e,[...s,...a]):e}function Bm(e,r){return r.every(t=>Vi(e,t))}function Um(e,r){return lr(re(e.name,()=>e.compute(r)))}function Un({visitor:e,result:r,args:t,runtimeDataModel:n,modelName:i}){if(Array.isArray(r)){for(let s=0;s<r.length;s++)r[s]=Un({result:r[s],args:t,modelName:i,runtimeDataModel:n,visitor:e});return r}let o=e(r,i,t)??r;return t.include&&Za({includeOrSelect:t.include,result:o,parentModelName:i,runtimeDataModel:n,visitor:e}),t.select&&Za({includeOrSelect:t.select,result:o,parentModelName:i,runtimeDataModel:n,visitor:e}),o}function Za({includeOrSelect:e,result:r,parentModelName:t,runtimeDataModel:n,visitor:i}){for(let[o,s]of Object.entries(e)){if(!s||r[o]==null||Se(s))continue;let l=n.models[t].fields.find(c=>c.name===o);if(!l||l.kind!=="object"||!l.relationName)continue;let u=typeof s=="object"?s:{};r[o]=Un({visitor:i,result:r[o],args:u,modelName:l.type,runtimeDataModel:n})}}function Xa({result:e,modelName:r,args:t,extensions:n,runtimeDataModel:i,globalOmit:o}){return n.isEmpty()||e==null||typeof e!="object"||!i.models[r]?e:Un({result:e,args:t??{},modelName:r,runtimeDataModel:i,visitor:(a,l,u)=>{let c=Te(l);return za({result:a,modelName:c,select:u.select,omit:u.select?void 0:{...o?.[c],...u.omit},extensions:n})}})}var Gm=["$connect","$disconnect","$on","$transaction","$extends"],el=Gm;function rl(e){if(e instanceof oe)return Qm(e);if(qn(e))return Wm(e);if(Array.isArray(e)){let t=[e[0]];for(let n=1;n<e.length;n++)t[n]=Pt(e[n]);return t}let r={};for(let t in e)r[t]=Pt(e[t]);return r}function Qm(e){return new oe(e.strings,e.values)}function Wm(e){return new Et(e.sql,e.values)}function Pt(e){if(typeof e!="object"||e==null||e instanceof Me||Or(e))return e;if(Tr(e))return new Fe(e.toFixed());if(xr(e))return new Date(+e);if(ArrayBuffer.isView(e))return e.slice(0);if(Array.isArray(e)){let r=e.length,t;for(t=Array(r);r--;)t[r]=Pt(e[r]);return t}if(typeof e=="object"){let r={};for(let t in e)t==="__proto__"?Object.defineProperty(r,t,{value:Pt(e[t]),configurable:!0,enumerable:!0,writable:!0}):r[t]=Pt(e[t]);return r}ar(e,"Unknown value")}function nl(e,r,t,n=0){return e._createPrismaPromise(i=>{let o=r.customDataProxyFetch;return"transaction"in r&&i!==void 0&&(r.transaction?.kind==="batch"&&r.transaction.lock.then(),r.transaction=i),n===t.length?e._executeRequest(r):t[n]({model:r.model,operation:r.model?r.action:r.clientMethod,args:rl(r.args??{}),__internalParams:r,query:(s,a=r)=>{let l=a.customDataProxyFetch;return a.customDataProxyFetch=al(o,l),a.args=s,nl(e,a,t,n+1)}})})}function il(e,r){let{jsModelName:t,action:n,clientMethod:i}=r,o=t?n:i;if(e._extensions.isEmpty())return e._executeRequest(r);let s=e._extensions.getAllQueryCallbacks(t??"$none",o);return nl(e,r,s)}function ol(e){return r=>{let t={requests:r},n=r[0].extensions.getAllBatchQueryCallbacks();return n.length?sl(t,n,0,e):e(t)}}function sl(e,r,t,n){if(t===r.length)return n(e);let i=e.customDataProxyFetch,o=e.requests[0].transaction;return r[t]({args:{queries:e.requests.map(s=>({model:s.modelName,operation:s.action,args:s.args})),transaction:o?{isolationLevel:o.kind==="batch"?o.isolationLevel:void 0}:void 0},__internalParams:e,query(s,a=e){let l=a.customDataProxyFetch;return a.customDataProxyFetch=al(i,l),sl(a,r,t+1,n)}})}var tl=e=>e;function al(e=tl,r=tl){return t=>e(r(t))}var ll=N("prisma:client"),ul={Vercel:"vercel","Netlify CI":"netlify"};function cl({postinstall:e,ciName:r,clientVersion:t}){if(ll("checkPlatformCaching:postinstall",e),ll("checkPlatformCaching:ciName",r),e===!0&&r&&r in ul){let n=`Prisma has detected that this project was built on ${r}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${ul[r]}-build`;throw console.error(n),new P(n,t)}}function pl(e,r){return e?e.datasources?e.datasources:e.datasourceUrl?{[r[0]]:{url:e.datasourceUrl}}:{}:{}}var Jm=()=>globalThis.process?.release?.name==="node",Km=()=>!!globalThis.Bun||!!globalThis.process?.versions?.bun,Hm=()=>!!globalThis.Deno,Ym=()=>typeof globalThis.Netlify=="object",zm=()=>typeof globalThis.EdgeRuntime=="object",Zm=()=>globalThis.navigator?.userAgent==="Cloudflare-Workers";function Xm(){return[[Ym,"netlify"],[zm,"edge-light"],[Zm,"workerd"],[Hm,"deno"],[Km,"bun"],[Jm,"node"]].flatMap(t=>t[0]()?[t[1]]:[]).at(0)??""}var ef={node:"Node.js",workerd:"Cloudflare Workers",deno:"Deno and Deno Deploy",netlify:"Netlify Edge Functions","edge-light":"Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)"};function Gn(){let e=Xm();return{id:e,prettyName:ef[e]||e,isEdge:["workerd","deno","netlify","edge-light"].includes(e)}}var hl=A(__webpack_require__(159)),Tt=A(__webpack_require__(160));function Qn(e){let{runtimeBinaryTarget:r}=e;return`Add "${r}" to \`binaryTargets\` in the "schema.prisma" file and run \`prisma generate\` after saving it:

${rf(e)}`}function rf(e){let{generator:r,generatorBinaryTargets:t,runtimeBinaryTarget:n}=e,i={fromEnvVar:null,value:n},o=[...t,i];return ki({...r,binaryTargets:o})}function Xe(e){let{runtimeBinaryTarget:r}=e;return`Prisma Client could not locate the Query Engine for runtime "${r}".`}function er(e){let{searchedLocations:r}=e;return`The following locations have been searched:
${[...new Set(r)].map(i=>`  ${i}`).join(`
`)}`}function dl(e){let{runtimeBinaryTarget:r}=e;return`${Xe(e)}

This happened because \`binaryTargets\` have been pinned, but the actual deployment also required "${r}".
${Qn(e)}

${er(e)}`}function Wn(e){return`We would appreciate if you could take the time to share some information with us.
Please help us by answering a few questions: https://pris.ly/${e}`}function Jn(e){let{errorStack:r}=e;return r?.match(/\/\.next|\/next@|\/next\//)?`

We detected that you are using Next.js, learn how to fix this: https://pris.ly/d/engine-not-found-nextjs.`:""}function ml(e){let{queryEngineName:r}=e;return`${Xe(e)}${Jn(e)}

This is likely caused by a bundler that has not copied "${r}" next to the resulting bundle.
Ensure that "${r}" has been copied next to the bundle or in "${e.expectedLocation}".

${Wn("engine-not-found-bundler-investigation")}

${er(e)}`}function fl(e){let{runtimeBinaryTarget:r,generatorBinaryTargets:t}=e,n=t.find(i=>i.native);return`${Xe(e)}

This happened because Prisma Client was generated for "${n?.value??"unknown"}", but the actual deployment required "${r}".
${Qn(e)}

${er(e)}`}function gl(e){let{queryEngineName:r}=e;return`${Xe(e)}${Jn(e)}

This is likely caused by tooling that has not copied "${r}" to the deployment folder.
Ensure that you ran \`prisma generate\` and that "${r}" has been copied to "${e.expectedLocation}".

${Wn("engine-not-found-tooling-investigation")}

${er(e)}`}var tf=N("prisma:client:engines:resolveEnginePath"),nf=()=>new RegExp("runtime[\\\\/]library\\.m?js$");async function yl(e,r){let t={binary:process.env.PRISMA_QUERY_ENGINE_BINARY,library:process.env.PRISMA_QUERY_ENGINE_LIBRARY}[e]??r.prismaPath;if(t!==void 0)return t;let{enginePath:n,searchedLocations:i}=await of(e,r);if(tf("enginePath",n),n!==void 0&&e==="binary"&&Ri(n),n!==void 0)return r.prismaPath=n;let o=await ir(),s=r.generator?.binaryTargets??[],a=s.some(d=>d.native),l=!s.some(d=>d.value===o),u=__filename.match(nf())===null,c={searchedLocations:i,generatorBinaryTargets:s,generator:r.generator,runtimeBinaryTarget:o,queryEngineName:bl(e,o),expectedLocation:Tt.default.relative(process.cwd(),r.dirname),errorStack:new Error().stack},p;throw a&&l?p=fl(c):l?p=dl(c):u?p=ml(c):p=gl(c),new P(p,r.clientVersion)}async function of(e,r){let t=await ir(),n=[],i=[r.dirname,Tt.default.resolve(__dirname,".."),r.generator?.output?.value??__dirname,Tt.default.resolve(__dirname,"../../../.prisma/client"),"/tmp/prisma-engines",r.cwd];__filename.includes("resolveEnginePath")&&i.push(fs());for(let o of i){let s=bl(e,t),a=Tt.default.join(o,s);if(n.push(o),hl.default.existsSync(a))return{enginePath:a,searchedLocations:n}}return{enginePath:void 0,searchedLocations:n}}function bl(e,r){return e==="library"?Ut(r,"fs"):`query-engine-${r}${r==="windows"?".exe":""}`}var po=A(Ni());function El(e){return e?e.replace(/".*"/g,'"X"').replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g,r=>`${r[0]}5`):""}function wl(e){return e.split(`
`).map(r=>r.replace(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/,"").replace(/\+\d+\s*ms$/,"")).join(`
`)}var xl=A(Ls());function vl({title:e,user:r="prisma",repo:t="prisma",template:n="bug_report.yml",body:i}){return(0,xl.default)({user:r,repo:t,template:n,title:e,body:i})}function Pl({version:e,binaryTarget:r,title:t,description:n,engineVersion:i,database:o,query:s}){let a=Uo(6e3-(s?.length??0)),l=wl((0,po.default)(a)),u=n?`# Description
\`\`\`
${n}
\`\`\``:"",c=(0,po.default)(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${process.version?.padEnd(19)}| 
| OS              | ${r?.padEnd(19)}|
| Prisma Client   | ${e?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o?.padEnd(19)}|

${u}

## Logs
\`\`\`
${l}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s?El(s):""}
\`\`\`
`),p=vl({title:t,body:c});return`${t}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${Y(p)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`}function Tl(e,r){throw new Error(r)}function sf(e){return e!==null&&typeof e=="object"&&typeof e.$type=="string"}function af(e,r){let t={};for(let n of Object.keys(e))t[n]=r(e[n],n);return t}function qr(e){return e===null?e:Array.isArray(e)?e.map(qr):typeof e=="object"?sf(e)?lf(e):e.constructor!==null&&e.constructor.name!=="Object"?e:af(e,qr):e}function lf({$type:e,value:r}){switch(e){case"BigInt":return BigInt(r);case"Bytes":{let{buffer:t,byteOffset:n,byteLength:i}=Buffer.from(r,"base64");return new Uint8Array(t,n,i)}case"DateTime":return new Date(r);case"Decimal":return new Le(r);case"Json":return JSON.parse(r);default:Tl(r,"Unknown tagged value")}}var Sl="6.15.0";function Vr({inlineDatasources:e,overrideDatasources:r,env:t,clientVersion:n}){let i,o=Object.keys(e)[0],s=e[o]?.url,a=r[o]?.url;if(o===void 0?i=void 0:a?i=a:s?.value?i=s.value:s?.fromEnvVar&&(i=t[s.fromEnvVar]),s?.fromEnvVar!==void 0&&i===void 0)throw new P(`error: Environment variable not found: ${s.fromEnvVar}.`,n);if(i===void 0)throw new P("error: Missing URL environment variable, value, or override.",n);return i}var Kn=class extends Error{clientVersion;cause;constructor(r,t){super(r),this.clientVersion=t.clientVersion,this.cause=t.cause}get[Symbol.toStringTag](){return this.name}};var se=class extends Kn{isRetryable;constructor(r,t){super(r,t),this.isRetryable=t.isRetryable??!0}};function R(e,r){return{...e,isRetryable:r}}var ur=class extends se{name="InvalidDatasourceError";code="P6001";constructor(r,t){super(r,R(t,!1))}};x(ur,"InvalidDatasourceError");function Rl(e){let r={clientVersion:e.clientVersion},t=Object.keys(e.inlineDatasources)[0],n=Vr({inlineDatasources:e.inlineDatasources,overrideDatasources:e.overrideDatasources,clientVersion:e.clientVersion,env:{...e.env,...typeof process<"u"?process.env:{}}}),i;try{i=new URL(n)}catch{throw new ur(`Error validating datasource \`${t}\`: the URL must start with the protocol \`prisma://\``,r)}let{protocol:o,searchParams:s}=i;if(o!=="prisma:"&&o!==on)throw new ur(`Error validating datasource \`${t}\`: the URL must start with the protocol \`prisma://\` or \`prisma+postgres://\``,r);let a=s.get("api_key");if(a===null||a.length<1)throw new ur(`Error validating datasource \`${t}\`: the URL must contain a valid API key`,r);let l=Ii(i)?"http:":"https:",u=new URL(i.href.replace(o,l));return{apiKey:a,url:u}}var Al=A(nn()),Hn=class{apiKey;tracingHelper;logLevel;logQueries;engineHash;constructor({apiKey:r,tracingHelper:t,logLevel:n,logQueries:i,engineHash:o}){this.apiKey=r,this.tracingHelper=t,this.logLevel=n,this.logQueries=i,this.engineHash=o}build({traceparent:r,transactionId:t}={}){let n={Accept:"application/json",Authorization:`Bearer ${this.apiKey}`,"Content-Type":"application/json","Prisma-Engine-Hash":this.engineHash,"Prisma-Engine-Version":Al.enginesVersion};this.tracingHelper.isEnabled()&&(n.traceparent=r??this.tracingHelper.getTraceParent()),t&&(n["X-Transaction-Id"]=t);let i=this.#e();return i.length>0&&(n["X-Capture-Telemetry"]=i.join(", ")),n}#e(){let r=[];return this.tracingHelper.isEnabled()&&r.push("tracing"),this.logLevel&&r.push(this.logLevel),this.logQueries&&r.push("query"),r}};function cf(e){return e[0]*1e3+e[1]/1e6}function mo(e){return new Date(cf(e))}var jr=class extends se{name="ForcedRetryError";code="P5001";constructor(r){super("This request must be retried",R(r,!0))}};x(jr,"ForcedRetryError");var cr=class extends se{name="NotImplementedYetError";code="P5004";constructor(r,t){super(r,R(t,!1))}};x(cr,"NotImplementedYetError");var $=class extends se{response;constructor(r,t){super(r,t),this.response=t.response;let n=this.response.headers.get("prisma-request-id");if(n){let i=`(The request id was: ${n})`;this.message=this.message+" "+i}}};var pr=class extends ${name="SchemaMissingError";code="P5005";constructor(r){super("Schema needs to be uploaded",R(r,!0))}};x(pr,"SchemaMissingError");var fo="This request could not be understood by the server",St=class extends ${name="BadRequestError";code="P5000";constructor(r,t,n){super(t||fo,R(r,!1)),n&&(this.code=n)}};x(St,"BadRequestError");var Rt=class extends ${name="HealthcheckTimeoutError";code="P5013";logs;constructor(r,t){super("Engine not started: healthcheck timeout",R(r,!0)),this.logs=t}};x(Rt,"HealthcheckTimeoutError");var At=class extends ${name="EngineStartupError";code="P5014";logs;constructor(r,t,n){super(t,R(r,!0)),this.logs=n}};x(At,"EngineStartupError");var Ct=class extends ${name="EngineVersionNotSupportedError";code="P5012";constructor(r){super("Engine version is not supported",R(r,!1))}};x(Ct,"EngineVersionNotSupportedError");var go="Request timed out",It=class extends ${name="GatewayTimeoutError";code="P5009";constructor(r,t=go){super(t,R(r,!1))}};x(It,"GatewayTimeoutError");var pf="Interactive transaction error",Dt=class extends ${name="InteractiveTransactionError";code="P5015";constructor(r,t=pf){super(t,R(r,!1))}};x(Dt,"InteractiveTransactionError");var df="Request parameters are invalid",Ot=class extends ${name="InvalidRequestError";code="P5011";constructor(r,t=df){super(t,R(r,!1))}};x(Ot,"InvalidRequestError");var ho="Requested resource does not exist",kt=class extends ${name="NotFoundError";code="P5003";constructor(r,t=ho){super(t,R(r,!1))}};x(kt,"NotFoundError");var yo="Unknown server error",Br=class extends ${name="ServerError";code="P5006";logs;constructor(r,t,n){super(t||yo,R(r,!0)),this.logs=n}};x(Br,"ServerError");var bo="Unauthorized, check your connection string",_t=class extends ${name="UnauthorizedError";code="P5007";constructor(r,t=bo){super(t,R(r,!1))}};x(_t,"UnauthorizedError");var Eo="Usage exceeded, retry again later",Nt=class extends ${name="UsageExceededError";code="P5008";constructor(r,t=Eo){super(t,R(r,!0))}};x(Nt,"UsageExceededError");async function mf(e){let r;try{r=await e.text()}catch{return{type:"EmptyError"}}try{let t=JSON.parse(r);if(typeof t=="string")switch(t){case"InternalDataProxyError":return{type:"DataProxyError",body:t};default:return{type:"UnknownTextError",body:t}}if(typeof t=="object"&&t!==null){if("is_panic"in t&&"message"in t&&"error_code"in t)return{type:"QueryEngineError",body:t};if("EngineNotStarted"in t||"InteractiveTransactionMisrouted"in t||"InvalidRequestError"in t){let n=Object.values(t)[0].reason;return typeof n=="string"&&!["SchemaMissing","EngineVersionNotSupported"].includes(n)?{type:"UnknownJsonError",body:t}:{type:"DataProxyError",body:t}}}return{type:"UnknownJsonError",body:t}}catch{return r===""?{type:"EmptyError"}:{type:"UnknownTextError",body:r}}}async function Lt(e,r){if(e.ok)return;let t={clientVersion:r,response:e},n=await mf(e);if(n.type==="QueryEngineError")throw new z(n.body.message,{code:n.body.error_code,clientVersion:r});if(n.type==="DataProxyError"){if(n.body==="InternalDataProxyError")throw new Br(t,"Internal Data Proxy error");if("EngineNotStarted"in n.body){if(n.body.EngineNotStarted.reason==="SchemaMissing")return new pr(t);if(n.body.EngineNotStarted.reason==="EngineVersionNotSupported")throw new Ct(t);if("EngineStartupError"in n.body.EngineNotStarted.reason){let{msg:i,logs:o}=n.body.EngineNotStarted.reason.EngineStartupError;throw new At(t,i,o)}if("KnownEngineStartupError"in n.body.EngineNotStarted.reason){let{msg:i,error_code:o}=n.body.EngineNotStarted.reason.KnownEngineStartupError;throw new P(i,r,o)}if("HealthcheckTimeout"in n.body.EngineNotStarted.reason){let{logs:i}=n.body.EngineNotStarted.reason.HealthcheckTimeout;throw new Rt(t,i)}}if("InteractiveTransactionMisrouted"in n.body){let i={IDParseError:"Could not parse interactive transaction ID",NoQueryEngineFoundError:"Could not find Query Engine for the specified host and transaction ID",TransactionStartError:"Could not start interactive transaction"};throw new Dt(t,i[n.body.InteractiveTransactionMisrouted.reason])}if("InvalidRequestError"in n.body)throw new Ot(t,n.body.InvalidRequestError.reason)}if(e.status===401||e.status===403)throw new _t(t,Ur(bo,n));if(e.status===404)return new kt(t,Ur(ho,n));if(e.status===429)throw new Nt(t,Ur(Eo,n));if(e.status===504)throw new It(t,Ur(go,n));if(e.status>=500)throw new Br(t,Ur(yo,n));if(e.status>=400)throw new St(t,Ur(fo,n))}function Ur(e,r){return r.type==="EmptyError"?e:`${e}: ${JSON.stringify(r)}`}function Cl(e){let r=Math.pow(2,e)*50,t=Math.ceil(Math.random()*r)-Math.ceil(r/2),n=r+t;return new Promise(i=>setTimeout(()=>i(n),n))}var $e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function Il(e){let r=new TextEncoder().encode(e),t="",n=r.byteLength,i=n%3,o=n-i,s,a,l,u,c;for(let p=0;p<o;p=p+3)c=r[p]<<16|r[p+1]<<8|r[p+2],s=(c&16515072)>>18,a=(c&258048)>>12,l=(c&4032)>>6,u=c&63,t+=$e[s]+$e[a]+$e[l]+$e[u];return i==1?(c=r[o],s=(c&252)>>2,a=(c&3)<<4,t+=$e[s]+$e[a]+"=="):i==2&&(c=r[o]<<8|r[o+1],s=(c&64512)>>10,a=(c&1008)>>4,l=(c&15)<<2,t+=$e[s]+$e[a]+$e[l]+"="),t}function Dl(e){if(!!e.generator?.previewFeatures.some(t=>t.toLowerCase().includes("metrics")))throw new P("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate",e.clientVersion)}var Ol={"@prisma/debug":"workspace:*","@prisma/engines-version":"6.15.0-5.85179d7826409ee107a6ba334b5e305ae3fba9fb","@prisma/fetch-engine":"workspace:*","@prisma/get-platform":"workspace:*"};var Ft=class extends se{name="RequestError";code="P5010";constructor(r,t){super(`Cannot fetch data from service:
${r}`,R(t,!0))}};x(Ft,"RequestError");async function dr(e,r,t=n=>n){let{clientVersion:n,...i}=r,o=t(fetch);try{return await o(e,i)}catch(s){let a=s.message??"Unknown error";throw new Ft(a,{clientVersion:n,cause:s})}}var gf=/^[1-9][0-9]*\.[0-9]+\.[0-9]+$/,kl=N("prisma:client:dataproxyEngine");async function hf(e,r){let t=Ol["@prisma/engines-version"],n=r.clientVersion??"unknown";if(process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION||globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION)return process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION||globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;if(e.includes("accelerate")&&n!=="0.0.0"&&n!=="in-memory")return n;let[i,o]=n?.split("-")??[];if(o===void 0&&gf.test(i))return i;if(o!==void 0||n==="0.0.0"||n==="in-memory"){let[s]=t.split("-")??[],[a,l,u]=s.split("."),c=yf(`<=${a}.${l}.${u}`),p=await dr(c,{clientVersion:n});if(!p.ok)throw new Error(`Failed to fetch stable Prisma version, unpkg.com status ${p.status} ${p.statusText}, response body: ${await p.text()||"<empty body>"}`);let d=await p.text();kl("length of body fetched from unpkg.com",d.length);let f;try{f=JSON.parse(d)}catch(h){throw console.error("JSON.parse error: body fetched from unpkg.com: ",d),h}return f.version}throw new cr("Only `major.minor.patch` versions are supported by Accelerate.",{clientVersion:n})}async function _l(e,r){let t=await hf(e,r);return kl("version",t),t}function yf(e){return encodeURI(`https://unpkg.com/prisma@${e}/package.json`)}var Nl=3,Mt=N("prisma:client:dataproxyEngine"),$t=class{name="DataProxyEngine";inlineSchema;inlineSchemaHash;inlineDatasources;config;logEmitter;env;clientVersion;engineHash;tracingHelper;remoteClientVersion;host;headerBuilder;startPromise;protocol;constructor(r){Dl(r),this.config=r,this.env=r.env,this.inlineSchema=Il(r.inlineSchema),this.inlineDatasources=r.inlineDatasources,this.inlineSchemaHash=r.inlineSchemaHash,this.clientVersion=r.clientVersion,this.engineHash=r.engineVersion,this.logEmitter=r.logEmitter,this.tracingHelper=r.tracingHelper}apiKey(){return this.headerBuilder.apiKey}version(){return this.engineHash}async start(){this.startPromise!==void 0&&await this.startPromise,this.startPromise=(async()=>{let{apiKey:r,url:t}=this.getURLAndAPIKey();this.host=t.host,this.protocol=t.protocol,this.headerBuilder=new Hn({apiKey:r,tracingHelper:this.tracingHelper,logLevel:this.config.logLevel??"error",logQueries:this.config.logQueries,engineHash:this.engineHash}),this.remoteClientVersion=await _l(this.host,this.config),Mt("host",this.host),Mt("protocol",this.protocol)})(),await this.startPromise}async stop(){}propagateResponseExtensions(r){r?.logs?.length&&r.logs.forEach(t=>{switch(t.level){case"debug":case"trace":Mt(t);break;case"error":case"warn":case"info":{this.logEmitter.emit(t.level,{timestamp:mo(t.timestamp),message:t.attributes.message??"",target:t.target});break}case"query":{this.logEmitter.emit("query",{query:t.attributes.query??"",timestamp:mo(t.timestamp),duration:t.attributes.duration_ms??0,params:t.attributes.params??"",target:t.target});break}default:t.level}}),r?.traces?.length&&this.tracingHelper.dispatchEngineSpans(r.traces)}onBeforeExit(){throw new Error('"beforeExit" hook is not applicable to the remote query engine')}async url(r){return await this.start(),`${this.protocol}//${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${r}`}async uploadSchema(){let r={name:"schemaUpload",internal:!0};return this.tracingHelper.runInChildSpan(r,async()=>{let t=await dr(await this.url("schema"),{method:"PUT",headers:this.headerBuilder.build(),body:this.inlineSchema,clientVersion:this.clientVersion});t.ok||Mt("schema response status",t.status);let n=await Lt(t,this.clientVersion);if(n)throw this.logEmitter.emit("warn",{message:`Error while uploading schema: ${n.message}`,timestamp:new Date,target:""}),n;this.logEmitter.emit("info",{message:`Schema (re)uploaded (hash: ${this.inlineSchemaHash})`,timestamp:new Date,target:""})})}request(r,{traceparent:t,interactiveTransaction:n,customDataProxyFetch:i}){return this.requestInternal({body:r,traceparent:t,interactiveTransaction:n,customDataProxyFetch:i})}async requestBatch(r,{traceparent:t,transaction:n,customDataProxyFetch:i}){let o=n?.kind==="itx"?n.options:void 0,s=Fr(r,n);return(await this.requestInternal({body:s,customDataProxyFetch:i,interactiveTransaction:o,traceparent:t})).map(l=>(l.extensions&&this.propagateResponseExtensions(l.extensions),"errors"in l?this.convertProtocolErrorsToClientError(l.errors):l))}requestInternal({body:r,traceparent:t,customDataProxyFetch:n,interactiveTransaction:i}){return this.withRetry({actionGerund:"querying",callback:async({logHttpCall:o})=>{let s=i?`${i.payload.endpoint}/graphql`:await this.url("graphql");o(s);let a=await dr(s,{method:"POST",headers:this.headerBuilder.build({traceparent:t,transactionId:i?.id}),body:JSON.stringify(r),clientVersion:this.clientVersion},n);a.ok||Mt("graphql response status",a.status),await this.handleError(await Lt(a,this.clientVersion));let l=await a.json();if(l.extensions&&this.propagateResponseExtensions(l.extensions),"errors"in l)throw this.convertProtocolErrorsToClientError(l.errors);return"batchResult"in l?l.batchResult:l}})}async transaction(r,t,n){let i={start:"starting",commit:"committing",rollback:"rolling back"};return this.withRetry({actionGerund:`${i[r]} transaction`,callback:async({logHttpCall:o})=>{if(r==="start"){let s=JSON.stringify({max_wait:n.maxWait,timeout:n.timeout,isolation_level:n.isolationLevel}),a=await this.url("transaction/start");o(a);let l=await dr(a,{method:"POST",headers:this.headerBuilder.build({traceparent:t.traceparent}),body:s,clientVersion:this.clientVersion});await this.handleError(await Lt(l,this.clientVersion));let u=await l.json(),{extensions:c}=u;c&&this.propagateResponseExtensions(c);let p=u.id,d=u["data-proxy"].endpoint;return{id:p,payload:{endpoint:d}}}else{let s=`${n.payload.endpoint}/${r}`;o(s);let a=await dr(s,{method:"POST",headers:this.headerBuilder.build({traceparent:t.traceparent}),clientVersion:this.clientVersion});await this.handleError(await Lt(a,this.clientVersion));let l=await a.json(),{extensions:u}=l;u&&this.propagateResponseExtensions(u);return}}})}getURLAndAPIKey(){return Rl({clientVersion:this.clientVersion,env:this.env,inlineDatasources:this.inlineDatasources,overrideDatasources:this.config.overrideDatasources})}metrics(){throw new cr("Metrics are not yet supported for Accelerate",{clientVersion:this.clientVersion})}async withRetry(r){for(let t=0;;t++){let n=i=>{this.logEmitter.emit("info",{message:`Calling ${i} (n=${t})`,timestamp:new Date,target:""})};try{return await r.callback({logHttpCall:n})}catch(i){if(!(i instanceof se)||!i.isRetryable)throw i;if(t>=Nl)throw i instanceof jr?i.cause:i;this.logEmitter.emit("warn",{message:`Attempt ${t+1}/${Nl} failed for ${r.actionGerund}: ${i.message??"(unknown)"}`,timestamp:new Date,target:""});let o=await Cl(t);this.logEmitter.emit("warn",{message:`Retrying after ${o}ms`,timestamp:new Date,target:""})}}}async handleError(r){if(r instanceof pr)throw await this.uploadSchema(),new jr({clientVersion:this.clientVersion,cause:r});if(r)throw r}convertProtocolErrorsToClientError(r){return r.length===1?Mr(r[0],this.config.clientVersion,this.config.activeProvider):new V(JSON.stringify(r),{clientVersion:this.config.clientVersion})}applyPendingMigrations(){throw new Error("Method not implemented.")}};function Ll(e){if(e?.kind==="itx")return e.options.id}var xo=A(__webpack_require__(157)),Fl=A(__webpack_require__(160));var wo=Symbol("PrismaLibraryEngineCache");function bf(){let e=globalThis;return e[wo]===void 0&&(e[wo]={}),e[wo]}function Ef(e){let r=bf();if(r[e]!==void 0)return r[e];let t=Fl.default.toNamespacedPath(e),n={exports:{}},i=0;return process.platform!=="win32"&&(i=xo.default.constants.dlopen.RTLD_LAZY|xo.default.constants.dlopen.RTLD_DEEPBIND),process.dlopen(n,t,i),r[e]=n.exports,n.exports}var Ml={async loadLibrary(e){let r=await fi(),t=await yl("library",e);try{return e.tracingHelper.runInChildSpan({name:"loadLibrary",internal:!0},()=>Ef(t))}catch(n){let i=Ai({e:n,platformInfo:r,id:t});throw new P(i,e.clientVersion)}}};var vo,$l={async loadLibrary(e){let{clientVersion:r,adapter:t,engineWasm:n}=e;if(t===void 0)throw new P(`The \`adapter\` option for \`PrismaClient\` is required in this context (${Gn().prettyName})`,r);if(n===void 0)throw new P("WASM engine was unexpectedly `undefined`",r);vo===void 0&&(vo=(async()=>{let o=await n.getRuntime(),s=await n.getQueryEngineWasmModule();if(s==null)throw new P("The loaded wasm module was unexpectedly `undefined` or `null` once loaded",r);let a={"./query_engine_bg.js":o},l=new WebAssembly.Instance(s,a),u=l.exports.__wbindgen_start;return o.__wbg_set_wasm(l.exports),u(),o.QueryEngine})());let i=await vo;return{debugPanic(){return Promise.reject("{}")},dmmf(){return Promise.resolve("{}")},version(){return{commit:"unknown",version:"unknown"}},QueryEngine:i}}};var wf="P2036",Re=N("prisma:client:libraryEngine");function xf(e){return e.item_type==="query"&&"query"in e}function vf(e){return"level"in e?e.level==="error"&&e.message==="PANIC":!1}var ql=[...li,"native"],Pf=0xffffffffffffffffn,Po=1n;function Tf(){let e=Po++;return Po>Pf&&(Po=1n),e}var Gr=class{name="LibraryEngine";engine;libraryInstantiationPromise;libraryStartingPromise;libraryStoppingPromise;libraryStarted;executingQueryPromise;config;QueryEngineConstructor;libraryLoader;library;logEmitter;libQueryEnginePath;binaryTarget;datasourceOverrides;datamodel;logQueries;logLevel;lastQuery;loggerRustPanic;tracingHelper;adapterPromise;versionInfo;constructor(r,t){this.libraryLoader=t??Ml,r.engineWasm!==void 0&&(this.libraryLoader=t??$l),this.config=r,this.libraryStarted=!1,this.logQueries=r.logQueries??!1,this.logLevel=r.logLevel??"error",this.logEmitter=r.logEmitter,this.datamodel=r.inlineSchema,this.tracingHelper=r.tracingHelper,r.enableDebugLogs&&(this.logLevel="debug");let n=Object.keys(r.overrideDatasources)[0],i=r.overrideDatasources[n]?.url;n!==void 0&&i!==void 0&&(this.datasourceOverrides={[n]:i}),this.libraryInstantiationPromise=this.instantiateLibrary()}wrapEngine(r){return{applyPendingMigrations:r.applyPendingMigrations?.bind(r),commitTransaction:this.withRequestId(r.commitTransaction.bind(r)),connect:this.withRequestId(r.connect.bind(r)),disconnect:this.withRequestId(r.disconnect.bind(r)),metrics:r.metrics?.bind(r),query:this.withRequestId(r.query.bind(r)),rollbackTransaction:this.withRequestId(r.rollbackTransaction.bind(r)),sdlSchema:r.sdlSchema?.bind(r),startTransaction:this.withRequestId(r.startTransaction.bind(r)),trace:r.trace.bind(r),free:r.free?.bind(r)}}withRequestId(r){return async(...t)=>{let n=Tf().toString();try{return await r(...t,n)}finally{if(this.tracingHelper.isEnabled()){let i=await this.engine?.trace(n);if(i){let o=JSON.parse(i);this.tracingHelper.dispatchEngineSpans(o.spans)}}}}}async applyPendingMigrations(){throw new Error("Cannot call this method from this type of engine instance")}async transaction(r,t,n){await this.start();let i=await this.adapterPromise,o=JSON.stringify(t),s;if(r==="start"){let l=JSON.stringify({max_wait:n.maxWait,timeout:n.timeout,isolation_level:n.isolationLevel});s=await this.engine?.startTransaction(l,o)}else r==="commit"?s=await this.engine?.commitTransaction(n.id,o):r==="rollback"&&(s=await this.engine?.rollbackTransaction(n.id,o));let a=this.parseEngineResponse(s);if(Sf(a)){let l=this.getExternalAdapterError(a,i?.errorRegistry);throw l?l.error:new z(a.message,{code:a.error_code,clientVersion:this.config.clientVersion,meta:a.meta})}else if(typeof a.message=="string")throw new V(a.message,{clientVersion:this.config.clientVersion});return a}async instantiateLibrary(){if(Re("internalSetup"),this.libraryInstantiationPromise)return this.libraryInstantiationPromise;ai(),this.binaryTarget=await this.getCurrentBinaryTarget(),await this.tracingHelper.runInChildSpan("load_engine",()=>this.loadEngine()),this.version()}async getCurrentBinaryTarget(){{if(this.binaryTarget)return this.binaryTarget;let r=await this.tracingHelper.runInChildSpan("detect_platform",()=>ir());if(!ql.includes(r))throw new P(`Unknown ${ce("PRISMA_QUERY_ENGINE_LIBRARY")} ${ce(W(r))}. Possible binaryTargets: ${qe(ql.join(", "))} or a path to the query engine library.
You may have to run ${qe("prisma generate")} for your changes to take effect.`,this.config.clientVersion);return r}}parseEngineResponse(r){if(!r)throw new V("Response from the Engine was empty",{clientVersion:this.config.clientVersion});try{return JSON.parse(r)}catch{throw new V("Unable to JSON.parse response from engine",{clientVersion:this.config.clientVersion})}}async loadEngine(){if(!this.engine){this.QueryEngineConstructor||(this.library=await this.libraryLoader.loadLibrary(this.config),this.QueryEngineConstructor=this.library.QueryEngine);try{let r=new WeakRef(this);this.adapterPromise||(this.adapterPromise=this.config.adapter?.connect()?.then(rn));let t=await this.adapterPromise;t&&Re("Using driver adapter: %O",t),this.engine=this.wrapEngine(new this.QueryEngineConstructor({datamodel:this.datamodel,env:process.env,logQueries:this.config.logQueries??!1,ignoreEnvVarErrors:!0,datasourceOverrides:this.datasourceOverrides??{},logLevel:this.logLevel,configDir:this.config.cwd,engineProtocol:"json",enableTracing:this.tracingHelper.isEnabled()},n=>{r.deref()?.logger(n)},t))}catch(r){let t=r,n=this.parseInitError(t.message);throw typeof n=="string"?t:new P(n.message,this.config.clientVersion,n.error_code)}}}logger(r){let t=this.parseEngineResponse(r);t&&(t.level=t?.level.toLowerCase()??"unknown",xf(t)?this.logEmitter.emit("query",{timestamp:new Date,query:t.query,params:t.params,duration:Number(t.duration_ms),target:t.module_path}):vf(t)?this.loggerRustPanic=new le(To(this,`${t.message}: ${t.reason} in ${t.file}:${t.line}:${t.column}`),this.config.clientVersion):this.logEmitter.emit(t.level,{timestamp:new Date,message:t.message,target:t.module_path}))}parseInitError(r){try{return JSON.parse(r)}catch{}return r}parseRequestError(r){try{return JSON.parse(r)}catch{}return r}onBeforeExit(){throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.')}async start(){if(this.libraryInstantiationPromise||(this.libraryInstantiationPromise=this.instantiateLibrary()),await this.libraryInstantiationPromise,await this.libraryStoppingPromise,this.libraryStartingPromise)return Re(`library already starting, this.libraryStarted: ${this.libraryStarted}`),this.libraryStartingPromise;if(this.libraryStarted)return;let r=async()=>{Re("library starting");try{let t={traceparent:this.tracingHelper.getTraceParent()};await this.engine?.connect(JSON.stringify(t)),this.libraryStarted=!0,this.adapterPromise||(this.adapterPromise=this.config.adapter?.connect()?.then(rn)),await this.adapterPromise,Re("library started")}catch(t){let n=this.parseInitError(t.message);throw typeof n=="string"?t:new P(n.message,this.config.clientVersion,n.error_code)}finally{this.libraryStartingPromise=void 0}};return this.libraryStartingPromise=this.tracingHelper.runInChildSpan("connect",r),this.libraryStartingPromise}async stop(){if(await this.libraryInstantiationPromise,await this.libraryStartingPromise,await this.executingQueryPromise,this.libraryStoppingPromise)return Re("library is already stopping"),this.libraryStoppingPromise;if(!this.libraryStarted){await(await this.adapterPromise)?.dispose(),this.adapterPromise=void 0;return}let r=async()=>{await new Promise(n=>setImmediate(n)),Re("library stopping");let t={traceparent:this.tracingHelper.getTraceParent()};await this.engine?.disconnect(JSON.stringify(t)),this.engine?.free&&this.engine.free(),this.engine=void 0,this.libraryStarted=!1,this.libraryStoppingPromise=void 0,this.libraryInstantiationPromise=void 0,await(await this.adapterPromise)?.dispose(),this.adapterPromise=void 0,Re("library stopped")};return this.libraryStoppingPromise=this.tracingHelper.runInChildSpan("disconnect",r),this.libraryStoppingPromise}version(){return this.versionInfo=this.library?.version(),this.versionInfo?.version??"unknown"}debugPanic(r){return this.library?.debugPanic(r)}async request(r,{traceparent:t,interactiveTransaction:n}){Re(`sending request, this.libraryStarted: ${this.libraryStarted}`);let i=JSON.stringify({traceparent:t}),o=JSON.stringify(r);try{await this.start();let s=await this.adapterPromise;this.executingQueryPromise=this.engine?.query(o,i,n?.id),this.lastQuery=o;let a=this.parseEngineResponse(await this.executingQueryPromise);if(a.errors)throw a.errors.length===1?this.buildQueryError(a.errors[0],s?.errorRegistry):new V(JSON.stringify(a.errors),{clientVersion:this.config.clientVersion});if(this.loggerRustPanic)throw this.loggerRustPanic;return{data:a}}catch(s){if(s instanceof P)throw s;if(s.code==="GenericFailure"&&s.message?.startsWith("PANIC:"))throw new le(To(this,s.message),this.config.clientVersion);let a=this.parseRequestError(s.message);throw typeof a=="string"?s:new V(`${a.message}
${a.backtrace}`,{clientVersion:this.config.clientVersion})}}async requestBatch(r,{transaction:t,traceparent:n}){Re("requestBatch");let i=Fr(r,t);await this.start();let o=await this.adapterPromise;this.lastQuery=JSON.stringify(i),this.executingQueryPromise=this.engine?.query(this.lastQuery,JSON.stringify({traceparent:n}),Ll(t));let s=await this.executingQueryPromise,a=this.parseEngineResponse(s);if(a.errors)throw a.errors.length===1?this.buildQueryError(a.errors[0],o?.errorRegistry):new V(JSON.stringify(a.errors),{clientVersion:this.config.clientVersion});let{batchResult:l,errors:u}=a;if(Array.isArray(l))return l.map(c=>c.errors&&c.errors.length>0?this.loggerRustPanic??this.buildQueryError(c.errors[0],o?.errorRegistry):{data:c});throw u&&u.length===1?new Error(u[0].error):new Error(JSON.stringify(a))}buildQueryError(r,t){if(r.user_facing_error.is_panic)return new le(To(this,r.user_facing_error.message),this.config.clientVersion);let n=this.getExternalAdapterError(r.user_facing_error,t);return n?n.error:Mr(r,this.config.clientVersion,this.config.activeProvider)}getExternalAdapterError(r,t){if(r.error_code===wf&&t){let n=r.meta?.id;an(typeof n=="number","Malformed external JS error received from the engine");let i=t.consumeError(n);return an(i,"External error with reported id was not registered"),i}}async metrics(r){await this.start();let t=await this.engine.metrics(JSON.stringify(r));return r.format==="prometheus"?t:this.parseEngineResponse(t)}};function Sf(e){return typeof e=="object"&&e!==null&&e.error_code!==void 0}function To(e,r){return Pl({binaryTarget:e.binaryTarget,title:r,version:e.config.clientVersion,engineVersion:e.versionInfo?.commit,database:e.config.activeProvider,query:e.lastQuery})}function Vl({url:e,adapter:r,copyEngine:t,targetBuildType:n}){let i=[],o=[],s=g=>{i.push({_tag:"warning",value:g})},a=g=>{let D=g.join(`
`);o.push({_tag:"error",value:D})},l=!!e?.startsWith("prisma://"),u=sn(e),c=!!r,p=l||u;!c&&t&&p&&s(["recommend--no-engine","In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)"]);let d=p||!t;c&&(d||n==="edge")&&(n==="edge"?a(["Prisma Client was configured to use the `adapter` option but it was imported via its `/edge` endpoint.","Please either remove the `/edge` endpoint or remove the `adapter` from the Prisma Client constructor."]):t?l&&a(["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.","Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."]):a(["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.","Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."]));let f={accelerate:d,ppg:u,driverAdapters:c};function h(g){return g.length>0}return h(o)?{ok:!1,diagnostics:{warnings:i,errors:o},isUsing:f}:{ok:!0,diagnostics:{warnings:i},isUsing:f}}function jl({copyEngine:e=!0},r){let t;try{t=Vr({inlineDatasources:r.inlineDatasources,overrideDatasources:r.overrideDatasources,env:{...r.env,...process.env},clientVersion:r.clientVersion})}catch{}let{ok:n,isUsing:i,diagnostics:o}=Vl({url:t,adapter:r.adapter,copyEngine:e,targetBuildType:"library"});for(let p of o.warnings)st(...p.value);if(!n){let p=o.errors[0];throw new Z(p.value,{clientVersion:r.clientVersion})}let s=Er(r.generator),a=s==="library",l=s==="binary",u=s==="client",c=(i.accelerate||i.ppg)&&!i.driverAdapters;return i.accelerate?new $t(r):(i.driverAdapters,a?new Gr(r):(i.accelerate,new Gr(r)))}function Yn({generator:e}){return e?.previewFeatures??[]}var Bl=e=>({command:e});var Ul=e=>e.strings.reduce((r,t,n)=>`${r}@P${n}${t}`);function Qr(e){try{return Gl(e,"fast")}catch{return Gl(e,"slow")}}function Gl(e,r){return JSON.stringify(e.map(t=>Wl(t,r)))}function Wl(e,r){if(Array.isArray(e))return e.map(t=>Wl(t,r));if(typeof e=="bigint")return{prisma__type:"bigint",prisma__value:e.toString()};if(xr(e))return{prisma__type:"date",prisma__value:e.toJSON()};if(Fe.isDecimal(e))return{prisma__type:"decimal",prisma__value:e.toJSON()};if(Buffer.isBuffer(e))return{prisma__type:"bytes",prisma__value:e.toString("base64")};if(Rf(e))return{prisma__type:"bytes",prisma__value:Buffer.from(e).toString("base64")};if(ArrayBuffer.isView(e)){let{buffer:t,byteOffset:n,byteLength:i}=e;return{prisma__type:"bytes",prisma__value:Buffer.from(t,n,i).toString("base64")}}return typeof e=="object"&&r==="slow"?Jl(e):e}function Rf(e){return e instanceof ArrayBuffer||e instanceof SharedArrayBuffer?!0:typeof e=="object"&&e!==null?e[Symbol.toStringTag]==="ArrayBuffer"||e[Symbol.toStringTag]==="SharedArrayBuffer":!1}function Jl(e){if(typeof e!="object"||e===null)return e;if(typeof e.toJSON=="function")return e.toJSON();if(Array.isArray(e))return e.map(Ql);let r={};for(let t of Object.keys(e))r[t]=Ql(e[t]);return r}function Ql(e){return typeof e=="bigint"?e.toString():Jl(e)}var Af=/^(\s*alter\s)/i,Kl=N("prisma:client");function So(e,r,t,n){if(!(e!=="postgresql"&&e!=="cockroachdb")&&t.length>0&&Af.exec(r))throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`)}var Ro=({clientMethod:e,activeProvider:r})=>t=>{let n="",i;if(qn(t))n=t.sql,i={values:Qr(t.values),__prismaRawParameters__:!0};else if(Array.isArray(t)){let[o,...s]=t;n=o,i={values:Qr(s||[]),__prismaRawParameters__:!0}}else switch(r){case"sqlite":case"mysql":{n=t.sql,i={values:Qr(t.values),__prismaRawParameters__:!0};break}case"cockroachdb":case"postgresql":case"postgres":{n=t.text,i={values:Qr(t.values),__prismaRawParameters__:!0};break}case"sqlserver":{n=Ul(t),i={values:Qr(t.values),__prismaRawParameters__:!0};break}default:throw new Error(`The ${r} provider does not support ${e}`)}return i?.values?Kl(`prisma.${e}(${n}, ${i.values})`):Kl(`prisma.${e}(${n})`),{query:n,parameters:i}},Hl={requestArgsToMiddlewareArgs(e){return[e.strings,...e.values]},middlewareArgsToRequestArgs(e){let[r,...t]=e;return new oe(r,t)}},Yl={requestArgsToMiddlewareArgs(e){return[e]},middlewareArgsToRequestArgs(e){return e[0]}};function Ao(e){return function(t,n){let i,o=(s=e)=>{try{return s===void 0||s?.kind==="itx"?i??=zl(t(s)):zl(t(s))}catch(a){return Promise.reject(a)}};return{get spec(){return n},then(s,a){return o().then(s,a)},catch(s){return o().catch(s)},finally(s){return o().finally(s)},requestTransaction(s){let a=o(s);return a.requestTransaction?a.requestTransaction(s):a},[Symbol.toStringTag]:"PrismaPromise"}}}function zl(e){return typeof e.then=="function"?e:Promise.resolve(e)}var Cf=xi.split(".")[0],If={isEnabled(){return!1},getTraceParent(){return"00-10-10-00"},dispatchEngineSpans(){},getActiveContext(){},runInChildSpan(e,r){return r()}},Co=class{isEnabled(){return this.getGlobalTracingHelper().isEnabled()}getTraceParent(r){return this.getGlobalTracingHelper().getTraceParent(r)}dispatchEngineSpans(r){return this.getGlobalTracingHelper().dispatchEngineSpans(r)}getActiveContext(){return this.getGlobalTracingHelper().getActiveContext()}runInChildSpan(r,t){return this.getGlobalTracingHelper().runInChildSpan(r,t)}getGlobalTracingHelper(){let r=globalThis[`V${Cf}_PRISMA_INSTRUMENTATION`],t=globalThis.PRISMA_INSTRUMENTATION;return r?.helper??t?.helper??If}};function Zl(){return new Co}function Xl(e,r=()=>{}){let t,n=new Promise(i=>t=i);return{then(i){return--e===0&&t(r()),i?.(n)}}}function eu(e){return typeof e=="string"?e:e.reduce((r,t)=>{let n=typeof t=="string"?t:t.level;return n==="query"?r:r&&(t==="info"||r==="info")?"info":n},void 0)}var tu=A(Ni());function zn(e){return typeof e.batchRequestIdx=="number"}function ru(e){if(e.action!=="findUnique"&&e.action!=="findUniqueOrThrow")return;let r=[];return e.modelName&&r.push(e.modelName),e.query.arguments&&r.push(Io(e.query.arguments)),r.push(Io(e.query.selection)),r.join("")}function Io(e){return`(${Object.keys(e).sort().map(t=>{let n=e[t];return typeof n=="object"&&n!==null?`(${t} ${Io(n)})`:t}).join(" ")})`}var Df={aggregate:!1,aggregateRaw:!1,createMany:!0,createManyAndReturn:!0,createOne:!0,deleteMany:!0,deleteOne:!0,executeRaw:!0,findFirst:!1,findFirstOrThrow:!1,findMany:!1,findRaw:!1,findUnique:!1,findUniqueOrThrow:!1,groupBy:!1,queryRaw:!1,runCommandRaw:!0,updateMany:!0,updateManyAndReturn:!0,updateOne:!0,upsertOne:!0};function Do(e){return Df[e]}var Zn=class{constructor(r){this.options=r;this.batches={}}batches;tickActive=!1;request(r){let t=this.options.batchBy(r);return t?(this.batches[t]||(this.batches[t]=[],this.tickActive||(this.tickActive=!0,process.nextTick(()=>{this.dispatchBatches(),this.tickActive=!1}))),new Promise((n,i)=>{this.batches[t].push({request:r,resolve:n,reject:i})})):this.options.singleLoader(r)}dispatchBatches(){for(let r in this.batches){let t=this.batches[r];delete this.batches[r],t.length===1?this.options.singleLoader(t[0].request).then(n=>{n instanceof Error?t[0].reject(n):t[0].resolve(n)}).catch(n=>{t[0].reject(n)}):(t.sort((n,i)=>this.options.batchOrder(n.request,i.request)),this.options.batchLoader(t.map(n=>n.request)).then(n=>{if(n instanceof Error)for(let i=0;i<t.length;i++)t[i].reject(n);else for(let i=0;i<t.length;i++){let o=n[i];o instanceof Error?t[i].reject(o):t[i].resolve(o)}}).catch(n=>{for(let i=0;i<t.length;i++)t[i].reject(n)}))}}get[Symbol.toStringTag](){return"DataLoader"}};function mr(e,r){if(r===null)return r;switch(e){case"bigint":return BigInt(r);case"bytes":{let{buffer:t,byteOffset:n,byteLength:i}=Buffer.from(r,"base64");return new Uint8Array(t,n,i)}case"decimal":return new Fe(r);case"datetime":case"date":return new Date(r);case"time":return new Date(`1970-01-01T${r}Z`);case"bigint-array":return r.map(t=>mr("bigint",t));case"bytes-array":return r.map(t=>mr("bytes",t));case"decimal-array":return r.map(t=>mr("decimal",t));case"datetime-array":return r.map(t=>mr("datetime",t));case"date-array":return r.map(t=>mr("date",t));case"time-array":return r.map(t=>mr("time",t));default:return r}}function Xn(e){let r=[],t=Of(e);for(let n=0;n<e.rows.length;n++){let i=e.rows[n],o={...t};for(let s=0;s<i.length;s++)o[e.columns[s]]=mr(e.types[s],i[s]);r.push(o)}return r}function Of(e){let r={};for(let t=0;t<e.columns.length;t++)r[e.columns[t]]=null;return r}var kf=N("prisma:client:request_handler"),ei=class{client;dataloader;logEmitter;constructor(r,t){this.logEmitter=t,this.client=r,this.dataloader=new Zn({batchLoader:ol(async({requests:n,customDataProxyFetch:i})=>{let{transaction:o,otelParentCtx:s}=n[0],a=n.map(p=>p.protocolQuery),l=this.client._tracingHelper.getTraceParent(s),u=n.some(p=>Do(p.protocolQuery.action));return(await this.client._engine.requestBatch(a,{traceparent:l,transaction:_f(o),containsWrite:u,customDataProxyFetch:i})).map((p,d)=>{if(p instanceof Error)return p;try{return this.mapQueryEngineResult(n[d],p)}catch(f){return f}})}),singleLoader:async n=>{let i=n.transaction?.kind==="itx"?nu(n.transaction):void 0,o=await this.client._engine.request(n.protocolQuery,{traceparent:this.client._tracingHelper.getTraceParent(),interactiveTransaction:i,isWrite:Do(n.protocolQuery.action),customDataProxyFetch:n.customDataProxyFetch});return this.mapQueryEngineResult(n,o)},batchBy:n=>n.transaction?.id?`transaction-${n.transaction.id}`:ru(n.protocolQuery),batchOrder(n,i){return n.transaction?.kind==="batch"&&i.transaction?.kind==="batch"?n.transaction.index-i.transaction.index:0}})}async request(r){try{return await this.dataloader.request(r)}catch(t){let{clientMethod:n,callsite:i,transaction:o,args:s,modelName:a}=r;this.handleAndLogRequestError({error:t,clientMethod:n,callsite:i,transaction:o,args:s,modelName:a,globalOmit:r.globalOmit})}}mapQueryEngineResult({dataPath:r,unpacker:t},n){let i=n?.data,o=this.unpack(i,r,t);return process.env.PRISMA_CLIENT_GET_TIME?{data:o}:o}handleAndLogRequestError(r){try{this.handleRequestError(r)}catch(t){throw this.logEmitter&&this.logEmitter.emit("error",{message:t.message,target:r.clientMethod,timestamp:new Date}),t}}handleRequestError({error:r,clientMethod:t,callsite:n,transaction:i,args:o,modelName:s,globalOmit:a}){if(kf(r),Nf(r,i))throw r;if(r instanceof z&&Lf(r)){let u=iu(r.meta);_n({args:o,errors:[u],callsite:n,errorFormat:this.client._errorFormat,originalMethod:t,clientVersion:this.client._clientVersion,globalOmit:a})}let l=r.message;if(n&&(l=Pn({callsite:n,originalMethod:t,isPanic:r.isPanic,showColors:this.client._errorFormat==="pretty",message:l})),l=this.sanitizeMessage(l),r.code){let u=s?{modelName:s,...r.meta}:r.meta;throw new z(l,{code:r.code,clientVersion:this.client._clientVersion,meta:u,batchRequestIdx:r.batchRequestIdx})}else{if(r.isPanic)throw new le(l,this.client._clientVersion);if(r instanceof V)throw new V(l,{clientVersion:this.client._clientVersion,batchRequestIdx:r.batchRequestIdx});if(r instanceof P)throw new P(l,this.client._clientVersion);if(r instanceof le)throw new le(l,this.client._clientVersion)}throw r.clientVersion=this.client._clientVersion,r}sanitizeMessage(r){return this.client._errorFormat&&this.client._errorFormat!=="pretty"?(0,tu.default)(r):r}unpack(r,t,n){if(!r||(r.data&&(r=r.data),!r))return r;let i=Object.keys(r)[0],o=Object.values(r)[0],s=t.filter(u=>u!=="select"&&u!=="include"),a=ao(o,s),l=i==="queryRaw"?Xn(a):qr(a);return n?n(l):l}get[Symbol.toStringTag](){return"RequestHandler"}};function _f(e){if(e){if(e.kind==="batch")return{kind:"batch",options:{isolationLevel:e.isolationLevel}};if(e.kind==="itx")return{kind:"itx",options:nu(e)};ar(e,"Unknown transaction kind")}}function nu(e){return{id:e.id,payload:e.payload}}function Nf(e,r){return zn(e)&&r?.kind==="batch"&&e.batchRequestIdx!==r.index}function Lf(e){return e.code==="P2009"||e.code==="P2012"}function iu(e){if(e.kind==="Union")return{kind:"Union",errors:e.errors.map(iu)};if(Array.isArray(e.selectionPath)){let[,...r]=e.selectionPath;return{...e,selectionPath:r}}return e}var ou=Sl;var cu=A(Ki());var k=class extends Error{constructor(r){super(r+`
Read more at https://pris.ly/d/client-constructor`),this.name="PrismaClientConstructorValidationError"}get[Symbol.toStringTag](){return"PrismaClientConstructorValidationError"}};x(k,"PrismaClientConstructorValidationError");var su=["datasources","datasourceUrl","errorFormat","adapter","log","transactionOptions","omit","__internal"],au=["pretty","colorless","minimal"],lu=["info","query","warn","error"],Ff={datasources:(e,{datasourceNames:r})=>{if(e){if(typeof e!="object"||Array.isArray(e))throw new k(`Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`);for(let[t,n]of Object.entries(e)){if(!r.includes(t)){let i=Wr(t,r)||` Available datasources: ${r.join(", ")}`;throw new k(`Unknown datasource ${t} provided to PrismaClient constructor.${i}`)}if(typeof n!="object"||Array.isArray(n))throw new k(`Invalid value ${JSON.stringify(e)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);if(n&&typeof n=="object")for(let[i,o]of Object.entries(n)){if(i!=="url")throw new k(`Invalid value ${JSON.stringify(e)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);if(typeof o!="string")throw new k(`Invalid value ${JSON.stringify(o)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`)}}}},adapter:(e,r)=>{if(!e&&Er(r.generator)==="client")throw new k('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');if(e===null)return;if(e===void 0)throw new k('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');if(!Yn(r).includes("driverAdapters"))throw new k('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');if(Er(r.generator)==="binary")throw new k('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.')},datasourceUrl:e=>{if(typeof e<"u"&&typeof e!="string")throw new k(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`)},errorFormat:e=>{if(e){if(typeof e!="string")throw new k(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);if(!au.includes(e)){let r=Wr(e,au);throw new k(`Invalid errorFormat ${e} provided to PrismaClient constructor.${r}`)}}},log:e=>{if(!e)return;if(!Array.isArray(e))throw new k(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);function r(t){if(typeof t=="string"&&!lu.includes(t)){let n=Wr(t,lu);throw new k(`Invalid log level "${t}" provided to PrismaClient constructor.${n}`)}}for(let t of e){r(t);let n={level:r,emit:i=>{let o=["stdout","event"];if(!o.includes(i)){let s=Wr(i,o);throw new k(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`)}}};if(t&&typeof t=="object")for(let[i,o]of Object.entries(t))if(n[i])n[i](o);else throw new k(`Invalid property ${i} for "log" provided to PrismaClient constructor`)}},transactionOptions:e=>{if(!e)return;let r=e.maxWait;if(r!=null&&r<=0)throw new k(`Invalid value ${r} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);let t=e.timeout;if(t!=null&&t<=0)throw new k(`Invalid value ${t} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`)},omit:(e,r)=>{if(typeof e!="object")throw new k('"omit" option is expected to be an object.');if(e===null)throw new k('"omit" option can not be `null`');let t=[];for(let[n,i]of Object.entries(e)){let o=$f(n,r.runtimeDataModel);if(!o){t.push({kind:"UnknownModel",modelKey:n});continue}for(let[s,a]of Object.entries(i)){let l=o.fields.find(u=>u.name===s);if(!l){t.push({kind:"UnknownField",modelKey:n,fieldName:s});continue}if(l.relationName){t.push({kind:"RelationInOmit",modelKey:n,fieldName:s});continue}typeof a!="boolean"&&t.push({kind:"InvalidFieldValue",modelKey:n,fieldName:s})}}if(t.length>0)throw new k(qf(e,t))},__internal:e=>{if(!e)return;let r=["debug","engine","configOverride"];if(typeof e!="object")throw new k(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);for(let[t]of Object.entries(e))if(!r.includes(t)){let n=Wr(t,r);throw new k(`Invalid property ${JSON.stringify(t)} for "__internal" provided to PrismaClient constructor.${n}`)}}};function pu(e,r){for(let[t,n]of Object.entries(e)){if(!su.includes(t)){let i=Wr(t,su);throw new k(`Unknown property ${t} provided to PrismaClient constructor.${i}`)}Ff[t](n,r)}if(e.datasourceUrl&&e.datasources)throw new k('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them')}function Wr(e,r){if(r.length===0||typeof e!="string")return"";let t=Mf(e,r);return t?` Did you mean "${t}"?`:""}function Mf(e,r){if(r.length===0)return null;let t=r.map(i=>({value:i,distance:(0,cu.default)(e,i)}));t.sort((i,o)=>i.distance<o.distance?-1:1);let n=t[0];return n.distance<3?n.value:null}function $f(e,r){return uu(r.models,e)??uu(r.types,e)}function uu(e,r){let t=Object.keys(e).find(n=>We(n)===r);if(t)return e[t]}function qf(e,r){let t=kr(e);for(let o of r)switch(o.kind){case"UnknownModel":t.arguments.getField(o.modelKey)?.markAsError(),t.addErrorMessage(()=>`Unknown model name: ${o.modelKey}.`);break;case"UnknownField":t.arguments.getDeepField([o.modelKey,o.fieldName])?.markAsError(),t.addErrorMessage(()=>`Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);break;case"RelationInOmit":t.arguments.getDeepField([o.modelKey,o.fieldName])?.markAsError(),t.addErrorMessage(()=>'Relations are already excluded by default and can not be specified in "omit".');break;case"InvalidFieldValue":t.arguments.getDeepFieldValue([o.modelKey,o.fieldName])?.markAsError(),t.addErrorMessage(()=>"Omit field option value must be a boolean.");break}let{message:n,args:i}=kn(t,"colorless");return`Error validating "omit" option:

${i}

${n}`}function du(e){return e.length===0?Promise.resolve([]):new Promise((r,t)=>{let n=new Array(e.length),i=null,o=!1,s=0,a=()=>{o||(s++,s===e.length&&(o=!0,i?t(i):r(n)))},l=u=>{o||(o=!0,t(u))};for(let u=0;u<e.length;u++)e[u].then(c=>{n[u]=c,a()},c=>{if(!zn(c)){l(c);return}c.batchRequestIdx===u?l(c):(i||(i=c),a())})})}var rr=N("prisma:client");typeof globalThis=="object"&&(globalThis.NODE_CLIENT=!0);var Vf={requestArgsToMiddlewareArgs:e=>e,middlewareArgsToRequestArgs:e=>e},jf=Symbol.for("prisma.client.transaction.id"),Bf={id:0,nextId(){return++this.id}};function bu(e){class r{_originalClient=this;_runtimeDataModel;_requestHandler;_connectionPromise;_disconnectionPromise;_engineConfig;_accelerateEngineConfig;_clientVersion;_errorFormat;_tracingHelper;_previewFeatures;_activeProvider;_globalOmit;_extensions;_engine;_appliedParent;_createPrismaPromise=Ao();constructor(n){e=n?.__internal?.configOverride?.(e)??e,cl(e),n&&pu(n,e);let i=new hu.EventEmitter().on("error",()=>{});this._extensions=_r.empty(),this._previewFeatures=Yn(e),this._clientVersion=e.clientVersion??ou,this._activeProvider=e.activeProvider,this._globalOmit=n?.omit,this._tracingHelper=Zl();let o=e.relativeEnvPaths&&{rootEnvPath:e.relativeEnvPaths.rootEnvPath&&ri.default.resolve(e.dirname,e.relativeEnvPaths.rootEnvPath),schemaEnvPath:e.relativeEnvPaths.schemaEnvPath&&ri.default.resolve(e.dirname,e.relativeEnvPaths.schemaEnvPath)},s;if(n?.adapter){s=n.adapter;let l=e.activeProvider==="postgresql"||e.activeProvider==="cockroachdb"?"postgres":e.activeProvider;if(s.provider!==l)throw new P(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${l}\` specified in the Prisma schema.`,this._clientVersion);if(n.datasources||n.datasourceUrl!==void 0)throw new P("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.",this._clientVersion)}let a=!s&&o&&ot(o,{conflictCheck:"none"})||e.injectableEdgeEnv?.();try{let l=n??{},u=l.__internal??{},c=u.debug===!0;c&&N.enable("prisma:client");let p=ri.default.resolve(e.dirname,e.relativePath);yu.default.existsSync(p)||(p=e.dirname),rr("dirname",e.dirname),rr("relativePath",e.relativePath),rr("cwd",p);let d=u.engine||{};if(l.errorFormat?this._errorFormat=l.errorFormat:process.env.NODE_ENV==="production"?this._errorFormat="minimal":process.env.NO_COLOR?this._errorFormat="colorless":this._errorFormat="colorless",this._runtimeDataModel=e.runtimeDataModel,this._engineConfig={cwd:p,dirname:e.dirname,enableDebugLogs:c,allowTriggerPanic:d.allowTriggerPanic,prismaPath:d.binaryPath??void 0,engineEndpoint:d.endpoint,generator:e.generator,showColors:this._errorFormat==="pretty",logLevel:l.log&&eu(l.log),logQueries:l.log&&!!(typeof l.log=="string"?l.log==="query":l.log.find(f=>typeof f=="string"?f==="query":f.level==="query")),env:a?.parsed??{},flags:[],engineWasm:e.engineWasm,compilerWasm:e.compilerWasm,clientVersion:e.clientVersion,engineVersion:e.engineVersion,previewFeatures:this._previewFeatures,activeProvider:e.activeProvider,inlineSchema:e.inlineSchema,overrideDatasources:pl(l,e.datasourceNames),inlineDatasources:e.inlineDatasources,inlineSchemaHash:e.inlineSchemaHash,tracingHelper:this._tracingHelper,transactionOptions:{maxWait:l.transactionOptions?.maxWait??2e3,timeout:l.transactionOptions?.timeout??5e3,isolationLevel:l.transactionOptions?.isolationLevel},logEmitter:i,isBundled:e.isBundled,adapter:s},this._accelerateEngineConfig={...this._engineConfig,accelerateUtils:{resolveDatasourceUrl:Vr,getBatchRequestPayload:Fr,prismaGraphQLToJSError:Mr,PrismaClientUnknownRequestError:V,PrismaClientInitializationError:P,PrismaClientKnownRequestError:z,debug:N("prisma:client:accelerateEngine"),engineVersion:fu.version,clientVersion:e.clientVersion}},rr("clientVersion",e.clientVersion),this._engine=jl(e,this._engineConfig),this._requestHandler=new ei(this,i),l.log)for(let f of l.log){let h=typeof f=="string"?f:f.emit==="stdout"?f.level:null;h&&this.$on(h,g=>{tt.log(`${tt.tags[h]??""}`,g.message||g.query)})}}catch(l){throw l.clientVersion=this._clientVersion,l}return this._appliedParent=vt(this)}get[Symbol.toStringTag](){return"PrismaClient"}$on(n,i){return n==="beforeExit"?this._engine.onBeforeExit(i):n&&this._engineConfig.logEmitter.on(n,i),this}$connect(){try{return this._engine.start()}catch(n){throw n.clientVersion=this._clientVersion,n}}async $disconnect(){try{await this._engine.stop()}catch(n){throw n.clientVersion=this._clientVersion,n}finally{Go()}}$executeRawInternal(n,i,o,s){let a=this._activeProvider;return this._request({action:"executeRaw",args:o,transaction:n,clientMethod:i,argsMapper:Ro({clientMethod:i,activeProvider:a}),callsite:Ze(this._errorFormat),dataPath:[],middlewareArgsMapper:s})}$executeRaw(n,...i){return this._createPrismaPromise(o=>{if(n.raw!==void 0||n.sql!==void 0){let[s,a]=mu(n,i);return So(this._activeProvider,s.text,s.values,Array.isArray(n)?"prisma.$executeRaw`<SQL>`":"prisma.$executeRaw(sql`<SQL>`)"),this.$executeRawInternal(o,"$executeRaw",s,a)}throw new Z("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n",{clientVersion:this._clientVersion})})}$executeRawUnsafe(n,...i){return this._createPrismaPromise(o=>(So(this._activeProvider,n,i,"prisma.$executeRawUnsafe(<SQL>, [...values])"),this.$executeRawInternal(o,"$executeRawUnsafe",[n,...i])))}$runCommandRaw(n){if(e.activeProvider!=="mongodb")throw new Z(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`,{clientVersion:this._clientVersion});return this._createPrismaPromise(i=>this._request({args:n,clientMethod:"$runCommandRaw",dataPath:[],action:"runCommandRaw",argsMapper:Bl,callsite:Ze(this._errorFormat),transaction:i}))}async $queryRawInternal(n,i,o,s){let a=this._activeProvider;return this._request({action:"queryRaw",args:o,transaction:n,clientMethod:i,argsMapper:Ro({clientMethod:i,activeProvider:a}),callsite:Ze(this._errorFormat),dataPath:[],middlewareArgsMapper:s})}$queryRaw(n,...i){return this._createPrismaPromise(o=>{if(n.raw!==void 0||n.sql!==void 0)return this.$queryRawInternal(o,"$queryRaw",...mu(n,i));throw new Z("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n",{clientVersion:this._clientVersion})})}$queryRawTyped(n){return this._createPrismaPromise(i=>{if(!this._hasPreviewFlag("typedSql"))throw new Z("`typedSql` preview feature must be enabled in order to access $queryRawTyped API",{clientVersion:this._clientVersion});return this.$queryRawInternal(i,"$queryRawTyped",n)})}$queryRawUnsafe(n,...i){return this._createPrismaPromise(o=>this.$queryRawInternal(o,"$queryRawUnsafe",[n,...i]))}_transactionWithArray({promises:n,options:i}){let o=Bf.nextId(),s=Xl(n.length),a=n.map((l,u)=>{if(l?.[Symbol.toStringTag]!=="PrismaPromise")throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");let c=i?.isolationLevel??this._engineConfig.transactionOptions.isolationLevel,p={kind:"batch",id:o,index:u,isolationLevel:c,lock:s};return l.requestTransaction?.(p)??l});return du(a)}async _transactionWithCallback({callback:n,options:i}){let o={traceparent:this._tracingHelper.getTraceParent()},s={maxWait:i?.maxWait??this._engineConfig.transactionOptions.maxWait,timeout:i?.timeout??this._engineConfig.transactionOptions.timeout,isolationLevel:i?.isolationLevel??this._engineConfig.transactionOptions.isolationLevel},a=await this._engine.transaction("start",o,s),l;try{let u={kind:"itx",...a};l=await n(this._createItxClient(u)),await this._engine.transaction("commit",o,a)}catch(u){throw await this._engine.transaction("rollback",o,a).catch(()=>{}),u}return l}_createItxClient(n){return he(vt(he(Ha(this),[re("_appliedParent",()=>this._appliedParent._createItxClient(n)),re("_createPrismaPromise",()=>Ao(n)),re(jf,()=>n.id)])),[Lr(el)])}$transaction(n,i){let o;typeof n=="function"?this._engineConfig.adapter?.adapterName==="@prisma/adapter-d1"?o=()=>{throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.")}:o=()=>this._transactionWithCallback({callback:n,options:i}):o=()=>this._transactionWithArray({promises:n,options:i});let s={name:"transaction",attributes:{method:"$transaction"}};return this._tracingHelper.runInChildSpan(s,o)}_request(n){n.otelParentCtx=this._tracingHelper.getActiveContext();let i=n.middlewareArgsMapper??Vf,o={args:i.requestArgsToMiddlewareArgs(n.args),dataPath:n.dataPath,runInTransaction:!!n.transaction,action:n.action,model:n.model},s={operation:{name:"operation",attributes:{method:o.action,model:o.model,name:o.model?`${o.model}.${o.action}`:o.action}}},a=async l=>{let{runInTransaction:u,args:c,...p}=l,d={...n,...p};c&&(d.args=i.middlewareArgsToRequestArgs(c)),n.transaction!==void 0&&u===!1&&delete d.transaction;let f=await il(this,d);return d.model?Xa({result:f,modelName:d.model,args:d.args,extensions:this._extensions,runtimeDataModel:this._runtimeDataModel,globalOmit:this._globalOmit}):f};return this._tracingHelper.runInChildSpan(s.operation,()=>new gu.AsyncResource("prisma-client-request").runInAsyncScope(()=>a(o)))}async _executeRequest({args:n,clientMethod:i,dataPath:o,callsite:s,action:a,model:l,argsMapper:u,transaction:c,unpacker:p,otelParentCtx:d,customDataProxyFetch:f}){try{n=u?u(n):n;let h={name:"serialize"},g=this._tracingHelper.runInChildSpan(h,()=>Mn({modelName:l,runtimeDataModel:this._runtimeDataModel,action:a,args:n,clientMethod:i,callsite:s,extensions:this._extensions,errorFormat:this._errorFormat,clientVersion:this._clientVersion,previewFeatures:this._previewFeatures,globalOmit:this._globalOmit}));return N.enabled("prisma:client")&&(rr("Prisma Client call:"),rr(`prisma.${i}(${$a(n)})`),rr("Generated request:"),rr(JSON.stringify(g,null,2)+`
`)),c?.kind==="batch"&&await c.lock,this._requestHandler.request({protocolQuery:g,modelName:l,action:a,clientMethod:i,dataPath:o,callsite:s,args:n,extensions:this._extensions,transaction:c,unpacker:p,otelParentCtx:d,otelChildCtx:this._tracingHelper.getActiveContext(),globalOmit:this._globalOmit,customDataProxyFetch:f})}catch(h){throw h.clientVersion=this._clientVersion,h}}$metrics=new Nr(this);_hasPreviewFlag(n){return!!this._engineConfig.previewFeatures?.includes(n)}$applyPendingMigrations(){return this._engine.applyPendingMigrations()}$extends=Ya}return r}function mu(e,r){return Uf(e)?[new oe(e,r),Hl]:[e,Yl]}function Uf(e){return Array.isArray(e)&&Array.isArray(e.raw)}var Gf=new Set(["toJSON","$$typeof","asymmetricMatch",Symbol.iterator,Symbol.toStringTag,Symbol.isConcatSpreadable,Symbol.toPrimitive]);function Eu(e){return new Proxy(e,{get(r,t){if(t in r)return r[t];if(!Gf.has(t))throw new TypeError(`Invalid enum value: ${String(t)}`)}})}function wu(e){ot(e,{conflictCheck:"warn"})}0&&(0);
/*! Bundled license information:

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.5.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/
//# sourceMappingURL=library.js.map


/***/ }),
/* 157 */
/***/ ((module) => {

"use strict";
module.exports = require("node:os");

/***/ }),
/* 158 */
/***/ ((module) => {

"use strict";
module.exports = require("node:tty");

/***/ }),
/* 159 */
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),
/* 160 */
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),
/* 161 */
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),
/* 162 */
/***/ ((module) => {

"use strict";
module.exports = require("node:child_process");

/***/ }),
/* 163 */
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),
/* 164 */
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),
/* 165 */
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),
/* 166 */
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),
/* 167 */
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),
/* 168 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletGrpcService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@nestjs/microservices'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const path_1 = __webpack_require__(13);
let WalletGrpcService = class WalletGrpcService {
    client;
    walletService;
    onModuleInit() {
        this.walletService = this.client.getService('WalletService');
    }
    createWallet(data) {
        return this.walletService.createWallet(data);
    }
    getWallet(data) {
        return this.walletService.getWallet(data);
    }
    deductBalance(data) {
        return this.walletService.deductBalance(data);
    }
    deleteWallet(data) {
        return this.walletService.deleteWallet(data);
    }
    getTransactions(data) {
        return this.walletService.getTransactions(data);
    }
    getChargingSessions(data) {
        return this.walletService.getChargingSessions(data);
    }
};
exports.WalletGrpcService = WalletGrpcService;
__decorate([
    (0, microservices_1.Client)({
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'wallet',
            protoPath: (0, path_1.join)(__dirname, '../../proto/wallet.proto'),
            url: process.env.WALLET_GRPC_URL || 'localhost:5000',
        },
    }),
    __metadata("design:type", Object)
], WalletGrpcService.prototype, "client", void 0);
exports.WalletGrpcService = WalletGrpcService = __decorate([
    (0, common_1.Injectable)()
], WalletGrpcService);


/***/ }),
/* 169 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const path = __webpack_require__(13);
const bindings = __webpack_require__(170)(path.resolve(__dirname));

const crypto = __webpack_require__(15);

const promises = __webpack_require__(172);

/// generate a salt (sync)
/// @param {Number} [rounds] number of rounds (default 10)
/// @return {String} salt
function genSaltSync(rounds, minor) {
    // default 10 rounds
    if (!rounds) {
        rounds = 10;
    } else if (typeof rounds !== 'number') {
        throw new Error('rounds must be a number');
    }

    if (!minor) {
        minor = 'b';
    } else if (minor !== 'b' && minor !== 'a') {
        throw new Error('minor must be either "a" or "b"');
    }

    return bindings.gen_salt_sync(minor, rounds, crypto.randomBytes(16));
}

/// generate a salt
/// @param {Number} [rounds] number of rounds (default 10)
/// @param {Function} cb callback(err, salt)
function genSalt(rounds, minor, cb) {
    let error;

    // if callback is first argument, then use defaults for others
    if (typeof arguments[0] === 'function') {
        // have to set callback first otherwise arguments are overridden
        cb = arguments[0];
        rounds = 10;
        minor = 'b';
        // callback is second argument
    } else if (typeof arguments[1] === 'function') {
        // have to set callback first otherwise arguments are overridden
        cb = arguments[1];
        minor = 'b';
    }

    if (!cb) {
        return promises.promise(genSalt, this, [rounds, minor]);
    }

    // default 10 rounds
    if (!rounds) {
        rounds = 10;
    } else if (typeof rounds !== 'number') {
        // callback error asynchronously
        error = new Error('rounds must be a number');
        return process.nextTick(function () {
            cb(error);
        });
    }

    if (!minor) {
        minor = 'b'
    } else if (minor !== 'b' && minor !== 'a') {
        error = new Error('minor must be either "a" or "b"');
        return process.nextTick(function () {
            cb(error);
        });
    }

    crypto.randomBytes(16, function (error, randomBytes) {
        if (error) {
            cb(error);
            return;
        }

        bindings.gen_salt(minor, rounds, randomBytes, cb);
    });
}

/// hash data using a salt
/// @param {String|Buffer} data the data to encrypt
/// @param {String} salt the salt to use when hashing
/// @return {String} hash
function hashSync(data, salt) {
    if (data == null || salt == null) {
        throw new Error('data and salt arguments required');
    }

    if (!(typeof data === 'string' || data instanceof Buffer) || (typeof salt !== 'string' && typeof salt !== 'number')) {
        throw new Error('data must be a string or Buffer and salt must either be a salt string or a number of rounds');
    }

    if (typeof salt === 'number') {
        salt = module.exports.genSaltSync(salt);
    }

    return bindings.encrypt_sync(data, salt);
}

/// hash data using a salt
/// @param {String|Buffer} data the data to encrypt
/// @param {String} salt the salt to use when hashing
/// @param {Function} cb callback(err, hash)
function hash(data, salt, cb) {
    let error;

    if (typeof data === 'function') {
        error = new Error('data must be a string or Buffer and salt must either be a salt string or a number of rounds');
        return process.nextTick(function () {
            data(error);
        });
    }

    if (typeof salt === 'function') {
        error = new Error('data must be a string or Buffer and salt must either be a salt string or a number of rounds');
        return process.nextTick(function () {
            salt(error);
        });
    }

    // cb exists but is not a function
    // return a rejecting promise
    if (cb && typeof cb !== 'function') {
        return promises.reject(new Error('cb must be a function or null to return a Promise'));
    }

    if (!cb) {
        return promises.promise(hash, this, [data, salt]);
    }

    if (data == null || salt == null) {
        error = new Error('data and salt arguments required');
        return process.nextTick(function () {
            cb(error);
        });
    }

    if (!(typeof data === 'string' || data instanceof Buffer) || (typeof salt !== 'string' && typeof salt !== 'number')) {
        error = new Error('data must be a string or Buffer and salt must either be a salt string or a number of rounds');
        return process.nextTick(function () {
            cb(error);
        });
    }


    if (typeof salt === 'number') {
        return module.exports.genSalt(salt, function (err, salt) {
            return bindings.encrypt(data, salt, cb);
        });
    }

    return bindings.encrypt(data, salt, cb);
}

/// compare raw data to hash
/// @param {String|Buffer} data the data to hash and compare
/// @param {String} hash expected hash
/// @return {bool} true if hashed data matches hash
function compareSync(data, hash) {
    if (data == null || hash == null) {
        throw new Error('data and hash arguments required');
    }

    if (!(typeof data === 'string' || data instanceof Buffer) || typeof hash !== 'string') {
        throw new Error('data must be a string or Buffer and hash must be a string');
    }

    return bindings.compare_sync(data, hash);
}

/// compare raw data to hash
/// @param {String|Buffer} data the data to hash and compare
/// @param {String} hash expected hash
/// @param {Function} cb callback(err, matched) - matched is true if hashed data matches hash
function compare(data, hash, cb) {
    let error;

    if (typeof data === 'function') {
        error = new Error('data and hash arguments required');
        return process.nextTick(function () {
            data(error);
        });
    }

    if (typeof hash === 'function') {
        error = new Error('data and hash arguments required');
        return process.nextTick(function () {
            hash(error);
        });
    }

    // cb exists but is not a function
    // return a rejecting promise
    if (cb && typeof cb !== 'function') {
        return promises.reject(new Error('cb must be a function or null to return a Promise'));
    }

    if (!cb) {
        return promises.promise(compare, this, [data, hash]);
    }

    if (data == null || hash == null) {
        error = new Error('data and hash arguments required');
        return process.nextTick(function () {
            cb(error);
        });
    }

    if (!(typeof data === 'string' || data instanceof Buffer) || typeof hash !== 'string') {
        error = new Error('data and hash must be strings');
        return process.nextTick(function () {
            cb(error);
        });
    }

    return bindings.compare(data, hash, cb);
}

/// @param {String} hash extract rounds from this hash
/// @return {Number} the number of rounds used to encrypt a given hash
function getRounds(hash) {
    if (hash == null) {
        throw new Error('hash argument required');
    }

    if (typeof hash !== 'string') {
        throw new Error('hash must be a string');
    }

    return bindings.get_rounds(hash);
}

module.exports = {
    genSaltSync,
    genSalt,
    hashSync,
    hash,
    compareSync,
    compare,
    getRounds,
}


/***/ }),
/* 170 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const runtimeRequire =  true ? require : 0 // eslint-disable-line
if (typeof runtimeRequire.addon === 'function') { // if the platform supports native resolving prefer that
  module.exports = runtimeRequire.addon.bind(runtimeRequire)
} else { // else use the runtime version here
  module.exports = __webpack_require__(171)
}


/***/ }),
/* 171 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fs = __webpack_require__(12)
var path = __webpack_require__(13)
var os = __webpack_require__(14)

// Workaround to fix webpack's build warnings: 'the request of a dependency is an expression'
var runtimeRequire =  true ? require : 0 // eslint-disable-line

var vars = (process.config && process.config.variables) || {}
var prebuildsOnly = !!process.env.PREBUILDS_ONLY
var abi = process.versions.modules // TODO: support old node where this is undef
var runtime = isElectron() ? 'electron' : (isNwjs() ? 'node-webkit' : 'node')

var arch = process.env.npm_config_arch || os.arch()
var platform = process.env.npm_config_platform || os.platform()
var libc = process.env.LIBC || (isAlpine(platform) ? 'musl' : 'glibc')
var armv = process.env.ARM_VERSION || (arch === 'arm64' ? '8' : vars.arm_version) || ''
var uv = (process.versions.uv || '').split('.')[0]

module.exports = load

function load (dir) {
  return runtimeRequire(load.resolve(dir))
}

load.resolve = load.path = function (dir) {
  dir = path.resolve(dir || '.')

  try {
    var name = runtimeRequire(path.join(dir, 'package.json')).name.toUpperCase().replace(/-/g, '_')
    if (process.env[name + '_PREBUILD']) dir = process.env[name + '_PREBUILD']
  } catch (err) {}

  if (!prebuildsOnly) {
    var release = getFirst(path.join(dir, 'build/Release'), matchBuild)
    if (release) return release

    var debug = getFirst(path.join(dir, 'build/Debug'), matchBuild)
    if (debug) return debug
  }

  var prebuild = resolve(dir)
  if (prebuild) return prebuild

  var nearby = resolve(path.dirname(process.execPath))
  if (nearby) return nearby

  var target = [
    'platform=' + platform,
    'arch=' + arch,
    'runtime=' + runtime,
    'abi=' + abi,
    'uv=' + uv,
    armv ? 'armv=' + armv : '',
    'libc=' + libc,
    'node=' + process.versions.node,
    process.versions.electron ? 'electron=' + process.versions.electron : '',
     true ? 'webpack=true' : 0 // eslint-disable-line
  ].filter(Boolean).join(' ')

  throw new Error('No native build was found for ' + target + '\n    loaded from: ' + dir + '\n')

  function resolve (dir) {
    // Find matching "prebuilds/<platform>-<arch>" directory
    var tuples = readdirSync(path.join(dir, 'prebuilds')).map(parseTuple)
    var tuple = tuples.filter(matchTuple(platform, arch)).sort(compareTuples)[0]
    if (!tuple) return

    // Find most specific flavor first
    var prebuilds = path.join(dir, 'prebuilds', tuple.name)
    var parsed = readdirSync(prebuilds).map(parseTags)
    var candidates = parsed.filter(matchTags(runtime, abi))
    var winner = candidates.sort(compareTags(runtime))[0]
    if (winner) return path.join(prebuilds, winner.file)
  }
}

function readdirSync (dir) {
  try {
    return fs.readdirSync(dir)
  } catch (err) {
    return []
  }
}

function getFirst (dir, filter) {
  var files = readdirSync(dir).filter(filter)
  return files[0] && path.join(dir, files[0])
}

function matchBuild (name) {
  return /\.node$/.test(name)
}

function parseTuple (name) {
  // Example: darwin-x64+arm64
  var arr = name.split('-')
  if (arr.length !== 2) return

  var platform = arr[0]
  var architectures = arr[1].split('+')

  if (!platform) return
  if (!architectures.length) return
  if (!architectures.every(Boolean)) return

  return { name, platform, architectures }
}

function matchTuple (platform, arch) {
  return function (tuple) {
    if (tuple == null) return false
    if (tuple.platform !== platform) return false
    return tuple.architectures.includes(arch)
  }
}

function compareTuples (a, b) {
  // Prefer single-arch prebuilds over multi-arch
  return a.architectures.length - b.architectures.length
}

function parseTags (file) {
  var arr = file.split('.')
  var extension = arr.pop()
  var tags = { file: file, specificity: 0 }

  if (extension !== 'node') return

  for (var i = 0; i < arr.length; i++) {
    var tag = arr[i]

    if (tag === 'node' || tag === 'electron' || tag === 'node-webkit') {
      tags.runtime = tag
    } else if (tag === 'napi') {
      tags.napi = true
    } else if (tag.slice(0, 3) === 'abi') {
      tags.abi = tag.slice(3)
    } else if (tag.slice(0, 2) === 'uv') {
      tags.uv = tag.slice(2)
    } else if (tag.slice(0, 4) === 'armv') {
      tags.armv = tag.slice(4)
    } else if (tag === 'glibc' || tag === 'musl') {
      tags.libc = tag
    } else {
      continue
    }

    tags.specificity++
  }

  return tags
}

function matchTags (runtime, abi) {
  return function (tags) {
    if (tags == null) return false
    if (tags.runtime && tags.runtime !== runtime && !runtimeAgnostic(tags)) return false
    if (tags.abi && tags.abi !== abi && !tags.napi) return false
    if (tags.uv && tags.uv !== uv) return false
    if (tags.armv && tags.armv !== armv) return false
    if (tags.libc && tags.libc !== libc) return false

    return true
  }
}

function runtimeAgnostic (tags) {
  return tags.runtime === 'node' && tags.napi
}

function compareTags (runtime) {
  // Precedence: non-agnostic runtime, abi over napi, then by specificity.
  return function (a, b) {
    if (a.runtime !== b.runtime) {
      return a.runtime === runtime ? -1 : 1
    } else if (a.abi !== b.abi) {
      return a.abi ? -1 : 1
    } else if (a.specificity !== b.specificity) {
      return a.specificity > b.specificity ? -1 : 1
    } else {
      return 0
    }
  }
}

function isNwjs () {
  return !!(process.versions && process.versions.nw)
}

function isElectron () {
  if (process.versions && process.versions.electron) return true
  if (process.env.ELECTRON_RUN_AS_NODE) return true
  return typeof window !== 'undefined' && window.process && window.process.type === 'renderer'
}

function isAlpine (platform) {
  return platform === 'linux' && fs.existsSync('/etc/alpine-release')
}

// Exposed for unit tests
// TODO: move to lib
load.parseTags = parseTags
load.matchTags = matchTags
load.compareTags = compareTags
load.parseTuple = parseTuple
load.matchTuple = matchTuple
load.compareTuples = compareTuples


/***/ }),
/* 172 */
/***/ ((module) => {

let Promise = global.Promise;

/// encapsulate a method with a node-style callback in a Promise
/// @param {object} 'this' of the encapsulated function
/// @param {function} function to be encapsulated
/// @param {Array-like} args to be passed to the called function
/// @return {Promise} a Promise encapsulating the function
function promise(fn, context, args) {
    if (!Array.isArray(args)) {
        args = Array.prototype.slice.call(args);
    }

    if (typeof fn !== 'function') {
        return Promise.reject(new Error('fn must be a function'));
    }

    return new Promise((resolve, reject) => {
        args.push((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

        fn.apply(context, args);
    });
}

/// @param {err} the error to be thrown
function reject(err) {
    return Promise.reject(err);
}

/// changes the promise implementation that bcrypt uses
/// @param {Promise} the implementation to use
function use(promise) {
    Promise = promise;
}

module.exports = {
    promise,
    reject,
    use
}


/***/ }),
/* 173 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCustomerDto = exports.CreateCustomerDto = exports.CreateAdminDto = void 0;
const class_validator_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'class-validator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const swagger_1 = __webpack_require__(42);
class CreateAdminDto {
    firstName;
    lastName;
    email;
    password;
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin first name (required)',
        example: 'John',
        minLength: 1,
        maxLength: 50,
        pattern: '^[a-zA-Z\\s]+$'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'First name is required' }),
    (0, class_validator_1.IsString)({ message: 'First name must be a string' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin last name (required)',
        example: 'Admin',
        minLength: 1,
        maxLength: 50,
        pattern: '^[a-zA-Z\\s]+$'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Last name is required' }),
    (0, class_validator_1.IsString)({ message: 'Last name must be a string' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin email address (required, must be unique)',
        example: 'admin@yatritask.com',
        format: 'email',
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin password (required, minimum 6 characters)',
        example: 'admin123',
        minLength: 6,
        maxLength: 100,
        pattern: '^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
class CreateCustomerDto {
    firstName;
    lastName;
    email;
    password;
    phone;
    address;
}
exports.CreateCustomerDto = CreateCustomerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer first name (required)',
        example: 'Jane',
        minLength: 1,
        maxLength: 50,
        pattern: '^[a-zA-Z\\s]+$'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'First name is required' }),
    (0, class_validator_1.IsString)({ message: 'First name must be a string' }),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer last name (required)',
        example: 'Doe',
        minLength: 1,
        maxLength: 50,
        pattern: '^[a-zA-Z\\s]+$'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Last name is required' }),
    (0, class_validator_1.IsString)({ message: 'Last name must be a string' }),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer email address (required, must be unique)',
        example: 'jane.doe@example.com',
        format: 'email',
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer password (required, minimum 6 characters)',
        example: 'password123',
        minLength: 6,
        maxLength: 100,
        pattern: '^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer phone number (optional)',
        example: '+1234567890',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Phone must be a string' }),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer address (optional)',
        example: '123 Main St, City, State 12345',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Address must be a string' }),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "address", void 0);
class UpdateCustomerDto {
    firstName;
    lastName;
    email;
    phone;
    address;
}
exports.UpdateCustomerDto = UpdateCustomerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer first name (optional)',
        example: 'Jane',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'First name must be a string' }),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer last name (optional)',
        example: 'Doe',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Last name must be a string' }),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer email address (optional)',
        example: 'jane.doe@example.com',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer phone number (optional)',
        example: '+1234567890',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Phone must be a string' }),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer address (optional)',
        example: '123 Main St, City, State 12345',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Address must be a string' }),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "address", void 0);


/***/ }),
/* 174 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteCustomerResponseDto = exports.ApiResponseDto = exports.PaginatedResponseDto = exports.ChargingSessionResponseDto = exports.TransactionResponseDto = exports.WalletResponseDto = exports.BikeAssignmentResponseDto = exports.BikeResponseDto = exports.CustomerAuthResponseDto = exports.AdminAuthResponseDto = exports.CustomerResponseDto = exports.AdminResponseDto = void 0;
const swagger_1 = __webpack_require__(42);
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
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AdminResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin last update timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
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
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], CustomerResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer last update timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
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
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], BikeResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bike last update timestamp',
        example: '2024-01-09T16:30:00.000Z'
    }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
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
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
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
    __metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
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
    __metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
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
    __metadata("design:type", typeof (_m = typeof Date !== "undefined" && Date) === "function" ? _m : Object)
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


/***/ }),
/* 175 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const admin_auth_service_1 = __webpack_require__(176);
let AdminAuthGuard = class AdminAuthGuard {
    adminAuthService;
    constructor(adminAuthService) {
        this.adminAuthService = adminAuthService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        if (!token) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        try {
            const payload = await this.adminAuthService.validateToken(token);
            request.admin = payload;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    extractTokenFromRequest(request) {
        const authHeader = request.headers.authorization;
        if (authHeader) {
            const [type, token] = authHeader.split(' ');
            if (type === 'Bearer') {
                return token;
            }
        }
        const cookieToken = request.cookies?.admin_token;
        if (cookieToken) {
            return cookieToken;
        }
        return undefined;
    }
};
exports.AdminAuthGuard = AdminAuthGuard;
exports.AdminAuthGuard = AdminAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_auth_service_1.AdminAuthService !== "undefined" && admin_auth_service_1.AdminAuthService) === "function" ? _a : Object])
], AdminAuthGuard);


/***/ }),
/* 176 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminAuthService = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(177);
const prisma_service_1 = __webpack_require__(152);
const bcrypt = __importStar(__webpack_require__(169));
let AdminAuthService = class AdminAuthService {
    prisma;
    jwtService;
    blockedTokens = new Set();
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerAdmin(data) {
        const existingAdmin = await this.prisma.admin.findUnique({
            where: { email: data.email },
        });
        if (existingAdmin) {
            throw new common_1.UnauthorizedException('Admin with this email already exists');
        }
        const hashed = await bcrypt.hash(data.password, 5);
        const admin = await this.prisma.admin.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashed,
            },
        });
        return admin;
    }
    async registerFirstAdmin(data) {
        const adminCount = await this.prisma.admin.count();
        if (adminCount > 0) {
            throw new common_1.UnauthorizedException('Admin already exists in the system. Use regular admin registration.');
        }
        const existingAdmin = await this.prisma.admin.findUnique({
            where: { email: data.email },
        });
        if (existingAdmin) {
            throw new common_1.UnauthorizedException('Admin with this email already exists');
        }
        const hashed = await bcrypt.hash(data.password, 5);
        const admin = await this.prisma.admin.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashed,
            },
        });
        return admin;
    }
    async loginAdmin(email, password) {
        const admin = await this.prisma.admin.findUnique({
            where: { email },
        });
        if (!admin)
            throw new common_1.UnauthorizedException('Invalid admin credentials');
        const match = await bcrypt.compare(password, admin.password);
        if (!match)
            throw new common_1.UnauthorizedException('Invalid admin credentials');
        const token = this.jwtService.sign({
            sub: admin.id,
            type: 'admin',
            email: admin.email,
        });
        return { token, admin };
    }
    async logoutWithCredentials(email, password) {
        const admin = await this.prisma.admin.findUnique({
            where: { email },
        });
        if (!admin) {
            throw new common_1.UnauthorizedException('Invalid admin credentials');
        }
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            throw new common_1.UnauthorizedException('Invalid admin credentials');
        }
        return { message: 'Admin logged out successfully' };
    }
    async logout(token) {
        this.blockedTokens.add(token);
        if (this.blockedTokens.size > 1000) {
            this.blockedTokens.clear();
        }
    }
    validateToken(token) {
        if (this.blockedTokens.has(token)) {
            throw new common_1.UnauthorizedException('Token blocked');
        }
        try {
            const payload = this.jwtService.verify(token);
            if (payload.type !== 'admin') {
                throw new common_1.UnauthorizedException('Invalid token type');
            }
            return payload;
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async getAdminById(id) {
        return this.prisma.admin.findUnique({
            where: { id },
        });
    }
};
exports.AdminAuthService = AdminAuthService;
exports.AdminAuthService = AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AdminAuthService);


/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(178));


/***/ }),
/* 178 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsonWebTokenError = exports.NotBeforeError = exports.TokenExpiredError = void 0;
__exportStar(__webpack_require__(179), exports);
__exportStar(__webpack_require__(181), exports);
__exportStar(__webpack_require__(182), exports);
__exportStar(__webpack_require__(185), exports);
var jsonwebtoken_1 = __webpack_require__(186);
Object.defineProperty(exports, "TokenExpiredError", ({ enumerable: true, get: function () { return jsonwebtoken_1.TokenExpiredError; } }));
Object.defineProperty(exports, "NotBeforeError", ({ enumerable: true, get: function () { return jsonwebtoken_1.NotBeforeError; } }));
Object.defineProperty(exports, "JsonWebTokenError", ({ enumerable: true, get: function () { return jsonwebtoken_1.JsonWebTokenError; } }));


/***/ }),
/* 179 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(180), exports);


/***/ }),
/* 180 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtSecretRequestType = void 0;
var JwtSecretRequestType;
(function (JwtSecretRequestType) {
    JwtSecretRequestType[JwtSecretRequestType["SIGN"] = 0] = "SIGN";
    JwtSecretRequestType[JwtSecretRequestType["VERIFY"] = 1] = "VERIFY";
})(JwtSecretRequestType || (exports.JwtSecretRequestType = JwtSecretRequestType = {}));


/***/ }),
/* 181 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WrongSecretProviderError = void 0;
class WrongSecretProviderError extends Error {
}
exports.WrongSecretProviderError = WrongSecretProviderError;


/***/ }),
/* 182 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtModule = void 0;
const common_1 = __webpack_require__(3);
const jwt_constants_1 = __webpack_require__(183);
const jwt_providers_1 = __webpack_require__(184);
const jwt_service_1 = __webpack_require__(185);
let JwtModule = JwtModule_1 = class JwtModule {
    static register(options) {
        return {
            module: JwtModule_1,
            global: options.global,
            providers: (0, jwt_providers_1.createJwtProvider)(options)
        };
    }
    static registerAsync(options) {
        return {
            module: JwtModule_1,
            global: options.global,
            imports: options.imports || [],
            providers: [
                ...this.createAsyncProviders(options),
                ...(options.extraProviders ?? [])
            ]
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass
            }
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: jwt_constants_1.JWT_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        return {
            provide: jwt_constants_1.JWT_MODULE_OPTIONS,
            useFactory: async (optionsFactory) => await optionsFactory.createJwtOptions(),
            inject: [options.useExisting || options.useClass]
        };
    }
};
exports.JwtModule = JwtModule;
exports.JwtModule = JwtModule = JwtModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [jwt_service_1.JwtService],
        exports: [jwt_service_1.JwtService]
    })
], JwtModule);


/***/ }),
/* 183 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JWT_MODULE_OPTIONS = void 0;
exports.JWT_MODULE_OPTIONS = 'JWT_MODULE_OPTIONS';


/***/ }),
/* 184 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createJwtProvider = createJwtProvider;
const jwt_constants_1 = __webpack_require__(183);
function createJwtProvider(options) {
    return [{ provide: jwt_constants_1.JWT_MODULE_OPTIONS, useValue: options || {} }];
}


/***/ }),
/* 185 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtService = void 0;
const common_1 = __webpack_require__(3);
const jwt = __webpack_require__(186);
const interfaces_1 = __webpack_require__(179);
const jwt_constants_1 = __webpack_require__(183);
const jwt_errors_1 = __webpack_require__(181);
let JwtService = class JwtService {
    constructor(options = {}) {
        this.options = options;
        this.logger = new common_1.Logger('JwtService');
    }
    sign(payload, options) {
        const signOptions = this.mergeJwtOptions({ ...options }, 'signOptions');
        const secret = this.getSecretKey(payload, options, 'privateKey', interfaces_1.JwtSecretRequestType.SIGN);
        if (secret instanceof Promise) {
            secret.catch(() => { });
            this.logger.warn('For async version of "secretOrKeyProvider", please use "signAsync".');
            throw new jwt_errors_1.WrongSecretProviderError();
        }
        const allowedSignOptKeys = ['secret', 'privateKey'];
        const signOptKeys = Object.keys(signOptions);
        if (typeof payload === 'string' &&
            signOptKeys.some((k) => !allowedSignOptKeys.includes(k))) {
            throw new Error('Payload as string is not allowed with the following sign options: ' +
                signOptKeys.join(', '));
        }
        return jwt.sign(payload, secret, signOptions);
    }
    signAsync(payload, options) {
        const signOptions = this.mergeJwtOptions({ ...options }, 'signOptions');
        const secret = this.getSecretKey(payload, options, 'privateKey', interfaces_1.JwtSecretRequestType.SIGN);
        const allowedSignOptKeys = ['secret', 'privateKey'];
        const signOptKeys = Object.keys(signOptions);
        if (typeof payload === 'string' &&
            signOptKeys.some((k) => !allowedSignOptKeys.includes(k))) {
            throw new Error('Payload as string is not allowed with the following sign options: ' +
                signOptKeys.join(', '));
        }
        return new Promise((resolve, reject) => Promise.resolve()
            .then(() => secret)
            .then((scrt) => {
            jwt.sign(payload, scrt, signOptions, (err, encoded) => err ? reject(err) : resolve(encoded));
        }));
    }
    verify(token, options) {
        const verifyOptions = this.mergeJwtOptions({ ...options }, 'verifyOptions');
        const secret = this.getSecretKey(token, options, 'publicKey', interfaces_1.JwtSecretRequestType.VERIFY);
        if (secret instanceof Promise) {
            secret.catch(() => { });
            this.logger.warn('For async version of "secretOrKeyProvider", please use "verifyAsync".');
            throw new jwt_errors_1.WrongSecretProviderError();
        }
        return jwt.verify(token, secret, verifyOptions);
    }
    verifyAsync(token, options) {
        const verifyOptions = this.mergeJwtOptions({ ...options }, 'verifyOptions');
        const secret = this.getSecretKey(token, options, 'publicKey', interfaces_1.JwtSecretRequestType.VERIFY);
        return new Promise((resolve, reject) => Promise.resolve()
            .then(() => secret)
            .then((scrt) => {
            jwt.verify(token, scrt, verifyOptions, (err, decoded) => err ? reject(err) : resolve(decoded));
        })
            .catch(reject));
    }
    decode(token, options) {
        return jwt.decode(token, options);
    }
    mergeJwtOptions(options, key) {
        delete options.secret;
        if (key === 'signOptions') {
            delete options.privateKey;
        }
        else {
            delete options.publicKey;
        }
        return options
            ? {
                ...(this.options[key] || {}),
                ...options
            }
            : this.options[key];
    }
    overrideSecretFromOptions(secret) {
        if (this.options.secretOrPrivateKey) {
            this.logger.warn(`"secretOrPrivateKey" has been deprecated, please use the new explicit "secret" or use "secretOrKeyProvider" or "privateKey"/"publicKey" exclusively.`);
            secret = this.options.secretOrPrivateKey;
        }
        return secret;
    }
    getSecretKey(token, options, key, secretRequestType) {
        const secret = this.options.secretOrKeyProvider
            ? this.options.secretOrKeyProvider(secretRequestType, token, options)
            : options?.secret ||
                this.options.secret ||
                (key === 'privateKey'
                    ? options?.privateKey || this.options.privateKey
                    : options?.publicKey ||
                        this.options.publicKey) ||
                this.options[key];
        return secret instanceof Promise
            ? secret.then((sec) => this.overrideSecretFromOptions(sec))
            : this.overrideSecretFromOptions(secret);
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)(jwt_constants_1.JWT_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], JwtService);


/***/ }),
/* 186 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  decode: __webpack_require__(187),
  verify: __webpack_require__(201),
  sign: __webpack_require__(212),
  JsonWebTokenError: __webpack_require__(202),
  NotBeforeError: __webpack_require__(203),
  TokenExpiredError: __webpack_require__(204),
};


/***/ }),
/* 187 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var jws = __webpack_require__(188);

module.exports = function (jwt, options) {
  options = options || {};
  var decoded = jws.decode(jwt, options);
  if (!decoded) { return null; }
  var payload = decoded.payload;

  //try parse the payload
  if(typeof payload === 'string') {
    try {
      var obj = JSON.parse(payload);
      if(obj !== null && typeof obj === 'object') {
        payload = obj;
      }
    } catch (e) { }
  }

  //return header if `complete` option is enabled.  header includes claims
  //such as `kid` and `alg` used to select the key within a JWKS needed to
  //verify the signature
  if (options.complete === true) {
    return {
      header: decoded.header,
      payload: payload,
      signature: decoded.signature
    };
  }
  return payload;
};


/***/ }),
/* 188 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*global exports*/
var SignStream = __webpack_require__(189);
var VerifyStream = __webpack_require__(200);

var ALGORITHMS = [
  'HS256', 'HS384', 'HS512',
  'RS256', 'RS384', 'RS512',
  'PS256', 'PS384', 'PS512',
  'ES256', 'ES384', 'ES512'
];

exports.ALGORITHMS = ALGORITHMS;
exports.sign = SignStream.sign;
exports.verify = VerifyStream.verify;
exports.decode = VerifyStream.decode;
exports.isValid = VerifyStream.isValid;
exports.createSign = function createSign(opts) {
  return new SignStream(opts);
};
exports.createVerify = function createVerify(opts) {
  return new VerifyStream(opts);
};


/***/ }),
/* 189 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global module*/
var Buffer = (__webpack_require__(190).Buffer);
var DataStream = __webpack_require__(191);
var jwa = __webpack_require__(194);
var Stream = __webpack_require__(192);
var toString = __webpack_require__(199);
var util = __webpack_require__(193);

function base64url(string, encoding) {
  return Buffer
    .from(string, encoding)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function jwsSecuredInput(header, payload, encoding) {
  encoding = encoding || 'utf8';
  var encodedHeader = base64url(toString(header), 'binary');
  var encodedPayload = base64url(toString(payload), encoding);
  return util.format('%s.%s', encodedHeader, encodedPayload);
}

function jwsSign(opts) {
  var header = opts.header;
  var payload = opts.payload;
  var secretOrKey = opts.secret || opts.privateKey;
  var encoding = opts.encoding;
  var algo = jwa(header.alg);
  var securedInput = jwsSecuredInput(header, payload, encoding);
  var signature = algo.sign(securedInput, secretOrKey);
  return util.format('%s.%s', securedInput, signature);
}

function SignStream(opts) {
  var secret = opts.secret||opts.privateKey||opts.key;
  var secretStream = new DataStream(secret);
  this.readable = true;
  this.header = opts.header;
  this.encoding = opts.encoding;
  this.secret = this.privateKey = this.key = secretStream;
  this.payload = new DataStream(opts.payload);
  this.secret.once('close', function () {
    if (!this.payload.writable && this.readable)
      this.sign();
  }.bind(this));

  this.payload.once('close', function () {
    if (!this.secret.writable && this.readable)
      this.sign();
  }.bind(this));
}
util.inherits(SignStream, Stream);

SignStream.prototype.sign = function sign() {
  try {
    var signature = jwsSign({
      header: this.header,
      payload: this.payload.buffer,
      secret: this.secret.buffer,
      encoding: this.encoding
    });
    this.emit('done', signature);
    this.emit('data', signature);
    this.emit('end');
    this.readable = false;
    return signature;
  } catch (e) {
    this.readable = false;
    this.emit('error', e);
    this.emit('close');
  }
};

SignStream.sign = jwsSign;

module.exports = SignStream;


/***/ }),
/* 190 */
/***/ ((module) => {

"use strict";
module.exports = require("safe-buffer");

/***/ }),
/* 191 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global module, process*/
var Buffer = (__webpack_require__(190).Buffer);
var Stream = __webpack_require__(192);
var util = __webpack_require__(193);

function DataStream(data) {
  this.buffer = null;
  this.writable = true;
  this.readable = true;

  // No input
  if (!data) {
    this.buffer = Buffer.alloc(0);
    return this;
  }

  // Stream
  if (typeof data.pipe === 'function') {
    this.buffer = Buffer.alloc(0);
    data.pipe(this);
    return this;
  }

  // Buffer or String
  // or Object (assumedly a passworded key)
  if (data.length || typeof data === 'object') {
    this.buffer = data;
    this.writable = false;
    process.nextTick(function () {
      this.emit('end', data);
      this.readable = false;
      this.emit('close');
    }.bind(this));
    return this;
  }

  throw new TypeError('Unexpected data type ('+ typeof data + ')');
}
util.inherits(DataStream, Stream);

DataStream.prototype.write = function write(data) {
  this.buffer = Buffer.concat([this.buffer, Buffer.from(data)]);
  this.emit('data', data);
};

DataStream.prototype.end = function end(data) {
  if (data)
    this.write(data);
  this.emit('end', data);
  this.emit('close');
  this.writable = false;
  this.readable = false;
};

module.exports = DataStream;


/***/ }),
/* 192 */
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),
/* 193 */
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),
/* 194 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Buffer = (__webpack_require__(190).Buffer);
var crypto = __webpack_require__(15);
var formatEcdsa = __webpack_require__(195);
var util = __webpack_require__(193);

var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".'
var MSG_INVALID_SECRET = 'secret must be a string or buffer';
var MSG_INVALID_VERIFIER_KEY = 'key must be a string or a buffer';
var MSG_INVALID_SIGNER_KEY = 'key must be a string, a buffer or an object';

var supportsKeyObjects = typeof crypto.createPublicKey === 'function';
if (supportsKeyObjects) {
  MSG_INVALID_VERIFIER_KEY += ' or a KeyObject';
  MSG_INVALID_SECRET += 'or a KeyObject';
}

function checkIsPublicKey(key) {
  if (Buffer.isBuffer(key)) {
    return;
  }

  if (typeof key === 'string') {
    return;
  }

  if (!supportsKeyObjects) {
    throw typeError(MSG_INVALID_VERIFIER_KEY);
  }

  if (typeof key !== 'object') {
    throw typeError(MSG_INVALID_VERIFIER_KEY);
  }

  if (typeof key.type !== 'string') {
    throw typeError(MSG_INVALID_VERIFIER_KEY);
  }

  if (typeof key.asymmetricKeyType !== 'string') {
    throw typeError(MSG_INVALID_VERIFIER_KEY);
  }

  if (typeof key.export !== 'function') {
    throw typeError(MSG_INVALID_VERIFIER_KEY);
  }
};

function checkIsPrivateKey(key) {
  if (Buffer.isBuffer(key)) {
    return;
  }

  if (typeof key === 'string') {
    return;
  }

  if (typeof key === 'object') {
    return;
  }

  throw typeError(MSG_INVALID_SIGNER_KEY);
};

function checkIsSecretKey(key) {
  if (Buffer.isBuffer(key)) {
    return;
  }

  if (typeof key === 'string') {
    return key;
  }

  if (!supportsKeyObjects) {
    throw typeError(MSG_INVALID_SECRET);
  }

  if (typeof key !== 'object') {
    throw typeError(MSG_INVALID_SECRET);
  }

  if (key.type !== 'secret') {
    throw typeError(MSG_INVALID_SECRET);
  }

  if (typeof key.export !== 'function') {
    throw typeError(MSG_INVALID_SECRET);
  }
}

function fromBase64(base64) {
  return base64
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function toBase64(base64url) {
  base64url = base64url.toString();

  var padding = 4 - base64url.length % 4;
  if (padding !== 4) {
    for (var i = 0; i < padding; ++i) {
      base64url += '=';
    }
  }

  return base64url
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
}

function typeError(template) {
  var args = [].slice.call(arguments, 1);
  var errMsg = util.format.bind(util, template).apply(null, args);
  return new TypeError(errMsg);
}

function bufferOrString(obj) {
  return Buffer.isBuffer(obj) || typeof obj === 'string';
}

function normalizeInput(thing) {
  if (!bufferOrString(thing))
    thing = JSON.stringify(thing);
  return thing;
}

function createHmacSigner(bits) {
  return function sign(thing, secret) {
    checkIsSecretKey(secret);
    thing = normalizeInput(thing);
    var hmac = crypto.createHmac('sha' + bits, secret);
    var sig = (hmac.update(thing), hmac.digest('base64'))
    return fromBase64(sig);
  }
}

var bufferEqual;
var timingSafeEqual = 'timingSafeEqual' in crypto ? function timingSafeEqual(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return crypto.timingSafeEqual(a, b)
} : function timingSafeEqual(a, b) {
  if (!bufferEqual) {
    bufferEqual = __webpack_require__(197);
  }

  return bufferEqual(a, b)
}

function createHmacVerifier(bits) {
  return function verify(thing, signature, secret) {
    var computedSig = createHmacSigner(bits)(thing, secret);
    return timingSafeEqual(Buffer.from(signature), Buffer.from(computedSig));
  }
}

function createKeySigner(bits) {
 return function sign(thing, privateKey) {
    checkIsPrivateKey(privateKey);
    thing = normalizeInput(thing);
    // Even though we are specifying "RSA" here, this works with ECDSA
    // keys as well.
    var signer = crypto.createSign('RSA-SHA' + bits);
    var sig = (signer.update(thing), signer.sign(privateKey, 'base64'));
    return fromBase64(sig);
  }
}

function createKeyVerifier(bits) {
  return function verify(thing, signature, publicKey) {
    checkIsPublicKey(publicKey);
    thing = normalizeInput(thing);
    signature = toBase64(signature);
    var verifier = crypto.createVerify('RSA-SHA' + bits);
    verifier.update(thing);
    return verifier.verify(publicKey, signature, 'base64');
  }
}

function createPSSKeySigner(bits) {
  return function sign(thing, privateKey) {
    checkIsPrivateKey(privateKey);
    thing = normalizeInput(thing);
    var signer = crypto.createSign('RSA-SHA' + bits);
    var sig = (signer.update(thing), signer.sign({
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
    }, 'base64'));
    return fromBase64(sig);
  }
}

function createPSSKeyVerifier(bits) {
  return function verify(thing, signature, publicKey) {
    checkIsPublicKey(publicKey);
    thing = normalizeInput(thing);
    signature = toBase64(signature);
    var verifier = crypto.createVerify('RSA-SHA' + bits);
    verifier.update(thing);
    return verifier.verify({
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
    }, signature, 'base64');
  }
}

function createECDSASigner(bits) {
  var inner = createKeySigner(bits);
  return function sign() {
    var signature = inner.apply(null, arguments);
    signature = formatEcdsa.derToJose(signature, 'ES' + bits);
    return signature;
  };
}

function createECDSAVerifer(bits) {
  var inner = createKeyVerifier(bits);
  return function verify(thing, signature, publicKey) {
    signature = formatEcdsa.joseToDer(signature, 'ES' + bits).toString('base64');
    var result = inner(thing, signature, publicKey);
    return result;
  };
}

function createNoneSigner() {
  return function sign() {
    return '';
  }
}

function createNoneVerifier() {
  return function verify(thing, signature) {
    return signature === '';
  }
}

module.exports = function jwa(algorithm) {
  var signerFactories = {
    hs: createHmacSigner,
    rs: createKeySigner,
    ps: createPSSKeySigner,
    es: createECDSASigner,
    none: createNoneSigner,
  }
  var verifierFactories = {
    hs: createHmacVerifier,
    rs: createKeyVerifier,
    ps: createPSSKeyVerifier,
    es: createECDSAVerifer,
    none: createNoneVerifier,
  }
  var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
  if (!match)
    throw typeError(MSG_INVALID_ALGORITHM, algorithm);
  var algo = (match[1] || match[3]).toLowerCase();
  var bits = match[2];

  return {
    sign: signerFactories[algo](bits),
    verify: verifierFactories[algo](bits),
  }
};


/***/ }),
/* 195 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Buffer = (__webpack_require__(190).Buffer);

var getParamBytesForAlg = __webpack_require__(196);

var MAX_OCTET = 0x80,
	CLASS_UNIVERSAL = 0,
	PRIMITIVE_BIT = 0x20,
	TAG_SEQ = 0x10,
	TAG_INT = 0x02,
	ENCODED_TAG_SEQ = (TAG_SEQ | PRIMITIVE_BIT) | (CLASS_UNIVERSAL << 6),
	ENCODED_TAG_INT = TAG_INT | (CLASS_UNIVERSAL << 6);

function base64Url(base64) {
	return base64
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
}

function signatureAsBuffer(signature) {
	if (Buffer.isBuffer(signature)) {
		return signature;
	} else if ('string' === typeof signature) {
		return Buffer.from(signature, 'base64');
	}

	throw new TypeError('ECDSA signature must be a Base64 string or a Buffer');
}

function derToJose(signature, alg) {
	signature = signatureAsBuffer(signature);
	var paramBytes = getParamBytesForAlg(alg);

	// the DER encoded param should at most be the param size, plus a padding
	// zero, since due to being a signed integer
	var maxEncodedParamLength = paramBytes + 1;

	var inputLength = signature.length;

	var offset = 0;
	if (signature[offset++] !== ENCODED_TAG_SEQ) {
		throw new Error('Could not find expected "seq"');
	}

	var seqLength = signature[offset++];
	if (seqLength === (MAX_OCTET | 1)) {
		seqLength = signature[offset++];
	}

	if (inputLength - offset < seqLength) {
		throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
	}

	if (signature[offset++] !== ENCODED_TAG_INT) {
		throw new Error('Could not find expected "int" for "r"');
	}

	var rLength = signature[offset++];

	if (inputLength - offset - 2 < rLength) {
		throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
	}

	if (maxEncodedParamLength < rLength) {
		throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
	}

	var rOffset = offset;
	offset += rLength;

	if (signature[offset++] !== ENCODED_TAG_INT) {
		throw new Error('Could not find expected "int" for "s"');
	}

	var sLength = signature[offset++];

	if (inputLength - offset !== sLength) {
		throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
	}

	if (maxEncodedParamLength < sLength) {
		throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
	}

	var sOffset = offset;
	offset += sLength;

	if (offset !== inputLength) {
		throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
	}

	var rPadding = paramBytes - rLength,
		sPadding = paramBytes - sLength;

	var dst = Buffer.allocUnsafe(rPadding + rLength + sPadding + sLength);

	for (offset = 0; offset < rPadding; ++offset) {
		dst[offset] = 0;
	}
	signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);

	offset = paramBytes;

	for (var o = offset; offset < o + sPadding; ++offset) {
		dst[offset] = 0;
	}
	signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);

	dst = dst.toString('base64');
	dst = base64Url(dst);

	return dst;
}

function countPadding(buf, start, stop) {
	var padding = 0;
	while (start + padding < stop && buf[start + padding] === 0) {
		++padding;
	}

	var needsSign = buf[start + padding] >= MAX_OCTET;
	if (needsSign) {
		--padding;
	}

	return padding;
}

function joseToDer(signature, alg) {
	signature = signatureAsBuffer(signature);
	var paramBytes = getParamBytesForAlg(alg);

	var signatureBytes = signature.length;
	if (signatureBytes !== paramBytes * 2) {
		throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
	}

	var rPadding = countPadding(signature, 0, paramBytes);
	var sPadding = countPadding(signature, paramBytes, signature.length);
	var rLength = paramBytes - rPadding;
	var sLength = paramBytes - sPadding;

	var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;

	var shortLength = rsBytes < MAX_OCTET;

	var dst = Buffer.allocUnsafe((shortLength ? 2 : 3) + rsBytes);

	var offset = 0;
	dst[offset++] = ENCODED_TAG_SEQ;
	if (shortLength) {
		// Bit 8 has value "0"
		// bits 7-1 give the length.
		dst[offset++] = rsBytes;
	} else {
		// Bit 8 of first octet has value "1"
		// bits 7-1 give the number of additional length octets.
		dst[offset++] = MAX_OCTET	| 1;
		// length, base 256
		dst[offset++] = rsBytes & 0xff;
	}
	dst[offset++] = ENCODED_TAG_INT;
	dst[offset++] = rLength;
	if (rPadding < 0) {
		dst[offset++] = 0;
		offset += signature.copy(dst, offset, 0, paramBytes);
	} else {
		offset += signature.copy(dst, offset, rPadding, paramBytes);
	}
	dst[offset++] = ENCODED_TAG_INT;
	dst[offset++] = sLength;
	if (sPadding < 0) {
		dst[offset++] = 0;
		signature.copy(dst, offset, paramBytes);
	} else {
		signature.copy(dst, offset, paramBytes + sPadding);
	}

	return dst;
}

module.exports = {
	derToJose: derToJose,
	joseToDer: joseToDer
};


/***/ }),
/* 196 */
/***/ ((module) => {

"use strict";


function getParamSize(keySize) {
	var result = ((keySize / 8) | 0) + (keySize % 8 === 0 ? 0 : 1);
	return result;
}

var paramBytesForAlg = {
	ES256: getParamSize(256),
	ES384: getParamSize(384),
	ES512: getParamSize(521)
};

function getParamBytesForAlg(alg) {
	var paramBytes = paramBytesForAlg[alg];
	if (paramBytes) {
		return paramBytes;
	}

	throw new Error('Unknown algorithm "' + alg + '"');
}

module.exports = getParamBytesForAlg;


/***/ }),
/* 197 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*jshint node:true */

var Buffer = (__webpack_require__(198).Buffer); // browserify
var SlowBuffer = (__webpack_require__(198).SlowBuffer);

module.exports = bufferEq;

function bufferEq(a, b) {

  // shortcutting on type is necessary for correctness
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    return false;
  }

  // buffer sizes should be well-known information, so despite this
  // shortcutting, it doesn't leak any information about the *contents* of the
  // buffers.
  if (a.length !== b.length) {
    return false;
  }

  var c = 0;
  for (var i = 0; i < a.length; i++) {
    /*jshint bitwise:false */
    c |= a[i] ^ b[i]; // XOR
  }
  return c === 0;
}

bufferEq.install = function() {
  Buffer.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
    return bufferEq(this, that);
  };
};

var origBufEqual = Buffer.prototype.equal;
var origSlowBufEqual = SlowBuffer.prototype.equal;
bufferEq.restore = function() {
  Buffer.prototype.equal = origBufEqual;
  SlowBuffer.prototype.equal = origSlowBufEqual;
};


/***/ }),
/* 198 */
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),
/* 199 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global module*/
var Buffer = (__webpack_require__(198).Buffer);

module.exports = function toString(obj) {
  if (typeof obj === 'string')
    return obj;
  if (typeof obj === 'number' || Buffer.isBuffer(obj))
    return obj.toString();
  return JSON.stringify(obj);
};


/***/ }),
/* 200 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global module*/
var Buffer = (__webpack_require__(190).Buffer);
var DataStream = __webpack_require__(191);
var jwa = __webpack_require__(194);
var Stream = __webpack_require__(192);
var toString = __webpack_require__(199);
var util = __webpack_require__(193);
var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

function isObject(thing) {
  return Object.prototype.toString.call(thing) === '[object Object]';
}

function safeJsonParse(thing) {
  if (isObject(thing))
    return thing;
  try { return JSON.parse(thing); }
  catch (e) { return undefined; }
}

function headerFromJWS(jwsSig) {
  var encodedHeader = jwsSig.split('.', 1)[0];
  return safeJsonParse(Buffer.from(encodedHeader, 'base64').toString('binary'));
}

function securedInputFromJWS(jwsSig) {
  return jwsSig.split('.', 2).join('.');
}

function signatureFromJWS(jwsSig) {
  return jwsSig.split('.')[2];
}

function payloadFromJWS(jwsSig, encoding) {
  encoding = encoding || 'utf8';
  var payload = jwsSig.split('.')[1];
  return Buffer.from(payload, 'base64').toString(encoding);
}

function isValidJws(string) {
  return JWS_REGEX.test(string) && !!headerFromJWS(string);
}

function jwsVerify(jwsSig, algorithm, secretOrKey) {
  if (!algorithm) {
    var err = new Error("Missing algorithm parameter for jws.verify");
    err.code = "MISSING_ALGORITHM";
    throw err;
  }
  jwsSig = toString(jwsSig);
  var signature = signatureFromJWS(jwsSig);
  var securedInput = securedInputFromJWS(jwsSig);
  var algo = jwa(algorithm);
  return algo.verify(securedInput, signature, secretOrKey);
}

function jwsDecode(jwsSig, opts) {
  opts = opts || {};
  jwsSig = toString(jwsSig);

  if (!isValidJws(jwsSig))
    return null;

  var header = headerFromJWS(jwsSig);

  if (!header)
    return null;

  var payload = payloadFromJWS(jwsSig);
  if (header.typ === 'JWT' || opts.json)
    payload = JSON.parse(payload, opts.encoding);

  return {
    header: header,
    payload: payload,
    signature: signatureFromJWS(jwsSig)
  };
}

function VerifyStream(opts) {
  opts = opts || {};
  var secretOrKey = opts.secret||opts.publicKey||opts.key;
  var secretStream = new DataStream(secretOrKey);
  this.readable = true;
  this.algorithm = opts.algorithm;
  this.encoding = opts.encoding;
  this.secret = this.publicKey = this.key = secretStream;
  this.signature = new DataStream(opts.signature);
  this.secret.once('close', function () {
    if (!this.signature.writable && this.readable)
      this.verify();
  }.bind(this));

  this.signature.once('close', function () {
    if (!this.secret.writable && this.readable)
      this.verify();
  }.bind(this));
}
util.inherits(VerifyStream, Stream);
VerifyStream.prototype.verify = function verify() {
  try {
    var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
    var obj = jwsDecode(this.signature.buffer, this.encoding);
    this.emit('done', valid, obj);
    this.emit('data', valid);
    this.emit('end');
    this.readable = false;
    return valid;
  } catch (e) {
    this.readable = false;
    this.emit('error', e);
    this.emit('close');
  }
};

VerifyStream.decode = jwsDecode;
VerifyStream.isValid = isValidJws;
VerifyStream.verify = jwsVerify;

module.exports = VerifyStream;


/***/ }),
/* 201 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const JsonWebTokenError = __webpack_require__(202);
const NotBeforeError = __webpack_require__(203);
const TokenExpiredError = __webpack_require__(204);
const decode = __webpack_require__(187);
const timespan = __webpack_require__(205);
const validateAsymmetricKey = __webpack_require__(207);
const PS_SUPPORTED = __webpack_require__(211);
const jws = __webpack_require__(188);
const {KeyObject, createSecretKey, createPublicKey} = __webpack_require__(15);

const PUB_KEY_ALGS = ['RS256', 'RS384', 'RS512'];
const EC_KEY_ALGS = ['ES256', 'ES384', 'ES512'];
const RSA_KEY_ALGS = ['RS256', 'RS384', 'RS512'];
const HS_ALGS = ['HS256', 'HS384', 'HS512'];

if (PS_SUPPORTED) {
  PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, 'PS256', 'PS384', 'PS512');
  RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, 'PS256', 'PS384', 'PS512');
}

module.exports = function (jwtString, secretOrPublicKey, options, callback) {
  if ((typeof options === 'function') && !callback) {
    callback = options;
    options = {};
  }

  if (!options) {
    options = {};
  }

  //clone this object since we are going to mutate it.
  options = Object.assign({}, options);

  let done;

  if (callback) {
    done = callback;
  } else {
    done = function(err, data) {
      if (err) throw err;
      return data;
    };
  }

  if (options.clockTimestamp && typeof options.clockTimestamp !== 'number') {
    return done(new JsonWebTokenError('clockTimestamp must be a number'));
  }

  if (options.nonce !== undefined && (typeof options.nonce !== 'string' || options.nonce.trim() === '')) {
    return done(new JsonWebTokenError('nonce must be a non-empty string'));
  }

  if (options.allowInvalidAsymmetricKeyTypes !== undefined && typeof options.allowInvalidAsymmetricKeyTypes !== 'boolean') {
    return done(new JsonWebTokenError('allowInvalidAsymmetricKeyTypes must be a boolean'));
  }

  const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1000);

  if (!jwtString){
    return done(new JsonWebTokenError('jwt must be provided'));
  }

  if (typeof jwtString !== 'string') {
    return done(new JsonWebTokenError('jwt must be a string'));
  }

  const parts = jwtString.split('.');

  if (parts.length !== 3){
    return done(new JsonWebTokenError('jwt malformed'));
  }

  let decodedToken;

  try {
    decodedToken = decode(jwtString, { complete: true });
  } catch(err) {
    return done(err);
  }

  if (!decodedToken) {
    return done(new JsonWebTokenError('invalid token'));
  }

  const header = decodedToken.header;
  let getSecret;

  if(typeof secretOrPublicKey === 'function') {
    if(!callback) {
      return done(new JsonWebTokenError('verify must be called asynchronous if secret or public key is provided as a callback'));
    }

    getSecret = secretOrPublicKey;
  }
  else {
    getSecret = function(header, secretCallback) {
      return secretCallback(null, secretOrPublicKey);
    };
  }

  return getSecret(header, function(err, secretOrPublicKey) {
    if(err) {
      return done(new JsonWebTokenError('error in secret or public key callback: ' + err.message));
    }

    const hasSignature = parts[2].trim() !== '';

    if (!hasSignature && secretOrPublicKey){
      return done(new JsonWebTokenError('jwt signature is required'));
    }

    if (hasSignature && !secretOrPublicKey) {
      return done(new JsonWebTokenError('secret or public key must be provided'));
    }

    if (!hasSignature && !options.algorithms) {
      return done(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
    }

    if (secretOrPublicKey != null && !(secretOrPublicKey instanceof KeyObject)) {
      try {
        secretOrPublicKey = createPublicKey(secretOrPublicKey);
      } catch (_) {
        try {
          secretOrPublicKey = createSecretKey(typeof secretOrPublicKey === 'string' ? Buffer.from(secretOrPublicKey) : secretOrPublicKey);
        } catch (_) {
          return done(new JsonWebTokenError('secretOrPublicKey is not valid key material'))
        }
      }
    }

    if (!options.algorithms) {
      if (secretOrPublicKey.type === 'secret') {
        options.algorithms = HS_ALGS;
      } else if (['rsa', 'rsa-pss'].includes(secretOrPublicKey.asymmetricKeyType)) {
        options.algorithms = RSA_KEY_ALGS
      } else if (secretOrPublicKey.asymmetricKeyType === 'ec') {
        options.algorithms = EC_KEY_ALGS
      } else {
        options.algorithms = PUB_KEY_ALGS
      }
    }

    if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
      return done(new JsonWebTokenError('invalid algorithm'));
    }

    if (header.alg.startsWith('HS') && secretOrPublicKey.type !== 'secret') {
      return done(new JsonWebTokenError((`secretOrPublicKey must be a symmetric key when using ${header.alg}`)))
    } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey.type !== 'public') {
      return done(new JsonWebTokenError((`secretOrPublicKey must be an asymmetric key when using ${header.alg}`)))
    }

    if (!options.allowInvalidAsymmetricKeyTypes) {
      try {
        validateAsymmetricKey(header.alg, secretOrPublicKey);
      } catch (e) {
        return done(e);
      }
    }

    let valid;

    try {
      valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey);
    } catch (e) {
      return done(e);
    }

    if (!valid) {
      return done(new JsonWebTokenError('invalid signature'));
    }

    const payload = decodedToken.payload;

    if (typeof payload.nbf !== 'undefined' && !options.ignoreNotBefore) {
      if (typeof payload.nbf !== 'number') {
        return done(new JsonWebTokenError('invalid nbf value'));
      }
      if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
        return done(new NotBeforeError('jwt not active', new Date(payload.nbf * 1000)));
      }
    }

    if (typeof payload.exp !== 'undefined' && !options.ignoreExpiration) {
      if (typeof payload.exp !== 'number') {
        return done(new JsonWebTokenError('invalid exp value'));
      }
      if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
        return done(new TokenExpiredError('jwt expired', new Date(payload.exp * 1000)));
      }
    }

    if (options.audience) {
      const audiences = Array.isArray(options.audience) ? options.audience : [options.audience];
      const target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];

      const match = target.some(function (targetAudience) {
        return audiences.some(function (audience) {
          return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
        });
      });

      if (!match) {
        return done(new JsonWebTokenError('jwt audience invalid. expected: ' + audiences.join(' or ')));
      }
    }

    if (options.issuer) {
      const invalid_issuer =
              (typeof options.issuer === 'string' && payload.iss !== options.issuer) ||
              (Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1);

      if (invalid_issuer) {
        return done(new JsonWebTokenError('jwt issuer invalid. expected: ' + options.issuer));
      }
    }

    if (options.subject) {
      if (payload.sub !== options.subject) {
        return done(new JsonWebTokenError('jwt subject invalid. expected: ' + options.subject));
      }
    }

    if (options.jwtid) {
      if (payload.jti !== options.jwtid) {
        return done(new JsonWebTokenError('jwt jwtid invalid. expected: ' + options.jwtid));
      }
    }

    if (options.nonce) {
      if (payload.nonce !== options.nonce) {
        return done(new JsonWebTokenError('jwt nonce invalid. expected: ' + options.nonce));
      }
    }

    if (options.maxAge) {
      if (typeof payload.iat !== 'number') {
        return done(new JsonWebTokenError('iat required when maxAge is specified'));
      }

      const maxAgeTimestamp = timespan(options.maxAge, payload.iat);
      if (typeof maxAgeTimestamp === 'undefined') {
        return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
      }
      if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
        return done(new TokenExpiredError('maxAge exceeded', new Date(maxAgeTimestamp * 1000)));
      }
    }

    if (options.complete === true) {
      const signature = decodedToken.signature;

      return done(null, {
        header: header,
        payload: payload,
        signature: signature
      });
    }

    return done(null, payload);
  });
};


/***/ }),
/* 202 */
/***/ ((module) => {

var JsonWebTokenError = function (message, error) {
  Error.call(this, message);
  if(Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }
  this.name = 'JsonWebTokenError';
  this.message = message;
  if (error) this.inner = error;
};

JsonWebTokenError.prototype = Object.create(Error.prototype);
JsonWebTokenError.prototype.constructor = JsonWebTokenError;

module.exports = JsonWebTokenError;


/***/ }),
/* 203 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JsonWebTokenError = __webpack_require__(202);

var NotBeforeError = function (message, date) {
  JsonWebTokenError.call(this, message);
  this.name = 'NotBeforeError';
  this.date = date;
};

NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);

NotBeforeError.prototype.constructor = NotBeforeError;

module.exports = NotBeforeError;

/***/ }),
/* 204 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JsonWebTokenError = __webpack_require__(202);

var TokenExpiredError = function (message, expiredAt) {
  JsonWebTokenError.call(this, message);
  this.name = 'TokenExpiredError';
  this.expiredAt = expiredAt;
};

TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);

TokenExpiredError.prototype.constructor = TokenExpiredError;

module.exports = TokenExpiredError;

/***/ }),
/* 205 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ms = __webpack_require__(206);

module.exports = function (time, iat) {
  var timestamp = iat || Math.floor(Date.now() / 1000);

  if (typeof time === 'string') {
    var milliseconds = ms(time);
    if (typeof milliseconds === 'undefined') {
      return;
    }
    return Math.floor(timestamp + milliseconds / 1000);
  } else if (typeof time === 'number') {
    return timestamp + time;
  } else {
    return;
  }

};

/***/ }),
/* 206 */
/***/ ((module) => {

"use strict";
module.exports = require("ms");

/***/ }),
/* 207 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ASYMMETRIC_KEY_DETAILS_SUPPORTED = __webpack_require__(208);
const RSA_PSS_KEY_DETAILS_SUPPORTED = __webpack_require__(210);

const allowedAlgorithmsForKeys = {
  'ec': ['ES256', 'ES384', 'ES512'],
  'rsa': ['RS256', 'PS256', 'RS384', 'PS384', 'RS512', 'PS512'],
  'rsa-pss': ['PS256', 'PS384', 'PS512']
};

const allowedCurves = {
  ES256: 'prime256v1',
  ES384: 'secp384r1',
  ES512: 'secp521r1',
};

module.exports = function(algorithm, key) {
  if (!algorithm || !key) return;

  const keyType = key.asymmetricKeyType;
  if (!keyType) return;

  const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];

  if (!allowedAlgorithms) {
    throw new Error(`Unknown key type "${keyType}".`);
  }

  if (!allowedAlgorithms.includes(algorithm)) {
    throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(', ')}.`)
  }

  /*
   * Ignore the next block from test coverage because it gets executed
   * conditionally depending on the Node version. Not ignoring it would
   * prevent us from reaching the target % of coverage for versions of
   * Node under 15.7.0.
   */
  /* istanbul ignore next */
  if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
    switch (keyType) {
    case 'ec':
      const keyCurve = key.asymmetricKeyDetails.namedCurve;
      const allowedCurve = allowedCurves[algorithm];

      if (keyCurve !== allowedCurve) {
        throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
      }
      break;

    case 'rsa-pss':
      if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
        const length = parseInt(algorithm.slice(-3), 10);
        const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;

        if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
          throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
        }

        if (saltLength !== undefined && saltLength > length >> 3) {
          throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`)
        }
      }
      break;
    }
  }
}


/***/ }),
/* 208 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const semver = __webpack_require__(209);

module.exports = semver.satisfies(process.version, '>=15.7.0');


/***/ }),
/* 209 */
/***/ ((module) => {

"use strict";
module.exports = require("semver");

/***/ }),
/* 210 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const semver = __webpack_require__(209);

module.exports = semver.satisfies(process.version, '>=16.9.0');


/***/ }),
/* 211 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var semver = __webpack_require__(209);

module.exports = semver.satisfies(process.version, '^6.12.0 || >=8.0.0');


/***/ }),
/* 212 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const timespan = __webpack_require__(205);
const PS_SUPPORTED = __webpack_require__(211);
const validateAsymmetricKey = __webpack_require__(207);
const jws = __webpack_require__(188);
const includes = __webpack_require__(213);
const isBoolean = __webpack_require__(214);
const isInteger = __webpack_require__(215);
const isNumber = __webpack_require__(216);
const isPlainObject = __webpack_require__(217);
const isString = __webpack_require__(218);
const once = __webpack_require__(219);
const { KeyObject, createSecretKey, createPrivateKey } = __webpack_require__(15)

const SUPPORTED_ALGS = ['RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'HS256', 'HS384', 'HS512', 'none'];
if (PS_SUPPORTED) {
  SUPPORTED_ALGS.splice(3, 0, 'PS256', 'PS384', 'PS512');
}

const sign_options_schema = {
  expiresIn: { isValid: function(value) { return isInteger(value) || (isString(value) && value); }, message: '"expiresIn" should be a number of seconds or string representing a timespan' },
  notBefore: { isValid: function(value) { return isInteger(value) || (isString(value) && value); }, message: '"notBefore" should be a number of seconds or string representing a timespan' },
  audience: { isValid: function(value) { return isString(value) || Array.isArray(value); }, message: '"audience" must be a string or array' },
  algorithm: { isValid: includes.bind(null, SUPPORTED_ALGS), message: '"algorithm" must be a valid string enum value' },
  header: { isValid: isPlainObject, message: '"header" must be an object' },
  encoding: { isValid: isString, message: '"encoding" must be a string' },
  issuer: { isValid: isString, message: '"issuer" must be a string' },
  subject: { isValid: isString, message: '"subject" must be a string' },
  jwtid: { isValid: isString, message: '"jwtid" must be a string' },
  noTimestamp: { isValid: isBoolean, message: '"noTimestamp" must be a boolean' },
  keyid: { isValid: isString, message: '"keyid" must be a string' },
  mutatePayload: { isValid: isBoolean, message: '"mutatePayload" must be a boolean' },
  allowInsecureKeySizes: { isValid: isBoolean, message: '"allowInsecureKeySizes" must be a boolean'},
  allowInvalidAsymmetricKeyTypes: { isValid: isBoolean, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean'}
};

const registered_claims_schema = {
  iat: { isValid: isNumber, message: '"iat" should be a number of seconds' },
  exp: { isValid: isNumber, message: '"exp" should be a number of seconds' },
  nbf: { isValid: isNumber, message: '"nbf" should be a number of seconds' }
};

function validate(schema, allowUnknown, object, parameterName) {
  if (!isPlainObject(object)) {
    throw new Error('Expected "' + parameterName + '" to be a plain object.');
  }
  Object.keys(object)
    .forEach(function(key) {
      const validator = schema[key];
      if (!validator) {
        if (!allowUnknown) {
          throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
        }
        return;
      }
      if (!validator.isValid(object[key])) {
        throw new Error(validator.message);
      }
    });
}

function validateOptions(options) {
  return validate(sign_options_schema, false, options, 'options');
}

function validatePayload(payload) {
  return validate(registered_claims_schema, true, payload, 'payload');
}

const options_to_payload = {
  'audience': 'aud',
  'issuer': 'iss',
  'subject': 'sub',
  'jwtid': 'jti'
};

const options_for_objects = [
  'expiresIn',
  'notBefore',
  'noTimestamp',
  'audience',
  'issuer',
  'subject',
  'jwtid',
];

module.exports = function (payload, secretOrPrivateKey, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else {
    options = options || {};
  }

  const isObjectPayload = typeof payload === 'object' &&
                        !Buffer.isBuffer(payload);

  const header = Object.assign({
    alg: options.algorithm || 'HS256',
    typ: isObjectPayload ? 'JWT' : undefined,
    kid: options.keyid
  }, options.header);

  function failure(err) {
    if (callback) {
      return callback(err);
    }
    throw err;
  }

  if (!secretOrPrivateKey && options.algorithm !== 'none') {
    return failure(new Error('secretOrPrivateKey must have a value'));
  }

  if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
    try {
      secretOrPrivateKey = createPrivateKey(secretOrPrivateKey)
    } catch (_) {
      try {
        secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === 'string' ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey)
      } catch (_) {
        return failure(new Error('secretOrPrivateKey is not valid key material'));
      }
    }
  }

  if (header.alg.startsWith('HS') && secretOrPrivateKey.type !== 'secret') {
    return failure(new Error((`secretOrPrivateKey must be a symmetric key when using ${header.alg}`)))
  } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
    if (secretOrPrivateKey.type !== 'private') {
      return failure(new Error((`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`)))
    }
    if (!options.allowInsecureKeySizes &&
      !header.alg.startsWith('ES') &&
      secretOrPrivateKey.asymmetricKeyDetails !== undefined && //KeyObject.asymmetricKeyDetails is supported in Node 15+
      secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
      return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
    }
  }

  if (typeof payload === 'undefined') {
    return failure(new Error('payload is required'));
  } else if (isObjectPayload) {
    try {
      validatePayload(payload);
    }
    catch (error) {
      return failure(error);
    }
    if (!options.mutatePayload) {
      payload = Object.assign({},payload);
    }
  } else {
    const invalid_options = options_for_objects.filter(function (opt) {
      return typeof options[opt] !== 'undefined';
    });

    if (invalid_options.length > 0) {
      return failure(new Error('invalid ' + invalid_options.join(',') + ' option for ' + (typeof payload ) + ' payload'));
    }
  }

  if (typeof payload.exp !== 'undefined' && typeof options.expiresIn !== 'undefined') {
    return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
  }

  if (typeof payload.nbf !== 'undefined' && typeof options.notBefore !== 'undefined') {
    return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
  }

  try {
    validateOptions(options);
  }
  catch (error) {
    return failure(error);
  }

  if (!options.allowInvalidAsymmetricKeyTypes) {
    try {
      validateAsymmetricKey(header.alg, secretOrPrivateKey);
    } catch (error) {
      return failure(error);
    }
  }

  const timestamp = payload.iat || Math.floor(Date.now() / 1000);

  if (options.noTimestamp) {
    delete payload.iat;
  } else if (isObjectPayload) {
    payload.iat = timestamp;
  }

  if (typeof options.notBefore !== 'undefined') {
    try {
      payload.nbf = timespan(options.notBefore, timestamp);
    }
    catch (err) {
      return failure(err);
    }
    if (typeof payload.nbf === 'undefined') {
      return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
    }
  }

  if (typeof options.expiresIn !== 'undefined' && typeof payload === 'object') {
    try {
      payload.exp = timespan(options.expiresIn, timestamp);
    }
    catch (err) {
      return failure(err);
    }
    if (typeof payload.exp === 'undefined') {
      return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
    }
  }

  Object.keys(options_to_payload).forEach(function (key) {
    const claim = options_to_payload[key];
    if (typeof options[key] !== 'undefined') {
      if (typeof payload[claim] !== 'undefined') {
        return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
      }
      payload[claim] = options[key];
    }
  });

  const encoding = options.encoding || 'utf8';

  if (typeof callback === 'function') {
    callback = callback && once(callback);

    jws.createSign({
      header: header,
      privateKey: secretOrPrivateKey,
      payload: payload,
      encoding: encoding
    }).once('error', callback)
      .once('done', function (signature) {
        // TODO: Remove in favor of the modulus length check before signing once node 15+ is the minimum supported version
        if(!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
          return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`))
        }
        callback(null, signature);
      });
  } else {
    let signature = jws.sign({header: header, payload: payload, secret: secretOrPrivateKey, encoding: encoding});
    // TODO: Remove in favor of the modulus length check before signing once node 15+ is the minimum supported version
    if(!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
      throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`)
    }
    return signature
  }
};


/***/ }),
/* 213 */
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = includes;


/***/ }),
/* 214 */
/***/ ((module) => {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && objectToString.call(value) == boolTag);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isBoolean;


/***/ }),
/* 215 */
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = isInteger;


/***/ }),
/* 216 */
/***/ ((module) => {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && objectToString.call(value) == numberTag);
}

module.exports = isNumber;


/***/ }),
/* 217 */
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;


/***/ }),
/* 218 */
/***/ ((module) => {

/**
 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;


/***/ }),
/* 219 */
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery(element).on('click', _.before(5, addContactToList));
 * // => Allows adding up to 4 contacts to the list.
 */
function before(n, func) {
  var result;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = undefined;
    }
    return result;
  };
}

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 */
function once(func) {
  return before(2, func);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = once;


/***/ }),
/* 220 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerProfileController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(42);
const customer_auth_guard_1 = __webpack_require__(221);
const customer_auth_service_1 = __webpack_require__(222);
const customer_dto_1 = __webpack_require__(173);
const auth_dto_1 = __webpack_require__(223);
const response_dto_1 = __webpack_require__(174);
let CustomerProfileController = class CustomerProfileController {
    customerAuthService;
    constructor(customerAuthService) {
        this.customerAuthService = customerAuthService;
    }
    async getMyProfile(req) {
        const customer = await this.customerAuthService.getCustomerById(req.customer.sub);
        return {
            message: 'Customer profile retrieved successfully',
            data: customer,
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
    async updateMyProfile(req, body) {
        const customer = await this.customerAuthService.updateCustomer(req.customer.sub, body);
        return {
            message: 'Customer profile updated successfully',
            data: customer,
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
    async changePassword(req, body) {
        await this.customerAuthService.changePassword(req.customer.sub, body.currentPassword, body.newPassword);
        return {
            message: 'Password changed successfully',
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
};
exports.CustomerProfileController = CustomerProfileController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get current customer profile',
        description: 'Retrieves the profile information of the authenticated customer.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer profile retrieved successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CustomerProfileController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Put)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update current customer profile',
        description: 'Updates the profile information of the authenticated customer.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer profile updated successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Email already exists'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof customer_dto_1.UpdateCustomerDto !== "undefined" && customer_dto_1.UpdateCustomerDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CustomerProfileController.prototype, "updateMyProfile", null);
__decorate([
    (0, common_1.Put)('me/change-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Change customer password',
        description: 'Changes the password of the authenticated customer.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Password changed successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid current password or new password'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof auth_dto_1.ChangePasswordDto !== "undefined" && auth_dto_1.ChangePasswordDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CustomerProfileController.prototype, "changePassword", null);
exports.CustomerProfileController = CustomerProfileController = __decorate([
    (0, swagger_1.ApiTags)('customer-profile'),
    (0, common_1.Controller)('customer-profile'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof customer_auth_service_1.CustomerAuthService !== "undefined" && customer_auth_service_1.CustomerAuthService) === "function" ? _a : Object])
], CustomerProfileController);


/***/ }),
/* 221 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const customer_auth_service_1 = __webpack_require__(222);
let CustomerAuthGuard = class CustomerAuthGuard {
    customerAuthService;
    constructor(customerAuthService) {
        this.customerAuthService = customerAuthService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        if (!token) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        try {
            const payload = await this.customerAuthService.validateToken(token);
            request.customer = payload;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    extractTokenFromRequest(request) {
        const authHeader = request.headers.authorization;
        if (authHeader) {
            const [type, token] = authHeader.split(' ');
            if (type === 'Bearer') {
                return token;
            }
        }
        const cookieToken = request.cookies?.customer_token;
        if (cookieToken) {
            return cookieToken;
        }
        return undefined;
    }
};
exports.CustomerAuthGuard = CustomerAuthGuard;
exports.CustomerAuthGuard = CustomerAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof customer_auth_service_1.CustomerAuthService !== "undefined" && customer_auth_service_1.CustomerAuthService) === "function" ? _a : Object])
], CustomerAuthGuard);


/***/ }),
/* 222 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerAuthService = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(177);
const prisma_service_1 = __webpack_require__(152);
const bcrypt = __importStar(__webpack_require__(169));
let CustomerAuthService = class CustomerAuthService {
    prisma;
    jwtService;
    blockedTokens = new Set();
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerCustomer(data) {
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { email: data.email },
        });
        if (existingCustomer) {
            throw new common_1.UnauthorizedException('Customer with this email already exists');
        }
        const hashed = await bcrypt.hash(data.password, 5);
        const customer = await this.prisma.customer.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashed,
                phone: data.phone,
                address: data.address,
            },
        });
        return customer;
    }
    async loginCustomer(email, password) {
        const customer = await this.prisma.customer.findUnique({
            where: { email },
        });
        if (!customer)
            throw new common_1.UnauthorizedException('Invalid customer credentials');
        const match = await bcrypt.compare(password, customer.password);
        if (!match)
            throw new common_1.UnauthorizedException('Invalid customer credentials');
        const token = this.jwtService.sign({
            sub: customer.id,
            type: 'customer',
            email: customer.email
        });
        return { token, customer };
    }
    async logoutWithCredentials(email, password) {
        const customer = await this.prisma.customer.findUnique({
            where: { email },
        });
        if (!customer) {
            throw new common_1.UnauthorizedException('Invalid customer credentials');
        }
        const match = await bcrypt.compare(password, customer.password);
        if (!match) {
            throw new common_1.UnauthorizedException('Invalid customer credentials');
        }
        return { message: 'Customer logged out successfully' };
    }
    async logout(token) {
        this.blockedTokens.add(token);
        if (this.blockedTokens.size > 1000) {
            this.blockedTokens.clear();
        }
    }
    async validateToken(token) {
        if (this.blockedTokens.has(token)) {
            throw new common_1.UnauthorizedException('Token blocked');
        }
        try {
            const payload = this.jwtService.verify(token);
            if (payload.type !== 'customer') {
                throw new common_1.UnauthorizedException('Invalid token type');
            }
            return payload;
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async getCustomerById(id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        return customer;
    }
    async updateCustomer(customerId, data) {
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { id: customerId },
        });
        if (!existingCustomer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        if (data.email && data.email !== existingCustomer.email) {
            const emailExists = await this.prisma.customer.findUnique({
                where: { email: data.email },
            });
            if (emailExists) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        const updatedCustomer = await this.prisma.customer.update({
            where: { id: customerId },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return updatedCustomer;
    }
    async changePassword(customerId, currentPassword, newPassword) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const match = await bcrypt.compare(currentPassword, customer.password);
        if (!match) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.customer.update({
            where: { id: customerId },
            data: { password: hashedNewPassword },
        });
        return { message: 'Password changed successfully' };
    }
};
exports.CustomerAuthService = CustomerAuthService;
exports.CustomerAuthService = CustomerAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], CustomerAuthService);


/***/ }),
/* 223 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordDto = exports.LogoutDto = exports.LoginCustomerDto = exports.LoginAdminDto = void 0;
const class_validator_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'class-validator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const swagger_1 = __webpack_require__(42);
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


/***/ }),
/* 224 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(152);
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 225 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(177);
const passport_1 = __webpack_require__(226);
const auth_controller_1 = __webpack_require__(252);
const admin_auth_service_1 = __webpack_require__(176);
const customer_auth_service_1 = __webpack_require__(222);
const admin_auth_guard_1 = __webpack_require__(175);
const customer_auth_guard_1 = __webpack_require__(221);
const prisma_module_1 = __webpack_require__(224);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'your-secret-key',
                signOptions: { expiresIn: '24h' },
            }),
            prisma_module_1.PrismaModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            admin_auth_service_1.AdminAuthService,
            customer_auth_service_1.CustomerAuthService,
            admin_auth_guard_1.AdminAuthGuard,
            customer_auth_guard_1.CustomerAuthGuard,
        ],
        exports: [
            admin_auth_service_1.AdminAuthService,
            customer_auth_service_1.CustomerAuthService,
            admin_auth_guard_1.AdminAuthGuard,
            customer_auth_guard_1.CustomerAuthGuard,
        ],
    })
], AuthModule);


/***/ }),
/* 226 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(227));


/***/ }),
/* 227 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(228), exports);
__exportStar(__webpack_require__(229), exports);
__exportStar(__webpack_require__(247), exports);
__exportStar(__webpack_require__(249), exports);
__exportStar(__webpack_require__(250), exports);
__exportStar(__webpack_require__(251), exports);


/***/ }),
/* 228 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractStrategy = void 0;
class AbstractStrategy {
}
exports.AbstractStrategy = AbstractStrategy;


/***/ }),
/* 229 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const common_1 = __webpack_require__(3);
const passport = __webpack_require__(230);
const auth_module_options_1 = __webpack_require__(244);
const options_1 = __webpack_require__(245);
const memoize_util_1 = __webpack_require__(246);
exports.AuthGuard = (0, memoize_util_1.memoize)(createAuthGuard);
const NO_STRATEGY_ERROR = `In order to use "defaultStrategy", please, ensure to import PassportModule in each place where AuthGuard() is being used. Otherwise, passport won't work correctly.`;
const authLogger = new common_1.Logger('AuthGuard');
function createAuthGuard(type) {
    let MixinAuthGuard = class MixinAuthGuard {
        constructor(options) {
            this.options = {};
            this.options = options ?? this.options;
            if (!type && !this.options.defaultStrategy) {
                authLogger.error(NO_STRATEGY_ERROR);
            }
        }
        async canActivate(context) {
            const options = {
                ...options_1.defaultOptions,
                ...this.options,
                ...(await this.getAuthenticateOptions(context))
            };
            const [request, response] = [
                this.getRequest(context),
                this.getResponse(context)
            ];
            const passportFn = createPassportContext(request, response);
            const user = await passportFn(type || this.options.defaultStrategy, options, (err, user, info, status) => this.handleRequest(err, user, info, context, status));
            request[options.property || options_1.defaultOptions.property] = user;
            return true;
        }
        getRequest(context) {
            return context.switchToHttp().getRequest();
        }
        getResponse(context) {
            return context.switchToHttp().getResponse();
        }
        async logIn(request) {
            const user = request[this.options.property || options_1.defaultOptions.property];
            await new Promise((resolve, reject) => request.logIn(user, this.options, (err) => err ? reject(err) : resolve()));
        }
        handleRequest(err, user, info, context, status) {
            if (err || !user) {
                throw err || new common_1.UnauthorizedException();
            }
            return user;
        }
        getAuthenticateOptions(context) {
            return undefined;
        }
    };
    __decorate([
        (0, common_1.Optional)(),
        (0, common_1.Inject)(auth_module_options_1.AuthModuleOptions),
        __metadata("design:type", auth_module_options_1.AuthModuleOptions)
    ], MixinAuthGuard.prototype, "options", void 0);
    MixinAuthGuard = __decorate([
        __param(0, (0, common_1.Optional)()),
        __metadata("design:paramtypes", [auth_module_options_1.AuthModuleOptions])
    ], MixinAuthGuard);
    const guard = (0, common_1.mixin)(MixinAuthGuard);
    return guard;
}
const createPassportContext = (request, response) => (type, options, callback) => new Promise((resolve, reject) => passport.authenticate(type, options, (err, user, info, status) => {
    try {
        request.authInfo = info;
        return resolve(callback(err, user, info, status));
    }
    catch (err) {
        reject(err);
    }
})(request, response, (err) => (err ? reject(err) : resolve())));


/***/ }),
/* 230 */
/***/ ((module, exports, __webpack_require__) => {

// Module dependencies.
var Passport = __webpack_require__(231)
  , SessionStrategy = __webpack_require__(232);


/**
 * Export default singleton.
 *
 * @api public
 */
exports = module.exports = new Passport();

/**
 * Expose constructors.
 */
exports.Passport =
exports.Authenticator = Passport;
exports.Strategy = __webpack_require__(234);

/*
 * Expose strategies.
 */
exports.strategies = {};
exports.strategies.SessionStrategy = SessionStrategy;


/***/ }),
/* 231 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Module dependencies.
var SessionStrategy = __webpack_require__(232)
  , SessionManager = __webpack_require__(236);


/**
 * Create a new `Authenticator` object.
 *
 * @public
 * @class
 */
function Authenticator() {
  this._key = 'passport';
  this._strategies = {};
  this._serializers = [];
  this._deserializers = [];
  this._infoTransformers = [];
  this._framework = null;
  
  this.init();
}

/**
 * Initialize authenticator.
 *
 * Initializes the `Authenticator` instance by creating the default `{@link SessionManager}`,
 * {@link Authenticator#use `use()`}'ing the default `{@link SessionStrategy}`, and
 * adapting it to work as {@link https://github.com/senchalabs/connect#readme Connect}-style
 * middleware, which is also compatible with {@link https://expressjs.com/ Express}.
 *
 * @private
 */
Authenticator.prototype.init = function() {
  this.framework(__webpack_require__(238)());
  this.use(new SessionStrategy({ key: this._key }, this.deserializeUser.bind(this)));
  this._sm = new SessionManager({ key: this._key }, this.serializeUser.bind(this));
};

/**
 * Register a strategy for later use when authenticating requests.  The name
 * with which the strategy is registered is passed to {@link Authenticator#authenticate `authenticate()`}.
 *
 * @public
 * @param {string} [name=strategy.name] - Name of the strategy.  When specified,
 *          this value overrides the strategy's name.
 * @param {Strategy} strategy - Authentication strategy.
 * @returns {this}
 *
 * @example <caption>Register strategy.</caption>
 * passport.use(new GoogleStrategy(...));
 *
 * @example <caption>Register strategy and override name.</caption>
 * passport.use('password', new LocalStrategy(function(username, password, cb) {
 *   // ...
 * }));
 */
Authenticator.prototype.use = function(name, strategy) {
  if (!strategy) {
    strategy = name;
    name = strategy.name;
  }
  if (!name) { throw new Error('Authentication strategies must have a name'); }
  
  this._strategies[name] = strategy;
  return this;
};

/**
 * Deregister a strategy that was previously registered with the given name.
 *
 * In a typical application, the necessary authentication strategies are
 * registered when initializing the app and, once registered, are always
 * available.  As such, it is typically not necessary to call this function.
 *
 * @public
 * @param {string} name - Name of the strategy.
 * @returns {this}
 *
 * @example
 * passport.unuse('acme');
 */
Authenticator.prototype.unuse = function(name) {
  delete this._strategies[name];
  return this;
};

/**
 * Adapt this `Authenticator` to work with a specific framework.
 *
 * By default, Passport works as {@link https://github.com/senchalabs/connect#readme Connect}-style
 * middleware, which makes it compatible with {@link https://expressjs.com/ Express}.
 * For any app built using Express, there is no need to call this function.
 *
 * @public
 * @param {Object} fw
 * @returns {this}
 */
Authenticator.prototype.framework = function(fw) {
  this._framework = fw;
  return this;
};

/**
 * Create initialization middleware.
 *
 * Returns middleware that initializes Passport to authenticate requests.
 *
 * As of v0.6.x, it is typically no longer necessary to use this middleware.  It
 * exists for compatiblity with apps built using previous versions of Passport,
 * in which this middleware was necessary.
 *
 * The primary exception to the above guidance is when using strategies that
 * depend directly on `passport@0.4.x` or earlier.  These earlier versions of
 * Passport monkeypatch Node.js `http.IncomingMessage` in a way that expects
 * certain Passport-specific properties to be available.  This middleware
 * provides a compatibility layer for this situation.
 *
 * @public
 * @param {Object} [options]
 * @param {string} [options.userProperty='user'] - Determines what property on
 *          `req` will be set to the authenticated user object.
 * @param {boolean} [options.compat=true] - When `true`, enables a compatibility
 *          layer for packages that depend on `passport@0.4.x` or earlier.
 * @returns {function}
 *
 * @example
 * app.use(passport.initialize());
 */
Authenticator.prototype.initialize = function(options) {
  options = options || {};
  return this._framework.initialize(this, options);
};

/**
 * Create authentication middleware.
 *
 * Returns middleware that authenticates the request by applying the given
 * strategy (or strategies).
 *
 * Examples:
 *
 *     passport.authenticate('local', function(err, user) {
 *       if (!user) { return res.redirect('/login'); }
 *       res.end('Authenticated!');
 *     })(req, res);
 *
 * @public
 * @param {string|string[]|Strategy} strategy
 * @param {Object} [options]
 * @param {boolean} [options.session=true]
 * @param {boolean} [options.keepSessionInfo=false]
 * @param {string} [options.failureRedirect]
 * @param {boolean|string|Object} [options.failureFlash=false]
 * @param {boolean|string} [options.failureMessage=false]
 * @param {boolean|string|Object} [options.successFlash=false]
 * @param {string} [options.successReturnToOrRedirect]
 * @param {string} [options.successRedirect]
 * @param {boolean|string} [options.successMessage=false]
 * @param {boolean} [options.failWithError=false]
 * @param {string} [options.assignProperty]
 * @param {boolean} [options.authInfo=true]
 * @param {function} [callback]
 * @returns {function}
 *
 * @example <caption>Authenticate username and password submitted via HTML form.</caption>
 * app.get('/login/password', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));
 *
 * @example <caption>Authenticate bearer token used to access an API resource.</caption>
 * app.get('/api/resource', passport.authenticate('bearer', { session: false }));
 */
Authenticator.prototype.authenticate = function(strategy, options, callback) {
  return this._framework.authenticate(this, strategy, options, callback);
};

/**
 * Create third-party service authorization middleware.
 *
 * Returns middleware that will authorize a connection to a third-party service.
 *
 * This middleware is identical to using {@link Authenticator#authenticate `authenticate()`}
 * middleware with the `assignProperty` option set to `'account'`.  This is
 * useful when a user is already authenticated (for example, using a username
 * and password) and they want to connect their account with a third-party
 * service.
 *
 * In this scenario, the user's third-party account will be set at
 * `req.account`, and the existing `req.user` and login session data will be
 * be left unmodified.  A route handler can then link the third-party account to
 * the existing local account.
 *
 * All arguments to this function behave identically to those accepted by
 * `{@link Authenticator#authenticate}`.
 *
 * @public
 * @param {string|string[]|Strategy} strategy
 * @param {Object} [options]
 * @param {function} [callback]
 * @returns {function}
 *
 * @example
 * app.get('/oauth/callback/twitter', passport.authorize('twitter'));
 */
Authenticator.prototype.authorize = function(strategy, options, callback) {
  options = options || {};
  options.assignProperty = 'account';
  
  var fn = this._framework.authorize || this._framework.authenticate;
  return fn(this, strategy, options, callback);
};

/**
 * Middleware that will restore login state from a session.
 *
 * Web applications typically use sessions to maintain login state between
 * requests.  For example, a user will authenticate by entering credentials into
 * a form which is submitted to the server.  If the credentials are valid, a
 * login session is established by setting a cookie containing a session
 * identifier in the user's web browser.  The web browser will send this cookie
 * in subsequent requests to the server, allowing a session to be maintained.
 *
 * If sessions are being utilized, and a login session has been established,
 * this middleware will populate `req.user` with the current user.
 *
 * Note that sessions are not strictly required for Passport to operate.
 * However, as a general rule, most web applications will make use of sessions.
 * An exception to this rule would be an API server, which expects each HTTP
 * request to provide credentials in an Authorization header.
 *
 * Examples:
 *
 *     app.use(connect.cookieParser());
 *     app.use(connect.session({ secret: 'keyboard cat' }));
 *     app.use(passport.initialize());
 *     app.use(passport.session());
 *
 * Options:
 *   - `pauseStream`      Pause the request stream before deserializing the user
 *                        object from the session.  Defaults to _false_.  Should
 *                        be set to true in cases where middleware consuming the
 *                        request body is configured after passport and the
 *                        deserializeUser method is asynchronous.
 *
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.session = function(options) {
  return this.authenticate('session', options);
};

// TODO: Make session manager pluggable
/*
Authenticator.prototype.sessionManager = function(mgr) {
  this._sm = mgr;
  return this;
}
*/

/**
 * Registers a function used to serialize user objects into the session.
 *
 * Examples:
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 *
 * @api public
 */
Authenticator.prototype.serializeUser = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._serializers.push(fn);
  }
  
  // private implementation that traverses the chain of serializers, attempting
  // to serialize a user
  var user = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._serializers;
  (function pass(i, err, obj) {
    // serializers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or serialized object was obtained, done
    if (err || obj || obj === 0) { return done(err, obj); }
    
    var layer = stack[i];
    if (!layer) {
      return done(new Error('Failed to serialize user into session'));
    }
    
    
    function serialized(e, o) {
      pass(i + 1, e, o);
    }
    
    try {
      var arity = layer.length;
      if (arity == 3) {
        layer(req, user, serialized);
      } else {
        layer(user, serialized);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Registers a function used to deserialize user objects out of the session.
 *
 * Examples:
 *
 *     passport.deserializeUser(function(id, done) {
 *       User.findById(id, function (err, user) {
 *         done(err, user);
 *       });
 *     });
 *
 * @api public
 */
Authenticator.prototype.deserializeUser = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._deserializers.push(fn);
  }
  
  // private implementation that traverses the chain of deserializers,
  // attempting to deserialize a user
  var obj = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._deserializers;
  (function pass(i, err, user) {
    // deserializers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or deserialized user was obtained, done
    if (err || user) { return done(err, user); }
    // a valid user existed when establishing the session, but that user has
    // since been removed
    if (user === null || user === false) { return done(null, false); }
    
    var layer = stack[i];
    if (!layer) {
      return done(new Error('Failed to deserialize user out of session'));
    }
    
    
    function deserialized(e, u) {
      pass(i + 1, e, u);
    }
    
    try {
      var arity = layer.length;
      if (arity == 3) {
        layer(req, obj, deserialized);
      } else {
        layer(obj, deserialized);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Registers a function used to transform auth info.
 *
 * In some circumstances authorization details are contained in authentication
 * credentials or loaded as part of verification.
 *
 * For example, when using bearer tokens for API authentication, the tokens may
 * encode (either directly or indirectly in a database), details such as scope
 * of access or the client to which the token was issued.
 *
 * Such authorization details should be enforced separately from authentication.
 * Because Passport deals only with the latter, this is the responsiblity of
 * middleware or routes further along the chain.  However, it is not optimal to
 * decode the same data or execute the same database query later.  To avoid
 * this, Passport accepts optional `info` along with the authenticated `user`
 * in a strategy's `success()` action.  This info is set at `req.authInfo`,
 * where said later middlware or routes can access it.
 *
 * Optionally, applications can register transforms to proccess this info,
 * which take effect prior to `req.authInfo` being set.  This is useful, for
 * example, when the info contains a client ID.  The transform can load the
 * client from the database and include the instance in the transformed info,
 * allowing the full set of client properties to be convieniently accessed.
 *
 * If no transforms are registered, `info` supplied by the strategy will be left
 * unmodified.
 *
 * Examples:
 *
 *     passport.transformAuthInfo(function(info, done) {
 *       Client.findById(info.clientID, function (err, client) {
 *         info.client = client;
 *         done(err, info);
 *       });
 *     });
 *
 * @api public
 */
Authenticator.prototype.transformAuthInfo = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._infoTransformers.push(fn);
  }
  
  // private implementation that traverses the chain of transformers,
  // attempting to transform auth info
  var info = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._infoTransformers;
  (function pass(i, err, tinfo) {
    // transformers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or transformed info was obtained, done
    if (err || tinfo) { return done(err, tinfo); }
    
    var layer = stack[i];
    if (!layer) {
      // if no transformers are registered (or they all pass), the default
      // behavior is to use the un-transformed info as-is
      return done(null, info);
    }
    
    
    function transformed(e, t) {
      pass(i + 1, e, t);
    }
    
    try {
      var arity = layer.length;
      if (arity == 1) {
        // sync
        var t = layer(info);
        transformed(null, t);
      } else if (arity == 3) {
        layer(req, info, transformed);
      } else {
        layer(info, transformed);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Return strategy with given `name`. 
 *
 * @param {String} name
 * @return {Strategy}
 * @api private
 */
Authenticator.prototype._strategy = function(name) {
  return this._strategies[name];
};


/**
 * Expose `Authenticator`.
 */
module.exports = Authenticator;


/***/ }),
/* 232 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Module dependencies.
var pause = __webpack_require__(233)
  , util = __webpack_require__(193)
  , Strategy = __webpack_require__(234);


/**
 *  Create a new `SessionStrategy` object.
 *
 * An instance of this strategy is automatically used when creating an
 * `{@link Authenticator}`.  As such, it is typically unnecessary to create an
 * instance using this constructor.
 *
 * @classdesc This `Strategy` authenticates HTTP requests based on the contents
 * of session data.
 *
 * The login session must have been previously initiated, typically upon the
 * user interactively logging in using a HTML form.  During session initiation,
 * the logged-in user's information is persisted to the session so that it can
 * be restored on subsequent requests.
 *
 * Note that this strategy merely restores the authentication state from the
 * session, it does not authenticate the session itself.  Authenticating the
 * underlying session is assumed to have been done by the middleware
 * implementing session support.  This is typically accomplished by setting a
 * signed cookie, and verifying the signature of that cookie on incoming
 * requests.
 *
 * In {@link https://expressjs.com/ Express}-based apps, session support is
 * commonly provided by {@link https://github.com/expressjs/session `express-session`}
 * or {@link https://github.com/expressjs/cookie-session `cookie-session`}.
 *
 * @public
 * @class
 * @augments base.Strategy
 * @param {Object} [options]
 * @param {string} [options.key='passport'] - Determines what property ("key") on
 *          the session data where login session data is located.  The login
 *          session is stored and read from `req.session[key]`.
 * @param {function} deserializeUser - Function which deserializes user.
 */
function SessionStrategy(options, deserializeUser) {
  if (typeof options == 'function') {
    deserializeUser = options;
    options = undefined;
  }
  options = options || {};
  
  Strategy.call(this);
  
  /** The name of the strategy, set to `'session'`.
   *
   * @type {string}
   * @readonly
   */
  this.name = 'session';
  this._key = options.key || 'passport';
  this._deserializeUser = deserializeUser;
}

// Inherit from `passport.Strategy`.
util.inherits(SessionStrategy, Strategy);

/**
 * Authenticate request based on current session data.
 *
 * When login session data is present in the session, that data will be used to
 * restore login state across across requests by calling the deserialize user
 * function.
 *
 * If login session data is not present, the request will be passed to the next
 * middleware, rather than failing authentication - which is the behavior of
 * most other strategies.  This deviation allows session authentication to be
 * performed at the application-level, rather than the individual route level,
 * while allowing both authenticated and unauthenticated requests and rendering
 * responses accordingly.  Routes that require authentication will need to guard
 * that condition.
 *
 * This function is protected, and should not be called directly.  Instead,
 * use `passport.authenticate()` middleware and specify the {@link SessionStrategy#name `name`}
 * of this strategy and any options.
 *
 * @protected
 * @param {http.IncomingMessage} req - The Node.js {@link https://nodejs.org/api/http.html#class-httpincomingmessage `IncomingMessage`}
 *          object.
 * @param {Object} [options]
 * @param {boolean} [options.pauseStream=false] - When `true`, data events on
 *          the request will be paused, and then resumed after the asynchronous
 *          `deserializeUser` function has completed.  This is only necessary in
 *          cases where later middleware in the stack are listening for events,
 *          and ensures that those events are not missed.
 *
 * @example
 * passport.authenticate('session');
 */
SessionStrategy.prototype.authenticate = function(req, options) {
  if (!req.session) { return this.error(new Error('Login sessions require session support. Did you forget to use `express-session` middleware?')); }
  options = options || {};

  var self = this, 
      su;
  if (req.session[this._key]) {
    su = req.session[this._key].user;
  }

  if (su || su === 0) {
    // NOTE: Stream pausing is desirable in the case where later middleware is
    //       listening for events emitted from request.  For discussion on the
    //       matter, refer to: https://github.com/jaredhanson/passport/pull/106
    
    var paused = options.pauseStream ? pause(req) : null;
    this._deserializeUser(su, req, function(err, user) {
      if (err) { return self.error(err); }
      if (!user) {
        delete req.session[self._key].user;
      } else {
        var property = req._userProperty || 'user';
        req[property] = user;
      }
      self.pass();
      if (paused) {
        paused.resume();
      }
    });
  } else {
    self.pass();
  }
};

// Export `SessionStrategy`.
module.exports = SessionStrategy;


/***/ }),
/* 233 */
/***/ ((module) => {


module.exports = function(obj){
  var onData
    , onEnd
    , events = [];

  // buffer data
  obj.on('data', onData = function(data, encoding){
    events.push(['data', data, encoding]);
  });

  // buffer end
  obj.on('end', onEnd = function(data, encoding){
    events.push(['end', data, encoding]);
  });

  return {
    end: function(){
      obj.removeListener('data', onData);
      obj.removeListener('end', onEnd);
    },
    resume: function(){
      this.end();
      for (var i = 0, len = events.length; i < len; ++i) {
        obj.emit.apply(obj, events[i]);
      }
    }
  };
};

/***/ }),
/* 234 */
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */
var Strategy = __webpack_require__(235);


/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;


/***/ }),
/* 235 */
/***/ ((module) => {

/**
 * Creates an instance of `Strategy`.
 *
 * @constructor
 * @api public
 */
function Strategy() {
}

/**
 * Authenticate request.
 *
 * This function must be overridden by subclasses.  In abstract form, it always
 * throws an exception.
 *
 * @param {Object} req The request to authenticate.
 * @param {Object} [options] Strategy-specific options.
 * @api public
 */
Strategy.prototype.authenticate = function(req, options) {
  throw new Error('Strategy#authenticate must be overridden by subclass');
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;


/***/ }),
/* 236 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var merge = __webpack_require__(237);

function SessionManager(options, serializeUser) {
  if (typeof options == 'function') {
    serializeUser = options;
    options = undefined;
  }
  options = options || {};
  
  this._key = options.key || 'passport';
  this._serializeUser = serializeUser;
}

SessionManager.prototype.logIn = function(req, user, options, cb) {
  if (typeof options == 'function') {
    cb = options;
    options = {};
  }
  options = options || {};
  
  if (!req.session) { return cb(new Error('Login sessions require session support. Did you forget to use `express-session` middleware?')); }
  
  var self = this;
  var prevSession = req.session;
  
  // regenerate the session, which is good practice to help
  // guard against forms of session fixation
  req.session.regenerate(function(err) {
    if (err) {
      return cb(err);
    }
    
    self._serializeUser(user, req, function(err, obj) {
      if (err) {
        return cb(err);
      }
      if (options.keepSessionInfo) {
        merge(req.session, prevSession);
      }
      if (!req.session[self._key]) {
        req.session[self._key] = {};
      }
      // store user information in session, typically a user id
      req.session[self._key].user = obj;
      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function(err) {
        if (err) {
          return cb(err);
        }
        cb();
      });
    });
  });
}

SessionManager.prototype.logOut = function(req, options, cb) {
  if (typeof options == 'function') {
    cb = options;
    options = {};
  }
  options = options || {};
  
  if (!req.session) { return cb(new Error('Login sessions require session support. Did you forget to use `express-session` middleware?')); }
  
  var self = this;
  
  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  if (req.session[this._key]) {
    delete req.session[this._key].user;
  }
  var prevSession = req.session;
  
  req.session.save(function(err) {
    if (err) {
      return cb(err)
    }
  
    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function(err) {
      if (err) {
        return cb(err);
      }
      if (options.keepSessionInfo) {
        merge(req.session, prevSession);
      }
      cb();
    });
  });
}


module.exports = SessionManager;


/***/ }),
/* 237 */
/***/ ((module, exports) => {

/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api public
 */

exports = module.exports = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};


/***/ }),
/* 238 */
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */
var initialize = __webpack_require__(239)
  , authenticate = __webpack_require__(241);
  
/**
 * Framework support for Connect/Express.
 *
 * This module provides support for using Passport with Express.  It exposes
 * middleware that conform to the `fn(req, res, next)` signature.
 *
 * @return {Object}
 * @api protected
 */
exports = module.exports = function() {
  
  return {
    initialize: initialize,
    authenticate: authenticate
  };
};


/***/ }),
/* 239 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Module dependencies.
 */
var IncomingMessageExt = __webpack_require__(240);


/**
 * Passport initialization.
 *
 * Intializes Passport for incoming requests, allowing authentication strategies
 * to be applied.
 *
 * If sessions are being utilized, applications must set up Passport with
 * functions to serialize a user into and out of a session.  For example, a
 * common pattern is to serialize just the user ID into the session (due to the
 * fact that it is desirable to store the minimum amount of data in a session).
 * When a subsequent request arrives for the session, the full User object can
 * be loaded from the database by ID.
 *
 * Note that additional middleware is required to persist login state, so we
 * must use the `connect.session()` middleware _before_ `passport.initialize()`.
 *
 * If sessions are being used, this middleware must be in use by the
 * Connect/Express application for Passport to operate.  If the application is
 * entirely stateless (not using sessions), this middleware is not necessary,
 * but its use will not have any adverse impact.
 *
 * Examples:
 *
 *     app.use(connect.cookieParser());
 *     app.use(connect.session({ secret: 'keyboard cat' }));
 *     app.use(passport.initialize());
 *     app.use(passport.session());
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 *
 *     passport.deserializeUser(function(id, done) {
 *       User.findById(id, function (err, user) {
 *         done(err, user);
 *       });
 *     });
 *
 * @return {Function}
 * @api public
 */
module.exports = function initialize(passport, options) {
  options = options || {};
  
  return function initialize(req, res, next) {
    req.login =
    req.logIn = req.logIn || IncomingMessageExt.logIn;
    req.logout =
    req.logOut = req.logOut || IncomingMessageExt.logOut;
    req.isAuthenticated = req.isAuthenticated || IncomingMessageExt.isAuthenticated;
    req.isUnauthenticated = req.isUnauthenticated || IncomingMessageExt.isUnauthenticated;
    
    req._sessionManager = passport._sm;
    
    if (options.userProperty) {
      req._userProperty = options.userProperty;
    }
    
    var compat = (options.compat === undefined) ? true : options.compat;
    if (compat) {
      // `passport@0.5.1` [removed][1] all internal use of `req._passport`.
      // From the standpoint of this package, this should have been a
      // non-breaking change.  However, some strategies (such as `passport-azure-ad`)
      // depend directly on `passport@0.4.x` or earlier.  `require`-ing earlier
      // versions of `passport` has the effect of monkeypatching `http.IncomingMessage`
      // with `logIn`, `logOut`, `isAuthenticated` and `isUnauthenticated`
      // functions that [expect][2] the `req._passport` property to exist.
      // Since pre-existing functions on `req` are given [preference][3], this
      // results in [issues][4].
      //
      // The changes here restore the expected properties needed when earlier
      // versions of `passport` are `require`-ed.  This compatibility mode is
      // enabled by default, and can be disabld by simply not `use`-ing `passport.initialize()`
      // middleware or setting `compat: false` as an option to the middleware.
      //
      // An alternative approach to addressing this issue would be to not
      // preferentially use pre-existing functions on `req`, but rather always
      // overwrite `req.logIn`, etc. with the versions of those functions shiped
      // with `authenticate()` middleware.  This option should be reconsidered
      // in a future major version release.
      //
      // [1]: https://github.com/jaredhanson/passport/pull/875
      // [2]: https://github.com/jaredhanson/passport/blob/v0.4.1/lib/http/request.js
      // [3]: https://github.com/jaredhanson/passport/blob/v0.5.1/lib/middleware/authenticate.js#L96
      // [4]: https://github.com/jaredhanson/passport/issues/877
      passport._userProperty = options.userProperty || 'user';
      
      req._passport = {};
      req._passport.instance = passport;
    }
    
    next();
  };
};


/***/ }),
/* 240 */
/***/ ((module, exports) => {

var req = exports = module.exports = {};

/**
 * Initiate a login session for `user`.
 *
 * Options:
 *   - `session`  Save login state in session, defaults to _true_
 *
 * Examples:
 *
 *     req.logIn(user, { session: false });
 *
 *     req.logIn(user, function(err) {
 *       if (err) { throw err; }
 *       // session saved
 *     });
 *
 * @param {User} user
 * @param {Object} options
 * @param {Function} done
 * @api public
 */
req.login =
req.logIn = function(user, options, done) {
  if (typeof options == 'function') {
    done = options;
    options = {};
  }
  options = options || {};
  
  var property = this._userProperty || 'user';
  var session = (options.session === undefined) ? true : options.session;
  
  this[property] = user;
  if (session && this._sessionManager) {
    if (typeof done != 'function') { throw new Error('req#login requires a callback function'); }
    
    var self = this;
    this._sessionManager.logIn(this, user, options, function(err) {
      if (err) { self[property] = null; return done(err); }
      done();
    });
  } else {
    done && done();
  }
};

/**
 * Terminate an existing login session.
 *
 * @api public
 */
req.logout =
req.logOut = function(options, done) {
  if (typeof options == 'function') {
    done = options;
    options = {};
  }
  options = options || {};
  
  var property = this._userProperty || 'user';
  
  this[property] = null;
  if (this._sessionManager) {
    if (typeof done != 'function') { throw new Error('req#logout requires a callback function'); }
    
    this._sessionManager.logOut(this, options, done);
  } else {
    done && done();
  }
};

/**
 * Test if request is authenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isAuthenticated = function() {
  var property = this._userProperty || 'user';
  return (this[property]) ? true : false;
};

/**
 * Test if request is unauthenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isUnauthenticated = function() {
  return !this.isAuthenticated();
};


/***/ }),
/* 241 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Module dependencies.
 */
var http = __webpack_require__(242)
  , IncomingMessageExt = __webpack_require__(240)
  , AuthenticationError = __webpack_require__(243);


/**
 * Authenticates requests.
 *
 * Applies the `name`ed strategy (or strategies) to the incoming request, in
 * order to authenticate the request.  If authentication is successful, the user
 * will be logged in and populated at `req.user` and a session will be
 * established by default.  If authentication fails, an unauthorized response
 * will be sent.
 *
 * Options:
 *   - `session`          Save login state in session, defaults to _true_
 *   - `successRedirect`  After successful login, redirect to given URL
 *   - `successMessage`   True to store success message in
 *                        req.session.messages, or a string to use as override
 *                        message for success.
 *   - `successFlash`     True to flash success messages or a string to use as a flash
 *                        message for success (overrides any from the strategy itself).
 *   - `failureRedirect`  After failed login, redirect to given URL
 *   - `failureMessage`   True to store failure message in
 *                        req.session.messages, or a string to use as override
 *                        message for failure.
 *   - `failureFlash`     True to flash failure messages or a string to use as a flash
 *                        message for failures (overrides any from the strategy itself).
 *   - `assignProperty`   Assign the object provided by the verify callback to given property
 *
 * An optional `callback` can be supplied to allow the application to override
 * the default manner in which authentication attempts are handled.  The
 * callback has the following signature, where `user` will be set to the
 * authenticated user on a successful authentication attempt, or `false`
 * otherwise.  An optional `info` argument will be passed, containing additional
 * details provided by the strategy's verify callback - this could be information about
 * a successful authentication or a challenge message for a failed authentication.
 * An optional `status` argument will be passed when authentication fails - this could
 * be a HTTP response code for a remote authentication failure or similar.
 *
 *     app.get('/protected', function(req, res, next) {
 *       passport.authenticate('local', function(err, user, info, status) {
 *         if (err) { return next(err) }
 *         if (!user) { return res.redirect('/signin') }
 *         res.redirect('/account');
 *       })(req, res, next);
 *     });
 *
 * Note that if a callback is supplied, it becomes the application's
 * responsibility to log-in the user, establish a session, and otherwise perform
 * the desired operations.
 *
 * Examples:
 *
 *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });
 *
 *     passport.authenticate('basic', { session: false });
 *
 *     passport.authenticate('twitter');
 *
 * @param {Strategy|String|Array} name
 * @param {Object} options
 * @param {Function} callback
 * @return {Function}
 * @api public
 */
module.exports = function authenticate(passport, name, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  
  var multi = true;
  
  // Cast `name` to an array, allowing authentication to pass through a chain of
  // strategies.  The first strategy to succeed, redirect, or error will halt
  // the chain.  Authentication failures will proceed through each strategy in
  // series, ultimately failing if all strategies fail.
  //
  // This is typically used on API endpoints to allow clients to authenticate
  // using their preferred choice of Basic, Digest, token-based schemes, etc.
  // It is not feasible to construct a chain of multiple strategies that involve
  // redirection (for example both Facebook and Twitter), since the first one to
  // redirect will halt the chain.
  if (!Array.isArray(name)) {
    name = [ name ];
    multi = false;
  }
  
  return function authenticate(req, res, next) {
    req.login =
    req.logIn = req.logIn || IncomingMessageExt.logIn;
    req.logout =
    req.logOut = req.logOut || IncomingMessageExt.logOut;
    req.isAuthenticated = req.isAuthenticated || IncomingMessageExt.isAuthenticated;
    req.isUnauthenticated = req.isUnauthenticated || IncomingMessageExt.isUnauthenticated;
    
    req._sessionManager = passport._sm;
    
    // accumulator for failures from each strategy in the chain
    var failures = [];
    
    function allFailed() {
      if (callback) {
        if (!multi) {
          return callback(null, false, failures[0].challenge, failures[0].status);
        } else {
          var challenges = failures.map(function(f) { return f.challenge; });
          var statuses = failures.map(function(f) { return f.status; });
          return callback(null, false, challenges, statuses);
        }
      }
      
      // Strategies are ordered by priority.  For the purpose of flashing a
      // message, the first failure will be displayed.
      var failure = failures[0] || {}
        , challenge = failure.challenge || {}
        , msg;
    
      if (options.failureFlash) {
        var flash = options.failureFlash;
        if (typeof flash == 'string') {
          flash = { type: 'error', message: flash };
        }
        flash.type = flash.type || 'error';
      
        var type = flash.type || challenge.type || 'error';
        msg = flash.message || challenge.message || challenge;
        if (typeof msg == 'string') {
          req.flash(type, msg);
        }
      }
      if (options.failureMessage) {
        msg = options.failureMessage;
        if (typeof msg == 'boolean') {
          msg = challenge.message || challenge;
        }
        if (typeof msg == 'string') {
          req.session.messages = req.session.messages || [];
          req.session.messages.push(msg);
        }
      }
      if (options.failureRedirect) {
        return res.redirect(options.failureRedirect);
      }
    
      // When failure handling is not delegated to the application, the default
      // is to respond with 401 Unauthorized.  Note that the WWW-Authenticate
      // header will be set according to the strategies in use (see
      // actions#fail).  If multiple strategies failed, each of their challenges
      // will be included in the response.
      var rchallenge = []
        , rstatus, status;
      
      for (var j = 0, len = failures.length; j < len; j++) {
        failure = failures[j];
        challenge = failure.challenge;
        status = failure.status;
          
        rstatus = rstatus || status;
        if (typeof challenge == 'string') {
          rchallenge.push(challenge);
        }
      }
    
      res.statusCode = rstatus || 401;
      if (res.statusCode == 401 && rchallenge.length) {
        res.setHeader('WWW-Authenticate', rchallenge);
      }
      if (options.failWithError) {
        return next(new AuthenticationError(http.STATUS_CODES[res.statusCode], rstatus));
      }
      res.end(http.STATUS_CODES[res.statusCode]);
    }
    
    (function attempt(i) {
      var layer = name[i];
      // If no more strategies exist in the chain, authentication has failed.
      if (!layer) { return allFailed(); }
    
      // Get the strategy, which will be used as prototype from which to create
      // a new instance.  Action functions will then be bound to the strategy
      // within the context of the HTTP request/response pair.
      var strategy, prototype;
      if (typeof layer.authenticate == 'function') {
        strategy = layer;
      } else {
        prototype = passport._strategy(layer);
        if (!prototype) { return next(new Error('Unknown authentication strategy "' + layer + '"')); }
        
        strategy = Object.create(prototype);
      }
      
      
      // ----- BEGIN STRATEGY AUGMENTATION -----
      // Augment the new strategy instance with action functions.  These action
      // functions are bound via closure the the request/response pair.  The end
      // goal of the strategy is to invoke *one* of these action methods, in
      // order to indicate successful or failed authentication, redirect to a
      // third-party identity provider, etc.
      
      /**
       * Authenticate `user`, with optional `info`.
       *
       * Strategies should call this function to successfully authenticate a
       * user.  `user` should be an object supplied by the application after it
       * has been given an opportunity to verify credentials.  `info` is an
       * optional argument containing additional user information.  This is
       * useful for third-party authentication strategies to pass profile
       * details.
       *
       * @param {Object} user
       * @param {Object} info
       * @api public
       */
      strategy.success = function(user, info) {
        if (callback) {
          return callback(null, user, info);
        }
      
        info = info || {};
        var msg;
      
        if (options.successFlash) {
          var flash = options.successFlash;
          if (typeof flash == 'string') {
            flash = { type: 'success', message: flash };
          }
          flash.type = flash.type || 'success';
        
          var type = flash.type || info.type || 'success';
          msg = flash.message || info.message || info;
          if (typeof msg == 'string') {
            req.flash(type, msg);
          }
        }
        if (options.successMessage) {
          msg = options.successMessage;
          if (typeof msg == 'boolean') {
            msg = info.message || info;
          }
          if (typeof msg == 'string') {
            req.session.messages = req.session.messages || [];
            req.session.messages.push(msg);
          }
        }
        if (options.assignProperty) {
          req[options.assignProperty] = user;
          if (options.authInfo !== false) {
            passport.transformAuthInfo(info, req, function(err, tinfo) {
              if (err) { return next(err); }
              req.authInfo = tinfo;
              next();
            });
          } else {
            next();
          }
          return;
        }
      
        req.logIn(user, options, function(err) {
          if (err) { return next(err); }
          
          function complete() {
            if (options.successReturnToOrRedirect) {
              var url = options.successReturnToOrRedirect;
              if (req.session && req.session.returnTo) {
                url = req.session.returnTo;
                delete req.session.returnTo;
              }
              return res.redirect(url);
            }
            if (options.successRedirect) {
              return res.redirect(options.successRedirect);
            }
            next();
          }
          
          if (options.authInfo !== false) {
            passport.transformAuthInfo(info, req, function(err, tinfo) {
              if (err) { return next(err); }
              req.authInfo = tinfo;
              complete();
            });
          } else {
            complete();
          }
        });
      };
      
      /**
       * Fail authentication, with optional `challenge` and `status`, defaulting
       * to 401.
       *
       * Strategies should call this function to fail an authentication attempt.
       *
       * @param {String} challenge
       * @param {Number} status
       * @api public
       */
      strategy.fail = function(challenge, status) {
        if (typeof challenge == 'number') {
          status = challenge;
          challenge = undefined;
        }
        
        // push this failure into the accumulator and attempt authentication
        // using the next strategy
        failures.push({ challenge: challenge, status: status });
        attempt(i + 1);
      };
      
      /**
       * Redirect to `url` with optional `status`, defaulting to 302.
       *
       * Strategies should call this function to redirect the user (via their
       * user agent) to a third-party website for authentication.
       *
       * @param {String} url
       * @param {Number} status
       * @api public
       */
      strategy.redirect = function(url, status) {
        // NOTE: Do not use `res.redirect` from Express, because it can't decide
        //       what it wants.
        //
        //       Express 2.x: res.redirect(url, status)
        //       Express 3.x: res.redirect(status, url) -OR- res.redirect(url, status)
        //         - as of 3.14.0, deprecated warnings are issued if res.redirect(url, status)
        //           is used
        //       Express 4.x: res.redirect(status, url)
        //         - all versions (as of 4.8.7) continue to accept res.redirect(url, status)
        //           but issue deprecated versions
        
        res.statusCode = status || 302;
        res.setHeader('Location', url);
        res.setHeader('Content-Length', '0');
        res.end();
      };
      
      /**
       * Pass without making a success or fail decision.
       *
       * Under most circumstances, Strategies should not need to call this
       * function.  It exists primarily to allow previous authentication state
       * to be restored, for example from an HTTP session.
       *
       * @api public
       */
      strategy.pass = function() {
        next();
      };
      
      /**
       * Internal error while performing authentication.
       *
       * Strategies should call this function when an internal error occurs
       * during the process of performing authentication; for example, if the
       * user directory is not available.
       *
       * @param {Error} err
       * @api public
       */
      strategy.error = function(err) {
        if (callback) {
          return callback(err);
        }
        
        next(err);
      };
      
      // ----- END STRATEGY AUGMENTATION -----
    
      strategy.authenticate(req, options);
    })(0); // attempt
  };
};


/***/ }),
/* 242 */
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),
/* 243 */
/***/ ((module) => {

/**
 * `AuthenticationError` error.
 *
 * @constructor
 * @api private
 */
function AuthenticationError(message, status) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'AuthenticationError';
  this.message = message;
  this.status = status || 401;
}

// Inherit from `Error`.
AuthenticationError.prototype.__proto__ = Error.prototype;


// Expose constructor.
module.exports = AuthenticationError;


/***/ }),
/* 244 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModuleOptions = void 0;
class AuthModuleOptions {
}
exports.AuthModuleOptions = AuthModuleOptions;


/***/ }),
/* 245 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultOptions = void 0;
exports.defaultOptions = {
    session: false,
    property: 'user'
};


/***/ }),
/* 246 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.memoize = memoize;
const defaultKey = 'default';
function memoize(fn) {
    const cache = {};
    return (...args) => {
        const n = args[0] || defaultKey;
        if (n in cache) {
            return cache[n];
        }
        else {
            const result = fn(n === defaultKey ? undefined : n);
            cache[n] = result;
            return result;
        }
    };
}


/***/ }),
/* 247 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(244), exports);
__exportStar(__webpack_require__(248), exports);


/***/ }),
/* 248 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 249 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PassportModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PassportModule = void 0;
const common_1 = __webpack_require__(3);
const auth_module_options_1 = __webpack_require__(244);
let PassportModule = PassportModule_1 = class PassportModule {
    static register(options) {
        return {
            module: PassportModule_1,
            providers: [{ provide: auth_module_options_1.AuthModuleOptions, useValue: options }],
            exports: [auth_module_options_1.AuthModuleOptions]
        };
    }
    static registerAsync(options) {
        return {
            module: PassportModule_1,
            imports: options.imports || [],
            providers: this.createAsyncProviders(options),
            exports: [auth_module_options_1.AuthModuleOptions]
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass
            }
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: auth_module_options_1.AuthModuleOptions,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        return {
            provide: auth_module_options_1.AuthModuleOptions,
            useFactory: async (optionsFactory) => await optionsFactory.createAuthOptions(),
            inject: [options.useExisting || options.useClass]
        };
    }
};
exports.PassportModule = PassportModule;
exports.PassportModule = PassportModule = PassportModule_1 = __decorate([
    (0, common_1.Module)({})
], PassportModule);


/***/ }),
/* 250 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PassportSerializer = void 0;
const passport = __webpack_require__(230);
class PassportSerializer {
    constructor() {
        const passportInstance = this.getPassportInstance();
        passportInstance.serializeUser((user, done) => this.serializeUser(user, done));
        passportInstance.deserializeUser((payload, done) => this.deserializeUser(payload, done));
    }
    getPassportInstance() {
        return passport;
    }
}
exports.PassportSerializer = PassportSerializer;


/***/ }),
/* 251 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PassportStrategy = PassportStrategy;
const passport = __webpack_require__(230);
class PassportStrategyMixin {
}
function PassportStrategy(Strategy, name, callbackArity) {
    class StrategyWithMixin extends Strategy {
        constructor(...args) {
            const callback = async (...params) => {
                const done = params[params.length - 1];
                try {
                    const validateResult = await this.validate(...params);
                    if (Array.isArray(validateResult)) {
                        done(null, ...validateResult);
                    }
                    else {
                        done(null, validateResult);
                    }
                }
                catch (err) {
                    done(err, null);
                }
            };
            if (callbackArity !== undefined) {
                const validate = new.target?.prototype?.validate;
                const arity = callbackArity === true ? validate.length + 1 : callbackArity;
                if (validate) {
                    Object.defineProperty(callback, 'length', {
                        value: arity
                    });
                }
            }
            super(...args, callback);
            const passportInstance = this.getPassportInstance();
            if (name) {
                passportInstance.use(name, this);
            }
            else {
                passportInstance.use(this);
            }
        }
        getPassportInstance() {
            return passport;
        }
    }
    return StrategyWithMixin;
}


/***/ }),
/* 252 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(42);
const admin_auth_service_1 = __webpack_require__(176);
const customer_auth_service_1 = __webpack_require__(222);
const customer_dto_1 = __webpack_require__(173);
const auth_dto_1 = __webpack_require__(223);
const response_dto_1 = __webpack_require__(174);
let AuthController = class AuthController {
    adminAuthService;
    customerAuthService;
    constructor(adminAuthService, customerAuthService) {
        this.adminAuthService = adminAuthService;
        this.customerAuthService = customerAuthService;
    }
    async registerAdmin(body) {
        const admin = await this.adminAuthService.registerAdmin(body);
        return {
            message: 'Admin registered successfully',
            data: admin,
            statusCode: common_1.HttpStatus.CREATED,
            timestamp: new Date()
        };
    }
    async registerFirstAdmin(body) {
        const admin = await this.adminAuthService.registerFirstAdmin(body);
        return {
            message: 'First admin registered successfully',
            data: admin,
            statusCode: common_1.HttpStatus.CREATED,
            timestamp: new Date()
        };
    }
    async loginAdmin(body, res) {
        const result = await this.adminAuthService.loginAdmin(body.email, body.password);
        res.cookie('admin_token', result.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });
        return result;
    }
    async registerCustomer(body) {
        const customer = await this.customerAuthService.registerCustomer(body);
        return {
            message: 'Customer registered successfully',
            data: customer,
            statusCode: common_1.HttpStatus.CREATED,
            timestamp: new Date()
        };
    }
    async loginCustomer(body, res) {
        const result = await this.customerAuthService.loginCustomer(body.email, body.password);
        res.cookie('customer_token', result.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });
        return result;
    }
    async logoutCustomer(body, res) {
        await this.customerAuthService.logoutWithCredentials(body.email, body.password);
        res.clearCookie('customer_token', { path: '/' });
        return {
            message: 'Customer logged out successfully',
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
    async logout(body, res) {
        try {
            await this.adminAuthService.logoutWithCredentials(body.email, body.password);
        }
        catch (error) {
            await this.customerAuthService.logoutWithCredentials(body.email, body.password);
        }
        res.clearCookie('admin_token', { path: '/' });
        res.clearCookie('customer_token', { path: '/' });
        return {
            message: 'Logged out successfully',
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('admin/register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new admin',
        description: 'Creates a new admin account. Only existing admins should be able to create new admins.'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Admin registered successfully',
        type: (response_dto_1.ApiResponseDto),
        schema: {
            example: {
                message: 'Admin registered successfully',
                data: {
                    id: '507f1f77bcf86cd799439011',
                    firstName: 'John',
                    lastName: 'Admin',
                    email: 'admin@yatritask.com',
                    createdAt: '2024-01-09T16:30:00.000Z',
                    updatedAt: '2024-01-09T16:30:00.000Z'
                },
                statusCode: 201,
                timestamp: '2024-01-09T16:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Admin with this email already exists'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof customer_dto_1.CreateAdminDto !== "undefined" && customer_dto_1.CreateAdminDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "registerAdmin", null);
__decorate([
    (0, common_1.Post)('admin/register/first'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Register the first admin (Public)',
        description: 'Creates the first admin account. This endpoint is only available when no admins exist in the system.'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'First admin registered successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Admin already exists in the system'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof customer_dto_1.CreateAdminDto !== "undefined" && customer_dto_1.CreateAdminDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "registerFirstAdmin", null);
__decorate([
    (0, common_1.Post)('admin/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Login as an admin',
        description: 'Authenticates an admin with email and password, sets authentication cookie and returns JWT token.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Admin login successful',
        type: response_dto_1.AdminAuthResponseDto,
        schema: {
            example: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                admin: {
                    id: '507f1f77bcf86cd799439011',
                    firstName: 'John',
                    lastName: 'Admin',
                    email: 'admin@yatritask.com',
                    createdAt: '2024-01-09T16:30:00.000Z',
                    updatedAt: '2024-01-09T16:30:00.000Z'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Invalid admin credentials'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof auth_dto_1.LoginAdminDto !== "undefined" && auth_dto_1.LoginAdminDto) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    (0, common_1.Post)('customer/register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new customer',
        description: 'Creates a new customer account. This endpoint is public and allows anyone to register as a customer.'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Customer registered successfully',
        type: (response_dto_1.ApiResponseDto),
        schema: {
            example: {
                message: 'Customer registered successfully',
                data: {
                    id: '507f1f77bcf86cd799439011',
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: 'jane.doe@example.com',
                    phone: '+1234567890',
                    address: '123 Main St, City, State 12345',
                    createdAt: '2024-01-09T16:30:00.000Z',
                    updatedAt: '2024-01-09T16:30:00.000Z'
                },
                statusCode: 201,
                timestamp: '2024-01-09T16:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Customer with this email already exists'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof customer_dto_1.CreateCustomerDto !== "undefined" && customer_dto_1.CreateCustomerDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AuthController.prototype, "registerCustomer", null);
__decorate([
    (0, common_1.Post)('customer/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Login as a customer',
        description: 'Authenticates a customer with email and password, returns JWT token for subsequent API calls.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer login successful',
        type: response_dto_1.CustomerAuthResponseDto,
        schema: {
            example: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                customer: {
                    id: '507f1f77bcf86cd799439011',
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: 'jane.doe@example.com',
                    phone: '+1234567890',
                    address: '123 Main St, City, State 12345',
                    createdAt: '2024-01-09T16:30:00.000Z',
                    updatedAt: '2024-01-09T16:30:00.000Z'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Invalid customer credentials'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof auth_dto_1.LoginCustomerDto !== "undefined" && auth_dto_1.LoginCustomerDto) === "function" ? _l : Object, Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AuthController.prototype, "loginCustomer", null);
__decorate([
    (0, common_1.Post)('customer/logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Logout as a customer',
        description: 'Logs out a customer by validating their credentials and invalidating any active sessions.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer logged out successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid credentials'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Invalid email or password'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof auth_dto_1.LogoutDto !== "undefined" && auth_dto_1.LogoutDto) === "function" ? _o : Object, Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], AuthController.prototype, "logoutCustomer", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Logout (both admin and customer)',
        description: 'Logs out the user by validating their credentials and invalidating any active sessions. Works for both admin and customer accounts.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Logged out successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid credentials'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Invalid email or password'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof auth_dto_1.LogoutDto !== "undefined" && auth_dto_1.LogoutDto) === "function" ? _q : Object, Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_auth_service_1.AdminAuthService !== "undefined" && admin_auth_service_1.AdminAuthService) === "function" ? _a : Object, typeof (_b = typeof customer_auth_service_1.CustomerAuthService !== "undefined" && customer_auth_service_1.CustomerAuthService) === "function" ? _b : Object])
], AuthController);


/***/ }),
/* 253 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BikesModule = void 0;
const common_1 = __webpack_require__(3);
const bikes_controller_1 = __webpack_require__(254);
const bikes_service_1 = __webpack_require__(255);
const prisma_module_1 = __webpack_require__(224);
const auth_module_1 = __webpack_require__(225);
let BikesModule = class BikesModule {
};
exports.BikesModule = BikesModule;
exports.BikesModule = BikesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [bikes_controller_1.BikesController],
        providers: [bikes_service_1.BikesService],
        exports: [bikes_service_1.BikesService],
    })
], BikesModule);


/***/ }),
/* 254 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BikesController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(42);
const bikes_service_1 = __webpack_require__(255);
const bike_dto_1 = __webpack_require__(256);
const response_dto_1 = __webpack_require__(174);
const admin_auth_guard_1 = __webpack_require__(175);
let BikesController = class BikesController {
    bikesService;
    constructor(bikesService) {
        this.bikesService = bikesService;
    }
    async createBike(body) {
        return this.bikesService.createBike(body);
    }
    async getAllBikes(page = 1, limit = 10) {
        return this.bikesService.getAllBikes(page, limit);
    }
    async searchBikes(query, status, page = 1, limit = 10) {
        return this.bikesService.searchBikes(query || '', status, page, limit);
    }
    async getAvailableBikes(page = 1, limit = 10) {
        return this.bikesService.getAvailableBikes(page, limit);
    }
    async getBikeAssignments(page = 1, limit = 10) {
        return this.bikesService.getBikeAssignments(page, limit);
    }
    async getActiveAssignments(page = 1, limit = 10) {
        return this.bikesService.getActiveAssignments(page, limit);
    }
    async getBikeById(id) {
        return this.bikesService.getBikeById(id);
    }
    async updateBikeStatus(id, body) {
        return this.bikesService.updateBikeStatus(id, body);
    }
    async assignBike(body, req) {
        return this.bikesService.assignBike(body, req.admin.sub);
    }
    async returnBike(body) {
        return this.bikesService.returnBike(body);
    }
};
exports.BikesController = BikesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new bike (Admin only)',
        description: 'Creates a new bike with the specified serial number and model. Only admins can create bikes.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Bike created successfully',
        type: response_dto_1.BikeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data or serial number already exists',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof bike_dto_1.CreateBikeDto !== "undefined" && bike_dto_1.CreateBikeDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], BikesController.prototype, "createBike", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all bikes (Admin only)',
        description: 'Retrieves a paginated list of all bikes in the system. Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bikes retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto),
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "getAllBikes", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Search bikes (Admin only)',
        description: 'Search bikes by model, serial number, or status. Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'q',
        required: false,
        type: String,
        description: 'Search query (bike model or serial number)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: ['AVAILABLE', 'ASSIGNED', 'MAINTENANCE', 'RETIRED'],
        description: 'Filter by bike status',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bikes search results',
        type: (response_dto_1.PaginatedResponseDto),
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "searchBikes", null);
__decorate([
    (0, common_1.Get)('available'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get available bikes (Admin only)',
        description: 'Retrieves a paginated list of all available bikes. Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Available bikes retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto),
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "getAvailableBikes", null);
__decorate([
    (0, common_1.Get)('assignments'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all bike assignments (Admin only)',
        description: 'Retrieves a paginated list of all bike assignments. Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bike assignments retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto),
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "getBikeAssignments", null);
__decorate([
    (0, common_1.Get)('assignments/active'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get active bike assignments (Admin only)',
        description: 'Retrieves a paginated list of all active bike assignments (not returned). Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Active bike assignments retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto),
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "getActiveAssignments", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get bike by ID (Admin only)',
        description: 'Retrieves a specific bike by its ID. Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bike retrieved successfully',
        type: response_dto_1.BikeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Bike not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], BikesController.prototype, "getBikeById", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Update bike status (Admin only)',
        description: 'Updates the status of a bike. Only admins can update bike status.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bike status updated successfully',
        type: response_dto_1.BikeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid status',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Bike not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof bike_dto_1.UpdateBikeStatusDto !== "undefined" && bike_dto_1.UpdateBikeStatusDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], BikesController.prototype, "updateBikeStatus", null);
__decorate([
    (0, common_1.Post)('assign'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Assign bike to customer (Admin only)',
        description: 'Assigns a bike to a customer. Only admins can assign bikes.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Bike assigned successfully',
        type: response_dto_1.BikeAssignmentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Bike not available or customer has active assignment',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Bike or customer not found',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof bike_dto_1.AssignBikeDto !== "undefined" && bike_dto_1.AssignBikeDto) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], BikesController.prototype, "assignBike", null);
__decorate([
    (0, common_1.Post)('return'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Return bike from customer (Admin only)',
        description: 'Returns a bike from a customer. Only admins can return bikes.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bike returned successfully',
        type: response_dto_1.BikeAssignmentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid return data',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Active assignment not found',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof bike_dto_1.ReturnBikeDto !== "undefined" && bike_dto_1.ReturnBikeDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], BikesController.prototype, "returnBike", null);
exports.BikesController = BikesController = __decorate([
    (0, swagger_1.ApiTags)('bikes'),
    (0, common_1.Controller)('bikes'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof bikes_service_1.BikesService !== "undefined" && bikes_service_1.BikesService) === "function" ? _a : Object])
], BikesController);


/***/ }),
/* 255 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BikesService = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(152);
let BikesService = class BikesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBike(data) {
        const existingBike = await this.prisma.bike.findUnique({
            where: { serialNumber: data.serialNumber },
        });
        if (existingBike) {
            throw new common_1.BadRequestException('Bike with this serial number already exists');
        }
        const bike = await this.prisma.bike.create({
            data: {
                serialNumber: data.serialNumber,
                brand: data.brand,
                model: data.model,
                status: data.status || 'AVAILABLE',
            },
        });
        return bike;
    }
    async getAllBikes(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [bikes, total] = await Promise.all([
            this.prisma.bike.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.bike.count(),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: bikes,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async searchBikes(query, status, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const whereConditions = {};
            if (query && query.trim() !== '') {
                whereConditions.OR = [
                    { model: { contains: query } },
                    { brand: { contains: query } },
                    { serialNumber: { contains: query } },
                ];
            }
            if (status && status.trim() !== '') {
                whereConditions.status = status;
            }
            const [bikes, total] = await Promise.all([
                this.prisma.bike.findMany({
                    where: whereConditions,
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.bike.count({
                    where: whereConditions,
                }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                items: bikes,
                total,
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            };
        }
        catch (error) {
            console.error('Search bikes error:', error);
            throw error;
        }
    }
    async getAvailableBikes(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [bikes, total] = await Promise.all([
            this.prisma.bike.findMany({
                where: { status: 'AVAILABLE' },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.bike.count({
                where: { status: 'AVAILABLE' },
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: bikes,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getBikeById(id) {
        const bike = await this.prisma.bike.findUnique({
            where: { id },
        });
        if (!bike) {
            throw new common_1.NotFoundException('Bike not found');
        }
        return bike;
    }
    async updateBikeStatus(id, data) {
        const bike = await this.prisma.bike.findUnique({
            where: { id },
        });
        if (!bike) {
            throw new common_1.NotFoundException('Bike not found');
        }
        const updatedBike = await this.prisma.bike.update({
            where: { id },
            data: { status: data.status },
        });
        return updatedBike;
    }
    async assignBike(data, adminId) {
        const bike = await this.prisma.bike.findUnique({
            where: { id: data.bikeId },
        });
        if (!bike) {
            throw new common_1.NotFoundException('Bike not found');
        }
        if (bike.status !== 'AVAILABLE') {
            throw new common_1.BadRequestException('Bike is not available for assignment');
        }
        const customer = await this.prisma.customer.findUnique({
            where: { id: data.customerId },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const activeAssignment = await this.prisma.bikeAssignment.findFirst({
            where: {
                customerId: data.customerId,
                returnedAt: undefined,
            },
        });
        if (activeAssignment) {
            throw new common_1.BadRequestException('Customer already has an active bike assignment');
        }
        const assignment = await this.prisma.bikeAssignment.create({
            data: {
                bikeId: data.bikeId,
                customerId: data.customerId,
                assignedBy: adminId,
            },
            include: {
                bike: true,
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        address: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                admin: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        await this.prisma.bike.update({
            where: { id: data.bikeId },
            data: { status: 'ASSIGNED' },
        });
        return assignment;
    }
    async returnBike(data) {
        const bike = await this.prisma.bike.findUnique({
            where: { id: data.bikeId },
        });
        if (!bike) {
            throw new common_1.NotFoundException('Bike not found');
        }
        if (bike.status !== 'ASSIGNED') {
            throw new common_1.BadRequestException('Bike is not currently assigned');
        }
        const assignment = await this.prisma.bikeAssignment.findFirst({
            where: {
                bikeId: data.bikeId,
                returnedAt: undefined,
            },
            include: {
                bike: true,
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        address: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                admin: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (!assignment) {
            throw new common_1.NotFoundException('Active bike assignment not found');
        }
        if (assignment.customerId !== data.customerId) {
            throw new common_1.BadRequestException('This bike is not assigned to the specified customer');
        }
        const updatedAssignment = await this.prisma.bikeAssignment.update({
            where: { id: assignment.id },
            data: { returnedAt: new Date() },
            include: {
                bike: true,
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        address: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                admin: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        await this.prisma.bike.update({
            where: { id: data.bikeId },
            data: { status: 'AVAILABLE' },
        });
        return updatedAssignment;
    }
    async getBikeAssignments(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [assignments, total] = await Promise.all([
            this.prisma.bikeAssignment.findMany({
                skip,
                take: limit,
                orderBy: { assignedAt: 'desc' },
                include: {
                    bike: true,
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                            address: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                    admin: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            }),
            this.prisma.bikeAssignment.count(),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: assignments,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getActiveAssignments(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [assignments, total] = await Promise.all([
            this.prisma.bikeAssignment.findMany({
                where: { returnedAt: undefined },
                skip,
                take: limit,
                orderBy: { assignedAt: 'desc' },
                include: {
                    bike: true,
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                            address: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                    admin: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            }),
            this.prisma.bikeAssignment.count({
                where: { returnedAt: undefined },
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: assignments,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
};
exports.BikesService = BikesService;
exports.BikesService = BikesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], BikesService);


/***/ }),
/* 256 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchBikesDto = exports.ReturnBikeDto = exports.AssignBikeDto = exports.UpdateBikeStatusDto = exports.CreateBikeDto = exports.BikeStatus = void 0;
const class_validator_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'class-validator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const swagger_1 = __webpack_require__(42);
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


/***/ }),
/* 257 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChargingSessionsModule = void 0;
const common_1 = __webpack_require__(3);
const charging_sessions_controller_1 = __webpack_require__(258);
const charging_sessions_service_1 = __webpack_require__(259);
const prisma_module_1 = __webpack_require__(224);
const auth_module_1 = __webpack_require__(225);
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


/***/ }),
/* 258 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChargingSessionsController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(42);
const charging_sessions_service_1 = __webpack_require__(259);
const admin_auth_guard_1 = __webpack_require__(175);
const customer_auth_guard_1 = __webpack_require__(221);
const charging_session_dto_1 = __webpack_require__(260);
let ChargingSessionsController = class ChargingSessionsController {
    chargingSessionsService;
    constructor(chargingSessionsService) {
        this.chargingSessionsService = chargingSessionsService;
    }
    async getAllSessions(page = 1, limit = 10) {
        return this.chargingSessionsService.findAll(page, limit);
    }
    async searchChargingSessions(filters) {
        return this.chargingSessionsService.searchChargingSessions(filters);
    }
    async getChargingSessionStats(period, startDate, endDate) {
        return this.chargingSessionsService.getChargingSessionStats(period, startDate, endDate);
    }
    async getRevenueAnalytics(period = 'month', groupBy = 'day') {
        return this.chargingSessionsService.getRevenueAnalytics(period, groupBy);
    }
    async getChargingSessionsByCustomer(customerId, page = 1, limit = 10) {
        return this.chargingSessionsService.getChargingSessionsByCustomer(customerId, page, limit);
    }
    async getChargingSessionsByBike(bikeId, page = 1, limit = 10) {
        return this.chargingSessionsService.getChargingSessionsByBike(bikeId, page, limit);
    }
    async getChargingSessionReports(filters) {
        return this.chargingSessionsService.getChargingSessionReports(filters);
    }
    async getAllSessionsAdmin(customerId, bikeId, status, dateRangeStart, dateRangeEnd, page = 1, limit = 10) {
        return this.chargingSessionsService.getAllSessions({
            customerId,
            bikeId,
            status,
            dateRangeStart,
            dateRangeEnd,
            page,
            limit,
        });
    }
    async adminEndSession(id, body) {
        return this.chargingSessionsService.adminEndSession(id, body.endTime ? new Date(body.endTime) : undefined);
    }
    async adminGetSessionDetails(id) {
        return this.chargingSessionsService.adminGetSessionDetails(id);
    }
    async getAdminAnalyticsSummary(dateRangeStart, dateRangeEnd) {
        return this.chargingSessionsService.getAdminAnalyticsSummary(dateRangeStart, dateRangeEnd);
    }
    async startChargingSession(req, body) {
        return this.chargingSessionsService.startChargingSession(req.customer.sub, body);
    }
    async endChargingSession(id, req, body) {
        return this.chargingSessionsService.endChargingSession(req.customer.sub, id, body.endTime ? new Date(body.endTime) : undefined);
    }
    async cancelChargingSession(id, req) {
        return this.chargingSessionsService.cancelChargingSession(req.customer.sub, id);
    }
    async getActiveSessions(req) {
        return this.chargingSessionsService.getActiveSessionsByCustomer(req.customer.sub);
    }
    async getMySessions(req, bikeId, page = 1, limit = 10, dateRangeStart, dateRangeEnd) {
        return this.chargingSessionsService.getMySessions(req.customer.sub, { bikeId, page, limit, dateRangeStart, dateRangeEnd });
    }
    async getSessionDetails(id, req) {
        return this.chargingSessionsService.getSessionDetails(req.customer.sub, id);
    }
    async getCustomerAnalytics(req, dateRangeStart, dateRangeEnd) {
        return this.chargingSessionsService.getCustomerAnalytics(req.customer.sub, dateRangeStart, dateRangeEnd);
    }
};
exports.ChargingSessionsController = ChargingSessionsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all charging sessions (Admin)',
        description: 'Get all charging sessions with pagination. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'All charging sessions retrieved successfully',
        type: (charging_session_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getAllSessions", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Search charging sessions (Admin)',
        description: 'Search charging sessions with advanced filters. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false, type: String, description: 'Search query' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, type: String, description: 'Filter by status' }),
    (0, swagger_1.ApiQuery)({ name: 'customerId', required: false, type: String, description: 'Filter by customer ID' }),
    (0, swagger_1.ApiQuery)({ name: 'bikeId', required: false, type: String, description: 'Filter by bike ID' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, description: 'Start date filter' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, description: 'End date filter' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging sessions search results',
        type: (charging_session_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof charging_session_dto_1.SearchChargingSessionsDto !== "undefined" && charging_session_dto_1.SearchChargingSessionsDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "searchChargingSessions", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging session statistics (Admin)',
        description: 'Get charging session statistics and analytics. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'period', required: false, type: String, description: 'Time period (today, week, month, year)' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, description: 'Start date for custom period' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, description: 'End date for custom period' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session statistics retrieved successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('period')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getChargingSessionStats", null);
__decorate([
    (0, common_1.Get)('revenue'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get revenue analytics (Admin)',
        description: 'Get revenue analytics with time-based grouping. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'period', required: false, type: String, description: 'Time period (week, month, year)' }),
    (0, swagger_1.ApiQuery)({ name: 'groupBy', required: false, type: String, description: 'Group by (day, week, month)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Revenue analytics retrieved successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('period')),
    __param(1, (0, common_1.Query)('groupBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getRevenueAnalytics", null);
__decorate([
    (0, common_1.Get)('customer/:customerId'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging sessions by customer (Admin)',
        description: 'Get all charging sessions for a specific customer. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiParam)({ name: 'customerId', description: 'Customer ID' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer charging sessions retrieved successfully',
        type: (charging_session_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Param)('customerId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getChargingSessionsByCustomer", null);
__decorate([
    (0, common_1.Get)('bike/:bikeId'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging sessions by bike (Admin)',
        description: 'Get all charging sessions for a specific bike. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiParam)({ name: 'bikeId', description: 'Bike ID' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bike charging sessions retrieved successfully',
        type: (charging_session_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Param)('bikeId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getChargingSessionsByBike", null);
__decorate([
    (0, common_1.Get)('reports'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging session reports (Admin)',
        description: 'Generate charging session reports with filters. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, description: 'Start date filter' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, description: 'End date filter' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, type: String, description: 'Filter by status' }),
    (0, swagger_1.ApiQuery)({ name: 'customerId', required: false, type: String, description: 'Filter by customer ID' }),
    (0, swagger_1.ApiQuery)({ name: 'bikeId', required: false, type: String, description: 'Filter by bike ID' }),
    (0, swagger_1.ApiQuery)({ name: 'format', required: false, type: String, description: 'Report format' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session report generated successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getChargingSessionReports", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'View all charging sessions (Admin)',
        description: 'Get all charging sessions with advanced filtering options. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'customerId', required: false, type: String, description: 'Filter by customer ID' }),
    (0, swagger_1.ApiQuery)({ name: 'bikeId', required: false, type: String, description: 'Filter by bike ID' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, type: String, description: 'Filter by session status' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'All charging sessions retrieved successfully',
        type: (charging_session_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('customerId')),
    __param(1, (0, common_1.Query)('bikeId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('dateRangeStart')),
    __param(4, (0, common_1.Query)('dateRangeEnd')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getAllSessionsAdmin", null);
__decorate([
    (0, common_1.Post)('admin/end/:id'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'End any charging session (Admin)',
        description: 'Admin can force-end any charging session. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Charging session ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session ended successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid session ID or session already ended'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Charging session not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof charging_session_dto_1.EndChargingSessionDto !== "undefined" && charging_session_dto_1.EndChargingSessionDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ChargingSessionsController.prototype, "adminEndSession", null);
__decorate([
    (0, common_1.Get)('admin/:id'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging session details (Admin)',
        description: 'Get full details of any charging session. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Charging session ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session details retrieved successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Charging session not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ChargingSessionsController.prototype, "adminGetSessionDetails", null);
__decorate([
    (0, common_1.Get)('admin/analytics/summary'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging analytics summary (Admin)',
        description: 'Get aggregated charging session analytics including total sessions, energy delivered, and revenue.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging analytics summary retrieved successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('dateRangeStart')),
    __param(1, (0, common_1.Query)('dateRangeEnd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getAdminAnalyticsSummary", null);
__decorate([
    (0, common_1.Post)('start'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Start a charging session (Customer)',
        description: 'Start a new charging session for the authenticated customer with a specific bike.'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Charging session started successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data or customer already has active session for this bike'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Bike not found'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof charging_session_dto_1.StartChargingSessionDto !== "undefined" && charging_session_dto_1.StartChargingSessionDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ChargingSessionsController.prototype, "startChargingSession", null);
__decorate([
    (0, common_1.Post)(':id/end'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'End a charging session (Customer)',
        description: 'End a specific charging session by providing the session ID. Only the session owner can end their session.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Charging session ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session ended successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid session ID or session already ended'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Charging session not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, typeof (_h = typeof charging_session_dto_1.EndChargingSessionDto !== "undefined" && charging_session_dto_1.EndChargingSessionDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ChargingSessionsController.prototype, "endChargingSession", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Cancel a charging session (Customer)',
        description: 'Cancel a specific charging session by providing the session ID. Only the session owner can cancel their session.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Charging session ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session cancelled successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid session ID or session already ended'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Charging session not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], ChargingSessionsController.prototype, "cancelChargingSession", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get active charging sessions (Customer)',
        description: 'Get all active charging sessions for the authenticated customer across all their bikes.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Active charging sessions retrieved successfully',
        type: [charging_session_dto_1.ChargingSessionResponseDto]
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getActiveSessions", null);
__decorate([
    (0, common_1.Get)('my-sessions'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get past charging sessions (Customer)',
        description: 'Get completed charging sessions for the authenticated customer with pagination and filters.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'bikeId', required: false, type: String, description: 'Filter by specific bike ID' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Past charging sessions retrieved successfully',
        type: (charging_session_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('bikeId')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('dateRangeStart')),
    __param(5, (0, common_1.Query)('dateRangeEnd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getMySessions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging session details (Customer)',
        description: 'Get full details of a specific charging session. Only the session owner can view their session.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Charging session ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session details retrieved successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Charging session not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ChargingSessionsController.prototype, "getSessionDetails", null);
__decorate([
    (0, common_1.Get)('analytics/summary'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get customer charging analytics (Customer)',
        description: 'Get charging session analytics for the authenticated customer including sessions per day/month and duration statistics.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer charging analytics retrieved successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('dateRangeStart')),
    __param(2, (0, common_1.Query)('dateRangeEnd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getCustomerAnalytics", null);
exports.ChargingSessionsController = ChargingSessionsController = __decorate([
    (0, swagger_1.ApiTags)('Charging Sessions'),
    (0, common_1.Controller)('charging-sessions'),
    __metadata("design:paramtypes", [typeof (_a = typeof charging_sessions_service_1.ChargingSessionsService !== "undefined" && charging_sessions_service_1.ChargingSessionsService) === "function" ? _a : Object])
], ChargingSessionsController);


/***/ }),
/* 259 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChargingSessionsService = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(152);
let ChargingSessionsService = class ChargingSessionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                skip,
                take: limit,
                orderBy: { startTime: 'desc' },
                include: {
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    bike: {
                        select: {
                            id: true,
                            serialNumber: true,
                            brand: true,
                            model: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count(),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getChargingSessionById(id) {
        const session = await this.prisma.chargingSession.findUnique({
            where: { id },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        return session;
    }
    async searchChargingSessions(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
        const whereConditions = {};
        if (filters.q && filters.q.trim() !== '') {
            whereConditions.OR = [
                { customer: { firstName: { contains: filters.q } } },
                { customer: { lastName: { contains: filters.q } } },
                { customer: { email: { contains: filters.q } } },
                { bike: { serialNumber: { contains: filters.q } } },
                { bike: { model: { contains: filters.q } } },
                { bike: { brand: { contains: filters.q } } },
            ];
        }
        if (filters.status && filters.status.trim() !== '') {
            whereConditions.status = filters.status;
        }
        if (filters.customerId && filters.customerId.trim() !== '') {
            whereConditions.customerId = filters.customerId;
        }
        if (filters.bikeId && filters.bikeId.trim() !== '') {
            whereConditions.bikeId = filters.bikeId;
        }
        if (filters.startDate || filters.endDate) {
            whereConditions.startTime = {};
            if (filters.startDate) {
                whereConditions.startTime.gte = new Date(filters.startDate);
            }
            if (filters.endDate) {
                whereConditions.startTime.lte = new Date(filters.endDate);
            }
        }
        if (filters.minAmount !== undefined || filters.maxAmount !== undefined) {
            whereConditions.amount = {};
            if (filters.minAmount !== undefined) {
                whereConditions.amount.gte = filters.minAmount;
            }
            if (filters.maxAmount !== undefined) {
                whereConditions.amount.lte = filters.maxAmount;
            }
        }
        const orderBy = {};
        if (filters.sortBy) {
            orderBy[filters.sortBy] = filters.sortOrder || 'desc';
        }
        else {
            orderBy.startTime = 'desc';
        }
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy,
                include: {
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                        },
                    },
                    bike: {
                        select: {
                            id: true,
                            serialNumber: true,
                            brand: true,
                            model: true,
                            status: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count({
                where: whereConditions,
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async startChargingSession(customerId, data) {
        const existingActiveSession = await this.prisma.chargingSession.findFirst({
            where: {
                customerId,
                bikeId: data.bikeId,
                status: 'ACTIVE',
            },
        });
        if (existingActiveSession) {
            throw new common_1.BadRequestException('Customer already has an active charging session for this bike');
        }
        const bike = await this.prisma.bike.findUnique({
            where: { id: data.bikeId },
        });
        if (!bike) {
            throw new common_1.NotFoundException('Bike not found');
        }
        if (bike.status !== 'AVAILABLE') {
            throw new common_1.BadRequestException('Bike is not available for charging');
        }
        const chargingSession = await this.prisma.chargingSession.create({
            data: {
                customerId: customerId,
                bikeId: data.bikeId,
                amount: data.amount,
                startTime: new Date(),
                status: 'ACTIVE',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        return chargingSession;
    }
    async endChargingSession(customerId, sessionId, endTime) {
        const session = await this.prisma.chargingSession.findUnique({
            where: { id: sessionId },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        if (session.customerId !== customerId) {
            throw new common_1.BadRequestException('This charging session does not belong to you');
        }
        if (session.status !== 'ACTIVE') {
            throw new common_1.BadRequestException(`Charging session is not active. Current status: ${session.status}`);
        }
        if (session.endTime) {
            throw new common_1.BadRequestException('Charging session has already ended');
        }
        const actualEndTime = endTime || new Date();
        if (actualEndTime < session.startTime) {
            throw new common_1.BadRequestException('End time cannot be before start time');
        }
        const updatedSession = await this.prisma.chargingSession.update({
            where: { id: sessionId },
            data: {
                endTime: actualEndTime,
                status: 'COMPLETED',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        return updatedSession;
    }
    async cancelChargingSession(customerId, sessionId) {
        const session = await this.prisma.chargingSession.findUnique({
            where: { id: sessionId },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        if (session.customerId !== customerId) {
            throw new common_1.BadRequestException('This charging session does not belong to you');
        }
        if (session.status !== 'ACTIVE') {
            throw new common_1.BadRequestException(`Charging session is not active. Current status: ${session.status}`);
        }
        if (session.endTime) {
            throw new common_1.BadRequestException('Charging session has already ended');
        }
        const endTime = new Date();
        const updatedSession = await this.prisma.chargingSession.update({
            where: { id: sessionId },
            data: {
                endTime,
                status: 'CANCELLED',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        return updatedSession;
    }
    async getActiveSessionsByCustomer(customerId) {
        return this.prisma.chargingSession.findMany({
            where: {
                customerId,
                status: 'ACTIVE',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
            orderBy: { startTime: 'desc' },
        });
    }
    async getMySessions(customerId, filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
        const whereConditions = {
            customerId,
            status: { in: ['COMPLETED', 'CANCELLED'] },
        };
        if (filters.bikeId) {
            whereConditions.bikeId = filters.bikeId;
        }
        if (filters.dateRangeStart || filters.dateRangeEnd) {
            whereConditions.startTime = {};
            if (filters.dateRangeStart) {
                whereConditions.startTime.gte = new Date(filters.dateRangeStart);
            }
            if (filters.dateRangeEnd) {
                whereConditions.startTime.lte = new Date(filters.dateRangeEnd);
            }
        }
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy: { startTime: 'desc' },
                include: {
                    bike: {
                        select: {
                            id: true,
                            serialNumber: true,
                            brand: true,
                            model: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count({
                where: whereConditions,
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getSessionDetails(customerId, sessionId) {
        const session = await this.prisma.chargingSession.findFirst({
            where: {
                id: sessionId,
                customerId,
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        return session;
    }
    async getCurrentActiveSession(customerId) {
        const session = await this.prisma.chargingSession.findFirst({
            where: {
                customerId,
                status: 'ACTIVE',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('No active charging session found');
        }
        return session;
    }
    async getCustomerAnalytics(customerId, dateRangeStart, dateRangeEnd) {
        console.log('🔍 Service: getCustomerAnalytics called with customerId:', customerId);
        const whereConditions = { customerId };
        if (dateRangeStart || dateRangeEnd) {
            whereConditions.startTime = {};
            if (dateRangeStart) {
                whereConditions.startTime.gte = new Date(dateRangeStart);
            }
            if (dateRangeEnd) {
                whereConditions.startTime.lte = new Date(dateRangeEnd);
            }
        }
        const allSessions = await this.prisma.chargingSession.findMany({
            where: whereConditions,
            orderBy: { startTime: 'desc' },
            include: {
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        console.log('🔍 Found sessions:', allSessions.length);
        const totalSessions = allSessions.length;
        const completedSessions = allSessions.filter(s => s.status === 'COMPLETED').length;
        const activeSessions = allSessions.filter(s => s.status === 'ACTIVE').length;
        const cancelledSessions = allSessions.filter(s => s.status === 'CANCELLED').length;
        const totalRevenue = allSessions
            .filter(s => s.status === 'COMPLETED')
            .reduce((sum, session) => sum + session.amount, 0);
        const sessionsWithDuration = allSessions
            .filter(s => s.endTime && s.status !== 'ACTIVE')
            .map(session => {
            const durationMs = session.endTime.getTime() - session.startTime.getTime();
            const durationMinutes = Math.round(durationMs / (1000 * 60));
            const durationHours = durationMinutes / 60;
            return {
                ...session,
                durationMinutes,
                durationHours,
            };
        });
        const totalDurationMinutes = sessionsWithDuration.reduce((sum, s) => sum + s.durationMinutes, 0);
        const averageDurationMinutes = sessionsWithDuration.length > 0 ? totalDurationMinutes / sessionsWithDuration.length : 0;
        const sessionsPerDay = await this.prisma.chargingSession.groupBy({
            by: ['startTime'],
            where: whereConditions,
            _count: {
                id: true,
            },
            _sum: {
                amount: true,
            },
            orderBy: {
                startTime: 'desc',
            },
            take: 30,
        });
        const sessionsPerMonth = await this.prisma.chargingSession.groupBy({
            by: ['startTime'],
            where: whereConditions,
            _count: {
                id: true,
            },
            _sum: {
                amount: true,
            },
            orderBy: {
                startTime: 'desc',
            },
            take: 12,
        });
        const recentSessions = allSessions.slice(0, 10).map(session => {
            const sessionData = {
                id: session.id,
                startTime: session.startTime,
                endTime: session.endTime,
                status: session.status,
                amount: session.amount,
                bike: session.bike,
            };
            if (session.endTime && session.status !== 'ACTIVE') {
                const durationMs = session.endTime.getTime() - session.startTime.getTime();
                sessionData.durationMinutes = Math.round(durationMs / (1000 * 60));
                sessionData.durationHours = sessionData.durationMinutes / 60;
                sessionData.durationFormatted = this.formatDuration(sessionData.durationMinutes);
            }
            else if (session.status === 'ACTIVE') {
                const durationMs = new Date().getTime() - session.startTime.getTime();
                sessionData.durationMinutes = Math.round(durationMs / (1000 * 60));
                sessionData.durationHours = sessionData.durationMinutes / 60;
                sessionData.durationFormatted = this.formatDuration(sessionData.durationMinutes);
                sessionData.isActive = true;
            }
            return sessionData;
        });
        const hourlyDistribution = this.calculateHourlyDistribution(allSessions);
        const dailyStats = this.calculateDailyStats(sessionsPerDay);
        const enhancedResponse = {
            totalSessions,
            completedSessions,
            activeSessions,
            cancelledSessions,
            totalRevenue,
            totalDurationMinutes,
            totalDurationHours: totalDurationMinutes / 60,
            averageDurationMinutes,
            averageDurationHours: averageDurationMinutes / 60,
            dailyStats,
            sessionsPerDay: sessionsPerDay.map(day => ({
                date: day.startTime,
                count: day._count.id,
                revenue: day._sum.amount || 0,
            })),
            sessionsPerMonth: sessionsPerMonth.map(month => ({
                date: month.startTime,
                count: month._count.id,
                revenue: month._sum.amount || 0,
            })),
            hourlyDistribution,
            recentSessions,
            summary: {
                totalSessions,
                completedSessions,
                activeSessions,
                cancelledSessions,
                totalRevenue,
                averageRevenuePerSession: completedSessions > 0 ? totalRevenue / completedSessions : 0,
                averageDurationMinutes,
                totalDurationHours: totalDurationMinutes / 60,
            }
        };
        console.log('🔍 Enhanced response keys:', Object.keys(enhancedResponse));
        console.log('🔍 Enhanced response has totalDurationMinutes:', 'totalDurationMinutes' in enhancedResponse);
        console.log('🔍 Enhanced response has recentSessions:', 'recentSessions' in enhancedResponse);
        return enhancedResponse;
    }
    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    }
    calculateHourlyDistribution(sessions) {
        const hourlyCounts = new Array(24).fill(0);
        sessions.forEach(session => {
            const hour = session.startTime.getHours();
            hourlyCounts[hour]++;
        });
        const total = sessions.length;
        return hourlyCounts.map((count, hour) => ({
            hour,
            count,
            percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        }));
    }
    calculateDailyStats(sessionsPerDay) {
        if (sessionsPerDay.length === 0) {
            return {
                averageSessionsPerDay: 0,
                averageRevenuePerDay: 0,
                mostActiveDay: '',
                mostActiveDayCount: 0,
            };
        }
        const totalSessions = sessionsPerDay.reduce((sum, day) => sum + day._count.id, 0);
        const totalRevenue = sessionsPerDay.reduce((sum, day) => sum + (day._sum.amount || 0), 0);
        const mostActiveDay = sessionsPerDay.reduce((max, day) => day._count.id > max._count.id ? day : max);
        return {
            averageSessionsPerDay: Math.round((totalSessions / sessionsPerDay.length) * 100) / 100,
            averageRevenuePerDay: Math.round((totalRevenue / sessionsPerDay.length) * 100) / 100,
            mostActiveDay: mostActiveDay.startTime.toISOString().split('T')[0],
            mostActiveDayCount: mostActiveDay._count.id,
        };
    }
    async getAllSessions(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
        const whereConditions = {};
        if (filters.customerId) {
            whereConditions.customerId = filters.customerId;
        }
        if (filters.bikeId) {
            whereConditions.bikeId = filters.bikeId;
        }
        if (filters.status) {
            whereConditions.status = filters.status;
        }
        if (filters.dateRangeStart || filters.dateRangeEnd) {
            whereConditions.startTime = {};
            if (filters.dateRangeStart) {
                whereConditions.startTime.gte = new Date(filters.dateRangeStart);
            }
            if (filters.dateRangeEnd) {
                whereConditions.startTime.lte = new Date(filters.dateRangeEnd);
            }
        }
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy: { startTime: 'desc' },
                include: {
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    bike: {
                        select: {
                            id: true,
                            serialNumber: true,
                            brand: true,
                            model: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count({
                where: whereConditions,
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async adminEndSession(sessionId, endTime) {
        const session = await this.prisma.chargingSession.findUnique({
            where: { id: sessionId },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        if (session.status !== 'ACTIVE') {
            throw new common_1.BadRequestException('Charging session is not active');
        }
        const actualEndTime = endTime || new Date();
        const updatedSession = await this.prisma.chargingSession.update({
            where: { id: sessionId },
            data: {
                endTime: actualEndTime,
                status: 'COMPLETED',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        return updatedSession;
    }
    async adminGetSessionDetails(sessionId) {
        const session = await this.prisma.chargingSession.findUnique({
            where: { id: sessionId },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        return session;
    }
    async getAdminAnalyticsSummary(dateRangeStart, dateRangeEnd) {
        const whereConditions = {};
        if (dateRangeStart || dateRangeEnd) {
            whereConditions.startTime = {};
            if (dateRangeStart) {
                whereConditions.startTime.gte = new Date(dateRangeStart);
            }
            if (dateRangeEnd) {
                whereConditions.startTime.lte = new Date(dateRangeEnd);
            }
        }
        const [totalSessions, activeSessions, completedSessions, totalRevenue] = await Promise.all([
            this.prisma.chargingSession.count({ where: whereConditions }),
            this.prisma.chargingSession.count({ where: { ...whereConditions, status: 'ACTIVE' } }),
            this.prisma.chargingSession.count({ where: { ...whereConditions, status: 'COMPLETED' } }),
            this.prisma.chargingSession.aggregate({
                where: { ...whereConditions, status: 'COMPLETED' },
                _sum: { amount: true },
            }),
        ]);
        return {
            totalSessions,
            activeSessions,
            completedSessions,
            cancelledSessions: totalSessions - activeSessions - completedSessions,
            totalRevenue: totalRevenue._sum.amount || 0,
            totalEnergyDelivered: totalRevenue._sum.amount || 0,
            averageRevenuePerSession: completedSessions > 0 ? (totalRevenue._sum.amount || 0) / completedSessions : 0,
        };
    }
    async getChargingSessionStats(period, startDate, endDate) {
        let dateFilter = {};
        if (startDate && endDate) {
            dateFilter = {
                startTime: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            };
        }
        else if (period) {
            const now = new Date();
            let start;
            switch (period) {
                case 'today':
                    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case 'week':
                    start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case 'month':
                    start = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                case 'year':
                    start = new Date(now.getFullYear(), 0, 1);
                    break;
                default:
                    start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            }
            dateFilter = {
                startTime: {
                    gte: start,
                },
            };
        }
        const [totalSessions, activeSessions, completedSessions, cancelledSessions, totalRevenue] = await Promise.all([
            this.prisma.chargingSession.count({
                where: dateFilter,
            }),
            this.prisma.chargingSession.count({
                where: { ...dateFilter, status: 'ACTIVE' },
            }),
            this.prisma.chargingSession.count({
                where: { ...dateFilter, status: 'COMPLETED' },
            }),
            this.prisma.chargingSession.count({
                where: { ...dateFilter, status: 'CANCELLED' },
            }),
            this.prisma.chargingSession.aggregate({
                where: { ...dateFilter, status: 'COMPLETED' },
                _sum: {
                    amount: true,
                },
            }),
        ]);
        return {
            totalSessions,
            activeSessions,
            completedSessions,
            cancelledSessions,
            totalRevenue: totalRevenue._sum.amount || 0,
            period: period || 'custom',
        };
    }
    async getRevenueAnalytics(period = 'month', groupBy = 'day') {
        const now = new Date();
        let start;
        switch (period) {
            case 'week':
                start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case 'year':
                start = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                break;
            default:
                start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }
        const sessions = await this.prisma.chargingSession.findMany({
            where: {
                status: 'COMPLETED',
                startTime: {
                    gte: start,
                },
            },
            select: {
                amount: true,
                startTime: true,
            },
            orderBy: {
                startTime: 'asc',
            },
        });
        const groupedData = {};
        sessions.forEach(session => {
            let key;
            switch (groupBy) {
                case 'day':
                    key = session.startTime.toISOString().split('T')[0];
                    break;
                case 'week':
                    const weekStart = new Date(session.startTime);
                    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                    key = weekStart.toISOString().split('T')[0];
                    break;
                case 'month':
                    key = `${session.startTime.getFullYear()}-${String(session.startTime.getMonth() + 1).padStart(2, '0')}`;
                    break;
                default:
                    key = session.startTime.toISOString().split('T')[0];
            }
            groupedData[key] = (groupedData[key] || 0) + session.amount;
        });
        return {
            period,
            groupBy,
            data: Object.entries(groupedData).map(([date, revenue]) => ({
                date,
                revenue: parseFloat(revenue.toFixed(2)),
            })),
            totalRevenue: sessions.reduce((sum, session) => sum + session.amount, 0),
        };
    }
    async getChargingSessionsByCustomer(customerId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                where: { customerId },
                skip,
                take: limit,
                orderBy: { startTime: 'desc' },
                include: {
                    bike: {
                        select: {
                            id: true,
                            serialNumber: true,
                            brand: true,
                            model: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count({
                where: { customerId },
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getChargingSessionsByBike(bikeId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                where: { bikeId },
                skip,
                take: limit,
                orderBy: { startTime: 'desc' },
                include: {
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count({
                where: { bikeId },
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getChargingSessionReports(filters) {
        const whereConditions = {};
        if (filters.startDate || filters.endDate) {
            whereConditions.startTime = {};
            if (filters.startDate) {
                whereConditions.startTime.gte = new Date(filters.startDate);
            }
            if (filters.endDate) {
                whereConditions.startTime.lte = new Date(filters.endDate);
            }
        }
        if (filters.status) {
            whereConditions.status = filters.status;
        }
        if (filters.customerId) {
            whereConditions.customerId = filters.customerId;
        }
        if (filters.bikeId) {
            whereConditions.bikeId = filters.bikeId;
        }
        const sessions = await this.prisma.chargingSession.findMany({
            where: whereConditions,
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
            orderBy: { startTime: 'desc' },
        });
        const sessionsWithTransactions = sessions.map(session => ({
            ...session,
            transaction: {
                id: `txn_${session.id}`,
                amount: session.amount,
                status: session.status === 'COMPLETED' ? 'SUCCESS' : session.status === 'CANCELLED' ? 'FAILED' : 'PENDING',
                paymentMethod: 'WALLET',
                transactionTime: session.endTime || session.startTime,
                reference: `CHG_${session.id}`,
            }
        }));
        return {
            sessions: sessionsWithTransactions,
            total: sessions.length,
            filters,
            generatedAt: new Date(),
        };
    }
};
exports.ChargingSessionsService = ChargingSessionsService;
exports.ChargingSessionsService = ChargingSessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], ChargingSessionsService);


/***/ }),
/* 260 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginatedResponseDto = exports.ChargingSessionResponseDto = exports.EndChargingSessionDto = exports.StartChargingSessionDto = exports.SearchChargingSessionsDto = exports.UpdateChargingSessionDto = exports.CreateChargingSessionDto = exports.ChargingSessionStatus = void 0;
const class_validator_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'class-validator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const swagger_1 = __webpack_require__(42);
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
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
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
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ChargingSessionResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Charging session last update time' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
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


/***/ }),
/* 261 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * cookie-parser
 * Copyright(c) 2014 TJ Holowaychuk
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var cookie = __webpack_require__(262)
var signature = __webpack_require__(263)

/**
 * Module exports.
 * @public
 */

module.exports = cookieParser
module.exports.JSONCookie = JSONCookie
module.exports.JSONCookies = JSONCookies
module.exports.signedCookie = signedCookie
module.exports.signedCookies = signedCookies

/**
 * Parse Cookie header and populate `req.cookies`
 * with an object keyed by the cookie names.
 *
 * @param {string|array} [secret] A string (or array of strings) representing cookie signing secret(s).
 * @param {Object} [options]
 * @return {Function}
 * @public
 */

function cookieParser (secret, options) {
  var secrets = !secret || Array.isArray(secret)
    ? (secret || [])
    : [secret]

  return function cookieParser (req, res, next) {
    if (req.cookies) {
      return next()
    }

    var cookies = req.headers.cookie

    req.secret = secrets[0]
    req.cookies = Object.create(null)
    req.signedCookies = Object.create(null)

    // no cookies
    if (!cookies) {
      return next()
    }

    req.cookies = cookie.parse(cookies, options)

    // parse signed cookies
    if (secrets.length !== 0) {
      req.signedCookies = signedCookies(req.cookies, secrets)
      req.signedCookies = JSONCookies(req.signedCookies)
    }

    // parse JSON cookies
    req.cookies = JSONCookies(req.cookies)

    next()
  }
}

/**
 * Parse JSON cookie string.
 *
 * @param {String} str
 * @return {Object} Parsed object or undefined if not json cookie
 * @public
 */

function JSONCookie (str) {
  if (typeof str !== 'string' || str.substr(0, 2) !== 'j:') {
    return undefined
  }

  try {
    return JSON.parse(str.slice(2))
  } catch (err) {
    return undefined
  }
}

/**
 * Parse JSON cookies.
 *
 * @param {Object} obj
 * @return {Object}
 * @public
 */

function JSONCookies (obj) {
  var cookies = Object.keys(obj)
  var key
  var val

  for (var i = 0; i < cookies.length; i++) {
    key = cookies[i]
    val = JSONCookie(obj[key])

    if (val) {
      obj[key] = val
    }
  }

  return obj
}

/**
 * Parse a signed cookie string, return the decoded value.
 *
 * @param {String} str signed cookie string
 * @param {string|array} secret
 * @return {String} decoded value
 * @public
 */

function signedCookie (str, secret) {
  if (typeof str !== 'string') {
    return undefined
  }

  if (str.substr(0, 2) !== 's:') {
    return str
  }

  var secrets = !secret || Array.isArray(secret)
    ? (secret || [])
    : [secret]

  for (var i = 0; i < secrets.length; i++) {
    var val = signature.unsign(str.slice(2), secrets[i])

    if (val !== false) {
      return val
    }
  }

  return false
}

/**
 * Parse signed cookies, returning an object containing the decoded key/value
 * pairs, while removing the signed key from obj.
 *
 * @param {Object} obj
 * @param {string|array} secret
 * @return {Object}
 * @public
 */

function signedCookies (obj, secret) {
  var cookies = Object.keys(obj)
  var dec
  var key
  var ret = Object.create(null)
  var val

  for (var i = 0; i < cookies.length; i++) {
    key = cookies[i]
    val = obj[key]
    dec = signedCookie(val, secret)

    if (val !== dec) {
      ret[key] = dec
      delete obj[key]
    }
  }

  return ret
}


/***/ }),
/* 262 */
/***/ ((module) => {

"use strict";
module.exports = require("cookie");

/***/ }),
/* 263 */
/***/ ((module) => {

"use strict";
module.exports = require("cookie-signature");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;