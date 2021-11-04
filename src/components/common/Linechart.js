import React, { Component } from 'react'
import { Line } from "react-chartjs-2";

export class Linechart extends Component {
    render() {
        const { innerWidth: width } = window;
        
        let data = {
            labels: this.props.dayList,
            datasets: [
              {
                label: "Income",//ourstat
                data: this.props.income_graph_data,
                fill: false,
                backgroundColor: "#198754",
                borderColor: "#a6f7d2",
              },
              {
                label: "Expense",
                data: this.props.expense_graph_data,
                fill: false,
                backgroundColor: "#dc3545",
                borderColor: "#faafb6",
              },
              {
                label: "Saving",
                data: this.props.saving_graph_data,
                fill: false,
                backgroundColor: "#0d6efd",
                borderColor: "#bed5f7",
              },
            ],
          };
          
          const options = {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          };

        return (
            <div className="p-4 border mb-3 container-fluid mx-auto">
                <div className="row">
                    <div className="col-12 lineChart">
                        <Line className='' data={data} options={options} width='40px' height={ width <= 600 ? ('45vh') : ('20vh')} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Linechart
