class AbstractSignal
{
    a(){};
    v(){};
    x(){};
}

class SineSignal extends AbstractSignal 
{
    constructor(G,f)
    {
        super(AbstractSignal);
        this.G = G;
        this.f = f;
        this.omega = 2*PI*f;
    }

    a(t)
    {
        return -this.G*sin(this.omega*t);
    }

    v(t)
    {
        return  this.G*cos(this.omega*t)/this.omega;
    }

    x(t)
    {
        return  this.G*sin(this.omega*t)/(this.omega)**2;
    }
}

class BiharmonicSignal extends AbstractSignal
{
    constructor(G,f,phi,rho)
    {
        super(AbstractSignal);
        this.G = G;
        this.f = f;
        this.rho = rho;
        this.phi = phi;
        this.omega = 2*PI*f;
    }

    a(t)
    {
        return -this.G*(this.rho*sin(this.omega*t) + (1.0-this.rho)*sin(2*this.omega*t + this.phi));
    }

    v(t)
    {
        return  (this.G/(this.omega))*(this.rho*cos(this.omega*t) + 0.5*(1.0-this.rho)*cos(2*this.omega*t + this.phi));
    }

    x(t)
    {
        return  (this.G/(this.omega)**2)*(this.rho*sin(this.omega*t) + 0.25*(1.0-this.rho)*sin(2*this.omega*t + this.phi));
    }

    max_x()
    {
        return (this.G/(this.omega)**2)*(0.25 + 0.75*this.rho);
    }
}