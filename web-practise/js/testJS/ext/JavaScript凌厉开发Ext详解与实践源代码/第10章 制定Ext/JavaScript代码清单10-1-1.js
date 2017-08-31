//JavaScript代码清单10-1-1
if (!ts.hcell) {
    ts.hcell = new Ext.Template(
		'<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id}" style="{style}">'+
		'<div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">', 
			//判断grid是否启用了菜单
			this.grid.enableHdMenu 
				? '<a class="x-grid3-hd-btn" href="#"></a>' 
				: '', 
			'{value}<img class="x-grid3-sort-icon" src="', Ext.BLANK_IMAGE_URL, '" />', 
		"</div></td>");
}
