// pages/mpInfo/mpInfo.js
var wxCharts = require('wxcharts-min.js');
Page({
  data:{
    mp_weixin_id:'',
    mp_info:[],
    province:[],
    hot_arc:[],
    act_info:{},
    width:'',
    border1:'1px solid #4691e2;',
    border2:'',
    border3:'1px solid #4691e2;',
    border4:'',
    type:0,
    day:7,
    bb1:'1px solid #4691e2',
    bb2:'',
    bb3:'',
    bb4:''
  },
  onLoad:function(options){
    var that = this;
    this.setData({
      mp_weixin_id: options.mp_weixin_id
    })

    //基本信息
    wx.request({
        url: 'https://dev2.yeezan.com/api/data/get_mp_info?mp_weixin_id='+that.data.mp_weixin_id,
        data: {
          mp_weixin_id: that.data.mp_weixin_id
          // mp_weixin_id:'kan519'
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {  
          if(res.data.data.mp_sex_percent.length){
            that.setData({
                width: res.data.data.mp_sex_percent[0].percent
              })
          }
          that.setData({
            mp_info:res.data.data,
          })
        }
        
      })

      //粉丝top3地域分析
      wx.request({
        url: 'https://dev2.yeezan.com/api/data/get_mp_province_info?mp_weixin_id='+that.data.mp_weixin_id,
        data: {
          mp_weixin_id: that.data.mp_weixin_id
          // mp_weixin_id:'kan519'
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {  
          that.setData({
            province: res.data.data
          })
        } 
      })

      
     //近30天top10文章
     wx.request({
        url: 'https://dev2.yeezan.com/api/data/get_mp_hot_articles?mp_weixin_id='+that.data.mp_weixin_id,
        data: {
          mp_weixin_id: that.data.mp_weixin_id
          // mp_weixin_id:'kan519'
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {  
          console.log(res.data)
          that.setData({
            hot_arc: res.data.data
          })
        }
        
      })
      
      //近期公众号数据(初始化)
      that.get_mp_recent_stat();
      //近期公众号数据视图(初始化)
      that.get_mp_recent_info();
  },

  //近期公众号数据——切换数据
  avgDayTap:function(e){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    var day = e.currentTarget.dataset.day;
    if(Number(day) == 7){
      this.setData({
        border1:"1px solid #4691e2",
        border2:""
      })
    }else if(Number(day) == 15){
      this.setData({
        border2:"1px solid #4691e2",
        border1:""
      })
    }
    this.get_mp_recent_stat(day)
  },
  
  //近期公众号数据
  get_mp_recent_stat:function(day){
      if(!day){
        day = 7
      }
      var that = this;
      wx.request({
        url: 'https://dev2.yeezan.com/api/data/get_mp_recent_stat?mp_weixin_id='+that.data.mp_weixin_id+'&days=7',
        data: {
          mp_weixin_id: that.data.mp_weixin_id,
          // mp_weixin_id:'kan519',
          days: day
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {  
          wx.hideToast();
          that.setData({
            act_info:res.data.data.act_info
          })
        },
        fail: function(){
          wx.hideToast()
        }  
      })
  },

  //近期公众号数据视图——切换数据
  lineDayTap:function(e){
    wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      })
    var day = e.currentTarget.dataset.day;
    this.setData({
      day: day
    }) 
    var type = this.data.type;
    if(Number(day) == 7){
      this.setData({
        border3:"1px solid #4691e2",
        border4:""
      })
    }else if(Number(day) == 15){
      this.setData({
        border4:"1px solid #4691e2",
        border3:""
      })
    }
    this.get_mp_recent_info(day,type)
  },   

  //记录type
  typeTap: function(e){
    wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      })
    var that = this;
    var type = e.currentTarget.dataset.type;
    var day = that.data.day;
    this.setData({
      type: type
    })   
    switch(Number(that.data.type)){
      case 0:
        that.setData({
          bb1:'1px solid #4691e2',
          bb2:'',
          bb3:'',
          bb4:''
        })
        break;
      case 1:
        that.setData({
          bb1:'',
          bb2:'1px solid #4691e2',
          bb3:'',
          bb4:''
        })
        break;
      case 2:
        that.setData({
          bb1:'',
          bb2:'',
          bb3:'1px solid #4691e2',
          bb4:''
        })
        break;
      case 3:
        that.setData({
          bb1:'',
          bb2:'',
          bb3:'',
          bb4:'1px solid #4691e2'
        })
        break; 
    }
    this.get_mp_recent_info(day,type)
  },

  //近期公众号平均数据视图
  get_mp_recent_info: function(day,type){
    var that = this;
    if(!day){
        day = 7;
    }
    if(!type){
        type = 0;
    }
    wx.request({
        url: 'https://dev2.yeezan.com/api/data/get_mp_recent_info?mp_weixin_id='+that.data.mp_weixin_id+'&days=7&type=0',
        data: {
          mp_weixin_id: that.data.mp_weixin_id,
          // mp_weixin_id:'kan519',
          days: day,
          type: type
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {  
          wx.hideToast();
          console.log(res.data)
          that.setData({
            
          })
        },
        fail: function(){
          wx.hideToast();
        } 
      })
  },
  
  onReady:function(){

    new wxCharts({
      canvasId: 'area',
      type: 'area',
      legend:false,
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [
        {
          name: '成交量1',
          data: [70, 40, 65, 100, 34, 18],
          format: function (val) {
              return val
          }
        },
      ],
      yAxis: {
          format: function (val) {
              return val
          }
      },
      width: 320,
      height: 200
    });

  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})