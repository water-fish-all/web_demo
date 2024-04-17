import react from "react";
import "./Work.css";
import {Button } from "antd";

class Work extends react.PureComponent{
    //生命周期
    constructor() {
        super();
        console.log( "constructor excute！");
        }
    componentDidMount() {
        console.log( "componentDidMount excute！");
    }
    handleClick=()=>{
        console.log("Click");
    }
    render() {
            console.log( "render excute！");
            return(
                    <div>
                        <div>内容1</div>
                        <div>内容2</div>
                        <div>内容3</div>
                        <Button className="C2" onClick={this.handleClick}>点击</Button>
                    </div>
        );
    }
}

export default Work;