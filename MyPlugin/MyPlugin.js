//my test webpack plugin
class MyPlugin {
  apply(compiler) {
    // Tap into compilation hook which gives compilation as argument to the callback function
    compiler.hooks.compilation.tap("MyPlugin", compilation => {
      // Now we can tap into various hooks available through compilation
      compilation.hooks.optimize.tap("MyPlugin", () => {
        console.log("Assets are being optimized.");
      });
    });
    //event hooks
    compiler.plugin("done", function() {
      console.log("final done");
    });

    compiler.hooks.make.tapAsync("MyPlugin", (compilation, callback) => {
      compilation.hooks.buildModule.tap("MyPlugin", callback => {
        console.log("compliations");
      });
    });

    compiler.hooks.run.tapPromise("MyPlugin", (source, target, routesList) => {
      console.log("start");
      return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        console.log("Asynchronously tapping the run hook with a delay.");
      });
    });
  }
}

module.exports = MyPlugin;
