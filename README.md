# sir-model
[![Build and Deploy][ci-img]](https://github.com/luiarthur/sir-model/actions)

Demonstration of SIR model using a Discrete-time Markov Chain.

## Description
At each time step, `(S, I, R)` are updated as follows:

```R
S -> (1 - p) * S
I -> S * p + I * (1 - q)
R -> I * q + R
```

where
- `p = I * infect_rate` is the infection rate times the current infected population proportion
- `q` is the recovery rate
- and both `p` and `q` are in the unit interval.

These equations follow from the multiplication of a transition matrix `T` and the current population state vector:

```
 ----- ----- -----     -------      ---------
| 1-p |  0  |  0  |   | S_{t} |    | S_{t+1} |
|-----|-----|-----|   |-------|    |---------|
|  p  | 1-q |  0  | * | I_{t} | =  | I_{t+1} |
|-----|-----|-----|   |-------|    |---------|
|  0  |  q  |  1  |   | R_{t} |    | R_{t+1} |
 ----- ----- -----     -------      ---------
``` 

Note that if we let `beta` be the infection rate and `gamma` be the recovery
rate, then by substituting these values into `p` and `q`, we get,


S<sub>t+1</sub> - S<sub>t</sub>
= (1 - &beta; * I<sub>t</sub>) * S<sub>t</sub> - S<sub>t</sub>
= -&beta; * I<sub>t</sub> * S<sub>t</sub>

I<sub>t+1</sub> - I<sub>t</sub>
= S<sub>t</sub> * (I<sub>t</sub> * &beta;) + I<sub>t</sub> * (1 - &gamma;) - I<sub>t</sub>
= S<sub>t</sub> * I<sub>t</sub> * &beta; - &gamma; * I<sub>t</sub>

R<sub>t+1</sub> - R<sub>t</sub>
= I<sub>t</sub> * &gamma; + R<sub>t</sub> - R<sub>t</sub>
= I<sub>t</sub> * &gamma;


That is,
- S<sub>t+1</sub> - S<sub>t</sub> = -&beta; * I<sub>t</sub> * S<sub>t</sub>
- I<sub>t+1</sub> - I<sub>t</sub> = S<sub>t</sub> * I<sub>t</sub> * &beta; - &gamma; * I<sub>t</sub>
- R<sub>t+1</sub> - R<sub>t</sub> = I<sub>t</sub> * &gamma;

This resembles the [SIR model][sir-model] differential equations, and this
update rule is used also when the Euler method is used to solve the SIR
differential equations numerically, when the step size is 1.

[ci-img]: https://github.com/luiarthur/sir-model/workflows/Build%20and%20Deploy/badge.svg
[sir-model]: https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology
