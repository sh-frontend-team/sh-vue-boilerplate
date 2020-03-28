# sh-vue-boilerplate

```
1. 该脚手架是从 0-1 搭建起来，没有使用 vue-cli，而是使用 webpack，便于更灵活的定制化的开发。因为只是针对组件库的打包处理，所以没有使用 vue 官方推荐的 vue-cli 脚手架，并且这么做有利于开发人员理解前端项目如何从 0-1 搭建一个组件库。
2. 该脚手架包括了两个主要部分，组件库源码 src 和使用示例 examples，通过运行项目可以查看示例功能和效果。
3. 该脚手架已经做了必要的性能优化，如果有更好的建议，随时欢迎 👏 来改进。
4. 该脚手架同时支持 ES 写法、TS 写法，作者可根据自己喜好或者擅长进行开发。
5. 期望大家一起来参与，维护一个属于我们自己的产品，对于公司和个人都是宝贵的财富。
```

## 编码规范

> -   第一部分：工具

```

1、代码风格检测工具 eslint，推荐使用两个扩展包： 1)、airbnb 规范标准 https://github.com/airbnb/javascript 2)、vue 项目使用 eslint-plugin-vue https://eslint.vuejs.org/user-guide/#installation

2、代码格式化工具 prettier 1)、保持团队代码风格统一，我们可以通过 eslint-plugin-prettier 插件添加对 prettier 作为 ESLint 的规则配置

3、其他团队规范 1)、京东凹凸实验室代码规范 https://guide.aotu.io/docs/index.html 2)、clean-code-javascript https://github.com/ryanmcdermott/clean-code-javascript?utm_source=gold_browser_extension 3)、Airbnb 团队 https://github.com/airbnb/javascript 4)、百度团队 https://github.com/fex-team/styleguide

```

> -   第二部分：编码

```
1、每句代码后必须追加 “;”，除了三目运算，禁止简写，必须加上{}，不正确的写法 if(true) console.log("test");

2、变量、常量、类命名必须按以下规则，并且变量名要有意义： 1)、变量：骆驼 🐫 峰的命名 且 首字母小写，例如：const isVisiable = false; 2)、常量：必须全大写命名，且单词以 \_ 分割，例如：const PLACE_TYPE = 'hotel'; 3)、类名：骆驼 🐫 峰的命名 且 首字母大写，例如：const AgeAndSex = function(age, sex){};

3、空格的定义 1)、声明变量 = 前后有空格 2)、每个变量的赋值声明以 "," 结束后，换行进行下一个变量赋值声明，不包含这些情况，如果变量不进行赋值，放置最后一行，且变量之间不需要换行，当一组变量完成后，空一行编写其他代码，
例如：
const value = 1,
json = JSON.parse(response),
type, html;

4、在函数内部，局部变量的声明必须置于顶端，其实 JS 解析器也会提升变量至顶端

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

6、禁止使用 eval，采用 \$.parseJSON，原因： 1.有注入风险，比如 ajax 响应的值被劫持 2.不方便调试 3.eval 是一个执行效率低的函数

7、推荐使用 function 进行类的定义，不推荐继承
例如：
function Person(name) {
// 推荐将 this 放到局部变量 that
	var that = this;
	that.name = name;
}
Person.prototype.sayName = function() {
	alert(this.name);
};
const person = new Person("Nicholas");
//实现继承推荐写法，例如：
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

10、函数超过 100 行，就要考虑是否将函数拆分为多个函数

11、所有组件必须使用 propTypes 约束传入属性

12、字符串处理统一使用 模板字符串(TemplateString)

13、推荐使用 async await，特殊情况下使用 Promise

14、代码重复两次以上，考虑提取为公共函数

15、......

```

## CSS 规范

> -   请参考 BEM 规范 https://bemcss.com/

## API 规范

```
1、接口不能多给字段

2、接口响应不能超过 100ms

3、命名需要规范，一目了然

4、某些场景，API 已经给了结果，不需要再次给结果时，前端需要做缓存，不要再次请求接口

5、阿里云静态资源地址应使用 食行 代理后的地址，比如：https://static1.34580.cn/card-collection/card-selected.png

6、前端渲染慢的地方需要有一个范围，比如在多少毫秒范围内的 影响性能的地方需要给一个规范

7、......
```

## 单元测试

```
yarn run apitest & yarn run test

```
