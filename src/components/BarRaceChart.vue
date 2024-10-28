<template>
  <v-card class="mx-auto" max-width="1200">
    <v-card-title>Number of Aircrafts per Type</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <div id="bar-race-chart" ref="chart" style="height: 400px;"></div>
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
    this.startUpdatingData();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.options = {
        title: {
          text: 'Number of Aircrafts per Type'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A380', 'Boeing 787']
        },
        series: [
          {
            name: 'Aircrafts',
            type: 'bar',
            data: [320, 240, 180, 150, 130],
            itemStyle: {
              color: function(params) {
                const colorMap = {
                  'Boeing 737': '#5470C6',
                  'Airbus A320': '#91CC75',
                  'Boeing 777': '#FAC858',
                  'Airbus A380': '#EE6666',
                  'Boeing 787': '#73C0DE'
                };
                return colorMap[params.name];
              }
            },
            animationDuration: 3000,
            animationEasing: 'linear'
          }
        ]
      };
      this.chart.setOption(this.options);
    },
    startUpdatingData() {
      setInterval(() => {
        this.updateData();
      }, 3000);
    },
    updateData() {
      const newData = this.options.series[0].data.map(value => value + Math.floor(Math.random() * 50));
      const categories = ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A380', 'Boeing 787'];
      const sortedData = newData.map((value, index) => ({ value, category: categories[index] }))
                                .sort((a, b) => b.value - a.value);

      this.options.series[0].data = sortedData.map(item => item.value);
      this.options.yAxis.data = sortedData.map(item => item.category);
      this.chart.setOption(this.options);
    }
  }
};
</script>