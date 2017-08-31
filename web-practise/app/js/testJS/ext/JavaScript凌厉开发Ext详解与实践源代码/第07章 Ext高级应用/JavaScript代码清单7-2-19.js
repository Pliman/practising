//JavaScript代码清单7-2-19
function base(){

}

base.prototype = {
    foo: function(d){
        alert(d)
    }
} *
function sub(){
    this._super();
}
sub = Sys.extend(base, {
    foo: function(){
        alert(33)
        this._super(99);
    }
})
obj = new sub().foo();
(obj instanceof base) == (obj instanceof sub); // return true.
