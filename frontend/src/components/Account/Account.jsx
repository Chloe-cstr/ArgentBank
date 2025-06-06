import PropTypes from 'prop-types';
import './account.css';

const Account =({title, amount, description})=>{
    return(
        <div className='account'>
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">{amount}</p>
                <p className="account-amount-description">{description}</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </div>
    )
}

Account.propTypes = {
    amount: PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired
}

export default Account;