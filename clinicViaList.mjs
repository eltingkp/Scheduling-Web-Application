 export function getHtmlClinicList(clinicsList) {

    const finalList = [];

    for (let index = 0; index < clinicsList.length; index++) {
        const clinic = clinicsList[index];
        const clinicName = clinic.name;
        const clinicID = clinic.id; 
        const clinicLocation = clinic.location; 
        const clinicImage = clinic.thumbnailUrl;

        const htmlClinicInput =`
        
            <p>
            <label for="clinic${index}">
                <input type="radio" name="clinics" id="clinic${index}" value="clinic${index}" />${clinicName} <p>${clinicID}</p><p>${clinicLocation}</p><p><img src="${clinicImage}" alt="${clinicName}"</p></label>
            </p>
        `;

        finalList.push(htmlClinicInput);
    }
    
    return finalList.join(' ');
}
