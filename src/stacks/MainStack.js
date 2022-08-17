import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ListScreen from "../pages/ListScreen";
import EditNoteScreen from "../pages/EditNoteScreen";
import EditCategoryScreen from "../pages/EditCategoryScreen";
import CategoryListScreen from "../pages/CategoryListScreen";

const MainStack = createStackNavigator();

export default () => (
  <MainStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fbfbfb",
      },
      headerTintColor: "#222",
    }}
  >
    <MainStack.Screen name="CategoryList" component={CategoryListScreen} />
    <MainStack.Screen name="List" component={ListScreen} />
    <MainStack.Screen name="EditNote" component={EditNoteScreen} />
    <MainStack.Screen name="EditCategory" component={EditCategoryScreen} />
  </MainStack.Navigator>
);
