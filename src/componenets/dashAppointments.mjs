export function dashAppointments(appointments) {

    const dashAppointmentsList = []

    for (let index = 0; index < appointments.length; index++) {
        const appointment= appointments[index];
        const appointmentType = appointment.type;
        const appointmentDate = appointment.requestDate; 
        const appointmentTime = appointment.time; 

        const htmlAppointmentsTableRow =`
  
            <tr>
                <td>${appointmentType}</td>
                <td>${appointmentDate}</td>
                <td>${appointmentTime}</td>
                <td>Pending</td>
            </tr>`;
        
        dashAppointmentsList.push(htmlAppointmentsTableRow);

    }
    return `<table class='dash'>
                <tr>
                    <th class="dashClinics">Service</th>
                    <th class="dashClinics">Date</th>
                    <th class="dashClinics">Time</th>
                    <th class="dashClinics">Confirmation Status</th>
                </tr>
                ${dashAppointmentsList.join(' ')}
            </table>`;

}
