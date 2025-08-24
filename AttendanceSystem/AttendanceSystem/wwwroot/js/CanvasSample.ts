class SvgWithTooltip {
    private svg: SVGSVGElement;
    private tooltip: HTMLDivElement;
    private tooltipImg: HTMLImageElement;

    constructor(svgId: string, tooltipImgSrc: string) {
        this.svg = document.getElementById(svgId) as unknown as SVGSVGElement;

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
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
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

    private onMouseMove(event: MouseEvent): void {
        this.tooltip.style.display = "block";
        this.tooltip.style.left = event.pageX + 10 + "px";
        this.tooltip.style.top = event.pageY + 10 + "px";
    }

    private onMouseLeave(): void {
        this.tooltip.style.display = "none";
    }
}

class Vector2D {
    
    public X: number;
    public Y: number;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }
}

type Color = "Red" | "Green" | "Gray";

abstract class State {
    // プロパティの定義
    protected Color: Color = "Gray";
    abstract CheckState(): void;
    get GetColor(): string {
        return this.Color;
    }
}

class StartState extends State {
    Color: Color = "Green";
    public override CheckState() { };
}
class CompleteState extends State {
    Color: Color = "Gray";
    public override CheckState(): void { };
}
class WorkState extends State {
    Color: Color = "Red";
    public override CheckState(): void { };
}

class Shape {

    public ObjectState: State | undefined;

    public Point: Vector2D;

    public Size: Vector2D | undefined;

    public Name: string;

    canvas: HTMLCanvasElement | undefined;

    tooltipImgSrc: string | undefined

    tooltip: HTMLDivElement | undefined

    //ctx: CanvasRenderingContext2D | null | undefined;

    //private canvas: HTMLCanvasElement;
    //private ctx: CanvasRenderingContext2D | null;
    //private tooltip: HTMLDivElement;
    //private tooltipImg: HTMLImageElement;

    public Draw(): void 
    {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;

        if (this.canvas) {

            const ctx2 = this.canvas.getContext("2d");

            if (ctx2) {
                //// 背景を塗りつぶす
                //ctx2.fillStyle = "#f0f0f0";
                ////左上、右上、右下
                //ctx2.fillRect(0, 0, 1000, 1000);

                // 四角形の輪郭を描画
                ctx2.fillStyle = "black"
                ctx2.fillRect(this.Point.X - 2, this.Point.Y - 2, 104, 104);

                // 四角形を描画
                ctx2.fillStyle = this.ObjectState?.GetColor ?? "black"
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

                const tooltipImg = document.createElement("img");
                tooltipImg.src = "/Content/Images/cat.jpg"
                tooltipImg.style.maxWidth = "120px";
                tooltipImg.style.maxHeight = "120px";

                this.tooltip.appendChild(tooltipImg);
                document.body.appendChild(this.tooltip);

                // イベント設定
                this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
                this.canvas.addEventListener("mouseleave", this.onMouseLeave.bind(this));

            } else {
                console.error("2Dコンテキストを取得できませんでした。");
            }
        } else {
            console.error("Canvas要素が見つかりません。");
        }
    };

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

    private onMouseMove(event: MouseEvent): void {

        if (!this.canvas) {
            return;
        }

        if (!this.tooltip) {
            return;
        }

        const rect = this.canvas.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // 例: (50,50)-(150,150) の矩形領域に入ったらtooltip表示
        if (x >= 50 && x <= 150 && y >= 50 && y <= 150) {
            this.tooltip.style.display = "block";
            this.tooltip.style.left = event.pageX + 10 + "px";
            this.tooltip.style.top = event.pageY + 10 + "px";
        } else {
            this.tooltip.style.display = "none";
        }
    }

    private onMouseLeave(): void {
        if (!this.tooltip) {
            return;
        }

        this.tooltip.style.display = "none";
    }

    public Init(): void
    {
        if (this.canvas) {

            const ctx = this.canvas.getContext("2d");

            if (ctx)
            {
                // 背景を塗りつぶす
                ctx.fillStyle = "#f0f0f0";
                //左上、右上、右下
                ctx.fillRect(-1000, 1000, 1000, 1000);
            }
        }
    };

    public Update(): void {
    };

    constructor(point2D: Vector2D, size2D: Vector2D, name: string,objectState: State) {
        this.Point = point2D;
        this.Size = size2D;
        this.Name = name;
        this.ObjectState = objectState;
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    }
}

let PointList: Array<Vector2D> = [
    //左上
    new Vector2D(0, 100),
    //右上
    new Vector2D(100, 100),
    //右下
    new Vector2D(100, 0),
    //左下
    new Vector2D(0, 0)
];

let PointList1: Array<Vector2D> = [
    //左上
    new Vector2D(0, 100),
    //右上
    new Vector2D(100, 100),
    //右下
    new Vector2D(100, 0),
    //左下
    new Vector2D(0, 0)
];

class ContinuousWall
{
    public No: number;
    public Name: string;
    public Status: string;
    public PointList: Array<Vector2D> = [];
    constructor(no: number, name: string, status: string, pointList: Array<Vector2D>)
    {
        this.No = no;
        this.Name = name;
        this.Status = status
        this.PointList = pointList;
    }
}

// 各 ContinuousWall の座標を設定
const wall1Points: Array<Vector2D> = [
    new Vector2D(0, 100),  // 左上
    new Vector2D(100, 100), // 右上
    new Vector2D(100, 0),   // 右下
    new Vector2D(0, 0)      // 左下
];

const wall2Points: Array<Vector2D> = [
    new Vector2D(120, 100),  // 左上
    new Vector2D(220, 100),  // 右上
    new Vector2D(220, 0),    // 右下
    new Vector2D(120, 0)     // 左下
];

const wall3Points: Array<Vector2D> = [
    new Vector2D(240, 100),  // 左上
    new Vector2D(340, 100),  // 右上
    new Vector2D(340, 0),    // 右下
    new Vector2D(240, 0)     // 左下
];

const wall4Points: Array<Vector2D> = [
    new Vector2D(360, 100),  // 左上
    new Vector2D(460, 100),  // 右上
    new Vector2D(460, 0),    // 右下
    new Vector2D(360, 0)     // 左下
];

const wall5Points: Array<Vector2D> = [
    new Vector2D(480, 100),  // 左上
    new Vector2D(580, 100),  // 右上
    new Vector2D(580, 0),    // 右下
    new Vector2D(480, 0)     // 左下
];

// ContinuousWall のインスタンスを作成
const wall1 = new ContinuousWall(1, "Wall 1", "Work", wall1Points);
const wall2 = new ContinuousWall(2, "Wall 2", "Work", wall2Points);
const wall3 = new ContinuousWall(3, "Wall 3", "Work", wall3Points);
const wall4 = new ContinuousWall(4, "Wall 4", "Work", wall4Points);
const wall5 = new ContinuousWall(5, "Wall 5", "Work", wall5Points);

// ContinuousWall の配列を作成
const DataList: Array<ContinuousWall> = [wall1, wall2, wall3, wall4, wall5];
const state = new StartState();

DataList.forEach(e =>
{
    const wall = new Shape(e.PointList[0], e.PointList[1], e.Name, state);
    wall.Init();
    //wall.Update();
    wall.Draw();
});
