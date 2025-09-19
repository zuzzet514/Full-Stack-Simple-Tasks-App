import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'customTheme',
        themes: {
            customTheme: {
                dark: false,
                colors: {
                    primary: '#0952c7',      // button color
                    secondary: '#00D4FF',    // Base color from gradient
                    background: '#27109C',   // background
                    surface: '#FFFFFF',
                }
            }
        }
    }
})