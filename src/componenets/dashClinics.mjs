export function dashClinics(clinics) {

    const dashClinicsList = []

    for (let index = 0; index < clinics.length; index++) {
        const clinic = clinics[index];
        const clinicName = clinic.name;
        const clinicID = clinic.id; 
        const clinicLocation = clinic.location; 
        const clinicImage = clinic.thumbnailUrl;

        const htmlClinicsTableRow =`
  
            <tr>
                <td>${clinicName}</td>
                <td>${clinicID}</td>
                <td>${clinicLocation}</td>
                <td><img src="${clinicImage}" alt="${clinicName}"</td>
            </tr>`;
        
        dashClinicsList.push(htmlClinicsTableRow)
    }
    return `<table class='dash'>
                <tr>
                    <th class="dashClinics">Name</th>
                    <th class="dashClinics">ID</th>
                    <th class="dashClinics">Location</th>
                    <th class="dashClinics">Image</th>
                </tr>
                ${dashClinicsList.join(' ')}
            </table>`;

}
