import React, { useState, useCallback, useEffect } from "react";
// import Style from "@/components/style/test.less";
import { DatePicker, Button } from "antd";
import Layout from "./layout/Layout";
import "./layout/layout.less";

const HookTest = (props: any) => {
  const [currentTime, setCurrentTime] = useState("");
  const handleClick = useCallback(() => {
    console.log(currentTime);
  }, [currentTime]);

  const res = useEffect(() => {
    console.log("all things are already done");
  });

  return (
    <Layout>
      <DatePicker onChange={(date, dateString) => setCurrentTime(dateString)} />
      <Button type="primary" onClick={handleClick}>
        Primary
      </Button>
    </Layout>
  );
};

export default HookTest;
