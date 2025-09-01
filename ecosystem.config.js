module.exports = {
  apps: [
    {
      name: 'ESQs-Backend',
      script: 'backend-server.js',
      cwd: 'F:/ESQs-Platform-MOBILE-ONLINE',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true
    },
    {
      name: 'ESQs-AI-Bridge',
      script: 'ai-synthia-bridge.js',
      cwd: 'F:/ESQs-Platform-MOBILE-ONLINE',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: './logs/bridge-error.log',
      out_file: './logs/bridge-out.log',
      log_file: './logs/bridge-combined.log',
      time: true
    },
    {
      name: 'ESQs-Synthia',
      script: 'synthia-integration.js',
      cwd: 'F:/ESQs-Platform-MOBILE-ONLINE',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      error_file: './logs/synthia-error.log',
      out_file: './logs/synthia-out.log',
      log_file: './logs/synthia-combined.log',
      time: true
    }
  ]
};
