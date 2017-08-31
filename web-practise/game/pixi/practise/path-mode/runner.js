function createRunner (stage) {
    function addRunner(text, x=50, y=50) {
        let sprite = new PIXI.Text(text,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});

        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        sprite.position.x = x;
        sprite.position.y = y;

        stage.addChild(sprite);

        return sprite;
    }

    let runnerArr = [];
    runners.forEach(function (runner, index) {
        runnerArr.push(addRunner(runner.text));
    });

    return runnerArr;
}
