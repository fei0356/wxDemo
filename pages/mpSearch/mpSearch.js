// pages/mpSearch/mpSearch.js
Page({
  data:{
    mp_list:[],
    keyword:'',
    isFormActive: false,
    nextpage: 0,
    isdata:false,
    isShow:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  bindChange: function(e){
      this.setData({
        keyword: e.detail.value
      })
  },

  formSubmit: function(e) {
    //表单提交
    var that = this;
    that.setData({
      isShow:false
    })
   
    if(that.data.keyword){
      
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      })
      if(e.type == 'submit'){
        that.setData({
            nextpage: 1,
            mp_list:[]
          }) 
      }
      wx.request({
        url: 'https://dev2.yeezan.com/api/addispatch/mp_keyword_search',
        data: {
          keyword: that.data.keyword,
          page: that.data.nextpage||1
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {      
          var list = res.data.data.list;
          wx.hideToast();
          if(list.length){
            that.setData({
              isdata: false,
              mp_list: that.data.mp_list.concat(list),
              isFormActive: true,
              nextpage: res.data.data.nextpage
            })
          }else{
            that.setData({
              isdata: true
            })
          }
        }
      })
      
    }else{
      return
    }
    
  },
  bindViewTap: function(e){
    console.log(e)
      wx.navigateTo({
        url: '../mpInfo/mpInfo?mp_weixin_id='+e.currentTarget.dataset.wxid
      })
  },

  onShareAppMessage: function () {
    return {
      title: '公众号画像',
      path: 'pages/mpSearch/mpSearch'
    }
  }
})