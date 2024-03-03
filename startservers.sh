#!/bin/bash

# Navigate to the backend directory and start the backend server
cd app/drf
source venv/bin/activate
cd backend
python manage.py runserver 0.0.0.0:8000 &

# Navigate to the front-end directory and start the Expo server
cd ../../
cd front-end/config
python update_config.py
cd ..
npx expo start &
