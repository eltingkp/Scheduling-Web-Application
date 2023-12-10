import { header } from "../componenets/header.mjs";
import { footer } from "../componenets/footer.mjs";
import { loginForm } from "../componenets/loginForm.mjs";

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