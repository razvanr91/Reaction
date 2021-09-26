import { makeAutoObservable } from "mobx";
import { useContext } from "react";
import { ServerError } from "../models/serverError"
import { StoreContext } from "./store";

export default class CommonStore {
    error: ServerError | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }
}