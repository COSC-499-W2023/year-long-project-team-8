## PassThePlate (Team 8)- Joss White, Alexander Roizman, Mackenzie Kudrenecky, Brandon Mack

### Local Development Backend Start-Up

- Clone repo
- Download python
- Create a virtual environment in root `python -m venv venv`
- Activate virtual environment
    - Windows: `./venv/Scripts/activate`
    - Linux/Mac: `source venv/bin/activate`
- navigate to /drf/ `cd app/drf`
- install backend dependencies (in venv) `pip install -r requirements.txt`
- navigate to /backend/ `cd backend`
- Create a `.env` file and add your `EMAIL_HOST_PASSWORD` for SendGrid API key and `SECRET_KEY` for your Django project (Ask us what this is by emailing `[passtheplate9@gmail.com](mailto:passtheplate9@gmail.com)`)
- run migrations to set up local DB `python [manage.py](http://manage.py) makemigrations`
- `python [manage.py](http://manage.py) migrate`
- run server locally `python [manage.py](http://manage.py) runserver 0.0.0.0:8000`
- The backend server is now up and running and is ready for communication with the frontend server
- to access Django Rest Framework web GUI, you may need `python [manage.py](http://manage.py) runserver`
- development server available at [`http://127.0.0.1:8000/`](http://127.0.0.1:8000/admin/)
    - for admin access [`http://127.0.0.1:8000/admin/`](http://127.0.0.1:8000/admin/)
    - to create an admin user `python manage.py createsuperuser`
- upon setting up the environment, both `frontend` and `backend` servers can be launched with `./startservers.bat` in the root of the project
    - on Mac/Linux
        - run `chmod +x startservers.sh` to allow permissions
        - then `./startservers.sh`

### Production Backend Start-Up

***How to run:***

-Configure the front end, see frontend instructions and install expo go on the device

-Navigate to  `\app\drf\front-end` and enter `npx expo start`

-Scan the QR code and pass those plates

### Hosting and admin details

- Back-end hosted using pythonanywhere.com using a MySQL
database. Free tier hosting, as the app scales will need to upgrade the tier or change the hosting platform. Request login credentials by sending an email to `[passtheplate9@gmail.com](mailto:passtheplate9@gmail.com)`
- All endpoints live at passtheplate.pythonanywhere.com/api
- Can access the admin portal at passtheplate.pythonanywhere.com/admin (will need to make a new superuser in python anywhere)
- For changes to be reflected on the server, will need to open
Bash the console on pythonanywhere.com and pull remote changes into the production branch. The Production console is set up, just need to run the git pull
- To make any changes on the server console (push,
pull), you will need to authenticate your GitHub account with email and token because it is a private repo (this will change if REPO is made public). You can generate your token following these steps, make sure to save it as you will need it every time you try to pull changes onto the server. Make sure to allow all permissions on the token. https://www.geeksforgeeks.org/how-to-generate-personal-access-token-in-github/

### Local Development Front End

- Install Node.js
- Download the Expo Go app on your smartphone and/or set up an emulator on your computer (e.g., Android Studio for Android or Xcode for iOS).
- Clone Repository
- Navigate to project directory `cd app/drf/front-end`
- Run `npm install`
- Create a `.env` file at the root of the project directory and add your `GOOGLE_API_KEY`
- Make sure your computer and smartphone are connected to the same Wi-Fi
- Run `npx expo start` in `front-end`
- Setup Config
    - Retrieve the IP address from the terminal after starting `npx expo start` where it says `exp://<your-ip>:8000`
    - Go to `app/drf/front-end/config.js`
    - Locate the line `export const baseEndpoint`
    - Place `<your-ip>` into baseEndpoint `https://<your-ip-here>:8000/api`
- To view app
    - On a smartphone: Scan the QR code that appears in the terminal with the Expo Go app.
    - On an Android emulator:
        - Download an emulator
        - Start the emulator
        - Press **`a`** in the terminal
    - On an iOS emulator:
        - Select a device
        - Start the emulator
        - Press **`i`** in the terminal.
- Press **`?`** in the terminal while the Expo server is running to see a list of all available commands.

### Production Font End

- Available on Play Store for Internal Testing
- Request the testing link by sending an email to `passtheplate9@gmail.com`
- Click on the link and download the app
- Use as any other app on your phone


