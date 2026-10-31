# Stage 5 — Devpost 提交材料

> 这是当前阶段的完整工作说明。开始前先读 `STATE.md`；完成后把证据写入 `evidence/`，更新 `STATE.md`，再读下一个阶段文件。不要提前执行后续阶段。

准备以下字段和素材：

### Project name

### Elevator pitch

Provide a short tagline for the project. You can change this later.

### Thumbnail

Generate a PNG for this project. **Generate, do not crop.**

### About the project

Be sure to write what inspired you, what you learned, how you built your project, and the challenges you faced. Format your story in Markdown, with LaTeX support for math.

```md
## Inspiration

## What it does

## How we built it

## Challenges we ran into

## Accomplishments that we're proud of

## What we learned

## What's next for [Project name]
```

### Built with

Add up to 25 tags. Only include the necessary ones.

### "Try it out" links

Add links where people can try the project or see the code: the deployed URL (GitHub Pages / Vercel / Render) and the GitHub repository URL.

### Image gallery

- JPG, PNG or GIF format
- 5 MB max file size
- 3:2 ratio for best results
- Up to 15 images
- Each image needs an English caption within 150 characters

### 提交方式与人工闸门

你可以准备并填写 Devpost 表单，但最终提交按钮必须由人类点击。

**允许：**

- 用 Playwright 打开 Devpost，填写标题、pitch、about、tags、链接。
- 上传 thumbnail、gallery 图片，填写 caption。
- 保存草稿，截图给人类确认。
- 人类提交后，验证公开页面。

**禁止：**

- 输入账号密码、处理 2FA / captcha。
- 点击 Submit / Publish / 确认提交。
- 向人类索要密码、cookie 或 session token。
- 把登录态写入仓库。

**前提：** 浏览器必须已经由人类登录。优先用 Playwright 自带的 Chromium + 专用持久化 profile（放在仓库外，不要用日常 profile）；如果只有 Edge，可用 `channel: "msedge"`。如果没有可用的图形界面或登录态，停止自动化，改为输出 `submission/` 提交包（字段值 + 素材 + 操作清单），由人类粘贴并提交。

自动化填写前先实际打开页面检查字段，不要依赖记忆中的 selector。填写完成后逐项核对，并截图保存到 `evidence/stage-5-submission/`。任何字段不确定时留空并标注，不要猜。

### 提交规则

1. 所有文案中的能力宣称必须与 Stage 3.5 的验证结果一致，不得编造指标。
2. 准备一份提交检查清单：标题、pitch、thumbnail、about、tags、links、gallery、video。
3. **不要自行注册比赛、输入账号密码或点击 Submit。**
4. 人类已登录且浏览器会话可用时，可以填写表单、上传素材，但必须停在最终提交前并截图确认；否则输出提交包。
5. 人类提交后，如果公开页面可访问，验证标题、图片、视频、链接和 Markdown 渲染是否正常。

### Stage 5 完成条件

- `evidence/stage-5-submission.md` 包含所有字段、素材路径、检查清单。
- 所有链接可访问。
- 缩略图和 gallery 符合格式要求。
- 人类已经确认并完成提交。
- 公开页面已验证（如可访问）。

---
