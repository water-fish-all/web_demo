import react from "react"
import { Input } from 'antd';

const { Search } = Input;
const onChange = e => {
    console.log(e);
};
class SearchApp extends react.PureComponent{
    constructor() {
        super();
    }

    render() {
        return(
            <>
                <Search
                    placeholder="输入搜索内容"
                    allowClear onChange={onChange}
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
            </>
        );
    }
}
export default SearchApp;