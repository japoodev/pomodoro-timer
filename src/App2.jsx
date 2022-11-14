import React from 'react'

const App = () => {
    const [countdown, setCountdown] = React.useState(1500)
    const [isRunning, setIsRunning] = React.useState(false)
    const [isBreak, setIsBreak] = React.useState(false)
    const [sessionLength, setSessionLength] = React.useState(25)
    const [breakLength, setBreakLength] = React.useState(5)

    const handleCountdown = () => {
        if (isRunning) {
            if (countdown === 0) {
                if (isBreak) {
                    setIsBreak(false)
                    setCountdown(sessionLength * 60)
                } else {
                    setIsBreak(true)
                    setCountdown(breakLength * 60)
                }
            } else {
                setCountdown(countdown - 1)
            }
        }
    }

    React.useEffect(() => {
        if (isRunning) {
            const interval = setInterval(handleCountdown, 1000)
            return () => clearInterval(interval)
        }
    }, [isRunning, countdown, isBreak, sessionLength, breakLength])
  return (
    <div>App</div>
  )
}

export default App