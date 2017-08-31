//JavaScript代码清单10-3-2 app-lang-zh_CN.js
/**
 * 简体中文之本地化文件
 */
if (Tutorial.LocalizationWin) {
    Ext.override(Tutorial.LocalizationWin, {
        titleText: '本地化 示例',
        selectLangText: '选择语言',
        textFieldText: '文本 字段',
        dateFieldText: '日期 字段',
        monthText: '本地化月份..'
    });
}
grid.setTitle('月份浏览');
grid.getColumnModel().getColumnById('monthID').header = '一年的月份';
