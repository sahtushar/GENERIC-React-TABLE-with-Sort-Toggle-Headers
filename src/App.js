import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [tabledata, settabledata] = useState([]);
  const [nameToggle, setNameToggle] = useState("");
  const [cityToggle, setcityToggle] = useState("");
  useEffect(() => {
    fetch("https://randomuser.me/api?results=30").then((res) => {
      res.json().then((result) => {
        console.log(result.results);
        settabledata(result.results);
      });
    });
  }, []);

  const geTimeString = (timestring) => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    let dateString = timestring.split("T")[0];
    months[Number(dateString.split("-")[1]) - 1];
    return (
      months[Number(dateString.split("-")[1]) - 1] +
      " " +
      [dateString.split("-")[2]] +
      "," +
      [dateString.split("-")[0]]
    );
  };

  const sortBynameinAscending = () => {
    let data = [...tabledata];
    data.sort(function (a, b) {
      if (`${a.name.first + a.name.last}` > `${b.name.first + b.name.last}`)
        return 1;
      return -1;
    });
    console.log(data);
    settabledata(data);
  };

  const sortBynameinDescending = () => {
    let data = [...tabledata];
    data.sort(function (a, b) {
      if (`${a.name.first + a.name.last}` < `${b.name.first + b.name.last}`)
        return 1;
      return -1;
    });
    console.log(data);
    settabledata(data);
  };

  const sortByCityNameAscending = () => {
    let data = [...tabledata];
    data.sort(function (a, b) {
      if (a.location.city > b.location.city) return 1;
      return -1;
    });
    console.log(data);
    settabledata(data);
  };

  const sortByCityNameDescending = () => {
    let data = [...tabledata];
    data.sort(function (a, b) {
      if (a.location.city < b.location.city) return 1;
      return -1;
    });
    console.log(data);
    settabledata(data);
  };

  useEffect(() => {
    if (nameToggle === "asc") {
      sortBynameinAscending();
    } else if (nameToggle === "dsc") {
      sortBynameinDescending();
    }
  }, [nameToggle]);

  useEffect(() => {
    if (cityToggle === "asc") {
      sortByCityNameAscending();
    } else if (cityToggle === "dsc") {
      sortByCityNameDescending();
    }
  }, [cityToggle]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <table>
        <thead>
          <tr className="headertr">
            <td
              style={{
                border: "1px solid blue"
              }}
              onClick={() => {
                if (nameToggle === "asc") {
                  setNameToggle("dsc");
                } else {
                  setNameToggle("asc");
                }
              }}
            >
              Name {nameToggle ? `(${nameToggle})` : ""}
            </td>
            <td
              style={{
                border: "1px solid blue"
              }}
              onClick={() => {
                if (cityToggle === "asc") {
                  setcityToggle("dsc");
                } else {
                  setcityToggle("asc");
                }
              }}
            >
              City {cityToggle ? `(${cityToggle})` : ""}
            </td>
            <td>Date of birth</td>
            <td>profile pic</td>
          </tr>
        </thead>
        <tbody>
          {tabledata.map((item) => {
            return (
              <tr>
                <td>
                  {item.name.title} {item.name.first} {item.name.last}
                </td>
                <td>{item.location.city}</td>
                <td>{geTimeString(item.dob.date)}</td>
                <td align="center" className="imgtd">
                  <img src={item.picture.thumbnail} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
