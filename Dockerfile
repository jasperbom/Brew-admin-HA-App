FROM python:3.12-alpine

WORKDIR /app

COPY server.py .
COPY brew-admin.html ./static/index.html

# Run as non-root for container hardening
RUN adduser -D -H -s /sbin/nologin appuser \
 && mkdir -p /data \
 && chown appuser:appuser /data /app

USER appuser

EXPOSE 8099

CMD ["python3", "server.py"]
