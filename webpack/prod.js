const merge = require("webpack-merge"); // Импорт функции merge из webpack-merge для объединения конфигураций webpack
const path = require("path"); // Импорт модуля path для работы с путями
const base = require("./base"); // Импорт базовой конфигурации webpack
const TerserPlugin = require("terser-webpack-plugin"); // Импорт плагина TerserPlugin для минификации кода

module.exports = merge(base, { // Экспорт объединенной конфигурации
  mode: "production", // Режим сборки
  output: { // Настройки выходных файлов
    filename: "bundle.min.js", // Имя выходного файла
    path: path.resolve(process.cwd(), "build") // Путь к папке сборки
  },
  devtool: false, // Отключение source-map в продакшене
  performance: { // Настройки производительности
    maxEntrypointSize: 900000, // Максимальный размер точки входа
    maxAssetSize: 900000 // Максимальный размер ресурса
  },
  optimization: { // Настройки оптимизации
    minimizer: [ // Массив минимизаторов
      new TerserPlugin({ // Использование плагина TerserPlugin для минификации кода
        terserOptions: {
          output: {
            comments: false // Удаление комментариев из минифицированного кода
          }
        }
      })
    ]
  }
});
