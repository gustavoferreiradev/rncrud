import React, { useContext } from "react";
import { Alert, FlatList, View } from 'react-native';
import { Avatar, ListItem } from "react-native-elements";
import UsersContext from "../context/UsersContext";

export default props => {

    const { state, dispatch } = useContext(UsersContext);

    function confirmUserDeletion(user) {
        Alert.alert("Excluir Usuário", "Deseja excluir o usuário?", [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser', 
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem({item: user}) {
        return (
            <ListItem key={user.id}
                topDivider
                >
            <Avatar source={{uri: user.avatarUrl}} />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron name="edit" size={25} color="orange" onPress={() => props.navigation.navigate('UserForm', user)} />
            <ListItem.Chevron name="delete" size={25} color="red" onPress={() => confirmUserDeletion(user)} />
          </ListItem>
            
        )
    }

    return (
        <View>
        <FlatList
            keyExtractor={user => user.id.toString()}
            data={state.users}
            renderItem={getUserItem}
            />
        </View>
    )
}