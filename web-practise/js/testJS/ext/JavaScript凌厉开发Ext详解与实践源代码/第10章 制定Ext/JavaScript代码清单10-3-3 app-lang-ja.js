//JavaScript代码清单10-3-3 app-lang-ja.js
/**
 * 日文之本地化文件
 */
if(Tutorial.LocalizationWin) {
    Ext.override(Tutorial.LocalizationWin, {
         titleText:'ローカル化サンプル'
        ,selectLangText:'言語'
        ,textFieldText:'テキスト'
        ,dateFieldText:'日付'
        ,monthText:'ローカル化月..'
    });
}
grid.setTitle('月プレビュー');
grid.getColumnModel().getColumnById('monthID').header='月';

