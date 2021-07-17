import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import {MainWithOutLogin} from './mainWithOutLogin'

describe('Testing functional component MainWithOutLogin', () => {
    beforeEach(() => {
        render(<MainWithOutLogin />)
    })

    it('Have main block', () => {
        expect(screen.getByTestId('Main')).toBeInTheDocument();
    })
    it('Have goToLogin paragraph', () => {
        expect(screen.getByTestId('goToLogin')).toBeInTheDocument();
    })
    it('Have goToRegistration paragraph', () => {
        expect(screen.getByTestId('goToRegistration')).toBeInTheDocument();
    })
})