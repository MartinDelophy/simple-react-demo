import * as React from "react";
import * as ReactDOM from "react-dom";


var f = React.createFactory("div");

var a = {t:function(){return 1}}

const {t} = a;


ReactDOM.render(<div>132</div>, document.getElementById("root"));
function newFunction(): any {
    return React.isValidElement(f);
}
console.log(a::t())

