### 这个版本废了，俺也忘记怎么做出来的了，环境啥的都整没了，后面有时间再重新做一版。

> **状态说明**：上面这句是原作者的留言，原样保留。本项目已废弃、原开发环境已丢失，仓库现在只作代码存档。下文是根据仓库内现有代码整理的实现说明，**不代表它现在还能正常用**。

# 网愈云音乐（仿网易云音乐网页播放器）

一个纯前端单页音乐播放器：Vue 2 + axios，通过第三方「网易云音乐 API」镜像站 `autumnfish.cn` 实现搜索、播放、封面/歌手信息、热评和 MV 播放。页面标题叫「网愈云音乐」，顶栏写的是「网遇云音乐」（玩的是网易云音乐的梗）。

## 技术栈

- **Vue 2**（CDN 开发版 `vue.js`，非构建版，未锁版本号）
- **axios**（CDN）
- 原生 HTML/CSS，**无构建工具、无 package.json**
- 数据源：`https://autumnfish.cn`（NeteaseCloudMusicApi 的一个公开演示实例）

## 目录结构

```
musicPlayer/
├── main.html          # 页面入口 + Vue 模板（注意入口是 main.html，不是 index.html）
├── js/main.js         # Vue 实例：data + 6 个方法
├── css/main.css       # 布局与唱片旋转动画（中文注释是 GBK 编码，UTF-8 打开会乱码）
├── img/
│   ├── diepian.png    # 唱片底图
│   ├── playmusic.png  # 播放小图标
│   └── playmv.png     # MV 小图标
└── readme.md
```

## 已实现的功能（按 `js/main.js` 里的方法）

| 功能 | 方法 | 调用的接口（autumnfish.cn） |
| --- | --- | --- |
| 搜索歌曲 | `searchMusic` | `/search?keywords=` |
| 播放歌曲（取音频地址） | `playMusic` | `/song/url?id=` |
| 取封面 / 歌手 / 歌名 | `playMusic` | `/song/detail?ids=` |
| 取热门评论 | `playMusic` | `/comment/hot?type=0&id=` |
| 播放 MV（弹层遮罩） | `playMV` / `hide` | `/mv/url?id=` |
| 唱片旋转 / 停止 | `play` / `pause` | 监听 `<audio>` 的 `play`/`pause` 事件 |

界面是固定 1000×600 的三栏布局：左边歌曲列表、中间唱片封面（播放时 4 秒一圈旋转）、右边热评列表，底部是原生 `<audio controls loop autoplay>` 播放条。

## 如何运行

纯静态，无需构建，直接用浏览器打开 `main.html` 即可。如遇本地文件跨域问题，可起一个静态服务器：

```bash
cd musicPlayer
python3 -m http.server 8000
# 浏览器访问 http://localhost:8000/main.html
```

## 当前状态 / 为什么「废了」

- **数据源已失效**：实测 `https://autumnfish.cn` 现在返回 HTTP 403，搜索、播放、评论、MV 全都依赖它，所以播放器现在拿不到任何数据——这就是「这个版本废了」的直接原因。
- 前端 CDN 目前仍可用：`cdn.jsdelivr.net/npm/vue/dist/vue.js` 实测返回 Vue 2.7.16，`unpkg.com/axios` 也可加载，所以页面本身能渲染，只是没有数据。
- 所有 axios 请求的错误回调都是空函数 `function(err){}`，接口失败时界面无任何提示。
- 搜索接口取 `response.data.result.songs`，无结果时该字段可能不存在，会抛错。
- 布局用固定像素 + 绝对定位，不适配移动端。
