import { header } from "../components/header.mjs";
import { navigation } from "../components/navigation.mjs";
import { dashboard } from "../components/dashboard.mjs";
import { footer } from "../components/footer.mjs";

// displays dashboard 
export function dashboardPage(name, email, clinics, appointments) {
    return`
    ${header()}
    ${navigation()}
    ${dashboard(name || email, clinics, appointments)}
    ${footer()}`;
}