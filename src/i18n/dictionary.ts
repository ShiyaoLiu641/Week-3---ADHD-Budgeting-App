// All user-facing text in one place, in English and Chinese.
// A "key" (like "items.title") maps to the two languages.
// Components look up text by key instead of hard-coding English.
// This is the i18n (internationalization) pattern: separate copy from code.

export const translations = {
  en: {
    // --- Login page ---
    "login.title.login": "Welcome back",
    "login.title.signup": "Create your account",
    "login.subtitle": "We keep your parked items private to you.",
    "login.email": "Email",
    "login.password": "Password",
    "login.passwordHint": "At least 6 characters.",
    "login.submit.login": "Log in",
    "login.submit.signup": "Sign up",
    "login.haveAccount": "Already have an account?",
    "login.toLogin": "Log in",
    "login.newHere": "New here?",
    "login.toSignup": "Create an account",

    // --- Home (landing) page ---
    "home.subtitle": "Save what you love. Buy what matters.",
    "home.cta.login": "Log in",
    "home.signupLink": "Create an account",

    // --- Items page (My list) ---
    "items.title": "My list",
    "items.logout": "Log out",
    "items.signedInAs": "Signed in as {email}",
    "items.empty.title": "Nothing parked yet 🌱",
    "items.empty.body":
      "Next time you feel the urge to buy, park it above instead. Come back whenever you like — no rush, no guilt.",

    // --- Add item form ---
    "form.heading": "Park an item",
    "form.toggle.add": "Add",
    "form.toggle.close": "Close",
    "form.name.label": "What are you tempted to buy?",
    "form.name.placeholder": "e.g. a second pair of running shoes",
    "form.link.label": "Link (optional)",
    "form.link.placeholder": "Paste the product link",
    "form.note.label": "Note (optional)",
    "form.note.placeholder": "Why do you want it? What would it replace?",
    "form.revisit.label": "Revisit after (optional)",
    "form.revisit.none": "No set time",
    "form.revisit.1day": "1 day",
    "form.revisit.3days": "3 days",
    "form.revisit.1week": "1 week",
    "form.revisit.date": "Choose a specific date",
    "form.date.label": "Revisit date",
    "form.submit": "Park it",
    "form.submit.saving": "Saving…",

    // --- Item card ---
    "card.decision.buy": "Buy",
    "card.decision.let_go": "Let go",
    "card.decision.still_deciding": "Still deciding",
    "card.viewItem": "View item ↗",
    "card.changeTo": "Change to",
    "card.decide": "Decide",
    "card.remove": "Remove",
    "card.revisit.inDays": "Revisit in {n} days",
    "card.revisit.tomorrow": "Revisit tomorrow",
    "card.revisit.today": "Ready to revisit today",
    "card.revisit.ready": "Ready to revisit",

    // --- Filter tabs + board empty state ---
    "tab.still_deciding": "Still deciding",
    "tab.buy": "Buy",
    "tab.let_go": "Let go",
    "tab.all": "All",
    "board.empty": "Nothing in this list yet.",

    // --- Danger zone (delete data) ---
    "danger.heading": "Delete my data",
    "danger.desc": "Remove everything you've parked. This can't be undone.",
    "danger.button": "Delete all my data",
    "danger.nothing": "Nothing to delete yet.",
    "danger.dialog.title": "Delete all your data?",
    "danger.dialog.body":
      "This permanently removes every item you've parked, along with its notes and decisions. This action can't be undone.",
    "danger.dialog.cancel": "Cancel",
    "danger.dialog.confirm": "Delete everything",
    "danger.dialog.deleting": "Deleting…",
  },

  zh: {
    // --- 登录页 ---
    "login.title.login": "欢迎回来",
    "login.title.signup": "创建你的账号",
    "login.subtitle": "心愿单只为你所见",
    "login.email": "邮箱",
    "login.password": "密码",
    "login.passwordHint": "至少 6 个字符。",
    "login.submit.login": "登录",
    "login.submit.signup": "注册",
    "login.haveAccount": "",
    "login.toLogin": "登录",
    "login.newHere": "",
    "login.toSignup": "注册账号",

    // --- 首页 ---
    "home.subtitle": "心动的先收藏，值得再花钱买",
    "home.cta.login": "登录",
    "home.signupLink": "新用户注册",

    // --- 清单页 ---
    "items.title": "我的清单",
    "items.logout": "退出登录",
    "items.signedInAs": "已登录：{email}",
    "items.empty.title": "还没有收藏任何东西 🌱",
    "items.empty.body":
      "喜欢的先收藏，值得的再买单",

    // --- 收藏表单 ---
    "form.heading": "收藏心愿",
    "form.toggle.add": "添加",
    "form.toggle.close": "收起",
    "form.name.label": "你很想买什么？",
    "form.name.placeholder": "第二双跑鞋",
    "form.link.label": "链接（可选）",
    "form.link.placeholder": "粘贴商品链接",
    "form.note.label": "备注（可选）",
    "form.note.placeholder": "为什么它不可或缺？",
    "form.revisit.label": "回看（可选）",
    "form.revisit.none": "不设时间",
    "form.revisit.1day": "1 天",
    "form.revisit.3days": "3 天",
    "form.revisit.1week": "1 周",
    "form.revisit.date": "选择日期",
    "form.date.label": "回看日期",
    "form.submit": "添加",
    "form.submit.saving": "保存中…",

    // --- 卡片 ---
    "card.decision.buy": "购买",
    "card.decision.let_go": "放手",
    "card.decision.still_deciding": "考虑中",
    "card.viewItem": "查看商品 ↗",
    "card.changeTo": "改为",
    "card.decide": "决定",
    "card.remove": "移除",
    "card.revisit.inDays": "{n} 天后再想",
    "card.revisit.tomorrow": "明天再想",
    "card.revisit.today": "今天要考虑一下",
    "card.revisit.ready": "可以再看了",

    // --- 筛选 tab + 空状态 ---
    "tab.still_deciding": "还在想",
    "tab.buy": "买",
    "tab.let_go": "放手",
    "tab.all": "全部",
    "board.empty": "这个清单是空的。",

    // --- 删除区 ---
    "danger.heading": "删除我的数据",
    "danger.desc": "删除所有收藏。操作无法撤销。",
    "danger.button": "删除所有数据",
    "danger.nothing": "还没有可删除的内容。",
    "danger.dialog.title": "删除所有数据？",
    "danger.dialog.body":
      "此操作会永久删除你收藏的每一件东西，连同它的备注和决定，且无法撤销。",
    "danger.dialog.cancel": "取消",
    "danger.dialog.confirm": "全部删除",
    "danger.dialog.deleting": "删除中…",
  },
} as const;

// The two languages we support. "en" is the default.
export type Lang = keyof typeof translations;

// Every valid key, taken from the English list (both languages share keys).
export type TranslationKey = keyof (typeof translations)["en"];

// Look up one piece of text. `vars` fills placeholders like {email} or {n}.
export function t(
  lang: Lang,
  key: TranslationKey,
  vars?: Record<string, string | number>
): string {
  let text: string = translations[lang][key];
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replace(`{${name}}`, String(value));
    }
  }
  return text;
}
