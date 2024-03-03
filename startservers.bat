@echo off

:: Navigate to the backend directory and start the backend server
start cmd /k "cd app\drf && venv\Scripts\activate && cd backend && python manage.py runserver 0.0.0.0:8000"

:: Navigate to the front-end directory and start the Expo server
start cmd /k "cd app\drf && venv\Scripts\activate && cd front-end\config && python update_config.py && cd .. && npx expo start"
pause
