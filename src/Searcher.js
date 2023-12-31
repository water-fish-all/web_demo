import react from "react";
import { Table, Divider, Tag } from 'antd';

const { Column, ColumnGroup } = Table;
class Searcher extends react.PureComponent{
    constructor() {
        super();
    }


    data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
    render() {
        return (
            <>
                <Table dataSource={this.data}>
                    <ColumnGroup title="航班数据展示">
                        <Column title="IATACode" dataIndex="firstName" key="firstName" />
                        <Column title="aptCcity" dataIndex="lastName" key="lastName" />
                        <Column title="aptCname" dataIndex="age" key="age" />
                        <Column title="flightNumber" dataIndex="address" key="address" />

                    </ColumnGroup>

                </Table>
            </>
        );
    }
}

export default Searcher;