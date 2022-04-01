# sir-model
[![Build and Deploy][ci-img]](https://github.com/luiarthur/sir-model/actions)

Demonstration of SIR model using a Discrete-time Markov Chain.

## Description
At each time step, `(S, I, R)` are updated as follows:

```R
S -> (1 - p) * S,
I -> S * p + I * (1 - q),
R -> I * q + R
```

where
- `p = I * infect_rate` is the infection rate times the current infected population proportion
- `q` is the recovery rate

Note that both `p` and `q` are in the unit interval.

These equations follow from the multiplication of a transition matrix `T` and the current population state vector:

```
 ----- ----- -----     -------      ---------
| 1-p |  0  |  0  |   | S_{i} |    | S_{i+1} |
|-----|-----|-----|   |-------|    |---------|
|  p  | 1-q |  0  | * | I_{i} | =  | I_{i+1} |
|-----|-----|-----|   |-------|    |---------|
|  0  |  q  |  1  |   | R_{i} |    | R_{i+1} |
 ----- ----- -----     -------      ---------
``` 

[ci-img]: https://github.com/luiarthur/sir-model/workflows/Build%20and%20Deploy/badge.svg
