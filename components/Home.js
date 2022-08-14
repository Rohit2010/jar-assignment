import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Animated, Dimensions, Text, Image, ScrollView, View, TextInput, Button, StyleSheet, Modal, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Card, IconButton } from 'react-native-paper';
// import Model from './Model';
import { ApiCall } from "../actions/ApiActionCreator";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuccess } from '../actions/ApiAction';
import { TouchableOpacity } from 'react-native-web';

// Post's....

export default function Home() {

    const edges = useSafeAreaInsets();
    const [data, setData] = React.useState()
    const [page, setPage] = React.useState(1)
    const [modalVisible, setModalVisible] = React.useState(true);
    const [selectedData, setSelectedData] = React.useState();

    const dispatch = useDispatch();
    const dataNew = useSelector((state) => state.apiReducer.data);
    const loading = useSelector((state) => state.apiReducer.loading);

    useEffect(() => {
    }, [page]);

    useEffect(() => {
        getData()
    }, [page])
    const getData = async () => {
        let response = await fetch(
            `http://www.omdbapi.com/?s=Batman&apikey=eeefc96f&page=${page}`
        );
        let json = await response.json();
        setData(json.Search)
        // dispatch(fetchSuccess(json.Search))


    }
    
    return (
        <View>
            <ScrollView>
                <View style={{
                    paddingLeft: 5,
                    paddingRight: 15,
                    paddingTop: (edges.top + 65),
                    paddingBottom: 25
                }}>
                    <View>
                        {data?.map((movie) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                   setModalVisible(true)
                                    // return <Model modalVisible={modalVisible} setModalVisible={setModalVisible} data={movie} />
                                }}>
                                    <Card.Title
                                        key={movie.imdbID}
                                        title={movie.Title}
                                        subtitle={movie.Year}
                                        left={(props) => <Image source={{ uri: movie.Poster }} style={{ width: 50, height: 50 }} />}
                                        // right={(props) => <IconButton {...props} icon="more-vert" onPress={() => { }} />}
                                        style={{ borderBottomColor: "black", borderBottomWidth: .5 }}

                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                  { selectedData && <Model data={selectedData} modalVisible={modalVisible} setModalVisible={setModalVisible} cleardata={setSelectedData}/>}
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 10 }}>
                    {page > 1 && <Button title='Prev' style={{ color: "#0096FF", right: 0 }} onPress={() => { setPage(page - 1) }}>Prev</Button>}
                    {page < 10 && <Button title="Next" onPress={() => { setPage(page + 1) }}>Next</Button>}
                </View>

            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
