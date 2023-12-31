import react from "react";
import "./E2.css"
import {GaodeMap, getData} from '@antv/l7';
import { LarkMap, PointLayer, MapThemeControl} from '@antv/larkmap';
import {Drawer, Descriptions, List, Row} from 'antd';

class Example2 extends react.PureComponent{
    constructor() {
        super();
        this.state= {
            pointData:[],
            drawVisible:false,
            showData1:"",
            showData2:"",
            showData3:"",
            showData4:"",
            showData5:"",
            showData6:"",
        }
    }
    componentDidMount() {
        fetch("http://flightapi.xiexianbo.xin/airPort/listAll")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log(data.data.data);
                this.setState({pointData:data.data.data})
            });
        console.log("excute componentDidMount");
    }
    mapInstance = new GaodeMap({
        pitch: 0,
        style: 'light',
        center: [104.288144, 31.239692],
        zoom: 4.4,
        token: '6a63d711b3ed4a18b484280b996c6d19',
        // plugin: [], // 可以不设置
    });
    options={
        autoFit: false,
        shape: 'circle',
        size: {
            field: 'flightNumber',
            value: ({ flightNumber }) => parseInt(Math.log(flightNumber)),
        },
        color: {
            field: 'flightNumber',
            value: ['#0f9960', '#33a02c', '#377eb8'],
        },
        state: {
            active: true,
        },
        style: {
            opacity: 0.8,
        },
    }
    handleClick=(e)=>{
        console.log(e.feature.IATACode);

        let newData1=e.feature.IATACode;
        localStorage.setItem("newData1",JSON.stringify(newData1));
        let data1= JSON.parse(localStorage.getItem("newData1"));

        let newData2=e.feature.aptCcity;
        localStorage.setItem("newData2",JSON.stringify(newData2));
        let data2= JSON.parse(localStorage.getItem("newData2"));

        let newData3=e.feature.aptCname;
        localStorage.setItem("newData3",JSON.stringify(newData3));
        let data3= JSON.parse(localStorage.getItem("newData3"));

        let newData4=e.feature.flightNumber;
        localStorage.setItem("newData4",JSON.stringify(newData4));
        let data4= JSON.parse(localStorage.getItem("newData4"));

        let newData5=e.feature.longitude;
        localStorage.setItem("newData5",JSON.stringify(newData5));
        let data5= JSON.parse(localStorage.getItem("newData5"));

        let newData6=e.feature.latitude;
        localStorage.setItem("newData6",JSON.stringify(newData6));
        let data6= JSON.parse(localStorage.getItem("newData6"));

        this.setState({
            drawVisible:true,
            showData1:data1,
            showData2:data2,
            showData3:data3,
            showData4:data4,
            showData5:data5,
            showData6:data6,
        });
    }
    onClose=()=>{
        this.setState({drawVisible:false});
    }
    render() {
        let pointSource={
            data: this.state.pointData,
            parser: { type: 'json', x: 'longitude', y: 'latitude' },
        }
        return(
            <div>
                <LarkMap
                    id="container"
                    map={this.mapInstance}
                    style={{height:"800px"}}
                    mapType="Gaode"
                >
                    <MapThemeControl />
                    <PointLayer {...this.options} source={pointSource} onClick={this.handleClick}/>
                </LarkMap>

                <Drawer
                    title="信息展示"
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.drawVisible}
                >

                    <Descriptions
                        title="当前所在机场基本信息">
                        <Descriptions.Item label="机场名称" span={4}>{this.state.showData3}机场</Descriptions.Item>
                        <Descriptions.Item label="所在城市" span={4}>{this.state.showData2}</Descriptions.Item>
                        <Descriptions.Item label="国际航空机场代码" span={4}>{this.state.showData1}</Descriptions.Item>
                        <Descriptions.Item label="当日航班数量" span={4}>{this.state.showData4}</Descriptions.Item>
                        <Descriptions.Item label="经度" span={4}>{this.state.showData5}°</Descriptions.Item>
                        <Descriptions.Item label="纬度" span={4}>{this.state.showData6}°</Descriptions.Item>
                    </Descriptions>,

                </Drawer>
            </div>
        );
    }
}
export default Example2;