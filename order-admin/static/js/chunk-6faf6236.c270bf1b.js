(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6faf6236"],{"862d":function(e,a,n){"use strict";(function(a,n){e.exports=n()})(0,(function(){function e(e){var o=[];return e.AMapUI&&o.push(a(e.AMapUI)),e.Loca&&o.push(n(e.Loca)),Promise.all(o)}function a(e){return new Promise((function(a,n){var s=[];if(e.plugins)for(var p=0;p<e.plugins.length;p+=1)-1==t.AMapUI.plugins.indexOf(e.plugins[p])&&s.push(e.plugins[p]);if(i.AMapUI===o.failed)n("前次请求 AMapUI 失败");else if(i.AMapUI===o.notload){i.AMapUI=o.loading,t.AMapUI.version=e.version||t.AMapUI.version,p=t.AMapUI.version;var l=document.body||document.head,c=document.createElement("script");c.type="text/javascript",c.src="https://webapi.amap.com/ui/"+p+"/main.js",c.onerror=function(e){i.AMapUI=o.failed,n("请求 AMapUI 失败")},c.onload=function(){if(i.AMapUI=o.loaded,s.length)window.AMapUI.loadUI(s,(function(){for(var e=0,n=s.length;e<n;e++){var o=s[e].split("/").slice(-1)[0];window.AMapUI[o]=arguments[e]}for(a();r.AMapUI.length;)r.AMapUI.splice(0,1)[0]()}));else for(a();r.AMapUI.length;)r.AMapUI.splice(0,1)[0]()},l.appendChild(c)}else i.AMapUI===o.loaded?e.version&&e.version!==t.AMapUI.version?n("不允许多个版本 AMapUI 混用"):s.length?window.AMapUI.loadUI(s,(function(){for(var e=0,n=s.length;e<n;e++){var o=s[e].split("/").slice(-1)[0];window.AMapUI[o]=arguments[e]}a()})):a():e.version&&e.version!==t.AMapUI.version?n("不允许多个版本 AMapUI 混用"):r.AMapUI.push((function(e){e?n(e):s.length?window.AMapUI.loadUI(s,(function(){for(var e=0,n=s.length;e<n;e++){var o=s[e].split("/").slice(-1)[0];window.AMapUI[o]=arguments[e]}a()})):a()}))}))}function n(e){return new Promise((function(a,n){if(i.Loca===o.failed)n("前次请求 Loca 失败");else if(i.Loca===o.notload){i.Loca=o.loading,t.Loca.version=e.version||t.Loca.version;var s=t.Loca.version,p=t.AMap.version.startsWith("2"),l=s.startsWith("2");if(p&&!l||!p&&l)n("JSAPI 与 Loca 版本不对应！！");else{p=t.key,l=document.body||document.head;var c=document.createElement("script");c.type="text/javascript",c.src="https://webapi.amap.com/loca?v="+s+"&key="+p,c.onerror=function(e){i.Loca=o.failed,n("请求 AMapUI 失败")},c.onload=function(){for(i.Loca=o.loaded,a();r.Loca.length;)r.Loca.splice(0,1)[0]()},l.appendChild(c)}}else i.Loca===o.loaded?e.version&&e.version!==t.Loca.version?n("不允许多个版本 Loca 混用"):a():e.version&&e.version!==t.Loca.version?n("不允许多个版本 Loca 混用"):r.Loca.push((function(e){e?n(e):n()}))}))}if(!window)throw Error("AMap JSAPI can only be used in Browser.");var o;(function(e){e.notload="notload",e.loading="loading",e.loaded="loaded",e.failed="failed"})(o||(o={}));var t={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},i={AMap:o.notload,AMapUI:o.notload,Loca:o.notload},r={AMap:[],AMapUI:[],Loca:[]},s=[],p=function(e){"function"==typeof e&&(i.AMap===o.loaded?e(window.AMap):s.push(e))};return{load:function(a){return new Promise((function(n,r){if(i.AMap==o.failed)r("");else if(i.AMap==o.notload){var l=a.key,c=a.version,u=a.plugins;l?(window.AMap&&"lbs.amap.com"!==location.host&&r("禁止多种API加载方式混用"),t.key=l,t.AMap.version=c||t.AMap.version,t.AMap.plugins=u||t.AMap.plugins,i.AMap=o.loading,c=document.body||document.head,window.___onAPILoaded=function(t){if(delete window.___onAPILoaded,t)i.AMap=o.failed,r(t);else for(i.AMap=o.loaded,e(a).then((function(){n(window.AMap)}))["catch"](r);s.length;)s.splice(0,1)[0]()},u=document.createElement("script"),u.type="text/javascript",u.src="https://webapi.amap.com/maps?callback=___onAPILoaded&v="+t.AMap.version+"&key="+l+"&plugin="+t.AMap.plugins.join(","),u.onerror=function(e){i.AMap=o.failed,r(e)},c.appendChild(u)):r("请填写key")}else if(i.AMap==o.loaded)if(a.key&&a.key!==t.key)r("多个不一致的 key");else if(a.version&&a.version!==t.AMap.version)r("不允许多个版本 JSAPI 混用");else{if(l=[],a.plugins)for(c=0;c<a.plugins.length;c+=1)-1==t.AMap.plugins.indexOf(a.plugins[c])&&l.push(a.plugins[c]);l.length?window.AMap.plugin(l,(function(){e(a).then((function(){n(window.AMap)}))["catch"](r)})):e(a).then((function(){n(window.AMap)}))["catch"](r)}else if(a.key&&a.key!==t.key)r("多个不一致的 key");else if(a.version&&a.version!==t.AMap.version)r("不允许多个版本 JSAPI 混用");else{var d=[];if(a.plugins)for(c=0;c<a.plugins.length;c+=1)-1==t.AMap.plugins.indexOf(a.plugins[c])&&d.push(a.plugins[c]);p((function(){d.length?window.AMap.plugin(d,(function(){e(a).then((function(){n(window.AMap)}))["catch"](r)})):e(a).then((function(){n(window.AMap)}))["catch"](r)}))}}))},reset:function(){delete window.AMap,delete window.AMapUI,delete window.Loca,t={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},i={AMap:o.notload,AMapUI:o.notload,Loca:o.notload},r={AMap:[],AMapUI:[],Loca:[]}}}}))},b050:function(e,a,n){"use strict";var o=n("b775");function t(e){return Object(o["a"])({url:"/category/queryList",method:"get",params:e})}function i(e){return Object(o["a"])({url:"/category/add",method:"post",data:e})}function r(e){return Object(o["a"])({url:"/category/detail",method:"post",data:e})}function s(e){return Object(o["a"])({url:"/category/update",method:"post",data:e})}function p(e){return Object(o["a"])({url:"/category/delete",method:"post",data:e})}a["a"]={queryList:t,append:i,queryDetail:r,updateData:s,deleteData:p}},fff0:function(e,a,n){"use strict";n.r(a);var o=function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("div",[n("el-card",{staticStyle:{margin:"20px"}},[n("t-simple-form",{ref:"form",attrs:{"form-data":e.formData,"field-list":e.fieldList,"operator-list":e.operatorList,rules:e.rules}})],1)],1)},t=[],i=(n("caad"),n("2532"),n("86a6")),r=n("b050"),s={name:"FormCu",components:{TSimpleForm:i["a"]},props:{},data:function(){var e=this;return{formData:{},fieldList:[{type:"input",key:"c_name",label:"种类名称",props:{clearable:!0}}],operatorList:[{type:"",label:"返 回",func:function(){e.$router.push({name:"categoryList"})}},{type:"primary",label:"提 交",func:this.submitForm}],rules:{}}},computed:{formComp:function(){return this.$refs["form"].$refs["form"]}},watch:{},created:function(){},mounted:function(){this.$route.path.includes("edit")&&this.queryCategoryDetail()},beforeDestroy:function(){},methods:{queryCategoryDetail:function(){var e=this;r["a"].queryDetail({id:this.$route.query.id}).then((function(a){e.formData=a.data.data[0]}))},submitForm:function(){var e=this;this.formComp.validate((function(a){a&&(e.$route.path.includes("edit")?e.updateCategory():e.addCategory())}))},addCategory:function(){var e=this;r["a"].append(this.formData).then((function(a){200===a.status&&e.$router.push({name:"categoryList"})}))},updateCategory:function(){var e=this;r["a"].updateData(this.formData).then((function(a){200===a.status&&e.$router.push({name:"categoryList"})}))},resetFields:function(){return this.formComp.resetFields()},clearValidate:function(){return this.formComp.clearValidate()}}},p=s,l=n("2877"),c=Object(l["a"])(p,o,t,!1,null,"4e952e30",null);a["default"]=c.exports}}]);