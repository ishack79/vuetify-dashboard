<template>
    <v-card class="mx-auto" max-width="1200">
      <v-card-title>Flight and Towing Status</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-card>
                <v-card-text>
                  <div id="pie-chart" ref="chart" style="height: 400px;"></div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        const chart = echarts.init(this.$refs.chart);
        const options = {
          title: {
            text: 'Flight and Towing Status',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Status',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 1048, name: 'Departures On Time' },
                { value: 735, name: 'Departures Delayed' },
                { value: 580, name: 'Arrivals On Time' },
                { value: 484, name: 'Arrivals Delayed' },
                { value: 300, name: 'Towing On Time' },
                { value: 200, name: 'Towing Delayed' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        chart.setOption(options);
      }
    }
  };
  </script>