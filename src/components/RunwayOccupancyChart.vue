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
    window.addEventListener('resize', this.resizeChart);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeChart);
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    },
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
          data: ['01L/19R', '01R/19L'],
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
          data: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
            name: '01L/19R',
            type: 'bar',
            stack: 'total',
            data: this.generateRunwayData(),
            itemStyle: {
              color: '#5470C6'
            }
          },
          {
            name: '01R/19L',
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
      for (let i = 0; i < 7; i++) {
        let value = Math.floor(Math.random() * 100); // Base traffic
        if (i >= 1 && i <= 5) {
          value += Math.floor(Math.random() * 50); // Increase traffic during weekdays
        } else {
          value += Math.floor(Math.random() * 30); // Increase traffic during weekends
        }
        data.push(value);
      }
      return data;
    }
  }
};
</script>