class Integrator
{
    constructor(point, signal, friction, width, height)
    {
        this.p = point;
        this.s = signal;
        this.f = friction;
        this.WIDTH = width;
        this.HEIGHT = height;

        this.SCALE_Y = PI*height*signal.f/signal.G;
        this.SCALE_X = round(width*signal.f);
        this.h = 1.0/this.SCALE_X;
        this.SCALE_H = 0.5*this.WIDTH/this.s.max_x();

        this.reset();
    }

    reset()
    {
        this.p.t = 0;
        this.p.x = 0;
        this.p.v = 0;
        this.trail = [];
        this.trail.push(this.p.v);
        this.history = [];
        this.history.push(this.p.x);
        this.idx = 0;
        this.vD = 0.0;
    }

    step()
    {
        // Integrate with RK4
        const k1 = this.f.at(this.p.v - this.s.v(this.p.t));
        const k2 = this.f.at(this.p.v + 0.5*this.h*k1 - this.s.v(this.p.t+0.5*this.h));
        const k3 = this.f.at(this.p.v + 0.5*this.h*k2 - this.s.v(this.p.t+0.5*this.h));
        const k4 = this.f.at(this.p.v + 1.0*this.h*k3 - this.s.v(this.p.t+1.0*this.h));
        this.p.v = this.p.v + (this.h/6.0)*(k1 + 2*k2 + 2*k3 + k4);
        this.p.x = this.p.x + this.p.v*this.h - this.vD*this.h;
        this.p.t = this.p.t + this.h - (this.p.t*this.s.f > 1.0)*(1.0/this.s.f);

        // Update drawing variables
        if (this.idx + 1 < this.WIDTH)
        {
            this.idx++;
            (this.trail.length < this.WIDTH)? this.trail.push(this.p.v) : this.trail[this.idx] = this.p.v;
            (this.history.length < this.WIDTH)? this.history.push(this.p.x) : this.history[this.idx] = this.p.x;
        }
        else
        {
            this.idx = 0;
            this.vD = mean(this.trail);
            const p_vD = document.getElementById("vD");
            p_vD.innerHTML = round(-GRAVITY * this.vD,2) + " mm/s";
            const mH = mean(this.history);
            for (let i = 0; i < this.history.length; i++) {
                this.history[i] = this.history[i] - mH;
            }
            this.p.x = this.p.x - mH;
            const max_x = max(max(this.history),abs(min(this.history)));
            this.SCALE_H = 0.45*this.HEIGHT/max_x;
        }
    }

    display()
    {
        // GRAPH LEFT _________________________________________________________

        // vS
        push()
        for (let i = 0; i < this.WIDTH; i = i + 6)
        {
            noStroke();
            fill(30,0,200);
            ellipseMode(CENTER);
            ellipse(i, this.SCALE_Y*this.s.v(i/this.SCALE_X), 3);
        }
        pop()

        // trail
        push()
        for (let i = 0; i < this.trail.length; i = i + 2)
        {
            noStroke();
            fill(200,0,30);
            ellipseMode(CENTER);
            ellipse(i, this.SCALE_Y*this.trail[i], 3);
        }
        pop()

        // Point
        this.p.show(this.SCALE_X,this.SCALE_Y);

        // GRAPH RIGHT ________________________________________________________
        // History
        push()
        const max_xB = this.s.max_x();
        for (let i = 0; i < this.history.length; i++)
        {
            noStroke();
            fill(200,0,30);
            ellipseMode(CENTER);
            ellipse(TOTAL_WIDTH/2 + EXT_X + 0.5*this.WIDTH*this.s.x(i/this.SCALE_X)/max_xB, this.SCALE_H*this.history[i], 3);
        }
        pop()
        // Point
        push();
            fill(200,0,30);
            stroke(0);
            ellipseMode(CENTER);
            ellipse(TOTAL_WIDTH/2 + EXT_X + 0.5*this.WIDTH*this.s.x(this.p.t)/max_xB, this.SCALE_H*this.p.x, this.p.r);
        pop();
    }
}

function mean(v){
    let s = 0.0;
    for (const val of v) {
        s = s + val;
    }
    return s/v.length;
}