* Diagram for Project

[View on Eraser![](https://app.eraser.io/workspace/p3ySWxNBcllth9UWt9Vo/preview?elements=DCAA7UNPKz4QMpUeLj3qkg&type=embed)](https://app.eraser.io/workspace/p3ySWxNBcllth9UWt9Vo?elements=DCAA7UNPKz4QMpUeLj3qkg)

* Diff of npm init -y and npm init
  1) **npm init**  
      - This command prompts you with a series of questions to manually configure the package.json file.
      - You'll be asked to provide details such as the project name, version, description, entry point, test command, git repository, keywords, author, and license.

  2) **npm init -y**
      - This command automatically generates a package.json file with default values for all fields.
    - It skips the interactive     prompts, saving time when you don't need to customize the initial settings.
    - The generated file will have default values such as:
        - "name": "project-name"
        - "version": "1.0.0"
        - "main": "index.js"
        - "license": "ISC"

-----    
* Type : "module" it is allow us to use import 'a' from 'b' (**This changes done in package.json**)
  - othervise we are use const a require('b')

---
* form one file i export default router then in other any file i can import it with any name

* **Default Export :** When you export something using export default, it means that this is the "default" thing that the module exports. When importing it, you do not use curly braces {}.

  **Named Export :** If User_pass were exported using a named export (e.g., export const User_pass = ...), then you would need to use curly braces when importing it.

  * Example of Default Export
    ``` javascript
    // file1.js
    const User_pass = () => { console.log("hello from JS"); };
    export default User_pass;
    ```
    ``` javascript
      //file2.js   
      import User_pass from './file1.js';
      User_pass(); // Output: hello from JS
    ```

  * Example of Named Export
    ``` javascript
    // file1.js
    export const User_pass = () => { console.log("hello from JS"); };
    ```
    ``` javascript
      //file2.js   
      import {User_pass} from './file1.js';
      User_pass(); // Output: hello from JS
    ```  
---
* <span style="color:orange; margin-left:15px; ">
  Extensions Using for better experience in backend 
  </span>

  - console ninja
  - Prisma
  
* Command for run file by using console ninja  
  ``` 
  console-ninja node --watch app.js
  ```
---

* **<span style="color:orange; margin-left:15px; ">req.body** -- means we try to fetch data from body which send in json formate if we don't use app.use(express.json()) it is not allow json data. 
<span style="color:orange; margin-left:15px; ">
app.use(express.json())
---
* Prisma is not required to connect MongoDB with Express, but it simplifies the process and makes it safer by providing type safety and automatically generating the database queries.

* Prisma Client is the part of Prisma that allows you to interact with your database in a structured and type-safe way.

