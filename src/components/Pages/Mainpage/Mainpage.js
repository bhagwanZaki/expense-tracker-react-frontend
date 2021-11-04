import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../../actions/auth'
import { Link } from 'react-router-dom'

import '../../../css/Mainpage.css'
import bg from '../../../img/bg.jpg'

export class Mainpage extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    render() {
        const { isAuthenticated} = this.props.auth
        const authLinks = (
            <div>
                <Link to='/home' className="button">Home</Link>
                <button onClick={this.props.logout} className='btn button'>Logout</button>
            </div>
        )
        const guestLinks = (
            <div>
                <Link to='/register' className="button">Register</Link>
                <Link to='/login' className="button">Login</Link>
            </div>
        )

        return (
            <section>
                <div className="logo">
                        Expense Tracker
                    <h2>
                        </h2>
                </div>
                <img src={bg} alt='background-pic' className='bg' />
                <div className="content" id="home" data-aos="fade-up">
                    <h2>Expense Tracker</h2>
                    <h4>Keep an accurate record of your money inflow and outflow </h4>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
  })
  
export default connect(mapStateToProps,{ logout })(Mainpage)
