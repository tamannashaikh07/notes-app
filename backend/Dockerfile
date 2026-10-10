FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Prevent Python from creating bytecode files
ENV PYTHONDONTWRITEBYTECODE=1

# Show logs immediately
ENV PYTHONUNBUFFERED=1

# Install dependencies first
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY . .

# Backend port
EXPOSE 8080

# Start the backend server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]