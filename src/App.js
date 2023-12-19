import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div id="main">
          <div id="Col1">
              <div className="Col1_title">免费版</div>
              <div>
                  <span className="Col1_Span1">￥</span>
                  <span className="Col1_Span2">0</span>
                  <span>/年</span>
                  <div>
                      <div className="Col1_Span3">5人成员上限</div>
                      <div className="Col1_Span3">5G容量</div>
                      <div className="Col1_Span3">单文件最大100M</div>
                      <div className="Col1_Span3">单项目最大1G</div>
                      <div className="Col1_Span3">社区与邮件支持</div>
                      <div className="btn">免费试用</div>
                  </div>
              </div>
          </div>
          <div id="Col2">
              <div className="Col1_title">标准版</div>
              <div>
                  <span className="Col1_Span1">￥</span>
                  <span className="Col1_Span2">1998</span>
                  <span>/年</span>
                  <div>
                      <div className="Col1_Span3">20人成员上限</div>
                      <div className="Col1_Span3">20G容量</div>
                      <div className="Col1_Span3">单文件最大100M</div>
                      <div className="Col1_Span3">单项目最大1G</div>
                      <div className="Col1_Span3">社区与邮件支持在线与电话支持</div>
                      <div className="Col1_Span3">短信通知</div>
                      <div className="btn">购买</div>
                  </div>
              </div>
          </div>
          <div id="Col3">
              <div className="Col1_title">高级版</div>
              <div>
                  <span className="Col1_Span1">￥</span>
                  <span className="Col1_Span2">3998</span>
                  <span>/年</span>
                  <div>
                      <div className="Col1_Span3">50人成员上限</div>
                      <div className="Col1_Span3">50G容量</div>
                      <div className="Col1_Span3">单文件最大200M</div>
                      <div className="Col1_Span3">单项目最大2G</div>
                      <div className="Col1_Span3">社区与邮件支持在线与电话支持</div>
                      <div className="Col1_Span3">短信通知</div>
                      <div className="btn">购买</div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
