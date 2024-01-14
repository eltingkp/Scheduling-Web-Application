import { header } from "../components/header.mjs";
import { footer } from "../components/footer.mjs";
import { loginForm } from "../components/loginForm.mjs";

//displays login page
export function loginPage(notValid) {
    let errorMessage = ''
    if (notValid) {
        errorMessage = `<p class="error">Invalid username or password</p>`
    }

    return`
        ${header()}
        ${loginForm()}
        ${errorMessage}
        ${footer()}`;
}