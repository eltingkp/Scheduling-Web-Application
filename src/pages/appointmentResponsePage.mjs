import { header } from "../componenets/header.mjs";
import { footer } from "../componenets/footer.mjs";
import { navigation } from "../componenets/navigation.mjs";

export function appointmentResponsePage() {
    return `
    ${header()}
    ${navigation()}
        <h3>Thank you for sending an appointment request!</h3>
        <article class="response">
            You will receive an email shortly with our availability for the date, time, and service you requested for the clinics linked to your profile.
        </article>
    ${footer()}`;
}