## Groove Thumb Joystick mit Calliope nutzen

In diesem kleinen Programmbeispiel für  [Calliope mini Editor](https://makecode.calliope.cc/) wird gezeigt wie mann einem am Groove-Port-A angeschlossenen [Grove Thumb Joystick](http://wiki.seeedstudio.com/Grove-Thumb_Joystick/) auslesen kann und die LEDs damit steuern kann. 

### mini-Joystick-Snake

Der Groove-Port A ist direkt mit den beiden analog Ports C16 und C17 verdrahtet.
Dies ermöglicht es den analogen X-Wert auf Port C17 einzulesen und den entsprechenden Y-Wert auf C16.
Mein [Grove Thumb Joystick](http://wiki.seeedstudio.com/Grove-Thumb_Joystick/) lieferte auf der X-Achse Werte von Anschlag Links (243), Ruhezustand (518) und Rechtsanschlag (781). Ensprechend waren die Werte für die Y-Achse Anschlag Links (246), Ruhezustand (517) und Rechtsanschlag (780). Diese Werte können von Bauteil zu Bauteil leicht abweichen und sollten in den Variablen x und y angepasst werden.
Wenn der Kmopf A gedrückt wird, werden die tatsächlichen Werte automatisch ausgelesen. Sicherheitshalber reagiert der Joystick aber erst ab einer Abweicheung von 50.

### Spiel-Idee
Das Spiel startet mit einer leuchtenden LED in der Mitte des Displays. Es müssen durch steuern des Joysticks alle LEDs eingschaltet werden in nur 25 Schritten. Dannach müssen alle LEDs in weiteren 25 Schritten wieder auf die halbe Leuchtstärke reduziert werden. Dabei darf jede LED nur einmal angesteuert werden. Steuert man zu weit oder nimmt den falschen Weg ist es nicht möglich alle LEDs "anzuzünden" bevor die 25 Schritte abgelaufen sind und die LEDs nur noch mit halber Leuchtstärke leuchten.

### Sreenshot

 ![mini-Joystick3(Snake)](https://github.com/Kupferschmid/Calliope/blob/master/mini-Joystick3(Snake).png)

### Quell-Code
Den Quell-Code einfach herauskopieren und in den [Calliope mini Editor](https://makecode.calliope.cc/) kopieren oder [hier](https://github.com/Kupferschmid/Calliope/blob/master/mini-Joystick3.js) herunter laden.

```Java-Script-Code für makecode.calliope.cc
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
```
viel Spaß ;-)
