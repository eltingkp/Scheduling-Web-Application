import { header } from "../componenets/header.mjs";
import { footer } from "../componenets/footer.mjs";
import { navigation } from "../componenets/navigation.mjs";
import { requestAppointment } from "../componenets/requestAppointment.mjs";

export function appointmentRequestPage() {
    return `
    ${header()}
    ${navigation()}
    ${requestAppointment()}
    ${footer()}`;
}