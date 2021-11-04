import React, { Component } from 'react'
import Piechart from '../../common/Piechart'
import Textcard from '../../common/Textcard'
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome'
import { faChartPie, faChartLine } from '../../../../node_modules/@fortawesome/free-solid-svg-icons'
import Linechart from '../../common/Linechart'
import Header from '../../common/Header'
import { getDashboard } from '../../../actions/dashboard'
import { connect } from 'react-redux';

export class DashboardPage extends Component {
    state = {
        chartType: true
    }
    
    toogleChart = () => {
        this.setState({
            chartType: !this.state.chartType
        })
    }

    componentDidMount(){
        this.props.getDashboard();
    }

    render() {
        if(this.props.dayList.length <= 0){
            return (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
            )
        }
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <Textcard  title={'Total Amount'} amount={this.props.total_amount} color={'white'}  textcolor={'dark'}/>
                        </div>
                        <div className="col-md-3">
                            <Textcard title={'Current month Expense'} amount={this.props.expenseAmt} color={'danger'} textcolor={'white'}/>
                        </div>
                        <div className="col-md-3">
                            <Textcard title={'Current month Income'} amount={this.props.incomeAmt} color={'success'} textcolor={'white'}/>
                        </div>
                        <div className="col-md-3">
                            <Textcard title={'Current month Saving'} amount={this.props.savingAmt} color={'primary'} textcolor={'white'}/>
                        </div>
                    </div>
                    <br />
                    <div className="d-flex flex-row-reverse">
                        <div className="col-md-1 col-1">
                                <button className='btn btn-primary toogleChart' onClick={this.toogleChart}>
                                    {
                                        this.state.chartType ? (
                                            <FontAwesomeIcon icon={faChartPie} />
                                            ) : (
                                            <FontAwesomeIcon icon={faChartLine} />
                                        )
                                    }
                                </button>
                        </div>
                    </div>
                    {/* chart row */}
                    {
                        this.state.chartType ? (
                            <div className="row">
                                <div className="col-md-4">
                                    <Piechart titletype={'Expense'} graphCount={this.props.total_expense_count} color={'#eb4034'}/>
                                </div>
                                <div className="col-md-4">
                                    <Piechart titletype={'Income'} graphCount={this.props.total_income_count} color={'#12b546'}/>
                                </div>
                                <div className="col-md-4">
                                    <Piechart titletype={'Saving'} graphCount={this.props.total_saving_count} color={'#34a8eb'}/>
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <Linechart dayList = {this.props.dayList} income_graph_data={this.props.income_graph_data} saving_graph_data={this.props.saving_graph_data} expense_graph_data={this.props.expense_graph_data} />
                                </div>
                            </div>
                        )
                    }

                      {/* textcard */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    total_amount: state.dashboard.total_amount,
    incomeAmt:state.dashboard.incomeAmt,
    savingAmt:state.dashboard.savingAmt,
    expenseAmt:state.dashboard.expenseAmt,

    dayList: state.dashboard.dayList,
    income_graph_data: state.dashboard.income_graph_data,
    saving_graph_data: state.dashboard.saving_graph_data,
    expense_graph_data: state.dashboard.expense_graph_data,
    
    total_income_count:state.dashboard.total_income_count,
    total_saving_count:state.dashboard.total_saving_count,
    total_expense_count:state.dashboard.total_expense_count
})

export default connect(mapStateToProps,{ getDashboard })(DashboardPage)
