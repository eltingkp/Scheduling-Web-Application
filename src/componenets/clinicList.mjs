 
 // populates list of clinics for clinics page 
 export function clinicList(clinicsData) {

    const finalList = [];

    for (let index = 0; index < clinicsData.length; index++) {
        const clinic = clinicsData[index];
        const clinicName = clinic.name;
        const clinicID = clinic.id; 
        const clinicLocation = clinic.location; 
        const clinicImage = clinic.thumbnailUrl;

        const htmlClinicInput =`
        
            <p>
            <label for="clinic${index}">
                <input type="radio" name="clinic" id="clinic${index}" value="${clinicID}" />${clinicName} <p>${clinicID}</p><p>${clinicLocation}</p><p><img src="${clinicImage}" alt="${clinicName}"</p></label>
            </p>
        `;

        finalList.push(htmlClinicInput);
    }
    
    return finalList.join(' ');
}
