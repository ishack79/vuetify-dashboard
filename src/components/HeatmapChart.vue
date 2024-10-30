<template>
  <v-card class="mx-auto" max-width="1200">
    <v-card-title>Volume of Flight Plan Traffic</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <div id="heatmap-chart" ref="chart" style="height: 400px;"></div>
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
      const data = this.generateTrafficData();
      const option = {
        tooltip: {
          backgroundColor: '#333', // Dark background for better contrast
          textStyle: {
            color: '#fff' // White text for tooltip
          }
        },
        xAxis: {
          type: 'category',
          data: this.get24HourFormat(),
          axisLabel: {
            color: '#fff' // White text for x-axis labels
          }
        },
        yAxis: {
          type: 'category',
          data: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          axisLabel: {
            color: '#fff' // White text for y-axis labels
          }
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '-1%', // Adjusted to move the slider more to the bottom
          textStyle: {
            color: '#fff' // White text for visualMap
          }
        },
        series: [{
          name: 'Traffic Volume',
          type: 'heatmap',
            data: data,
            label: {
            show: true,
            color: '#000' // Black text for heatmap labels
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      chart.setOption(option);
    },
    generateTrafficData() {
      const data = [];
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
          let value = Math.floor(Math.random() * 20); // Base traffic
          if (hour >= 7 && hour <= 23) {
            value += Math.floor(Math.random() * 30); // Increase traffic during daylight hours
          }
          if (day === 0 || day === 6) {
            value += Math.floor(Math.random() * 50); // Increase traffic during weekends
          }
          data.push([hour, day, value]);
        }
      }
      return data;
    },
    get24HourFormat() {
      return ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
    }
  }
};
</script>