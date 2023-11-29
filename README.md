## RADIOLOGIA NEWTON

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of Node.js and npm.
* You have installed Expo for running the mobile application.
* You have a `.env` file in your server project with the necessary environment variables set. 

## Installing and Running the Projects

To install and run the projects, follow these steps:

### Mobile Project

1. Navigate to the mobile project directory.
2. Install the dependencies using the command:

```shellscript
npm install or yarn add
```

3. Make sure to add your **private** ipv4 address on this file, and also pay attention to the port, **it has to be the same that you are going to add on .env file of the server project!**

```shellscript
export const api = axios.create({
  baseURL: 'http://192.168.0.34:3333',
});
``````

4. Start the project using the command:

```shellscript
npx expo start
```

### Server Project

1. Navigate to the server project directory.
2. Install the dependencies using the command:

```shellscript
npm install
```

3. Set the environment variables in the `.env` file. The required variables are:

```shellscript
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
JWT_SECRET=
IMGBB_API_KEY=
```

You can get a IMGBB_API_KEY on [ImgBB website](https://imgbb.com/)

4. Start the project using the command:

```shellscript
npm run dev
```