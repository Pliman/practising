//修改右键的事件监听器所服务的对象
newNode.on('contextmenu',         showRightClickMenu, RightClickMenu_A);
asyncTreeNode.on('contextmenu', showRightClickMenu, RightClickMenu_B);