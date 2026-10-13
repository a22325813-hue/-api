---
name: sub2api-project-map
description: Maintain the lightweight fixed-format project map for the local D:/sub2api frontend customization. Use for sub2api code maintenance, frontend optimization, project graph, progress tracking, handoff, or scope control. Not for administrator API operations or unrelated projects.
---

# Sub2API 固定格式项目维护

## 必须先读

1. 项目根目录固定为 `D:/sub2api`，不要把当前会话工作目录当成项目目录。
2. 先读取 `D:/sub2api/project-management/graph.json`（唯一结构化事实来源）。
3. 查询 `git status --short --branch`，再按任务读取相关模块源码和差异；图谱不是实时索引，必须核对。
4. 原有方案或部署文档只作参考，与实际代码不符时明确标记，不将设想当完成。

## 固定数据协议（schema_version = 1）

顶层键固定为：`schema_version, project, constraints, modules, relations, tasks, checks, changes`。
字段固定：
- project: id, root, scope, baseline_commit, baseline_note
- constraints[]: id, rule, source
- modules[]: id, name, kind, files, summary
- relations[]: from, type, to, evidence
- tasks[]: id, module, title, status, evidence
- checks[]: id, name, status, command, result, evidence
- changes[]: id, summary, modules, verification, deployment

枚举：
- module.kind: customized | preserved | configuration | documentation
- relation.type: uses | selects | scopes | builds | documents
- task.status: todo | in_progress | done | blocked
- check.status: not_run | passed | failed | stale
- change.deployment: not_deployed | deployed | unknown

所有 ID 稳定，不重编号、不重用删除 ID。关系端点、task.module、change.modules 必须引用有效 module ID。文件路径相对项目根目录。不得存账号、密钥、密码、服务器凭据。格式迁移必须先说明并得到用户确认，不在普通维护中随意增加顶层字段。

## 日常流程

1. **定位**：读取图谱和 Git 状态，匹配模块与约束；用户只问问题时不擅自新增任务。
2. **划界**：列出本次目标、非目标、影响模块。默认用户端前端，不扩展后端、数据库或管理员业务。
3. **实施**：仅在用户要求实施时修改代码；相关任务改为 in_progress，保留所有已有工作区改动。
4. **验证**：执行相关且可用的检查；安装依赖、构建或测试可能写缓存/产物，不能把它们称为纯只读。禁止用自动修复 lint 代替检查。未运行为 not_run，运行失败为 failed；本次变动使旧结果失效则标 stale。不能仅凭旧部署记录宣称本次通过或已上线。
5. **同步**：实施后最小更新图谱对应模块、关系、任务、检查，并追加 Hxxx 变更；只审计时仅记录用户明确要求维护的事实。done 必须有具体完成依据；缺少验证在 evidence/result 明示。不得重写全图或创造第二份事实清单。
6. **自检**：`node D:/sub2api/project-management/validate.mjs`。仅验证图谱结构、引用和文件存在，不是业务测试。
7. **交付**：使用下方固定格式，短而明确，不擅自提交、推送、部署。

## 每次回复格式（标题和顺序固定）

### 1. 本次目标
一句话；列出模块 ID。
### 2. 改动与影响
改了什么／仅检查了什么；非目标及保护边界。
### 3. 验证结果
逐项：通过／失败／未运行／旧结果失效。区分代码实现、测试、真实账号验收和部署。
### 4. 图谱状态
任务 ID 与状态、图谱是否更新；若未更新，解释为仅咨询或无事实变化。
### 5. 下一步
最多 3 项；没有则写“无”。新建议不得未经要求直接变成执行任务。

文件提及遵守宿主链接规范。不要声称本 skill 或图谱可以自动扫描调用关系、自动完成业务测试、自动在所有新会话强制加载。
