import { header } from "../componenets/header.mjs";
import { navigation } from "../componenets/navigation.mjs";
import { dashboard } from "../componenets/dashboard.mjs";
import { footer } from "../componenets/footer.mjs";

// displays dashboard 
export function dashboardPage(name, email, clinics, appointments) {
    return`
    ${header()}
    ${navigation()}
    ${dashboard(name || email, clinics, appointments)}
    ${footer()}`;
}