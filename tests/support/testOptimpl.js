module("support/optimpl.js");

test("exports", function() {
	checkExports("support/optimpl", ["NullCancel", "createOptimizedImplementation"]);
});

asyncTest("non-existant", function() {
	function cb(result) {
		QUnit.start();
		strictEqual(result, "non-worker");
	};
	const {createOptimizedImplementation} = require("support/optimpl");
	var impl = createOptimizedImplementation(
		"non-existant",
		function(impl) function(cb) impl(null, cb),
		function() cb("non-worker")
		);
	setTimeout(function() impl.callImpl(cb), 50);
});

asyncTest("worker", function() {
	function cb(result) {
		QUnit.start();
		strictEqual(result, "worker");
	};
	const {createOptimizedImplementation} = require("support/optimpl");
	var impl = createOptimizedImplementation(
		"testsupport/worker",
		function(impl) function(cb) impl({}, cb),
		function() cb("non-worker")
		);
	setTimeout(function() impl.callImpl(cb), 50);
});

asyncTest("workerThrow", function() {
	function cb(result) {
		QUnit.start();
		strictEqual(result, "non-worker");
	};
	const {createOptimizedImplementation} = require("support/optimpl");
	var impl = createOptimizedImplementation(
			"testsupport/workerThrow",
			function(impl) function(cb) impl({}, cb),
			function() cb("non-worker")
	);
	setTimeout(function() impl.callImpl(cb), 50);
});

asyncTest("workerFail", function() {
	function cb(result) {
		QUnit.start();
		strictEqual(result, "non-worker");
	};
	const {createOptimizedImplementation} = require("support/optimpl");
	var impl = createOptimizedImplementation(
			"testsupport/workerFail",
			function(impl) function(cb) impl({}, cb),
			function() cb("non-worker")
	);
	setTimeout(function() impl.callImpl(cb), 50);
});
