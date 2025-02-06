import './ListApplicants.css'
import ApplicantTable from './ApplicantTable';

//A page displaying a table containing applicant users data.
function ListApplicants() {
  return (
        <div className="outer-container">
            <div className="text">
              <p>Applicants</p>
            </div>
            <div className="inner-container">
                <ApplicantTable></ApplicantTable>
            </div>
        </div>
  )
}

export default ListApplicants;