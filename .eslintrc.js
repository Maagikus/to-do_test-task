module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential", // Используйте 'vue3-essential' для Vue 3
    "eslint:recommended",
  ],
  // Удалите строку parser: "babel-eslint"
  rules: {
    "no-console": "warn", // Предупреждение для console.log
    "no-unused-vars": "error", // Ошибка для неиспользуемых переменных
    "vue/attribute-hyphenation": "error", // Атрибуты должны быть с дефисами
    "vue/component-name-in-template-casing": ["error", "kebab-case"], // Имена компонентов в шаблонах должны быть kebab-case
    // ... (другие правила)
  },
};
