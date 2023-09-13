# Sharedrop
A simple file sharing web app with drag & drop features. Upload files here and get shareable download page url.

# Steps to run
1. Create collection on MongoDb Atlas https://www.mongodb.com/atlas/database
2. Get your url to collection (mongodb+srv://<collection>:<password>@cluster0.kqqx6.mongodb.net/?retryWrites=true&w=majority)
3. Create new file inside server folder named as.env
4. Add 2 variables int .env file as MONGO_CONNECTION_URL= "Your mongodb collection url" and APP_BASE_URL= http://localhost:5000
5. Run server using command npm start run
6. Run index.html from client folder into browser and you are ready to use.

# Output

![ezgif com-video-to-gif](https://github.com/YashNagare10/Sharedrop/assets/88041908/227c5dc3-dc23-4020-b928-df76b493fe0b)
