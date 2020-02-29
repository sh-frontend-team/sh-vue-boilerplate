const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should;

function printLog(err, res) {
    if (err) console.log(JSON.stringify(err));
    if (res) {
        const data = JSON.parse(res.text);
        console.log(data);
        return data;
    }
    return {};
}

module.exports = {
    chai,
    expect,
    assert,
    should,
    printLog
};
