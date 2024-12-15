FROM python:3.12-alpine

# Set the working directory inside the container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Setup environment
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1s

# Install system dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache gcc g++ musl-dev curl libffi-dev postgresql-dev zlib-dev jpeg-dev freetype-dev

# Set up the shell to fail on any command error, improving reliability
SHELL ["/bin/ash", "-o", "pipefail", "-c"]

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Add Poetry to PATH
ENV PATH="${PATH}:/root/.local/bin"

# Copy only the pyproject.toml and poetry.lock to leverage Docker cache
COPY ./pyproject.toml .
COPY ./poetry.lock .

# Install project dependencies
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi

# Copy the entire Django project to the working directory
COPY . .

# Expose the port your application will run on
EXPOSE 8000

# Command to run the Django development server
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
