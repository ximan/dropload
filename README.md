# dropload

移动端下拉刷新、上拉加载更多插件

## 背景介绍

根据网友提议，默认内容过少时，自动触发加载下方内容，只会加载一次，如果内容还不够一屏，无法继续触发。并且修复`lock()`，增加参数可以手动锁定上方或者下方。

[历史背景介绍](Intro.md)

## 最新版本

### 0.7.0(151225)

* 增加默认判断内容过少自动加载下方内容
* 优化`lock()`，默认智能判断，如加参数`lock('up')`锁定上方，如加参数`lock('down')`锁定下方

[所有更新日志](Changelog.md)

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

|      参数      |             说明            |
|----------------|----------------------------|
| `lock()`       | 智能锁定，锁定上一次加载的方向 |
| `lock('up')`   | 锁定上方                    |
| `lock('down')` | 锁定下方                    |

`unlock()` 解锁dropload

`noData()` 无数据

`resetload()` 重置。每次数据加载完，必须重置

## dropload使用交流群

[群号：290725368，点击加群](http://shang.qq.com/wpa/qunwpa?idkey=2c58606fdfb5d6be4021a678e1506fdbbbc480aabdca0eeb115c2f4ff5bc69ee)