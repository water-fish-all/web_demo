import react from "react";
import "./E1.css";
import {Button, Result} from "antd";
import { Row, Col, Input, Drawer, List} from 'antd';

class Example1 extends react.PureComponent{
    //生命周期
    constructor() {
        super();
        console.log( "constructor excute！");
        this.state = {
            inputStr:"",
            drawVisible: false,
            historyData: [],
        }
        this.date=1;
    }
    componentDidMount() {
        console.log( "componentDidMount excute！");
    }
    handleResultArraySum=(arr)=>{
        let i=0
        let sum=0;
        for(i=0;i<arr.length;i++){
            sum=sum+parseFloat(arr[i]);
        }
        return sum;
    }
    handleCalculate=(operString)=>{
        let arr1 = operString.split(" ");
        console.log(arr1);
        let resultArray = [];
        let i = 0;
        for(i=0;i<arr1.length;i++){
            let CurrentItem = arr1[i];
            let res = 0;
            let firstnum = 0;
            let secoundnum = 0;
            let sum=0;
            switch (CurrentItem) {
                case "*":
                    firstnum = resultArray.pop();
                    secoundnum = arr1[i+1];
                    console.log("----------");
                    console.log(firstnum);
                    console.log(secoundnum);
                    console.log("----------");
                    i=i+1;
                    res = parseFloat(firstnum) * parseFloat(secoundnum);
                    resultArray.push(res);
                    console.log();
                    break;
                case "/":
                    firstnum = resultArray.pop();
                    secoundnum = arr1[i+1];
                    console.log("----------");
                    console.log(firstnum);
                    console.log(secoundnum);
                    console.log("----------");
                    i=i+1;
                    res = parseFloat(firstnum) / parseFloat(secoundnum);
                    resultArray.push(res);
                    console.log(resultArray);
                    break;
                case "-":
                    res = 0-arr1[i+1];
                    resultArray.push(res);
                    i=i+1;
                    console.log();
                    break;
                // case "=":
                //     sum=this.handleResultArraySum(resultArray);
                //     console.log(sum)
                //     break;
                default:
                    if(!isNaN(CurrentItem)){
                        resultArray.push(CurrentItem);
                        console.log(resultArray);
                    }
                    break;
            }
        }
        let sum=this.handleResultArraySum(resultArray);
        return sum;
        console.log(sum)
    }
    handleAC=()=>{
        console.log("AC_click");
        let str = "3 * 4 / 2 - 4 / 2 =";
        this.handleCalculate(str);
    }
    handleInput=(e)=>{
        console.log(e.target.innerText);
        let newInput=e.target.innerText;
        let CurrentInput= "";
        switch (newInput){
            case "+":
            case "-":
            case "*":
            case "/":
            case "%":
            case ".":
            case "=":
                CurrentInput = this.state.inputStr + " " + newInput+ " ";
                break;
            default:
                if(!isNaN(newInput)){
                    CurrentInput = this.state.inputStr + newInput;
                }
                break;
        }
        this.setState({inputStr:CurrentInput});

    }
    handleEquation=()=>{
        let result = this.handleCalculate(this.state.inputStr);
        let CurrentStr = this.state.inputStr + " = " + result;
        this.setState({inputStr:CurrentStr});
        let arr = [];
        arr.push(CurrentStr);
        let oldData = [];
        oldData=JSON.parse(localStorage.getItem("result"));
        arr=[...arr,...oldData];
        localStorage.setItem("result",JSON.stringify(arr));
    }
    handleHistory=()=>{
        let data = JSON.parse(localStorage.getItem("result"));
        this.setState({
            drawVisible:true,
            historyData:data,
        });
    }
    onClose=()=>{
        this.setState({drawVisible:false});
    }
    render() {
        console.log( "render excute！");
        return(
            <div id="cal_main">
                <Row>
                        <Input id="col_row1" value={this.state.inputStr} placeholder=" please click the keyboard" disabled/>
                </Row>
                <Row>
                    <Col span={6}>
                        <Button className="col_row2" onClick={this.handleAC}>AC</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row2">BACK</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row2" onClick={this.handleInput}>%</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row3" onClick={this.handleHistory}>History</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Button className="col_row4" onClick={this.handleInput}>1</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row4" onClick={this.handleInput}>2</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row4" onClick={this.handleInput}>3</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row3" onClick={this.handleInput}>*</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Button className="col_row4" onClick={this.handleInput}>4</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row4" onClick={this.handleInput}>5</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row4" onClick={this.handleInput}>6</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row3" onClick={this.handleInput}>+</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Button className="col_row4" onClick={this.handleInput}>7</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row4" onClick={this.handleInput}>8</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row4" onClick={this.handleInput}>9</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row3" onClick={this.handleInput}>-</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Button className="col_row4" onClick={this.handleInput}>0</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row3" onClick={this.handleEquation}>=</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row3" onClick={this.handleInput}>/</Button>
                    </Col>
                </Row>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.drawVisible}
                >
                    <List
                        size="large"
                        header={<div>Header</div>}
                        footer={<div>Footer</div>}
                        bordered
                        dataSource={this.state.historyData}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Drawer>

            </div>
        );
    }
}

export default Example1;