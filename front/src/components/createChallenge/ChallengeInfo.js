import React, { useCallback, useState, useRef } from "react";
import styled from "styled-components";
import challengeInfo from "../../styles/createChallenge/challengeInfo.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { addDays } from "date-fns";
import { excludeDateIntervals } from "date-fns";
import { ConsoleSqlOutlined } from "@ant-design/icons";
const ChallengeInfo = ({
  setTitle,
  setMethod,
  setDescription,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  formData,
  title,
  method,
  description,
}) => {
  var startYear = startDate.getFullYear();
  var startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
  var startDay = ("0" + startDate.getDate()).slice(-2);
  var fromDate = startYear + "-" + startMonth + "-" + startDay;
  /**endDate yyyy-MM-dd형식으로 변경 */
  var endYear = endDate.getFullYear();
  var endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);
  var endDay = ("0" + endDate.getDate()).slice(-2);
  var toDate = endYear + "-" + endMonth + "-" + endDay;
  const ref = useRef(null);
  let timer;
  const onStartDate = (data) => {
    setStartDate(data);
  };
  const onEndDate = (data) => {
    setEndDate(data);
  };
  const useDebouncedEffect = (func, delay, deps) => {
    const callback = useCallback(func, deps);
  };
  const onChangeHandler = (e) => {};
  console.log("descroption", description);
  console.log("title", title);
  formData.append("title", title);
  formData.append("method", method);
  formData.append("description", description);
  formData.append("fromDate", fromDate);
  formData.append("toDate", toDate);
  return (
    <>
      <div className="inner">
        <span className="infoSpan">이름</span>
        <input
          className="infoInput"
          onChange={(e) => setTitle(e.target.value)}
          placeholder=" ex) 주 1회 플로깅"
        ></input>
        <span className="infoSpan">인증방법</span>
        <input
          className="infoInput"
          onChange={(e) => setMethod(e.target.value)}
          placeholder=" ex) 쓰레기 봉투 인증"
        ></input>
        <span className="infoSpan">설명</span>

        <textarea
          className="description"
          ref={ref}
          onChange={(e) => setDescription(...description, e.target.value)}
          placeholder=" 조깅을 하면서 쓰레기를 줍는 활동 "
        ></textarea>

        <span className="infoSpan">기간(시작일 ~ 종료일)</span>
        <div className="date">
          <label for="startDate"></label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            selectsStart
            handlerWeek={startDate}
            onChange={onStartDate}
            locale={ko}
            highlightDates={addDays(new Date(), 7)}
            minDate={new Date()}
          />

          <p className="dateRange">~</p>
          <label for="endDate"></label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={endDate}
            selectsEnd
            filterDate={(date) => {
              const day = date.getDay();

              const dayOfStartDay = startDate.getDay();

              if (dayOfStartDay === 0) {
                return day === 6;
              }

              return day === dayOfStartDay - 1;
            }}
            endDate={endDate}
            minDate={startDate}
            maxDate={addDays(startDate, 76)}
            onChange={onEndDate}
            locale={ko}
          />
        </div>
      </div>
    </>
  );
};

export default ChallengeInfo;
