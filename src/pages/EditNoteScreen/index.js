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
  const list = useSelector((state) => state.notes.list);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState("new");

  useEffect(() => {
    if (route.params?.key !== undefined && list[route.params.key]) {
      setStatus("edit");
      setTitle(list[route.params.key].title);
      setBody(list[route.params.key].body);
      setCategory(route.params.category);
      setDone(list[route.params.key].done);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: status === "new" ? "New Note" : "Edit Notes",
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
  }, [status, title, body]);

  const handleSaveButton = () => {
    if (title !== "" && body !== "") {
      if (status === "edit") {
        dispatch({
          type: "EDIT_NOTE",
          payload: {
            key: route.params.key,
            title,
            body,
            category: route.params.category,
            done,
          },
        });
      } else {
        dispatch({
          type: "ADD_NOTE",
          payload: { title, body, category: route.params.category },
        });
      }

      navigation.navigate("List", {
        category: route.params.category,
        categoryName: route.params.categoryName
      });
    } else {
      alert("Enter title and body");
    }
  };

  const handleCloseButton = () => navigation.navigate("List", {
    category: route.params.category,
    categoryName: route.params.categoryName
  });

  const handleDeleteNote = () => {
    dispatch({
      type: "DELETE_NOTE",
      payload: {
        key: route.params.key,
      },
    });
    navigation.navigate("List", { category: route.params.category, categoryName: route.params.categoryName });
  };

  const handleSuccessNote = () => {
    dispatch({
      type: "SUCCESS_NOTE",
      payload: {
        key: route.params.key,
        title,
        body,
        category: route.params.category
      },
    });
    navigation.navigate("List", { category: route.params.category, categoryName: route.params.categoryName });
  };

  const handleNoSuccessNote = () => {
    dispatch({
      type: "UNCHECK_NOTE",
      payload: {
        key: route.params.key,
        title,
        body,
        category: route.params.category
      },
    });
    navigation.navigate("List", {
      key: route.params.key,
      category: route.params.category,
      categoryName: route.params.categoryName
    });
  };

  return (
    <Container>
      <TitleInput
        value={title}
        onChangeText={(t) => setTitle(t)}
        placeholder="Title | ex: Run 🏃"
        placeholderTextColor="#ccc"
        autoFocus={true}
      />
      <BodyInput
        value={body}
        onChangeText={(t) => setBody(t)}
        placeholder="Details | ex: Doing workouts of the day 😎"
        placeholderTextColor="#ccc"
        multiline={true}
        textAlignVertical="top"
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
                Uncheck Note
              </SuccessButtonText>
            </SuccessButton>
          )}

          {done && (
            <NoSuccessButton
              underlayColor="#2E8500"
              onPress={handleNoSuccessNote}
            >
              <NoSuccessButtonText >
                Check Note
              </NoSuccessButtonText>
            </NoSuccessButton>
          )}
        </ButtonsContainer>
      )}
    </Container>
  );
};
