/**
 * 单元测试示例
 */

import {
    thkHost,
    api1Host,
    activitySummaryApi,
    enterPasswordApi
} from "../apiUrl";
const { chai, expect, assert, should, printLog } = require("./tools");

// eslint-disable-next-line no-undef
describe("口令红包项目-获取红包概述", () => {
    // eslint-disable-next-line no-undef
    it("activitySummary api test", done => {
        chai.request(thkHost)
            .get(activitySummaryApi)
            .end(function(err, res) {
                const data = printLog(err, res);
                expect(res).to.have.status(200);
                assert.equal(0, data.target.deleteFlag);
                done();
            });
    });
});

// eslint-disable-next-line no-undef
describe("口令红包项目-领取红包", () => {
    // eslint-disable-next-line no-undef
    it("enterPassword api test", done => {
        chai.request(api1Host)
            .post(enterPasswordApi)
            .end(function(err, res) {
                const data = printLog(err, res);
                should();
                expect(res).to.have.status(200);
                data.should.be.an("object");
                done();
            });
    });
});
