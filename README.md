# sh-vue-boilerplate

sh-vue-boilerplate frontend team common lib

# 编码规范

1、每句代码后必须追加 “;”，除了三目运算，禁止简写，必须加上{}，不正确的写法 if(true) console.log("test");

2、变量、常量、类命名必须按以下规则，并且变量名要有意义：
    1)、变量：骆驼🐫峰的命名 且 首字母小写，例如：const isVisiable = false;
    2)、常量：必须全大写命名，且单词以 _ 分割，例如：const PLACE_TYPE = 'hotel';
    3)、类名：骆驼🐫峰的命名 且 首字母大写，例如：const AgeAndSex = function(age, sex){};

3、空格的定义
    1)、声明变量 = 前后有空格
    2)、每个变量的赋值声明以 "," 结束后，换行进行下一个变量赋值声明，不包含这些情况，如果变量不进行赋值，放置最后一行，且变量之间不需要换行，当一组变量完成后，空一行编写其他代码，
    例如：
    const value = 1,
            json = JSON.parse(response),
            type, html;

4、在函数内部，局部变量的声明必须置于顶端，其实JS解析器也会提升变量至顶端

5、块内函数 必须 用局部变量声明，例如：
    const call = function(name) {
        var test; // 推荐写法
        if(name === 'name'){
            test = function(){
                console.log("test")
            }
        }
        test && test();
    }

6、禁止使用eval，采用 $.parseJSON 
    原因：
    1)、有注入风险，比如ajax响应的值被劫持
    2)、不方便调试
    3)、eval是一个执行效率低的函数

7、推荐使用 function 进行类的定义，不推荐继承
    例如：
    function Person(name) {
        // 推荐将this放到局部变量that
        var that = this;
        that.name = name;
    }
    Person.prototype.sayName = function() {
        alert(this.name);
    };
    const person = new Person("Nicholas");

    实现继承推荐写法，例如：
    function A(){
        //...
    }
    function B(){
        //...
    }
    B.prototype = new A();
    // 原则上，记得把这句话加上
    B.prototype.constructor = B;

8、使用局部变量时，推荐缓存反复查找的对象，例如：const data = this.a.b.c.d;

9、当需要缓存 this 时必须使用 that 变量进行缓存

10、函数超过100行，就要考虑是否将函数拆分为多个函数

11、所有组件必须使用propTypes约束传入属性

12、字符串处理统一使用 模板字符串(TemplateString)

13、推荐使用async await，特殊情况下使用Promise

14、代码重复两次以上，考虑提取为公共函数

15、......


# CSS 规范

1、请参考BEM规范   https://bemcss.com/


# API 规范

1、接口不能多给字段

2、接口响应不能超过100ms

3、命名需要规范，一目了然

4、某些场景，API已经给了结果，不需要再次给结果时，前端需要做缓存，不要再次请求接口

5、阿里云静态资源地址应使用 食行 代理后的地址，比如：https://static1.34580.cn/card-collection/card-selected.png

6、前端渲染慢的地方需要有一个范围，比如在多少毫秒范围内的  影响性能的地方需要给一个规范

7、......

