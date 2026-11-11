# 好球 · 乒乓球比赛记录

可直接放到 GitHub Pages 的静态网页版，无需安装依赖、无需编译、无需 ChatGPT 登录。

## 部署（推荐：网页操作）

1. 登录 GitHub，在 https://github.com/new 新建仓库，建议命名 `pingpong-rally`。
2. 如果使用 GitHub Free，请选择 Public（公开）。这会公开网站代码。勾选 Add a README file，完成创建。
3. 在仓库的 Code 页面，选择 Add file → Upload files。
4. 解压本压缩包，将 `index.html`、`style.css`、`app.js` 上传到仓库根目录（不是上传 ZIP，也不要再套一层文件夹）。其余文件可一起上传。
5. 点击 Commit changes 保存。
6. 打开仓库 Settings → Pages。
7. Source 选择 Deploy from a branch；Branch 选择 main；目录选择 /(root)；点击 Save。
8. 等待部署完成，在 Pages 页面打开 GitHub 提供的站点地址。可能需要几分钟。

如果让 ChatGPT 继续上传：只需先创建一个带 README 的仓库，并让 GitHub 连接有权访问它，然后将仓库链接发回对话。

GitHub 官方操作说明：
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 已有功能

- 单循环赛与单败淘汰赛，2–32位选手或组合。
- 单打、双打，按局记录比分和规则校验。
- 淘汰赛分轮次设置三局两胜、五局三胜或七局四胜。
- 0、2或4名种子；排名文本/CSV导入、抽签预览与确认。
- 按轮次居中并带连线的晋级签表。
- 编辑参赛名单、修改比分、导出比赛CSV。
- 删除比赛与回收站恢复。

## 数据保存与迁移

比赛记录保存在当前设备、当前浏览器、当前网站域名的 localStorage 中，不会上传到 GitHub。

- 换设备、换浏览器或换域名，不会自动出现原来的比赛。
- 当前 ChatGPT Site 中已有的真实记录不包含在这个源码包内。部署后会显示预置的虚构示例比赛。
- 清除浏览器网站数据会清空本机记录；回收站也在本机。
- 原网站「参赛名单 → 导出记录」可导出CSV供留存，但当前没有完整赛事备份恢复功能，CSV也不是可直接还原签表的完整备份。
- 将网站地址发给球友，球友看到的是自己的本机数据；当前版本不是多人共享记分系统。
- GitHub Pages 公开的是代码与网页，实际输入的比分不因此自动公开。

## 本地运行

在本目录运行 `python -m http.server 8000`，用浏览器访问 http://localhost:8000/ 。

## 验证

有 Node.js 时运行 `node tests/tournament.cjs`，验证种子分区、轮空、晋级、分轮赛制与导入校验。

## 文件

- index.html：页面入口
- style.css：样式和签表排版
- app.js：全部比赛逻辑与浏览器存储
- .nojekyll：GitHub Pages 静态文件标记
- tests/tournament.cjs：关键逻辑检查

此包不包含账号密钥、ChatGPT Site 配置或个人浏览器中的比赛数据。
