'use strict';

const {canLogin, register} = require('./user-service');
const express = require('express');
const app = express();
const PORT = 3000;


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
    <title>Page Title</title>
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

app.get("/dashboard", (req, res) => {

    res.send(`
        ${htmlTop}
        <section>
            <h2>Welcome!</h2>
                <article>
                    Your dashboard is under construction...
                </article>
        </section>
            ${htmlBottom}`);


});

app.post("/register", (req, res) =>{

    const user = req.body;
    register(user);

    res.redirect("/dashboard");

});

app.post("/login", (req, res) =>{
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;
    const valid = canLogin(email, password);

    if (valid) {
        res.redirect("/dashboard");
    } else {
        res.send('Invalid email or password')
    }

});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});