function createPath (stage) {
    function addPath(x, y, width=100, height=100) {
        var texture = PIXI.Texture.fromImage('100x100.png');
        var sprite = new PIXI.Sprite(texture);

        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        sprite.position.x = x;
        sprite.position.y = y;

        sprite.witdh = width;
        sprite.height = height;

        stage.addChild(sprite);
    }

    path.forEach(function (point) {
        addPath(point.center.x, point.center.y);
    });
}
