# MEGAVERSE APP

## Available Scripts

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### ` docker build -t megaverse-app . `
### ` docker run -p 3000:3000 megaverse-app `

In case you want to run it using Docker

### `npm run test`

Launches the test runner 

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run lint`

Runs eslint over the code


## About the App
The App is deployed on my personal AWS Amplify:\
[https://master.d370m4f0hq237p.amplifyapp.com/](https://main.dqo38x9f34uwi.amplifyapp.com/)

### CANDIDATE ID
When you enter on the site for the first time it will ask you for your CANDIDATE ID.\
Since the CANDIDATE ID is personal and is sensible data, It makes sense to ask for it.\
If you don't want to do it in this way, it can be done by storing the CANDIDATE ID as an environment var.
\
\
![image](https://github.com/nicolas-logo/megaverse-app/assets/26005281/c31e3769-6b80-43d9-92af-a09b9b9fa56f)
<br />
<br />

Once you enter your CANDIDATE ID and press ENTER, it will be validated, if not, It will show an error message.
After the CANDIDATE ID is validated, it will be stored on the local storage, so you won't have to enter it again when revisiting.
\
\
![image](https://github.com/nicolas-logo/megaverse-app/assets/26005281/b916c35d-3e01-4883-b639-becea700bd23)
<br />
<br />

### YOUR MEGAVERSE
Once your CANDIDATE ID is validated you will see your Megaverse's map associated.\
You will see tips for interacting with your map:
\
\
![image](https://github.com/nicolas-logo/megaverse-app/assets/26005281/7f365391-a910-45a6-88c4-468f789e84c5)
<br />
<br />

This is an example of how you can shape your map, you can save your current Megaverse, reset it, or change your CANDIDATE ID:
\
\
![image](https://github.com/nicolas-logo/megaverse-app/assets/26005281/4947c984-115e-4f60-bf4f-8bf32811eb63)
<br />
<br />

## Technical Annotations:
- Components got test associated that can be run by ```npm run test```
- ```configData.js``` is the configuration file where you can easily extend the app by adding new Astral Objects.
- On that file, you have all the current Astral Objects, depending of its they could have different functions, like ```changeColor``` or ```changeDirection```
- The content map retrieved for the endpoint is mapped to Astral Objects to add additional configuration (functions, image, among others)
- Requests are handled with the Axios library
- Since there is no endpoint to send the whole map at once, there is a waiting time between requests when saving. This is for avoiding the error **429 Too Many Requests**
- Several Astral Objects updates at the same time take their time, be patient :pray:
- Redux is configured, despite it wasn't really necessary but the App is ready to be a larger project.
