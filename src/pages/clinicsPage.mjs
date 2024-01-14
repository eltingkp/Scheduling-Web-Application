import { header } from "../components/header.mjs";
import { navigation } from "../components/navigation.mjs";
import { selectClinicID } from "../components/selectClinicID.mjs";
import { footer } from "../components/footer.mjs";
import { clinicList } from "../components/clinicList.mjs";

// displays clinics pages
export function clinicsPage(clinicsData, notFound) {
    const finalList = clinicList(clinicsData);
    let form = '';
    let errorDisplay = '';
    if (notFound) {
        errorDisplay = `<h3>Clinic not found, please try again or <a href='./clinics'> search via list</a>!</h3>`;
    } else {
        form = `
            <form action="/clinics" method="POST">
                <fieldset class="clinicList">
                    <legend>Select Clinic via List</legend>

                    ${finalList}
                    <a href="/dashboard">Go Back</a>
                    <button>Add</button>
                </fieldset>
            </form>`;
    }

    return `
    ${header()}
    ${navigation()}
        <section>
        <article>
        ${selectClinicID()}
        ${form}
        ${errorDisplay}        
        </article>
        </section>
    ${footer()}`
}

