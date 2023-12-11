import { header } from "../componenets/header.mjs";
import { footer } from "../componenets/footer.mjs";
import { navigation } from "../componenets/navigation.mjs";

// displays the response after adding a clinic to profile
export function clinicAddResponsePage() {
    return`
        ${header()}
        ${navigation()}
        <h3> Confirmation </h3>
        <article class="clinicResponse">
            <h2>The clinic you selected has been linked to your profile</h2>
            <p>
            <a href="/dashboard">Return to Dashboard</a>
            </p>
        </article>
        ${footer()}
    `
}
