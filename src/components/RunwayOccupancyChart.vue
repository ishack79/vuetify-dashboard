<template>
  <v-card class="mx-auto" max-width="1200">
    <v-card-title>Runway Occupancy</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <div id="runway-occupancy-chart" ref="chart" style="height: 400px;"></div>
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: '#333', // Dark background for better contrast
          textStyle: {
            color: '#fff' // White text for better readability
          }
        },
        legend: {
          data: ['Runway 01L/19R', 'Runway 01R/19L'],
          textStyle: {
            color: '#e2e8f0'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'],
          axisLabel: {
            color: '#e2e8f0'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#e2e8f0'
          }
        },
        series: [
          {
            name: 'Runway 01L/19R',
            type: 'bar',
            stack: 'total',
            data: this.generateRunwayData(),
            itemStyle: {
              color: '#5470C6'
            }
          },
          {
            name: 'Runway 01R/19L',
            type: 'bar',
            stack: 'total',
            data: this.generateRunwayData(),
            itemStyle: {
              color: '#91CC75'
            }
          }
        ]
      };
      chart.setOption(options);
    },
    generateRunwayData() {
      const data = [];
      for (let i = 0; i < 24; i++) {
        let value;
        if (i >= 6 && i <= 18) {
          value = Math.floor(Math.random() * 100) + 50; // More traffic during daylight hours
        } else {
          value = Math.floor(Math.random() * 50); // Less traffic during night hours
        }
        data.push(value);
      }
      return data;
    }
  }
};
</script>