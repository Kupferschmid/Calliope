let Index = 0
let PixelXalt = 0
let PixelYalt = 0
let y = 0
let x = 0
let ZählerHell = 0
let Helligkeit = 0
let PixelSpalteY = 0
let PixelReihex = 0
let RuhezustandY = 0
let RuhezustandX = 0
// Speichert die Ruhezustandswerte des Joysticks
input.onButtonPressed(Button.A, () => {
    RuhezustandX = pins.analogReadPin(AnalogPin.C17)
    RuhezustandY = pins.analogReadPin(AnalogPin.C16)
})
basic.forever(() => {
    RuhezustandX = 518
    RuhezustandY = 517
    PixelReihex = 2
    PixelSpalteY = 2
    Helligkeit = 255
    ZählerHell = 0
    while (true) {
        // Durch teilen des Wertes durch 2 kann der Maximale
        // Wert nicht über 255 sein, wodurch diese Abfrage
        // auch für die RGB-LED genutzt werden kann
        //
        // Durch das abziehen des Ruhezustandes vom
        // tatsächlichen Wert des Pins erhalten wir im
        // Ruhezustand 0 und unter Betätigung des Joysticks
        // einen negativen oder Positiven Wert
        x = (pins.analogReadPin(AnalogPin.C17) - RuhezustandX) / 2
        y = (pins.analogReadPin(AnalogPin.C16) - RuhezustandY) / 2
        if (y > 50 && PixelSpalteY <= 3) {
            PixelYalt = PixelSpalteY
            PixelSpalteY += 1
        }
        if (y < -50 && PixelSpalteY >= 1) {
            PixelYalt = PixelSpalteY
            PixelSpalteY = PixelSpalteY - 1
        }
        if (x > 50 && PixelReihex <= 3) {
            PixelXalt = PixelReihex
            PixelReihex += 1
        }
        if (x < -50 && PixelReihex >= 1) {
            PixelReihex = PixelReihex
            PixelReihex = PixelReihex - 1
        }
        if (PixelReihex != PixelXalt || PixelSpalteY != PixelYalt) {
            if (Index < 25) {
                Index += 1
            }
            PixelXalt = PixelReihex
            PixelYalt = PixelSpalteY
        }
        led.plotBrightness(PixelReihex, PixelSpalteY, Helligkeit)
        basic.setLedColor(basic.rgbw(
            x,
            y,
            0,
            0
        ))
        basic.pause(100)
        if (Index == 25) {
            if (Helligkeit == 255) {
                Helligkeit = 25
                Index = 0
            } else {
                Helligkeit = 255
                Index = 0
            }
        }
    }
})