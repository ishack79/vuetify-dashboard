<template>
  <v-card class="mx-auto" max-width="1200">
    <v-card-title>Airport Flight Schedule</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <div id="gantt-chart" ref="chart" style="height: 400px;"></div>
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
  data() {
    return {
      data: [
        { name: 'AA313', type: 'departure', time: '2023-10-01 12:30' },
        { name: 'BA414', type: 'landing', time: '2023-10-01 13:45' },
        { name: 'CA515', type: 'departure', time: '2023-10-01 14:00' },
        { name: 'DA616', type: 'landing', time: '2023-10-01 15:15' },
        { name: 'AA717', type: 'landing', time: '2023-10-01 16:30' },
        { name: 'BA818', type: 'departure', time: '2023-10-01 17:45' },
        { name: 'CA919', type: 'departure', time: '2023-10-01 18:00' },
        { name: 'DA020', type: 'landing', time: '2023-10-01 19:15' },
        { name: 'AA121', type: 'departure', time: '2023-10-01 20:30' },
        { name: 'BA222', type: 'landing', time: '2023-10-01 21:45' },
        { name: 'CA323', type: 'landing', time: '2023-10-01 22:00' },
        { name: 'DA424', type: 'landing', time: '2023-10-01 23:15' }
      ],
      thresholds: {
        landing: ['01L', '19R'],
        departure: ['01R', '19L']
      }
    };
  },
  computed: {
    departureData() {
      return this.data.filter(item => item.type === 'departure').map(item => ({
        name: item.name,
        value: [
          new Date(item.time).getTime(),
          this.thresholds.departure[Math.floor(Math.random() * this.thresholds.departure.length)]
        ]
      }));
    },
    landingData() {
      return this.data.filter(item => item.type === 'landing').map(item => ({
        name: item.name,
        value: [
          new Date(item.time).getTime(),
          this.thresholds.landing[Math.floor(Math.random() * this.thresholds.landing.length)]
        ]
      }));
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#333', // Dark background for better contrast
          textStyle: {
            color: '#fff' // White text for tooltip
          },
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            let result = params[0].axisValueLabel + '<br/>';
            params.forEach(item => {
                result += item.marker + ': ' + item.data.name + ' (' + new Date(item.data.value[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')<br/>';
            });
            return result;
          }
        },
        legend: {
          data: ['Departure', 'Landing'],
          textStyle: {
            color: '#e2e8f0'
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'category',
          data: ['01L', '19R', '01R', '19L'],
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: 'Departure',
            type: 'scatter',
            data: this.departureData
          },
          {
            name: 'Landing',
            type: 'scatter',
            data: this.landingData
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>