import React, { Component } from 'react'

export class Textcard extends Component {
    render() {
        return (
            <div className={`card chartCard text-${this.props.textcolor} bg-${this.props.color}`}>
                <div className="card-body">
                    <div className="row d-flex align-items-center">
                        <div className="col-8">
                            {
                                this.props.title === 'Total Amount' ? (
                                    <h4>{this.props.title} <br /> &nbsp;</h4> 
                                    ) : (
                                        <h4>{this.props.title}</h4> 
                                )
                            }
                        </div>
                        <div className="col-4">
                            <h4>{this.props.amount}</h4>                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Textcard
