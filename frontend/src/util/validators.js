const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_REGEX = 'REGEX';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_REGEX = val => ({ type: VALIDATOR_TYPE_REGEX, val: val });

export const validate = (value, validators) => {
    let isValid = true;
    for (const validator of validators) {
        if (validator.type === VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0;
        }
        if (validator.type === VALIDATOR_TYPE_REGEX) {
            const regexExp = new RegExp(validator.val);
            isValid = isValid && regexExp.test(value);
        }
    }
    return isValid;
};
