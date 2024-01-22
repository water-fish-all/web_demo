import react from "react";
import {GaodeMap, getData} from '@antv/l7';
import { LarkMap, PointLayer, MapThemeControl, ZoomControl} from '@antv/larkmap';
import { ScaleControl ,FullscreenControl ,MouseLocationControl } from '@antv/larkmap';
import {Drawer, Descriptions, List, Row, Progress, Skeleton, Modal, ConfigProvider, Button} from 'antd';
import a1 from './airport.svg'
import a2 from './gps.svg'
import { IconImageLayer } from '@antv/larkmap';
import { CustomControl, LocationSearch } from '@antv/larkmap';
import "./Searcher"
import { Input } from 'antd';
import { Bar } from '@antv/g2plot';

const { Search } = Input;
const onChange = e => {
    console.log(e);
};
class Test1 extends react.PureComponent{

    constructor() {
        super();
        this.state= {
            pointData:"",
            drawVisible:false,
            CurrentData:"",
            SearchData:"",
            Modalvisible: false,
            barChartVisible: false, // 新增状态用于控制条形图的显示/隐藏
        }
    }


    componentDidMount() {
        fetch("http://flightapi.xiexianbo.xin/airPort/listAll")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log(data.data.data);
                this.setState({pointData:data.data.data})

                //客流量降序排序
                let i,j,temp;
                let top30 = [];
                for(i=1;i<this.state.pointData.length;i++){
                    for(j=0;j<(this.state.pointData.length)-i;j++){
                        if (this.state.pointData[j].flightNumber < this.state.pointData[j+1].flightNumber)//相邻两个数如果逆序，则交换位置
                        {
                            temp = this.state.pointData[j];
                            this.state.pointData[j] = this.state.pointData[j+1];
                            this.state.pointData[j+1] = temp;
                        }
                    }
                }
                for(i=0;i<30;i++){
                    top30.push(this.state.pointData[i]);
                }
                console.log(top30)
                
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
        iconAtlas: {
            icon1: a1,
            icon2: a2,
            icon3: 'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg',
        },
        icon: 'icon1',
        blend: 'normal',
        opacity: 0.8,
        label: {
            field: 'aptCname',
            state: {
                active: {
                    color: 'blue',
                },
            },
            style: {
                fill: 'blue',
                opacity: 0.6,
                fontSize: 12,
                textAnchor: 'top',
                textOffset: [0, -30],
                spacing: 1,
                padding: [5, 5],
                stroke: '#ffffff',
                strokeWidth: 0.3,
                strokeOpacity: 1.0,
            },
        },
        state: {
            active: false,
            select: {
                radius: 20,
                opacity: 1,
                icon: 'icon2',
            },
        },
    }

    handleClick=(e)=>{
        console.log(e);
        console.log(e.feature);
        let newdata=e.feature;
        this.setState({
            drawVisible:true,
            CurrentData:newdata,
        });
        console.log(this.state.CurrentData)
    }
    onClose=()=>{
        this.setState({drawVisible:false});
    }
    buttonClick=()=>{
        console.log(this.state.pointData[0].IATACode)
    }
    onChange=()=>{
        console.log(this.state.pointData)
    }
    onSearchFinish=()=>{
        console.log(this.state.pointData)
    }
    searchClick=(value)=>{
        console.log(value)
        console.log(this.state.pointData[0])
        let i=0;
        let aa=0;
        let c=0;
        for(i=0;i<this.state.pointData.length;i++){
            if(value==this.state.pointData[i].IATACode||
                value==this.state.pointData[i].aptCcity||
                value==this.state.pointData[i].aptCname
            ){
                aa=this.state.pointData[i];
                c=i;
            }
        }
        let bb = 0;
        bb = this.state.pointData[c];
        this.setState({
            Modalvisible: true,
            SearchData:bb
        });
    }
    handleOk = e => {
        console.log(e);
        this.setState({
            Modalvisible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            Modalvisible: false,
        });
    };
    flightNumberSort=()=>{
        let i,j,temp;
        let top30 = [];
        for(i=1;i<this.state.pointData.length;i++){
            for(j=0;j<(this.state.pointData.length)-i;j++){
                if (this.state.pointData[j].flightNumber < this.state.pointData[j+1].flightNumber)//相邻两个数如果逆序，则交换位置
                {
                    temp = this.state.pointData[j];
                    this.state.pointData[j] = this.state.pointData[j+1];
                    this.state.pointData[j+1] = temp;
                }
            }
        }
        for(i=0;i<30;i++){
            top30.push(this.state.pointData[i]);
        }
        console.log(top30)
        alert("客流量降序排序已完成")
    }
    // 添加一个新的方法用于关闭条形图
    closeBarChart = () => {
        // 销毁条形图
        this.barChart.destroy();

        // 设置条形图显示状态为 false
        this.setState({ barChartVisible: false });
    };

