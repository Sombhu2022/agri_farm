// Import centralized environment variables
import { env, environment } from './env';

// Import all configuration modules
import databaseConfig from './database';
import authConfig from './auth';
import redisConfig from './redis';
import emailConfig from './email';
import smsConfig from './sms';
import uploadConfig from './upload';
import serverConfig from './server';
import { authConfig as authConfigObj } from './auth';
import { serverConfig as serverConfigObj } from './server';

// Type imports
import type { AuthConfig } from '@/types/auth.types';
import type { ServerConfig } from './server';

// Re-export all configurations
export { default as database } from './database';
export { default as auth } from './auth';
export { default as redis } from './redis';
export { default as email } from './email';
export { default as sms } from './sms';
export { default as upload } from './upload';
export { default as server } from './server';

// Named exports for direct access
export { 
  connectDatabase, 
  disconnectDatabase, 
  clearDatabase, 
  healthCheck as databaseHealthCheck 
} from './database';

export { 
  generateTokens, 
  verifyAccessToken, 
  verifyRefreshToken,
  validatePasswordStrength,
  authConfig as authConfiguration
} from './auth';

export { 
  redis,
  CacheService,
  RateLimiter,
  SessionManager,
  CACHE_TTL,
  CACHE_KEYS,
  checkRedisHealth
} from './redis';

export { 
  EmailService,
  checkEmailHealth
} from './email';

export { 
  SMSService,
  SMS_TEMPLATES,
  checkSMSHealth
} from './sms';

export { 
  upload,
  UploadService,
  checkUploadHealth
} from './upload';

export { 
  serverConfig as serverConfiguration,
  API_RESPONSES,
  HTTP_STATUS,
  TIMEOUTS,
  FEATURE_FLAGS,
  VALIDATION_CONFIG,
  PAGINATION,
  ConfigValidator
} from './server';

// Central configuration object
export interface AppConfig {
  env: string;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  server: ServerConfig;
  auth: AuthConfig;
  database: {
    uri: string;
    testUri: string;
    maxPoolSize: number;
    serverSelectionTimeout: number;
    socketTimeout: number;
    optional: boolean;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
    keyPrefix: string;
  };
  email: {
    service: string;
    from: { name: string; address: string };
    templates: Record<string, string>;
    apiKey?: string;
    smtp?: {
      host: string;
      port: number;
      user: string;
      pass: string;
    };
    mailgun?: {
      username: string;
      password: string;
    };
  };
  sms: {
    service: string;
    rateLimits: {
      perMinute: number;
      perHour: number;
      perDay: number;
    };
    twilio?: {
      accountSid: string;
      authToken: string;
      phoneNumber: string;
    };
  };
  upload: {
    storage: string;
    limits: {
      fileSize: number;
      files: number;
    };
    allowedMimeTypes: string[];
    cloudinary?: {
      cloudName: string;
      apiKey: string;
      apiSecret: string;
    };
    aws?: {
      accessKeyId: string;
      secretAccessKey: string;
      region: string;
      bucket: string;
    };
  };
  external: {
    weatherApi: {
      baseUrl: string;
      apiKey: string;
      providers: {
        openweather?: { apiKey: string };
        weatherapi?: { apiKey: string };
        accuweather?: { apiKey: string };
      };
      primaryProvider: string;
      backupProviders: string[];
      updateInterval: number;
      cacheExpiry: number;
    };
    mlApi: {
      baseUrl: string;
      apiKey: string;
    };
    maps: {
      apiKey: string;
    };
  };
  logging: {
    level: string;
    filePath: string;
    errorFilePath: string;
    maxFiles: number;
    maxSize: string;
    enableConsole: boolean;
    enableFile: boolean;
  };
}

