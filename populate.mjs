import clinicsJSON from './clinics.json' assert {type: 'json'};

export async function populateClinics() {
    for (let index = 0; index < clinicsJSON.length; index++) {
        let data = clinicsJSON[index];
        const response = await fetch('http://127.0.0.1:8000/create-clinic', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        });
        const responseData = await response.json();
        console.log(responseData);
    }
}
