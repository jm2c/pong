"use strict";
var Pong = (function () {
    function Pong(width, height) {
        var _this = this;
        this.height = height;
        this.width = width;
        this.score = [0, 0];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.backgroundColor = '#111';
        this.canvas.height = height;
        this.canvas.width = width;
        document.body.appendChild(this.canvas);
        this.ball = new Rect(new Vector2d(width / 2, height / 2), new Vector2d(20, 20));
        this.ball.vel = new Vector2d(3, -3);
        this.playerA = new Rect(new Vector2d(30, height / 2), new Vector2d(20, 200));
        this.playerB = new Rect(new Vector2d(width - 30, height / 2), new Vector2d(20, 200));
        document.addEventListener('keypress', function (evt) {
            var pressedKey = evt.keyCode;
            if (pressedKey == keys.UP) {
                _this.playerA.vel.y = -2;
            }
            if (pressedKey == keys.DOWN) {
                _this.playerA.vel.y = 2;
            }
        });
        document.addEventListener('keyup', function () {
            _this.playerA.vel.y = 0;
        });
        document.addEventListener('mousemove', function (evt) {
            _this.playerB.pos.y = evt.clientY;
        });
    }
    Pong.prototype.draw = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.width, this.height);
        var scoreA = new ScoreBoard().getScore(this.score[0]);
        var scoreB = new ScoreBoard().getScore(this.score[1]);
        var axpos = (1 / 4 * this.canvas.width) - (scoreA.width / 2);
        var bxpos = (3 / 4 * this.canvas.width) - (scoreB.width / 2);
        this.ctx.drawImage(scoreA, axpos, 10);
        this.ctx.drawImage(scoreB, bxpos, 10);
        new Array(new Rect(new Vector2d(this.width / 2, this.height / 2), new Vector2d(2, this.height)), this.ball, this.playerA, this.playerB).forEach(function (obj) {
            obj.draw(_this.ctx);
        });
    };
    Pong.prototype.update = function () {
        var _this = this;
        if (this.ball.top < 0 || this.ball.bottom > this.height)
            this.ball.vel.y *= -1;
        if (this.ball.horizontalCollide(this.playerA)
            || this.ball.horizontalCollide(this.playerB)) {
            this.ball.vel.x *= -1;
        }
        if (this.ball.verticalCollide(this.playerA)
            || this.ball.verticalCollide(this.playerB)) {
            this.ball.vel.y *= -1;
        }
        if (this.ball.left < 0 || this.ball.right > this.width) {
            if (this.ball.right > this.width) {
                this.score[0]++;
            }
            else {
                this.score[1]++;
            }
            this.ball.pos = new Vector2d(this.width / 2, this.height / 2);
        }
        new Array(this.ball, this.playerA, this.playerB).forEach(function (obj) {
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
var ScoreBoard = (function () {
    function ScoreBoard() {
        var px = 10;
        this.chars = [
            '111101101101111',
            '110010010010111',
            '111001111100111',
            '111001011001111',
            '101101111001001',
            '111100111001111',
            '111100111101111',
            '111001011001001',
            '111101111101111',
            '111101111001111',
        ].map(function (s) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = 3 * px;
            canvas.height = 5 * px;
            ctx.fillStyle = '#0f0';
            s.split('').forEach(function (d, i) {
                if (parseInt(d) == 1) {
                    ctx.fillRect((i % 3) * px, Math.floor(i / 3) * px, px, px);
                }
            });
            return canvas;
        });
    }
    ScoreBoard.prototype.getScore = function (num) {
        var _this = this;
        if (num < 0)
            return this.chars[0];
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var length = num.toString().length;
        var boards = num.toString().split('').map(function (s) {
            var n = parseInt(s);
            return _this.chars[n];
        });
        canvas.width = boards[0].width * length + (length - 1) * (boards[0].width / 3);
        canvas.height = boards[0].height;
        boards.forEach(function (b, i) {
            ctx.drawImage(boards[i], (boards[i].width + boards[0].width / 3) * i, 0);
        });
        return canvas;
    };
    return ScoreBoard;
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
var keys;
(function (keys) {
    keys[keys["UP"] = 38] = "UP";
    keys[keys["DOWN"] = 40] = "DOWN";
})(keys || (keys = {}));
var pong = new Pong(1000, 500);
pong.start();
