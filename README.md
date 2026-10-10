# Notes App

A simple full-stack Notes application built with:

- React + Vite
- Axios
- FastAPI
- SQLAlchemy
- MySQL
- gitHub Actions

## Features

- Add notes
- Delete notes
- Mark notes as pending/completed
- Set low/medium/high priority
- Search notes
- Filter by status
- REST API

## 1. MySQL setup

Create the database:

```sql
CREATE DATABASE notes_db;
```

The `notes` table is created automatically by FastAPI when the backend starts.

## 2. Backend setup

```bash
cd backend

python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

Install packages:

```bash
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and change the MySQL username/password:

```env
DATABASE_URL=mysql+pymysql://root:YOUR_PASSWORD@localhost:3306/notes_db
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

API:
`http://localhost:8000`

Swagger:
`http://localhost:8000/docs`

## 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
```

Copy `.env.example` to `.env` if needed:

```env
VITE_API_URL=http://localhost:8000
```

Start React:

```bash
npm run dev
```

Open the Vite URL shown in the terminal, normally:

`http://localhost:5173`

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/notes` | Get all notes |
| POST | `/notes` | Create note |
| PATCH | `/notes/{id}` | Update note |
| DELETE | `/notes/{id}` | Delete note |

## Note object

```json
{
  "title": "Learn AWS",
  "content": "Study EC2 and RDS",
  "status": "pending",
  "priority": "high"
}
```
