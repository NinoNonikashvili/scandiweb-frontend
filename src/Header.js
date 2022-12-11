import React from "react";
import { headerFooterStyles, btnsWrapper, button, h1 } from "./styles/headerFootertyles";
/*
props are given from home page and add product page. btns: [add, delete] || [save, cancel]
in first case, add btn is a link(to addProduct page) and delete btn has an action(to delete cards)
in second case, save has an action(and navigation inside the action) and cancel is a link back to home page
*/

const Header = (props) => {
    return(
        <div style={headerFooterStyles}>
            <h1 style={h1}>{props.h1}</h1>
        </div>
    )
}
export default Header;