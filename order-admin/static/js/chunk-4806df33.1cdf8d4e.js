(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4806df33"],{"09f4":function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),Math.easeInOutQuad=function(e,t,n,a){return e/=a/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var a=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function o(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function i(e,t,n){var i=r(),s=e-i,l=20,u=0;t="undefined"===typeof t?500:t;var d=function e(){u+=l;var r=Math.easeInOutQuad(u,i,s,t);o(r),u<t?a(e):n&&"function"===typeof n&&n()};d()}},"634a":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-card",{staticStyle:{margin:"20px"}},[n("t-simple-form",{ref:"form",attrs:{"form-data":e.formData,"field-list":e.fieldList,"operator-list":e.operatorList,mode:"list"}}),n("t-table-list",{attrs:{"table-data":e.tableData,"table-columns":e.tableColumns,"table-op-columns":e.tableOpColumns},scopedSlots:e._u([{key:"url",fn:function(e){return[n("el-image",{staticStyle:{width:"100px",height:"60px"},attrs:{fit:"fit",src:e.scope.row.url}})]}}])}),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"pageSize",t)},pagination:e.queryOrderList}})],1)],1)},o=[],r=n("5530"),i=n("1da1"),s=(n("96cf"),n("86a6")),l=n("b551"),u=n("333d"),d=n("b775");function p(e){return Object(d["a"])({url:"/order/queryList",method:"get",params:e})}function c(e){return Object(d["a"])({url:"/order/add",method:"post",data:e})}function f(e){return Object(d["a"])({url:"/order/detail",method:"post",data:e})}function m(e){return Object(d["a"])({url:"/order/update",method:"post",data:e})}function h(e){return Object(d["a"])({url:"/order/delete",method:"post",data:e})}function v(e){return Object(d["a"])({url:"/order/status",method:"post",data:e})}var A={queryList:p,append:c,queryDetail:f,updateData:m,deleteData:h,status:v},w={name:"OrderManager",components:{TSimpleForm:s["a"],TTableList:l["a"],Pagination:u["a"]},props:{},data:function(){var e=this;return{formData:{},fieldList:[{type:"input",label:"订单编号",key:"order_no",props:{clearable:!0},events:{},display:!0}],operatorList:[{type:"primary",icon:"el-icon-refresh",label:"重 置",func:this.resetFields},{type:"primary",icon:"el-icon-circle-plus-outline",label:"添 加",func:function(){e.$router.push("/Order/add")}},{type:"primary",icon:"el-icon-search",label:"查 询",func:this.submitForm}],tableData:[],tableColumns:[{label:"订单编号",dataIndex:"order_no",props:{}},{label:"桌号",dataIndex:"table_no",props:{}},{label:"订单金额",dataIndex:"amount",props:{}},{label:"接单状态",dataIndex:"order_receive_status",props:{},render:function(e){var t={true:"已接单",false:"未接单"}[e.order_receive_status];return t}},{label:"结账状态",dataIndex:"order_payment_status",props:{},render:function(e){var t={true:"已支付",false:"未支付"}[e.order_payment_status];return t}},{label:"下单时间",dataIndex:"order_time",props:{}}],tableOpColumns:[{label:"操作列",dataIndex:"a1",props:{width:"200",fixed:"right"},btnGroup:[{type:"primary",icon:"el-icon-thumb",label:"接单",onClick:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(n){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.index,a=n.row,t.next=3,A.status({order_no:a.order_no,order_receive_status:!0});case 3:e.queryOrderList();case 4:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}(),display:function(e){e.index;var t=e.row;return!t.order_receive_status&&!t.order_payment_status}},{type:"success",icon:"el-icon-check",label:"结账",onClick:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(n){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.index,a=n.row,t.next=3,A.status({order_no:a.order_no,order_payment_status:!0});case 3:e.queryOrderList();case 4:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}(),display:function(e){e.index;var t=e.row;return t.order_receive_status&&!t.order_payment_status}}]}],total:0,listQuery:{page:0,pageSize:10}}},computed:{},watch:{},created:function(){},mounted:function(){this.queryOrderList()},beforeDestroy:function(){},methods:{submitForm:function(){var e=this;this.$refs["form"].$refs["form"].validate((function(t){t&&(console.log("最终数据",e.formData),e.queryOrderList())}))},resetFields:function(){return this.$refs["form"].$refs["form"].resetFields()},clearValidate:function(){return this.$refs["form"].$refs["form"].clearValidate()},queryOrderList:function(){var e=this;A.queryList(Object(r["a"])(Object(r["a"])({},this.listQuery),this.formData)).then((function(t){e.tableData=t.data.data.list,e.total=t.data.data.total}))},deleteOrder:function(e){var t=this;A.deleteData({id:e.id}).then((function(e){200===e.status&&t.queryOrderList()}))}}},M=w,y=n("2877"),g=Object(y["a"])(M,a,o,!1,null,"05764b8c",null);t["default"]=g.exports},"862d":function(e,t,n){"use strict";(function(t,n){e.exports=n()})(0,(function(){function e(e){var a=[];return e.AMapUI&&a.push(t(e.AMapUI)),e.Loca&&a.push(n(e.Loca)),Promise.all(a)}function t(e){return new Promise((function(t,n){var s=[];if(e.plugins)for(var l=0;l<e.plugins.length;l+=1)-1==o.AMapUI.plugins.indexOf(e.plugins[l])&&s.push(e.plugins[l]);if(r.AMapUI===a.failed)n("前次请求 AMapUI 失败");else if(r.AMapUI===a.notload){r.AMapUI=a.loading,o.AMapUI.version=e.version||o.AMapUI.version,l=o.AMapUI.version;var u=document.body||document.head,d=document.createElement("script");d.type="text/javascript",d.src="https://webapi.amap.com/ui/"+l+"/main.js",d.onerror=function(e){r.AMapUI=a.failed,n("请求 AMapUI 失败")},d.onload=function(){if(r.AMapUI=a.loaded,s.length)window.AMapUI.loadUI(s,(function(){for(var e=0,n=s.length;e<n;e++){var a=s[e].split("/").slice(-1)[0];window.AMapUI[a]=arguments[e]}for(t();i.AMapUI.length;)i.AMapUI.splice(0,1)[0]()}));else for(t();i.AMapUI.length;)i.AMapUI.splice(0,1)[0]()},u.appendChild(d)}else r.AMapUI===a.loaded?e.version&&e.version!==o.AMapUI.version?n("不允许多个版本 AMapUI 混用"):s.length?window.AMapUI.loadUI(s,(function(){for(var e=0,n=s.length;e<n;e++){var a=s[e].split("/").slice(-1)[0];window.AMapUI[a]=arguments[e]}t()})):t():e.version&&e.version!==o.AMapUI.version?n("不允许多个版本 AMapUI 混用"):i.AMapUI.push((function(e){e?n(e):s.length?window.AMapUI.loadUI(s,(function(){for(var e=0,n=s.length;e<n;e++){var a=s[e].split("/").slice(-1)[0];window.AMapUI[a]=arguments[e]}t()})):t()}))}))}function n(e){return new Promise((function(t,n){if(r.Loca===a.failed)n("前次请求 Loca 失败");else if(r.Loca===a.notload){r.Loca=a.loading,o.Loca.version=e.version||o.Loca.version;var s=o.Loca.version,l=o.AMap.version.startsWith("2"),u=s.startsWith("2");if(l&&!u||!l&&u)n("JSAPI 与 Loca 版本不对应！！");else{l=o.key,u=document.body||document.head;var d=document.createElement("script");d.type="text/javascript",d.src="https://webapi.amap.com/loca?v="+s+"&key="+l,d.onerror=function(e){r.Loca=a.failed,n("请求 AMapUI 失败")},d.onload=function(){for(r.Loca=a.loaded,t();i.Loca.length;)i.Loca.splice(0,1)[0]()},u.appendChild(d)}}else r.Loca===a.loaded?e.version&&e.version!==o.Loca.version?n("不允许多个版本 Loca 混用"):t():e.version&&e.version!==o.Loca.version?n("不允许多个版本 Loca 混用"):i.Loca.push((function(e){e?n(e):n()}))}))}if(!window)throw Error("AMap JSAPI can only be used in Browser.");var a;(function(e){e.notload="notload",e.loading="loading",e.loaded="loaded",e.failed="failed"})(a||(a={}));var o={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},r={AMap:a.notload,AMapUI:a.notload,Loca:a.notload},i={AMap:[],AMapUI:[],Loca:[]},s=[],l=function(e){"function"==typeof e&&(r.AMap===a.loaded?e(window.AMap):s.push(e))};return{load:function(t){return new Promise((function(n,i){if(r.AMap==a.failed)i("");else if(r.AMap==a.notload){var u=t.key,d=t.version,p=t.plugins;u?(window.AMap&&"lbs.amap.com"!==location.host&&i("禁止多种API加载方式混用"),o.key=u,o.AMap.version=d||o.AMap.version,o.AMap.plugins=p||o.AMap.plugins,r.AMap=a.loading,d=document.body||document.head,window.___onAPILoaded=function(o){if(delete window.___onAPILoaded,o)r.AMap=a.failed,i(o);else for(r.AMap=a.loaded,e(t).then((function(){n(window.AMap)}))["catch"](i);s.length;)s.splice(0,1)[0]()},p=document.createElement("script"),p.type="text/javascript",p.src="https://webapi.amap.com/maps?callback=___onAPILoaded&v="+o.AMap.version+"&key="+u+"&plugin="+o.AMap.plugins.join(","),p.onerror=function(e){r.AMap=a.failed,i(e)},d.appendChild(p)):i("请填写key")}else if(r.AMap==a.loaded)if(t.key&&t.key!==o.key)i("多个不一致的 key");else if(t.version&&t.version!==o.AMap.version)i("不允许多个版本 JSAPI 混用");else{if(u=[],t.plugins)for(d=0;d<t.plugins.length;d+=1)-1==o.AMap.plugins.indexOf(t.plugins[d])&&u.push(t.plugins[d]);u.length?window.AMap.plugin(u,(function(){e(t).then((function(){n(window.AMap)}))["catch"](i)})):e(t).then((function(){n(window.AMap)}))["catch"](i)}else if(t.key&&t.key!==o.key)i("多个不一致的 key");else if(t.version&&t.version!==o.AMap.version)i("不允许多个版本 JSAPI 混用");else{var c=[];if(t.plugins)for(d=0;d<t.plugins.length;d+=1)-1==o.AMap.plugins.indexOf(t.plugins[d])&&c.push(t.plugins[d]);l((function(){c.length?window.AMap.plugin(c,(function(){e(t).then((function(){n(window.AMap)}))["catch"](i)})):e(t).then((function(){n(window.AMap)}))["catch"](i)}))}}))},reset:function(){delete window.AMap,delete window.AMapUI,delete window.Loca,o={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},r={AMap:a.notload,AMapUI:a.notload,Loca:a.notload},i={AMap:[],AMapUI:[],Loca:[]}}}}))}}]);