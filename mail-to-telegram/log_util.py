import logging
import os

log_name = os.getenv("LOG_NAME", "mail-to-telegram")

def get_logger():
    logger = logging.getLogger(log_name)
    logger.setLevel(logging.INFO)

    if not logger.handlers:
        logger.addHandler(logging.StreamHandler())

    return logger
