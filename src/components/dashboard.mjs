import { dashAppointments } from "./dashAppointments.mjs";
import { dashClinics } from "./dashClinics.mjs";

//html for dashboard
export function dashboard(name, clinics, appointments) {

    return`
        <section>
            <h2>Welcome ${name}!</h2>
            
            <article>
                <div class="dash">
                    <h3>Upcoming Appointments</h3>
                    <p>
                        ${dashAppointments(appointments)}
                    </p>
                
                </div>
                <div class="dash">
                    <h3 class="dash">Your Clinics</h3>
                    <p>
                    ${dashClinics(clinics)}
                    </p>
                </div>
            </article>
            
        </section>`;
}
