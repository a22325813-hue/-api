<template>
  <div class="portal-root min-h-screen bg-white text-[#1d1d1f] dark:bg-dark-950 dark:text-gray-100 overflow-x-hidden">
    <!-- 全局统一顶栏 -->
    <AppHeader />

    <!-- Ambient Glow Orbs -->
    <div class="ambient-glow-wrapper pointer-events-none">
      <div class="glow-blob-1"></div>
      <div class="glow-blob-2"></div>
    </div>

    <!-- 门户主体内容 -->
    <main class="hero-stage">
    <div class="hero-eyebrow-pill">
      <span class="pill-sparkle">✦</span>
      面向学习研究与编程开发的稳定 AI 中转站
    </div>

    <div class="art-title-container">
      <div class="art-brand-line">ZH·API</div>
      <h1 class="art-slogan-line">
        <span class="art-word-power">强大 稳定</span>
        <span class="art-word-glow">无限算力</span>
      </h1>
    </div>

    <p class="hero-subhead-apple">
      专为<strong>学术文献研读 全库代码工程重构与自动化 Agent 架构</strong>打造<br>
      严格遵循 OpenAI 标准协议 一行配置无缝接入全球顶尖大模型
    </p>

    <div class="hero-cta-line">
      <a href="/dashboard" target="_blank" class="btn-start-hero">
        <span>立刻开始使用</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
      <a href="#quickstart" class="link-guide-sub">
        查看接入指引 <span>›</span>
      </a>
    </div>

    <!-- 视觉基座 -->
    <div class="wonder-dock-wrapper">
      <div class="dock-rainbow-aura"></div>
      <div class="wonder-dock">
        <div class="dock-left">
          <div class="dock-status-beacon">
            <div class="beacon-core"></div>
          </div>
          <div class="dock-text-wrap">
            <div class="dock-text-label">
              <span>ZH-API API 接入地址</span>
              <span>实时状态请以实际请求为准</span>
            </div>
            <div class="dock-endpoint-str">{{ currentBaseUrl }}</div>
          </div>
        </div>
        <button class="btn-copy-dock" @click="copyApiUrl()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span id="copy-btn-text">拷贝 Base URL</span>
        </button>
      </div>
    </div>
  </main>

  <!-- 3. 数据展台 -->
  <section class="metrics-section">
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-number">99.98<span style="font-size:26px;">%</span></div>
        <div class="metric-title">可用率保障</div>
        <div class="metric-desc">全球多节点专线分发 确保核心实验与长时间调试稳定不中断</div>
      </div>

      <div class="metric-card">
        <div class="metric-number gradient">&lt; 1000<span style="font-size:26px;">ms</span></div>
        <div class="metric-title">极致首字生成响应</div>
        <div class="metric-desc">专线网络与硬件吞吐优化 秒级即时吐字 专为流式补全打磨</div>
      </div>

      <div class="metric-card">
        <div class="metric-number">1M</div>
        <div class="metric-title">超长上下文吞吐</div>
        <div class="metric-desc">完整保留长思考链 全库工程源码与百页论文无损长文推理</div>
      </div>

      <div class="metric-card">
        <div class="metric-number">100<span style="font-size:26px;">%</span></div>
        <div class="metric-title">标准协议兼容</div>
        <div class="metric-desc">原生适配 Claude Code 与各大智能体框架 零成本快速无缝切换</div>
      </div>
    </div>
  </section>

  <!-- 4. 核心板块：6 大顶尖现代工具链与 Agent (全部换装 100% 官方正版图标) -->
  <section class="section-wrap" id="deploy-clients">
    <div class="section-header-apple">
      <div class="section-eyebrow">Modern Toolchain & Agents</div>
      <h2 class="section-title-apple">一键配置顶尖编程与智能体工具链</h2>
      <p class="section-desc-apple">专为开发者与科研打造 直连当下 6 大前沿工具与自主 Agent 运行环境</p>
    </div>

    <div class="launchpad-grid-6">
      <!-- 1. Claude Code (Anthropic Claude 官方原版图标) -->
      <div class="launchpad-card">
        <div>
          <div class="app-icon-badge">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsSAAALEgHS3X78AAAEYElEQVRYhcVXW4hVVRjedrMii+6FRRRFUQ9iVNAFKipoKAeC1vrXGTUkSn0xGpyz/nVmHjpRYJQvZQ+R0EOXhyQksQsVKFo9WBORdc6sf59RiWlUyCmly5SWJ/69195n7T3nOo31w2Lm/Ovyf+v7b2sHQQcZXbnyVCoVrpsYFGcE/4eQgdcJoU6oDo2PqMubrakOL7uUNGwkLW6ZU+PVtQNXxMbjYTU83x4kfDenALaX7zqFEI54IH6ulMVZMwAgTLr5z+cUAAtp+ZTPQqjVE4En9XL5JEI4FjGE8FqQkxDVUIhqNERYFcxGamv65ocIoQdib12Ik5N5Wlu4IAVnoOjvJVTDqfsQfuO1bY2NG3E1aVkaQ3VbBgTKJZlYQLksnSuJ6xsA5L2pcQOP+XsIYcoH3lRIw2du8V+Mvh4E85I5i/BRaggh5PiI9FrenejHSg+dH4EqijsJ4WjGdaiGOtIdImzKoDawdbcZONe76bGUBSMfjUGr5Y7i76N1eullhHAwaxw2+ZdpKVXOZ4RtOer2WK1uciy84un3VcritMTPoZFbOF4I1a7c/mqzzGkpdY5qLUv+bQnhTzJq0AH8xbvZKkJ4yf1+mlC+nDP+aw0LNwSzETJwc6jh2+yB8j1r5Iue7muL8JZz186c8Xpo1Irg30htTd98i+qZXED97f1/nBB+yBt2pfvtZmfuK684vWbU4lp56dndAzFqMSHsbm5o5uCc52Dcg+KcUBfuCzWMuACnOMOidYfTBlcZFOftLy85sxMbhLDOO6DlCBF+4uDLseUPPuPd6GAaEQsJ4Q83Mc11PfK9gZ0c2YTqDfa7Raldyq3rlglvHOCUJqPKhNBndf+CzO0oimD4wlE06W7Qq5FM6kXtGeGR0Axc1bWvm9HOhYhrOB9ULQ5cw/7sYJzpHSOEHYRyM/ueBzcqi/IFaxSSUdCxLOeFHyOhgTdd5LcDMMW1gTtgh3j5JCnnbYX9ZQ08Swi/JxFOBjZEf1seLjdzlYz3Fu6P9sd1Ytpbd5gzpaVhpohQPh4FUCO6t9eKcCMhVBJDbUB8nA+2OJPEHXxu0mOaitXi2lxNP2KNXM1l2iK843Tb0pZrYEOSctyULMJXMWA1une4cHHQi1gjV2fo1fB+8hi1Gp50+h85fUMtn4vXqHsI1avZHpGyM26HxJVdGa8HwbxGE1KHOO9TYCV5uyvJx0NUD7COiwmv5YZTK4kLXQDGgTgiFvIj1v2e7LopWa0eZmp96uIuKPc7RtYnekI5EencU4vzvtGI5JZIF7tpOr7QLJ7to/xhgupTx8oujm7WV4riEmfsqP/YIC0/zD/dCGGRK3IHegZgG+33oO/LsAgPumifmFEvGpV0anxo+UUxs/0LmN2ejFMUXGlzWZSZi+s6G/lyBmiUMmVBq/6eb50IFxEuq7WSuDXICSF84FJwa34umtewngx8w608OBFCydeQho0nxEDQCQDfkGu9l6r/PYhOXzpdyD/VGsqNtcGUnQAAAABJRU5ErkJggg==" alt="Claude 官方图标" style="width:36px;height:36px;object-fit:contain;" />
          </div>
          <h3>Claude Code</h3>
          <p>Anthropic 官方终端自主编程 Agent 直接在 CLI 自动重构工程代码 编写测试并无损输出 200K 长思考链</p>
        </div>
        <div class="launchpad-actions">
          <button @click="copyToolchainConfig('Claude Code')" class="btn-apple-black">
            复制环境变量
          </button>
          <a href="#quickstart" class="btn-apple-link">
            CLI 指令 <span>›</span>
          </a>
        </div>
      </div>

      <!-- 2. OpenAI Codex (OpenAI 官方原版花瓣拓扑徽标) -->
      <div class="launchpad-card">
        <div>
          <div class="app-icon-badge">
            <svg viewBox="0 0 24 24" fill="#10a37f">
              <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.259 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7466-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3428 7.897a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3427 7.897zm16.5991 3.8558L13.1038 8.3843l2.0153-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4022-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813v6.7227zm1.145-2.0728l3.4913-2.0153 3.4913 2.0153v4.0305l-3.4913 2.0153-3.4913-2.0153z"/>
            </svg>
          </div>
          <h3>Codex CLI</h3>
          <p>代码自动化合成与大型脚本执行终端 原生兼容 OpenAI 代码生成标准 提供毫秒级代码补全与调试链路</p>
        </div>
        <div class="launchpad-actions">
          <button @click="copyToolchainConfig('Codex CLI')" class="btn-apple-black">
            复制接入参数
          </button>
          <a href="#quickstart" class="btn-apple-link">
            配置说明 <span>›</span>
          </a>
        </div>
      </div>

      <!-- 3. DeepSeek Harness (DSH 官方正版双色蓝鲸鱼 原版提取) -->
      <div class="launchpad-card">
        <div>
          <div class="app-icon-badge">
            <svg viewBox="0 0 50 50" fill="none">
              <path d="M48.8354 10.0479C48.3232 9.79199 48.1025 10.2798 47.8032 10.5278C47.7007 10.6079 47.6143 10.7119 47.5273 10.8076C46.7793 11.624 45.9048 12.1597 44.7622 12.0957C43.0923 12 41.666 12.5356 40.4058 13.8398C40.1377 12.2319 39.2476 11.272 37.8926 10.6558C37.1836 10.3359 36.4668 10.0156 35.9702 9.31982C35.6235 8.82373 35.5293 8.27197 35.356 7.72754C35.2456 7.3999 35.1353 7.06396 34.7651 7.00781C34.3633 6.94385 34.2056 7.2876 34.0479 7.57568C33.418 8.75195 33.1733 10.0479 33.1973 11.3599C33.2524 14.312 34.4736 16.6641 36.8999 18.3359C37.1758 18.5278 37.2466 18.7197 37.1597 19C36.9946 19.5757 36.7974 20.1357 36.624 20.7119C36.5137 21.0801 36.3486 21.1597 35.9624 21C34.6309 20.4321 33.481 19.5918 32.4644 18.5757C30.7393 16.8721 29.1792 14.9917 27.2334 13.52C26.7764 13.1758 26.3193 12.856 25.8467 12.5518C23.8618 10.584 26.1069 8.96777 26.627 8.77588C27.1704 8.57568 26.8159 7.8877 25.0591 7.896C23.3022 7.90381 21.6953 8.50391 19.647 9.30371C19.3477 9.42383 19.0322 9.51172 18.7095 9.58398C16.8501 9.22363 14.9199 9.14355 12.9033 9.37598C9.10596 9.80762 6.07275 11.6396 3.84326 14.7681C1.16455 18.5278 0.53418 22.7998 1.30664 27.2559C2.11768 31.9521 4.46582 35.8398 8.07373 38.8799C11.8159 42.0322 16.1255 43.5762 21.041 43.2803C24.0269 43.104 27.3516 42.6963 31.1016 39.4561C32.0469 39.936 33.0396 40.1279 34.686 40.272C35.9546 40.3921 37.1758 40.208 38.1211 40.0078C39.6021 39.688 39.4995 38.2881 38.9639 38.0322C34.623 35.9678 35.5762 36.8081 34.71 36.1279C36.9155 33.4639 40.2402 30.6958 41.54 21.728C41.6426 21.0161 41.5557 20.5679 41.54 19.9917C41.5322 19.6396 41.6108 19.5039 42.0049 19.4639C43.0923 19.3359 44.1479 19.0317 45.1167 18.4878C47.9292 16.9199 49.064 14.3438 49.3315 11.2559C49.3711 10.7837 49.3237 10.2959 48.8354 10.0479Z" fill="#1D6CFF"/>
              <path d="M24.3262 37.8398C20.1196 34.4639 18.0791 33.3521 17.2358 33.3999C16.4482 33.4482 16.5898 34.3682 16.7632 34.9678C16.9443 35.5601 17.1812 35.9683 17.5117 36.4878C17.7402 36.832 17.8979 37.3442 17.2832 37.728C15.9282 38.584 13.5728 37.4399 12.6514 35.5679C11.7534 33.7437 12.3677 32.0078 13.0688 31.3916C13.7935 30.7676 14.4077 31.0078 15.0693 30.9595C15.7549 30.9121 16.2749 31.2559 16.7075 31.7275C17.062 32.1123 17.5503 32.1279 17.9756 31.8481C19.1812 30.9844 20.4497 30.2236 21.8047 29.584C23.9004 28.5918 26.0903 28.0078 28.4067 27.9839C30.4785 27.9604 32.5112 28.4722 34.4097 29.3516C35.0396 29.6484 35.5205 29.5439 36.0322 29.2158C37.4033 28.2715 38.8374 27.4243 40.4053 26.792C41.3345 26.4321 42.2798 26.2959 43.272 26.5439C44.2568 26.7915 44.8398 27.5039 44.6904 28.5273C44.4775 29.3999 43.8945 30.0718 43.1465 30.5195C41.8232 31.2637 40.4922 31.9917 39.3896 33.0317C38.9878 33.4077 38.8853 33.8398 39.0112 34.3599C39.3423 35.8477 39.4365 37.3516 39.208 38.8633C38.8223 41.2559 37.6641 43.2642 35.8682 44.8081C32.9692 47.2881 29.6763 48.5522 25.8696 48.6001C24.877 48.6157 23.8848 48.4722 22.9551 48.2402C22.4272 48.1123 22.2544 47.8081 22.1836 47.312C22.1362 46.9038 22.3726 46.5918 22.7583 46.4639C23.9556 46.0718 25.1372 45.5923 26.248 44.9121C27.9175 43.8638 29.2568 42.4722 30.0835 40.5918C30.3984 39.8716 30.3438 39.3521 29.603 38.9917C28.8472 38.6157 28.0195 38.6079 27.2007 38.8799C25.6484 39.416 24.0889 39.9277 22.3789 40.1597C21.0317 40.3438 19.6455 40.2319 18.3618 39.6396C17.6689 39.3198 17.062 38.8799 16.5342 38.3037Z" fill="#38BDF8"/>
            </svg>
          </div>
          <h3>DeepSeek Harness</h3>
          <p>新一代长程智能体与复杂多步任务运行架构 深度释放 DeepSeek R1 满血思考潜力与全自动工具调用</p>
        </div>
        <div class="launchpad-actions">
          <button @click="copyToolchainConfig('DeepSeek Harness')" class="btn-apple-black">
            复制 DSH 变量
          </button>
          <a href="#quickstart" class="btn-apple-link">
            向导 <span>›</span>
          </a>
        </div>
      </div>

      <!-- 4. Hermes Agent (Hermes Desktop 客户端官方正版图标) -->
      <div class="launchpad-card">
        <div>
          <div class="app-icon-badge">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAACaeSURBVHhe7Z0HvBXF9ccDioAgYIEYVKqigpWmFAsC9gIoghQVEbFiwJqogMYGihoVsYBRUTSQaFCxF2xYYu9K/qKUZ5TyKPHxKI/5n+/snsvcvXPre/eCyf193m/f3dndmdmpZ86cmf1NEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUURhMH/+/Nr/+c9/diwvL2+1Zs2atsL9Qu7vcsOGDXHn0BiTcJ+H9p6EezdsICz7e4PrnooSB+KxYY0Tl/h47WfWxMKx/vNevJ+ZN69W+Mr/2ygrK2u6fv36UyoqKm4Rvlixfv1c+b9YuFoS1ygrKjZsEDcOwuC3ntv/oKJC7gt+6/XgHvtnr1WWbtgb3ZzfGmd+Vtj/sXeQ9+SeMiHv95XwSXEbvW7dusOXLFlSL0yS/36UrFzZUF58iCTKc8KVUhv/5yGFYYGkxZ3ys12YTP99WLVhQyN50WvlRRcGr70R1JBMKYcEt0xZWfj8rCyjkDSaKe5dwmT79WP69OlbSI0fKS+1KHxHCzcR8kUfli1dZr766ivz6quvmMcee8xMmjTJ3HDDDebKK64wl112mbnyyivN+PHjzOTJk82sWbPMl19+aaTfDp/eCF94laULOZ8mbBkm468TCEhSot8M3ynhhfNBFyJ0mblz55rnnnvOTJw40Vx00UWm78knmw4d2pvtttvOSBTTslq1ambnnXc2Rx99tBk3brz58MMPQ98D+OKQinJIcItSIWlXKpVnqMTj1weJ+CB5gVXhu3hfVCmHBLds6eLnn382H370kZk9e7Z59913zddff21++ukns2rVKlsoVq9ebZaVltqWYOrUqaZfv36mTp063gLgY8eOHc2f//xnG47CF6d0lEPKd1fIb+SDahL2rwOS+X8Mop5ZwsghwS1TuvjXv/5lHnjgAXP1NdeYa4QTJtxs7rrrLvPwww+b1157zRaCZPjuu+/MhRdeaLbYYgtvpvvYqFEj22UsWbwk9CX1+8ohwc2lHBLdQsgQAtmgjoS7eUMyf3QY54SXiVIO3t+Z0MWLL75oevfqbXb87W9Nja1qeDML1qtXzxxzzNFG5BIjA7fw6Xi8/fbbZp999vE+n4x0EVOmTAl9SP/eUcohwc2lQn4/J/+2kDA3L0ikbPMkmX+ejakg+hLJaOz7+6/56OKZZ54x3bt392ZKOnbs2ME8//zzoU9BHIgLWLlypenTp4/3uVTs3bu3+fHHEutHNN6VpcZNutWHJKzND+vWresmkbPVyvcCVUHFW2+9ZQ4//HBvJmTL888/35SJTACi4Zx66qneZ1KxSZMmVvZQuPHPlXII/oeQ35uXYChx2lYiNS+MXFrKIcEtFRULFiwwQ4cO9SZ8ZYhQ9/08G/2EME888UTvM6lYo0YN88gjj4Q+ZJYmqSiHjb8D/0qFjSWsTQvG+PyXin97ri8qhwQ3l4rJUyabhg0behO8Kkg/zqgAuOGuLltt9ttvP+8zLqtXr2623HLL2Hm9+vXNX//619CX3NImGUP/npZwNjmqSUT2ruqmXw5C+55Wcs+lFmbC+pJJ/KfGkoG/FSFynqcloGBsvfXWCc9HufNOO9mChF/Vqv3GDBw40Dwrcgpw36+yVMjv3hLupoGEX53/EolpYWSqhhUbX/BN6evpUwmusnSHd7Vr1w4zfEfTqVMn69asWTOz1VZb2RFAWVlZEAHKocQJ3HbbbbHno6Tm16pZ0/4/9NBDTacDD7T+DxgwwDz55JPmjTfesH4kvGsWlEP8Of5VbPhU/m06/UB5eXlricx6G5lIBKEcEtz8tC9jfytQ05IhO+ywg2nQoEFCotesWcvr7iO1sYZkjg7vatWqafbYYw/7+7rrrjMdOnQwF1wwwrz88svW7UyRMyzsK2hiV5h27drG/HRJZjdt2lT8rWW23XZbc8UVV5jDex5u2rdrbxYvXmLVyqo0in/vzCkHy9h5CPl9pMShsJBwbamTlv/GMBJVRnD//ffbhN1tt1Zmxx1lbC9NNCpZ3Ehs/ncQwW1rqcla83BLxurVq9laf4SMHE477TTrRlPd64Re5qmnnrYaQsUf//hHe10leTdeL7z4QszP2pLZrjqZzD/kkEPs7wOlBXjiiSfM0DOG2ox/8MEHq0QolEP8eeDXDAmzsJBwq3/77bc1pQB8E0YigXLw/k5FMF0EJ4I4/vjjzU7Sp9Iv77jjjrYQ8Jtrxx13nGnfvr393bx5c1so9B7c4FYRhVAzqaG/k3vee++9mFB3/5T7bZgKau5DDz1o9t13H9N6zz2Zw7fuGjdw0EFd7bN0KaecMsDUr1cvFgYywOWXXW6b/PLyNebHH3+0z1x++eXmrGHDzL///W97Hn3vKOWQ4OYjkDxYLr+3k/ALi7Vr17bXSLiRSkc5eF8QzJkzx9bqq8eOldq/m9l9990lI1rb2lq/fj1bIHC7+eabTXVpEWrVqm1atWplE/+oo46KZQSkSa5RY0uaKivANZIRxF577SU1/imr7Tv99NNjGaygdaAgTZ58n83gF194MbjgxPFvf/97LAxakLFjxsYJiBMm3GLvUxDGkUceKQWwmRTu6YGjTYLENMiWCvl9vIRdGEh4tvmXF7Nav2ik0tKxklECpP29JYMmT54itewg00FqeNeuXaU5DYS07ocFGr8nZz5p9tt/f/t71113NbuIkEgtHDN6jBUYVS448IADzfbbb29/NxcBj/+jRo6ymQ/ol92mv7S01Fx99dX2viFSONDvk2FMHAGNZ+myUjureM8995j77r3XCowU3L/85S/m+uuvN7/8UmbvDQdG9lrbtoHscOrgU81P/w7mI2LvHv7PlWDdunW3iv+FgYSnY3/bfvoipZRDgluUcsAb20w+/fTT5ulZs2xtPvvsc8zgQYNsi9CrV2/bvDKsIgPbtGljE7RD+w72/8EHHyxN90N2wmfx4sXm888/N++//75p0aKFvX766UPM8LOGm4ULFmpw5tNPPjUnnHCCldTvnjTJtJNMQvOH4EmY2AI8PPVh6xewcQ3HpkwujRkzxrz00kv2HJuCI444wrwoMgLKqrPPPts+//nnX5gzpek/sU8wjN1FWrK/SwsCoumQCeWw8dwRmqUAvCH+FwYSXvXp06dvVbG+4gMCj0UoB8oBL2yfSdNc9ssvsX6TDOzSubPp1q2bTVDG7CUlJTYB16xZY+644w5z3nnn2czHaONeqY2zZ79mn1WQSTNmzAjPEnHSSSfZjKGgIEfsv9/+ZrvtA8GO8LbZZhspHHfbe2NxFjDFzD2Q7ohCghDIuXYHw4cPN7fffrs57LDDzGHyDq2kS8OdOP/yn1+sP25auJRDglsyAmmNv/v4448LN1P4bUlJQyl1VqLxRSoV5bDxtwBhicz8RTJfNXFgxYoVdpbv0UcfNaNGXWT+7//+z16noPhwyy23mAtHXGiWLVtmm3ORUWxhWbJk41QtYKJnuVynpaA7IeMYYTCSqF+/gWkZthrK7pKBCo0z//fee297fUuRFU6TLoOWxH2OoeU555xjBkkrVlNkEZ20otX64IPAqETToTIEUgBWLF26dBfxvzCQzNldugCrLUmIUOQ8FcHjjz9um+/ly5fbmg2Whpkmpdp8//0PZupUad6ldo8RgYt++rt588zf/vY3O27v2bOnGTx4sLn1ttvssGzfffe1KmPkA+YNkPgvueQS880339hwxo692nYV/5g503YBNMvySpYUhKhhCC2BFiI33vip99B6nHzyyVZIVbeaMjzt1auXGSAjBXQZxKOB+EX3cscdd8b8UT9zJZC8WCdp10bCLQxWrVq2j5S6pAqgTKjo1u1Qc8P1N9g5+nekf58xfYb5+KOP7T3Tpk2T8fM0m6BI7YcffoRNbMb0DPkwyOAaEvsRRxxpJX3OlSS8agD33mtvs4NcP1TG6qiWzzprmO333fuTkYIWBYXIvQcp/5hjjolzQx9w1NFHmwMOOMDUrVvHjkJw79evf8ZDwnRUSIvXQfzOLyQcOwIQybi7BG5DdyMTZarhDvj227m2CR591Wiboe3atbPTvNRMpGwMOAgW9hT33/3ud7HzKKm5+4ejAx/xv27durYvpqVAJ0Az7bs3yvHjx9v4Yhz66aefmpnSerz55pvmt2EBVPaPmJahFbSq4U6dzFbSDajwusceu8cESF/aZEOF/N5f/M4vJBxbAGT4dHIQbIoM9rgpQ2FamuMxts/t3/8UmzCniRSOVQ81+bBuh8USEpJprj7fx+OOP95msu+akqZZ/UFXEL3u43nnnms1ew0bbszwC0eMkHj3i7uvc6fOsbkFJergtvu3tYWXrmk7KRQURoaMNi0E0fSJo2fY7FKBXkbCyy8kHFsARAYYFASbJvJJqKAJppkkYepsXcf2owSDxq9x48ZxCZkJkQW6duniveajqpfTsUf3HubZZ5+N6RWYR2Dcr026khaLoarrhhJr3332tRpLMh7ZBHeshyo7PwAVItweJP7mFxKOLQAisZ8YBJt7AViwcKEdZrVpEyTi7q1ambZtgyY8XU1PRpRFf/rTn7zXKkMy7swzz7QGp2gg+0lBHTdunPdeLIzdwsuzFJSmTZrY36qb4P8br1dyltCZOZVWuZv4m1/IuNpOAZeXlx8bhuuPWBqCmTP/QWmK6fcZVmkNy5VoARHYUBv7rleGdaVvv+qqq+zEEkPGc6VbuPPOO63W0r0P6yKUQq6b1Vju0sTqCBBM6aZQODH8tfCkUaZUSAtwiISVXzgF4PgwXG+kkpISK/+B1lRthlu2bJlzzXc5a9Yz5tzzzvNey5WMOm688cYEa+FddtnFFgSUVfoeZC6thXsfmd6iBe9X3cogKsyeccYZMZWxN72Eckhwc6mQAnCw+JlfSDjaBfQJgs2yAAhVADz99GBaFpJ4qklLRu6hCfVdczls2DC7PsB3LVd2E0keaZ7ftATMOTC/UL9eYFG0ww7b2+Gp3j9kyBBbOPScgs3klp4jF/C/Y8cDKj0cVJStLCucDLCydGVoMZFDAQgRHTNnwrZt29na6LumRHGzdu06c6oIhL7r2ZKCp8PR2rW3tpm33XbbWvkF4ZWhXvQZ7AKOPfbYODe6AI07XR2FgueZLAK+tMqEioK2AKWlpZUuAId1jx/mZULG7QMGBEPGVLz3nnvNsmWlkkmph4TZUpv5dCSDMTd33ShEDRoELQYFAY0g/jGHAXxplQkVUgC6it/5hYRjC4AMX0YFweZeAKLz95kQsy40hmoMkoxoCBfKKIP+2XddSW12m+6q5AUXXBDTVEJGD9qFUftVYUQcFb70SkeFdMsHin/5hYRjC8DSpUvPCoLNoQCEcUa1i5fZkq5j4cJFCZM2CFduDWU1L/MFB0ekdJfMBtapk97aNxcyD9CjZ0/vNaiFoXPnzkzn2jTxpVc6KtauXdtR/MsvJBxbAGTM2TcINjHSckhwixIwe4eXufDZZ5+z08YMt/r2Pdna211yyaX2GjNwX3zxRSwclC1nnXWWOV9qJAs5mVDiPzWUpWEsCGUIWq/eNgnhVIYtReonLr5rLtFw/vDDDzausTSSkUHsdyo6egApAPnfXUTCURngzCDY3EstM314mSkx/UJ9iu0AU7kumP496sijbIYyArjpppvsMHPiXXfFTLLTgQKVy1KwZKRrufjii9MKrfCFF16wcfClVToqCloAJAMuCoLdGOlUEz9KvUfRxVHb0i/Wrp04FKQfJWMww3Lh+oMVDtPJ7APQLTKHQF+LadlDD00N7w5go+P4AW688Ya4ZytLxvlqDpaKE26eYMPXdMqGioLOBVRmFKAEGHzgLURJQn/o9uMUCqxvAKZgGIesXl1uz6N+AYZUjNExztBVPy6PP+44s3TJUnuv+7z6MWHChIRnfES1iwEp1slo9Hz3QAp4JrIOBdxCohGNVzoqysrKOotf+YWEE8oAlZsMUgJ3uKRTwXoOMfbEGujuu++2q2yefPIpKzT5/HpemlKaf+bq3YLUtetBdsMIlE0UEMy4dPWP+/ytt94aF3aUaPmYCiZ8DEr5P3/+/KQrlSmEus4gFZkGV7jvlAkVBR0FrChdcUYQbOULAP91Bq2m1CamXd1Ztq23rm2tfiVga69PBpPo+qzrF+Zg5dJCsC8Qq3/Uj0GDBtvrY8aOtZMwyAkg+jzqXn3GR6ZyWTvAMJSuhUkfNpY6N4WwhxyQbnkbSiXdvcSNUyZUlK5a1V38yi90LkBKW68wXG+ksqGCJVoMjTDqYIEmtUKCsmTaGBmA39jgsbgDRP1ZU77G7v0DRo0caZo3b2EnZ1599VVrZMrQ8JNPPrHX3Wf1+atkdKBhVhUZDka1gj4SRxCNVzoqZGh+jPiTX0g4VSYDuFR8+dWXtj+kMMgLWfMtmvKB0qezVIsoUEhKSoId56J+MDp45ZVX7NIydg8ZN3681OpxttaeMXSoFRKB+5z7PBa7hFGVxFTs97//vfeaS+QP4ItbKipWrFiR/8UhEo4tAMuXLj8nCDZ9hOVg6bsWz9BDwaJFi5BqrYEIwykWidDn0nxj6GlhvY33Q0EhuEdkBszKtDCsW7dxmVey53LZFiYdKcCXXnqpbeZ915X9+/UPY+GPYzKqYk0KwAjxJ7+QcEIhcFW/INjsIpsJ9YVAp04H2sRhHv3OiROlJRho7QhB3HOO2ZT7fBRxzzhU0F0QXlVz8OBTreWT75qS2cJcNIJysM+Uli69RPzJLyQcLQAxTSAR8EUsFeWQ4OYSME/eunVrmzg9evQwJ53Ut8oMKaMEtDCpjE4rQ+SZdMNBhrypuqhk1AIv8T9P/MkvJBwtAAODYKs+MyBYuXKlaRxmCPoBJneA7/7KErBuIN0y81zJiAEh1h2a+simlcAXxwSGrZ5i1fJVF4gf+YWEYwtAZY1C0xEw1NNlVkwAMcSLwvdsLgRsJ0tYuTBdxkJm/dQQJBmHDQvm2HxxTEZtAcrKyk4VP/ILCccWABkFDAuCzV8BcOcKWIz5+ONPWHcERJaHISTKzQnP5kJwy63ZT05Rs1kNRPPtu+6y1wknWNMx3zUlJmcan2gck1Eh8sMJ4kd+oXqAQhQAtHoSlK1dbOH2zdff2N081knGv/POO3btIPA9nw21Bg0ZMiQhQ6Iko7HiQQGEmTeLTNy9AVwSb6ktsXMWhbBO0L0nStTK876bZ+Pji6uPCvmdf0WQhGNbAOmfTwqCzV8BePChB22iMO5XzR3z+7q+H/iezZYKdg4lvFQkU8lwzMDSLUBB7eyubOL+TKaH2RsJ+OLqo0J+F84quBAF4Prrr7MJQqLrFu3vvfeuXaAB5E7vs9kSsPgz0w2nMiUFADtA1+3MoWemNVk/5+xAxeKLq48K6QJ6yvP5hYRjWwARyGJ2TL5IVYZysP66WjndVAHFzqKFwV68Cp8f2RCw9ayGVVkykthKWq0tqle329m411gNFHWLEuMUjVc0rj4qpAAcJ8/nFxKOFoDzg2DzUABCuLOCTLgAdvm4/vobrPHGSy+9LJJvsH2LwudfOoJ77r03LhMqw5o1t4pNRbMk3LU5ZDgL9RxGbRIpQExmAV98o1QZpry8/CR5Pr+QcGwBEAHs9CDYaCRzLxByCP6HcLVyJCSgK6D/RR2MxLxbq1Zm2rRH7OYS7C0Q9TMdFeedn3oOAOEvU+NRCoAag7JQVG3/ICuEolPHTaSb0NVRymz0AVoA5P37yrP5hYSjLUBowZB7hicjYK7enUJFDtBZPAoG5uHsKcTUMDtwMbzCuAT4/ExGRbrhGU23z1rJRyR5He+zmMQ1CWM6OWoNzTCyf//+cW7sLwgS4uyovJVaACTNBsqz+YWEYwvA8uXL86YJBFYJFLGlQyYA7K6BSlgNOhaVLLJGoKiOff6lIqD12HnnjTt7RNmoYSOrh8i8BagZs1imYLkFYMstt7B7BrFzqbrhLway7rrIPXbfI7aFnS/eLjdJAViVwf4AuRJg2kVwLplNY7r3s88+s9uzoBPQLdwUPv9SEbDvEOZo0fCUJ554kr3Hd81HpH9dAs4KIQqEe91uFhExI2OXMdcgNZt5gU3SBawoLU1rESSHBDfrHsJ3DQJs/wguyotGBYahJI5+ys3nR0YMTarZzs0XlnLaI9NswctE2wfRDrZoGbQAzABGWw4MXqJTw+wuikWz68b2ssAbd4eKggqBS5cuzdgewCVAg8fEi+86BMnW+KOE4eNOCt/z2RDw9S9fWBDlDd8ZZB4i03UDCKnNmje3cgsbVkWv77nnnnYtgOvWp3cf2xW56wzV7sEXb5dysPcVehQwxIYq8EXKR8B892VS2r///nt7nnifdU7Ycs0l1xSJz2dOOVg/omv4XGLOBeiP09n1KREAd9llZ7uJtW5j65IFI6iTXbeuXbvYcNwFs7QUCl/8lXKw9xS6BRhuQxX4IuUjwOpWTaCT3QN0M+dk9NkE2ucj56mofSebUvvCgLq3LzIAewj77okSRQ9axW3q1YtbG6ikgDRqFF8AOnboaMO5LtR+wrp16pqSkmDTTOB7B6goaAEQIfCUINjkEXMJmL3D4GLSXXfZ82T3oeRJp2dHulb4/IljktGBokOSOQD2D0TOoNBms8p4H2n2UeYg/bs6ACWbRWwf6QLYRg5g9u66sxMZrU+qPQS0IEsB6CPP5BcSji0Av/xSnpVVMPjnP/9pX0p3+kx2H/Z73JeOM6aHO28Lon4kQ/Q+uiR34waXbEHraiOpke51H5FRWodbwSUjBaN2ZAax26FBgWafRNedDa2JKypwjGSB+w76HqCgBUBkgKwUQeD+KVPsSyHhA989YOTIUXGJkIz0o+7MoAtqDRZErAu87757vR9vAtTwdEYaSPHs5QN911024ZsEOZiVsUoZvP9+UEmUl10aqMBZEo9hqYVE3ZduBe0CsrUHALqr1qhR4dYCOEfuIeNatgzG0JmQphZbf/wkgZCc0bSxEWO0G2G+X6HhYQfobu8aJbZ8uoMHlsa+e5QUFIS+XMzKMBsHKLhcd7a9A0tkGMrWdPN/8C+IAWvWrOknz+QXEo62AKcFwWZeAG4NLW4wpsDeD7jXATWVe6JkSOVzz5axWhQi6AISCxyZecnFl1CrwjuD7xmkmspl/O/bLiYT3nkH34Y2dtcx1/1YGRUoMChhS10Ql7Zh8klrdqY8k19IOCoExozY3cj4qLhr0l2xF2OvXiZvXCxcsCBh/hxSq3JNWB+ju43r5k8uqcWLfw6WoOs7lIhwGh2+uYwqfLIhaxlB79694tzZYVzBJBKrnC3I90j6SqUaLs8UBsuXL894GAhQ/rDxM/Pk8rglm0Ji648xJp9k823bihqVzRxSrcDNlgznVKACLOH23ceaPgUTUT6lTlUQrSDpQ4GjFXGvYQ6v6Nv3JGthpK1SLH3DNJYW4HR5pjAQGSDjDSIAhpwYdXTpEj8Xno7XXXut3d7dd60yZMcQ8OhjjyW16YMIZwMGDrBKHd/1qqDWamweotdYU6jQzSej5vFysOdSAPJvFayQEpveLNyxW0faZn0e+/7L4xkRLRwzfu5+ezSzqYS2TMmEDVvFSH9mz6uyhcmW9913n1X4+KabzxgSTLlUSFoi2OIWnSRSlBWyAGQzCpCDva9v3752gmP06DEJLxol1rOALWFcd4Swql6+RRf0+5EjvdfyTWSb+fMXeOUQeK20gID5D+QSKkB0abtCKstp8kxhsGTJkgvDcGMRSUUwderDtk9n6Tfz62wNK17FyAuyo4Z+44cxPNvCufew3UqPnj3i3HIlNntPPB6sNWCTpnTax6omIxv2RdAPWfrI11QAXyfjnALDl0iBm7ZACsApck9hkO1cAGDuHsOLhjvsYJd6446OHfUn2j93lu/VV2cnzJhBxvtV1QK4yiHATmO++/JFppfZQdx3DVJZfgjH/cgJuDFBpOkZS9vwvGzNmpPlnsIg18kgV9fN/jp8Jo7NnQAWPR9//JFVivjm3jG0nPXMLKmp8ZJytsRvtn0H7NJ5ww3B2BpMlFGJ75lcqPJFrsTsDbz++usxN76eBuLSNUhaRge95J7CQApA1hZBCvbqES9iRCBr2rSJadw4tQp13LjxtnvwXUtHmk60avT1+h1A9g/kg1OHC12wB1CmM3/5pCp9XPngmVnOp+jDSS7FunXresg9hcHKlSv3lBqb8UejVHGhQK+eyf55Sr4CCsgw3/V0pH//7LMg41G6YHN34YUjbCFgEwp07RZhFNl2DkHUXdmTjPTl7EdEk8071ZNxPWN730xgpsQvdANPPPGPmBubY7D/EYhL2xAiA3SR+wqDZcuW1V+/fr2VRtzIZEIFNXHw4EFphS+UISQGJuG+65kSGwOJs7UpxAaAuXosivmieOs9W5tVqwITMy0EoJ9jretq+lBn04UdI+N0+mXMurnOJlcYd7KvAZbEKJNQP0c/KpGOIy4YYePqmoszMwh86Sn3ri1dvbq53Fc4SKAf+SKUKRVYAGMHjyYQW3/s6JgfHzBgoPnrYxsFtUw/8ZaKdCMAGz8WaDCmZqhJTdcvgwEEUrXf5xofiaarQgBFWESpNeCUU6wSiYynEFCYEVJR6Izgg1L9+ls/mKBiA6iPPvoooy3y6a6WS4E/RfxXN76fXLHe/2EJIHlRsmjRoq3l3sJB+pyHfRHKhi6Y+KBmRsHoQT/xqqTVyGXalefUHG38+HE247AuwggFuz9AYVSVLHMWfIIG4QsdBmpYxuZ8lZzrvXv1Mh9KxiYDs40Medu2a2s/ZIHd3+0pbBDho48+FrePMi3K3LmJ29q5aSjd8Wy5t7BYu3atHQn4IpUN5WBfAqMH8dbWmmmPPmpeeulFu3MW06C4u2RqN90au2RUm0KsgfnAE2pqwDZy+nlXPu+CMEgGUuNppbBowsxb/WHmLg4J7xW6C8h4uhtsD/DrgQeClc9RnnbqaXaxi57X26aetQoCrt8ugVTGwn09XCG1YTcpebZd8kUsGwISqU24J1AqIhOwLpBFFr7r6UiTrSMBQNNMTdfrWCTregOUUaw/JPN130KEO92sAvjeJ0oFs30MQ9F/XHXlVbEwIUanfURu0HP2HsCKysLjp+uv5EX+N4fwQfqed4mAL3LZEnz77bcpZ90OOeRQW1Bohn3XMyV2+IyvXZMvChYrjBTs4M0cBqC/5x4yj5ZB4XsPH+UQu5/vD9UWeQJh1FVqufMRtHDJTMBcgvXrK5aWlpY2kOcKDykAdpm4L3K5EDABxDCRJpNmHiI88aFGvWfXXePVyFG6S6+SEeNM/iMXsA+xC4aK2u+6yqFk5myZEmAMwwQXau3pM2bEGbuwbAwtqcLnh0sgzf+D8uymQTAcrLCWExl/5CANXaxft94Oh1yQaBJ01jyg4wGmR9jH0xejlUTryEbULoKp60AHf7PIIHXC6WKsgxW+eGdKQLeDn1ePvTqm5h07Zqy9pvA961Ih3VMneX7TQSJwJRHxRbIy9EEKW8K3+zIhE0+zZ79mWjRvbpta9hhyoeGtkiafdYeMCBAA1QKost/1iWfgz8UXX2SaSEsw7KxhdkSj8D+TSCC1/zWJ36aFxKOu1NIFRMgX0aoiyKXvR2jDDOzoo4Nl2QzLXKjfAOUOW8kD3TauE2PwQNbdGJ9KtnaArgDBb+DAARtNvQS++6NUFFT7lwpSEk8I4+SNcGUJWDzpauOSkVo7cuRIq5ThfMQFF1jye+zYjc1szO8wPTE9a1C/fkzd+oc//ME+88EHwf5EbnyqgoAwUEWjOFK3hPtCxrkJJM2nSvw2H4jEbMdGbkSTUQ4Jbj5q5sx5++20evltGzSwmcj3/eljEd6Y1FFTK8b8irgwBFrbb3RmBrt0Dj4Fr3CfqQoC4qm2h757fATSIpVIC7KDxHnzwbvvvrujjJ+rpCuQQ/BfgBrV9/kXlwwd/xVK7RiYsukTK34OlWEjQ6692uxlh48gLhxBSUmJHRFgksVvUL5mjS1QfIASuM9UFSncdC1MTaug67vPpUJqf/73BMwFX331VTspBHbw7HuBTKk1n7F4KqNNyKQOs3eAlULsyatr/pmdq1t3G/NdKOnHhRFC9fOuASbqYYTFBfMDf93nqpIAzeDqcLMr3z1KhQjd50p8N1989tlnR0ghsPu3+F4kEwJ08JlMGU+atHEMTzPPCh4MSvU6O4kAXxgsVNX7poSzbYAJojat24Rn+SsAMBP/FZL5V0hcN39IS9BZJNTYhn6+l0pGwD7B6T6wAKn9qq2j1vbs0dPO8OlkzbV/CowqxeOEMBj/8yVw7qtZs5atiQpsE3W5lvvcpqBCMj//3wOoSshYu7mMpYOZDIHv5aIEpaWldjJGvIixadNmdm9e1w3q2jnAGsFHHn4k9um33r16h1fiw1Z07xEohSAZrsBEDe0gow7gPltIKkROWFKQ/X/yhC1//vnnceXl5bE38r0sVEStZNHX33TTzd4W4b77gmab7WNbtGguY+tAeYPih3E28IUzceLGph+OHj3augMMVCkAaqsYfT7fdCGZ/7R0py0kjr9ufPPNNx1XrFgRfB9VIe8affHolq2s4CktXW6aNWsW56784IMP7BpD9t9DT898Ae5ffB5M6rj+axjY1deJrPV/+eVX7DUwfPhw075d+/CscAXAhWT81zIyKJyZd6Ewb+68I1cuX/m0tAjBx3EicD/axJo9wMed1c0ldnPUUmzrWUDKF0UZuj0SavqSJTATLq4/DAExOVMwfLz4ouzG5rnQB8n096VADxV5pLbE7b8XX375ZavFPy2+VMbmr0thWMXLo3un6ZXLMcsgxuXJ1tvv1LixGTNmjMH8moUd7BzKqqNU8H0Z9MQ+J4ZXg13Dq1evJsPJ+LmCfEFq+toNFRWfyLj+NhHy8r/d++aIOXPm7IRO+/HHHz+nVq1af65Tp86M2a+88qjUkplXjR79mtT0D8X9HRmXvyWcU6NGjTe32abuh40aNvxArr0/aNCg5+fOnfuCCIFvyjNvCWdtqNgwUxL3SeHMivUVz4jbK99///1zjRs3/kz8eLtmzZhfc6655prX5frThDd9+vTXa9euOadkYcnznId+pONMqbmvSCa+uX7t+lflnPB8zz4l9z0h/ydJZv9B7u+1esPqXcNk+N+BFPxqMDwtoogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiqh6/+c3/A6acx0GKT24WAAAAAElFTkSuQmCC" alt="Hermes 官方图标" style="width:100%;height:100%;object-fit:cover;" />
          </div>
          <h3>Hermes Agent</h3>
          <p>Nous Research 自主推理 Agent 框架 支持深度函数调用与持久化会话 专为学术科研长程任务打磨</p>
        </div>
        <div class="launchpad-actions">
          <button @click="copyToolchainConfig('Hermes Agent')" class="btn-apple-black">
            复制 Agent 配置
          </button>
          <a href="#quickstart" class="btn-apple-link">
            详情 <span>›</span>
          </a>
        </div>
      </div>

      <!-- 5. Cursor (Cursor 官方标志性纯黑 3D 等轴测棱镜立方体) -->
      <div class="launchpad-card">
        <div>
          <div class="app-icon-badge">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" fill="#000000"/>
              <path d="M2 16.5L12 22V13L2 7.5V16.5Z" fill="#3f3f46"/>
              <path d="M22 16.5L12 22V13L22 7.5V16.5Z" fill="#71717a"/>
            </svg>
          </div>
          <h3>Cursor IDE</h3>
          <p>全球最顶尖的 AI 原生编辑器 一行替换 OpenAI API Base URL 畅享高频无限制 Composer 与多文件工程生成</p>
        </div>
        <div class="launchpad-actions">
          <button @click="copyToolchainConfig('Cursor IDE')" class="btn-apple-black">
            复制填入参数
          </button>
          <a href="#quickstart" class="btn-apple-link">
            教程 <span>›</span>
          </a>
        </div>
      </div>

      <!-- 6. Windsurf (Codeium 官方原版激浪徽标) -->
      <div class="launchpad-card">
        <div>
          <div class="app-icon-badge">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 14C7 8 10 6 13 10C16 14 18 13 20 10" stroke="#06b6d4" stroke-width="3" stroke-linecap="round"/>
              <path d="M4 18C7 12 10 10 13 14C16 18 18 17 20 14" stroke="#0ea5e9" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <h3>Windsurf IDE</h3>
          <p>Codeium 打造的下一代协同编程环境 搭载极速 Cascade 工作流 一键注入 ZH-API 专线即刻开启丝滑开发</p>
        </div>
        <div class="launchpad-actions">
          <button @click="copyToolchainConfig('Windsurf IDE')" class="btn-apple-black">
            复制接入参数
          </button>
          <a href="#quickstart" class="btn-apple-link">
            教程 <span>›</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. 接入教程 -->
  <section class="section-wrap" id="quickstart">
    <div class="section-header-apple">
      <div class="section-eyebrow">Quickstart</div>
      <h2 class="section-title-apple">极简一行配置接入</h2>
      <p class="section-desc-apple">无需改变既有调用逻辑 一行替换 base_url 即可享受顶级稳定算力</p>
    </div>

    <div class="macos-studio">
      <div class="macos-bar">
        <div class="window-dots">
          <div class="dot dot-r"></div>
          <div class="dot dot-y"></div>
          <div class="dot dot-g"></div>
        </div>
        <div class="macos-tabs">
          <button type="button" class="macos-tab-btn" :class="{ active: activeSnippet === 'claude' }" :aria-pressed="activeSnippet === 'claude'" @click="activeSnippet = 'claude'">Claude Code / CLI</button>
          <button type="button" class="macos-tab-btn" :class="{ active: activeSnippet === 'dsh' }" :aria-pressed="activeSnippet === 'dsh'" @click="activeSnippet = 'dsh'">DSH / Hermes</button>
          <button type="button" class="macos-tab-btn" :class="{ active: activeSnippet === 'cursor' }" :aria-pressed="activeSnippet === 'cursor'" @click="activeSnippet = 'cursor'">Cursor / IDE</button>
        </div>
        <div style="width: 50px;"></div>
      </div>

      <pre class="studio-code-body"><code>{{ currentSnippet }}</code></pre>
    </div>
  </section>

  <!-- 6. 模型矩阵 -->
  <section class="section-wrap" id="models" style="margin-bottom: 120px;">
    <div class="section-header-apple">
      <div class="section-eyebrow">Supported Models</div>
      <h2 class="section-title-apple">全系前沿顶尖模型矩阵</h2>
      <p class="section-desc-apple">一个统一密钥 随时调度全球顶尖推理与通用智能模型</p>
    </div>

    <div class="model-pills-row">
      <div class="model-pill-item">
        <span class="provider-tag">Anthropic</span>
        <span>claude-3-5-sonnet-20241022 (200K 上下文)</span>
      </div>
      <div class="model-pill-item">
        <span class="provider-tag">DeepSeek</span>
        <span>deepseek-reasoner R1 满血深度思考</span>
      </div>
      <div class="model-pill-item">
        <span class="provider-tag">DeepSeek</span>
        <span>deepseek-chat V3 高并发极速版</span>
      </div>
      <div class="model-pill-item">
        <span class="provider-tag">OpenAI</span>
        <span>gpt-4o / o1-preview / o3-mini</span>
      </div>
      <div class="model-pill-item">
        <span class="provider-tag">Google</span>
        <span>gemini-1.5-pro (2M 极限上下文)</span>
      </div>
      <div class="model-pill-item">
        <span class="provider-tag">Meta</span>
        <span>llama-3.3-70b-instruct</span>
      </div>
    </div>
  </section>

  <!-- Clipboard feedback is handled by the shared application toast. -->

  <!-- 8. Footer -->


    <!-- 页脚 -->
    <footer class="apple-official-footer">
      <div class="footer-content">
        <div class="footer-disclaimer-box">
          本平台所提供之算力与接口服务专为学术科研 编程实验及技术学习使用 请在自觉遵守相关法律法规及开源协议的前提下使用
        </div>
        <div class="footer-bar-bottom">
          <div>Copyright © 2025 ZH-API. All rights reserved.</div>
          <ul class="footer-links-row">
            <li><router-link to="/home">主页</router-link></li>
            <li><router-link to="/dashboard">控制台</router-link></li>
            <li><router-link to="/model-plaza">支持模型</router-link></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useClipboard } from '@/composables/useClipboard'