*  **<span style="color:Green; margin-left:15px; ">For more info**
[check out](https://chatgpt.com/share/66e562a5-dc98-8008-b47c-4c87735a0376)

---

*  Insatll prisma and connect with mongodb
    ``` command
    npm i prisma
    npx prisma init --datasource-provider mongodb
    ```    
* schema vali file ma koy pan change kariye to
  ```
      npx prisma db push 
  ```  
 * It will create one folder named as prisma 

  * It is in lib folder that make instance of PrismaClient and use it in all CRUD Operations
  ``` javascript
  import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;
  ```
  
---

* Authantication 
  - Register
  - Login 

- **Register** 
  - Check same username or email address is exist in database
      ``` javascript
           const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        });
      ```    
    - if yes than check it match with req.body.username or password and then  we can send error like already exist and all ...
    otherwise just enter data in to the database
      ``` javascript
          const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword,
            }
        });
      ```
  - **Login**
    - Login with email and password
       ``` javascript
          // Check if the user exists
          const user = await prisma.user.findUnique({
              where: { email }
          });  

          // jwt.sign({payload},secrate_key,{expiresIn:maxAge}) 
          //it will return on token means unique id 
          const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET); 
                                  
          // it set to cookie
          res.cookie('name', token,{maxAge:maxAge, httpOnly: true})
      ``` 
  - **Logout**
      ``` JavaScript
             res.clearCookie('userId').status(200).json({ message: 'Logout successful!' });
      ```    
---
### **Understanding CORS, Axios, and API Requests in Simple Terms**

When working with a React frontend (on port 5173) and a Node.js backend (on port 3000), you'll need to send data between the two. Let's break down how this works and explain key concepts like **CORS**, **Axios**, and **API requests**.

---

### **1. CORS (Cross-Origin Resource Sharing)**

**What is CORS?**
- **CORS** is a security feature implemented by browsers to prevent web pages from making requests to a different domain or port than the one the page was loaded from. 
- In your case, your **<span style=color:green>React app is running on `http://localhost:5173`**, and your **Node.js server is running on `http://localhost:3000`**. These are considered **different origins** due to the different ports.
- Without CORS, your browser would **block** any request from React (on port 5173) to Node.js (on port 3000), <span style="color:red;  ">assuming it might be a malicious request.

**How does CORS work?**
- The server (Node.js) needs to **allow** requests from a different origin (in this case, from `http://localhost:5173`). This is done by adding special headers to the response.
- The most common header for enabling CORS is:
  ```js
  Access-Control-Allow-Origin: 'http://localhost:5173'
  ```

**Example in Node.js:**
```js
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for requests from 'http://localhost:5173'
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Node.js' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

**Why is CORS needed?**
- It ensures that **cross-origin requests** (like your React app trying to send data to Node.js) are **allowed** and not blocked by the browser.
- **Without CORS**: Browser blocks the request.
- **With CORS**: Server explicitly allows the request, and the data can be exchanged.

---

### **2. Axios**

**What is Axios?**
- **Axios** is a **JavaScript library** used for making HTTP requests (like `GET`, `POST`, etc.) from the browser (or Node.js) to a server.
- It's commonly used in **React** to send data from the frontend to the backend.

**Axios in Action:**
- Let's say you want to send some data from your React app to your Node.js server. You can use **Axios** to do this easily.

**Example in React (Using Axios)**:
```js
import axios from 'axios';

const sendDataToServer = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/data', {
      name: 'John',
      age: 25
    });
    console.log('Server response:', response.data);
  } catch (error) {
    console.error('Error sending data to server:', error);
  }
};
```

**Axios Features**:
- Axios automatically handles **JSON** encoding/decoding.
- It allows sending data in the body of `POST` or `PUT` requests.
- You can easily handle **response** and **error**.

**Why use Axios?**
- **Simpler syntax** than the built-in `fetch` API.
- Provides support for **interceptors**, which allow you to handle requests or responses globally (for example, adding authorization tokens to every request).
- It handles **automatic transformations** of data into JSON format.

---

### **3. API Request**

**What is an API Request?**
- An **API Request** is simply a request from a client (like your React app) to a server (like your Node.js backend) to **fetch or send data**.
- APIs (Application Programming Interfaces) allow the frontend and backend to communicate with each other.

There are two main types of API requests in this context:

1. **GET Request**: Used to **fetch data** from the server.
   ```js
   axios.get('http://localhost:3000/api/data')
     .then(response => console.log(response.data))
     .catch(error => console.error(error));
   ```

2. **POST Request**: Used to **send data** to the server.
   ```js
   axios.post('http://localhost:3000/api/data', { name: 'John' })
     .then(response => console.log(response.data))
     .catch(error => console.error(error));
   ```

**API Request Workflow**:
- **Client (React)** sends a request to the **Server (Node.js)** using a method like `GET` or `POST`.
- The server processes the request, performs any required actions (like accessing a database), and sends back a **response**.
- The client receives the response and updates the UI accordingly.

---

### **Difference Between CORS, Axios, and API Requests**

| **Aspect**          | **CORS**                                    | **Axios**                                  | **API Request**                            |
|---------------------|---------------------------------------------|--------------------------------------------|--------------------------------------------|
| **Definition**       | A browser security feature that controls who can access the server from different origins. | A JavaScript library for making HTTP requests. | The actual request sent from client to server. |
| **Purpose**          | Enables or blocks cross-origin requests.    | Simplifies sending HTTP requests.          | Fetches or sends data between client and server. |
| **Usage**            | Controlled by the server via headers like `Access-Control-Allow-Origin`. | Used in the client (React) to send requests to the server (Node.js). | Any client-server interaction using HTTP methods. |
| **Example**          | Allow `localhost:5173` to access `localhost:3000`. | `axios.post('http://localhost:3000/api', data)`. | Sending data using `GET`, `POST`, `PUT`, etc. |

---

### **Conclusion:**

- **CORS**: A security feature that you need to handle when your frontend (React) and backend (Node.js) are running on different ports or domains.
- **Axios**: A powerful library to make HTTP requests from your React app to your Node.js server.
- **API Request**: The actual process of sending and receiving data between the client and server, using methods like `GET` and `POST`.

By enabling **CORS** on the server and using **Axios** in the React app, you can easily send API requests to exchange data between your frontend and backend.

---
### **Summary:**
React (Client-side):

The base URL in Axios (baseURL) points to the Node.js server: http://localhost:3000.
When making a request like apiRequest.post('/auth/register'), it becomes http://localhost:3000/api/auth/register.
Node.js (Server-side):

You configure CORS to allow requests from the React app: http://localhost:5173.