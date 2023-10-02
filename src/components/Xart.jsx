import { useTheme } from "@mui/material";
import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { UserContext } from "../context/UserContext";



export default function Xart() {
    const theme = useTheme()


    const { operadores } = useContext(UserContext)


    const dados = operadores.map((item) => [item.name, (item.cursos).length]).sort((a, b) => a[1] - b[1]).reverse()


    const state = {

        series: [{
            name: 'oi',
            data: dados.map(i => i[1]).slice(0, 10)

        }],
        noData: {
            text: 'Loading...'
        },
        options: {
            tooltip: {
                x: {
                    show: true
                },

                style: {
                    fontSize: '22px',

                }
            },
            theme: {
                mode: theme.palette.mode,
                palette: theme.palette
            },

            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                        console.table(dados)
                    }
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '75%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: true
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: dados.map(i => i[0]).slice(0, 10)

            }
        },


    };

    return (

        <div >
            <Chart options={state.options} series={state.series} type="bar" height={350} />
        </div>


    );
}



