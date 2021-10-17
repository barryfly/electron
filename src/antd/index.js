import { Button, Input, Form, Layout, Row, Col, Menu } from 'ant-design-vue';
export function setupAntd(app) {
    app.use(Button);
    app.use(Input);
    app.use(Form);
    app.use(Layout);
    app.use(Row);
    app.use(Col);
    app.use(Menu);
    // app.config.globalProperties.$message = message;
}