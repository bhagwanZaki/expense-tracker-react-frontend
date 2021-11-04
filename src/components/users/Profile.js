import React, { Component } from 'react'
import { Redirect } from "react-router";
import '../../css/createprofile.css'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile } from '../../actions/auth';

export class Profile extends Component {
    state = {
        amount: 0,
        submit : false
    }

    static propTypes = {
        createProfile: PropTypes.func.isRequired,
    }

    onChange = (e) => this.setState({
        [e.target.name]: parseFloat(e.target.value)
    })

    onSubmit = async (e) =>{
        e.preventDefault();
        var { amount } = this.state;
        const Profile = { amount };
        await this.props.createProfile(Profile);
        this.setState({
            submit: true
        })
    }
    render() {
        if (this.props.auth.isLoading){
            return (
                <h1>Loading</h1>
            )
        } else if(this.props.auth.profileExists === true){
            return <Redirect to='/home' />;
        } else if(this.state.submit){
            return <Redirect to='/home' />;
        } else {
            return (
                <section className='createSection'>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="row">
                                        <div className="col-12">
                                            <h1>🤘</h1>
                                        </div>
                                        <div className="col-12">
                                            <h3>
                                                Enter the initial amount for your wallet
                                            </h3>
                                        </div>
                                        <div className="col-12">
                                            <form onSubmit={this.onSubmit}>
                                                <div className="row">
                                                    <div className="col-11">
                                                        <input type="number" placeholder='Enter the amount' className='form-control' name="amount" id="amount" onChange={this.onChange}/>
                                                    </div>
                                                    <div className="col-1">
                                                        <input type="submit" value="=>" className='btn btn-dark' />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )

        }
    }
}

const mapStateToProps = (state) => ({
    auth:state.auth
})
export default connect(mapStateToProps,{createProfile})(Profile)
