import { header } from "../components/header.mjs";
import { footer } from "../components/footer.mjs";
import { navigation } from "../components/navigation.mjs";

// displays response after sending an appointment request
export function appointmentResponsePage() {
    return `
    ${header()}
    ${navigation()}
        <h3>Thank you for sending an appointment request!</h3>
        <article class="response">
            <h2>You will receive an email shortly with our availability for the date, time, and service you requested for the clinics linked to your profile.</h2>
            <p>
            <a href="/dashboard">Return to Dashboard</a>
            </p>
        </article>
    ${footer()}`;
}