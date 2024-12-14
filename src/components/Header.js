import React from "react";
import {Link} from "react-router-dom";
export function Header() {
    return (
        <div className="header">
            <div className="header-1">
                <div className="logo">
                    <Link to="/">
                        <div class="name"><div class="bootstrap inter-bold-white-23px">PokeApi</div></div>

                        <div className="ui"><div class="ui-1 inter-extra-bold-white-10px">UI</div></div>
                    </Link>
                </div>
                <div className="design-system inter-bold-white-12px"></div>
            </div>
        </div>
    );
}