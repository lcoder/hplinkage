基于jquery的城市地区地址联动js插件

调用方法：
$("#selector").hpLinkage({
    url:"/public/js/area.json" ,
    prov:{ selector: ".prov" , defaultvalue: provinceId },
    city:{ selector: ".city" , defaultvalue: cityId },
    dist:{ selector: ".dist" , defaultvalue: distId },
    required: false
});


参数说明：
    1、url 联动数据的来源，格式必须为:
        {"area_no":110000,"parent_no":1,"area_name":"北京","area_level":2,"area_info":"北京","subAreas":[]} 此对象的数组，subAreas数组的成员也是为此对象。
    2、prov ：省的选择器 ，defaultvalue：默认选中的值
    3、city ：城市选择器 ，defaultvalue：默认选中的值
    4、dist ：地区选择器 ，defaultvalue：默认选中的值
    5、required  ： 每个选项是否可以为空。即默认不选中城市。

插件不复杂，可查看源码体会参数的作用。


此项目还包含了另外一个插件（cityselect-源码），本插件也是相当于模仿了一下，代码用委托事件重写了下，地区库数据格式换成了更加动态选择了。

缺点也是很明显的：
    1、地址数据格式不灵活，插件强烈依赖于地址数据库格式。