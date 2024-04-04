## PassThePlate (Team 8)- Joss White, Alexander Roizman, Mackenzie Kudrenecky, Brandon Mack

### Local Development Backend Start-Up

1. Clone repo
    ```
    git clone git@github.com:COSC-499-W2023/year-long-project-team-8.git
    ```
2. Navigate to project
    ```
    cd year-long-project-team-8
    ```
3. Create a virtual environment in root
    ```
    python -m venv venv
    ```
- Activate virtual environment
    - Windows:
      ```
      venv/Scripts/activate
      ```
    - Linux/Mac:
      ```
      source venv/bin/activate
      ```
4. Navigate to `drf` directory
    ```
    cd app/drf
    ```
5. Install backend dependencies
    ```
    pip install -r requirements.txt
    ```
6. Navigate to `backend`
    ```
    cd backend
    ```
7. Create a `.env` file and add your `EMAIL_HOST_PASSWORD` for SendGrid API key and `SECRET_KEY` for your Django project (Ask us what this is by emailing [`passtheplate9@gmail.com`](mailto:passtheplate9@gmail.com))
8. Run migrations to set up local DB
    ```
    python manage.py makemigrations
    ```
    ```
    python manage.py migrate
    ```
8. run server locally
    ```
    python manage.py runserver 0.0.0.0:8000
    ```
9. The backend server is now up and running and is ready for communication with the frontend server
- to access Django Rest Framework web GUI, you may need
    ```
    python manage.py runserver
    ```
10. Development server available at [`http://127.0.0.1:8000/`](http://127.0.0.1:8000/admin/)
    - for admin access [`http://127.0.0.1:8000/admin/`](http://127.0.0.1:8000/admin/)
    - to create an admin user
      ```
      python manage.py createsuperuser
      ```
11. Upon setting up the environment, both `frontend` and `backend` servers can be launched with from `project root` with:
    ```
    ./startservers.bat
    ```
    - on Mac/Linux
      ```
      chmod +x startservers.sh
      ```
      ```
      ./startservers.sh
      ```

### Production Backend Start-Up

***How to run:***

1. Configure the front end, see frontend instructions and install expo go on the device, navigate to `\app\drf\front-end` and run: 
```
npx expo start
```

2. Scan the QR code and pass those plates

### Hosting and admin details

- Back-end hosted using pythonanywhere.com using a MySQL
database. Free tier hosting, as the app scales will need to upgrade the tier or change the hosting platform. Request login credentials by sending an email to [`passtheplate9@gmail.com`](mailto:passtheplate9@gmail.com)
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
  ```
    git clone git@github.com:COSC-499-W2023/year-long-project-team-8.git
  ```
- Navigate to project directory
  ```
  cd year-long-project-team-8/app/drf/front-end
  ```
- Run
  ```
  npm install
  ```
- Create a `.env` file at the root of the project directory and add your `GOOGLE_API_KEY`
- Make sure your computer and smartphone are connected to the same Wi-Fi
- Run in `front-end`
  ```
  npx expo start
  ```
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

## API Usage
| HTTP | Endpoints | Action |
| --- | --- | --- |
| POST | /api/products | Create a new product |
| GET | /api/products | Retrieve a list of all products |
| GET | /api/products/?search=${query} | Search for products with a query |
| GET | /api/products/?categories=${categories} | Filter products by category |
| GET | /api/product/${productId} | Get product details |
| PATCH | /api/product/${productId} | Update product details |
| DELETE | /api/product/${productId} | Delete a product |
| GET | /api/products/?owner=${userId} | Receive products linked to the owner |
| GET | /api/users | Get user list |
| POST | /api/users | Create a new user |
| GET | /api/users/${userId} | Get user details |
| PATCH | /api/users/${userId} | Update user details |
| DELETE | /api/users/${userId} | Delete a user |
| GET | /api/my-products | Get user-owned products |
| GET | /api/images | Get images associated with a product |
| POST | /api/reviews | Submit a review |
| POST | /api/token | Validate login credentials and receive tokens |
| POST | /api/token/verify | Verify current tokens |
| POST | /api/token/refresh | Refresh access token |
| POST | /api/auth/change-password | Send password reset code |
| PATCH | /api/save_posts | Toggle saved post for user |
| GET | /api/chat/list | Get list of chat instances |
| GET | /api/chat/${chatId} | Get chat messages for chat instance |
| POST | /api/chat/${chatId} | Send chat messages for chat instance |


