class Point
{
    constructor(x, v, r)
    {
        this.t = 0;
        this.x = x;
        this.v = v;
        this.r = r;
    }

    show(SCALE_X,SCALE_Y)
    {
        push();
        fill(200,0,30);
        stroke(0);
        ellipseMode(CENTER);
        ellipse(SCALE_X*this.t, SCALE_Y*this.v, this.r);
        pop();
    }
}