import { header } from "../components/header.mjs";
import { footer } from "../components/footer.mjs";
import { navigation } from "../components/navigation.mjs";
import { requestAppointment } from "../components/requestAppointment.mjs";

// displays aappointments request page 
export function appointmentRequestPage() {
    return `
    ${header()}
    ${navigation()}
    ${requestAppointment()}
    ${footer()}`;
}