// Create the main configuration object
export const config: AppConfig = {
  env: env.NODE_ENV,
  isDevelopment: environment.isDevelopment,
  isProduction: environment.isProduction,
  isTest: environment.isTest,
  server: serverConfigObj,
  auth: authConfigObj,
  database: {
    uri: env.MONGODB_URI,
    testUri: env.MONGODB_TEST_URI,
    maxPoolSize: env.DB_MAX_POOL_SIZE,
    serverSelectionTimeout: env.DB_SERVER_SELECTION_TIMEOUT,
    socketTimeout: env.DB_SOCKET_TIMEOUT,
    optional: env.DATABASE_OPTIONAL,
  },
  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD,
    keyPrefix: env.REDIS_KEY_PREFIX,
  },
  email: {
    service: env.EMAIL_SERVICE,
    from: {
      name: env.EMAIL_FROM_NAME,
      address: env.EMAIL_FROM,
    },
    templates: {
      baseUrl: env.EMAIL_TEMPLATE_BASE_URL,
    },
    apiKey: env.EMAIL_API_KEY,
    smtp: {
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    mailgun: {
      username: env.MAILGUN_USERNAME,
      password: env.MAILGUN_PASSWORD,
    },
  },
  sms: {
    service: env.SMS_SERVICE,
    rateLimits: {
      perMinute: env.SMS_RATE_LIMIT_MINUTE,
      perHour: env.SMS_RATE_LIMIT_HOUR,
      perDay: env.SMS_RATE_LIMIT_DAY,
    },
    twilio: {
      accountSid: env.TWILIO_ACCOUNT_SID,
      authToken: env.TWILIO_AUTH_TOKEN,
      phoneNumber: env.TWILIO_PHONE_NUMBER,
    },
  },
  upload: {
    storage: env.UPLOAD_STORAGE,
    limits: {
      fileSize: env.MAX_FILE_SIZE,
      files: env.MAX_FILES_PER_UPLOAD,
    },
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ],
    cloudinary: {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
      apiKey: env.CLOUDINARY_API_KEY,
      apiSecret: env.CLOUDINARY_API_SECRET,
    },
    aws: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      region: env.AWS_REGION,
      bucket: env.AWS_BUCKET,
    },
  },
  external: {
    weatherApi: {
      baseUrl: env.WEATHER_API_URL,
      apiKey: env.WEATHER_API_KEY,
      providers: {
        openweather: env.OPENWEATHER_API_KEY ? { apiKey: env.OPENWEATHER_API_KEY } : undefined,
        weatherapi: env.WEATHERAPI_KEY ? { apiKey: env.WEATHERAPI_KEY } : undefined,
        accuweather: env.ACCUWEATHER_API_KEY ? { apiKey: env.ACCUWEATHER_API_KEY } : undefined,
      },
      primaryProvider: env.WEATHER_PRIMARY_PROVIDER,
      backupProviders: env.WEATHER_BACKUP_PROVIDERS,
      updateInterval: env.WEATHER_UPDATE_INTERVAL,
      cacheExpiry: env.WEATHER_CACHE_EXPIRY,
    },
    mlApi: {
      baseUrl: env.ML_API_URL,
      apiKey: env.ML_API_KEY,
    },
    maps: {
      apiKey: env.GOOGLE_MAPS_API_KEY,
    },
  },
  logging: {
    level: env.LOG_LEVEL,
    filePath: env.LOG_FILE_PATH,
    errorFilePath: env.ERROR_LOG_FILE_PATH,
    maxFiles: env.LOG_MAX_FILES,
    maxSize: env.LOG_MAX_SIZE,
    enableConsole: env.ENABLE_CONSOLE_LOGGING,
    enableFile: env.ENABLE_FILE_LOGGING,
  },
};

