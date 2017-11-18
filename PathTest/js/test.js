/**
 *
 构造流程图的结构与样式
 *
 @class jsPlumb
 *
 @constructor jsPlumb.getInstance
*/
jsPlumb.ready(function () {

   instance = window.jsp = jsPlumb.getInstance({
     // default drag options
     DragOptions: { cursor: 'pointer', zIndex: 1000 },
     // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
     // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
     ConnectionOverlays: [
       [ "Arrow", {
         location: 0.96,
         visible:true,
         width:10,
         length:10,
         id:"ARROW",
         events:{
           // click:function() { alert("you clicked on the arrow overlay")}
         }
       } ],
       [ "Label", {
         location: 0.4,
         id: "label",
         cssClass: "aLabel",
         events:{
           // tap:function() { alert("hey"); }
         }
       }]
     ],
     Container: "canvas"
   });

   var basicType = {
     connector: "StateMachine",
     paintStyle: { stroke: "red", strokeWidth: 4 },
     hoverPaintStyle: { stroke: "blue" },
     overlays: [
       "Arrow"
     ]
   };
   instance.registerConnectionType("basic", basicType);

   // this is the paint style for the connecting lines..
   var connectorPaintStyle = {
     strokeWidth: 2,
     stroke: "#61B7CF",
     joinstyle: "round",
     outlineStroke: "white",
     outlineWidth: 2
   },
   // .. and this is the hover style.
   connectorHoverStyle = {
     strokeWidth: 3,
     stroke: "#FF0000",
     outlineWidth: 5,
     outlineStroke: "white"
   },
   endpointHoverStyle = {
     fill: "#FF0000",
     stroke: "#FF0000"
   },
   // the definition of source endpoints (the small blue ones)
   sourceEndpoint = {
     endpoint: "Dot",
     paintStyle: {
       stroke: "#61B7CF",
       fill: "#61B7CF",
       radius: 2.5,
       strokeWidth: 1
     },
     maxConnections: -1,
     isSource: true,
     connector: ["Straight"],
     connectorStyle: connectorPaintStyle,
     hoverPaintStyle: endpointHoverStyle,
     connectorHoverStyle: connectorHoverStyle,
     dragOptions: {},
     overlays: [
       [ "Label", {
         location: [0.5, 1.5],
         label: "Drag",
         cssClass: "endpointSourceLabel",
         visible:false
       } ]
     ]
   },
   // the definition of target endpoints (will appear when the user drags a connection)
   targetEndpoint = {
     endpoint: "Dot",
     paintStyle: { fill: "#61B7CF", radius: 2.5 },
     hoverPaintStyle: endpointHoverStyle,
     maxConnections: -1,
     dropOptions: { hoverClass: "hover", activeClass: "active" },
     isTarget: true,
     overlays: [
       [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
     ]
   },
   init = function (connection) {
     connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
   };

   var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
     for (var i = 0; i < sourceAnchors.length; i++) {
       var sourceUUID = toId + sourceAnchors[i];
       instance.addEndpoint(toId, sourceEndpoint, {
         anchor: sourceAnchors[i], uuid: sourceUUID
       });
     }
     for (var j = 0; j < targetAnchors.length; j++) {
       var targetUUID = toId + targetAnchors[j];
       instance.addEndpoint(toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
     }
   };

   // suspend drawing and initialise.
   instance.batch(function () {

     _addEndpoints("node-input", ["BottomCenter"], []);
     _addEndpoints("node-init", ["BottomCenter"], ["TopCenter"]);
     _addEndpoints("node1", ["BottomCenter","RightMiddle"], ["TopCenter"]);
     _addEndpoints("node2", ["BottomCenter"], ["LeftMiddle"]);
     _addEndpoints("node3", ["BottomCenter","RightMiddle"], ["TopCenter"]);
     _addEndpoints("node4", ["BottomCenter"], ["LeftMiddle"]);
     _addEndpoints("node5", ["BottomCenter","RightMiddle"], ["TopCenter"]);
     _addEndpoints("node6", ["BottomCenter"], ["LeftMiddle"]);
     _addEndpoints("node7", ["LeftMiddle","RightMiddle"], ["TopCenter"]);
     _addEndpoints("node8", ["LeftMiddle","BottomCenter"], ["TopCenter"]);
     _addEndpoints("node9", ["LeftMiddle","BottomCenter"], ["TopCenter"]);
     _addEndpoints("node10", ["LeftMiddle","BottomCenter"], ["TopCenter"]);
     _addEndpoints("node11", [], ["TopCenter"]);
     _addEndpoints("node12", [], ["TopCenter"]);
     _addEndpoints("node13", ["LeftMiddle","RightMiddle"], ["TopCenter"]);
     _addEndpoints("node14", ["RightMiddle","BottomCenter"], ["TopCenter"]);
     _addEndpoints("node15", [], ["TopCenter"]);
     _addEndpoints("node16", ["RightMiddle","BottomCenter"], ["TopCenter"]);
     _addEndpoints("node17", ["RightMiddle","BottomCenter"], ["TopCenter"]);
     _addEndpoints("node18", ["RightMiddle","BottomCenter"], ["TopCenter"]);
     _addEndpoints("node19", ["RightMiddle","BottomCenter"], ["TopCenter"]);
     _addEndpoints("node20", [], ["TopCenter"]);
     // listen for new connections; initialise them the same way we initialise the connections at startup.
     instance.bind("connection", function (connInfo, originalEvent) {
       init(connInfo.connection);
     });

     // make all the window divs draggable
     // instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });
     // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
     // method, or document.querySelectorAll:
     //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });

     // connect a few up
     c_nodeinput_nodeinit = instance.connect({uuids: ["node-inputBottomCenter", "node-initTopCenter"]});
     c_nodeinit_node1 = instance.connect({uuids: ["node-initBottomCenter", "node1TopCenter"]});
     c_node1_node2 = instance.connect({uuids: ["node1RightMiddle", "node2LeftMiddle"]});
     c_node1_node2.getOverlay("label").setLabel('Y');
     c_node1_node3 = instance.connect({uuids: ["node1BottomCenter", "node3TopCenter"]});
     c_node1_node3.getOverlay("label").setLabel('N');
     c_node2_node3 = instance.connect({uuids: ["node2BottomCenter", "node3TopCenter"]});
     c_node3_node4 = instance.connect({uuids: ["node3RightMiddle", "node4LeftMiddle"]});
     c_node3_node4.getOverlay("label").setLabel('Y');
     c_node3_node5 = instance.connect({uuids: ["node3BottomCenter", "node5TopCenter"]});
     c_node3_node5.getOverlay("label").setLabel('N');
     c_node4_node5 = instance.connect({uuids: ["node4BottomCenter", "node5TopCenter"]});
     c_node5_node6 = instance.connect({uuids: ["node5RightMiddle", "node6LeftMiddle"]});
     c_node5_node6.getOverlay("label").setLabel('Y');
     c_node5_node7 = instance.connect({uuids: ["node5BottomCenter", "node7TopCenter"]});
     c_node5_node7.getOverlay("label").setLabel('N');
     c_node6_node7 = instance.connect({uuids: ["node6BottomCenter", "node7TopCenter"]});
     c_node7_node8 = instance.connect({uuids: ["node7RightMiddle", "node8TopCenter"]});
     c_node7_node8.getOverlay("label").setLabel('Y');
     c_node8_node9 = instance.connect({uuids: ["node8BottomCenter", "node9TopCenter"]});
     c_node8_node9.getOverlay("label").setLabel('N');
     c_node8_node12 = instance.connect({uuids: ["node8LeftMiddle", "node12TopCenter"]});
     c_node8_node12.getOverlay("label").setLabel('Y');
     c_node9_node10 = instance.connect({uuids: ["node9BottomCenter", "node10TopCenter"]});
     c_node9_node10.getOverlay("label").setLabel('N');
     c_node9_node12 = instance.connect({uuids: ["node9LeftMiddle", "node12TopCenter"]});
     c_node9_node12.getOverlay("label").setLabel('Y');
     c_node10_node11 = instance.connect({uuids: ["node10BottomCenter", "node11TopCenter"]});
     c_node10_node11.getOverlay("label").setLabel('N');
     c_node10_node12 = instance.connect({uuids: ["node10LeftMiddle", "node12TopCenter"]});
     c_node10_node12.getOverlay("label").setLabel('Y');
     c_node7_node13 = instance.connect({uuids: ["node7LeftMiddle", "node13TopCenter"]});
     c_node7_node13.getOverlay("label").setLabel('N');
     c_node13_node14 = instance.connect({uuids: ["node13RightMiddle", "node14TopCenter"]});
     c_node13_node14.getOverlay("label").setLabel('Y');
     c_node14_node12 = instance.connect({uuids: ["node14RightMiddle", "node12TopCenter"]});
     c_node14_node12.getOverlay("label").setLabel('Y');
     c_node14_node15 = instance.connect({uuids: ["node14BottomCenter", "node15TopCenter"]});
     c_node14_node15.getOverlay("label").setLabel('N');
     c_node16_node17 = instance.connect({uuids: ["node16RightMiddle", "node17TopCenter"]});
     c_node16_node17.getOverlay("label").setLabel('Y');
     c_node17_node12 = instance.connect({uuids: ["node17RightMiddle", "node12TopCenter"]});
     c_node17_node12.getOverlay("label").setLabel('Y');
     c_node17_node15 = instance.connect({uuids: ["node17BottomCenter", "node15TopCenter"]});
     c_node17_node15.getOverlay("label").setLabel('N');
     c_node13_node16 = instance.connect({uuids: ["node13LeftMiddle", "node16TopCenter"]});
     c_node13_node16.getOverlay("label").setLabel('N');
     c_node16_node18 = instance.connect({uuids: ["node16BottomCenter", "node18TopCenter"]});
     c_node16_node18.getOverlay("label").setLabel('N');
     c_node17_node15 = instance.connect({uuids: ["node17BottomCenter", "node15TopCenter"]});
     c_node17_node15.getOverlay("label").setLabel('N');
     c_node18_node19 = instance.connect({uuids: ["node18RightMiddle", "node19TopCenter"]});
     c_node18_node19.getOverlay("label").setLabel('Y');
     c_node18_node20 = instance.connect({uuids: ["node18BottomCenter", "node20TopCenter"]});
     c_node18_node20.getOverlay("label").setLabel('N');
     c_node19_node12 = instance.connect({uuids: ["node19RightMiddle", "node12TopCenter"]});
     c_node19_node12.getOverlay("label").setLabel('Y');
     c_node19_node15 = instance.connect({uuids: ["node19BottomCenter", "node15TopCenter"]});
     c_node19_node15.getOverlay("label").setLabel('N');
   });

   jsPlumb.fire("jsPlumbDemoLoaded", instance);

});

// 改变边框的样式
function changeBorder(node, interval) {
  setTimeout(() => {document.getElementById(node).style.border="2px solid #FF0000"}, interval);
}
// 改变连线的样式
function changeEdgeColor(edge, interval) {
  setTimeout(() => {edge.setPaintStyle({fill: "#F00", stroke: "#F00"})}, interval);
}
// 还原流程图的所有样式
function restFlowChart() {
  e=instance.getAllConnections();
  for(var key in e){
    e[key].setPaintStyle({fill: "#61b7cf", stroke: "#61b7cf"});
  }//恢复连线的样式为最初样式
  document.getElementById("node-input").style.border="1px solid #d1cece";
  document.getElementById("node-init").style.border="1px solid #d1cece";
  for(i=1;i<=20;i++){
    node = "node" + i.toString();
    document.getElementById(node).style.border="1px solid #d1cece";
  }
}
// 路径是否已经存在
function haveItem(array, item) {
  var flag = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i].type == item.type) {
      flag = true;
    }
  }
  return flag;
}
// 删除未测试路径中的测试路径
function removeItem(array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].type == item.type) {
      array.splice(i, 1);
    }
  }
}

