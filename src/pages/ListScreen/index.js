import React, { useEffect, useLayoutEffect } from "react";
import { BackHandler } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

// import AppLoading from "expo-app-loading";
// import { useFonts } from "expo-font";

import {
  Container,
  AddButton,
  AddButtonImage,
  NotesList,
  NoNotes,
  NoNotesImage,
  NoNotesText,
  CloseButton,
  CloseButtonImage
} from "./styles";

import NoteItem from "../../components/NoteItem";

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const list = useSelector((state) => state.notes.list);

  const list_category = useSelector((state) => state.categories.list);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.categoryName + " Notes",
      headerRight: () => (
        <AddButton
          underlayColor="transparent"
          onPress={() => navigation.navigate("EditNote", {
            category: route.params.category,
            categoryName: route.params.categoryName
          })}
        >
          <AddButtonImage source={require("../../assets/more.png")} />
        </AddButton>
      ),
      headerLeft: () => (
        <CloseButton underlayColor="transparent" onPress={handleCloseButton}>
          <CloseButtonImage source={require("../../assets/close.png")} />
        </CloseButton>
      ),
    });
  }, []);

  const handleCloseButton = () => navigation.navigate("CategoryList");

  const handleDeleteNote = () => {
    dispatch({
      type: "DELETE_CATEGORY",
      payload: {
        key: route.params.key,
        category: route.params.category,
        categoryName: route.params.categoryName
      },
    });
    navigation.navigate("CategoryList");
  };

  const handleNotePress = (index) => {
    navigation.navigate("EditNote", {
      key: index,
      category: route.params.category,
      categoryName: route.params.categoryName
    });
  };

  return (
    <Container>
      {list.filter((item, index) => { return item.category == route.params.category; }).length > 0 && (
        <NotesList
          data={list}
          renderItem={({ item, index }) => {
            if (item.category == route.params.category) {
              return (
                <NoteItem data={item} index={index} onPress={handleNotePress} />
              )
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {list.filter((item, index) => { return item.category == route.params.category; }).length == 0 && (
        <NoNotes>
          <NoNotesImage source={require("../../assets/nonotes.png")} />
          <NoNotesText >
            No Notes Yet
          </NoNotesText>
        </NoNotes>
      )}
    </Container>
  );
};
