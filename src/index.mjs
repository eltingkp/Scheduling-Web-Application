'use strict';

import {canLogin, register, findUser} from './user-service.mjs';
import express from 'express';
import {populateClinics} from './populate.mjs';
import asyncHandler from 'express-async-handler';
import {clinicList} from './componenets/clinicList.mjs';
import session from 'express-session';
import { navigation } from './componenets/navigation.mjs'
import { header } from './componenets/header.mjs';
import { footer } from './componenets/footer.mjs';
import { loginForm } from './componenets/loginForm.mjs';
import { dashAppointments } from './componenets/dashAppointments.mjs';
import { requestAppointment } from './componenets/requestAppointment.mjs'
import { selectClinicID } from './componenets/selectClinicID.mjs';
import { dashboard } from './componenets/dashboard.mjs';
import { dashboardPage } from './pages/dashboardPage.mjs';
import { clinicsPage } from './pages/clinicsPage.mjs';
import { loginPage } from './pages/loginPage.mjs';
import { appointmentRequestPage } from './pages/appointmentRequestPage.mjs';
import { appointmentResponsePage } from './pages/appointmentResponsePage.mjs';
import { clinicAddResponsePage } from './pages/clinicAddResponsePage.mjs';

const app = express();
const PORT = 3000;

populateClinics();

// parses urlencoded into javascript object 
app.use(express.urlencoded({
    extended: true
}));

// middleware that allows access to public files 
app.use(express.static('public')); 

// sets cookies
app.use(session({
    secret: 'abcdefg1234', 
    resave: false,
    saveUninitialized: true,
}));

// checks authentication, if not valid, redirects back to login page 
function isAuthenticated (req, res, next) {
    if (req.session.user) {
        return next(); 
    }

    res.redirect("/login");
}

/* GET request to /login endpoint */
app.get("/login", (req, res) => {

    res.send(`
    ${header()}
    ${loginForm()}
    ${footer()}`);
});

/* requesting data from /register endpoint (connected to form), creating a user */
app.post("/register", (req, res) =>{

    const user = req.body;
    register(user);

    res.redirect("/login");

});

/* requesting data from /login endpoint (connected to form), validating user credentials */
app.post("/login", (req, res) =>{
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;
    const valid = canLogin(email, password);

    // validating user based on their email 
    if (valid) {
        
        req.session.regenerate((err) => {
          if (err) {
            return next(err);
          }

          req.session.user = findUser(email);

          req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/dashboard");
          });
        });

    } else {
        res.send(loginPage(true));
    }

});

/* GET request /dashboard endpoint, "home page" for user" */
app.get("/dashboard", isAuthenticated, asyncHandler(async (req, res) => {
    const name = req.session.user.firstName;
    const email = req.session.user.email;
    const response = await fetch("http://localhost:8000/get-all-clinics");
    const availableClinics = await response.json();
    const usersClinicIDs = req.session.user.clinics;
    const clinicsDash = [];
    const appointmentsDash = req.session.user.appointments;
    

    for (let index = 0; index < availableClinics.length; index++){
        const availableClinic = availableClinics[index]
        for (let innerIndex = 0; innerIndex < usersClinicIDs.length; innerIndex++) {
            if (availableClinic.id === usersClinicIDs[innerIndex]) {
               clinicsDash.push(availableClinic);
            }
        }
    }

    const htmlDashboardPage = dashboardPage(name, email, clinicsDash, appointmentsDash);
    res.send(htmlDashboardPage);

    
    console.log('CLINICS ARRAY', clinicsDash);
    console.log('APPOINTMENT ARRAY', appointmentsDash);
}));

/* GET request /clinics end point, where user manages clinics  */
app.get("/clinics", isAuthenticated, asyncHandler(async (req, res) => {

    const response = await fetch("http://localhost:8000/get-all-clinics");
    const clinicsData = await response.json();
    console.log(clinicsData);
    const htmlClinicsPage = clinicsPage(clinicsData)

    res.send(htmlClinicsPage);

}));


app.post("/clinics-search", isAuthenticated, asyncHandler (async(req, res) =>{
    console.log(req.body);

    const enteredClinicID = req.body;
    const clinicID = enteredClinicID['search']
    const response = await fetch(`http://127.0.0.1:8000/get-clinic/${clinicID}`);
    const responseData = await response.json();
    const dataString = JSON.stringify(responseData);
    
    console.log('clinic ID',enteredClinicID);
    console.log('ID', clinicID);
    console.log('responseData', responseData);
    console.log(dataString);

    const clinicArray = []
    if (responseData['Error']) {
        res.send(clinicsPage(clinicArray, true));
    } else {
        clinicArray.push(responseData)
        res.send(clinicsPage(clinicArray, false))
    }

}));

app.post("/clinics", isAuthenticated, asyncHandler (async(req, res) =>{
    console.log('selected clinic', req.body)
    const clinicID = req.body.clinic

    req.session.user.clinics.push(clinicID);
    const addResponse = clinicAddResponsePage();
    res.send(addResponse);

}));

app.get("/appointments", isAuthenticated, asyncHandler(async (req, res) => {        

    res.send(appointmentRequestPage());

}));


app.post("/appointments", isAuthenticated, asyncHandler (async(req, res) =>{
    console.log('received appointment request', req.body)
    const response = appointmentResponsePage();

    req.session.user.appointments.push(req.body);
    res.send(response);


}));


app.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/');
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});