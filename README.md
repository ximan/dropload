# dropload

移动端下拉刷新、上拉加载更多插件

## 背景介绍

### 0.6.0(151218)

根据网友提议增加提前加载距离threshold，适用于上拉加载更多功能。默认显示到加载区高度2/3时加载。

### 0.5.0(151217)

感谢交流群里网友各种吐槽上拉加载抖动。发现`touch`和`scroll`同时作用会发生抖动，干脆把上拉加载改为滑到底部自动加载。如依旧需要上拉加载效果，可以下载[releases0.4.0版本](https://github.com/ximan/dropload/releases/tag/0.4.0)。

### 0.4.0(150927)

根据网友提供demo，修改至适用大部分普通列表网页，终于可以大规模使用啦！

### 0.3.0(150410)

项目中通知列表有可编辑、删除等状态，需要锁定和解锁下拉刷新功能。

### 0.2.0(150325)

公司项目APP内嵌页需要下拉刷新，终于可以实战了！这一版大家可以开始使用和反馈。

### 0.1.0(141024)

虽然有**上拉加载更多**的需求，但一直都是用的scroll方法。写**dropload**完全是为了练习插件写法和touch的使用。

## 示例

![扫一扫](examples/load-bottom.png)
[DEMO1，加载底部](http://ximan.github.io/dropload/examples/load-bottom.html)

![扫一扫](examples/load-top-bottom.png)
[DEMO2，加载顶部、底部](http://ximan.github.io/dropload/examples/load-top-bottom.html)

![扫一扫](examples/product-list.png)
[DEMO3，固定布局，加载顶部、底部](http://ximan.github.io/dropload/examples/product-list.html)

## 依赖

Zepto 或者 jQuery 1.7以上版本，推荐jQuery 2.x版本（二者不要同时引用）

## 使用方法

引用css和js

    <link rel="stylesheet" href="../dist/dropload.css">
    <script src="../dist/dropload.min.js"></script>

````
$('.element').dropload({
    scrollArea : window,
    loadDownFn : function(me){
        $.ajax({
            type: 'GET',
            url: 'json/more.json',
            dataType: 'json',
            success: function(data){
                alert(data);
                // 每次数据加载完，必须重置
                me.resetload();
            },
            error: function(xhr, type){
                alert('Ajax error!');
                // 即使加载出错，也得重置
                me.resetload();
            }
        });
    }
});
````

进阶用法详见上面DEMO2，DEMO3

## 参数列表

|    参数     |     说明     |  默认值 |      可填值     |
|------------|-------------|--------|----------------|
| scrollArea | 滑动区域      | 绑定元素自身 | window |
| domUp      | 上方DOM      | {<br/>domClass : 'dropload-up',<br/>domRefresh : '&lt;div class="dropload-refresh"&gt;↓下拉刷新&lt;/div&gt;',<br/>domUpdate  : '&lt;div class="dropload-update"&gt;↑释放更新&lt;/div&gt;',<br/>domLoad : '&lt;div class="dropload-load"&gt;○加载中...&lt;/div&gt;'<br/>} | 数组 |
| domDown    | 下方DOM      | {<br/>domClass : 'dropload-down',<br/>domRefresh : '&lt;div class="dropload-refresh"&gt;↑上拉加载更多&lt;/div&gt;',<br/>domLoad : '&lt;div class="dropload-load"&gt;○加载中...&lt;/div&gt;',<br/>domNoData : '&lt;div class="dropload-noData"&gt;暂无数据&lt;/div&gt;'<br/>}  | 数组 |
| distance   | 拉动距离      | 50 | 数字 |
| threshold  | 提前加载距离   | 加载区高度2/3 | 正整数 |
| loadUpFn   | 上方function | 空  | function(me){<br/>//你的代码<br/>me.resetload();<br/>} |
| loadDownFn | 下方function | 空  | function(me){<br/>//你的代码<br/>me.resetload();<br/>} |

## API

暴露一些功能，可以让dropload更灵活的使用

`lock()` 锁定dropload

`unlock()` 解锁dropload

`noData()` 无数据

## 最新版本

### 0.6.0(151218)

* 增加参数threshold提前加载距离

[所有更新日志](Changelog.md)

## dropload使用交流群

[群号：290725368，点击加群](http://shang.qq.com/wpa/qunwpa?idkey=2c58606fdfb5d6be4021a678e1506fdbbbc480aabdca0eeb115c2f4ff5bc69ee)