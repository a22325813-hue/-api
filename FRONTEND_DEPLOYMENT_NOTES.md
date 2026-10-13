# 用户端前端部署记录

## 授权范围
仅部署前端静态资源；服务器后端版本保持 0.2.13。不得改动数据库、账号、额度、密钥、容器镜像、配置或数据卷。用户明确接受本机前端与服务器后端版本差异，接口兼容性仍需实际账号验收。

## 管理端隔离
- 客户端以路由 meta.requiresAdmin 或 /admin 前缀判定，不以账号角色判定。管理员访问 /dashboard 仍属于用户端。
- 管理路由使用源码基线恢复的 LegacyAppHeader / LegacyAppLayout / LegacyToast。
- 全局默认配色与共享样式保留原版，用户风格限制到 html.user-ui，覆盖 Teleport 弹窗但不污染管理路由。
- 线上 Nginx 不接管 /admin 路由，直接由当前后端提供原版管理界面。旧资源路径在新静态目录不存在时回源后端。

## 服务器
- SSH root 端口 22，指纹经用户确认；密码不记录。
- sub2api 容器 weishaw/sub2api:0.2.13，127.0.0.1:8080。
- 原数据卷 /opt/sub2api/data -> /app/data。
- 发布目录 /opt/sub2api/frontend-releases/20261011T174518Z。
- 配置备份 /opt/sub2api/frontend-backups/20261011T174518Z。
- 新版前端入口由 Nginx 静态提供，现有 API 代理不变。不存在的静态资源回源；/admin 使用原入口。

## 回滚
恢复备份目录内三个域名配置到 /etc/nginx/sites-available，执行 nginx -t，成功后 systemctl reload nginx。无需修改数据库或重启后端。

## 实际发布结果
- 生产构建通过（2026-10-13 UTC）；双栏密钥 Studio、渠道供应商分类与四宫格图标已纳入构建。
- 发布目录：`/opt/sub2api/frontend-releases/20261013T161300Z`。
- 软链接更新：`/opt/sub2api/frontend-current` 指向新发布目录。
- Nginx 配置校验（`nginx -t`）成功，完成平滑重载（`systemctl reload nginx`）。
- 验证状态：`/home` 与 `/keys` 均 HTTP/2 200 返回新入口；`/admin/dashboard` 保持原版入口 HTTP/2 200；`sub2api` 容器 ID `f5e57b9e6471` 保持 Up & Healthy；数据库与 Redis 容器无变更。
- 生产构建通过（2026-10-11 UTC）；国际化 3 项测试通过，路由隔离 2 项、端点回归 2 项通过。
- 发布已激活，Nginx 配置测试通过，仅 reload Nginx。
- 三个域名的 /home 返回新入口，/admin/dashboard 返回原后端入口（原 index-xMHQ6xfX.js）；两套入口直接引用的 JS/CSS 均 HTTP 200 且不是 HTML 回退。
- 公网 https://api.huigeapi.cn/home 与 /admin/dashboard 均 HTTP 200。
- sub2api 容器 ID f5e57b9e647135d7c0714d27ffa49153132d016593103156a7ab5bfe54f2688d 保持不变，镜像 weishaw/sub2api:0.2.13，healthy；部署前后 docker ps 快照一致。
- 未执行数据库写入、迁移、账号创建、容器重建或后端升级。

## 验收与限制
- 必须通过前端生产构建、路由主题隔离测试、端点复制回归测试。
- 部署后检查 /home 与 /login 为新入口，/admin/dashboard 为原入口；两套入口所有 JS/CSS 资源可访问。
- 对照部署前后容器 ID / 镜像，后端健康状态与公开配置保持不变。
- 未使用真实业务账号登录时，不宣称已完成账户内功能、充值或完整接口兼容性验收。
- 本地模拟管理员登录必须移除；任何前端模拟身份不是有效后端管理员账号。
