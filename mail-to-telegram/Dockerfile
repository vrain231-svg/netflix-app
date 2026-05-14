FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt ./
COPY . .

RUN pip install --no-cache-dir -r requirements.txt

ENV HEARTBEAT_FILE=/tmp/mail-to-telegram.heartbeat

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
	CMD ["python", "healthcheck.py"]

CMD ["python", "main.py"]
