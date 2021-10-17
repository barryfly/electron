const jsonData = {"name":"Barry","url":"http://www.xxx.com","address":{"street":"南山.","city":"深圳","country":"中国"},"links":[{"name":"Google","url":"http://www.xxx.com"},{"name":"Baidu","url":"http://www.xxx.com"},{"name":"SoSo","url":"http://www.xxx.com"}]};

const jsData = `
  (() => {
    const root = document.getElementById('app');
    if (root) {
      htmlRoot.setAttribute('data-name', 'barry');
    }
  })();
`;

const htmlData = `
<!DOCTYPE html>
<html lang="en" id="htmlRoot">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="renderer" content="webkit" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0"/>
    <title><%= title %></title>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <div id="app">
  </div>
  </body>
</html>
`;

export {
    jsonData,
    jsData,
    htmlData
}