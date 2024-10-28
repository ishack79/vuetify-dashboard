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
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      const data = this.generateTrafficData();
      const option = {
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.get24HourFormat()
        },
        yAxis: {
          type: 'category',
          data: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '2%' // Adjusted to move the slider more to the bottom
        },
        series: [{
          name: 'Traffic Volume',
          type: 'heatmap',
          data: data,
          label: {
            show: true
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
      const hours = [];
      for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, '0');
        hours.push(`${hour}:00`);
      }
      return hours;
    }
  }
};
</script>