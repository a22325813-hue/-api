# ZH-API 项目交接与多端协同指南

> **写给新接手的 AI 助手 / 开发者：**
> 请仔细阅读本指南。本项目为 sub2api 定制改造的 ZH-API 用户门户与控制台系统。

---

## 1. 核心架构与隔离规范（必须遵守）
1. **技术栈**：Vue 3 + TypeScript + Tailwind CSS + Pinia + Vite + Go (后端保持 Docker 0.2.13)。
2. **双端路由隔离**：
   - 用户端路由（`/home`、`/dashboard`、`/keys`、`/channels` 等）使用全新的 ZH-API 极简蓝白风格（样式作用于 `html.user-ui`）。
   - 管理后台路由（`/admin/*`）严格保留官方原版界面（Legacy 布局、Legacy 顶栏），**严禁破坏管理端原版样式与逻辑**。
   - 判断规则见 `frontend/src/utils/uiRouteScope.ts`。
3. **接口契约**：必须保留全部既有 API 字段与权限开关，修改任何组件时先阅读 `docs/zh-api/PROJECT.md` 与 `docs/zh-api/TASKS.md`。

---

## 2. 当前最新进展（已部署上线）
- **服务器后端**：保持官方容器 `weishaw/sub2api:0.2.13`，数据卷与数据库保持稳定运行。
- **最新前端特性**（已于 2026-10-13 部署并上线）：
  - **宽画幅 Studio 密钥管理**（`frontend/src/views/user/KeysView.vue`）：包含分组网格选择器 `GroupCardSelector.vue` 与右侧即时凭证透视蓝图。
  - **渠道供应商分类选择器**（`ChannelProviderSelector.vue`）：支持【全部】、【Claude】、【GPT】、【Gemini】、【国模与其他】毫秒级筛选。
  - **国模四宫格图标**（`DomesticGridIcon.vue`）：集成 DeepSeek、GLM、Kimi 官方矢量。

---

## 3. 分支说明与当前任务
- **大功能主干分支**：`feature/keys-view-redesign`（包含所有已经完成并已上线的完整核心功能）。
- **当前微分支**：`feature/home-text-style`（**本次专门创建的小分支**）：
  - **目标**：**只调整主页的文案与样式**。
  - **修改范围**：仅限 `frontend/src/views/HomeView.vue`（以及必要的主页独立样式）。
  - **原则**：不修改其他业务路由、不破坏 API 接口、不污染大分支。

---

## 4. 本地运行与验证常用指令
```bash
# 1. 本地启动开发预览
pnpm --dir frontend dev

# 2. 类型检查
pnpm --dir frontend run build  # 或 vue-tsc -b

# 3. 运行自动化测试
pnpm --dir frontend test
```

---

## 5. 交接指令（直接复制给另一个 AI）
> 「你现在接手 ZH-API 项目开发。请先阅读根目录的 `AGENTS.md`、`AI_HANDOVER.md` 以及 `docs/zh-api/TASKS.md`。当前请在 `feature/home-text-style` 分支上工作，本次目标只修改主页（HomeView.vue）的文案和样式，保持接口和其余业务页面不变。」
