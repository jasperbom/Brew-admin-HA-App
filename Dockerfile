FROM python:3.12-alpine

WORKDIR /app

COPY server.py .
COPY brew-admin.html ./static/index.html

EXPOSE 8099

CMD ["python3", "server.py"]
