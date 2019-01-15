"use strict";
var Pong = (function () {
    function Pong(width, height) {
        this.height = height;
        this.width = width;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.backgroundColor = '#111';
        this.canvas.height = height;
        this.canvas.width = width;
        document.body.appendChild(this.canvas);
        this.ball = new Rect(new Vector2d(width / 2, height / 2), new Vector2d(20, 20));
        this.ball.vel = new Vector2d(3, 3);
        this.playerA = new Rect(new Vector2d(30, height / 2), new Vector2d(20, 200));
        this.playerB = new Rect(new Vector2d(width - 30, height / 2), new Vector2d(20, 200));
    }
    Pong.prototype.draw = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.width, this.height);
        var drawables = new Array(new Rect(new Vector2d(this.width / 2, this.height / 2), new Vector2d(1, this.height)), this.ball, this.playerA, this.playerB);
        drawables.forEach(function (obj) {
            obj.draw(_this.ctx);
        });
    };
    Pong.prototype.update = function () {
        var _this = this;
        if (this.ball.top < 0 || this.ball.bottom > this.height)
            this.ball.vel.y *= -1;
        if (this.ball.left < 0 || this.ball.right > this.width)
            this.ball.vel.x *= -1;
        if (this.ball.horizontalCollide(this.playerA)
            || this.ball.horizontalCollide(this.playerB)) {
            this.ball.vel.x *= -1;
        }
        if (this.ball.verticalCollide(this.playerA)
            || this.ball.verticalCollide(this.playerB)) {
            this.ball.vel.y *= -1;
        }
        var updateables = new Array(this.ball, this.playerA, this.playerB);
        updateables.forEach(function (obj) {
            obj.update();
        });
        this.draw();
        requestAnimationFrame(function () { return _this.update(); });
    };
    Pong.prototype.start = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.update(); });
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
        ctx.fillStyle = '#0a0';
        ctx.fillRect(this.left, this.top, this.size.x, this.size.y);
    };
    Rect.prototype.update = function () {
        this.pos = this.pos.add(this.vel);
    };
    Rect.prototype.verticalCollide = function (r) {
        return false;
    };
    Rect.prototype.horizontalCollide = function (r) {
        if ((this.bottom >= r.top && this.top <= r.bottom) && ((this.right >= r.left && this.left <= r.left)
            || (this.left <= r.right && this.right >= r.right))) {
            return true;
        }
        return false;
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
