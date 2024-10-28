<template>
  <v-card class="mx-auto" max-width="1200">
    <v-card-title>Volume of Departures and Arrivals</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <div id="chart" ref="chart" style="height: 400px;"></div>
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
          text: 'Volume of Departures and Arrivals'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Departures', 'Arrivals', 'Average']
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
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
    }
  }
};
</script>