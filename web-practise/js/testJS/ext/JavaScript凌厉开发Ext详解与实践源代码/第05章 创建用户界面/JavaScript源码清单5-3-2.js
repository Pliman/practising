function linker(val){
    if (typeof val == 'object') {
        return '<a style="display:table;width:100%;" title="' + val.url + '" target="_blank" href="' + val.url + '">' + val.text + '</a>'
    }
    return val;
}
