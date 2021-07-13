import { CREATE_TESTDATA, GET_TESTDATA } from "./graphQL";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useState, useEffect } from "react";

function App() {
  const { loading, error, data } = useQuery(GET_TESTDATA);
  const [createTestData] = useMutation(CREATE_TESTDATA);
  const [testData, setTestData] = useState([]);
  const [txtField1, setTextField1] = useState({ input: "" });
  const [txtField2, setTextField2] = useState({ input: "" });

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
    } catch (error) {
      console.log(error);
    }
  };

  const sendData = async (e) => {

  }

  const handleChange = (event) => {
    //console.log({ [event.target.name]: event.target.value });
    setTextField1({ ...txtField1, [event.target.name]: event.target.value });
  };

  const handleChange2 = (event) => {
    console.log({ [event.target.name]: event.target.value });
    setTextField1({ ...txtField2, [event.target.name]: event.target.value });
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
            onChange={handleChange}
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
      {/* <h3>Subscription</h3>
      <div>
        <form>
          <input
            type="text"
            onChange={handleChange2}
            name="input2"
            value={txtField2.input}
          ></input>
          <button onClick={sendData} type="submit">
            Add data
          </button>
        </form>
      </div> */}
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
