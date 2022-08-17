import React from "react";
import {
  Box,
  BoxContainer,
  Title,
  Check,
  CheckImage,
  UnCheck,
  UnCheckImage,
} from "./styles";

import { useDispatch } from "react-redux";

export default ({ data, index, onPress }) => {
  const dispatch = useDispatch();

  const handleCheckCategory = () => {
    dispatch({
      type: "DELETE_CATEGORY",
      payload: {
        key: index,
        title: data.title
      },
    });
  };

  const handleUnCheckCategory = () => {
    dispatch({
      type: "UNCHECK_CATEGORY",
      payload: {
        key: index,
        title: data.title
      },
    });
  };

  return (
    <Box
      onPress={() => onPress(index, data)}
      underlayColor={data.done ? "#0000ff" : "#fff"}
      check={data.done}
    >
      <BoxContainer>
        <Title
          success={data.done}
        >
          {data.title}
        </Title>
        {data.done !== true && (
          <Check onPress={handleCheckCategory} underlayColor="transparent">
            <CheckImage source={require("../../assets/close.png")} />
          </Check>
        )}
        {data.done !== false && (
          <UnCheck onPress={handleUnCheckCategory} underlayColor="transparent">
            <UnCheckImage source={require("../../assets/nocheck.png")} />
          </UnCheck>
        )}
      </BoxContainer>
    </Box>
  );
};
