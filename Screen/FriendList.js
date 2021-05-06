import React from 'react';
import {View, Text, Alert, StyleSheet, ScrollView, TextInput} from 'react-native';
import SearchBar from 'react-native-search-bar';

export const FriendList=()=>{
    return(
        <View style={StyleFriendlist.Container}>
            <View style={StyleFriendlist.profileHeader}>
                <View style={StyleFriendlist.profileHeaderPicCircle}>
                <Text style={{fontSize: 25, color: 'aquamarine'}}>
                    {'About Readddddddct'.charAt(0)}   
                </Text>
                </View>
                <Text style={StyleFriendlist.profileHeaderText}>Name</Text>
            </View>
            <View>
              <View>
                <Text style={StyleFriendlist.TitleStyle}>Friend List</Text>
              </View>
              <View>
                <SearchBar
                  placeholder="Search"
                  searchIcon={{size:10}}
                  //onChangeText={this.updateSearch}
                  //value={search}
                />
              </View>
            </View>
            <View style={StyleFriendlist.profileHeaderLine} />
            <ScrollView>
                <Text>
                    asdf {"\n"}
                    asdf
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    vasdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    sdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    vasdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    sdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    vasdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    asdf {"\n"}
                    </Text>
            </ScrollView>
            <View style={{margin:10, flexDirection:'row' }}>
                <Text style={{
                  margin:10
                }}
                >gi</Text>
                <TextInput
                    style={StyleFriendlist.inputStyle}
                    placeholder="Enter Email" //dummy@abc.com
                    placeholderTextColor="blue"
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                />
            </View>
        </View>
    );
};

const StyleFriendlist= StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'lightsteelblue',
        paddingTop: 40,
        color: 'black',
      },
      profileHeader: {      //프로필 있는 부분 박스 
        flexDirection: 'row',
        backgroundColor: 'lightsteelblue',
        padding: 15,
        textAlign: 'center',
      },
      profileHeaderPicCircle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        color: 'white',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      profileHeaderText: {
        color: 'black',
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontWeight: 'bold',
      },
      profileHeaderLine: {
        height: 1,
        marginHorizontal: 20,
        backgroundColor: '#e2e2e2',
        marginTop: 15,
      },
      inputStyle: {
        flex: 1,
        color: 'black',
        margin:10,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 10,
        borderRadius: 30,
        borderColor: '#dadae8',
      },
      TitleStyle:{
        fontSize:20,
        fontWeight: 'bold',
      },
});