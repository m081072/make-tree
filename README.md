```javascript
describe("make tree", function(){
    describe("#make()", function(){
        it("should return empty tree for empty list", function(){
            var results = mt.make([]);
            expect(results).to.deep.equal({});
        });
        it("should return single new node for single begin/end pair", function(){
            var results = mt.make([{"command":"begin","value":"nodeName"}, {"command":"end","value":"nodeName"}]);
            expect(results).to.deep.equal({"nodeName":{}});
        });
        it("should return two nested nodes for nested begin/end pair", function(){
            var results = mt.make([{"command":"begin","value":"nodeName"},{"command":"begin","value":"nestedNodeName"}, {"command":"end","value":"nestedNodeName"}, {"command":"end","value":"nodeName"}]);
            expect(results).to.deep.equal({"nodeName":{"nestedNodeName":{}}});
        });
        it("should return two nested nodes with a value for nested begin/end pair and a value setter", function(){
            var results = mt.make([{"command":"begin","value":"nodeName"},{"command":"begin","value":"nestedNodeName"}, {"command":"set","name":"someProperty","value":"someValue"}, {"command":"end","value":"nestedNodeName"}, {"command":"end","value":"nodeName"}]);
            expect(results).to.deep.equal({"nodeName":{"nestedNodeName":{"someProperty":"someValue"}}});
        });
    });
});
```