function num(val){
    if (val > 0) {
        return '<span style="color:green;">' + val + '</span>';
    }
    else 
        if (val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
    return val;
}
