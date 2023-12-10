import { header } from "../componenets/header.mjs";
import { footer } from "../componenets/footer.mjs";
import { navigation } from "../componenets/navigation.mjs";

export function clinicAddResponsePage() {
    return`
        ${header()}
        ${navigation()}
        <h3> Confirmation </h3>
        <p>
            The clinic you selected has been linked to your profile
        </p>
        ${footer()}
    `
}