import AppHeader from '@/components/layout/AppHeader.vue'

const appStore = useAppStore()
const { copyToClipboard } = useClipboard()
const activeSnippet = ref<'claude' | 'dsh' | 'cursor'>('claude')

// Match UseKeyModal: Anthropic clients append /v1/messages; OpenAI clients need /v1.
const baseRoot = computed(() => {
  const configured = appStore.apiBaseUrl || (typeof window !== 'undefined' ? window.location.origin : '')
  return configured.replace(/\/+$/, '').replace(/\/v1$/, '')
})
const currentBaseUrl = computed(() => baseRoot.value ? `${baseRoot.value}/v1` : '')
const shellQuote = (value: string) => `'${value.replace(/'/g, "'\\''")}'`
const claudeConfig = computed(() => `export ANTHROPIC_BASE_URL=${shellQuote(baseRoot.value)}
export ANTHROPIC_AUTH_TOKEN="sk-your-token"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1`)
const connectionParameters = computed(() => `Base URL: ${currentBaseUrl.value}
API Key: sk-your-token
# 在客户端选择 OpenAI-compatible 提供商，并选择密钥分组支持的模型。`)
const codexConfig = computed(() => `# 合并到 ~/.codex/config.toml（与控制台 UseKeyModal 的 legacy 模式一致）
model_provider = "OpenAI"

[model_providers.OpenAI]
name = "OpenAI"
base_url = ${JSON.stringify(currentBaseUrl.value)}
wire_api = "responses"
requires_openai_auth = true

# ~/.codex/auth.json
${JSON.stringify({ OPENAI_API_KEY: 'sk-your-token' }, null, 2)}
# 模型及完整配置请使用控制台密钥的「使用」向导。`)
const currentSnippet = computed(() => {
  if (activeSnippet.value === 'claude') {
    return `# Claude Code 官方命令行终端 Agent 配置\n${claudeConfig.value}\n\n# 启动终端\nclaude`
  }
  const heading = activeSnippet.value === 'dsh'
    ? '# DSH / Hermes：在客户端提供商设置中填写以下接入参数'
    : '# Cursor / Windsurf：在支持自定义 API 的设置面板填写'
  return `${heading}\n${connectionParameters.value}`
})

