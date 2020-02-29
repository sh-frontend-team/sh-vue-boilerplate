/**
 * 单元测试例子
 * 基础工具类 date.js
 */

const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should;
const http = chai.http
const { formatFriendlyDate } = require("../../baseUtils/date.js");

describe("比对友好的时间格式是否一致", function() {
    it("是否一致", function() {
        const date = new Date();
        assert.equal(formatFriendlyDate(date, "YYYY-MM-DD"), "刚刚");
    });
});


/**
 * 单元测试 接口测试
 */