import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {

    return(
        <div>
            <p className="fs-1">WELCOM TO COINMARKET</p>
            <Link to="auth">SIGN IN</Link>
        </div>
    )
}