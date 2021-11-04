/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react'
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome'
import { faChartLine, faWallet, faPowerOff } from '../../../node_modules/@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'

export class Navbar extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    } 

    render() {
        return (
            /* eslint-disable jsx-a11y/anchor-is-valid */
            <div className="row navBarRow">
            <nav className="navBar">
                <ul className="navBar-nav">
                {/* <li className="logo">
                    <a href="#" className="nav-link">
                    <span className="link-text logo-text">Fireship</span>
                 
                    </a>
                </li> */}

                <li className="nav-items">
                    <Link to='/dashboard' className='nav-Link'>
                        <FontAwesomeIcon className='svg' icon={faChartLine} />
                        <span className="link-text">Dashboard</span>
                    </Link>
                </li>

                <li className="nav-items">
                    <Link to='/home' className='nav-Link'>
                        <FontAwesomeIcon className='svg' icon={faWallet} />
                        <span className="link-text">Wallet</span>
                    </Link>
                </li>
                <li className="nav-items">
                    <div className="nav-Link" onClick={this.props.logout}>
                        <FontAwesomeIcon className='svg' icon={faPowerOff} />
                        <span className="link-text">Logout</span>
                    </div>
                </li>
                </ul>
            </nav>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {logout})(Navbar)
