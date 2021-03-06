"use strict";
const expect = require("chai").expect;
const mt = require("../lib/makeTree.js");


describe("make tree", () => {
    describe("#make()", () => {
        it("should return empty tree for empty list", () => {
            let results = mt.make([]);
            expect(results).to.deep.equal({});
        });
        it("should return single new node for single begin/end pair", () => {
            let results = mt.make([
                {"command":"begin","value":"nodeName"},
                {"command":"end","value":"nodeName"}]);
            expect(results).to.deep.equal({"nodeName":{}});
        });
        it("should return two nested nodes for nested begin/end pair", () => {
            let results = mt.make([
                {"command":"begin","value":"nodeName"},
                    {"command":"begin","value":"nestedNodeName"},
                    {"command":"end","value":"nestedNodeName"},
                {"command":"end","value":"nodeName"}]);
            expect(results).to.deep.equal({"nodeName":{"nestedNodeName":{}}});
        });
        it("should return two nested nodes with a value for nested begin/end pair and a value setter", () => {
            let results = mt.make([
                {"command":"begin","value":"nodeName"},
                    {"command":"begin","value":"nestedNodeName"},
                        {"command":"set","name":"someProperty","value":"someValue"},
                    {"command":"end","value":"nestedNodeName"},
                {"command":"end","value":"nodeName"}]);
            expect(results).to.deep.equal({
                "nodeName":{
                    "nestedNodeName":{
                        "someProperty":"someValue"}}});
        });
        it("should return two nested nodes with a value and another nested node", () => {
            let results = mt.make([
                {"command":"begin","value":"nodeName"},
                    {"command":"begin","value":"nestedNodeName"},
                    {"command":"set","name":"someProperty","value":"someValue"},
                        {"command":"begin","value":"n3"},
                        {"command":"end","value":"n3"},
                    {"command":"end","value":"nestedNodeName"},
                {"command":"end","value":"nodeName"}]);
            expect(results).to.deep.equal({
                "nodeName":{
                    "nestedNodeName":{
                        "someProperty":"someValue",
                        "n3":{}}}});
        });
        it("should return peer nodes", () => {
            let results = mt.make([
                {"command":"begin","value":"n1"},
                {"command":"end","value":"n1"},
                {"command":"begin","value":"n2"},
                {"command":"end","value":"n2"}]
            );
            expect(results).to.deep.equal({
                "n1":{},
                "n2":{}});
        });
        it("should return nested and peer nodes", () => {
            let results = mt.make([
                {"command":"begin","value":"n1"},
                    {"command":"begin","value":"n2"},
                    {"command":"end","value":"n2"},
                {"command":"end","value":"n1"},
                {"command":"begin","value":"n3"},
                {"command":"end","value":"n3"}
                ]
            );
            expect(results).to.deep.equal({
                "n1":{
                    "n2":{}},
                "n3":{}});
        });
    });
});