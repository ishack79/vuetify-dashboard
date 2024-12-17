<template>
  <v-card class="mx-auto" style="max-width: 100%">
    <v-card-title>Volume of Departures and Arrivals</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <div id="chart" ref="chart" style="height: 33vh;"></div>
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
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      const options = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#333',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          data: ['Departures', 'Arrivals', 'Average'],
          textStyle: {
            color: '#e2e8f0'
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            name: 'Departures',
            type: 'bar',
            data: [120, 200, 150, 80, 70, 110, 130]
          },
          {
            name: 'Arrivals',
            type: 'bar',
            data: [90, 180, 130, 100, 60, 90, 120]
          },
          {
            name: 'Average',
            type: 'line',
            data: [105, 190, 140, 90, 65, 100, 125],
            smooth: true,
            lineStyle: {
              color: '#FF0000'
            }
          }
        ]
      };
      chart.setOption(options);
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    }
  }
};
</script>