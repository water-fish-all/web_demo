import react from "react";
import "./E1.css";
import {Button} from "antd";
import { Row, Col } from 'antd';

class Example1 extends react.PureComponent{
    //生命周期
    constructor() {
        super();
        console.log( "constructor excute！");
        this.date=1;
    }
    componentDidMount() {
        console.log( "componentDidMount excute！");
    }

    render() {
        console.log( "render excute！");
        return(
            <div id="cal_main">
                <Row>
                    <div className="col_row1">这是一个输出框</div>
                    <Col span={6}>
                        <Button className="col_row2">AC</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row2">BACK</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row2">%</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row3">/</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Button className="col_row1">1</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row1">2</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row1">3</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row3">*</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Button className="col_row1">4</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row1">5</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row1">6</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row3">+</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Button className="col_row1">7</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row1">8</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row1">9</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row3">-</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Button className="col_row1">0</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row1">.</Button>
                    </Col>
                    <Col span={6}>
                        <Button className="col_row3">=</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Example1;