export function step(state, infect_rate, recover_rate) {
  const p = infect_rate * state.I
  const q = recover_rate
  return {
    S: (1 - p) * state.S,
    I: state.S * p + state.I * (1 - q),
    R: state.I * q + state.R
  }
}

// Make a copy of an object.
const copy = x => Object.assign({}, x)

export function forecast(n, state, infect_rate, recover_rate) {
  console.time("SIR Forecast")
  let path = [copy(state)]
  path[0].day = 0

  for (let i=1; i <= n; i++) {
    state = step(state, infect_rate, recover_rate)
    state.day = i
    path.push(state)
  }
  console.timeEnd("SIR Forecast")
  return path
}
