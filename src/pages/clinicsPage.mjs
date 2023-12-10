import { header } from "../componenets/header.mjs";
import { navigation } from "../componenets/navigation.mjs";
import { selectClinicID } from "../componenets/selectClinicID.mjs";
import { footer } from "../componenets/footer.mjs";
import { clinicList } from "../componenets/clinicList.mjs";

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

