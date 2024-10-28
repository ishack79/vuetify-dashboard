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
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);

      const data = [
        { name: 'AA101', type: 'departure', time: '2023-10-01 00:30' },
        { name: 'BA202', type: 'landing', time: '2023-10-01 01:45' },
        { name: 'CA303', type: 'departure', time: '2023-10-01 02:00' },
        { name: 'DA404', type: 'landing', time: '2023-10-01 03:15' },
        { name: 'EA505', type: 'departure', time: '2023-10-01 04:30' },
        { name: 'FA606', type: 'landing', time: '2023-10-01 05:45' },
        { name: 'GA707', type: 'departure', time: '2023-10-01 06:00' },
        { name: 'HA808', type: 'landing', time: '2023-10-01 07:15' },
        { name: 'IA909', type: 'departure', time: '2023-10-01 08:30' },
        { name: 'JA010', type: 'landing', time: '2023-10-01 09:45' },
        { name: 'KA111', type: 'departure', time: '2023-10-01 10:00' },
        { name: 'LA212', type: 'landing', time: '2023-10-01 11:15' },
        { name: 'MA313', type: 'departure', time: '2023-10-01 12:30' },
        { name: 'NA414', type: 'landing', time: '2023-10-01 13:45' },
        { name: 'OA515', type: 'departure', time: '2023-10-01 14:00' },
        { name: 'PA616', type: 'landing', time: '2023-10-01 15:15' },
        { name: 'QA717', type: 'departure', time: '2023-10-01 16:30' },
        { name: 'RA818', type: 'landing', time: '2023-10-01 17:45' },
        { name: 'SA919', type: 'departure', time: '2023-10-01 18:00' },
        { name: 'TA020', type: 'landing', time: '2023-10-01 19:15' },
        { name: 'UA121', type: 'departure', time: '2023-10-01 20:30' },
        { name: 'VA222', type: 'landing', time: '2023-10-01 21:45' },
        { name: 'WA323', type: 'departure', time: '2023-10-01 22:00' },
        { name: 'XA424', type: 'landing', time: '2023-10-01 23:15' }
      ];

      const categories = data.map(item => item.name);
      const departureData = data.filter(item => item.type === 'departure').map(item => ({
        name: item.name,
        value: [
          new Date(item.time).getTime(),
          item.name
        ]
      }));
      const landingData = data.filter(item => item.type === 'landing').map(item => ({
        name: item.name,
        value: [
          new Date(item.time).getTime(),
          item.name
        ]
      }));

      const options = {
        tooltip: {
          formatter: function (params) {
            return `${params.marker} ${params.name}: ${new Date(params.value[0]).toLocaleString()}`;
          },
          backgroundColor: '#333', // Dark background for better contrast
          textStyle: {
            color: '#fff' // White text for better readability
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
          name: 'Time',
          nameLocation: 'middle',
          nameTextStyle: {
            color: '#e2e8f0',
            padding: 20
          },
          axisLabel: {
            color: '#e2e8f0'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#444'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: categories,
          axisLabel: {
            color: '#e2e8f0' // Show y-axis labels
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#444'
            }
          }
        },
        series: [
          {
            name: 'Departure',
            type: 'scatter',
            data: departureData,
            symbolSize: 10, // Adjust point size
            itemStyle: {
              color: '#5470C6'
            }
          },
          {
            name: 'Landing',
            type: 'scatter',
            data: landingData,
            symbolSize: 10, // Adjust point size
            itemStyle: {
              color: '#91CC75'
            }
          }
        ]
      };

      chart.setOption(options);
    }
  }
};
</script>