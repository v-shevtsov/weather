#!/usr/bin/env node
import {getArgs} from './helpers/args.js';
import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token is required');
        return;
    }
    try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token saved');
    } catch (error) {
        if (error.response?.status === 404) {
            printError('City not found');
        } else if (error?.response?.status === 401) {
            printError('Invalid token');
        } else {
            printError(error.message);
        }
    }
};

const saveCity = async (city) => {
    if (!city?.length) {
        printError('City is required');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved');
    } catch (error) {
        printError('City was not saved');
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY || await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        const icon = getIcon(weather.weather[0].icon);
        printWeather(weather, icon);
    } catch (error) {
        printError(error.message);
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv);

    if (args.h) {
        printHelp();
        return;
    }

    if (args.s) {
        await saveCity(args.s);
        return;
    }

    if (args.t) {
        await saveToken(args.t);

        return;
    }

    await getForecast();
};

initCLI();
