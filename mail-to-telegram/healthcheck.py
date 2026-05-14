import os
import sys
import time
from pathlib import Path

import mysql.connector


def fail(message: str):
    print(f"[healthcheck] {message}")
    sys.exit(1)


def ok(message: str):
    print(f"[healthcheck] {message}")


def check_heartbeat():
    heartbeat_file = os.getenv("HEARTBEAT_FILE", "/tmp/mail-to-telegram.heartbeat")
    sleep_time = int(os.getenv("SLEEPTIME", "60"))
    max_heartbeat_age = int(os.getenv("HEALTHCHECK_MAX_HEARTBEAT_AGE", str(max(sleep_time * 3, 180))))

    p = Path(heartbeat_file)
    if not p.exists():
        fail(f"Heartbeat file not found: {heartbeat_file}")

    content = p.read_text(encoding="utf-8").strip()
    if not content:
        fail("Heartbeat file is empty")

    try:
        last_heartbeat_ts = int(content)
    except ValueError:
        fail(f"Invalid heartbeat value: {content}")

    age = int(time.time()) - last_heartbeat_ts
    if age > max_heartbeat_age:
        fail(f"Heartbeat is stale ({age}s > {max_heartbeat_age}s)")

    ok(f"Heartbeat age: {age}s")


def check_mysql():
    timeout = int(os.getenv("HEALTHCHECK_DB_TIMEOUT", "5"))

    try:
        conn = mysql.connector.connect(
            host=os.getenv("MYSQL_HOST", "localhost"),
            port=int(os.getenv("MYSQL_PORT", "3306")),
            user=os.getenv("MYSQL_USER", "root"),
            password=os.getenv("MYSQL_PASSWORD", ""),
            database=os.getenv("MYSQL_DATABASE", "mail_to_telegram"),
            connection_timeout=timeout,
        )
        cur = conn.cursor()
        cur.execute("SELECT 1")
        cur.fetchone()
        cur.close()
        conn.close()
    except Exception as e:
        fail(f"MySQL check failed: {e}")

    ok("MySQL check passed")


def main():
    check_heartbeat()
    check_mysql()
    ok("healthy")
    sys.exit(0)


if __name__ == "__main__":
    main()
