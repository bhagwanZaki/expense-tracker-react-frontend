import React, { Component } from 'react'
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome'
import { faPlus } from '../../../../node_modules/@fortawesome/free-solid-svg-icons'
import Header from '../../common/Header'

import { connect } from 'react-redux'
import { getexpense,createExpense } from '../../../actions/expense'
import { loadProfile } from '../../../actions/auth'
import { createMeassage } from '../../../actions/messages'
export class Walletpage extends Component {

    state = {
        open:false,
        title: '',
        amount:0,
        incomeOrexpense:''
    }

    onChange = (e) => this.setState({
        [e.target.name]:e.target.value
    })

    onAmountChange = (e) => this.setState({
        amount:parseFloat(e.target.value)
    })

    
    onSubmit = async (e) =>{
        e.preventDefault();
        var { title,amount,incomeOrexpense } = this.state
        var Expense = { title,amount,incomeOrexpense }
        if(this.state.amount <= 0 || this.state.title === '' || this.state.incomeOrexpense==='' || this.state.incomeOrexpense==='None'){
            // alert('Fill the form correctly')
            this.props.createMeassage({ passwordNotMatch: 'Fill the form correctly' });
            
        } else {
            if(incomeOrexpense === 'expense' && this.props.auth.profile[0].amount - amount < 0){
                // alert('Expense cannot be greater than your wallet amount')
                this.props.createMeassage({ passwordNotMatch: 'Expense cannot be greater than your wallet amount' });
            } else {
                await this.props.createExpense(Expense);
                this.setState({
                    open:false,
                    title: '',
                    amount:0,
                    incomeOrexpense:''
                })
                await this.props.loadProfile()
            }
        }
    }
    openCreateTab = () => {
        this.setState({
            open: !this.state.open
        })
    }

    componentDidMount(){
        this.props.getexpense();
        this.props.loadProfile();
        
    }


    render() {
        var openTab;

        if(this.state.open){
            openTab = 'col-md-8'
        } else {
            openTab = 'col-md-12'
        }

        if(this.props.expense.isloaded === false){
            return (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
            )
        } 
        
        if(this.props.auth.profile[0]){
            var amount = this.props.auth.profile[0].amount
        } 

        var expenses = [...this.props.expense].reverse();
        return (
            <div>
                <Header cash={amount}/>
                {/* <Alerts /> */}
                <div className="container-fluid">
                    <div className="row">
                        {
                            this.state.open ? (
                                <div className="col-md-4">
                                    <div className='card'>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h3>
                                                        <u>
                                                            Add transaction
                                                        </u>
                                                    </h3>
                                                </div>
                                            </div>
                                            <form className='customForm' onSubmit={this.onSubmit}>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label htmlFor="title" className='form-label'>
                                                            Note : 
                                                        </label>
                                                    </div>
                                                    <div className="col-md-10">
                                                        <input type="text" name="title" id="title" className='form-control' placeholder='Place Note' onChange={this.onChange}/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label htmlFor="incomeOrexpense" className='form-label'>
                                                            Type : 
                                                        </label>
                                                    </div>
                                                    <div className="col-md-10">
                                                        <select name="incomeOrexpense" id="incomeOrexpense" className="form-select" onChange={this.onChange} defaultValue={'None'}>
                                                            <option disabled value="None">Select the option</option>
                                                            <option value="income">Income</option>
                                                            <option value="expense">Expense</option>
                                                            <option value="saving">Saving</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label htmlFor="amount" className='form-label'>
                                                            Amount:
                                                        </label>
                                                    </div>
                                                    <div className="col-md-10">
                                                        <input type="number" step="any" name="amount" id="amount" className='form-control' placeholder='Amount' onChange={this.onAmountChange}/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <input type="submit" value="Add" className='btn btn-dark' />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                        <div className={`${openTab}`}>
                            <br />
                            <div className="row">
                                <div className="col-md-4 col-12">
                                        <button className='btn btn-primary' onClick={this.openCreateTab}>
                                            <h5 className='addTrasc'>
                                                Add New Transaction <FontAwesomeIcon icon={faPlus} />
                                            </h5>
                                        </button>
                                </div>
                            </div>
                            <hr />
                            <div className="table-responsive">
                                <table className='table table-bordered table-hover' data-page-length='50'>
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Sr.No.</th>
                                            <th>Note</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-light">
                                        {
                                            expenses.map((item,index) => (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{item.amount_date}</td>
                                                    {
                                                        item.incomeOrexpense === 'income' ? (
                                                            <td className='text-success'>
                                                                Income
                                                            </td>
                                                        ) : (
                                                            item.incomeOrexpense === 'expense' ? (
                                                                <td className='text-danger'>
                                                                    Expense
                                                                </td>
                                                            ) : (
                                                                <td className='text-primary'>
                                                                    Saving
                                                                </td>
                                                            ) 
                                                            
                                                        )
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isloaded:state.expense.isloaded,
    expense: state.expense.expense,
    auth:state.auth
})

export default connect(mapStateToProps,{ getexpense,createExpense,loadProfile,createMeassage })(Walletpage)
