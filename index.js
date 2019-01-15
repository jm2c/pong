"use strict";
var Pong = (function () {
    function Pong(width, height) {
        this.height = height;
        this.width = width;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.backgroundColor = 'black';
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        document.body.appendChild(this.canvas);
        this.ball = new Rect(new Vector2d(this.width / 2, this.height / 2), new Vector2d(20, 20));
        this.playerA = new Rect(new Vector2d(30, height / 2), new Vector2d(20, 200));
        this.playerB = new Rect(new Vector2d(width - 30, height / 2), new Vector2d(20, 200));
    }
    Pong.prototype.draw = function () {
        var _this = this;
        var drawables = new Array(new Rect(new Vector2d(this.width / 2, this.height / 2), new Vector2d(1, this.height)), this.ball, this.playerA, this.playerB);
        drawables.forEach(function (obj) {
            obj.draw(_this.ctx);
        });
    };
    Pong.prototype.update = function () { };
    Pong.prototype.start = function () {
        this.draw();
    };
    return Pong;
}());
var Rect = (function () {
    function Rect(pos, size) {
        this.pos = pos;
        this.size = size;
        this.vel = new Vector2d();
    }
    Rect.prototype.draw = function (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.left, this.top, this.size.x, this.size.y);
    };
    Object.defineProperty(Rect.prototype, "top", {
        get: function () {
            return (this.pos.y - (this.size.y / 2));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottom", {
        get: function () {
            return (this.pos.y + (this.size.y / 2));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "left", {
        get: function () {
            return (this.pos.x - (this.size.x / 2));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "right", {
        get: function () {
            return (this.pos.x + (this.size.x / 2));
        },
        enumerable: true,
        configurable: true
    });
    return Rect;
}());
var Vector2d = (function () {
    function Vector2d(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2d.prototype.add = function (v) {
        return new Vector2d(this.x + v.x, this.y + v.y);
    };
    Vector2d.prototype.scalarMultiplication = function (k) {
        return new Vector2d(this.x * k, this.y * k);
    };
    return Vector2d;
}());
Vector2d.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
};
var pong = new Pong(1000, 500);
pong.start();
