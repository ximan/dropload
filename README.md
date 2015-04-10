# dropload

移动端下拉刷新、上拉加载更多插件

## 背景介绍

### 0.3.0(150410)

项目中通知列表有可编辑、删除等状态，需要锁定和解锁下拉刷新功能。

### 0.2.0(150325)

公司项目APP内嵌页需要下拉刷新，终于可以实战了！这一版大家可以开始使用和反馈。

### 0.1.0(141024)

虽然有**上拉加载更多**的需求，但一直都是用的scroll方法。写**dropload**完全是为了练习插件写法和touch的使用。

## 示例

![扫一扫](examples/product-list.png)
[DEMO链接](http://ximan.github.io/dropload/examples/product-list.html)

## 依赖

Zepto 或者 jQuery

## 使用方法

````
$('.element').dropload({
    loadUpFn : function(me){
        $.ajax({
            type: 'GET',
            url: 'json/update.json',
            dataType: 'json',
            success: function(data){
                alert(data);
                // 代码执行后必须重置
                me.resetload();
            },
            error: function(xhr, type){
                alert('Ajax error!');
                me.resetload();
            }
        });
    },
    loadDownFn : function(me){
        $.ajax({
            type: 'GET',
            url: 'json/more.json',
            dataType: 'json',
            success: function(data){
                alert(data);
                // 代码执行后必须重置
                me.resetload();
            },
            error: function(xhr, type){
                alert('Ajax error!');
                me.resetload();
            }
        });
    }
});
````

CSS样式请自行美化

## 参数列表

|    参数     |     说明     |  默认值 |      可填值     |
|------------|-------------|--------|----------------|
| domUp      | 上方DOM      | {<br/>domClass : 'dropload-up',<br/>domRefresh : '&lt;div class="dropload-refresh"&gt;↓下拉刷新&lt;/div&gt;',<br/>domUpdate  : '&lt;div class="dropload-update"&gt;↑释放更新&lt;/div&gt;',<br/>domLoad : '&lt;div class="dropload-load"&gt;○加载中...&lt;/div&gt;'<br/>} | 数组 |
| domDown    | 下方DOM      | {<br/>domClass : 'dropload-down',<br/>domRefresh : '&lt;div class="dropload-refresh"&gt;↑上拉加载更多&lt;/div&gt;',<br/>domUpdate  : '&lt;div class="dropload-update"&gt;↓释放加载&lt;/div&gt;',<br/>domLoad : '&lt;div class="dropload-load"&gt;○加载中...&lt;/div&gt;'<br/>}  | 数组 |
| distance   | 拉动距离      | 50 | 数字 |
| loadUpFn   | 上方function | 空  | function(me){<br/>//你的代码<br/>me.resetload();<br/>} |
| loadDownFn | 下方function | 空  | function(me){<br/>//你的代码<br/>me.resetload();<br/>} |

## API

暴露一些功能，可以让dropload更灵活的使用

`lock()` 锁定dropload

`unlock()` 解锁dropload

## 最新版本

### 0.3.0(150410)

* 增加`lock()` 和`unlock()` API
* 修复拉动加载时还可拉动bug

[所有更新日志](Changelog.md)