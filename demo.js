import React, { useState, useRef, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const App = () => {
  const [fieldValue, setFieldValue] = useState();
  const [array, setArray] = useState([]);
  const [date, setDate] = useState();
  const [mapIndex, setMapIndex] = useState([]);
  const setFocus = useRef(false);
  const [className, setClassName] = useState("mapOne");

  const onChange = (value) => {
    setFieldValue(value);
  };

  const onButtonClick = () => {
    if (fieldValue && fieldValue.length > 0) {
      setArray([
        ...array,
        {
          name: fieldValue,
          id: Math.random(),
        },
      ]);
      setFieldValue();
      document.getElementById("input").value = "";
    }
  };

  const onDeleteClick = (item, i, index) => {
    if (mapIndex.includes(i)) {
      const findObj = mapIndex.filter((item) => {
        return item !== i;
      });
      setMapIndex([...findObj]);
    }
    let newArray = [...array];
    newArray.splice(index, 1);
    setArray([...newArray]);
  };

  const onStrikeOut = (item, i) => {
    if (mapIndex.includes(i)) {
      return window.alert("Task Already Done, Want Delete & Add Again");
    }
    setMapIndex([...mapIndex, i]);
  };

  useEffect(() => {
    console.log(mapIndex);
  }, [mapIndex]);

  const onKey = (e) => {
    if (e.keyCode === 13) {
      if (fieldValue && fieldValue.length > 0) {
        setArray([
          ...array,
          {
            name: fieldValue,
            id: Math.random(),
          },
        ]);
        setFieldValue();
        document.getElementById("input").value = "";
      }
    }
  };

  const getDate = () => {
    var objToday = new Date(),
      weekday = new Array(
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ),
      dayOfWeek = weekday[objToday.getDay()],
      domEnder = (function () {
        var a = objToday;
        if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
        a = parseInt((a + "").charAt(1));
        return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th";
      })(),
      dayOfMonth =
        today + (objToday.getDate() < 10)
          ? "0" + objToday.getDate() + domEnder
          : objToday.getDate() + domEnder,
      months = new Array(
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
      ),
      curMonth = months[objToday.getMonth()],
      curYear = objToday.getFullYear(),
      curHour =
        objToday.getHours() > 12
          ? objToday.getHours() - 12
          : objToday.getHours() < 10
          ? "0" + objToday.getHours()
          : objToday.getHours(),
      curMinute =
        objToday.getMinutes() < 10
          ? "0" + objToday.getMinutes()
          : objToday.getMinutes(),
      curSeconds =
        objToday.getSeconds() < 10
          ? "0" + objToday.getSeconds()
          : objToday.getSeconds(),
      curMeridiem = objToday.getHours() >= 12 ? "PM" : "AM";
    var today =
      curHour +
      ":" +
      curMinute +
      "." +
      curSeconds +
      " " +
      curMeridiem +
      " " +
      dayOfWeek +
      " " +
      dayOfMonth +
      " of " +
      curMonth +
      ", " +
      curYear;
    setDate(today);
  };

  useEffect(() => {
    document.getElementById("input").focus();
    getDate();
    const interval = setInterval(getDate, 1000);
  }, []);

  return (
    <div className="body">
      <div className="header-top">
        <div className="header-todo">ToDo</div>
        <div className="top-record">
          Total Task : {array.length}
          <br />
          Total Task Done : {mapIndex.length}
        </div>
      </div>
      <div className="outer">
        <h1 className="headerTag">Just do "ToDo"</h1>
        <h2 className>{date}</h2>
        <div className="box">
          <div className="field">
            <input
              id="input"
              ref={setFocus}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Add a task"
              onKeyDown={(e) => onKey(e)}
              maxLength={14}
              autoComplete="off"
            />
          </div>
          <div className="but">
            <button onClick={onButtonClick}>ADD</button>
          </div>
        </div>
        <div className="map-outlet">
          <div className="map-body">
            {array.length > 0 &&
              array.map((item, i) => {
                return (
                  <div className="map">
                    <div className="mapIndex">{i + 1}</div>
                    <div
                      className={
                        mapIndex.includes(item.id) ? "mapOne-striked" : "mapOne"
                      }
                    >
                      {item?.name.toUpperCase()}
                    </div>
                    <div className="mapTwo">
                      <button onClick={() => onStrikeOut(item, item.id)}>
                        <TiTick
                          size="1.5rem"
                          style={{ backgroundColor: "#ffdd00" }}
                        />
                      </button>
                    </div>
                    <div className="mapTwo">
                      <button onClick={() => onDeleteClick(item, item.id, i)}>
                        <MdDelete
                          size="1.5rem"
                          style={{ backgroundColor: "#ffdd00" }}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
