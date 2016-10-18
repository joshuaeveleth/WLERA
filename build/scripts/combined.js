function addCommas(e){e+="";for(var a=e.split("."),t=a[0],i=a.length>1?"."+a[1]:"",o=/(\d+)(\d{3})/;o.test(t);)t=t.replace(o,"$1,$2");return t+i}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,a){return 0==a?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}!function(e){e.fn.confirmModal=function(a){function t(e,a){}var i=e("body"),o={confirmTitle:"Please confirm",confirmMessage:"Are you sure you want to perform this action ?",confirmOk:"Yes",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:t,confirmDismiss:!0,confirmAutoOpen:!1},s=e.extend(o,a),r='<div class="modal fade" id="#modalId#" tabindex="-1" role="dialog" aria-labelledby="#AriaLabel#" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>#Heading#</h3></div><div class="modal-body"><p>#Body#</p></div><div class="modal-footer">#buttonTemplate#</div></div></div></div>';return this.each(function(a){var t=e(this),o=t.data(),n=(e.extend(s,o),"confirmModal"+Math.floor(1e9*Math.random())),l=r,c='<button class="btn btn-default" data-dismiss="modal">#Cancel#</button><button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button>';"ltr"==s.confirmDirection&&(c='<button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button><button class="btn btn-default" data-dismiss="modal">#Cancel#</button>');var d=s.confirmTitle;"function"==typeof s.confirmTitle&&(d=s.confirmTitle.call(this));var p=s.confirmMessage;"function"==typeof s.confirmMessage&&(p=s.confirmMessage.call(this)),l=l.replace("#buttonTemplate#",c).replace("#modalId#",n).replace("#AriaLabel#",d).replace("#Heading#",d).replace("#Body#",p).replace("#Ok#",s.confirmOk).replace("#Cancel#",s.confirmCancel).replace("#Style#",s.confirmStyle),i.append(l);var m=e("#"+n);t.on("click",function(e){e.preventDefault(),m.modal("show")}),e('button[data-dismiss="ok"]',m).on("click",function(e){s.confirmDismiss&&m.modal("hide"),s.confirmCallback(t,m)}),s.confirmAutoOpen&&m.modal("show")})}}(jQuery);var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,a,t){allLayers=[]}),function(){"use strict"}();var wlera=wlera||{bookmarks:[{id:"ottawa-nwr",name:"Ottawa NWR",userCreated:!1,spatialReference:{wkid:102100},xmax:-9253627.864758775,xmin:-9268896.161158718,ymax:5109457.058192252,ymin:5099759.110228584}],globals:{}},map,zonalStatsGP,maxLegendHeight,maxLegendDivHeight,printCount=0,storageName="esrijsapi_mapmarks",mapLayers=[],mapLayerIds=[];require(["esri/map","esri/dijit/OverviewMap","esri/SnappingManager","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/Bookmarks","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/Search","esri/dijit/Popup","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","esri/tasks/GeometryService","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/tasks/LegendLayer","esri/SpatialReference","esri/geometry/Extent","esri/config","esri/urlUtils","esri/request","dojo/_base/array","dojo/_base/lang","dojo/keys","dojo/cookie","dojo/has","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/on","dojo/domReady!"],function(e,a,t,i,o,s,r,n,l,c,d,p,m,u,h,g,y,b,v,f,L,k,w,S,x,C,M,E,D,T,A,I,R,O,P){function z(){if(V){var e=[];M.forEach(wlera.bookmarks,function(a){a.userCreated===!1&&e.push(a.id)});for(var a=wlera.bookmarks.slice(),t=0;t<a.length;t++){var i=a[t];-1!==e.indexOf(i.id)&&(a.splice(t,1),t--)}console.log(a);var o=JSON.stringify(a);window.localStorage.setItem(storageName,o)}else{var s=7;T(storageName,dojo.toJson(wlera.bookmarks),{expires:s})}}function F(){V?window.localStorage.removeItem(storageName):dojo.cookie(storageName,null,{expires:-1});var e=[];M.forEach(wlera.bookmarks,function(a){a.userCreated===!0&&e.push(a.id)});for(var a=0;a<wlera.bookmarks.length;a++){var t=wlera.bookmarks[a];-1!==e.indexOf(t.id)&&(wlera.bookmarks.splice(a,1),a--)}M.forEach(e,function(e){$("#"+e).remove()})}function G(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}function j(){$("#shareModal").modal("show");var e=map.extent,a="?xmax="+e.xmax.toString()+"&xmin="+e.xmin.toString()+"&ymax="+e.ymax.toString()+"&ymin="+e.ymin.toString(),t="%3Fxmax="+e.xmax.toString()+"%26xmin="+e.xmin.toString()+"%26ymax="+e.ymax.toString()+"%26ymin="+e.ymin.toString(),i="http://glcwra.wim.usgs.gov/WLERA/",o=i+a,s=i+t;console.log("Share URL is:"+o),$("#showFullLinkButton").click(function(){$("#fullShareURL").html('<span id="fullLinkLabel" class="label label-default"><span class="glyphicon glyphicon-link"></span> Full link</span><br><textarea style="margin-bottom: 10px; cursor: text" class="form-control"  rows="3" readonly>'+o+"</textarea>")}),$("#showShortLinkButton").click(function(){$.ajax({dataType:"json",type:"GET",url:"https://api-ssl.bitly.com/v3/shorten?access_token=e1a16076cc8470c65419920156e0ae2c4f77850f&longUrl="+s,headers:{Accept:"*/*"},success:function(e){var a=e.data.url;$("#bitlyURL").html('<span class="label label-default"><span class="glyphicon glyphicon-link"></span> Bitly link</span><code>'+a+"</code>")},error:function(e){$("#bitlyURL").html('<i class="fa fa-exclamation-triangle"></i> An error occurred retrieving shortened Bitly URL')}})})}function W(){$("#printModal").modal("show")}function _(){$("#bookmarkModal").modal("show")}function B(){function e(e){printCount++;var a=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+l+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(a),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function a(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem"),$("#printExecuteButton").button("reset")}var t=new v;t.map=map;var i=new f;i.exportOptions={width:500,height:400,dpi:300};var o=map.getZoom(),s="";o>=9&&(s="9"),o>=11&&(s="11"),o>=15&&(s="15"),i.showAttribution=!1,i.format="PDF",i.layout="Letter ANSI A LandscapeGLCWRA"+s,i.preserveScale=!1;var r=new L;r.layerId="normalized",r.subLayerIds=[0];var n=$("#printTitle").val();""===n?i.layoutOptions={titleText:"Western Lake Erie Restoration Assessment - Provisional Data",authorText:"Western Lake Erie Restoration Assessment (WLERA)",copyrightText:"This page was produced by the WLERA web application at glcwra.wim.usgs.gov/wlera",legendLayers:[r]}:i.layoutOptions={titleText:n+" - Provisional Data",authorText:"Western Lake Erie Restoration Assessment (WLERA)",copyrightText:"This page was produced by the WLERA web application at glcwra.wim.usgs.gov/wlera",legendLayers:[r]};var l=i.layoutOptions.titleText;t.template=i;var c=new b("http://gis.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");c.execute(t,e,a)}function N(){var e=$("#bookmarkTitle"),a=map.extent.toJson(),t=e.val();if(t.length>0){var i=t.toLowerCase().replace(/ /g,"-");a.name=t,a.id=i,a.userCreated=!0,wlera.bookmarks.push(a);var o=i+"_delete",s=$('<tr id="'+i+'"><td  class="bookmarkTitle td-bm">'+t+'</td><td class="text-right text-nowrap"> <button id="'+o+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" > <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(s),$("#"+o).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+i).remove();for(var e=0;e<wlera.bookmarks.length;e++){var a=wlera.bookmarks[e];-1!==i.indexOf(a.id)&&wlera.bookmarks.splice(e,1)}z()}}),e.val(""),z(),$("#bmAlert").hide(),$("#bookmarkModal").modal("hide")}else $("#bmAlert").show()}function U(){var e=esri.urlToObject(document.location.href);if(e.query){var a=new w(parseFloat(e.query.xmin),parseFloat(e.query.ymin),parseFloat(e.query.xmax),parseFloat(e.query.ymax),new k({wkid:102100}));map.setExtent(a);var t=document.location.href,i=t.substring(0,t.indexOf("?"));history.pushState(null,"",i)}}var V=G(),H=new d({},O.create("div"));R.add(H.domNode,"dark"),map=new e("mapDiv",{basemap:"gray",center:[-82.745,41.699],spatialReference:26917,zoom:10,logo:!1,minZoom:9,infoWindow:H}),S.defaults.geometryService=new y("http://gis.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),esri.config.defaults.io.corsEnabledServers.push("http://gis.wim.usgs.gov/");const q=new i({map:map},"homeButton");q.startup();const Y=new o({map:map},"locateButton");Y.startup();const X=new s({map:map,advancedLocationUnits:!0},I.byId("measurementDiv"));X.startup();var Z;if(Z=V?window.localStorage.getItem(storageName):dojo.cookie(storageName),Z&&"null"!==Z&&Z.length>4){console.log("cookie: ",Z,Z.length);var J=dojo.fromJson(Z);M.forEach(J,function(e){wlera.bookmarks.push(e)})}else console.log("no stored bookmarks...");const K=new a({map:map,attachTo:"bottom-right"});K.startup();var Q=$('<tr class="esriMeasurementTableRow" id="utmCoords"><td><span>UTM17</span></td><td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">UTM X</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">UTM Y</span></td></tr>');$(".esriMeasurementResultTable").append(Q),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#shareNavButton").click(function(){j()}),$("#printNavButton").click(function(){W()}),$("#addBookmarkButton").click(function(){_()}),$("#printExecuteButton").click(function(){$(this).button("loading"),B()}),$("#print-title-form").on("keypress",function(e){13==e.keyCode&&($("#printExecuteButton").button("loading"),B())}),$("#bookmarkSaveButton").click(function(){N()}),$("#bookmark-title-form").on("keypress",function(e){13==e.keyCode&&N()}),$("#bookmarkDismissButton").click(function(){$("#bmAlert").hide()}),P(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var a=g.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(a.y.toFixed(4)),$("#longitude").html(a.x.toFixed(4)),U()}),P(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),P(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!==e.mapPoint){var a=g.webMercatorToGeographic(e.mapPoint);$("#latitude").html(a.y.toFixed(4)),$("#longitude").html(a.x.toFixed(4))}}),P(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=g.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(4)),$("#longitude").html(e.x.toFixed(4))});var ee=new n("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer",{visible:!1});map.addLayer(ee),P(I.byId("btnStreets"),"click",function(){map.setBasemap("streets"),ee.setVisibility(!1)}),P(I.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),ee.setVisibility(!1)}),P(I.byId("btnGray"),"click",function(){map.setBasemap("gray"),ee.setVisibility(!1)}),P(I.byId("btnOSM"),"click",function(){map.setBasemap("osm"),ee.setVisibility(!1)}),P(I.byId("btnTopo"),"click",function(){map.setBasemap("topo"),ee.setVisibility(!1)}),P(I.byId("btnNatlMap"),"click",function(){ee.setVisibility(!0)});var ae=new c({map:map},"geosearch");ae.startup(),P(ae,"search-results",function(e){$("#geosearchModal").modal("hide")}),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function a(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){a()}),$("#scaleAlertClose").click(function(){$("#parcelSelectScaleAlert").hide()}),$("#goToScale").click(function(){$("#parcelSelectScaleAlert").hide();var e=map.getLayer("parcelsFeat").minScale;map.setScale(e)}),$("#disclaimerModal").modal({backdrop:"static"}),$("#disclaimerModal").modal("show"),$("#html").niceScroll();var t=$("#sidebar");t.niceScroll(),t.scroll(function(){$("#sidebar").getNiceScroll().resize()});var i=$("#legendCollapse"),o=$("#legendElement");$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),o.css("max-height",maxLegendHeight),i.on("shown.bs.collapse",function(){$("#legendLabel").show(),maxLegendHeight=.9*$("#mapDiv").height(),o.css("max-height",maxLegendHeight),maxLegendDivHeight=o.height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),i.on("hide.bs.collapse",function(){o.css("height","initial"),window.innerWidth<=767&&$("#legendLabel").hide()});var s=$("#measurementCollapse");s.on("shown.bs.collapse",function(){$("#measureLabel").show()}),s.on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()}),$(function(){$("[data-hide]").on("click",function(){$("."+$(this).attr("data-hide")).hide()})}),wlera.bookmarks.forEach(function(e){if(e.userCreated===!1){var a=$('<tr id="'+e.id+'"><td class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"></td> </tr>');$("#bookmarkList").append(a)}else{var t=e.id+"_delete",i=$('<tr id="'+e.id+'"><td  class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"> <button id="'+t+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" title="Delete bookmark"> <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(i),$("#"+t).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+e.id).remove();for(var a=0;a<wlera.bookmarks.length;a++){var t=wlera.bookmarks[a];-1!==e.id.indexOf(t.id)&&wlera.bookmarks.splice(a,1)}z()}})}}),$("body").on("click",".td-bm",function(){var e=this.parentNode.id;wlera.bookmarks.forEach(function(a){if(a.id==e){var t=new w(a.xmin,a.ymin,a.xmax,a.ymax,new k(a.spatialReference));map.setExtent(t)}})}),$('[data-toggle="tooltip"]').tooltip({delay:{show:500,hide:0}}),$("#removeBookmarksButton").confirmModal({confirmTitle:"Delete user bookmarks from memory",confirmMessage:"This action will remove all user-defined bookmarks from local memory on your computer or device. Would you like to continue?",confirmOk:"Yes, delete bookmarks",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:F,confirmDismiss:!0,confirmAutoOpen:!1})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/Geoprocessor","esri/tasks/FeatureSet","esri/tasks/GeometryService","esri/tasks/ProjectParameters","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/toolbars/draw","esri/SpatialReference","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/layers/LabelLayer","esri/symbols/TextSymbol","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/renderers/SimpleRenderer","esri/Color","esri/dijit/Popup","esri/dijit/PopupTemplate","dojo/query","dojo/dom"],function(e,a,t,i,o,s,r,n,l,c,d,p,u,h,g,y,b,v,f,L,k,w,S,x,C){function M(e){$("#calculateStats").button("reset");var a=e.results[0].value.features[0].attributes,t=$("#zonalStatsTable");t.html("<tr><th>Mean </th><th>Standard Deviation</th><th>Max</th></tr>"),t.append("<tr><td>"+a.MEAN.toFixed(4)+"</td><td>"+a.STD.toFixed(3)+"</td><td>"+a.MAX+"</td></tr>"),$("#zonalStatsModal").modal("show")}var E,T,I,R,O,z,F=[],G=!1,j=!1,W=!1,_=!1,B={inputPoly:null},N=[];const U="http://gis.wim.usgs.gov/arcgis/rest/services/GLCWRA/",V=new s("http://gis.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),H=new h(U+"WLERA_restorationModel/MapServer",{id:"normalized",visible:!0,opacity:1});H.setVisibleLayers([0]),mapLayers.push(H),mapLayerIds.push(H.id),F.push({layer:H,title:" "}),H.inLegendLayers=!0;const q=new h(U+"WLERA_hydroCondition/MapServer",{id:"dikes",visible:!1,minScale:1e5,opacity:.9});q.setVisibleLayers([2]),mapLayers.push(q),mapLayerIds.push(q.id),q.inLegendLayers=!1;const Y=new h(U+"WLERA_hydroCondition/MapServer",{id:"degFlowlines",visible:!1,minScale:1e5,opacity:1});Y.setVisibleLayers([1]),mapLayers.push(Y),mapLayerIds.push(Y.id),Y.inLegendLayers=!1;const Z=new h(U+"WLERA_hydroCondition/MapServer",{id:"culverts",visible:!1,minScale:1e5,opacity:1});Z.setVisibleLayers([0]),mapLayers.push(Z),mapLayerIds.push(Z.id),Z.inLegendLayers=!1;const J=new h(U+"WLERA_reference/MapServer",{id:"parcelsDyn",visible:!0,minScale:1e5,opacity:1});J.setVisibleLayers([4]),mapLayers.push(J),mapLayerIds.push(J.id),J.inLegendLayers=!1;const K=new g(U+"WLERA_reference/MapServer/4",{id:"parcelsFeat",visible:!0,minScale:1e5,mode:g.MODE_SELECTION,outFields:["*"]});mapLayers.push(K),mapLayerIds.push(K.id),K.inLegendLayers=!1;var Q=new t;Q.outSpatialReference=map.spatialReference;var ee=new v(v.STYLE_SOLID,new f(f.STYLE_SOLID,new k([255,0,0]),2),new k([255,255,0,.5]));K.setSelectionSymbol(ee),map.disableClickRecenter(),map.on("click",function(e){Q.geometry=e.mapPoint,Q.outFields=["*"],Q.returnGeometry=!0,G&&K.selectFeatures(Q,g.SELECTION_ADD),e.shiftKey&&K.selectFeatures(Q,g.SELECTION_SUBTRACT)}),K.on("selection-complete",function(){$("#displayStats").prop("disabled",!1)}),E=new d(map);var ae=$("#drawCustom");ae.click(function(){K.clearSelection(),map.graphics.remove(R),map.graphics.remove(z),$("#displayStats").prop("disabled",!0),$("#calculateStats").prop("disabled",!0),B={inputPoly:null},W?(E.finishDrawing(),E.deactivate(),ae.removeClass("active"),ae.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),W=!1):W||(ae.addClass("active"),ae.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop drawing'),G=!1,E.activate(d.POLYGON),W=!0)});var te=$("#selectParcels");te.click(function(){ae.removeClass("active"),ae.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),W=!1,E.deactivate(),G?(te.removeClass("active"),te.html('<span class="ti-plus"></span>&nbsp;&nbsp;Click'),map.setMapCursor("auto"),G=!1):G||(te.addClass("active"),te.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop selecting'),map.setMapCursor("crosshair"),j=!1,G=!0)}),$("#clearSelection").click(function(){K.clearSelection(),map.graphics.remove(R),map.graphics.remove(z),$("#displayStats").prop("disabled",!0),$("#calculateStats").prop("disabled",!0),B={inputPoly:null},N=[],console.log("Length  of input poly array: "+B.inputPoly.features.length)}),zonalStatsGP=new i("http://gis.wim.usgs.gov/arcgis/rest/services/GLCWRA/WLERAZonalStats/GPServer/WLERAZonalStats"),zonalStatsGP.setOutputSpatialReference({wkid:102100}),zonalStatsGP.on("execute-complete",M),$("#calculateStats").click(function(){$(this).button("loading"),zonalStatsGP.execute(B)}),P(E,"DrawEnd",function(e){I=new v(v.STYLE_SOLID,new f(f.STYLE_SOLID,new k([255,0,0]),2),new k([255,255,0,.5])),R=new m(e,I),map.graphics.add(R),E.deactivate(),ae.removeClass("active"),ae.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),W=!1,N.push(R);var a=new o;a.features=N,B={inputPoly:a},$("#calculateStats").prop("disabled",!1)}),T=new d(map);var ie=$("#selectParcelsDraw");ie.click(function(){map.graphics.remove(z);var e=map.getScale(),a=map.getLayer("parcelsFeat").minScale;_?(T.finishDrawing(),T.deactivate(),ie.removeClass("active"),ie.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),_=!1):_||(e>a?$("#parcelSelectScaleAlert").show():(ie.addClass("active"),ie.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop drawing'),G=!1,T.activate(d.POLYGON),_=!0))}),P(T,"DrawEnd",function(e){O=new v(v.STYLE_SOLID,new f(f.STYLE_SOLID,new k([25,25,255]),2),new k([0,0,0,.1])),z=new m(e,O),map.graphics.add(z),T.deactivate(),ie.removeClass("active"),ie.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),W=!1,Q.geometry=e,K.selectFeatures(Q,g.SELECTION_ADD)}),$("#displayStats").click(function(){$("#zonalStatsTable").html("<tr><th>Parcel ID</th><th>Hectares</th><th>Mean </th><th>Standard Deviation</th><th>Max</th></tr>"),map.getLayer("parcelsFeat").getSelectedFeatures().length>0&&$.each(map.getLayer("parcelsFeat").getSelectedFeatures(),function(){$("#zonalStatsTable").append("<tr><td>"+this.attributes.PARCELS_ID+"</td><td>"+this.attributes.Hec.toFixed(3)+"</td><td>"+this.attributes.MEAN.toFixed(4)+"</td><td>"+this.attributes.STD.toFixed(3)+"</td><td>"+this.attributes.stat_MAX+"</td></tr>"),$("#zonalStatsModal").modal("show")})});const oe=new h(U+"WLERA_reference/MapServer",{id:"studyArea",visible:!0,opacity:1});oe.setVisibleLayers([0]),mapLayers.push(oe),mapLayerIds.push(oe.id),F.push({layer:oe,title:" "}),oe.inLegendLayers=!0;const se=new h(U+"WLERA_reference/MapServer",{id:"GLRIWetlands",visible:!0,minScale:1e5,maxScale:1e4,opacity:1});se.setVisibleLayers([2]),mapLayers.push(se),F.push({layer:se,title:" "}),se.inLegendLayers=!0;var re=new S({title:"U.S. ACOE Aerial Photo",mediaInfos:[{title:"",caption:"Date & Time taken: {date_}",type:"image",value:{sourceURL:"{imageUrl}",linkURL:"{imageUrl}"}}]}),ne=new g(U+"WLERA_reference/MapServer/1",{id:"aerials",layerID:"aerials",visible:!1,minScale:1e5,mode:g.MODE_ONDEMAND,outFields:["*"],infoTemplate:re});ne.id="aerials",mapLayers.push(ne),mapLayerIds.push(ne.id),F.push({layer:ne,title:"US Army Corps of Engineers Aerial Photos "}),ne.inLegendLayers=!0;const le=new h(U+"WLERA_restorationModel/MapServer",{id:"landuse",visible:!1,opacity:1});le.setVisibleLayers([8]),mapLayers.push(le),mapLayerIds.push(le.id),le.inLegendLayers=!1;const ce=new h(U+"WLERA_restorationModel/MapServer",{id:"imperviousSurfaces",visible:!1,opacity:1});ce.setVisibleLayers([7]),mapLayers.push(ce),mapLayerIds.push(ce.id),ce.inLegendLayers=!1;const de=new h(U+"WLERA_restorationModel/MapServer",{id:"conservedLands",visible:!1,opacity:1});de.setVisibleLayers([6]),mapLayers.push(de),mapLayerIds.push(de.id),de.inLegendLayers=!1;const pe=new h(U+"WLERA_restorationModel/MapServer",{id:"flowline",visible:!1,opacity:1});pe.setVisibleLayers([5]),mapLayers.push(pe),mapLayerIds.push(pe.id),pe.inLegendLayers=!1;const me=new h(U+"WLERA_restorationModel/MapServer",{id:"wetsoils",visible:!1,opacity:1});me.setVisibleLayers([4]),mapLayers.push(me),mapLayerIds.push(me.id),me.inLegendLayers=!1;const ue=new h(U+"WLERA_restorationModel/MapServer",{id:"hydroperiod",visible:!1,opacity:1});ue.setVisibleLayers([3]),mapLayers.push(ue),mapLayerIds.push(ue.id),ue.inLegendLayers=!1;const he=new h(U+"WLERA_restorationModel/MapServer",{id:"waterMask",visible:!0,opacity:.75});he.setVisibleLayers([2]),mapLayers.push(he),mapLayerIds.push(he.id),he.inLegendLayers=!1,map.addLayers(mapLayers);var ge=map.enableSnapping({snapKey:A("mac")?D.META:D.CTRL}),ye=[{layer:K}];ge.setLayerInfos(ye);var be=new r,ve=new p(26917);X.on("measure-end",function(e){be.geometries=[e.geometry],be.outSR=ve;var a=-1*e.geometry.x;84>a&&a>78?V.project(be,function(e){var a=e[0];console.log(a);var t=a.x.toFixed(0),i=a.y.toFixed(0);$("#utmX").html(t),$("#utmY").html(i)}):($("#utmX").html('<span class="label label-danger">outside zone</span>'),$("#utmY").html('<span class="label label-danger">outside zone</span>'))});for(var fe=0;fe<map.layerIds.length;fe++){var Le=map.getLayer(map.layerIds[fe]);Le.visible&&($("#"+Le.id).button("toggle"),$("#"+Le.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}for(var fe=0;fe<map.graphicsLayerIds.length;fe++){var Le=map.getLayer(map.graphicsLayerIds[fe]);Le.visible&&($("#"+Le.id).button("toggle"),$("#"+Le.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}$("button.lyrTog").click(function(e){$(this).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$(this).button("toggle"),e.preventDefault(),e.stopPropagation();var a=map.getLayer($(this).attr("id"));a.visible?a.setVisibility(!1):(a.setVisibility(!0),a.inLegendLayers===!1&&(F.push({layer:a,title:" "}),a.inLegendLayers=!0,ke.refresh()))}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("hide.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down");var a=$(this).attr("id")+"Buttons";$("#"+a).button("toggle")}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("show.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down")}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var a=this.parentNode.id,t=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(t),$(".zoomDialog").css("left",event.clientX-80),$(".zoomDialog").css("top",event.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var t=map.getLayer(a).minScale;map.setScale(t)}),$("#zoomcenter").click(function(e){var a=new c(-83.208084,41.628103,new p({wkid:4326}));map.centerAt(a)}),$("#zoomextent").click(function(e){var t=map.getLayer(a).fullExtent,i=new r;i.outSR=new p(102100),i.geometries=[t],V.project(i,function(e){var a=e[0];map.setExtent(a,new p({wkid:102100}))})})}),$(".opacity").hover(function(){$(".opacitySlider").remove();var e=this.parentNode.id,a=map.getLayer(e).opacity,t=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+a+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(t);var i=$("#slider");i[0].value=100*a,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-5),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),i.change(function(a){var t=i[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(e).setOpacity(t)})});var ke=new e({map:map,layerInfos:F},"legendDiv");ke.startup()})});