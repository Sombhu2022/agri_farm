import { config as dotenvConfig } from 'dotenv';
import path from 'path';

// Load environment variables
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
const envPath = path.resolve(process.cwd(), envFile);
dotenvConfig({ path: envPath });

// Environment helper functions
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

// Centralized environment variable access
export const env = {
  // Node environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Server configuration
  PORT: parseInt(process.env.PORT || '3000', 10),
  HOST: process.env.HOST || '0.0.0.0',
  API_VERSION: process.env.API_VERSION || 'v1',
  
  // Database configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/agri_farm',
  MONGODB_TEST_URI: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/agri_farm_test',
  DB_MAX_POOL_SIZE: parseInt(process.env.DB_MAX_POOL_SIZE || '10', 10),
  DB_SERVER_SELECTION_TIMEOUT: parseInt(process.env.DB_SERVER_SELECTION_TIMEOUT || '5000', 10),
  DB_SOCKET_TIMEOUT: parseInt(process.env.DB_SOCKET_TIMEOUT || '45000', 10),
  DATABASE_OPTIONAL: process.env.DATABASE_OPTIONAL === 'true',
  
  // Redis configuration
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_KEY_PREFIX: process.env.REDIS_KEY_PREFIX || 'agri_farm:',
  
  // Authentication
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-jwt-secret-change-in-production',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-change-in-production',
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || '15m',
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '7d',
  SESSION_SECRET: process.env.SESSION_SECRET || 'fallback-session-secret-change-in-production',
  SESSION_MAX_AGE: parseInt(process.env.SESSION_MAX_AGE || '86400000', 10),
  
  // Email configuration
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'smtp',
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@agrifarm.com',
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || 'Agri Farm',
  EMAIL_API_KEY: process.env.EMAIL_API_KEY,
  EMAIL_TEMPLATE_BASE_URL: process.env.EMAIL_TEMPLATE_BASE_URL || 'https://app.agrifarm.com/templates',
  
  // SMTP configuration
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SMTP_SECURE: process.env.SMTP_SECURE || 'false',
  
  // Mailgun configuration
  MAILGUN_USERNAME: process.env.MAILGUN_USERNAME || '',
  MAILGUN_PASSWORD: process.env.MAILGUN_PASSWORD || '',
  
  // SMS configuration
  SMS_SERVICE: process.env.SMS_SERVICE || 'twilio',
  SMS_RATE_LIMIT_MINUTE: parseInt(process.env.SMS_RATE_LIMIT_MINUTE || '5', 10),
  SMS_RATE_LIMIT_HOUR: parseInt(process.env.SMS_RATE_LIMIT_HOUR || '20', 10),
  SMS_RATE_LIMIT_DAY: parseInt(process.env.SMS_RATE_LIMIT_DAY || '50', 10),
  
  // Twilio configuration
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || '',
  TWILIO_VERIFY_SERVICE_SID: process.env.TWILIO_VERIFY_SERVICE_SID || '',
  
  // Upload configuration
  UPLOAD_STORAGE: process.env.UPLOAD_STORAGE || 'cloudinary',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
  MAX_FILES_PER_UPLOAD: parseInt(process.env.MAX_FILES_PER_UPLOAD || '10', 10),
  
  // Cloudinary configuration
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  
  // AWS configuration
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  AWS_BUCKET: process.env.AWS_BUCKET || '',
  
  // Weather API configuration
  WEATHER_API_URL: process.env.WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY || '',
  WEATHER_PRIMARY_PROVIDER: process.env.WEATHER_PRIMARY_PROVIDER || 'openweather',
  WEATHER_BACKUP_PROVIDERS: (process.env.WEATHER_BACKUP_PROVIDERS || 'weatherapi').split(','),
  WEATHER_UPDATE_INTERVAL: parseInt(process.env.WEATHER_UPDATE_INTERVAL || '15', 10),
  WEATHER_CACHE_EXPIRY: parseInt(process.env.WEATHER_CACHE_EXPIRY || '30', 10),
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || '',
  WEATHERAPI_KEY: process.env.WEATHERAPI_KEY || '',
  ACCUWEATHER_API_KEY: process.env.ACCUWEATHER_API_KEY || '',
  
  // ML API configuration
  ML_API_URL: process.env.ML_API_URL || 'http://localhost:5000',
  ML_API_KEY: process.env.ML_API_KEY || '',
  ML_CONFIDENCE_THRESHOLD: parseFloat(process.env.ML_CONFIDENCE_THRESHOLD || '0.7'),
  ML_TIMEOUT_SECONDS: parseInt(process.env.ML_TIMEOUT_SECONDS || '10', 10),
  ML_PRIMARY_MODEL: process.env.ML_PRIMARY_MODEL || 'plant_id',
  ML_FALLBACK_MODEL: process.env.ML_FALLBACK_MODEL || 'tensorflow',
  ML_USE_ENSEMBLE: process.env.ML_USE_ENSEMBLE === 'true',
  ML_IMAGE_MAX_SIZE: process.env.ML_IMAGE_MAX_SIZE || '2048',
  ML_SUPPORTED_FORMATS: process.env.ML_SUPPORTED_FORMATS || 'jpg,jpeg,png,webp',
  
  // Plant ID API
  PLANT_ID_API_KEY: process.env.PLANT_ID_API_KEY || '',
  PLANT_ID_API_URL: process.env.PLANT_ID_API_URL || 'https://api.plant.id/v3',
  
  // PlantNet API
  PLANTNET_API_KEY: process.env.PLANTNET_API_KEY || '',
  PLANTNET_API_URL: process.env.PLANTNET_API_URL || 'https://my-api.plantnet.org/v1',
  PLANTNET_PROJECT: process.env.PLANTNET_PROJECT || 'weurope',
  
  // Google Cloud APIs
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS || '',
  GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID || '',
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
  
  // TensorFlow
  TENSORFLOW_MODEL_URL: process.env.TENSORFLOW_MODEL_URL || '',
  
  // Hugging Face
  HF_API_TOKEN: process.env.HF_API_TOKEN || '',
  HF_PLANT_MODEL: process.env.HF_PLANT_MODEL || 'microsoft/plant-disease-classifier',
  
  // Maps API configuration
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
  
  // Google OAuth configuration
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || '/api/v1/auth/google/callback',
  
  // Plant.ID API configuration
  PLANT_ID_API_KEY: process.env.PLANT_ID_API_KEY || '',
  PLANT_ID_API_URL: process.env.PLANT_ID_API_URL || 'https://api.plant.id/v3',
  
  // PlantNet API configuration
  PLANTNET_API_KEY: process.env.PLANTNET_API_KEY || '',
  PLANTNET_API_URL: process.env.PLANTNET_API_URL || 'https://my-api.plantnet.org/v1',
  PLANTNET_PROJECT: process.env.PLANTNET_PROJECT || 'all',
  
  // Frontend URL
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // CORS configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  
  // Monitoring and logging
  ENABLE_HEALTH_CHECKS: process.env.ENABLE_HEALTH_CHECKS !== 'false',
  HEALTH_CHECK_PATH: process.env.HEALTH_CHECK_PATH || '/health',
  ENABLE_METRICS: process.env.ENABLE_METRICS === 'true',
  METRICS_PATH: process.env.METRICS_PATH || '/metrics',
  REQUEST_LOGGING: process.env.REQUEST_LOGGING !== 'false',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_FILE_PATH: process.env.LOG_FILE_PATH || './logs/app.log',
  ERROR_LOG_FILE_PATH: process.env.ERROR_LOG_FILE_PATH || './logs/error.log',
  LOG_MAX_FILES: parseInt(process.env.LOG_MAX_FILES || '5', 10),
  LOG_MAX_SIZE: process.env.LOG_MAX_SIZE || '10m',
  ENABLE_CONSOLE_LOGGING: process.env.ENABLE_CONSOLE_LOGGING !== 'false',
  ENABLE_FILE_LOGGING: process.env.ENABLE_FILE_LOGGING === 'true',
  
  // Swagger configuration
  SWAGGER_ENABLED: process.env.SWAGGER_ENABLED === 'true' || isDevelopment,
  SWAGGER_PATH: process.env.SWAGGER_PATH || '/api-docs',
  SWAGGER_TITLE: process.env.SWAGGER_TITLE || 'Agri Farm API',
  SWAGGER_VERSION: process.env.SWAGGER_VERSION || '1.0.0',
  SWAGGER_DESCRIPTION: process.env.SWAGGER_DESCRIPTION || 'Agricultural crop disease diagnosis platform API',
  
  // Feature flags
  ENABLE_CACHING: process.env.ENABLE_CACHING !== 'false',
  ENABLE_BACKGROUND_JOBS: process.env.ENABLE_BACKGROUND_JOBS !== 'false',
  ENABLE_WEBSOCKETS: process.env.ENABLE_WEBSOCKETS !== 'false',
  ENABLE_NOTIFICATIONS: process.env.ENABLE_NOTIFICATIONS !== 'false',
  ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === 'true',
  ENABLE_RATE_LIMITING: process.env.ENABLE_RATE_LIMITING !== 'false',
  ENABLE_REQUEST_ID: process.env.ENABLE_REQUEST_ID !== 'false',
  ENABLE_COMPRESSION: process.env.ENABLE_COMPRESSION !== 'false',
  
  // Body parsing limits
  JSON_LIMIT: process.env.JSON_LIMIT || '10mb',
  URL_ENCODED_LIMIT: process.env.URL_ENCODED_LIMIT || '10mb',

  // Timeouts
  REQUEST_TIMEOUT: parseInt(process.env.REQUEST_TIMEOUT || '30000', 10),
  DB_QUERY_TIMEOUT: parseInt(process.env.DB_QUERY_TIMEOUT || '10000', 10),
  EXTERNAL_API_TIMEOUT: parseInt(process.env.EXTERNAL_API_TIMEOUT || '15000', 10),
  FILE_UPLOAD_TIMEOUT: parseInt(process.env.FILE_UPLOAD_TIMEOUT || '60000', 10),
  AI_PROCESSING_TIMEOUT: parseInt(process.env.AI_PROCESSING_TIMEOUT || '120000', 10),
  GRACEFUL_SHUTDOWN_TIMEOUT: parseInt(process.env.GRACEFUL_SHUTDOWN_TIMEOUT || '10000', 10),
} as const;

// Environment state helpers
export const environment = {
  isProduction,
  isDevelopment,
  isTest,
  current: process.env.NODE_ENV || 'development',
} as const;