// Configuration validation
export class ConfigurationManager {
  /**
   * Validate all configurations on application startup
   */
  static validateAll(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate server configuration
    const serverValidation = ConfigValidator.validate();
    if (!serverValidation.isValid) {
      errors.push(...serverValidation.errors.map(err => `Server: ${err}`));
    }

    // Validate database configuration
    if (!config.database.uri) {
      errors.push('Database: MongoDB URI is required');
    }

    // Validate auth configuration
    if (!config.auth.jwt.secret) {
      errors.push('Auth: JWT secret is required');
    }

    if (!config.auth.jwt.refreshSecret) {
      errors.push('Auth: JWT refresh secret is required');
    }

    if (config.auth.jwt.secret === config.auth.jwt.refreshSecret) {
      errors.push('Auth: JWT secret and refresh secret must be different');
    }

    // Validate external services in production
    if (config.isProduction) {
      if (!config.external.weatherApi.apiKey) {
        errors.push('External: Weather API key is required in production');
      }

      // Validate email service configuration based on service type
      if (config.email.service === 'sendgrid' && !config.email.apiKey) {
        errors.push('Email: SendGrid API key is required');
      }

      if (config.email.service === 'smtp') {
        if (!config.email.smtp?.host || !config.email.smtp?.user || !config.email.smtp?.pass) {
          errors.push('Email: SMTP configuration is incomplete');
        }
      }

      if (config.email.service === 'mailgun') {
        if (!config.email.mailgun?.username || !config.email.mailgun?.password) {
          errors.push('Email: Mailgun configuration is incomplete');
        }
      }

      // Validate SMS service configuration
      if (config.sms.service === 'twilio') {
        if (!config.sms.twilio?.accountSid || !config.sms.twilio?.authToken) {
          errors.push('SMS: Twilio configuration is incomplete');
        }
      }

      // Validate upload service configuration
      if (config.upload.storage === 'cloudinary') {
        if (!config.upload.cloudinary?.cloudName || !config.upload.cloudinary?.apiKey) {
          errors.push('Upload: Cloudinary configuration is incomplete');
        }
      }

      if (config.upload.storage === 's3') {
        if (!config.upload.aws?.accessKeyId || !config.upload.aws?.secretAccessKey) {
          errors.push('Upload: AWS S3 configuration is incomplete');
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Log configuration summary (without sensitive data)
   */
  static logConfigurationSummary(): void {
    const logger = require('@/utils/logger').logger;

    logger.info('Configuration Summary', {
      environment: config.env,
      server: {
        port: config.server.port,
        host: config.server.host,
        apiVersion: config.server.apiVersion,
      },
      services: {
        database: 'MongoDB',
        cache: 'Redis',
        email: config.email.service,
        sms: config.sms.service,
        storage: config.upload.storage,
      },
      features: {
        healthChecks: config.server.monitoring.enableHealthChecks,
        metrics: config.server.monitoring.enableMetrics,
        swagger: config.server.swagger.enabled,
        caching: serverConfig.features.ENABLE_CACHING,
        websockets: serverConfig.features.ENABLE_WEBSOCKETS,
        notifications: serverConfig.features.ENABLE_NOTIFICATIONS,
      },
      security: {
        cors: config.server.cors ? 'enabled' : 'disabled',
        helmet: 'enabled',
        rateLimit: serverConfig.features.ENABLE_RATE_LIMITING ? 'enabled' : 'disabled',
        trustProxy: config.server.security.trustProxy,
      },
    });
  }

  /**
   * Get configuration for specific environment
   */
  static getEnvironmentConfig(env: string): Partial<AppConfig> {
    const envConfigs = {
      development: {
        database: {
          uri: 'mongodb://localhost:27017/agri_farm_dev',
          testUri: 'mongodb://localhost:27017/agri_farm_test',
          maxPoolSize: 10,
          serverSelectionTimeout: 5000,
          socketTimeout: 45000,
          optional: true,
        },
        external: {
          mlApi: {
            baseUrl: 'http://localhost:5000',
            apiKey: '',
          },
          weatherApi: {
            baseUrl: 'https://api.openweathermap.org/data/2.5',
            apiKey: '',
            providers: {},
            primaryProvider: 'openweather',
            backupProviders: ['weatherapi'],
            updateInterval: 15,
            cacheExpiry: 30,
          },
          maps: {
            apiKey: '',
          },
        },
      },
      production: {
        database: {
          uri: config.database.uri,
          testUri: config.database.testUri,
          maxPoolSize: config.database.maxPoolSize,
          serverSelectionTimeout: config.database.serverSelectionTimeout,
          socketTimeout: config.database.socketTimeout,
          optional: false,
        },
        external: {
          mlApi: {
            baseUrl: config.external.mlApi.baseUrl,
            apiKey: config.external.mlApi.apiKey,
          },
          weatherApi: config.external.weatherApi,
          maps: config.external.maps,
        },
      },
      test: {
        database: {
          uri: 'mongodb://localhost:27017/agri_farm_test',
          testUri: 'mongodb://localhost:27017/agri_farm_test',
          maxPoolSize: 5,
          serverSelectionTimeout: 2000,
          socketTimeout: 10000,
          optional: true,
        },
        external: {
          mlApi: {
            baseUrl: 'http://localhost:5001',
            apiKey: '',
          },
          weatherApi: {
            baseUrl: 'https://api.openweathermap.org/data/2.5',
            apiKey: '',
            providers: {},
            primaryProvider: 'openweather',
            backupProviders: ['weatherapi'],
            updateInterval: 15,
            cacheExpiry: 30,
          },
          maps: {
            apiKey: '',
          },
        },
      },
    };

    return envConfigs[env as keyof typeof envConfigs] || {};
  }

  /**
   * Health check for all services
   */
  static async performHealthCheck(): Promise<{
    status: 'healthy' | 'unhealthy';
    services: Record<string, { status: 'up' | 'down'; details?: any }>;
    timestamp: string;
  }> {
    const results: Record<string, { status: 'up' | 'down'; details?: any }> = {};

    try {
      // Check database
      const dbHealth = await databaseConfig.healthCheck();
      results.database = { status: dbHealth.status, details: dbHealth.details };
    } catch (error) {
      results.database = { status: 'down', details: { error: 'Connection failed' } };
    }

    try {
      // Check Redis
      const redisHealth = await redisConfig.checkRedisHealth();
      results.redis = { status: redisHealth.status, details: redisHealth.details };
    } catch (error) {
      results.redis = { status: 'down', details: { error: 'Connection failed' } };
    }

    try {
      // Check email service
      const emailHealth = await emailConfig.checkEmailHealth();
      results.email = { status: emailHealth.status, details: emailHealth.details };
    } catch (error) {
      results.email = { status: 'down', details: { error: 'Service unavailable' } };
    }

    try {
      // Check SMS service
      const smsHealth = await smsConfig.checkSMSHealth();
      results.sms = { status: smsHealth.status, details: smsHealth.details };
    } catch (error) {
      results.sms = { status: 'down', details: { error: 'Service unavailable' } };
    }

    try {
      // Check upload service
      const uploadHealth = await uploadConfig.checkUploadHealth();
      results.upload = { status: uploadHealth.status, details: uploadHealth.details };
    } catch (error) {
      results.upload = { status: 'down', details: { error: 'Service unavailable' } };
    }

    // Determine overall health
    const unhealthyServices = Object.values(results).filter(service => service.status === 'down');
    const overallStatus = unhealthyServices.length === 0 ? 'healthy' : 'unhealthy';

    return {
      status: overallStatus,
      services: results,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Log configuration summary (detailed)
   */
  static logConfiguration(): void {
    const logger = require('@/utils/logger').logger;
    logger.info('Detailed configuration loaded', {
      environment: config.env,
      server: {
        port: config.server.port,
        host: config.server.host,
        apiVersion: config.server.apiVersion,
      },
      features: FEATURE_FLAGS,
      monitoring: {
        healthChecks: config.server.monitoring.enableHealthChecks,
        metrics: config.server.monitoring.enableMetrics,
        swagger: config.server.swagger.enabled,
      },
      services: {
        database: config.database.optional ? 'optional' : 'required',
        email: config.email.service,
        sms: config.sms.service,
        upload: config.upload.storage,
      },
    });
  }

  /**
   * Initialize configurations
   */
  static async initialize(): Promise<void> {
    // Validate configuration
    const validation = this.validateAll();
    if (!validation.isValid) {
      const logger = require('@/utils/logger').logger;
      logger.error('Configuration validation failed', {
        errors: validation.errors,
      });
      throw new Error(`Configuration validation failed: ${validation.errors.join(', ')}`);
    }

    // Log configuration summary
    this.logConfigurationSummary();

    // Initialize services that need setup
    this.logConfiguration();
  }
}

// Default export
export default {
  config,
  manager: ConfigurationManager,
  
  // Service configurations
  database: databaseConfig,
  auth: authConfig,
  redis: redisConfig,
  email: emailConfig,
  sms: smsConfig,
  upload: uploadConfig,
  server: serverConfig,
};