import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';
export class Piechart extends Component {
    getRandomColor = (len) =>{
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        var colors = []
        for(var j=0;j<=len;j++){
          for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          colors.push(color)
          color = '#'
        }
        return colors;
      }

    render() {
        var Amtdata = this.props.graphCount
        var remaining = 100 - Amtdata
        const { innerWidth: width } = window;
        var cutoutNum;
        if (width <= 610){
          cutoutNum = 150
        } else {
          cutoutNum = 70
        }
        var color = this.props.color

        const data = {
            labels: ['a','b'],
            datasets: [
              {
                label: "Number of purchase done",
                data: [Amtdata,remaining],
                cutout: cutoutNum,
                backgroundColor: [color,'#cfcfcf'],
                borderColor: [color,'#cfcfcf'],
                hoverOffset: 4,
                spacing:0,
              },
            ],
          };

        return (
            <div className="card chartCard">
                <div className="card-body text-lg-start text-center ">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-8 col-12">
                                <h4>{this.props.titletype}</h4> {Amtdata}%
                        </div>
                        <div className="col-md-4 col-12">
                            <Doughnut 
                            data={data} 
                            width={100} 
                            height={100} 
                            options=
                                {
                                    {
                                        plugins: {
                                            legend: {
                                                display: false
                                            },
                                            
                                        },
                                        responsive: true,
                                        maintainAspectRatio: true,
                                    }
                                } />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Piechart