async function copyApiUrl() {
  await copyToClipboard(currentBaseUrl.value, '已拷贝: ' + currentBaseUrl.value)
}

async function copyToolchainConfig(name: string) {
  const snippet = name === 'Claude Code'
    ? claudeConfig.value
    : name === 'Codex CLI' ? codexConfig.value : connectionParameters.value
  await copyToClipboard(snippet, '已拷贝 ' + name + ' 接入配置')
}

onMounted(() => {
  void appStore.fetchPublicSettings()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

.portal-root {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", "PingFang SC", sans-serif;
}

.ambient-glow-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1400px;
  height: 820px;
  overflow: hidden;
  z-index: 0;
}

.glow-blob-1 {
  position: absolute;
  top: -120px;
  left: 20%;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  filter: blur(80px);
}

.glow-blob-2 {
  position: absolute;
  top: -60px;
  right: 18%;
  width: 580px;
  height: 580px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(236, 72, 153, 0.08) 40%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  filter: blur(90px);
}

.hero-stage {
  position: relative;
  z-index: 1;
  max-width: 980px;
  margin: 0 auto;
  padding: 60px 24px 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 18px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  color: #6e6e73;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  margin-bottom: 24px;
}

.art-title-container {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.art-brand-line {
  font-family: 'Cinzel', serif;
  font-size: 84px;
  font-weight: 900;
  letter-spacing: 0.06em;
  line-height: 1;
  background: linear-gradient(135deg, #0f172a 0%, #334155 35%, #94a3b8 50%, #1e293b 65%, #0f172a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.art-slogan-line {
  font-size: 54px;
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.15;
}

.art-word-power {
  background: linear-gradient(180deg, #1d1d1f 20%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.art-word-glow {
  background: linear-gradient(135deg, #0071e3 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0 4px;
}

.hero-subhead-apple {
  font-size: 20px;
  line-height: 1.6;
  font-weight: 400;
  color: #6e6e73;
  max-width: 680px;
  margin-bottom: 38px;
}

.hero-cta-line {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;
}

.btn-start-hero {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0071e3;
  color: #ffffff;
  padding: 14px 38px;
  border-radius: 9999px;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(0, 113, 227, 0.35);
  transition: all 0.22s ease;
}

.btn-start-hero:hover {
  background: #0077ed;
  transform: translateY(-2px);
}

.link-guide-sub {
  font-size: 16px;
  font-weight: 500;
  color: #0071e3;
  text-decoration: none;
}

.wonder-dock-wrapper {
  position: relative;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
}

.dock-rainbow-aura {
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  background: linear-gradient(125deg, #38bdf8 0%, #a855f7 35%, #ec4899 70%, #f59e0b 100%);
  border-radius: 34px;
  filter: blur(14px);
  opacity: 0.55;
}

.wonder-dock {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 28px;
  padding: 22px 30px;
  box-shadow: 0 20px 48px -10px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.dock-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  overflow: hidden;
}

.dock-status-beacon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(0, 113, 227, 0.1);
  border: 1px solid rgba(0, 113, 227, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.beacon-core {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0071e3;
  box-shadow: 0 0 10px rgba(0, 113, 227, 0.35);
}

.dock-text-wrap {
  text-align: left;
}

.dock-text-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #86868b;
  display: flex;
  gap: 8px;
}

.dock-endpoint-str {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
}

.btn-copy-dock {
  background: #1d1d1f;
  color: #ffffff;
  padding: 10px 22px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.metrics-section {
  max-width: 1140px;
  margin: 60px auto 80px;
  padding: 0 24px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.metric-card {
  background: #f5f5f7;
  border-radius: 18px;
  padding: 30px 24px;
  text-align: left;
}

.metric-number {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #1d1d1f;
  margin-bottom: 8px;
}

.metric-number.gradient {
  background: linear-gradient(135deg, #0071e3 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.metric-title {
  font-size: 15px;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 4px;
}

.metric-desc {
  font-size: 13px;
  color: #6e6e73;
}

.section-wrap {
  max-width: 1140px;
  margin: 0 auto 90px;
  padding: 0 24px;
}

.section-header-apple {
  text-align: center;
  margin-bottom: 44px;
}

.section-eyebrow {
  font-size: 13px;
  font-weight: 700;
  color: #0071e3;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.section-title-apple {
  font-size: 38px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #1d1d1f;
  margin-bottom: 12px;
}

.section-desc-apple {
  font-size: 17px;
  color: #6e6e73;
  max-width: 680px;
  margin: 0 auto;
}

.launchpad-grid-6 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.launchpad-card {
  background: #f5f5f7;
  border-radius: 24px;
  padding: 32px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  border: 1px solid rgba(0,0,0,0.03);
}

.app-icon-badge {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  overflow: hidden;
}

.launchpad-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 8px;
}

.launchpad-card p {
  font-size: 13.5px;
  color: #6e6e73;
  line-height: 1.55;
  margin-bottom: 22px;
  flex: 1;
}

.launchpad-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-apple-black {
  background: #1d1d1f;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.btn-apple-link {
  color: #0071e3;
  font-size: 13px;
  text-decoration: none;
  font-weight: 500;
}

.macos-studio {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 20px 48px -10px rgba(0,0,0,0.08);
  overflow: hidden;
}

.macos-bar {
  background: #fbfbfd;
  height: 44px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.window-dots {
  display: flex;
  gap: 8px;
}

.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot-r { background: #ff5f57; }
.dot-y { background: #febc2e; }
.dot-g { background: #28c840; }

.macos-tabs { display: flex; gap: 4px; }
.macos-tab-btn {
  background: transparent;
  border: none;
  padding: 5px 14px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
  color: #86868b;
  cursor: pointer;
}
.macos-tab-btn.active { color: #1d1d1f; background: #f0f0f3; }

.studio-code-body {
  padding: 26px 30px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
  line-height: 1.75;
  color: #27272a;
  text-align: left;
  overflow-x: auto;
  white-space: pre;
}

.model-pills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
}

.model-pill-item {
  background: #f5f5f7;
  border-radius: 9999px;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  color: #1d1d1f;
  display: inline-flex;
  gap: 8px;
}

.provider-tag {
  font-size: 11px;
  font-weight: 700;
  color: #86868b;
  text-transform: uppercase;
}

.apple-official-footer {
  background: #f5f5f7;
  color: #6e6e73;
  font-size: 12px;
  padding: 40px 24px 50px;
  border-top: 1px solid rgba(0,0,0,0.06);
  text-align: left;
}

.footer-content { max-width: 1140px; margin: 0 auto; }
.footer-disclaimer-box { padding-bottom: 18px; border-bottom: 1px solid rgba(0,0,0,0.08); margin-bottom: 18px; }
.footer-bar-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; }
.footer-links-row { display: flex; gap: 20px; list-style: none; }
.footer-links-row a { color: #424245; text-decoration: none; }

@media (max-width: 980px) {
  .launchpad-grid-6 { grid-template-columns: repeat(2, 1fr); }
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .launchpad-grid-6 { grid-template-columns: 1fr; }
  .art-brand-line { font-size: 46px; }
  .art-slogan-line { font-size: 32px; }
  .hero-cta-line { flex-direction: column; width: 100%; }
  .wonder-dock { flex-direction: column; padding: 18px; }
  .btn-copy-dock { width: 100%; justify-content: center; }
}
</style>
