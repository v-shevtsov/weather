import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (error) => {
    console.log(
        `${chalk.bgRed('Error:')} ${error}`
    );
}

export const printSuccess = (message) => {
    console.log(
        `${chalk.bgGreen('Success:')} ${message}`
    );
}

export const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP: ')}
        Usage: weather [options] [command]
        -h       Show help
        -c       Set city
        -t       Set token
        `
    )
}

export const printWeather = (weather, icon) => {
    const city = weather.name;
    const description = weather.weather[0].description;
    const temperature = Math.round(weather.main.temp);
    const feelsLike = Math.round(weather.main.feels_like);
    const wind = weather.wind.speed;
    const humidity = weather.main.humidity;
    const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();

    console.log(
        dedent`${chalk.bgYellow(`Weather in city ${city}:`)}
            ${icon} ${description}
            Temperature: ${temperature}°C feels like ${feelsLike}°C
            Wind: ${wind} m/s
            Humidity: ${humidity}%
            Sunset: ${sunset}
         `
    )
}
