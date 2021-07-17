import React from "react";

export function MainWithOutLogin(): JSX.Element {
    return <div className='Main-WithOutLogin' data-testid='Main'>
        <p data-testid='goToLogin'>
            You are not enter in the application yet. Use your login and password to enter.
        </p>
        <p data-testid='goToRegistration'>
            If you not registry in apllication. go to page "Registration".
        </p>
    </div>
}