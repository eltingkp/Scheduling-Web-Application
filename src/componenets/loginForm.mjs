export function loginForm() {
    return `
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
        </form>`;
}
