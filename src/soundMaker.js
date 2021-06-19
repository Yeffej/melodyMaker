function MakeSound(Frequency, Duration) {
    if(!AudioCtx) {
        AudioCtx = new AudioContext()
        // AudioCtx = new (AudioContext || window.webkitAudioContext)()
    }
    const oscilator = AudioCtx.createOscillator()
    const gainNode = AudioCtx.createGain()
    oscilator.type = 'triangle'
    oscilator.frequency.value = Frequency
    const duration = Duration
    gainNode.gain.setValueAtTime(0, AudioCtx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.5, AudioCtx.currentTime + 0.05)
    gainNode.gain.linearRampToValueAtTime(0, AudioCtx.currentTime + duration)
    oscilator.connect(gainNode)
    gainNode.connect(AudioCtx.destination)
    oscilator.start(AudioCtx.currentTime)
    oscilator.stop(AudioCtx.currentTime + duration)
    
}