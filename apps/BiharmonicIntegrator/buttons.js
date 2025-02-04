let looping = true;
function playOrStop() {
    (looping)? noLoop() : loop();
    looping = !looping;
    document.getElementById("playButton").innerText = (looping) ? "Stop" : "Play";
}

function updateMu() {
    let mu = document.getElementById("sliderMu").value;
    document.getElementById("sliderMuValue").innerText = mu;
    integrator.f.mu = mu;
    integrator.f.updateParams();
}

function updateBeta() {
    let beta = document.getElementById("sliderBeta").value;
    document.getElementById("sliderBetaValue").innerText = beta;
    integrator.f.beta = beta;
    integrator.f.updateParams();
}

function updatevC() {
    let vC = document.getElementById("slidervC").value;
    document.getElementById("slidervCValue").innerText = vC + " mm/s";
    integrator.f.InvvC = GRAVITY/vC;
    integrator.f.updateParams();
}

function updatevS() {
    let vS = document.getElementById("slidervS").value;
    document.getElementById("slidervSValue").innerText = vS + " mm/s";
    integrator.f.InvvS = GRAVITY/vS;
    integrator.f.updateParams();
}

function updateFreq() {
    let freq = document.getElementById("sliderFreq").value;
    document.getElementById("sliderFreqValue").innerText = freq + " Hz";
    integrator.s.f = freq;
    integrator.s.omega = 2*PI*freq;
    integrator.SCALE_Y = PI*integrator.HEIGHT*freq/integrator.s.G;
    integrator.SCALE_X = round(integrator.WIDTH*freq);
    integrator.h = 1.0/integrator.SCALE_X;
    integrator.reset();
}

function updateGamma() {
    let Gamma = document.getElementById("sliderGamma").value;
    document.getElementById("sliderGammaValue").innerText = Gamma;
    integrator.s.G = Gamma;
    integrator.SCALE_Y = PI*integrator.HEIGHT*integrator.s.f/Gamma;
}

function updatePhi() {
    let phi = document.getElementById("sliderPhi").value;
    document.getElementById("sliderPhiValue").innerText = phi + " º";
    integrator.s.phi = phi * PI / 180;
}

function updateRho() {
    let rho = document.getElementById("sliderRho").value;
    document.getElementById("sliderRhoValue").innerText = rho;
    integrator.s.rho = rho;
}