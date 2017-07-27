module.exports = function (grunt) {

  grunt.initConfig({

    // typescriptタスクの定義
    typescript: {
      // tsターゲットの定義
      ts: {
        // ファイルの設定
        files: {
          // コンパイル後のjsファイル: コンパイル前のtsファイル
          'js/csv.js': 'ts/csv.ts',
          'js/timer.js': 'ts/timer.ts'
        }
      }
    },

    // watchタスクの定義
    watch: {
      // tsターゲットの定義
      ts: {
        files: ['ts/*.ts'], // 監視するファイル
        tasks: ['typescript'] // 実行するタスク
      }
    }

  });

  // 使用するGruntプラグインを読み込む
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');

};