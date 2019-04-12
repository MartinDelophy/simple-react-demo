import { observable, computed } from "mobx";
import React from "react";

const genUid = () =>
  Math.random()
    .toString(16)
    .substring(2);

class ListStore {
  /**
   *  @param planList 计划列表
   * */
  @observable planList = [
    {
      task: "起床",
      done: false,
      ref: genUid()
    },
    {
      task: "刷牙洗脸",
      done: false,
      ref: genUid()
    },
    {
      task: "吃早饭",
      done: false,
      ref: genUid()
    },
    {
      task: "坐地铁",
      done: false,
      ref: genUid()
    },
    {
      task: "在地铁上看一会书",
      done: false,
      ref: genUid()
    },
    {
      task: "工作",
      done: false,
      ref: genUid()
    },
    {
      task: "吃午饭",
      done: false,
      ref: genUid()
    }
  ];

  @computed get doneNum() {
    return this.planList.map(x => x.done === true).length;
  }

  @computed get unDoneNum() {
    return this.planList.length - this.doneNum;
  }
}

export default ListStore;
