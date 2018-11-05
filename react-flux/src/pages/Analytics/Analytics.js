import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Container } from 'mdbreact';
import Store from '../../stores/Store';

export default class Analytics extends React.Component {
    componentDidMount() {
        //doughnut
        var ctxD = document.getElementById("doughnutChart").getContext('2d');
        new Chart(ctxD, {
            type: 'doughnut',
            data: {
                labels: ["Tasks Pending", "Task Completed"],
                datasets: [
                    {
                        data: Store.getAnalytics(),
                        backgroundColor: ["#F7464A", "#46BFBD"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
                    }
                ]
            },
            options: {
                responsive: true
            }
        });
    }
    render() {
        return (
        <Container>
          <canvas id="doughnutChart"></canvas>
        </Container>
        );
    }

};