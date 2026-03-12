# 暖邻帮小程序 - Vercel部署指南

## 部署准备

### 1. 环境要求
- Node.js 16+ 
- npm 或 yarn
- Git
- Vercel 账号（支持 GitHub 登录）

### 2. 项目配置检查

确保以下文件已正确配置：

#### API配置 (`utils/config.ts`)
```typescript
export const BASE_URL = 'https://your-api-domain.com/api' // 替换为实际API地址
```

#### 微信小程序配置 (`manifest.json`)
```json
"mp-weixin": {
  "appid": "your-weixin-appid",
  "setting": {
    "urlCheck": false
  }
}
```

---

## 部署方式一：通过 Vercel CLI（推荐本地测试）

### 步骤1：安装依赖
```bash
cd e:\CBD-project\warm-neighbor
npm install
```

### 步骤2：安装 Vercel CLI
```bash
npm i -g vercel
```

### 步骤3：登录 Vercel
```bash
vercel login
```

### 步骤4：预览部署（测试）
```bash
vercel
```

### 步骤5：生产部署
```bash
vercel --prod
```

部署成功后会返回一个 Vercel URL，例如：`https://warm-neighbor.vercel.app`

---

## 部署方式二：通过 GitHub 自动部署（推荐生产环境）

### 步骤1：初始化 Git 仓库
```bash
cd e:\CBD-project\warm-neighbor
git init
git add .
git commit -m "Initial commit"
```

### 步骤2：推送到 GitHub
1. 在 GitHub 创建新仓库 `warm-neighbor`
2. 关联远程仓库：
```bash
git remote add origin https://github.com/your-username/warm-neighbor.git
git branch -M main
git push -u origin main
```

### 步骤3：连接 Vercel
1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 **"Add New..."** → **"Project"**
3. 选择你的 `warm-neighbor` 仓库并导入

### 步骤4：配置项目
在项目配置页面填写以下信息：

| 配置项 | 值 |
|-------|-----|
| **Framework Preset** | Other |
| **Build Command** | `npm run build:h5` |
| **Output Directory** | `unpackage/dist/build/h5` |
| **Install Command** | `npm install` |

### 步骤5：环境变量（可选）
如果有敏感配置，可以在 **Environment Variables** 中添加：
- `VUE_APP_API_URL`: API地址

### 步骤6：部署
点击 **"Deploy"** 按钮，等待部署完成（约2-3分钟）

---

## 部署后检查清单

### 1. 访问测试
访问 Vercel 提供的域名，测试以下功能：
- [ ] 页面正常加载
- [ ] 底部导航栏可点击
- [ ] 各页面跳转正常
- [ ] API请求正常（需配置实际API）

### 2. 常见问题排查

#### 页面空白
检查浏览器控制台是否有404错误，可能原因：
- API地址配置错误
- 图片资源路径问题

#### 样式错乱
确保 `uni.scss` 和样式文件正确加载

#### API请求失败
- 检查 `utils/config.ts` 中的 `BASE_URL`
- 确保API服务器支持CORS
- 确认API域名已在微信小程序后台配置服务器域名

---

## 自定义域名（可选）

### 绑定域名
1. 在 Vercel 项目设置中点击 **"Domains"**
2. 添加你的域名（如 `warmneighbor.com`）
3. 按提示配置DNS解析

### 配置SSL
Vercel 会自动为你的域名配置HTTPS证书

---

## 更新部署

### 代码更新后自动部署
```bash
git add .
git commit -m "更新内容"
git push
```

推送到 GitHub 后，Vercel 会自动触发部署

### 手动触发部署
在 Vercel 项目页面点击 **"Redeploy"**

---

## 费用说明

Vercel 免费额度：
- ✅ 无限次部署
- ✅ 100GB 带宽/月
- ✅ 无限项目
- ✅ 自动HTTPS

适合个人项目和小型应用使用。

---

## 常用命令

```bash
# 查看部署日志
vercel logs

# 查看部署列表
vercel list

# 删除部署
vercel rm <deployment-url>

# 本地预览
npm run dev:h5
```

---

## 技术支持

如遇到问题，可参考：
- [Vercel 官方文档](https://vercel.com/docs)
- [uni-app H5部署文档](https://uniapp.dcloud.net.cn/tutorial/h5.html)

---

## 下一步

部署成功后，你可以：
1. 分享链接给用户测试
2. 提交到微信小程序平台审核
3. 配置自定义域名
4. 集成真实后端API服务

祝部署顺利！🎉
