import { useState, useEffect } from "react";
import { getAllTemplateTypeDetail, getOneTemplate, createSource } from "./api";
import Input from "./component/Input";

import { useForm } from './hooks/FormHook';
import { VALIDATOR_REGEX, VALIDATOR_REQUIRE } from "./util/validators";

const App = () => {

  const [formState, inputHandler, setFormData] = useForm({}, false);

  const changeHandler = (e) => {
    if (e.target.type === "checkbox") {
      setTemplate((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.checked,
      }));
    } else if (e.target.type === "radio") {
      setTemplate((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.id,
      }));
    } else {
      setTemplate((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };



  const handleOnSubmit = () => {
    let type = template['type']
    let obj = template
    delete obj['type']

    let formState$ = {};
    Object.keys(formState.inputs).forEach(input => {
      formState$ = {
        ...formState$,
        [input]: formState.inputs[input].value
      }
    });

    let body = {
      sourceType: type,
      payload: formState$
    }
    createSource(body)
      .then(res => {
        console.log(res);
        window.location.reload();
      })

  }

  const changeSourceHandle = async (value) => {
    const output = await getOneTemplate(value)
    setSourceDetails(output)
    setTemplate({ "type": value });

    let formState$ = {};

    Object.keys(output.fields).forEach(field => {
      formState$ = {
        ...formState$,
        [field]: {
          value: '',
          isValid: output.fields[field].required ? false : true
        },
      }
    });

    setFormData(
      {
        ...formState$
      },
      false
    );

    setIsLoading(false);
  };

  const [template, setTemplate] = useState({});
  const [sourceType, setSourceType] = useState([]);
  const [sourceDetails, setSourceDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fieldList = sourceDetails && sourceDetails["fields"];

  const getSourceType = async () => {
    setIsLoading(true);
    const output = await getAllTemplateTypeDetail();
    setSourceType(output);
    changeSourceHandle(output[0]);
    return output;
  };

  useEffect(() => {
    getSourceType();
  }, []);

  return (
    <div className="test">
      <form className="w-full max-w-lg">
        {sourceType && (
          <div>
            <label for="cars">Template Selection</label>
            <select
              name="templates"
              id="templates"
              onChange={(e) => changeSourceHandle(e.target.value)}
            >
              {sourceType.map((source, index) => {
                return (
                  <option value={source} key={index}>
                    {source}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        <div className="flex flex-col"></div>
        {!isLoading && fieldList && Object.keys(fieldList).map((key, index) => {

          const validatorsArr = [];
          if (fieldList[key].required)
            validatorsArr.push(VALIDATOR_REQUIRE());

          if (fieldList[key].regex) {
            validatorsArr.push(VALIDATOR_REGEX(fieldList[key].regex));
          }

          return (
            <Input
              {...fieldList[key]}
              id={key}
              template={template}
              name={key}
              changeHandler={changeHandler}
              onInput={inputHandler}
              validators={fieldList[key].required ? [VALIDATOR_REQUIRE()] : []}
              initialValue={fieldList[key].value}
              key={index}
            />
          )

        })}
        <button
          type="button"
          class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={!formState.isValid}
          onClick={handleOnSubmit}
        >
          submit
        </button>

      </form>
      <br />
    </div>
  );
}

export default App;
