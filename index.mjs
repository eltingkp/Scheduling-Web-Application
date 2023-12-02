'use strict';

import {canLogin, register} from './user-service.mjs';
import express from 'express';
import {populateClinics} from './populate.mjs';
import asyncHandler from 'express-async-handler';
import {getHtmlClinicList} from './clinicViaList.mjs';

const app = express();
const PORT = 3000;

populateClinics()

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public')); 

let htmlTop = `
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>ADJUST</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src='main.js'></script>
</head>

<body>
    
<header>
    <a class="title" href="/index.html"><h1> A D J U S T</h1></a>
    <h4>CHIROPRACTIC AND MASSAGE SCHEDULER</h4>
</header>
    `;  

let htmlBottom = `
    <footer>
        <p>Copyright &copy; 2023 Kathrina Elting</p>
    </footer>
   
    </body>
    </html>
`;

let htmlLoginForm =`
<form action="/login" method="POST">
        <fieldset class="login">
            <legend>LOGIN</legend>

            <p>
                <label for="email">Email:
                    <input
                        type="email"
                        name="email"
                        id="email"
                        size="30"
                        maxlength="100"
                        required
                        pattern="[^@]+@[^@]+.[a-z]"
                        placeholder="name@host.com" 
                        autofocus/>
                </label>
            </p>

            <p>
                <label for="password">Password:
                    <input type="password"
                    name="password"
                    id="password"
                    size="30"
                    maxlength="100"
                    required
                    placeholder="Enter password" />
                </label>
                <!-- <button class="forgot" type="submit">Forgot Password</button> -->
            </p>

            <button type="submit">Submit</button>
        </fieldset>
    </form>
`;

/* GET request to /login endpoint */
app.get("/login", (req, res) => {

    res.send(`
    ${htmlTop}
    ${htmlLoginForm}
    ${htmlBottom}`);
});

/* requesting data from /register endpoint (connected to form), creating a user */
app.post("/register", (req, res) =>{

    const user = req.body;
    register(user);

    res.redirect("/dashboard");

});

/* requesting data from /login endpoint (connected to form), validating user credentials */
app.post("/login", (req, res) =>{
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;
    const valid = canLogin(email, password);

    if (valid) {
        res.redirect("/dashboard");
    } else {
        res.send(`
        ${htmlTop}
        ${htmlLoginForm}
        <p class="error">Invalid username or password</p>
        ${htmlBottom}`);
    }

});

/* GET request /dashboard endpoint, "home page" for user" */
app.get("/dashboard", (req, res) => {

    res.send(`
        ${htmlTop}
        <section>
            <h2>Welcome!</h2>

            <article>
                <aside class="dash">
                    <h3>Upcoming Appointments</h3>
                    <a class="dashlinks" href="../appointments.html">Schedule an Appointment</a>
                </aside>
                <aside class="dash">
                    <h3>Clinics</h3>
                    <a class="dashlinks" href="../clinics">Manange Clinics</a>
                </aside>
            </article>

        </section>
            ${htmlBottom}`);


});

let htmlSelectClinicID =`

    <form action="/clinics" method="POST">
    <fieldset class="clinicID">
        <legend>Search via Clinic ID</legend>

    <label for="clinic-search-id">Enter Clinic ID:</label>
    <p>
    <input type="search" id="clinic-search-id" name="search" />
    </p>

    <button>Search</button>
    </fieldset>
    </form>`

/* GET request /clinics end point, where user manages clinics  */
app.get("/clinics", asyncHandler(async (req, res) => {

    const response = await fetch("http://localhost:8000/get-all-clinics")
    const clinicsList = await response.json()
    const myJSON = JSON.stringify(clinicsList)

    console.log(clinicsList)

    const finalList = getHtmlClinicList(clinicsList)
          

res.send(`
    ${htmlTop}
        <section>
        <article>
        ${htmlSelectClinicID}
        <form action="/clinics" method="POST">
            <fieldset class="clinicList">
                <legend>Select Clinic via List</legend>

                ${finalList}

                <button>Submit</button>
            </fieldset>
        </form>
        
        </article>
        </section>
    ${htmlBottom}`);

}));

app.post("/clinics", asyncHandler (async(req, res) =>{
    console.log(req.body);

    const enteredClinicID = req.body;
    const clinicID = enteredClinicID['search']
    const response = await fetch(`http://127.0.0.1:8000/get-clinic/${clinicID}`);
    const responseData = await response.json()
    const dataString = JSON.stringify(responseData)
    
    console.log('clinic ID',enteredClinicID)
    console.log('ID', clinicID)
    console.log('responseData', responseData)
    console.log(dataString)

    if (responseData['Error']) {
        res.send(`
        ${htmlTop}
        <section>
        <article>

        ${htmlSelectClinicID}
        <h3>Clinic not found, please try again or <a href='./clinics'> search via list</a>!</h3>

    ${htmlBottom}`);
    } else {
        const clinicArray = []
        clinicArray.push(responseData)
        const clinicFromID = getHtmlClinicList(clinicArray)
        console.log('log out clinicFromID', clinicFromID)

        res.send(`
        ${htmlTop}
        ${htmlSelectClinicID}
        <form action="/clinics" method="POST">
            <fieldset class="clinicList">
                <legend>Your Requested Clinic</legend>

                ${clinicFromID}

                <button>ADD</button>
            </fieldset>
        </form>
        </article>
        </section>

        ${htmlBottom}`);
    }

}));





app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});