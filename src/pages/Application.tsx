import '../container.css';
import ApplicationForm from '../components/ApplicationForm.tsx';

function Application(){
    return(
        <div className="outer-container">
            <div className="inner-container">
                <ApplicationForm />
            </div>
        </div>
    );
}

export default Application;