function createController (stage) {
    var controllers = [{
        id: 1,
        center: {
            x: 150,
            y: 150
        }
    }];

    function addController(x, y) {
        var texture = PIXI.Texture.fromImage('100x100.png');
        var sprite = new PIXI.Sprite(texture);
        sprite.buttonMode = true;

        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        sprite.position.x = x;
        sprite.position.y = y;

        sprite.witdh = 50;
        sprite.height = 50;

        stage.addChild(sprite);

        texture.click = function (data) {
            alert(1);
            console.log('clicked');
        };

        return sprite;
    }

    var controllerArr = [];
    controllers.forEach(function (controller) {
        controllerArr.push(addController(controller.center.x, controller.center.y));
    });

    return controllerArr;
}
