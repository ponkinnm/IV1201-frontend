import React from 'react'
import './ListApplicants.css'
import ApplicantTable from './ApplicantTable';

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