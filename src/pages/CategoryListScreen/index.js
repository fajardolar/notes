import React, { useEffect, useLayoutEffect } from "react";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
} from "./styles";

import CategoryItem from "../../components/CategoryItem";

export default () => {
  const navigation = useNavigation();
  const list = useSelector((state) => state.notes.list);

  const list_category = useSelector((state) => state.categories.list);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Categories",
      headerLeft: false,
      headerRight: () => (
        <AddButton
          underlayColor="transparent"
          onPress={() => navigation.navigate("EditCategory")}
        >
          <AddButtonImage source={require("../../assets/more.png")} />
        </AddButton>
      ),
    });
  }, []);

  const handleCategoryPress = (index, item) => {
    navigation.navigate("List", {
      key: index,
      category: item.title + index,
      categoryName: item.title
    });
  };

  return (
    <Container>
      {list_category.length > 0 && (
        <NotesList
          data={list_category}
          renderItem={({ item, index }) => (
            <CategoryItem data={item} index={index} onPress={handleCategoryPress} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {list_category.length === 0 && (
        <NoNotes>
          <NoNotesImage source={require("../../assets/nonotes.png")} />
          <NoNotesText >
            No Categories Yet
          </NoNotesText>
        </NoNotes>
      )}
    </Container>
  );
};
