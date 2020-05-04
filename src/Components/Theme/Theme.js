import  {createMuiTheme} from "@material-ui/core";
import {purple, teal} from "@material-ui/core/colors";

const Theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: teal,
        secondary: purple
    }
})

export default Theme;