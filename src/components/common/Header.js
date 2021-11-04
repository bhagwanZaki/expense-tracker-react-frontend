import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Header extends Component {
    render() {
        return (
            <div className='row'>
                <div className="col-4">
                    <h1 className='webTitle'>Expense Tracker</h1>
                </div>
                <div className="col-md-5 col-2"></div>
                <div className="col-md-3 col-6">
                    <div className="card userProfileCard">
                        <div className="card-body text-end">
                            <h4 className='userProfile'>
                                hey {this.props.user.username} ✌, <br />
                                Wallet Cash 💵: {this.props.cash}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Header)
