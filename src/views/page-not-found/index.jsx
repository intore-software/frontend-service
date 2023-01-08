import React from 'react';
import {useHistory} from 'react-router-dom';
import './styles.css';

const PageNotFound = () => {
    const history = useHistory();
    const session = sessionStorage.getItem('token');
    // sessionStorage.removeItem('hash');
    return (
        <div className="not-found-container">
            <h1>404 | Page not found 
                <span>Page you're looking was not found</span>
                <small onClick={() => history.push('/login')}>
                    <p>{(session) ?  "Back to Dashboard" : "Go to login"}</p> 
                </small>
            </h1>
        </div>
    )
}
export default PageNotFound;