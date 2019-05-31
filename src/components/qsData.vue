<template>
<div class="wrap">
	<h2>中山大学睡眠质量调查情况</h2>
	<!--  <h2>qsItem.title</h2>  -->
<el-card class="box-card1">
	<div slot="header" class="clearfix">
	<!-- qsItem.type == '单选' -->
	<span>1.您每晚几点睡？</span></div>
	<div v-for="o in 4" :key="o" class="text_item1">
    {{'选项' + o }}

  </div>
	<div id="echarts1" :style="{width: '200px', height: '150px'}" class="echarts1">
	</div>
 
</el-card>

<el-card class="box-card2">
  <div slot="header" class="clearfix">
		<!-- 后端get… -->
    <span>2.您睡前看书吗</span>
  </div>
  <div v-for="o in 4" :key="o" class="text_item2">
    {{'选型 ' + o }}
		
  </div>
	<div id="echarts2" :style="{width: '200px', height: '150px'}" class="echarts2">
	</div>
</el-card>
</div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
export default {
    name: 'Data',
	data() {
		return {
            //通过router传递的row.ID匹配
			qsItem: {},
			scale: '',
		}
    },
    methods:{
			//通过题目的type来判断表的类型
     getchart1(){
var dom = document.getElementById('echarts1')
      var myChart = this.echarts.init(dom)
      // 绘制图表
      myChart.setOption({
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
        series: [{
          name: '',
          type: 'pie',
          radius: '55%',
          data: [{
              value: 235,
              name: '8点'
            },
            {
              value: 274,
              name: '9点'
            },
            {
              value: 310,
              name: '10点'
            },
      
          ]
        }]
      });
		 },

		  getchart2(){
var dom = document.getElementById('echarts2')
      var myChart = this.echarts.init(dom)
      // 绘制图表
      myChart.setOption({
       title : {
        text: '',
    },
    tooltip : {
        trigger: 'axis'
    },
    
    calculable : true,
    xAxis : [
        {
            type : 'value',
            boundaryGap : [0, 0.01]
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['问题2']
        }
    ],
    series : [
        {
            name:'看',
            type:'bar',
            data:[40]
				},
				 {
            name:'不看',
            type:'bar',
            data:[56]
        }
      
    ]
      });
		 }
		
    },
mounted() {
			this.getchart1(),
			this.getchart2()
    },


    }
    

</script>

<style>

  .box-card1{
     position: relative;
		 height:25%;
		 width: 50%;
		 left:25%;
	}
	.text_item1{
		position: relative;
		left:-25%;
	}
.echarts1{
	position: relative;
	 height: 400px;
	 width: 400px;
	 left: 40%;
	 top:-25%
}
.box-card2{
     position: relative;
		 height:25%;
		 width: 50%;
		 left:25%;
	}
	.text_item2{
		position: relative;
		left:-25%;
	}
.echarts2{
	position: relative;
	 height: 400px;
	 width: 400px;
	 left: 40%;
	 top:-25%
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
</style>