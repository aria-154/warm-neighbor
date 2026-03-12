const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = require('docx');
const fs = require('fs');

// 创建文档
const doc = new Document({
  sections: [{
    properties: {},
    children: [
      // 标题
      new Paragraph({
        text: "暖邻帮项目说明文档",
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),
      new Paragraph({
        text: "版本: 1.0.0",
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 }
      }),

      // 第一章：项目介绍
      new Paragraph({
        text: "一、项目介绍",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "1.1 项目概述",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "暖邻帮是一款面向老年人和残障人士的社区互助服务平台小程序，旨在通过整合社区资源，为特殊群体提供便捷的信息查询和服务对接服务。项目基于uni-app跨平台框架开发，支持微信小程序、H5、App等多个平台。",
        spacing: { after: 200, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "平台连接老年人、残障人士与社区志愿者、服务提供者，构建温暖和谐的邻里互助网络。通过智能匹配、在线沟通、订单管理等功能，让互助服务更加高效便捷。",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "1.2 目标用户",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "• 老年人：提供生活照料、医疗陪护、社交陪伴等服务",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 残障人士：提供无障碍出行、康复护理、生活辅助等服务",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 志愿者：提供各类志愿服务，积累信用和社会价值",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 服务提供者：提供专业服务，获取收益和用户评价",
        spacing: { after: 300, indent: { left: 400 } }
      }),

      // 第二章：核心功能
      new Paragraph({
        text: "二、核心功能",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "2.1 首页",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "展示天气信息、快捷入口、推荐服务、最新公告等内容。支持语音搜索功能，用户可以通过语音快速查找需要的服务。",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "2.2 服务大厅",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "汇集四大类共20项服务：",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "生活服务（5项）：日常购物代购、家庭清洁打扫、家常菜配送、衣物清洗服务、家电维修",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "出行服务（5项）：轮椅陪同外出、无障碍车辆接送、视障人士陪同、机场火车站接送、公交地铁陪同",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "医疗健康（5项）：就医陪同、康复理疗、健康监测、用药提醒、心理咨询",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "技能培训（5项）：智能手机教学、书法绘画课程、广场舞教学、太极养生班、健康饮食讲座",
        spacing: { after: 300, indent: { left: 600 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "2.3 无障碍地图",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "集成腾讯地图SDK，标记周边的无障碍设施和服务点位，支持语音导航、位置搜索、路线规划等功能。",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "2.4 订单中心",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "管理用户的订单，包括待确认、进行中、已完成等状态。支持订单详情查看、取消订单、评价服务等操作。",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "2.5 个人中心",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "用户个人信息管理，包括资料编辑、服务记录、收藏列表、设置等。支持字体大小、高对比度等无障碍功能设置。",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "2.6 发布服务",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "志愿者和服务提供者可以发布自己的服务，包括服务描述、价格、服务范围等信息。",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "2.7 消息中心",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "接收系统通知、订单消息、服务消息等，支持消息分类和已读未读标记。",
        spacing: { after: 300, indent: { left: 400 } }
      }),

      // 第三章：技术实现
      new Paragraph({
        text: "三、技术实现",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "3.1 技术栈",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "前端框架：Vue 3.4.21",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "开发语言：TypeScript 5.4.2",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "跨平台框架：UniApp 3.0.0 (alpha)",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "状态管理：Pinia 2.1.7",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "UI组件库：TDesign MiniProgram 1.3.0",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "构建工具：Vite 5.1.5",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "地图服务：腾讯地图 LBS SDK",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "语音服务：微信语音识别插件",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "国际化：Vue I18n 9.9.1",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "3.2 项目结构",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "pages/ - 页面目录，包含9个主要页面",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "store/ - Pinia状态管理，包含user、order、service、settings四个模块",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "api/ - API接口封装，包含user、service、order、map等接口",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "utils/ - 工具函数，包含config、request、accessibility、location等",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "static/ - 静态资源，包含图片、图标等",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "App.vue - 应用根组件",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "main.ts - 应用入口文件",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "pages.json - 页面路由配置",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "manifest.json - 应用配置文件",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "3.3 核心API集成",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "腾讯地图API：地理编码、逆地理编码、附近搜索、无障碍设施标记",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "高德天气API：实时天气查询、天气预警推送、生活指数查询",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "微信语音API：语音识别(ASR)、语音合成(TTS)",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "政务数据API：政务公开数据、社区办事指南、政策通知",
        spacing: { after: 300, indent: { left: 400 } }
      }),

      // 第四章：无障碍设计
      new Paragraph({
        text: "四、无障碍设计",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "4.1 WCAG 2.1标准遵循",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "• 文字替代：所有图片均提供Alt属性描述",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 键盘可访问性：支持键盘导航和操作",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 充足对比度：符合WCAG AA级对比度要求",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 焦点可见性：清晰的焦点指示",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "4.2 针对老年用户",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "• 大字体：支持多档位字体大小调节，最大1.5倍",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 高对比度模式：适合视力退化的用户",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 简洁清晰的界面：减少视觉干扰",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 重要信息突出显示：关键操作醒目易见",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 减少操作步骤：简化交互流程",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "4.3 针对视障用户",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "• 语音播报功能：页面内容朗读",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 屏幕阅读器兼容：支持VoiceOver、TalkBack等",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 高对比度色彩：提升视觉辨识度",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 简化的导航结构：减少层级深度",
        spacing: { after: 300, indent: { left: 400 } }
      }),

      // 第五章：使用说明
      new Paragraph({
        text: "五、使用说明",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "5.1 开发环境搭建",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "步骤1：安装Node.js (v16及以上版本)",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "步骤2：安装HBuilderX编辑器或VS Code",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "步骤3：下载并安装微信开发者工具",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "步骤4：克隆项目代码到本地",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "步骤5：安装项目依赖 npm install",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "5.2 运行项目",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "微信小程序开发：",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "执行命令：npm run dev",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "在微信开发者工具中导入 unpackage/dist/dev/mp-weixin 目录",
        spacing: { after: 200, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "H5网页开发：",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "执行命令：npm run dev:h5",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "在浏览器中访问 http://localhost:5173",
        spacing: { after: 300, indent: { left: 600 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "5.3 API配置",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "在 utils/config.ts 中配置以下API密钥：",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 腾讯地图密钥：访问 https://lbs.qq.com/console/key.html 申请",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "• 高德天气密钥：访问 https://console.amap.com/dev/key/app 申请",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "• 微信语音插件：访问 https://developers.weixin.qq.com/miniprogram/dev/plugin/ 配置",
        spacing: { after: 300, indent: { left: 600 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "5.4 用户操作流程",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "注册登录 → 选择身份 → 浏览服务 → 下单预约 → 服务对接 → 完成评价",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "1. 用户通过微信授权或手机号验证码登录",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "2. 选择用户身份：老年人 / 残障人士 / 志愿者",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "3. 在服务大厅浏览服务或使用语音搜索",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "4. 选择服务，填写需求，确认订单",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "5. 与服务提供者在线沟通，确认服务细节",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "6. 服务完成后进行评价",
        spacing: { after: 300, indent: { left: 600 } }
      }),

      // 第六章：服务详情
      new Paragraph({
        text: "六、服务详情",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "6.1 服务分类",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "目前平台提供4大类共20项服务，覆盖老年人日常生活的主要需求。",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "6.2 定价策略",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "服务价格分为三种类型：固定价格、按小时计费、可协商价格。",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 固定价格：服务完成后收取固定费用",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "• 按小时计费：根据服务时长计算费用",
        spacing: { after: 100, indent: { left: 600 } }
      }),
      new Paragraph({
        text: "• 可协商价格：服务提供者与用户协商确定",
        spacing: { after: 300, indent: { left: 600 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "6.3 服务范围",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "服务提供者可设置服务范围，系统会根据用户位置智能匹配附近的服务。默认服务范围为5公里，最大可设置至30公里。",
        spacing: { after: 300, indent: { left: 400 } }
      }),

      // 第七章：商业化潜力
      new Paragraph({
        text: "七、商业化潜力",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "7.1 收入来源",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "• 服务费抽成：每笔订单抽取一定比例的服务费（建议5%-10%）",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 会员体系：VIP会员享受专属优惠和优先匹配服务",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 广告推广：为相关企业提供精准广告位投放",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 企业合作：与养老机构、社区、医院等建立合作关系",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 数据服务：为政府和机构提供老年人需求大数据分析",
        spacing: { after: 300, indent: { left: 400 } }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "7.2 市场前景",
            bold: true,
            size: 28
          })
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: "随着中国人口老龄化加剧，养老服务市场潜力巨大。暖邻帮定位为社区互助服务平台，连接供需双方，具有明显的网络效应。通过优质的服务体验和口碑传播，可以快速积累用户。",
        spacing: { after: 300, indent: { left: 400 } }
      }),

      // 第八章：待办事项
      new Paragraph({
        text: "八、待办事项",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "• 完善服务详情页展示",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 添加评价系统和信用评分",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 实现在线支付功能（微信支付）",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 集成真实政务数据API",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 添加实时聊天功能",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 完善订单详情页",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 添加设置页面（字体大小、主题切换等）",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 创建帮助中心页面",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 创建关于我们页面",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "• 添加用户反馈渠道",
        spacing: { after: 300, indent: { left: 400 } }
      }),

      // 第九章：联系方式
      new Paragraph({
        text: "九、联系方式",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "如有任何问题或建议，欢迎通过以下方式联系我们：",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "项目名称：暖邻帮",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "版本号：1.0.0",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "开发团队：暖邻帮团队",
        spacing: { after: 100, indent: { left: 400 } }
      }),
      new Paragraph({
        text: "许可证：MIT",
        spacing: { after: 300, indent: { left: 400 } }
      }),

      new Paragraph({
        text: "文档生成时间：" + new Date().toLocaleString('zh-CN'),
        spacing: { before: 600 },
        alignment: AlignmentType.CENTER
      })
    ]
  }]
});

// 保存文档
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('e:/CBD-project/warm-neighbor/暖邻帮项目说明文档.docx', buffer);
  console.log('文档已生成：e:/CBD-project/warm-neighbor/暖邻帮项目说明文档.docx');
}).catch(err => {
  console.error('生成文档失败:', err);
});
