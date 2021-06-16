# WebChat-Application
A Realtime Web Chat Application created using Socket.io and Node.js

### Demo

https://user-images.githubusercontent.com/64270972/122177518-540c1080-cea3-11eb-98b0-2fbfa25268d9.mp4


### RUN LOCALLY

- Clone the Repo:

```bash
    git clone https://github.com/Akshay-jain22/WebChat-Application.git
```

- Move to the folder where you cloned the project 
- Install all dependencies and devDependencies by running the following command

```bash
    npm install
```

- Before running the server add `.env` file in root folder or simply replace `.env.example` with `.env` file and add your keys
- To get Client id & Client Secret :  [LINK](https://www.balbooa.com/gridbox-documentation/how-to-get-google-client-id-and-client-secret)

- To get `DATABASE_CONNECTION_URL` and make DB connection : [LINK](https://medium.com/@sergio13prez/connecting-to-mongodb-atlas-d1381f184369)

```js
        # database connection url
        DATABASE_URI=<YOUR_DATABASE_CONNECTION_URL>

        # client id & secret for OAuth
        GOOGLE_OAUTH2_CLIENT_ID=<YOUR_OAUTH_CLIENT_ID>
        GOOGLE_OAUTH2_CLIENT_SECRET=<YOUR_OAUTH_CLIENT_SECRET>
```


- Now run the server by running following command
```js
    npm start
```

- dev runs the sever with nodemon which automatically restart server everytime we make any changes  

- The above steps starts the development server on localhost:3000 
- Go to `http://localhost:3000/` in your browser 

- It will automatically redirect you to the Home page and then ask for Signup or Login.

## Developers
- [Akshay Jain](https://github.com/akshay-jain22)
- [Anand Kumar](https://github.com/anand-kumar007)
- [Ashok Kumar](https://github.com/ashok-2001)
