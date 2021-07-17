import { CREATE_TESTDATA, GET_TESTDATA, GET_SAMPLEDATA } from "./graphQL";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useState, useEffect } from "react";

function App() {
  const { loading, error, data } = useQuery(GET_TESTDATA);
  const [getSubscriptionData] = useMutation(GET_SAMPLEDATA)
  const [createTestData] = useMutation(CREATE_TESTDATA);
  const [testData, setTestData] = useState([]);
  const [txtField1, setTextField1] = useState({ input: "" });
  const [txtField2, setTextField2] = useState({ input2: "" });
  const [subscriptionResult, setSubscriptionResult] = useState({result: ""})

  useEffect(() => {
    if (data) {
      setTestData(data.getTestData);
      console.log(testData);
    }
  }, [data]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const getData = () => {
    try {
      //refetch()
      console.log(data.getTestData);
      setTestData(data.getTestData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeForInput1 = (event) => {
    //console.log({ [event.target.name]: event.target.value });
    setTextField1({ ...txtField1, [event.target.name]: event.target.value });
  };

  const createData = async (e) => {
    try {
      e.preventDefault();
      var { data } = await createTestData({
        variables: { test: txtField1.input },
        refetchQueries: [
          {
            query: GET_TESTDATA,
          },
        ],
      });
      //setTextField1({ input: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeForInput2 =  (event) => {
    //console.log({ [event.target.name]: event.target.value });
    setTextField2({ ...txtField2, [event.target.name]: event.target.value });
  };

  const sendData = async (event) => {
    try {
      event.preventDefault();
      var { data } = await getSubscriptionData({
        variables: { test: txtField2.input2 },
        refetchQueries: [
          {
            query: GET_TESTDATA,
          },
        ],
      });
      console.log(data.getSubscriptionData)
      setSubscriptionResult({result: data.getSubscriptionData.test})
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>React GraphQL Demo</h1>
      <hr />

      <br />
      <h3>Create your test data here</h3>
      <div>
        <form>
          <input
            type="text"
            onChange={handleChangeForInput1}
            name="input"
            value={txtField1.input}
          ></input>
          <button onClick={createData} type="submit">
            Create Data
          </button>
          <br />
        </form>
      </div>

      <br />
      <h3>Subscription</h3>
      <div>
        <form>
          <input
            type="text"
            onChange={handleChangeForInput2}
            name="input2"
            value={txtField2.input}
          ></input>
          <button onClick={sendData} type="submit">
            Add data
          </button>
          <h4>{subscriptionResult.result}</h4>
        </form>
      </div>
      <hr />
      <h3>See your test data here</h3>
      <div>
        <button onClick={getData}>Get Data</button>
        {testData.map((data, index) => (
          <ul key={index}>
            <li key={index}>{data.test}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
