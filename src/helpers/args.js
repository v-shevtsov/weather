export const getArgs = (args) => {
    const resultArgs = {};
    const passedArgs = args.slice(2);

    passedArgs.forEach((arg, index, array) => {
        if (!arg.startsWith('-')) {
            return;
        }

        const key = arg.slice(1);
        const value = array[index + 1];

        if (value && !value.startsWith('-')) {
            resultArgs[key] = value;
            return;
        }

        resultArgs[key] = true;
    })

    return resultArgs;
}
