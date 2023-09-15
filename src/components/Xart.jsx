import { useTheme } from "@mui/material";
import React, { Component, useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { UserContext } from "../context/UserContext";



export default function Xart() {
    const theme = useTheme()

    const { operadores } = useContext(UserContext)


    const dados = operadores.map((item) => [item.name, (item.cursos).length]).sort((a, b) => a[1] - b[1]).reverse()


    const state = {

        series: [{
            name: '',
            data: //[1, 2, 3, 4, 5, 6, 7, 8]
                dados.map(i => i[1]).slice(0, 10)

        }],
        options: {
            tooltip: {
                x: {
                    show: true
                },

                // enabled: true,

                style: {
                    fontSize: '22px',
                    fontFamily: undefined
                }
            },
            theme: {
                mode: theme.palette.mode,
                palette: 'palette1',
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'dark',
                    shadeIntensity: 0.65
                },
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
                    columnWidth: '45%',
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
                // [
                //     ['John', 'Doe'],
                //     ['Joe', 'Smith'],
                //     ['Jake', 'Williams'],
                //     'Amber',
                //     ['Peter', 'Brown'],
                //     ['Mary', 'Evans'],
                //     ['David', 'Wilson'],
                //     ['Lily', 'Roberts'],
                // ],
                // labels: {
                //     style: {
                //         colors: "#850f0f",
                //         fontSize: '22px'
                //     }
                // }
            }
        },


    };

    return (

        <div id="chart">
            <Chart options={state.options} series={state.series} type="bar" height={350} />
        </div>


    );
}



// export default Xart;