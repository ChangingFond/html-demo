// 三角形三条边的边长范围取值集合
var range = [];

/**
 *
 边长取值范围类，给定值域范围，定义边长测试过程中可能存在的8种取值
 *
 @class Edge
 *
 @constructor newRange(min, max)
*/
jsPlumb.ready(function () {

   var instance = window.jsp = jsPlumb.getInstance({
     // default drag options
     DragOptions: { cursor: 'pointer', zIndex: 2000 },
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
     connector: ["StateMachine"],
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
     //
     // listen for clicks on connections, and offer to delete connections on click.
     //
     // instance.bind("click", function (conn, originalEvent) {
     //    // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
     //      //   instance.detach(conn);
     //     conn.toggleType("basic");
     // });

     instance.bind("connectionDrag", function (connection) {
       console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
     });

     instance.bind("connectionDragStop", function (connection) {
       console.log("connection " + connection.id + " was dragged");
     });

     instance.bind("connectionMoved", function (params) {
       console.log("connection " + params.connection.id + " was moved");
     });
   });

   jsPlumb.fire("jsPlumbDemoLoaded", instance);

});

/**
 *
 三角形类，根据生成的测试边长构建三角形并判断该三角形的类型
 可能情况有①边长不在取值范围内②非三角形③等边三角形④等腰三角形⑤其他三角形
 *
 @class Triangle
 *
 @constructor newTriangle(a, b, c)
*/
var Triangle = {
  getTriangleType: function(a, b, c) {
    if (!(range[0].inRange(a) && range[1].inRange(b) && range[2].inRange(c))) {
      return '边长不在取值范围内';
    }
    if (!(a + b > c && a + c > b && b + c > a)) {
      return '非三角形';
    }
    if (a == b || a == c || b == c) {
      if (a == b && a == c) {
        return '等边三角形';
      } else {
        return '等腰三角形';
      }
    } else {
      return '其他三角形';
    }
  },
  newTriangle: function(a, b, c) {
    var triangle = {};
    triangle.edgeA = a;
    triangle.edgeB = b;
    triangle.edgeC = c;
    triangle.type = Triangle.getTriangleType(a, b, c);
    return triangle;
  }
}
// 生成一般边界测试的用例
function buildNormalTest() {
  var test = [], edge = [], average = [];
  for(var i = 0; i < range.length; i++) {
    edge.push(new Array(range[i].min, range[i].overMin(), range[i].belowMax(), range[i].max));
    average.push(range[i].average());
  }
  test.push(Triangle.newTriangle(average[0], average[1], average[2]));
  for(var i = 0; i < edge[0].length; i++) {
    test.push(Triangle.newTriangle(edge[0][i], average[1], average[2]));
  }
  for(var i = 0; i < edge[1].length; i++) {
    test.push(Triangle.newTriangle(average[0], edge[1][i], average[2]));
  }
  for(var i = 0; i < edge[2].length; i++) {
    test.push(Triangle.newTriangle(average[0], average[1], edge[2][i]));
  }
  return test;
}
// 生成健壮边界测试的用例
function buildStrongTest() {
  var test = [], edge = [], average = [];
  for(var i = 0; i < range.length; i++) {
    edge.push(new Array(range[i].belowMin(), range[i].min, range[i].overMin(), range[i].belowMax(), range[i].max, range[i].overMax()));
    average.push(range[i].average());
  }
  test.push(Triangle.newTriangle(average[0], average[1], average[2]));
  for(var i = 0; i < edge[0].length; i++) {
    test.push(Triangle.newTriangle(edge[0][i], average[1], average[2]));
  }
  for(var i = 0; i < edge[1].length; i++) {
    test.push(Triangle.newTriangle(average[0], edge[1][i], average[2]));
  }
  for(var i = 0; i < edge[2].length; i++) {
    test.push(Triangle.newTriangle(average[0], average[1], edge[2][i]));
  }
  return test;
}
// 生成随机测试的用例
function buildRandomTest() {
  var test = [];
  for(var i = 0; i < 300; i++) {
    test.push(Triangle.newTriangle(range[0].random(), range[1].random(), range[2].random()));
  }
  return test;
}
// 生成最坏情况测试的用例
function buildWorstTest() {
  var test = [], edge = [], average = [];
  for(var i = 0; i < range.length; i++) {
    edge.push(new Array(range[i].belowMin(), range[i].min, range[i].overMin(), range[i].belowMax(), range[i].max, range[i].overMax(), range[i].random()));
    average.push(range[i].average());
  }
  for (var i = 0; i < edge[0].length; i++) {
    for (var j = 0; j < edge[1].length; j++) {
      for (var k = 0; k < edge[2].length; k++) {
        test.push(Triangle.newTriangle(edge[0][i], edge[1][j], edge[2][k]));
      }
    }
  }
  return test;
}
// 生成健壮最坏情况测试的用例
function buildBadTest() {
  var test = [], edge = [], average = [];
  for(var i = 0; i < range.length; i++) {
    edge.push(new Array(range[i].min, range[i].overMin(), range[i].belowMax(), range[i].max, range[i].random()));
    average.push(range[i].average());
  }
  for (var i = 0; i < edge[0].length; i++) {
    for (var j = 0; j < edge[1].length; j++) {
      for (var k = 0; k < edge[2].length; k++) {
        test.push(Triangle.newTriangle(edge[0][i], edge[1][j], edge[2][k]));
      }
    }
  }
  return test;
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
    this.tableData2.push({"type": "1->2->3->4->5->6->7->13->16->18->20"});
    this.tableData2.push({"type": "1->2->3->5->7->13->14->12"});
    this.tableData2.push({"type": "1->2->3->5->7->13->14->15"});
    this.tableData2.push({"type": "1->3->4->5->7->13->16->17->12"});
    this.tableData2.push({"type": "1->3->4->5->7->13->16->17->15"});                   //原来是1->2->4->5->7->13->16->17->15，更正下
    this.tableData2.push({"type": "1->3->5->6->7->13->16->18->19->12"});
    this.tableData2.push({"type": "1->3->5->6->7->13->16->18->19->15"});
    this.tableData2.push({"type": "1->3->5->7->8->12"});
    this.tableData2.push({"type": "1->3->5->7->8->9->12"});
    this.tableData2.push({"type": "1->3->5->7->8->9->10->12"});
    this.tableData2.push({"type": "1->3->5->7->8->9->10->11"});
  },
  methods: {
    // 提交表单，生成测试用例
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          range = new Array(Edge.newRange(this.form.aMin, this.form.aMax),
           Edge.newRange(this.form.bMin, this.form.bMax),
           Edge.newRange(this.form.cMin, this.form.cMax));
          switch(this.form.type) {
            case '一般边界':
              this.tableData = buildNormalTest();
              break;
            case '最坏情况':
              this.tableData = buildBadTest();
              break;
            case '健壮边界':
              this.tableData = buildStrongTest();
              break;
            case '随机测试':
              this.tableData = buildRandomTest();
              break;
            case '健壮最坏情况':
              this.tableData = buildWorstTest();
              break;
          }
        } else {
          // this.$message.error('请输入合法的取值范围！');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.tableData = [];
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
      }, 200);
    },
  }
});