new Vue({
  el: '#app',
  data: {
    form: {
      a: 1,
      b: 1,
      c: 1
    },
    tableData: [],
    tableData2: []
  },
  mounted() {
    this.initPath();
  },
  methods: {
    // 提交表单，开始测试路径
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var a = this.form.a;
          var b = this.form.b;
          var c = this.form.c;
          var i = 0;
          var path = [];
          restFlowChart();
          changeBorder("node-input", i);
          changeEdgeColor(c_nodeinput_nodeinit, i=i+100);
          var match = 0;
          changeBorder("node-init", i=i+100);
          changeEdgeColor(c_nodeinit_node1, i=i+100);
          changeBorder("node1", i=i+100);
          path.push(1);
          if (a==b){
            changeEdgeColor(c_node1_node2, i=i+100);
            match = match + 1;
            changeBorder("node2", i=i+100);
            path.push(2);
            changeEdgeColor(c_node2_node3, i=i+100);
          }else{
            changeEdgeColor(c_node1_node3, i=i+100);
          }
          changeBorder("node3", i=i+100);
          path.push(3);

          if (a == c){
            changeEdgeColor(c_node3_node4, i=i+100);
            match = match + 2;
            changeBorder("node4", i=i+100);
            path.push(4);
            changeEdgeColor(c_node4_node5, i=i+100);
          }else{
            changeEdgeColor(c_node3_node5, i=i+100);
          }
          changeBorder("node5", i=i+100);
          path.push(5);

          if (b == c) {
            changeEdgeColor(c_node5_node6, i=i+100);
            match = match + 3;
            changeBorder("node6", i=i+100);
            path.push(6);
            changeEdgeColor(c_node6_node7, i=i+100);
          }else{
            changeEdgeColor(c_node5_node7, i=i+100);
          }
          changeBorder("node7", i=i+100);
          path.push(7);

          if(match == 0) {
            changeEdgeColor(c_node7_node8, i=i+100);
            changeBorder("node8", i=i+100);
            path.push(8);
            if(a + b <= c) {
              changeEdgeColor(c_node8_node12, i=i+100);
              changeBorder("node12", i=i+100);
              path.push(12);
            }else {
              changeEdgeColor(c_node8_node9, i=i+100);
              changeBorder("node9", i=i+100);
              path.push(9);
              if(b+c<=a) {
                changeEdgeColor(c_node9_node12, i=i+100);
                changeBorder("node12", i=i+100);
                path.push(12);
              }else {
                changeEdgeColor(c_node9_node10, i=i+100);
                changeBorder("node10", i=i+100);
                path.push(10);
                if(a+c<=b){
                  changeEdgeColor(c_node10_node12, i=i+100);
                  changeBorder("node12", i=i+100);
                  path.push(12);
                }else{
                  changeEdgeColor(c_node10_node11, i=i+100);
                  changeBorder("node11", i=i+100);
                  path.push(11);
                }
              }
            }
          }else {
            changeEdgeColor(c_node7_node13, i=i+100);
            changeBorder("node13", i=i+100);
            path.push(13);
            if(match == 1){
              changeEdgeColor(c_node13_node14, i=i+100);
              changeBorder("node14", i=i+100);
              path.push(14);
              if(a+b<=c){
                changeEdgeColor(c_node14_node12, i=i+100);
                changeBorder("node12", i=i+100);
                path.push(12);
              }else{
                changeEdgeColor(c_node14_node15, i=i+100);
                changeBorder("node15", i=i+100);
                path.push(15);
              }
            }else{
              changeEdgeColor(c_node13_node16, i=i+100);
              changeBorder("node16", i=i+100);
              path.push(16);
              if(match == 2) {
                changeEdgeColor(c_node16_node17, i=i+100);
                changeBorder("node17", i=i+100);
                path.push(17);
                if(a+c<=b){
                  changeEdgeColor(c_node17_node12, i=i+100);
                  changeBorder("node12", i=i+100);
                  path.push(12);
                }else{
                  changeEdgeColor(c_node17_node15, i=i+100);
                  changeBorder("node15", i=i+100);
                  path.push(15);
                }
              }else{
                changeEdgeColor(c_node16_node18, i=i+100);
                changeBorder("node18", i=i+100);
                path.push(18);
                if(match==3){
                  changeEdgeColor(c_node18_node19, i=i+100);
                  changeBorder("node19", i=i+100);
                  path.push(19);
                  if(b+c<=a){
                    changeEdgeColor(c_node19_node12, i=i+100);
                    changeBorder("node12", i=i+100);
                    path.push(12);
                  }else{
                    changeEdgeColor(c_node19_node15, i=i+100);
                    changeBorder("node15", i=i+100);
                    path.push(15);
                  }
                }else{
                  changeEdgeColor(c_node18_node20, i=i+100);
                  changeBorder("node20", i=i+100);
                  path.push(20);
                }
              }
            }
          }
          if(haveItem(this.tableData, {"type": path.join('->')})){

          }else{
            this.tableData.push({"type": path.join('->')});
          }
          removeItem(this.tableData2, {"type": path.join('->')});

        } else {
          // this.$message.error('请输入合法的取值范围！');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.tableData = [];
      this.tableData2 = [];
      this.initPath();
      restFlowChart();
    },
    // 表单输入验证
    validate(rule, value, callback) {
      if (value === '') {
        return callback(new Error('输入值不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入整数值'));
        } else {
          if (value <= 0) {
            callback(new Error('请输入正整数'));
          } else {
              callback();
            }
          }
      }, 100);
    },
    // 所有未测试路径
    initPath() {
      this.tableData2.push({"type": "1->2->3->4->5->6->7->13->16->18->20"});
      this.tableData2.push({"type": "1->2->3->5->7->13->14->12"});
      this.tableData2.push({"type": "1->2->3->5->7->13->14->15"});
      this.tableData2.push({"type": "1->3->4->5->7->13->16->17->12"});
      this.tableData2.push({"type": "1->3->4->5->7->13->16->17->15"});
      this.tableData2.push({"type": "1->3->5->6->7->13->16->18->19->12"});
      this.tableData2.push({"type": "1->3->5->6->7->13->16->18->19->15"});
      this.tableData2.push({"type": "1->3->5->7->8->12"});
      this.tableData2.push({"type": "1->3->5->7->8->9->12"});
      this.tableData2.push({"type": "1->3->5->7->8->9->10->12"});
      this.tableData2.push({"type": "1->3->5->7->8->9->10->11"});
    }
  }
});
