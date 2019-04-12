import React, { FC } from "react";
import { observer } from "mobx-react";

const Todo = observer((props: any) => {
  const { children } = props;
  console.log(props);

  return <div>{123}</div>;
});

export default Todo;
