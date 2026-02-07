# Netflix App - Docker Compose Setup

This Docker Compose configuration sets up a complete environment for the Netflix App project with MySQL database and two main services.

## Services

1. **MySQL Database** - Persistent data storage
2. **Gmail Viewer App** - Next.js web application (port 3000)
3. **Mail to Telegram Service** - Python background service

## Quick Start

1. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your actual configuration values:
   - Telegram Bot Token and Chat ID
   - AWS credentials
   - Gmail API credentials
   - Other required environment variables

3. **Build and start all services:**
   ```bash
   docker-compose up -d
   ```

4. **Check service status:**
   ```bash
   docker-compose ps
   ```

5. **View logs:**
   ```bash
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f gmail-viewer
   docker-compose logs -f mail-to-telegram
   docker-compose logs -f mysql
   ```

## Access Points

- **Gmail Viewer Web App**: http://localhost:3000
- **MySQL Database**: localhost:3306
  - Username: `app_user`
  - Password: `app_password`
  - Database: `netflix_app`

## Database Management

The MySQL database is automatically initialized with:
- Required tables for both applications
- Sample data for testing
- Proper indexing for performance

### Connect to MySQL
```bash
docker-compose exec mysql mysql -u app_user -p netflix_app
```

## Development

### Rebuild specific service:
```bash
docker-compose build gmail-viewer
docker-compose build mail-to-telegram
```

### Restart specific service:
```bash
docker-compose restart gmail-viewer
docker-compose restart mail-to-telegram
```

### View container shell:
```bash
docker-compose exec gmail-viewer sh
docker-compose exec mail-to-telegram bash
```

## Data Persistence

- MySQL data is persisted in the `mysql_data` Docker volume
- Application code is mounted for development (volumes in docker-compose.yml)

## Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

## Troubleshooting

1. **Port conflicts**: Change port mappings in docker-compose.yml if ports are already in use
2. **Database connection issues**: Ensure MySQL is healthy before other services start
3. **Environment variables**: Check .env file for correct values
4. **Logs**: Always check service logs for error details

## Environment Variables

Key environment variables to configure:

### Required for Mail-to-Telegram:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### Required for Gmail Viewer:
- `GMAIL_CLIENT_ID`
- `GMAIL_CLIENT_SECRET`
- `NEXTAUTH_SECRET`

See `.env.example` for complete list.

## Network

All services communicate through the `netflix-network` bridge network, allowing:
- Service-to-service communication using service names
- Isolated network environment
- Easy service discovery
