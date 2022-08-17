import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";

import {
  Container,
  TitleInput,
  BodyInput,
  SaveButton,
  SaveButtonImage,
  CloseButton,
  CloseButtonImage,
  ButtonsContainer,
  DeleteButton,
  DeleteButtonText,
  SuccessButton,
  SuccessButtonText,
  NoSuccessButton,
  NoSuccessButtonText,
} from "./styles";

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.categories.list);

  const [title, setTitle] = useState("");
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState("new");

  useEffect(() => {
    if (route.params?.key !== undefined && list[route.params.key]) {
      setStatus("edit");
      setTitle(list[route.params.key].title);
      setDone(list[route.params.key].done);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: status === "new" ? "New Category" : "Edit Category",
      headerLeft: () => (
        <CloseButton underlayColor="transparent" onPress={handleCloseButton}>
          <CloseButtonImage source={require("../../assets/close.png")} />
        </CloseButton>
      ),
      headerRight: () => (
        <SaveButton underlayColor="transparent" onPress={handleSaveButton}>
          <SaveButtonImage source={require("../../assets/save.png")} />
        </SaveButton>
      ),
    });
  }, [status, title]);

  const handleSaveButton = () => {
    if (title !== "") {
      if (status === "edit") {
        dispatch({
          type: "EDIT_CATEGORY",
          payload: {
            key: route.params.key,
            title,
            done,
          },
        });
      } else {
        dispatch({
          type: "ADD_CATEGORY",
          payload: { title },
        });
      }

      navigation.navigate("CategoryList");
    } else {
      alert("Enter title");
    }
  };

  const handleCloseButton = () => navigation.navigate("CategoryList");

  const handleDeleteNote = () => {
    dispatch({
      type: "DELETE_CATEGORY",
      payload: {
        key: route.params.key,
      },
    });
    navigation.navigate("CategoryList");
  };

  const handleSuccessNote = () => {
    dispatch({
      type: "SUCCESS_CATEGORY",
      payload: {
        key: route.params.key,
        title
      },
    });
    navigation.navigate("CategoryList");
  };

  const handleNoSuccessNote = () => {
    dispatch({
      type: "UNCHECK_CATEGORY",
      payload: {
        key: route.params.key,
        title
      },
    });
    navigation.navigate("CategoryList");
  };

  return (
    <Container>
      <TitleInput
        value={title}
        onChangeText={(t) => setTitle(t)}
        placeholder="Title | ex: Workouts 🏃"
        placeholderTextColor="#ccc"
        autoFocus={true}
      />
      {status === "edit" && (
        <ButtonsContainer>
          <DeleteButton underlayColor="#FF0000" onPress={handleDeleteNote}>
            <DeleteButtonText >
              Delete
            </DeleteButtonText>
          </DeleteButton>

          {!done && (
            <SuccessButton underlayColor="#2E8500" onPress={handleSuccessNote}>
              <SuccessButtonText >
                Uncheck Category
              </SuccessButtonText>
            </SuccessButton>
          )}

          {done && (
            <NoSuccessButton
              underlayColor="#2E8500"
              onPress={handleNoSuccessNote}
            >
              <NoSuccessButtonText >
                Check Category
              </NoSuccessButtonText>
            </NoSuccessButton>
          )}
        </ButtonsContainer>
      )}
    </Container>
  );
};