    // 添加一个新的方法用于绘制条形图
    renderBarChart = () => {
        const { pointData } = this.state;

        // 创建条形图实例并存储在类的属性中
        this.barChart = new Bar('container', {
            data: pointData.slice(0, 30), // 使用前30条数据
            xField: 'flightNumber',
            yField: 'aptCname',
        });

        this.barChart.render();

        // 设置条形图显示状态为 true
        this.setState({ barChartVisible: true });
    };

    render() {
        let pointSource={
            data: this.state.pointData,
            parser: { type: 'json', x: 'longitude', y: 'latitude' },
        }
        const info = () => {
            Modal.info({
                title: 'some info',
                content: 'some info',
            });
        };
        const confirm = () => {
            Modal.confirm({
                title: 'some info',
                content: 'some info',
            });
        };

        return (
            <div>

                <LarkMap
                    id="container"
                    map={this.mapInstance}
                    style={{height: "800px"}}
                    mapType="Gaode"
                    onSceneLoaded={(newScene) => {
                        this.setState(newScene);
                    }}
                >
                    {/*<PointLayer {...this.options} source={pointSource} onClick={this.handleClick}/>*/}
                    <IconImageLayer {...this.options} source={pointSource} onClick={this.handleClick}/>
                    {/*<IconImageLayer {...this.options} source={pointSource} onClick={this.flightNumberSort}/>*/}
                    <CustomControl position="topcenter">
                        <LocationSearch
                            searchParams={{
                                key: '70214c980e09ac04c41f39a36dcd5a81',
                                // location,
                            }}
                            autoFocus
                            value={null}
                            onChange={this.onChange}
                            onSearchFinish={this.onSearchFinish}
                        />
                    </CustomControl>

                    <ZoomControl/>
                    <ScaleControl/>
                    <FullscreenControl/>
                    <MouseLocationControl/>
                    <MapThemeControl/>

                    <div>
                        {/* <Button className="locale-components" onClick={this.flightNumberSort}>
                            客流量降序排序
                        </Button> */}
                        <Button className="locale-components" onClick={this.renderBarChart}>
                            客流量top30机场排行
                        </Button>
                        {/* 添加关闭条形图的按钮 */}
                        {this.state.barChartVisible && (
                            <Button className="locale-components" onClick={this.closeBarChart}>
                                关闭条形图
                            </Button>
                        )}
                    </div>
                    <Search
                        addonBefore={"机场信息检索"}
                        // addonAfter={"在左侧框内输入内容弹出信息展示窗口(输入框为空或不存在输入内容的数据等其他情况时默认展示上海虹桥机场)"}
                        placeholder="在此处输入：城市名称/IATACode/机场名称    例如：上海/SHA/上海虹桥"
                        allowClear onChange={onChange}
                        onSearch={value => this.searchClick(value)}
                        style={{width: 500}}
                    />
                </LarkMap>

                <Drawer
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.drawVisible}
                >
                    <Descriptions
                        title="当前所在机场基本信息">
                        <Descriptions.Item label="机场名称"
                                           span={4}>{this.state.CurrentData.aptCname}机场</Descriptions.Item>
                        <Descriptions.Item label="所在城市"
                                           span={4}>{this.state.CurrentData.aptCcity}</Descriptions.Item>
                        <Descriptions.Item label="国际航空机场代码"
                                           span={4}>{this.state.CurrentData.IATACode}</Descriptions.Item>
                        <Descriptions.Item label="当日航班数量"
                                           span={4}>{this.state.CurrentData.flightNumber}</Descriptions.Item>
                        <Descriptions.Item label="经度" span={4}>{this.state.CurrentData.longitude}°</Descriptions.Item>
                        <Descriptions.Item label="纬度" span={4}>{this.state.CurrentData.latitude}°</Descriptions.Item>
                    </Descriptions>
                </Drawer>
                {/*<Button type="primary" onClick={this.searchClick}>*/}
                {/*    Open Modal*/}
                {/*</Button>*/}
                <Modal
                    title={"搜索信息汇总(默认为上海虹桥机场数据)"}
                    visible={this.state.Modalvisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    defaultValue={"请输入城市名称或IATACode或机场名称,"}
                >
                    <p>机场名称: {this.state.SearchData.aptCname}</p>
                    <p>所在城市: {this.state.SearchData.aptCcity}</p>
                    <p>国际航空机场代码: {this.state.SearchData.IATACode}</p>
                    <p>当日航班数量: {this.state.SearchData.flightNumber}</p>
                    <p>经度: {this.state.SearchData.longitude}</p>
                    <p>纬度: {this.state.SearchData.latitude}</p>
                </Modal>
            </div>
        );
    }
}

export default Test1;