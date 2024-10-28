<template>
  <v-card class="mx-auto" max-width="1200">
    <v-card-title>Flight Plan Traffic Volume Heatmap</v-card-title>
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
      const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
      const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

      const data = [];
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 24; j++) {
          data.push([j, i, Math.floor(Math.random() * 100)]);
        }
      }

      const options = {
        tooltip: {
          position: 'top',
          textStyle: {
            color: '#e2e8f0'
          }
        },
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: hours,
          splitArea: {
            show: true
          },
          axisLabel: {
            color: '#e2e8f0'
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          splitArea: {
            show: true
          },
          axisLabel: {
            color: '#e2e8f0'
          }
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          textStyle: {
            color: '#e2e8f0'
          }
        },
        series: [{
          name: 'Flight Plan Traffic Volume',
          type: 'heatmap',
          data: data,
          label: {
            show: true,
            color: '#e2e8f0'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };

      chart.setOption(options);
    }
  }
};
</script>