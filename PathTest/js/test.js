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
var Edge = {
  newRange: function(min, max) {
    var edge = {};
    // 值域最小值
    edge.min = min;
    // 值域最大值
    edge.max = max;
    // 取值的最小粒度
    edge.threshold = 1;
    // 高于值域最大值
    edge.overMax = function() {
      if (Number.MAX_VALUE - this.threshold > this.max) {
        return this.max + this.threshold;
      } else {
        return Number.MAX_VALUE;
      }
    }
    // 低于值域最大值
    edge.belowMax = function() {
      if (this.max - this.threshold > this.min) {
        return this.max - this.threshold;
      } else {
        return this.min;
      }
    }
    // 值域中值
    edge.average = function() {
      return parseInt((this.max + this.min) / 2);
    }
    // 高于值域最小值
    edge.overMin = function() {
      if (this.min + this.threshold < this.max) {
        return this.min + this.threshold;
      } else {
        return this.max;
      }
    }
    // 低于值域最小值
    edge.belowMin = function() {
      if (this.min - this.threshold > 0) {
        return this.min - this.threshold;
      } else {
        return 0;
      }
    }
    // 值域内随机值
    edge.random = function() {
      var range = this.max - this.min;
      var rand = Math.random();
      return this.min + Math.round(rand * range);
    }
    // 判断某一长度是否在值域范围内
    edge.inRange = function(x) {
      if (x >= this.min && x <= this.max) {
        return true;
      } else {
        return false;
      }
    }
    return edge;
  }
}

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
