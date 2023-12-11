export function selectClinicID () {
    return`
        <form action="/clinics-search" method="POST">
            <fieldset class="clinicID">
                <legend>Search via Clinic ID</legend>

                <label for="clinic-search-id">Enter Clinic ID:</label>
                <p>
                <input type="search" id="clinic-search-id" name="search" />
                </p>
                
                <a href="/dashboard">Go Back</a>
                <button>Search</button>
            </fieldset>
        </form>`;
}