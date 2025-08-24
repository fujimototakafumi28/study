"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SvgWithTooltip = /** @class */ (function () {
    function SvgWithTooltip(svgId, tooltipImgSrc) {
        this.svg = document.getElementById(svgId);
        // tooltip要素の作成
        this.tooltip = document.createElement("div");
        this.tooltip.style.position = "absolute";
        this.tooltip.style.display = "none";
        this.tooltip.style.pointerEvents = "none";
        this.tooltip.style.background = "rgba(255,255,255,0.98)";
        this.tooltip.style.border = "1px solid rgba(0,0,0,0.2)";
        this.tooltip.style.padding = "4px";
        this.tooltip.style.borderRadius = "4px";
        this.tooltip.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
        this.tooltip.style.zIndex = "2000";
        // tooltip内の画像
        this.tooltipImg = document.createElement("img");
        this.tooltipImg.src = tooltipImgSrc;
        this.tooltipImg.style.maxWidth = "120px";
        this.tooltipImg.style.maxHeight = "120px";
        this.tooltip.appendChild(this.tooltipImg);
        document.body.appendChild(this.tooltip);
        // サンプルオブジェクト（四角形）
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", "50");
        rect.setAttribute("y", "50");
        rect.setAttribute("width", "100");
        rect.setAttribute("height", "100");
        rect.setAttribute("fill", "lightblue");
        rect.style.cursor = "pointer";
        // イベント設定
        rect.addEventListener("mousemove", this.onMouseMove.bind(this));
        rect.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        this.svg.appendChild(rect);
    }
    SvgWithTooltip.prototype.onMouseMove = function (event) {
        this.tooltip.style.display = "block";
        this.tooltip.style.left = event.pageX + 10 + "px";
        this.tooltip.style.top = event.pageY + 10 + "px";
    };
    SvgWithTooltip.prototype.onMouseLeave = function () {
        this.tooltip.style.display = "none";
    };
    return SvgWithTooltip;
}());
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.X = x;
        this.Y = y;
    }
    return Vector2D;
}());
var State = /** @class */ (function () {
    function State() {
        // プロパティの定義
        this.Color = "Gray";
    }
    Object.defineProperty(State.prototype, "GetColor", {
        get: function () {
            return this.Color;
        },
        enumerable: false,
        configurable: true
    });
    return State;
}());
var StartState = /** @class */ (function (_super) {
    __extends(StartState, _super);
    function StartState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Color = "Green";
        return _this;
    }
    StartState.prototype.CheckState = function () { };
    ;
    return StartState;
}(State));
var CompleteState = /** @class */ (function (_super) {
    __extends(CompleteState, _super);
    function CompleteState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Color = "Gray";
        return _this;
    }
    CompleteState.prototype.CheckState = function () { };
    ;
    return CompleteState;
}(State));
var WorkState = /** @class */ (function (_super) {
    __extends(WorkState, _super);
    function WorkState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Color = "Red";
        return _this;
    }
    WorkState.prototype.CheckState = function () { };
    ;
    return WorkState;
}(State));
var Shape = /** @class */ (function () {
    function Shape(point2D, size2D, name, objectState) {
        this.Point = point2D;
        this.Size = size2D;
        this.Name = name;
        this.ObjectState = objectState;
        this.canvas = document.getElementById("canvas");
    }
    //ctx: CanvasRenderingContext2D | null | undefined;
    //private canvas: HTMLCanvasElement;
    //private ctx: CanvasRenderingContext2D | null;
    //private tooltip: HTMLDivElement;
    //private tooltipImg: HTMLImageElement;
    Shape.prototype.Draw = function () {
        var _a, _b;
        this.canvas = document.getElementById("canvas");
        if (this.canvas) {
            var ctx2 = this.canvas.getContext("2d");
            if (ctx2) {
                //// 背景を塗りつぶす
                //ctx2.fillStyle = "#f0f0f0";
                ////左上、右上、右下
                //ctx2.fillRect(0, 0, 1000, 1000);
                // 四角形の輪郭を描画
                ctx2.fillStyle = "black";
                ctx2.fillRect(this.Point.X - 2, this.Point.Y - 2, 104, 104);
                // 四角形を描画
                ctx2.fillStyle = (_b = (_a = this.ObjectState) === null || _a === void 0 ? void 0 : _a.GetColor) !== null && _b !== void 0 ? _b : "black";
                ctx2.fillRect(this.Point.X, this.Point.Y, 100, 100);
                // テキストを描画
                ctx2.fillStyle = "black";
                ctx2.font = "20px Arial";
                ctx2.fillText(this.Name, 100, 100);
                this.tooltip = document.createElement("div");
                this.tooltip.style.position = "absolute";
                this.tooltip.style.display = "none";
                this.tooltip.style.pointerEvents = "none";
                this.tooltip.style.background = "rgba(255,255,255,0.98)";
                this.tooltip.style.border = "1px solid rgba(0,0,0,0.2)";
                this.tooltip.style.padding = "4px";
                this.tooltip.style.borderRadius = "4px";
                this.tooltip.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
                this.tooltip.style.zIndex = "2000";
                var tooltipImg = document.createElement("img");
                tooltipImg.src = "/Content/Images/cat.jpg";
                tooltipImg.style.maxWidth = "120px";
                tooltipImg.style.maxHeight = "120px";
                this.tooltip.appendChild(tooltipImg);
                document.body.appendChild(this.tooltip);
                // イベント設定
                this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
                this.canvas.addEventListener("mouseleave", this.onMouseLeave.bind(this));
            }
            else {
                console.error("2Dコンテキストを取得できませんでした。");
            }
        }
        else {
            console.error("Canvas要素が見つかりません。");
        }
    };
    ;
    // 使用例
    //const svgApp = new SvgWithTooltip("mysvg", "/images/cat.jpg");
    //private ensureTooltip(): void {
    //    // tooltip 要素を一つだけ作成して使い回す
    //    let $tooltip: JQuery<HTMLElement> | null = null;
    //    if ($tooltip) return;
    //    $tooltip = $('<div id="image-tooltip"></div>')
    //        .css({
    //            position: 'absolute',
    //            display: 'none',
    //            pointerEvents: 'none',
    //            background: 'rgba(255,255,255,0.98)',
    //            border: '1px solid rgba(0,0,0,0.2)',
    //            padding: '6px',
    //            borderRadius: '4px',
    //            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    //            zIndex: 2000,
    //        })
    //        .appendTo('body');
    //}
    Shape.prototype.onMouseMove = function (event) {
        if (!this.canvas) {
            return;
        }
        if (!this.tooltip) {
            return;
        }
        var rect = this.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        // 例: (50,50)-(150,150) の矩形領域に入ったらtooltip表示
        if (x >= 50 && x <= 150 && y >= 50 && y <= 150) {
            this.tooltip.style.display = "block";
            this.tooltip.style.left = event.pageX + 10 + "px";
            this.tooltip.style.top = event.pageY + 10 + "px";
        }
        else {
            this.tooltip.style.display = "none";
        }
    };
    Shape.prototype.onMouseLeave = function () {
        if (!this.tooltip) {
            return;
        }
        this.tooltip.style.display = "none";
    };
    Shape.prototype.Init = function () {
        if (this.canvas) {
            var ctx = this.canvas.getContext("2d");
            if (ctx) {
                // 背景を塗りつぶす
                ctx.fillStyle = "#f0f0f0";
                //左上、右上、右下
                ctx.fillRect(-1000, 1000, 1000, 1000);
            }
        }
    };
    ;
    Shape.prototype.Update = function () {
    };
    ;
    return Shape;
}());
var PointList = [
    //左上
    new Vector2D(0, 100),
    //右上
    new Vector2D(100, 100),
    //右下
    new Vector2D(100, 0),
    //左下
    new Vector2D(0, 0)
];
var PointList1 = [
    //左上
    new Vector2D(0, 100),
    //右上
    new Vector2D(100, 100),
    //右下
    new Vector2D(100, 0),
    //左下
    new Vector2D(0, 0)
];
var ContinuousWall = /** @class */ (function () {
    function ContinuousWall(no, name, status, pointList) {
        this.PointList = [];
        this.No = no;
        this.Name = name;
        this.Status = status;
        this.PointList = pointList;
    }
    return ContinuousWall;
}());
// 各 ContinuousWall の座標を設定
var wall1Points = [
    new Vector2D(0, 100), // 左上
    new Vector2D(100, 100), // 右上
    new Vector2D(100, 0), // 右下
    new Vector2D(0, 0) // 左下
];
var wall2Points = [
    new Vector2D(120, 100), // 左上
    new Vector2D(220, 100), // 右上
    new Vector2D(220, 0), // 右下
    new Vector2D(120, 0) // 左下
];
var wall3Points = [
    new Vector2D(240, 100), // 左上
    new Vector2D(340, 100), // 右上
    new Vector2D(340, 0), // 右下
    new Vector2D(240, 0) // 左下
];
var wall4Points = [
    new Vector2D(360, 100), // 左上
    new Vector2D(460, 100), // 右上
    new Vector2D(460, 0), // 右下
    new Vector2D(360, 0) // 左下
];
var wall5Points = [
    new Vector2D(480, 100), // 左上
    new Vector2D(580, 100), // 右上
    new Vector2D(580, 0), // 右下
    new Vector2D(480, 0) // 左下
];
// ContinuousWall のインスタンスを作成
var wall1 = new ContinuousWall(1, "Wall 1", "Work", wall1Points);
var wall2 = new ContinuousWall(2, "Wall 2", "Work", wall2Points);
var wall3 = new ContinuousWall(3, "Wall 3", "Work", wall3Points);
var wall4 = new ContinuousWall(4, "Wall 4", "Work", wall4Points);
var wall5 = new ContinuousWall(5, "Wall 5", "Work", wall5Points);
// ContinuousWall の配列を作成
var DataList = [wall1, wall2, wall3, wall4, wall5];
var state = new StartState();
DataList.forEach(function (e) {
    var wall = new Shape(e.PointList[0], e.PointList[1], e.Name, state);
    wall.Init();
    //wall.Update();
    wall.Draw();
});
