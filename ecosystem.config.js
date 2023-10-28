module.exports = {
  apps: [
    {
      name: 'rts_staging',
      script: 'npm',
      args: 'run start-staging',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_file: '/dev/null', // Pointing to null device
      error_file: '/dev/null', // Pointing to null device
      out_file: '/dev/null', // Pointing to null device
      merge_logs: true,
      env: {
        NODE_ENV: 'staging',
      },
    },
    {
      name: 'rts_prod',
      script: 'npm',
      args: 'run start-prod',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_file: '/dev/null', // Pointing to null device
      error_file: '/dev/null', // Pointing to null device
      out_file: '/dev/null', // Pointing to null device
      merge_logs: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
