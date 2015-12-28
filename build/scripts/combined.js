function addCommas(e){e+="";for(var a=e.split("."),t=a[0],i=a.length>1?"."+a[1]:"",o=/(\d+)(\d{3})/;o.test(t);)t=t.replace(o,"$1,$2");return t+i}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,a){return 0==a?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}!function(e){e.fn.confirmModal=function(a){function t(e,a){}var i=e("body"),o={confirmTitle:"Please confirm",confirmMessage:"Are you sure you want to perform this action ?",confirmOk:"Yes",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:t,confirmDismiss:!0,confirmAutoOpen:!1},s=e.extend(o,a),r='<div class="modal fade" id="#modalId#" tabindex="-1" role="dialog" aria-labelledby="#AriaLabel#" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>#Heading#</h3></div><div class="modal-body"><p>#Body#</p></div><div class="modal-footer">#buttonTemplate#</div></div></div></div>';return this.each(function(a){var t=e(this),o=t.data(),n=(e.extend(s,o),"confirmModal"+Math.floor(1e9*Math.random())),l=r,c='<button class="btn btn-default" data-dismiss="modal">#Cancel#</button><button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button>';"ltr"==s.confirmDirection&&(c='<button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button><button class="btn btn-default" data-dismiss="modal">#Cancel#</button>');var d=s.confirmTitle;"function"==typeof s.confirmTitle&&(d=s.confirmTitle.call(this));var p=s.confirmMessage;"function"==typeof s.confirmMessage&&(p=s.confirmMessage.call(this)),l=l.replace("#buttonTemplate#",c).replace("#modalId#",n).replace("#AriaLabel#",d).replace("#Heading#",d).replace("#Body#",p).replace("#Ok#",s.confirmOk).replace("#Cancel#",s.confirmCancel).replace("#Style#",s.confirmStyle),i.append(l);var m=e("#"+n);t.on("click",function(e){e.preventDefault(),m.modal("show")}),e('button[data-dismiss="ok"]',m).on("click",function(e){s.confirmDismiss&&m.modal("hide"),s.confirmCallback(t,m)}),s.confirmAutoOpen&&m.modal("show")})}}(jQuery);var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,a,t){allLayers=[]}),function(){"use strict"}();var wlera=wlera||{bookmarks:[{id:"ottawa-nwr",name:"Ottawa NWR",userCreated:!1,spatialReference:{wkid:102100},xmax:-9253627.864758775,xmin:-9268896.161158718,ymax:5109457.058192252,ymin:5099759.110228584}],globals:{}},map,zonalStatsGP,maxLegendHeight,maxLegendDivHeight,printCount=0,storageName="esrijsapi_mapmarks",bmToDelete="",mapLayers=[],mapLayerIds=[];require(["esri/map","esri/dijit/OverviewMap","esri/SnappingManager","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/Bookmarks","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/Popup","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","esri/tasks/GeometryService","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/tasks/LegendLayer","esri/SpatialReference","esri/geometry/Extent","esri/config","esri/urlUtils","esri/request","dojo/_base/array","dojo/_base/lang","dojo/keys","dojo/cookie","dojo/has","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/on","dojo/domReady!"],function(e,a,t,i,o,s,r,n,l,c,d,p,m,u,h,g,y,f,b,v,L,k,w,S,x,M,C,T,D,I,E,O,A,R){function z(){if(Q){var e=[];M.forEach(wlera.bookmarks,function(a){a.userCreated===!1&&e.push(a.id)});for(var a=wlera.bookmarks.slice(),t=0;t<a.length;t++){var i=a[t];-1!==e.indexOf(i.id)&&(a.splice(t,1),t--)}console.log(a);var o=JSON.stringify(a);window.localStorage.setItem(storageName,o)}else{var s=7;D(storageName,dojo.toJson(wlera.bookmarks),{expires:s})}}function F(){Q?window.localStorage.removeItem(storageName):dojo.cookie(storageName,null,{expires:-1});var e=[];M.forEach(wlera.bookmarks,function(a){a.userCreated===!0&&e.push(a.id)});for(var a=0;a<wlera.bookmarks.length;a++){var t=wlera.bookmarks[a];-1!==e.indexOf(t.id)&&(wlera.bookmarks.splice(a,1),a--)}M.forEach(e,function(e){$("#"+e).remove()})}function P(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}function G(){$("#shareModal").modal("show");var e=(map.extent,"?xmax="+map.extent.xmax.toString()+"&xmin="+map.extent.xmin.toString()+"&ymax="+map.extent.ymax.toString()+"&ymin="+map.extent.ymin.toString()),a="%3Fxmax="+map.extent.xmax.toString()+"%26xmin="+map.extent.xmin.toString()+"%26ymax="+map.extent.ymax.toString()+"%26ymin="+map.extent.ymin.toString(),t="http://54.164.126.49/WLERA/",i=t+e,o=t+a;console.log("Share URL is:"+i),$("#showFullLinkButton").click(function(){$("#fullShareURL").html('<span id="fullLinkLabel" class="label label-default"><span class="glyphicon glyphicon-link"></span> Full link</span><br><textarea style="margin-bottom: 10px; cursor: text" class="form-control"  rows="3" readonly>'+i+"</textarea>")}),$("#showShortLinkButton").click(function(){$.ajax({dataType:"json",type:"GET",url:"https://api-ssl.bitly.com/v3/shorten?access_token=e1a16076cc8470c65419920156e0ae2c4f77850f&longUrl="+o,headers:{Accept:"*/*"},success:function(e){var a=e.data.url;$("#bitlyURL").html('<span class="label label-default"><span class="glyphicon glyphicon-link"></span> Bitly link</span><code>'+a+"</code>")},error:function(e){$("#bitlyURL").html('<i class="fa fa-exclamation-triangle"></i> An error occurred retrieving shortened Bitly URL')}})})}function B(){$("#printModal").modal("show")}function j(){$("#bookmarkModal").modal("show")}function N(){1===E.byId("chkExtent").checked?ce.activeGeocoder.searchExtent=map.extent:ce.activeGeocoder.searchExtent=null}function U(){N();var e=ce.find();e.then(function(e){W(e)}),$("#geosearchModal").modal("hide")}function V(e){Y();var a=e.graphic?e.graphic:e.result.feature;a.setSymbol(de),q(e.result,a.symbol)}function W(e){if(e=e.results,e.length>0){Y();for(var a=de,t=0;t<e.length;t++)q(e[t],a);_(e)}}function H(e){var a=e.indexOf(",");return a>0&&(e=e.substring(0,a)),e}function q(e,a){var t,i,o,s,r={};o=e.feature.geometry,r.address=e.name,r.score=e.feature.attributes.Score,t={address:H(r.address),score:r.score,lat:o.getLatitude().toFixed(2),lon:o.getLongitude().toFixed(2)},i=new d({title:"{address}",description:"Latitude: {lat}<br/>Longitude: {lon}"}),s=new p(o,a,t,i),map.graphics.add(s)}function _(e){for(var a=new m(map.spatialReference),t=0;t<e.length;t++)a.addPoint(e[t].feature.geometry);map.setExtent(a.getExtent().expand(2))}function Y(){map.infoWindow.hide(),map.graphics.clear()}function X(e,a,t,i,o){return new u({angle:0,xoffset:a,yoffset:t,type:"esriPMS",url:e,contentType:"image/png",width:i,height:o})}function J(){function e(e){printCount++;var a=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+r+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(a),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function a(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem"),$("#printExecuteButton").button("reset")}var t=new f;t.map=map;var i=new b;i.exportOptions={width:500,height:400,dpi:300},i.format="PDF",i.layout="Letter ANSI A Landscape",i.preserveScale=!1;var o=new v;o.layerId="normalized",o.subLayerIds=[0];var s=$("#printTitle").val();""===s?i.layoutOptions={titleText:"Western Lake Erie Restoration Assessment",authorText:"Western Lake Erie Restoration Assessment (WLERA)",copyrightText:"This page was produced by the WLERA web application at [insert app URL]",legendLayers:[o]}:i.layoutOptions={titleText:s,authorText:"Western Lake Erie Restoration Assessment (WLERA)",copyrightText:"This page was produced by the WLERA web application at [insert app URL]",legendLayers:[o]};var r=i.layoutOptions.titleText;t.template=i;var n=new y("http://wlera.wimcloud.usgs.gov:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");n.execute(t,e,a)}function Z(){var e=$("#bookmarkTitle"),a=map.extent.toJson(),t=e.val();if(t.length>0){var i=t.toLowerCase().replace(/ /g,"-");a.name=t,a.id=i,a.userCreated=!0,wlera.bookmarks.push(a);var o=i+"_delete",s=$('<tr id="'+i+'"><td  class="bookmarkTitle td-bm">'+t+'</td><td class="text-right text-nowrap"> <button id="'+o+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" > <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(s),$("#"+o).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+i).remove();for(var e=0;e<wlera.bookmarks.length;e++){var a=wlera.bookmarks[e];-1!==i.indexOf(a.id)&&wlera.bookmarks.splice(e,1)}z()}}),e.val(""),z(),$("#bmAlert").hide(),$("#bookmarkModal").modal("hide")}else $("#bmAlert").show()}function K(){var e=esri.urlToObject(document.location.href);if(e.query){var a=new k(parseFloat(e.query.xmin),parseFloat(e.query.ymin),parseFloat(e.query.xmax),parseFloat(e.query.ymax),new L({wkid:102100}));map.setExtent(a);var t=document.location.href,i=t.substring(0,t.indexOf("?"));history.pushState(null,"",i)}}var Q=P(),ee=new c({},A.create("div"));O.add(ee.domNode,"dark"),map=new e("mapDiv",{basemap:"gray",center:[-82.745,41.699],spatialReference:26917,zoom:10,logo:!1,infoWindow:ee}),w.defaults.geometryService=new g("http://54.152.244.240:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer"),esri.config.defaults.io.corsEnabledServers.push("http://52.0.108.106:6080/");const ae=new i({map:map},"homeButton");ae.startup();const te=new o({map:map},"locateButton");te.startup();const ie=new s({map:map,advancedLocationUnits:!0},E.byId("measurementDiv"));ie.startup();var oe;if(oe=Q?window.localStorage.getItem(storageName):dojo.cookie(storageName),oe&&"null"!==oe&&oe.length>4){console.log("cookie: ",oe,oe.length);var se=dojo.fromJson(oe);M.forEach(se,function(e){wlera.bookmarks.push(e)})}else console.log("no stored bookmarks...");const re=new a({map:map,attachTo:"bottom-right"});re.startup();var ne=$('<tr class="esriMeasurementTableRow" id="utmCoords"><td><span>UTM17</span></td><td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">UTM X</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">UTM Y</span></td></tr>');$(".esriMeasurementResultTable").append(ne),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#shareNavButton").click(function(){G()}),$("#printNavButton").click(function(){B()}),$("#addBookmarkButton").click(function(){j()}),$("#printExecuteButton").click(function(){$(this).button("loading"),J()}),$("#bookmarkSaveButton").click(function(){Z()}),$("#bookmarkDismissButton").click(function(){$("#bmAlert").hide()}),R(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var a=h.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(a.y.toFixed(4)),$("#longitude").html(a.x.toFixed(4)),K()}),R(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),R(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!==e.mapPoint){var a=h.webMercatorToGeographic(e.mapPoint);$("#latitude").html(a.y.toFixed(4)),$("#longitude").html(a.x.toFixed(4))}}),R(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=h.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(4)),$("#longitude").html(e.x.toFixed(4))});var le=new n("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer",{visible:!1});map.addLayer(le),R(E.byId("btnStreets"),"click",function(){map.setBasemap("streets"),le.setVisibility(!1)}),R(E.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),le.setVisibility(!1)}),R(E.byId("btnGray"),"click",function(){map.setBasemap("gray"),le.setVisibility(!1)}),R(E.byId("btnOSM"),"click",function(){map.setBasemap("osm"),le.setVisibility(!1)}),R(E.byId("btnTopo"),"click",function(){map.setBasemap("topo"),le.setVisibility(!1)}),R(E.byId("btnNatlMap"),"click",function(){le.setVisibility(!0)});var ce=new l({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");ce.startup(),ce.on("select",V),ce.on("findResults",W),ce.on("clear",Y),R(ce.inputNode,"keydown",function(e){13==e.keyCode&&N()});var de=X("images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),R(E.byId("btnGeosearch"),"click",U),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function a(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){a()}),$("#html").niceScroll();var t=$("#sidebar");t.niceScroll(),t.scroll(function(){$("#sidebar").getNiceScroll().resize()});var i=$("#legendCollapse"),o=$("#legendElement");$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),o.css("max-height",maxLegendHeight),i.on("shown.bs.collapse",function(){$("#legendLabel").show(),maxLegendHeight=.9*$("#mapDiv").height(),o.css("max-height",maxLegendHeight),maxLegendDivHeight=o.height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),i.on("hide.bs.collapse",function(){o.css("height","initial"),window.innerWidth<=767&&$("#legendLabel").hide()});var s=$("#measurementCollapse");s.on("shown.bs.collapse",function(){$("#measureLabel").show()}),s.on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()}),$(function(){$("[data-hide]").on("click",function(){$("."+$(this).attr("data-hide")).hide()})}),wlera.bookmarks.forEach(function(e){if(e.userCreated===!1){var a=$('<tr id="'+e.id+'"><td class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"></td> </tr>');$("#bookmarkList").append(a)}else{var t=e.id+"_delete",i=$('<tr id="'+e.id+'"><td  class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"> <button id="'+t+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" title="Delete bookmark"> <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(i),$("#"+t).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+e.id).remove();for(var a=0;a<wlera.bookmarks.length;a++){var t=wlera.bookmarks[a];-1!==e.id.indexOf(t.id)&&wlera.bookmarks.splice(a,1)}z()}})}}),$("body").on("click",".td-bm",function(){var e=this.parentNode.id;wlera.bookmarks.forEach(function(a){if(a.id==e){var t=new k(a.xmin,a.ymin,a.xmax,a.ymax,new L(a.spatialReference));map.setExtent(t)}})}),$('[data-toggle="tooltip"]').tooltip({delay:{show:500,hide:0}}),$("#removeBookmarksButton").confirmModal({confirmTitle:"Delete user bookmarks from memory",confirmMessage:"This action will remove all user-defined bookmarks from local memory on your computer or device. Would you like to continue?",confirmOk:"Yes, delete bookmarks",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:F,confirmDismiss:!0,confirmAutoOpen:!1})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/Geoprocessor","esri/tasks/FeatureSet","esri/tasks/GeometryService","esri/tasks/ProjectParameters","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/toolbars/draw","esri/SpatialReference","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/layers/LabelLayer","esri/symbols/TextSymbol","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/renderers/SimpleRenderer","esri/Color","esri/dijit/Popup","esri/dijit/PopupTemplate","dojo/query","dojo/dom"],function(e,a,t,i,o,s,r,n,l,c,d,m,u,h,g,y,f,b,v,L,k,w,S,x,M){function C(e){$("#calculateStats").button("reset");var a=e.results[0].value.features[0].attributes,t=$("#zonalStatsTable");t.html("<tr><th>Mean </th><th>Standard Deviation</th><th>Max</th></tr>"),t.append("<tr><td>"+a.MEAN.toFixed(4)+"</td><td>"+a.STD.toFixed(3)+"</td><td>"+a.MAX+"</td></tr>"),$("#zonalStatsModal").modal("show")}var D,E,O,A,z,F,P=[],G=!1,B=!1,j=!1,N=!1,U={inputPoly:null},V=[];const W="http://wlera.wimcloud.usgs.gov:6080/arcgis/rest/services/WLERA/",H=new s("http://wlera.wimcloud.usgs.gov:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer"),q=new h(W+"restorationModel/MapServer",{id:"normalized",visible:!0});q.setVisibleLayers([0]),mapLayers.push(q),mapLayerIds.push(q.id),P.push({layer:q,title:" "}),q.inLegendLayers=!0;const _=new h(W+"hydroCondition/MapServer",{id:"dikedAreas",visible:!1});_.setVisibleLayers([4]),mapLayers.push(_),mapLayerIds.push(_.id),_.inLegendLayers=!1;const Y=new h(W+"hydroCondition/MapServer",{id:"dikes",visible:!1,minScale:1e5});Y.setVisibleLayers([3]),mapLayers.push(Y),mapLayerIds.push(Y.id),Y.inLegendLayers=!1;const X=new h(W+"hydroCondition/MapServer",{id:"degFlowlines",visible:!1,minScale:1e5});X.setVisibleLayers([2]),mapLayers.push(X),mapLayerIds.push(X.id),X.inLegendLayers=!1;const J=new h(W+"hydroCondition/MapServer",{id:"culverts",visible:!1,minScale:1e5});J.setVisibleLayers([1]),mapLayers.push(J),mapLayerIds.push(J.id),J.inLegendLayers=!1;const Z=new h(W+"hydroCondition/MapServer",{id:"dikeBreaks",visible:!1,minScale:1e5});Z.setVisibleLayers([0]),mapLayers.push(Z),mapLayerIds.push(Z.id),Z.inLegendLayers=!1;const K=new h(W+"reference/MapServer",{id:"parcelsDyn",visible:!0,minScale:1e5});K.setVisibleLayers([1]),mapLayers.push(K),mapLayerIds.push(K.id),K.inLegendLayers=!1;const Q=new g(W+"reference/MapServer/1",{id:"parcelsFeat",visible:!0,minScale:15e4,mode:g.MODE_SELECTION,outFields:["*"]});mapLayers.push(Q),mapLayerIds.push(Q.id),Q.inLegendLayers=!1;var ee=new t;ee.outSpatialReference=map.spatialReference;var ae=new b(b.STYLE_SOLID,new v(v.STYLE_SOLID,new k([255,0,0]),2),new k([255,255,0,.5]));Q.setSelectionSymbol(ae),map.disableClickRecenter(),map.on("click",function(e){ee.geometry=e.mapPoint,ee.outFields=["*"],ee.returnGeometry=!0,G&&Q.selectFeatures(ee,g.SELECTION_ADD),e.shiftKey&&Q.selectFeatures(ee,g.SELECTION_SUBTRACT)}),Q.on("selection-complete",function(){$("#displayStats").prop("disabled",!1)}),D=new d(map);var te=$("#drawCustom");te.click(function(){map.graphics.remove(A),j?(D.finishDrawing(),D.deactivate(),te.removeClass("active"),te.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),j=!1):j||(te.addClass("active"),te.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop drawing'),G=!1,D.activate(d.POLYGON),j=!0)});var oe=$("#selectParcels");oe.click(function(){te.removeClass("active"),te.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),j=!1,D.deactivate(),G?(oe.removeClass("active"),oe.html('<span class="ti-plus"></span>&nbsp;&nbsp;Click'),map.setMapCursor("auto"),G=!1):G||(oe.addClass("active"),oe.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop selecting'),map.setMapCursor("crosshair"),B=!1,G=!0)}),$("#clearSelection").click(function(){Q.clearSelection(),map.graphics.remove(A),map.graphics.remove(F),$("#displayStats").prop("disabled",!0),$("#calculateStats").prop("disabled",!0),U={inputPoly:null}}),zonalStatsGP=new i("http://wlera.wimcloud.usgs.gov:6080/arcgis/rest/services/WLERA/zonalStats/GPServer/WLERAZonalStats"),zonalStatsGP.setOutputSpatialReference({wkid:102100}),zonalStatsGP.on("execute-complete",C),$("#calculateStats").click(function(){$(this).button("loading"),zonalStatsGP.execute(U)}),R(D,"DrawEnd",function(e){O=new b(b.STYLE_SOLID,new v(v.STYLE_SOLID,new k([255,0,0]),2),new k([255,255,0,.5])),A=new p(e,O),map.graphics.add(A),D.deactivate(),te.removeClass("active"),te.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),j=!1,V.push(A);var a=new o;a.features=V,U={inputPoly:a},$("#calculateStats").prop("disabled",!1)}),E=new d(map);var se=$("#selectParcelsDraw");se.click(function(){map.graphics.remove(F),N?(E.finishDrawing(),E.deactivate(),se.removeClass("active"),se.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),N=!1):N||(se.addClass("active"),se.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop drawing'),G=!1,E.activate(d.POLYGON),N=!0)}),R(E,"DrawEnd",function(e){z=new b(b.STYLE_SOLID,new v(v.STYLE_SOLID,new k([255,0,0]),2),new k([255,255,0,.5])),F=new p(e,z),map.graphics.add(F),E.deactivate(),se.removeClass("active"),se.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),j=!1,ee.geometry=e,Q.selectFeatures(ee,g.SELECTION_ADD)}),$("#displayStats").click(function(){$("#zonalStatsTable").html("<tr><th>Parcel ID</th><th>Hectares</th><th>Mean </th><th>Standard Deviation</th><th>Max</th></tr>"),map.getLayer("parcelsFeat").getSelectedFeatures().length>0&&$.each(map.getLayer("parcelsFeat").getSelectedFeatures(),function(){$("#zonalStatsTable").append("<tr><td>"+this.attributes.P_ID+"</td><td>"+this.attributes.Hec.toFixed(3)+"</td><td>"+this.attributes.MEAN.toFixed(4)+"</td><td>"+this.attributes.STD.toFixed(3)+"</td><td>"+this.attributes.stat_MAX+"</td></tr>"),$("#zonalStatsModal").modal("show")})});const re=new h(W+"reference/MapServer",{id:"studyArea",visible:!0});re.setVisibleLayers([0]),mapLayers.push(re),mapLayerIds.push(re.id),P.push({layer:re,title:" "}),re.inLegendLayers=!0;const ne=new h(W+"reference/MapServer",{id:"funcWetlands",visible:!0,minScale:1e5,maxScale:1e4});ne.setVisibleLayers([3]),mapLayers.push(ne),mapLayerIds.push(ne.id),P.push({layer:ne,title:" "}),ne.inLegendLayers=!0;const le=new h(W+"reference/MapServer",{id:"GLRIWetlands",visible:!0,minScale:1e5,maxScale:1e4});le.setVisibleLayers([4]),mapLayers.push(le),P.push({layer:le,title:" "}),le.inLegendLayers=!0;var ce=new S({title:"U.S. ACOE Aerial Photo",mediaInfos:[{title:"",caption:"Date & Time taken: {date_}",type:"image",value:{sourceURL:"{imageUrl}",linkURL:"{imageUrl}"}}]}),de=new g(W+"reference/MapServer/2",{id:"aerials",layerID:"aerials",visible:!0,minScale:1e5,mode:g.MODE_ONDEMAND,outFields:["*"],infoTemplate:ce});de.id="aerials",mapLayers.push(de),mapLayerIds.push(de.id),P.push({layer:de,title:"US Army Corps of Engineers Aerial Photos "}),de.inLegendLayers=!0;const pe=new h(W+"restorationModel/MapServer",{id:"landuse",visible:!1});pe.setVisibleLayers([8]),mapLayers.push(pe),mapLayerIds.push(pe.id),pe.inLegendLayers=!1;const me=new h(W+"restorationModel/MapServer",{id:"imperviousSurfaces",visible:!1});me.setVisibleLayers([7]),mapLayers.push(me),mapLayerIds.push(me.id),me.inLegendLayers=!1;const ue=new h(W+"restorationModel/MapServer",{id:"conservedLands",visible:!1});ue.setVisibleLayers([6]),mapLayers.push(ue),mapLayerIds.push(ue.id),ue.inLegendLayers=!1;const he=new h(W+"restorationModel/MapServer",{id:"flowline",visible:!1});he.setVisibleLayers([5]),mapLayers.push(he),mapLayerIds.push(he.id),he.inLegendLayers=!1;const ge=new h(W+"restorationModel/MapServer",{id:"wetsoils",visible:!1});ge.setVisibleLayers([4]),mapLayers.push(ge),mapLayerIds.push(ge.id),ge.inLegendLayers=!1;const ye=new h(W+"restorationModel/MapServer",{id:"hydroperiod",visible:!1});ye.setVisibleLayers([3]),mapLayers.push(ye),mapLayerIds.push(ye.id),ye.inLegendLayers=!1;const fe=new h(W+"restorationModel/MapServer",{id:"waterMask",visible:!0});fe.setVisibleLayers([2]),mapLayers.push(fe),mapLayerIds.push(fe.id),fe.inLegendLayers=!1,map.addLayers(mapLayers);var be=map.enableSnapping({snapKey:I("mac")?T.META:T.CTRL}),ve=[{layer:Q}];be.setLayerInfos(ve);var Le=new r,ke=new m(26917);ie.on("measure-end",function(e){Le.geometries=[e.geometry],Le.outSR=ke;var a=-1*e.geometry.x;84>a&&a>78?H.project(Le,function(e){var a=e[0];console.log(a);var t=a.x.toFixed(0),i=a.y.toFixed(0);$("#utmX").html(t),$("#utmY").html(i)}):($("#utmX").html('<span class="label label-danger">outside zone</span>'),$("#utmY").html('<span class="label label-danger">outside zone</span>'))});for(var we=0;we<map.layerIds.length;we++){var Se=map.getLayer(map.layerIds[we]);Se.visible&&($("#"+Se.id).button("toggle"),$("#"+Se.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}for(var we=0;we<map.graphicsLayerIds.length;we++){var Se=map.getLayer(map.graphicsLayerIds[we]);Se.visible&&($("#"+Se.id).button("toggle"),$("#"+Se.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}$("button.lyrTog").click(function(e){$(this).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$(this).button("toggle"),e.preventDefault(),e.stopPropagation();var a=map.getLayer($(this).attr("id"));a.visible?a.setVisibility(!1):(a.setVisibility(!0),a.inLegendLayers===!1&&(P.push({layer:a,title:" "}),a.inLegendLayers=!0,$e.refresh()))}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("hide.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down");var a=$(this).attr("id")+"Buttons";$("#"+a).button("toggle")}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("show.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down")}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var a=this.parentNode.id,t=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(t),$(".zoomDialog").css("left",event.clientX-80),$(".zoomDialog").css("top",event.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var t=map.getLayer(a).minScale;map.setScale(t)}),$("#zoomcenter").click(function(e){var a=new c(-83.208084,41.628103,new m({wkid:4326}));map.centerAt(a)}),$("#zoomextent").click(function(e){var t=map.getLayer(a).fullExtent,i=new r;i.outSR=new m(102100),i.geometries=[t],H.project(i,function(e){var a=e[0];map.setExtent(a,new m({wkid:102100}))})})}),$(".opacity").hover(function(){$(".opacitySlider").remove();var e=this.parentNode.id,a=map.getLayer(e).opacity,t=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+a+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(t);var i=$("#slider");i[0].value=100*a,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-5),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),i.change(function(a){var t=i[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(e).setOpacity(t)})});var $e=new e({map:map,layerInfos:P},"legendDiv");$e.startup()})});