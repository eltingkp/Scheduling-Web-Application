export function requestAppointment() {
    return`
        <form action="/appointments" method="POST">

        <fieldset class="appointment">
            <legend>Request an Appointment</legend>
            <p>
                <label for="type">Appointment Type</label> 
                <select name="type" id="type">
                    <option value="Massage">Massage Appointment</option>
                    <option value="Chiropractor">Chiropractic Appointment</option>
                </select>
            </p>

            <p>
                <label for="date">Request Date:</label>

                <input type="date" 
                    id="date" 
                    name="requestDate" 
                    value="2023-12-01" 
                    min="2023-12-01" 
                    max="2024-01-31" />
                    
            </p>

            <p>
                <label for="time">Time Request:</label>

                <input type="time" 
                    id="time" 
                    name="time" 
                    min="09:00" 
                    max="16:00" 
                    required />
            </p>

            <p><label for="comments">Please describe your symptoms, problem areas, and goal of your visit:</label>
                <p>
                <textarea class="textbox"
                    name="comments"
                    id="comments"
                    minlength="5"
                    maxlength="2000"
                    required
                    placeholder="Min 5 characters. Max 2000 characters."
                ></textarea>
                </p>
            </p>
            <button type="submit">Submit</button>

        </fieldset>`
}
