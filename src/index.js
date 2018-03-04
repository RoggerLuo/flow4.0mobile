import dva from 'dva';
import './index.css';
import './assets/app.global.css'
// import 'antd-mobile/dist/antd-mobile.css'; 
import {PostStack} from './postStack'

// 1. Initialize
const app = dva();

app.model(require("./models/common"));
app.model(require("./models/editor"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

global.__store = app._store
global.reduxDispatch = app._store.dispatch
global.postStack = new PostStack()
