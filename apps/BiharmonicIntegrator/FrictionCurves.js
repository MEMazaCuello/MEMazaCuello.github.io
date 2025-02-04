class AbstractFrictionCurve
{
    at(){};

    updateParams(){};
}

class CoulombFriction extends AbstractFrictionCurve 
{
    constructor(mu,vC)
    {
        super(AbstractFrictionCurve);
        this.mu = mu;
        this.InvvC = 1.0/vC;
    }

    at(v)
    {
        return -this.mu*tanh(v*this.InvvC);
    }

    updateParams(){};
}

class CoulombStribeck extends AbstractFrictionCurve
{
    constructor(mu,beta,vC,vS)
    {
        super(AbstractFrictionCurve);
        this.mu = mu;
        this.beta = beta;
        this.InvvC = 1.0/vC;
        this.InvvS = 1.0/vS;
        this.muS = mu/beta;
        this.B = sqrt(2.0*exp(1.0))*this.muS*(1.0-this.beta)*this.InvvS;
    }

    at(v)
    {
        return -this.mu*tanh(v*this.InvvC) - this.B*v*exp(-((v*this.InvvS)**2.0));
    }

    updateParams(){
        this.muS = this.mu/this.beta;
        this.B = sqrt(2.0*exp(1.0))*this.muS*(1.0-this.beta)*this.InvvS;
    };
}

function tanh(x)
{
    if (x < -5)
    {
        return -1; 
    }
    else if (x > 5)
    {
        return 1;
    }
    else
    {
        const ex = exp(x);
        const emx = exp(-x);
        return (ex - emx) / (ex + emx);
    }
}